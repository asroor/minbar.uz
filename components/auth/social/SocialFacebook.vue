<template>
  <div class="flex-1 px-2">
    <button
      class="w-full flex items-center justify-center p-3 mt-2 text-white shadow-lg rounded bg-[#1877f2] hover:opacity-75 transition duration-300"
      @click="onAuthWithFb"
    >
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="w-5 h-5 flex-shrink-0"
      >
        <path
          d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "SocialFacebook",
  methods: {
    onAuthWithFb() {
      // If you want  to emit Event.
      this.$emit("on-auth-fb");
    },
  },
};
</script>
