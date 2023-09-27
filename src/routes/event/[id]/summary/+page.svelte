<script lang="ts">
    import CombinedAvailability from '../../../../components/CombinedAvailability.svelte';
    import { Button, Heading } from 'flowbite-svelte';
    import type { PageData } from './$types';
    export let data: PageData;

    interface BestTimeInfo {
        best_time: string;
        best_time_n_users: number;
    }

    let bestTimeInfo: BestTimeInfo = {
        best_time: "",
        best_time_n_users: 0
    }

    console.log('data:', data)
</script>

<main class="min-h-screen flex flex-col justify-center">
    <div class="flex justify-evenly dark:text-gray-400">
        <div class="flex flex-col">
            <Button href="/event/{data.id}" class="w-40 self-center mt-8 mb-4 sm:mt-0 sm:mb-8">Back to event</Button>
            <CombinedAvailability {data} bind:bestTimeInfo={bestTimeInfo} />
            <!-- <div class="flex flex-col items-center lg:mt-32 gap-4 mx-2 border">
                <Heading tag="h4" class="text-center">
                    Best time to meet:
                </Heading>
                <Heading tag="h5" class="text-center">
                    {bestTimeInfo["best_time"]}
                </Heading>
                <Heading tag="h5" class="text-center">
                    ({bestTimeInfo["best_time_n_users"]} people available)
                </Heading>
            </div> -->
        </div>
        
        
    </div>
    
</main>



<!-- <div class="mt-auto">
    
</div> -->
