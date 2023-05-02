
<script lang="ts">
    import Panel from '../components/Panel.svelte';
    import Title from '../components/Title.svelte';
    import { Label, Input, Button, Datepicker, Heading, P, CloseButton, Dropdown, DropdownItem, } from 'flowbite-svelte';
    import { DateTime } from "luxon";
    // import { XMark } from 'svelte-heros';

    // let ranges_no = 0;
    let start_hour = 0;
    let end_hour = 24;

    let start_hour_dropdown_open = false;
    let end_hour_dropdown_open = false;

    let days: number = 6;

    let form_active: boolean = false;

    const onSubmit = (e: any) => {
        const formData = new FormData(e.target);

        const data:any = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value; 
        }
        console.log(data);

        const start_date = DateTime.fromFormat(data.start, 'MM/dd/yyyy');
        const end_date = DateTime.fromFormat(data.end, 'MM/dd/yyyy');

        console.log(start_date, "start_date");
        console.log(end_date, "end_date");

        const diff = end_date.diff(start_date, 'days').toObject().days;

        days = diff ? diff+1 : 1;
        console.log(days, "days");

        // const start_date = DateTime(data.start)

        form_active = false;
    }

    const arrayRange = Array.from(
            { length: (end_hour - start_hour) },
            (_, index) => start_hour + index
        );

</script>

<Title />

{#if form_active}
    <section class="bg-white dark:bg-gray-900 mb-auto">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="text-center flex flex-wrap justify-center">
                <Heading tag="h2" class="mb-4">Create an event</Heading>
                <P class="mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Find the best time for your meeting quicker than ever before</P>
            </div>
            <div class="flex justify-center">
                <form on:submit|preventDefault={onSubmit}>
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
                            <Button color="dark">{start_hour}:00</Button>
                            <Dropdown bind:open={start_hour_dropdown_open} class="w-48 overflow-y-auto py-1 h-48">
                                {#each Array(24) as _, i}
                                    <DropdownItem on:click={() => {start_hour = i; start_hour_dropdown_open = false;}}>{i}:00</DropdownItem>
                                {/each}
                            </Dropdown>
                        </div>
                        <div class="flex items-center justify-center">
                            <Label class="mb-2 mr-2">To</Label>
                            <Button color="dark">{end_hour}:00</Button>
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
                        <Button type="submit" class="mt-4 w-full">Next</Button>
                    </div>
                </form>
            </div>
        </div>
    </section>
{/if}

{#if !form_active}
    <section class="bg-white dark:bg-gray-900">
        <div class="flex py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 justify-center">
            <div class="grid grid-cols-{days+1} text-sm">
                <div class="col-span-1 text-right mr-2">
                    {#each arrayRange as hour}
                        <div class="flex flex-col dark:text-gray-400 pl-5 h-17">
                            <div class="-mt-3 mb-3.5">{hour}:00</div>
                            <div class="">{hour}:30</div>
                        </div>
                    {/each}
                    <div class="dark:text-gray-400 -mt-3 pl-5">
                        <div>{end_hour}:00</div>
                    </div>
                </div>
                <div class="col-span-{days} grid grid-cols-{days}">
                    {#each Array(days) as _}
                        <div class="mr-1">
                            {#each arrayRange as _}
                                <div class="flex flex-wrap flex-col mb-025">
                                    {#each Array(4) as mn}
                                        <Panel date={DateTime.now()}/>
                                    {/each}
                                </div>
                            {/each}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </section>
{/if}

<style>
    .mb-025 {
        margin-bottom: 1px;
    }

    .h-17 {
        height: 4.3125rem;
    }
</style>