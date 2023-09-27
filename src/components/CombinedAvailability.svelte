<script lang="ts">
    import type { PageData } from './$types';
	import OutputPanel from './OutputPanel.svelte';
    import { Heading, P } from 'flowbite-svelte';
	import type { DateTimeFormatOptions } from 'luxon';

    export let data: PageData;
    export let current_hovered_panel: string = "";

    $: showDateOnHover = current_hovered_panel != "";

    function sumChars(bin: string, char: string = "1"){
        let sum = 0;
        for (let i = 0; i < bin.length; i++){
            if (bin[i] == char){
                sum += 1;
            }
        }
        return sum;
    }

    const max = (arr: number[]) => {
        return arr.reduce((max: number, current: number) => {
            return Math.max(max, current);
        }, 0);
    }

    const min = (arr: number[]) => {
        return arr.reduce((min: number, current: number) => {
            return Math.min(min, current);
        }, Infinity);
    }

    function calculateNAvailUsers() {
        let n_avail_users: number[] = [];
        for (let x=0; x<avail.length; x++) {
            n_avail_users[x] = sumChars(avail[x]);
        }
        return n_avail_users;
    }

    function calculateIntensity() {
        let colorIntensity: number[] = [];
        const delta = max_n_avail_users - min_n_avail_users;
        const exponent = 1.5;

        for (let x=0; x<n_avail_users.length; x++) {
            let cur_avail_users = n_avail_users[x];
            if (cur_avail_users == max_n_avail_users) {
                colorIntensity[x] = 1;
                continue;
            } else if (cur_avail_users == min_n_avail_users) {
                colorIntensity[x] = 0.05;
                continue;
            }
            const normalizedValue = (n_avail_users[x] - min_n_avail_users) / delta;
            colorIntensity[x] = Math.pow(normalizedValue, exponent) * 0.8 + 0.1;
        }
        return colorIntensity;
    }

    function formatDate(date_string: string){
        const options = { month: 'numeric', day: 'numeric' };
        return new Date(date_string).toLocaleDateString(undefined, options)
    }

    function handleMouseEnter(event) {
        current_hovered_panel = event.detail.id;
        console.log('current_hovered_panel', current_hovered_panel);
    }

    function handleMouseLeave(){
        current_hovered_panel = "";
    }

    function formatDateAndTime(date: Date, hour: number, minute: number){
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const options: DateTimeFormatOptions = { weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(year, month, day, hour, minute*15).toLocaleDateString(undefined, options)
    }

    function calculateIfUserIsAvailable(user: string){
        let user_index = data.users.indexOf(user);
        let bin = avail[panel_index];

        if (bin[user_index] == "1") {
            return true;
        } else {
            return false;
        }
    }

    function calculateUsersForPanel(char: string = "1") {
        let bin = avail[panel_index];
        return sumChars(bin, char);
    }

    const nAvailUsersSet = () => {
        const set = new Set(n_avail_users);
        console.log('nAvailUsersSet', set);
        let arr = Array.from(set).sort((a, b) => b - a);
        console.log('nAvailUsersSet', arr);
        return arr;
    }

    const colorIntensitySet = () => {
        const set = new Set(colorIntensity);
        const array = Array.from(set).sort((a, b) => b - a);
        console.log('colorIntensity', array);
        return array;
    }

    // if data is undefined, set it to empty object
    if (data == undefined){
        console.log("Warning! Data is undefined.")
        data = {
            availability: [],
            days: [],
            users: [],
            min_hour: 0,
            max_hour: 0,
        }
    }

    let start_hour = data.min_hour;
    let end_hour = data.max_hour;
    let n_days = data.days.length;
    let n_panels = (end_hour - start_hour) * 4;
    let n_users = data.users.length;

    $: day = parseInt(current_hovered_panel.split(" ")[0]);
    $: hour = parseInt(current_hovered_panel.split(" ")[1]);
    $: minute = parseInt(current_hovered_panel.split(" ")[2]);
    $: panel_index = day * n_panels + (hour - start_hour) * 4 + minute;

    const arrayRange = () => Array.from(
            { length: (end_hour - start_hour) },
            (_, index) => start_hour + index
        );

    let avail: string[] = data.availability;
    let n_avail_users: number[] = calculateNAvailUsers();
    const n_avail_users_set = nAvailUsersSet();
    let max_n_avail_users = max(n_avail_users_set);
    let min_n_avail_users = min(n_avail_users_set);
    console.log('max_n_avail_users', max_n_avail_users);
    console.log('min_n_avail_users', min_n_avail_users);

    let colorIntensity: number[] = calculateIntensity();
    const color_intensity_set = colorIntensitySet();
    console.log('color_intensity_values', color_intensity_set);

</script>

<div class="flex flex-wrap justify-evenly">   
    <div class="COMBINED AVAILABILITY flex pb-8 py-16 px-4 lg:py-16 lg:px-6">
        <div class="HOURS-AND-PANELS flex text-sm">
            <div class="HOURS flex flex-col text-right mr-2 -mt-3 gap-[14.5px]">
                {#each arrayRange() as hour}
                        <div class="">{hour}:00</div>
                        <div class="">{hour}:30</div>
                {/each}
                <div class="LAST-HOUR">
                    <div>{end_hour}:00</div>
                </div>
            </div>
            <div class="PANELS flex flex-wrap">
                {#each Array(n_days) as _, day}
                    <div class="-mt-7 mr-1 text-center">
                        <div class="mb-2">{formatDate(data.days[day])}</div>
                        {#each arrayRange() as hour}
                            <div id='buttons' class="flex flex-col mb-px last:mb-10">
                                {#each Array(4) as _, minute}
                                    <OutputPanel 
                                        id="{day} {hour} {minute}"
                                        on:mouse_enter={handleMouseEnter}
                                        on:mouse_leave={handleMouseLeave}
                                        custom_style="background-color:rgba(0, 175, 0, 
                                        {colorIntensity[minute+4*(hour-start_hour)+n_panels*day]})"
                                    />
                                {/each}
                            </div>
                        {/each}
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <div class="QUICK SUMMARY px-2 py-8 flex flex-col text-center lg:px-8 w-[20rem] lg:w-[25rem]">
        {#if showDateOnHover}
            <Heading tag="h5" class="pb-8 w-[20rem] lg:w-[25rem]">{formatDateAndTime(data.days[day], hour, minute)}</Heading>
            <!-- <Heading tag="h5">{day} {hour} {minute}</Heading> -->
            <div class="flex justify-evenly w-[20rem] lg:w-[25rem] text-white text-base">
                <div class="">
                    <Heading tag="h6">Available ({calculateUsersForPanel()})</Heading>
                    <ul>
                        {#each data.users as user}
                            {#if current_hovered_panel != "" && calculateIfUserIsAvailable(user)}
                                <li>{user}</li>
                            {/if}
                        {/each}
                    </ul>
                </div>
                <div>
                    <Heading tag="h6">Unavailable ({calculateUsersForPanel("0")})</Heading>
                    <ul>
                        {#each data.users as user}
                            {#if current_hovered_panel != "" && !calculateIfUserIsAvailable(user)}
                                <li>{user}</li>
                            {/if}
                        {/each}
                    </ul>
                </div>
            </div>
        {:else}
            <div class="flex flex-col gap-2 pb-4">
                <Heading tag="h5">Legend</Heading>
                <div class="text-sm">Mouseover a panel to see who is available</div>
            </div>
            <!-- <Heading tag="h5">{day} {hour} {minute}</Heading> -->
                <!-- <Heading tag="h5" class="">Legend</Heading> -->
                <!-- Legend -->
            <div class="flex justify-center">
                <P class="mr-2 text-center">
                    {max_n_avail_users}/{n_users} available
                </P>
                {#each color_intensity_set as color}
                    {#if color != 0}
                        <div class="w-5 h-5 rounded-sm mr-px my-auto" style="background-color:rgba(0, 175, 0, {color})"></div>
                    {/if}
                {/each}
                {#if color_intensity_set.length !== 1}
                    <P class="ml-2 text-center">
                        {min_n_avail_users}/{n_users} available
                    </P>
                {/if}
            </div>
        {/if}
    </div>
</div>


