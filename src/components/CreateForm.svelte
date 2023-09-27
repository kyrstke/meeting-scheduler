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
	import {DateInput} from 'date-picker-svelte';

	const validate = async() => {
		let now = new Date()
		if (end_hour < start_hour){
			alert("End hour can't be earlier then start!")
			return false;
		}
		for (var x=0; x<dates.length; x=x+2) {
			if (dates[x].getDate() > dates[x+1].getDate()){
				alert("End date in date range no "+ (x/2+1).toString() +" can't be earlier then start!")
				return false;
			}
			// if (now.getDate() > dates[x].getDate() || now.getDate() > dates[x].getDate()){ //Do we want to make it possible?
			// 	alert("Are you sure you want to create event in past?") 
			// }
		}
		if (document != null) {
			(document.getElementById("form") as HTMLFormElement)!.submit()
		}
	}

	let timeNow = new Date();
	let timeNowString = timeNow.getFullYear() + '-' + (timeNow.getMonth() + 1) + '-' + timeNow.getDate(); 
	let start_hour = 8;
	let end_hour = 16;
	let start_hour_dropdown_open = false;
	let end_hour_dropdown_open = false;
	let end_date: Date;
	let days: number = 3;
	let ranges_no = 0;

	let dates: Date[] = [];

	const arrayRange = () => Array.from({ length: end_hour - start_hour }, (_, index) => start_hour + index);
</script>

<section class="mb-auto">
	<div class="mx-auto max-w-screen-xl px-4 mt-8 lg:px-6 lg:my-12">
		<div class="flex flex-wrap justify-center text-center">
			<Heading tag="h2" class="mb-4">Create an event</Heading>
			<P class="mb-6 text-lg dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48"
				>Find the best time for your meeting quicker than ever before</P>
		</div>
		<div class="flex justify-center">
			<form method="POST" on:submit|preventDefault={validate} id="form">
				<div class="mb-6">
					<Label for="event_name" class="mb-2">Event name</Label>
					<Input type="text" id="event_name" name="event_name" placeholder="My event" required />
				</div>
				<div class="mb-6">
					<Label for="mail" class="mb-2">Email</Label>
					<Input type="email" id="mail" name="mail" placeholder="mail@mail.com" required />
				</div>
				<Label class="mb-2 mr-2 flex justify-center">End Date</Label>
				<div class="mb-6 flex justify-center">
					<DateInput bind:value={end_date} format="yyyy-MM-dd" placeholder="{timeNowString}" min={timeNow}/>
					<input type="text" name="end_date" bind:value={end_date} required style="opacity: 0; width:0; position: absolute">
				</div>
				<Label class="mb-2">Hours range</Label>
				<div class="mb-4 flex justify-center">
					<div class="mr-20 flex flex-col items-center justify-center">
						<Label class="mb-2 mr-2">From</Label>
						<Input type="text" id="start_hour" name="start_hour" bind:value={start_hour} class="w-20" required/>
						<Dropdown bind:open={start_hour_dropdown_open} class="h-48 w-20 overflow-y-auto py-1">
							{#each Array(24) as _, i}
								<DropdownItem
									on:click={() => {
										start_hour = i;
										start_hour_dropdown_open = false;
									}}>
									{i}:00
								</DropdownItem>
							{/each}
						</Dropdown>
					</div>
					<div class="flex flex-col items-center justify-center">
						<Label class="mb-2 mr-2 block">To</Label>
						<Input type="text" id="end_hour" name="end_hour" bind:value={end_hour} class="w-20" required/>
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
				<div class="mb-6" style="position: relative">
					<Label for="datepicker" class="mb-2">Date range</Label>
					<div class="flex justify-between">
					<DateInput bind:value={dates[0]} format="yyyy-MM-dd" placeholder="{timeNowString}" min={timeNow}/>
					<input type="text" name="range-0" bind:value={dates[0]} required style="opacity: 0; width:0; position: absolute; left: 20px">
					<DateInput bind:value={dates[1]} format="yyyy-MM-dd" placeholder="{timeNowString}" min={timeNow}/>
					<input type="text" name="range-1" bind:value={dates[1]} required style="opacity: 0; width:0; position: absolute; right:125px">
					</div> 
				</div>
				{#each Array(ranges_no) as _, i}
                        <div class="mb-6">
                            <div class="flex justify-between">
                                <Label for="datepicker" class="mb-2">Date range {i + 2}</Label>
                                <CloseButton class="dark:text-gray-200 text-gray-700" on:click={() => {ranges_no--}} />
                            </div>
							<div class="flex justify-between" style="position: relative">
								<DateInput bind:value={dates[2+i*2]} format="yyyy-MM-dd" placeholder="{timeNowString}" min={timeNow}/>
								<input type="text" name="range-{2+i*2}" bind:value={dates[2+i*2]} required style="opacity: 0; width:0; position: absolute; left: 20px">
								<DateInput bind:value={dates[2+i*2+1]} format="yyyy-MM-dd" placeholder="{timeNowString}" min={timeNow}/>
								<input type="text" name="range-{2+i*2+1}" bind:value={dates[2+i*2+1]} required style="opacity: 0; width:0; position: absolute; right:125px">
							</div> 
                        </div>
                    {/each}
				<div class="mt-4 flex justify-between">
					<Button color="alternative" type="button" on:click={() => {ranges_no++}}>Add another range</Button>
				</div>
				<Button type="submit" class="mt-4 w-full">Create</Button>
			</form>
		</div>
	</div>
</section>

