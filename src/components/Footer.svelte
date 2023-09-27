<script>
    import {
        Footer,
        FooterCopyright,
        FooterLinkGroup,
        FooterLink
    } from 'flowbite-svelte';
</script>

<Footer class="rounded-none mt-16 bg-slate-100">
    <FooterCopyright href="https://github.com/kyrstke/meeting-scheduler" by="Krystian Jakusik & Dawid Bosy" year={2023} />
    <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <FooterLink href="/">About</FooterLink>
        <FooterLink href="/">Privacy Policy</FooterLink>
        <FooterLink href="/">Licensing</FooterLink>
        <FooterLink href="/">Contact</FooterLink>
    </FooterLinkGroup>
</Footer>