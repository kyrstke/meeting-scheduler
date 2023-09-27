<script lang="ts">
    import { Button } from 'flowbite-svelte';
    import { Heading, P } from 'flowbite-svelte';
</script>

<section class="flex justify-center">
    <div class="my-8 mx-4 px-auto max-w-screen-xl lg:mt-16 lg:mx-6 flex justify-center">
      <div class="text-center">
        <Heading tag="h1" class="mb-4">Whoops!</Heading>
        <P class="mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">There is no such event in the database!</P>
        <Button href="/">Create your own!</Button>
      </div>
    </div>
  </section>