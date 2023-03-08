<template>
  <!-- component -->
  <!-- CONTAINER MODAL-->

  <div
    style="z-index: 1000"
    class="bg-black bg-opacity-80 flex items-center justify-center fixed w-full h-full top-0 left-0"
  >
    <!--MODAL ITEM-->
    <div class="bg-gray-100 mx-4 p-4 rounded-xl w-96 relative">
      <!--MODAL HEADER-->
      <div
        class="flex justify-between items center border-b border-gray-200 py-3"
      >
        <div class="flex items-center justify-center">
          <p class="text-xl font-bold text-gray-800">Ulashish</p>
        </div>

        <button
          type="button"
          class="w-10 h-10 inline-flex items-center justify-center absolute top-0 right-0 text-black"
          @click="$emit('close')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <!--MODAL BODY-->
      <div class="my-4">
        <p class="text-lg mb-5">Ijtimoiy tarmoqlarda ulashish</p>

        <div class="flex justify-around my-4">
          <!--FACEBOOK ICON-->
          <div
            class="border hover:bg-[#1877f2] w-12 h-12 fill-[#1877f2] hover:fill-white border-blue-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-blue-500/50 cursor-pointer"
          >
            <a
              :href="`https://www.facebook.com/sharer/sharer.php?u=${computedUrl}`"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"
                ></path>
              </svg>
            </a>
          </div>
          <!--TWITTER ICON-->
          <div
            class="border hover:bg-[#1d9bf0] w-12 h-12 fill-[#1d9bf0] hover:fill-white border-blue-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-sky-500/50 cursor-pointer"
          >
            <a
              :href="`https://twitter.com/intent/tweet?url=${computedUrl}`"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                ></path>
              </svg>
            </a>
          </div>

          <!--TELEGRAM ICON-->
          <div
            class="border hover:bg-[#229ED9] w-12 h-12 fill-[#229ED9] hover:fill-white border-sky-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-sky-500/50 cursor-pointer"
          >
            <a
              :href="`https://t.me/share/url?url=${computedUrl}`"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },

  computed: {
    computedUrl() {
      if (process.client) {
        return `${location.origin}${this.localePath({
          name: "post-id",
          params: {
            id: this.data.id,
          },
        })}`;
      }
      return "";
    },
  },
};
</script>
