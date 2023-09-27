<script lang="ts">
    import AvailabilityForm from '../../../../components/AvailabilityForm.svelte';
    import CombinedAvailability from '../../../../components/CombinedAvailability.svelte';
    import type { PageData } from './$types';
    export let data: PageData;

    console.log('data:', data)
</script>

<main class="min-h-screen flex flex-col justify-center">
    <section class="flex justify-evenly dark:text-gray-400">
        <CombinedAvailability {data}/>
    </section>
</main>



<!-- <div class="mt-auto">
    
</div> -->
