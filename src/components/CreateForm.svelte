<script lang="ts">
	import {
		Label,
		Input,
		Button,
		Datepicker,
		Heading,
		P,
		CloseButton,
		Dropdown,
		DropdownItem
	} from 'flowbite-svelte';
	import { DateTime } from 'luxon';

	let start_hour = 8;
	let end_hour = 16;
	let start_hour_dropdown_open = false;
	let end_hour_dropdown_open = false;

	let days: number = 3;


	let start_date: DateTime = DateTime.now().setLocale('pl');
	let end_date: DateTime = DateTime.now().setLocale('pl').plus({ days: days });

	const arrayRange = () =>
		Array.from({ length: end_hour - start_hour }, (_, index) => start_hour + index);
</script>

<section class="mb-auto bg-white dark:bg-gray-900">
	<div class="mx-auto max-w-screen-xl px-4 mt-8 lg:px-6 lg:my-12">
		<div class="flex flex-wrap justify-center text-center">
			<Heading tag="h2" class="mb-4">Create an event</Heading>
			<P class="mb-6 text-lg dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48"
				>Find the best time for your meeting quicker than ever before</P
			>
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
				<div class="mb-4 flex justify-center">
					<div class="mr-20 flex flex-col items-center justify-center">
						<Label class="mb-2 mr-2">From</Label>
						<Input type="text" id="start_hour" name="start_hour" bind:value={start_hour} class="w-20"/>
						<Dropdown bind:open={start_hour_dropdown_open} class="h-48 w-20 overflow-y-auto py-1">
							{#each Array(24) as _, i}
								<DropdownItem
									on:click={() => {
										start_hour = i;
										start_hour_dropdown_open = false;
									}}>{i}:00</DropdownItem
								>
							{/each}
						</Dropdown>
					</div>
					<div class="flex flex-col items-center justify-center">
						<Label class="mb-2 mr-2 block">To</Label>
						<Input type="text" id="end_hour" name="end_hour" bind:value={end_hour} class="w-20"/>
						<Dropdown bind:open={end_hour_dropdown_open} class="h-48 w-20 overflow-y-auto py-1">
							{#each Array(24) as _, i}
								<DropdownItem
									on:click={() => {
										end_hour = i;
										end_hour_dropdown_open = false;
									}}>{i}:00</DropdownItem
								>
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
				<Button type="submit" class="mt-4 w-full">Create</Button>
			</form>
		</div>
	</div>
</section>

<style>
	.h-17 {
		height: 4.3125rem;
	}
</style>

