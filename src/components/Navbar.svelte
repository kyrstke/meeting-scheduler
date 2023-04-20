<script>
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
        DarkMode,
    } from 'flowbite-svelte';
</script>

<Navbar let:hidden let:toggle>
    <NavBrand href="/">
        <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="mr-3 h-6 sm:h-9"
            alt="Meeting Scheduler Logo"
        />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Meeting Scheduler
        </span>
    </NavBrand>
    <div class="flex md:order-2">
        <DarkMode />
        <NavHamburger on:click={toggle} />
    </div>
    <NavUl {hidden}>
        <NavLi href="/" active={true}>Home</NavLi>
        <NavLi href="/about">About</NavLi>
        <NavLi href="/contact">Contact</NavLi>
    </NavUl>
</Navbar>