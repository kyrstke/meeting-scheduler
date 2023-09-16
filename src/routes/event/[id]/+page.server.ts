import prisma from "$lib/prisma.js";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from './$types.js';
import { DateTime } from "luxon";
import { prevent_default } from "svelte/internal";
import type { GetResult } from "@prisma/client/runtime/index.js";

function replaceAt(str: string, index: any, replacement: string | any[]) {
    return str.substring(0, index) + replacement + str.substring(index + replacement.length);
}
function updateName(oldUsers: string[], name: string){
    let newUsers = oldUsers
    if (newUsers.indexOf(name) == -1){
        newUsers.push(name);
    }
    
    return newUsers;
}
function decToBin(dec: number){
    return (dec >>> 0).toString(2);
}
function getNewAvailability(value: (GetResult<{ id: string; createdAt: Date; name: string; min_hour: number; max_hour: number; days: Date[]; users: string[]; availability: number[]; }, unknown> & {}) | null,someoneCan: boolean[],index: number){
    let avail : number[] = [];
    if (value == null){
        return avail;
    }
    for (var x in value.availability){
        let allAvail = decToBin(value.availability[x]);
        if (someoneCan[x]){
            allAvail =  replaceAt(allAvail,index,'1');
        }
        else{
            allAvail = replaceAt(allAvail,index,'0');
        }
        avail.push(parseInt(allAvail.split("").reverse().join(""),2));
    }
    return avail;

}

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

 export const actions = {
    update: async ({params, request}) => {
        const data = await request.formData();
        let user_name = String(data.get("user"));
        let avail : boolean[] = [];
        for (const key of data.keys()) {
            if (key.includes(':TZ')){
                avail.push(JSON.parse(String(data.get(key))));
            }
        }
        var value =  await prisma.event.findUnique({
            where:{
                id: params.id
            }
        })
        if (value == null){
            throw 500;
        }
        var newlist: string[] = updateName(value.users,user_name);
        let index = newlist.indexOf(user_name);
        let newAvailability = getNewAvailability(value,avail,index);

        var event = await prisma.event.update({
            where:{
                id: params.id
            },
            data: {
                users: newlist,
                availability: newAvailability
                },
            
        })
    },
  };