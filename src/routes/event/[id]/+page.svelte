<script lang="ts">
    import Navbar from '../../../components/Navbar.svelte';
    import Footer from '../../../components/Footer.svelte';
    import Panel from '../../../components/Panel.svelte';
    import { Label, Input, Button, Datepicker, Heading, P, CloseButton, Dropdown, DropdownItem, } from 'flowbite-svelte';
	import { DateTime } from "luxon";
    import type { PageData } from './$types';
	import { enhance } from '$app/forms';
    export let data: PageData;
    let user = "";
    let start_hour = data.min_hour;
    let end_hour = data.max_hour;
    let start_date = data.start_date;
    let end_date = data.end_date;
    let days = (data.end_date - data.start_date)/(1000*3600*24)+1;
    let hours = (end_hour-start_hour)*4
    let available: boolean[][] = new Array(days)
                                   .fill(false)
                                   .map(() => 
                                     new Array(hours).fill(false)
                                   );

    const arrayRange = () => Array.from(
            { length: (end_hour - start_hour) },
            (_, index) => start_hour + index
        );



    function updateButton(obj) {
        console.log(obj);
        obj.target.value = !(obj.target.value=='true');
    }

    

</script>



<main class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <div class="flex-grow">
        <slot />
    </div>
    
    <form method="POST" action="?/update" use:enhance>
    <section class="bg-white dark:bg-gray-900">
        <Input name="user" value={user} placeholder="Name"></Input>
        <div class="flex py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 justify-center">
            <div class="HOURS-AND-PANELS flex text-sm dark:text-gray-400">
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
                            <div class="mb-2">{new Date(end_date.getTime()+3600*24*1000*day).toLocaleDateString()}</div>
                            {#each arrayRange() as hour}
                                <div id='buttons' class="flex flex-col mb-px">
                                    {#each Array(4) as _, minute}
                                        <Panel id="{day} {hour} {minute}:TZ" active={available[day][hour]}  />
                                    {/each}
                                </div>
                            {/each}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </section>
        <div class="text-center">
            <Button><button >Send my availability</button></Button>
        </div>
        </form>
</main>



<!-- <div class="mt-auto">
    
</div> -->
