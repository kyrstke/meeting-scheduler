
<script lang="ts">

    import Title from '../components/Title.svelte';
    import { Label, Input, Button, Datepicker, Heading, P, CloseButton } from 'flowbite-svelte';
    // import { XMark } from 'svelte-heros';

    let ranges_no = 0;
    let start_hour = 9;
    let end_hour = 22;

    const handleNextButton = () => {
        console.log('Next');
    }

    const arrayRange = Array.from(
            { length: (end_hour - start_hour) },
            (_, index) => start_hour + index
        );

</script>

<Title />

<section class="bg-white dark:bg-gray-900">
    <div class="flex py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="-mt-4 mr-1">
            {#each arrayRange as hour}
                <div class="flex flex-col dark:text-gray-400">
                    <div class="mb-3">{hour}:00</div>
                </div>
            {/each}
            <div class="dark:text-gray-400">
                <div>{end_hour}:00</div>
            </div>
        </div>
        <div class="">
            {#each arrayRange as _}
                <div class="flex flex-wrap flex-col mb-0.5">
                    {#each Array(2) as _}
                        <div class="bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 rounded overflow-hidden w-16 h-3 m-0.5"></div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</section>

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
                    <Datepicker range required />  
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
                    <Button type="submit" class="mt-4 w-full" on:click={handleNextButton}>Next</Button>
                </div>
            </form>
        </div>
    </div>
</section>