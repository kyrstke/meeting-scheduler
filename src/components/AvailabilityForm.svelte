<script lang="ts">
    import InputPanel from './InputPanel.svelte';
    import { Input, Button } from 'flowbite-svelte';
    import type { PageData } from './$types';
	import type { DateTimeFormatOptions } from 'luxon';
    import { redirect } from "@sveltejs/kit";
    export let data: PageData;
    
    function finishEvent(){
        console.log("Event ended");
        throw redirect(303, "/summary");
    }

    function formatDate(date_string: string){
        const options: DateTimeFormatOptions = { month: 'numeric', day: 'numeric' };
        return new Date(date_string).toLocaleDateString(undefined, options)
    }

    let user = "";
    let mail = "";
    let start_hour = data.min_hour;
    let end_hour = data.max_hour;
    let n_days = data.days.length;
    let n_panels = (end_hour-start_hour) * 4;

    let available: boolean[][] = new Array(data.days.length)
                                   .fill(false)
                                   .map(() => 
                                     new Array(n_panels).fill(false)
                                   );

    const arrayRange = () => Array.from(
            { length: (end_hour - start_hour) },
            (_, index) => start_hour + index
        );
    
    let showAvForm = true;
</script>

<form method="POST" action="?/update" class="flex flex-wrap justify-evenly">
    {#if showAvForm}
        <div class="flex pt-8 pb-8 px-4 sm:pt-16 sm:px-6">
            <div class="HOURS-AND-PANELS flex text-sm">
                <div class="HOURS flex flex-col text-right mr-2 -mt-3 gap-[14.5px]">
                    {#each arrayRange() as hour}
                        <div class="">{hour}:00</div>
                        <div class="">{hour}:30</div>
                    {/each}
                    <div class="LAST-HOUR">
                        <div>{end_hour}:00</div>
                    </div>
                </div>
                <div class="PANELS flex flex-wrap">
                    {#each Array(n_days) as _, day}
                        <div class="-mt-7 mr-1 text-center">
                            <div class="mb-2">{formatDate(data.days[day])}</div>
                            {#each arrayRange() as hour}
                                <div id='buttons' class="flex flex-col mb-px last:mb-10">
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
    {/if}
    <div class="py-6 px-4 sm:py-12 lg:px-6 flex flex-col justify-start text-center gap-1 w-[200px] text-xs lg:w-[250px] sm:text-base">
        {#if showAvForm}
            <Input name="user" value={user} placeholder="Name" required></Input>
            <Input name="mail" value={mail} placeholder="mail@mail.com"></Input>
            <Button type="submit">Submit availabilty</Button>
        {/if}
        <Button on:click={() => showAvForm = !showAvForm} class="mb-2 sm:mb-4">{showAvForm ? "Hide form" : "Show form"}</Button>
        <Button href="/event/{data.id}/summary">Detailed summary</Button>
    </div>
</form>

