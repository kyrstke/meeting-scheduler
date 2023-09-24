import prisma from "$lib/prisma.js";

function replaceAt(str: string, index: number, replacement: string) {
    return str.substring(0, index) + replacement + str.substring(index + replacement.length);
}

function updateName(oldUsers: string[], name: string){
    let newUsers = oldUsers
    if (newUsers.indexOf(name) == -1){
        newUsers.push(name);
    }
    
    return newUsers;
}

function getNewAvailability(value, someoneCan: boolean[], index: number){
    let avail: string[] = [];
    if (value == null){
        return avail;
    }
    for (var x in value.availability){
        let allAvail = value.availability[x];
        if (someoneCan[x]) {
            allAvail =  replaceAt(allAvail, index, '1');
        }
        else{
            allAvail = replaceAt(allAvail, index, '0');
        }
        avail.push(allAvail);
    }
    return avail;

}

 export const actions = {
    update: async ({params, request}) => {
        const data = await request.formData();
        let user_name = String(data.get("user"));
        let avail: boolean[] = [];
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
        var newlist: string[] = updateName(value.users, user_name);
        let index = newlist.indexOf(user_name);
        let newAvailability = getNewAvailability(value, avail, index);

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