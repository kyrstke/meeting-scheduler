<script lang="ts">
    import CombinedAvailability from '../../../../components/CombinedAvailability.svelte';
    import { Button } from 'flowbite-svelte';
    import type { PageData } from './$types';
    export let data: PageData;

    console.log('data:', data)
</script>

<main class="min-h-screen flex flex-col justify-center">
    <section class="flex justify-evenly dark:text-gray-400">
        <div class="flex flex-col">
            <Button href="/event/{data.id}" class="w-40 self-center mt-8 mb-4 sm:mt-0 sm:mb-8">Back to event</Button>
            <CombinedAvailability {data}/>
        </div>
        
    </section>
    
</main>



<!-- <div class="mt-auto">
    
</div> -->
