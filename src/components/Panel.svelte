<script lang="ts">
    export let id: string;
    let active: boolean = false;
    $: activeClass = active ? 'bg-red-500 hover:bg-opacity-70' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600';
</script>

<button on:click={() => active = !active} class={activeClass + ' rounded-sm overflow-hidden w-12 h-4 mb-px'}></button>

<!-- {hour}:{minute === 0 ? '00' : minute*15} -->