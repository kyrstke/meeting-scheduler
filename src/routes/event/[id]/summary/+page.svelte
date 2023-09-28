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

<main class="min-h-screen flex flex-wrap justify-evenly mt-8">
    <CombinedAvailability {data} bind:bestTimeInfo={bestTimeInfo} />
    <div class="flex flex-col items-center lg:mt-10 gap-2 mx-2">
        <Heading tag="h4" class="text-center mb-4">
            Best time to meet:
        </Heading>
        <Heading tag="h5" class="text-center mb-8">
            {bestTimeInfo["best_time"]} ({bestTimeInfo["best_time_n_users"]} {bestTimeInfo["best_time_n_users"] == 1 ? 'person' : 'people'} available)
        </Heading>
        <Button href="/event/{data.id}" class="w-40 self-center mb-4 sm:mt-0 sm:mb-8">Back to event</Button>
    </div>    
</main>



<!-- <div class="mt-auto">
    
</div> -->
