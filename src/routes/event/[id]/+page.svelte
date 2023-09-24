<script lang="ts">
    import AvailabilityForm from '../../../components/AvailabilityForm.svelte';
    import CombinedAvailability from '../../../components/CombinedAvailability.svelte';
    import type { PageData } from './$types';
    export let data: PageData;

    console.log('data:', data)
</script>

<section class="flex flex-wrap justify-evenly">
    <AvailabilityForm {data} />
    <CombinedAvailability {data}/>
</section>



<!-- <div class="mt-auto">
    
</div> -->
