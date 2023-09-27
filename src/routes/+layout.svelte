<script lang="ts">
    import "../app.css";
    import Navbar from '../components/Navbar.svelte';
    import Footer from '../components/Footer.svelte';
</script>



<main class="min-h-screen flex flex-col bg-slate-100 dark:bg-gray-900 dark:text-gray-300">
    <Navbar />
    <div class="flex-grow">
        <slot />
    </div>
    <Footer />

</main>



<!-- <div class="mt-auto">
    
</div> -->
