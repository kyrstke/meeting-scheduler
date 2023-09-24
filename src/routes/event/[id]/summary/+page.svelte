<script lang="ts">
    import AvailabilityForm from '../../../../components/AvailabilityForm.svelte';
    import CombinedAvailability from '../../../../components/CombinedAvailability.svelte';
    import type { PageData } from './$types';
    export let data: PageData;

    console.log('data:', data)
</script>

<main class="min-h-screen flex flex-col justify-center bg-white dark:bg-gray-900">
    <section class="flex justify-evenly bg-white dark:bg-gray-900 dark:text-gray-400">
        <CombinedAvailability {data}/>
    </section>
</main>



<!-- <div class="mt-auto">
    
</div> -->
