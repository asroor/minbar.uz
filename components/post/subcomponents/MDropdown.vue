<template>
  <div
    v-show="show"
    class="absolute top-11 right-0 bg-white rounded border border-gray-200 whitespace-nowrap z-20 shadow-md"
    @click="$emit('close')"
  >
    <ul class="bg-white py-2">
      <li>
        <button
          class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition"
          @click="$emit('click:complaint')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
            />
          </svg>

          <span>Shikoyat yuborish</span>
        </button>
      </li>
      <li>
        <button
          class="flex items-center w-full space-x-2 px-4 py-2 hover:bg-gray-100 transition"
          @click="clickBlock('block')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>

          <span>Block qilish</span>
        </button>
      </li>
      <li>
        <button
          class="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
          @click="$emit('click:share')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>

          <span>Ulashish</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MDropdown",
  data() {
    return {
      show: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.loggedIn;
    },
  },
  methods: {
    clickBlock(typeAction){
      if (!this.isLoggedIn) {
        return;
      }
      this.$emit(typeAction);
    }
  },
};
</script>
