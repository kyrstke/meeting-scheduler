import { PrismaClient } from '@prisma/client'
import cron from 'node-cron';
import { MessageClient } from "cloudmailin"

const client = new MessageClient({ username: 'b18f948c506dea73', apiKey: '9gYBUUJEodZjb4u7raXigpbp'});


const prisma = new PrismaClient()

cron.schedule('*/10 * * * * *', async () => {
const date = new Date();

console.log(`This task is running every minute - ${date.getHours()}:${date.getMinutes()}`);

try {var event = await prisma.event.findMany({
        where:{
            endDate: {
                lte: date
            }
        },
    });
    for (var x =0;x < event.length;x++){
        for (var y=0;y< event[x].emails.length;y++){
            const response = await client.sendMessage({
                to: event[x].emails[y],
                from: 'meeting@scheduler.com',
                plain: 'Your event organization went to end!',
                html:  '<h1>Test Message</h1>',
                subject: "Meeting Scheduler - Event "+ event[x].name + " finished"
            });
        }
    }
    }
catch (e) {
    console.log("Something is wrong: " + e);
}

});