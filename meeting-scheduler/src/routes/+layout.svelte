<script lang="ts">
    import "../app.css";
    import Navbar from '../components/Navbar.svelte';
    import Footer from '../components/Footer.svelte';
</script>

<Navbar />

<main>
    <slot />
</main>

<div class="mt-auto">
    <Footer />
</div>
