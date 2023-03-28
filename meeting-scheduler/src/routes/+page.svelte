
<script lang="ts">

    import Title from '../components/Title.svelte';
    import { Label, Input, Button, ButtonGroup, Datepicker, Heading, P } from 'flowbite-svelte';
    // import { XMark } from 'svelte-heros';

    // let ranges_no = 0;

    // function add_range() {
    //     ranges_no++;
    //     console.log(ranges_no);
    // }

</script>

<Title />

<!-- <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <Input>
        <div class="flex flex-wrap flex-col m-4 hidden">
            <div class="panel"></div>
            <div class="panel"></div>
            <div class="panel"></div>
            <div class="panel"></div>
            <div class="panel"></div>
            <div class="panel"></div>
            <div class="panel"></div>
            <div class="panel"></div>
            <div class="panel"></div>
            <div class="panel"></div>
            <div class="panel"></div>
            <div class="panel"></div>
            <div class="panel"></div>
        </div>
    </div>
</section> -->

<section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="text-center flex flex-wrap justify-center">
            <Heading tag="h2" class="mb-4">Create an event</Heading>
            <P class="mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Find the best time for your meeting quicker than ever before</P>
        </div>
        <div class="flex justify-center">
            <form>
                <div class="mb-6">
                    <Label for="event_name" class="mb-2">Event name</Label>
                    <Input type="text" id="event_name" placeholder="My event" required />
                </div>
                <div class="mb-6">
                    <Label for="datepicker" class="mb-2">Range</Label>
                    <Datepicker range />  
                </div>
                <!-- {#each Array(ranges_no) as _, i}
                    <div class="mb-6">
                        <div class="flex justify-between">
                            <Label for="datepicker" class="mb-2">Range {i + 2}</Label>
                            <button class="text-gray-100 dark:text-gray-400" on:click={() => {ranges_no--}}><XMark></XMark></button>
                        </div>
                        <Datepicker range/>
                    </div>
                {/each} -->
                <div class="mt-8 flex justify-between">
                    <!-- <Button color="alternative" type="button" on:click={add_range}>Add another range</Button> -->
                    <Button type="submit" class="mt-4 w-full">Next</Button>
                </div>
            </form>
        </div>
    </div>
</section>