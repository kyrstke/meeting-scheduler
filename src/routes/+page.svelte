
<script lang="ts">
    import Panel from '../components/Panel.svelte';
    import Title from '../components/Title.svelte';
    import { Label, Input, Button, Datepicker, Heading, P, CloseButton, Dropdown, DropdownItem, } from 'flowbite-svelte';
    import { DateTime } from "luxon";
    // import { XMark } from 'svelte-heros';

    // let ranges_no = 0;
    let start_hour = 8;
    let end_hour = 16;
    let start_hour_dropdown_open = false;
    let end_hour_dropdown_open = false;

    let days: number = 3;

    let start_date: DateTime = DateTime.now().setLocale('pl');
    let end_date: DateTime = DateTime.now().setLocale('pl').plus({days: days});

    const arrayRange = () => Array.from(
            { length: (end_hour - start_hour) },
            (_, index) => start_hour + index
        );

</script>

<Title />
    <section class="bg-white dark:bg-gray-900 mb-auto">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="text-center flex flex-wrap justify-center">
                <Heading tag="h2" class="mb-4">Create an event</Heading>
                <P class="mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Find the best time for your meeting quicker than ever before</P>
            </div>
            <div class="flex justify-center">
                <form method="POST">
                    <div class="mb-6">
                        <Label for="event_name" class="mb-2">Event name</Label>
                        <Input type="text" id="event_name" name="event_name" placeholder="My event" required />
                    </div>
                    <div class="mb-6">
                        <Label for="datepicker" class="mb-2">Dates range</Label>
                        <Datepicker range required />  
                    </div>
                    <Label class="mb-2">Hours range</Label>
                    <div class="flex justify-center mb-4">
                        <div class="flex items-center justify-center mr-20">
                            <Label class="mb-2 mr-2">From</Label>
                            <Input type=number id="start_hour" name="start_hour" bind:value={start_hour}/>
                            <Dropdown bind:open={start_hour_dropdown_open} class="w-48 overflow-y-auto py-1 h-48">
                                {#each Array(24) as _, i}
                                    <DropdownItem on:click={() => {start_hour = i; start_hour_dropdown_open = false;}}>{i}:00</DropdownItem>
                                {/each}
                            </Dropdown>
                        </div>
                        <div class="flex items-center justify-center">
                            <Label class="mb-2 mr-2">To</Label>
                            <Input type=number id="end_hour" name="end_hour" bind:value={end_hour}/>
                            <Dropdown bind:open={end_hour_dropdown_open} class="w-48 overflow-y-auto py-1 h-48">
                                {#each Array(24) as _, i}
                                    <DropdownItem on:click={() => {end_hour = i; end_hour_dropdown_open = false;}}>{i}:00</DropdownItem>
                                {/each}
                            </Dropdown>
                        </div>
                    </div>
                    <!-- {#each Array(ranges_no) as _, i}
                        <div class="mb-6">
                            <div class="flex justify-between">
                                <Label for="datepicker" class="mb-2">Range {i + 2}</Label>
                                <CloseButton class="dark:text-gray-200 text-gray-700" on:click={() => {ranges_no--}} />
                            </div>
                            <Datepicker range/>
                        </div>
                    {/each} -->
                    <div class="mt-4 flex justify-between">
                        <!-- <Button color="alternative" type="button" on:click={() => {ranges_no++}}>Add another range</Button> -->
                        
                    </div>
                    <Button type="submit" class="mt-4 w-full">Next</Button>
                </form>
            </div>
        </div>
    </section>

<style>
    .h-17 {
        height: 4.3125rem;
    }
</style>