<script lang="ts">
    import type { PageData } from './$types';
	import OutputPanel from './OutputPanel.svelte';
    export let data: PageData;
    export let current_hovered_panel: string = "";

    //Function declaration
    function decToBin(dec: number){
        return (dec >>> 0).toString(2);
    }

    const sum = (arr: any[]) => {
        return arr.reduce((total: number, current: string) => {
            return total + parseInt(current);
        }, 0);
    }

    function calculateIntensity(avail: string | any[]){
        let usersNumber: number;
        if (data.users.length == 0){
            usersNumber = 1;
        }
        else{
            usersNumber = data.users.length;
        }
        for (let x =0;x<avail.length;x++){
            summed[x] = (((sum(decToBin(avail[x]).split("")))/usersNumber)*0.8+0.1);
        }
    }

    function formatDate(date_string: string){
        const options = { month: 'numeric', day: 'numeric' };
        return new Date(date_string).toLocaleDateString(undefined, options)
    }

    function handleMouseEnter(event){
        current_hovered_panel = event.detail.id;
    }

    function handleMouseLeave(){
        current_hovered_panel = "";
    }

    let user = "";

    // if data is undefined, set it to empty object
    if (data == undefined){
        console.log("Warning! Data is undefined.")
        data = {
            availability: [],
            days: [],
            users: [],
            min_hour: 0,
            max_hour: 0,
        }
    }

    let start_hour = data.min_hour;
    let end_hour = data.max_hour;
    let start_date = data.days[0];
    let end_date = data.days[data.days.length-1];
    let days = data.days.length;
    let hours = (end_hour-start_hour)*4

    let available: boolean[][] = new Array(data.days.length)
                                   .fill(false)
                                   .map(() => 
                                     new Array(hours).fill(false)
                                   );

    const arrayRange = () => Array.from(
            { length: (end_hour - start_hour) },
            (_, index) => start_hour + index
        );

    let avail: number[] = data.availability;
    let summed : number[] = [];
    
    for (let x =0;x<data.availability.length;x++){
        summed.push(0);
    }
    
    calculateIntensity(avail); //Values are not updated after every availability send

</script>

<div class="flex py-8 px-4 lg:py-16 lg:px-6" >
    <div class="HOURS-AND-PANELS flex text-sm dark:text-gray-400" >
        <div class="HOURS flex flex-col text-right mr-2 -mt-3 gap-[14.5px]">
            {#each arrayRange() as hour}
                    <div class="">{hour}:00</div>
                    <div class="">{hour}:30</div>
            {/each}
            <div class="LAST-HOUR ">
                <div>{end_hour}:00</div>
            </div>
        </div>
        <div class="PANELS flex">
            {#each Array(days) as _, day}
                <div class="-mt-7 mr-1 text-center">
                    <div class="mb-2">{formatDate(data.days[day])}</div>
                    {#each arrayRange() as hour}
                        <div id='buttons' class="flex flex-col mb-px">
                            {#each Array(4) as _, minute}
                                <OutputPanel 
                                    id="{day} {hour} {minute}"
                                    on:mouse_enter={handleMouseEnter}
                                    on:mouse_leave={handleMouseLeave}
                                    custom_style="background-color:rgba(0, 175, 0, 
                                    {summed[minute+4*(hour-start_hour)+hours*day]})"
                                />
                            {/each}
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div>

