<template>
  <li class="flex mx-2 mt-4" :class="[pending ? '-pending-wrapper-' : null]">
    <button
      class="flex items-center space-x-1 py-2 px-3 text-blue-500 shadow bg-gray-50 rounded-full rounded-r-none border-r border-gray-100 hover:bg-gray-100 transition"
      aria-label="like button"
      @click="onClick('like')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 11l5-5m0 0l5 5m-5-5v12"
        />
      </svg>

      <span>{{ formatCount(like) }}</span>
    </button>

    <button
      class="flex items-center space-x-1 py-2 px-3 bg-gray-50 rounded-full rounded-l-none shadow hover:bg-gray-100 transition"
      aria-label="dislike button"
      @click="onClick('dislike')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 13l-5 5m0 0l-5-5m5 5V6"
        />
      </svg>
      <span>{{ formatCount(Math.abs(dislike)) }}</span>
    </button>
  </li>
</template>
<script>
import { formatCount } from "@/utils/n-formatter.js";

export default {
  name: "Rating",
  props: {
    like: {
      required: true,
      type: Number,
    },
    dislike: {
      required: true,
      type: Number,
    },
    id: {
      required: true,
      type: Number,
    },
    pending: {
      type: Boolean,
    },
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.auth.loggedIn;
    },
  },

  methods: {
    formatCount,

    onClick(likeType) {
      if (!this.isLoggedIn) {
        return;
      }
      this.$emit(likeType);
    },
  },
};
</script>
