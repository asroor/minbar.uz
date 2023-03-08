<template>
  <!-- component -->
  <!-- CONTAINER MODAL-->

  <div
    style="z-index: 1000"
    class="bg-black bg-opacity-80 flex items-center justify-center fixed w-full h-full top-0 left-0"
  >
    <!--MODAL ITEM-->
    <div class="bg-gray-100 mx-4 p-4 rounded-xl w-[64rem] relative">
      <!--MODAL HEADER-->
      <div
        class="flex justify-between items center border-b border-gray-200 py-3"
      >
        <div class="flex items-center justify-center">
          <p class="text-xl font-bold text-gray-800">Shikoyat bayoni</p>
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
      <div class="my-4 w-full h-full">
        <textarea id="textarea" v-model="complaint.text" rows="7" placeholder="Shikoyat bayonini yozing" 
        class="p-4 w-full h-full"
        :class="{ '!border-red-500': $v.complaint.text.$error }"
        @input="$v.complaint.text.$touch()"
        >
        </textarea>
        <p
        v-if="
            !$v.complaint.text.required && $v.complaint.text.$error
        "
        class="mt-2 italic text-red-500 text-sm"
        >
        Shikoyat bayoni to'ldirilishi shart!
        </p>
        <button
              class="w-full p-3 mt-2 flex space-x-2 items-center justify-center rounded bg-blue-500 border-transparent text-white transition duration-300"
              @click="sendComplaint()"
            >
              <span v-if="loading">
                <svg
                  role="status"
                  class="inline w-6 h-6 mr-3 text-blue-500 animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Kuting...</span>
              </span>

              <div v-else class="flex space-x-2">
                <span>Shikoyatni yuborish </span>
              </div>
            </button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  required,
} from "vuelidate/lib/validators";
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
  data(){
    return {
        loading: false,
        complaint: {
            text: ""
        }
    }
  },
  validations() {
    return {
      complaint: {
        text: {
          required,
        },
      },
    };
  },
  methods: {
    sendComplaint(){
        const data = this.data
        this.$v.complaint.text.$touch();
        if(!this.$v.complaint.text.$error) {
            this.loading = true;
            const body = this.complaint
            this.$store
                .dispatch("post/CreateComplaints", {
                    id: data.id,
                    body
                })
                .then(() => {
                    this.$emit('close');
                    this.$store.commit("Toast", {
                        visible: true,
                        text: 'Shikoyat yuborildi!',
                        type: "success",
                    });
                    this.loading = false;
                }).catch(() => {
                    this.loading = false;
                });
        }
    }
  }
};
</script>
