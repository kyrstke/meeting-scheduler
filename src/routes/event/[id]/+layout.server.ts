import prisma from "$lib/prisma.js";
import type { PageServerLoad } from './$types.js';

export const load =  (
    async ({params}) => {
    
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