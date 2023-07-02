<script lang="ts">
    import "../app.css";
    import Navbar from '../components/Navbar.svelte';
    import Footer from '../components/Footer.svelte';
    export let start_hour;
</script>



<main class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <Navbar />
    <div class="flex-grow">
        <slot />
    </div>
    <Footer />

</main>



<!-- <div class="mt-auto">
    
</div> -->
