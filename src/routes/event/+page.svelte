<script lang="ts">
    import { Button } from 'flowbite-svelte';
    import { Heading, P } from 'flowbite-svelte';
</script>

<section class="flex justify-center bg-white dark:bg-gray-900">
    <div class="my-8 mx-4 px-auto max-w-screen-xl lg:mt-16 lg:mx-6 flex justify-center">
      <div class="text-center">
        <Heading tag="h1" class="mb-8">Whoops!</Heading>
        <P class="mb-8 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">You need to provide event ID. If you don't have one...</P>
        <Button size="xl" href="/">Create your own!</Button>
      </div>
    </div>
  </section>