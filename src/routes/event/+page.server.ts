import prisma from "$lib/prisma.js";
import type { Actions } from './$types.js';
import { DateTime } from "luxon";


// 1.

export const actions =  {
    default: async ({request}) => {
        const data = await request.formData();

    // 2.


    // 3.
}
} satisfies Actions;