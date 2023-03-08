<template>
  <div
    class="flex items-center justify-between max-w-xs p-4 bg-white border rounded-md shadow-sm toast"
  >
    <div class="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-8 h-8"
        :class="{
          'text-green-500': message.type === 'success',
          'text-blue-600': message.type === 'info',
          'text-yellow-600': message.type === 'warning',
          'text-red-600': message.type === 'error',
        }"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        />
      </svg>
      <p
        class="ml-3 text-sm font-bold"
        :class="{
          'text-green-500': message.type === 'success',
          'text-blue-600': message.type === 'info',
          'text-yellow-600': message.type === 'warning',
          'text-red-600': message.type === 'error',
        }"
      >
        {{ message.text }}
      </p>
    </div>
    <span class="inline-flex items-center cursor-pointer" @click="Close()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </span>
  </div>
</template>
<script>
export default {
  computed: {
    message() {
      return this.$store.state.messages;
    },
  },
  mounted() {
    setTimeout(() => {
      this.$store.commit("Toast", {
        visible: false,
        text: null,
        type: "success",
      });
    }, this.message.duration || 3000);
  },
  methods: {
    Close() {
      this.$store.commit("Toast", {
        visible: false,
        text: null,
        type: "success",
      });
    },
  },
};
</script>
<style>
.toast {
  position: fixed;
  right: 1%;
  top: 2%;
  z-index: 999;
}
.toast span {
  margin-left: 10px;
}
</style>
