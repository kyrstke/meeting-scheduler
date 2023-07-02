import prisma from "$lib/prisma.js";
import type { Actions, PageServerLoad } from './$types.js';
import { DateTime } from "luxon";

// 1.


export const load =  (
    async () => {
    
    // 2.
    const event = await prisma.event.findUnique({
        where:{
            id: "64a1507d7aac7e7a86cf3871"
        }
    })
    return event;

    // 3.
}
 ) satisfies PageServerLoad;