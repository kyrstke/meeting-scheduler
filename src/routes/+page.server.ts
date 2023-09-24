import prisma from "$lib/prisma.js";
import { redirect } from "@sveltejs/kit";
import type { Actions } from './$types.js';
import { DateTime } from "luxon";

function getDatesInRange(startDate, endDate) {
    //check type of startDate and endDate
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
        throw new TypeError("Invalid argument type");
    }
    const date = new Date(startDate.getTime());
    const dates: Date[] = [];
    while (date <= endDate) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return dates;
  }
// 1.
function calculateDays(chosenDates: Date[]) {
    let days: Date[]=[];
    let newdays: Date[] =[];
    for (var x=0; x<chosenDates.length; x=x+2){
        newdays = getDatesInRange(chosenDates[x], chosenDates[x+1])
        days.push.apply(days, newdays);
    }
    
    const sorted = days.sort(
        (objA, objB) => objA.getTime() - objB.getTime(),
    );

    let reminder: number []=[];
        let result = sorted.filter(item => {  
            let date = item.getDate(); 
            if(reminder.includes(date)) {       
                return false;                    
            }
            reminder.push(date);                
            return true;                        
        });
    return result;
}

export const actions =  {
    default: async ({request}) => {
        let form = await request.formData();    
        
        const data: any = {};
        let chosenDates: Date[] = [];
        for (let field of form) {
            const [key, value] = field;
            data[key] = value;
            if (key.includes("range")){
                chosenDates.push(new Date(String(value)));
            }
        }
        
        let days = calculateDays(chosenDates);

        let hour_count = parseInt(data.end_hour)-parseInt(data.start_hour);
        let avail: string[] = [];
        for (let i=0; i<days.length*hour_count*4; i++){
            avail[i] = '';
        }
        


    const newEvent = await prisma.event.create({
        data: {
            name: data.event_name,
            createdAt: (DateTime.now()).toString(),
            min_hour: parseInt(data.start_hour),
            max_hour: parseInt(data.end_hour),
            days: days,
            users: [],
            availability: avail
        }

    });
    
    throw redirect(303,"/event/" + newEvent.id);
    }
} satisfies Actions;