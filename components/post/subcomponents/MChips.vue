<template>
  <div>
    <ul class="flex flex-wrap items-center -mx-1 text-sm">
      <li v-for="(tag, i) in tags" :key="i" class="mx-1 mb-2">
        <nuxt-link
          :to="
            localePath({
              name: 'index',
              query: {
                cat_id: tag.id,
              },
            })
          "
          href="#"
          class="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            /></svg
          ><span>{{ tag.name }}</span></nuxt-link
        >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    tags: {
      required: true,
      type: Array,
    },
  },
};
</script>
