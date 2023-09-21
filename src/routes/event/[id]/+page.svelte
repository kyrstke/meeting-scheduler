<script lang="ts">
    import CombinedAvailability from '../../../components/CombinedAvailability.svelte';
    import InputPanel from '../../../components/InputPanel.svelte';
    import { Input, Button,} from 'flowbite-svelte';
    import type { PageData } from './$types';
	import type { DateTimeFormatOptions } from 'luxon';
    export let data: PageData;

    console.log('data:', data)

    //Function declaration
    function decToBin(dec: number){
        return dec.toString(2);
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

    function endEvent(){
        console.log("Event ended")
    }

    function formatDate(date_string: string){
        const options: DateTimeFormatOptions = { month: 'numeric', day: 'numeric' };
        return new Date(date_string).toLocaleDateString(undefined, options)
    }

    let user = "";
    let start_hour = data.min_hour;
    let end_hour = data.max_hour;
    let start_day_number = data.days[0];
    let end_day_number = data.days[data.days.length-1];
    let n_days = data.days.length;
    let n_panels = (end_hour-start_hour)*4

    let available: boolean[][] = new Array(data.days.length)
                                   .fill(false)
                                   .map(() => 
                                     new Array(n_panels).fill(false)
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

    let current_hovered_panel = "";

    function calculateIfUserIsAvailable(panel_id: string, user: string){
        let day = parseInt(panel_id.split(" ")[0]);
        let hour = parseInt(panel_id.split(" ")[1]);
        let minute = parseInt(panel_id.split(" ")[2]);

        let user_index = data.users.indexOf(user);
        let panel_index = day * n_panels + (hour - start_hour) * 4 + minute

        let bin = decToBin(avail[panel_index])

        if (bin[user_index] == "1") {
            return true;
        } else {
            return false;
        }
    }
</script>

<main class="min-h-screen flex flex-col justify-center bg-white dark:bg-gray-900">
    
    <form method="POST" action="?/update">
        <section class="flex justify-evenly bg-white dark:bg-gray-900 dark:text-gray-400">
            
            <div class="flex py-8 px-4 lg:py-16 lg:px-6" >
                <div class="HOURS-AND-PANELS flex text-sm" style="vertical-align: middle;" >
                    <div class="HOURS flex flex-col text-right mr-2 -mt-3 gap-[14.5px]">
                        {#each arrayRange() as hour}
                            <div class="">{hour}:00</div>
                            <div class="">{hour}:30</div>
                        {/each}
                        <div class="LAST-HOUR">
                            <div>{end_hour}:00</div>
                        </div>
                    </div>
                    <div class="PANELS flex">
                        {#each Array(n_days) as _, day}
                            <div class="-mt-7 mr-1 text-center">
                                <div class="mb-2">{formatDate(data.days[day])}</div>
                                {#each arrayRange() as hour}
                                    <div id='buttons' class="flex flex-col mb-px">
                                        {#each Array(4) as _, minute}
                                            <InputPanel id="{day} {minute} {hour}:TZ" active={available[day][(hour - start_hour) * 4 + minute]} />
                                        {/each}
                                    </div>
                                {/each}
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
            <div class="lg:py-16 lg:px-6 flex flex-col justify-start text-center gap-4">
                <Input name="user" value={user} placeholder="Enter your name here" required></Input>
                <Button><button on:click={calculateIntensity}>Send my availability</button></Button>
                <Button><button on:click={endEvent}>Finish Event</button></Button>
            </div>
            <!-- display two lists of users: available and unavailable on mouse_enter on a panel -->
            <div class="lg:py-16 lg:px-6 flex justify-center text-center gap-4">
                <div>
                    <h1>Available</h1>
                    <ul>
                        {#each data.users as user}
                            {#if current_hovered_panel != "" && calculateIfUserIsAvailable(current_hovered_panel, user)}
                                <li>{user}</li>
                            {/if}
                        {/each}
                    </ul>
                </div>
                <div>
                    <h1>Unavailable</h1>
                    <ul>
                        {#each data.users as user}
                            {#if current_hovered_panel != "" && !calculateIfUserIsAvailable(current_hovered_panel, user)}
                                <li>{user}</li>
                            {/if}
                        {/each}
                    </ul>
                </div>
            </div>
            <CombinedAvailability {data} bind:current_hovered_panel />
        </section>
    </form>
</main>



<!-- <div class="mt-auto">
    
</div> -->
