<script lang="ts">
    import Navbar from '../../../components/Navbar.svelte';
    import Footer from '../../../components/Footer.svelte';
    import Panel from '../../../components/Panel.svelte';
    import { Label, Input, Button, Datepicker, Heading, P, CloseButton, Dropdown, DropdownItem, } from 'flowbite-svelte';
	import { DateTime } from "luxon";
    import type { PageData } from './$types';
	import { enhance } from '$app/forms';
    export let data: PageData;
    //Function declaration
    function decToBin(dec){
        return (dec >>> 0).toString(2);
    }
    const sum = (arr) => {
    return arr.reduce((total, current) => {
        return total + parseInt(current);
    }, 0);
    }
    function calculateIntensity(avail){
        console.log("recalculated")
        let usersNumber;
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
    function endEvent(){

    }


    let user = "";
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

<main class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <div class="flex-grow">
        <slot />
    </div>
    
    <form method="POST" action="?/update" use:enhance >
    <section class="bg-white dark:bg-gray-900" style="justify-content: center; vertical-align: middle;">
        
        <div class="flex py-8 px-4 lg:py-16 lg:px-6" style="float:left;width: 40%;">
            <div class="HOURS-AND-PANELS flex text-sm dark:text-gray-400" style="vertical-align: middle;" >
                <div class="HOURS flex flex-col text-right mr-2">
                    {#each arrayRange() as hour}
                        <div class="HALF-HOURS flex flex-col pl-5 h-17">
                            <div class="-mt-3 mb-3.5">{hour}:00</div>
                            <div class="">{hour}:30</div>
                        </div>
                    {/each}
                    <div class="LAST-HOUR -mt-3 pl-5">
                        <div>{end_hour}:00</div>
                    </div>
                </div>
                <div class="PANELS flex" >
                    {#each Array(days) as _, day}
                        <div class="-mt-7 mr-1 text-center">
                            <div class="mb-2">{new Date(data.days[day]).toLocaleDateString()}</div>
                            {#each arrayRange() as hour}
                                <div id='buttons' class="flex flex-col mb-px" >
                                    {#each Array(4) as _, minute}
                                        <Panel id="{day} {hour} {minute}:TZ" active={available[day][minute+4*hour]} />
                                    {/each}
                                </div>
                            {/each}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
        <div  class=" lg:py-16 lg:px-6" style="display: inline-block; float: left; width: 20% ; transform: translate(-50%, 0%); text-align: center;
         justify-content: space-between;">
            <Input name="user" value={user} placeholder="Name"></Input>
            <Button><button on:click={calculateIntensity}>Send my availability</button></Button>
            <Button><button on:click={endEvent}> Finish Event</button></Button>
        </div>
        <div class="flex py-8 px-4 lg:py-16 lg:px-6" style="float:right; width: 40%;" >
            <div class="HOURS-AND-PANELS flex text-sm dark:text-gray-400" >
                <div class="HOURS flex flex-col text-right mr-2">
                    {#each arrayRange() as hour}
                        <div class="HALF-HOURS flex flex-col pl-5 h-17">
                            <div class="-mt-3 mb-3.5">{hour}:00</div>
                            <div class="">{hour}:30</div>
                        </div>
                    {/each}
                    <div class="LAST-HOUR -mt-3 pl-5">
                        <div>{end_hour}:00</div>
                    </div>
                </div>
                <div class="PANELS flex">
                    {#each Array(days) as _, day}
                        <div class="-mt-7 mr-1 text-center">
                            <div class="mb-2">{new Date(data.days[day]).toLocaleDateString()}</div>
                            {#each arrayRange() as hour}
                                <div id='buttons' class="flex flex-col mb-px">
                                    {#each Array(4) as _, minute}
                                    <button type="button" disabled class="rounded-sm overflow-hidden w-12 h-4 mb-px"
                                    style="background-color:rgba(0, 175, 0, {summed[minute+4*(hour-start_hour)+hours*day]})"></button>
                                    {/each}
                                </div>
                            {/each}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </section>
        </form>
</main>



<!-- <div class="mt-auto">
    
</div> -->
