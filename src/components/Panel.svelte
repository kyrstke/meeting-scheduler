<script lang="ts">
    let active: boolean = false;
    $: activeClass = active ? 'bg-red-500 hover:bg-opacity-70 rounded-sm overflow-hidden w-16 h-4 mb-025' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-sm overflow-hidden w-16 h-4 mb-025';
</script>

<button on:click={() => active = !active} class={activeClass}></button>

<style>
    .mb-025 {
        margin-bottom: 1px;
    }
</style>