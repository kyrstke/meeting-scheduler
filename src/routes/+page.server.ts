import prisma from "$lib/prisma.js";
import type { Actions } from './$types.js';
import { DateTime } from "luxon";


// 1.

export const actions =  {
    default: async ({request}) => {
        let form = await request.formData();
        
        const data:any = {};
        for (let field of form) {
            const [key, value] = field;
            data[key] = value;
        }

        let start_date = DateTime.fromFormat(data.start, 'MM/dd/yyyy');
        let end_date = DateTime.fromFormat(data.end, 'MM/dd/yyyy');

        const diff = end_date.diff(start_date, 'days').toObject().days;
        let days = diff ? diff+1 : 1;

        let hour_count = parseInt(data.end_hour)-parseInt(data.start_hour);
        let avail:number[][] = [];
        for (let i =0;i<days;i++){
            avail[i]= [];
            for (let r=0;r< hour_count;r++){
                avail[i][r] = 0;
            }
        }
        


    await prisma.event.create({
        data: {
            name: data.event_name,
            createdAt:  (DateTime.now()).toString(),
            start_date: start_date.toString(),
            end_date: end_date.toString(),
            min_hour: parseInt(data.start_hour),
            max_hour: parseInt(data.end_hour),
            users: [],
            availability: {create:[ avail
            ]}
        }

    });
    window.location.href = "/event";
    }
} satisfies Actions;