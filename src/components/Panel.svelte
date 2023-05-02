<script lang="ts">
    export let date;
    let active: boolean = false;
    $: activeClass = active ? 'bg-red-500 hover:bg-opacity-70' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600';
</script>

<button on:click={() => active = !active} class={activeClass + ' rounded-sm overflow-hidden w-16 h-4 mb-025'}></button>

<style>
    .mb-025 {
        margin-bottom: 1px;
    }
</style>