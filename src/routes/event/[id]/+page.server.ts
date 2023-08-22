import prisma from "$lib/prisma.js";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from './$types.js';
import { DateTime } from "luxon";
import { prevent_default } from "svelte/internal";

// 1.


export const load =  (
    async ({params}) => {
    
    // 2.
    var event = await prisma.event.findUnique({
        where:{
            id: params.id
        }
    })
    if (event == null){
        throw 500;
    }
    return event;

    // 3.
}
 ) satisfies PageServerLoad;

 export const actions = {
    update: async ({params,request}) => {
        const data = await request.formData();
        let user_name = String(data.get("name"));
        let avail;
        for (const key of data.keys()) {
            if (key.includes(':TZ')){
                avail.push(data.get(key));
            }
          }
        var event = await prisma.event.update({
            where:{
                id: params.id
            },
            data: {
                users: {
                    push: user_name,
                },
                availability: {
                    set: avail.map(p => ({})) //TODO - update given dates
                }
            }
        })
        for (const key of data.values()) {
            console.log(key);
        }
        console.log("Or not")
        return false;
    },
  };