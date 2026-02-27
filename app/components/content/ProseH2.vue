<template>
  <h2
    class="mt-10 scroll-m-28 font-heading text-xl font-medium tracking-tight first:mt-0 lg:mt-16 [&+.steps]:mt-0! [&+.steps>h3]:mt-4! [&+h3]:mt-6! [&+p]:mt-4!"
    :class="
      // The classes in this component are used to add spacing between elements when they are used together. For example, when a ProseH2 is followed by a ProseP, the ProseP will have a margin-top of 4. When a ProseH2 is followed by a ProseSteps, the ProseSteps will have a margin-top of 0. This is achieved by using the sibling combinator in Tailwind CSS.

      // eslint-disable-next-line better-tailwindcss/no-unknown-classes
      true ? '[&+]*:[code]:text-xl' : ''
    "
  >
    <slot />
  </h2>
</template>
