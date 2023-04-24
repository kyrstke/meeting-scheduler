
<script lang="ts">
    import Panel from '../components/Panel.svelte';
    import Title from '../components/Title.svelte';
    import { Label, Input, Button, Datepicker, Heading, P, CloseButton, Dropdown, DropdownItem, } from 'flowbite-svelte';
    // import { XMark } from 'svelte-heros';

    let ranges_no = 0;
    let start_hour = 9;
    let start_minute = 0;
    let end_hour = 17;
    let end_minute = 0;

    let start_hour_dropdown_open = false;
    let end_hour_dropdown_open = false;

    let form_active: boolean = true;

    const onSubmit = (e: any) => {
        const formData = new FormData(e.target);

        const data:any = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value; 
        }
        console.log(data)

        // form_active = false;
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
                    <div class="mb-6">
                        <Label for="hours_range" class="mb-2">Hours range</Label>
                        <Button color="dark">{start_hour}:{start_minute ? start_minute : '00'}</Button>
                        <Dropdown bind:open={start_hour_dropdown_open} class="w-48 overflow-y-auto py-1 h-48">
                            {#each Array(24) as _, i}
                                {#each Array(4) as _, j}
                                    <DropdownItem on:click={() => {start_hour = i; start_minute = j*15; start_hour_dropdown_open = false;}}>{i}:{j ? j*15 : '00'}</DropdownItem>
                                {/each}
                            {/each}
                        </Dropdown>
                        <Button color="dark">{end_hour}:{end_minute ? end_minute : '00'}</Button>
                        <Dropdown bind:open={end_hour_dropdown_open} class="w-48 overflow-y-auto py-1 h-48">
                            {#each Array(24) as _, i}
                                {#each Array(4) as _, j}
                                    <DropdownItem on:click={() => {end_hour = i; end_minute = j*15; end_hour_dropdown_open = false;}}>{i}:{j ? j*15 : '00'}</DropdownItem>
                                {/each}
                            {/each}
                        </Dropdown>
                    </div>
                    {#each Array(ranges_no) as _, i}
                        <div class="mb-6">
                            <div class="flex justify-between">
                                <Label for="datepicker" class="mb-2">Range {i + 2}</Label>
                                <CloseButton class="dark:text-gray-200 text-gray-700" on:click={() => {ranges_no--}} />
                            </div>
                            <Datepicker range/>
                        </div>
                    {/each}
                    <div class="mt-8 flex justify-between">
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
            <div class="grid grid-cols-2 text-sm">
                {#each arrayRange as hour}
                    <div class="flex flex-col dark:text-gray-400 pl-5">
                        <div class="-mt-3 mb-3.5">{hour}:00</div>
                        <div class="">{hour}:30</div>
                    </div>
                    <div class="flex flex-wrap flex-col mb-025">
                        {#each Array(4) as _}
                            <Panel />
                        {/each}
                    </div>
                {/each}
                <div class="dark:text-gray-400 -mt-3 pl-5">
                    <div>{end_hour}:00</div>
                </div>
            </div>
        </div>
    </section>
{/if}

<style>
    .mb-025 {
        margin-bottom: 1px;
    }
</style>