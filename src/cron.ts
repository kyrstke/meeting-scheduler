import { PrismaClient } from '@prisma/client'
import cron from 'node-cron';
import { MessageClient } from "cloudmailin"
import pkg from 'nodemailer';
import type { DateTimeFormatOptions } from 'luxon';

const client = new MessageClient({ username: 'b18f948c506dea73', apiKey: '9gYBUUJEodZjb4u7raXigpbp'});



interface BestTimeInfo {
    best_time: string;
    best_time_n_users: number;
}
function sumChars(bin: string, char: string = "1"){
    let sum = 0;
    for (let i = 0; i < bin.length; i++){
        if (bin[i] == char){
            sum += 1;
        }
    }
    return sum;
}

function calculateNAvailUsers(event) {
    let n_avail_users: number[] = [];
    for (let x=0; x<event.availability.length; x++) {
        n_avail_users[x] = sumChars(event.availability[x]);
    }
    return n_avail_users;
}

function findBestTime(event): BestTimeInfo {
let best_time = "";
let best_time_n_users = 0;
let n_avail_users = calculateNAvailUsers(event)
let n_panels = (event.max_hour - event.min_hour) * 4;

const options: DateTimeFormatOptions = { month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' };
for (let x=0; x<n_avail_users.length; x++) {
    if (n_avail_users[x] > best_time_n_users) {
        best_time_n_users = n_avail_users[x];
        const date: Date = event.days[Math.floor(x/n_panels)];
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const hour = event.min_hour + Math.floor((x % n_panels) / 4);
        const minute = (x % 4) * 15;
        best_time = new Date(year, month, day, hour, minute).toLocaleDateString('en-GB', options);
    }
}
return {"best_time": best_time, "best_time_n_users": best_time_n_users};
}

const prisma = new PrismaClient()

cron.schedule('0 0 * * *', async () => {
const date = new Date();

console.log(`This task is running every day at midnight - ${date.getHours()}:${date.getMinutes()}`);


try {var events = await prisma.event.findMany({
        where:{
            endDate: {
                lte: date
            }
        },
    });
    for (var x =0;x < events.length;x++){
        const info: BestTimeInfo = findBestTime(events[x])
        for (var y=0;y< events[x].emails.length;y++){
            const transporter = pkg.createTransport({
                host: 'smtp.zoho.eu',
                port: 465,
                secure: true,
                auth: {
                  user: 'meeting.scheduler@zohomail.eu',
                  pass: 'meetingscheduler',
                },
              });transporter.verify().then(console.log).catch(console.error);
              transporter.sendMail({
                from: '"Meeting Scheduler" <meeting.scheduler@zohomail.eu>', // sender address
                to: events[x].emails[y], // list of receivers
                subject: "Meeting Scheduler - Event "+ events[x].name + " finished", // Subject line
                text: 'Your Event ' + events[x].name+
                     ' went to end! The best time for meet for your group is: ' 
                     + info.best_time + ' - ' + info.best_time_n_users +  ' people can be there on this time!', // plain text body
                html: '<h1>Your Event ' + events[x].name+
                      ' went to end! The best time for meet for your group is: ' 
                      + info.best_time + ' - ' + info.best_time_n_users +  ' people can be there on this time! </h1>', // html body
              }).then(info => {
                console.log({info});
              }).catch(console.error);
        }
    }
    }
catch (e) {
    console.log("Something is wrong: " + e);
}

});