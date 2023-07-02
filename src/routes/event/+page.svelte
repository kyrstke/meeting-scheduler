<script lang="ts">
    import Panel from "../../components/Panel.svelte";
	import { DateTime } from "luxon";
    let start_hour = 8;
    let end_hour = 16;
    let days: number = 3;
    let start_date: DateTime = DateTime.now().setLocale('pl');

    
    const arrayRange = () => Array.from(
            { length: (end_hour - start_hour) },
            (_, index) => start_hour + index
        );

</script>



<main class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <div class="flex-grow">
        <slot />
    </div>
    <section class="bg-white dark:bg-gray-900">
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
                            <div class="mb-2">{start_date.plus({days: day}).toLocaleString({day: 'numeric', month: 'numeric'})}</div>
                            {#each arrayRange() as hour}
                                <div class="flex flex-col mb-px">
                                    {#each Array(4) as _, minute}
                                        <Panel id="{day} {hour} {minute}"/>
                                    {/each}
                                </div>
                            {/each}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </section>

</main>



<!-- <div class="mt-auto">
    
</div> -->
