import prisma from "$lib/prisma.js";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from './$types.js';
import { DateTime } from "luxon";

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