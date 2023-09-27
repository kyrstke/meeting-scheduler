<script lang="ts">
    export let id: string;
    export let custom_style: string;

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function mouse_enter(){
        dispatch('mouse_enter', {id: id});
    }

    function mouse_leave(){
        dispatch('mouse_leave', {id: id});
    }

 </script>

<button on:mouseenter={mouse_enter} on:mouseleave={mouse_leave} type="button" disabled class="rounded-sm overflow-hidden w-12 h-4 mb-px" style={custom_style}></button>