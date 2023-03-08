<template>
  <div
    ref="modalRef"
    class="w-screen h-screen flex fixed top-0 left-0 transform bg-gray-900 bg-opacity-80 z-10 overflow-y-auto opacity-0 pointer-events-none"
  >
    <div
      class="w-full max-w-md sm-down:max-w-11/12 m-auto bg-white p-6 rounded-lg relative"
    >
      <!-- ----------- BUTTON CLOSE REGISTER MODAL START --------- -->
      <button
        type="button"
        class="w-10 h-10 inline-flex items-center justify-center absolute top-0 right-0 text-black"
        @click="close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
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
      </button>
      <div class="flex relative mb-6">
        <!-- back to sign in form start -->
        <button
          class="mr-3 absolute left-0 top-0 rounded hover:text-black transition duration-300"
          @click="toAuthModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <!-- back to sign in form end -->
        <p class="flex-1 font-medium text-center text-gray-600 text-lg">
          Parolni tiklash
        </p>
      </div>
      <div class="space-y-4">
        <div>
          <input
            id="recover-password"
            ref="emailInputRef"
            v-model="$v.form.email.$model"
            class="w-full py-3 px-4 rounded border border-gray-200 transition"
            type="email"
            name="recover-password"
            placeholder="Elektron pochta manzilini kiriting"
          />
          <p
            v-show="$v.form.email.$dirty && $v.form.email.$error"
            class="mt-2 italic text-red-500 text-sm"
            style="display: none"
          >
            Email* tog'ri formatda bo'lishi shart!
          </p>
        </div>

        <button
          class="w-full p-3 flex space-x-2 items-center justify-center text-blue-500 border border-blue-400 rounded hover:bg-blue-500 hover:border-transparent hover:text-white transition duration-300"
          @click="onSubmit"
        >
          <div class="flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>

            <span>Jo'natish</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

const ACTIVE_CLASS = "__active";

export default {
  validations() {
    return {
      form: {
        email: { required, email },
      },
    };
  },
  data() {
    return {
      ACTIVE_CLASS,

      form: {
        email: "",
      },
    };
  },
  // mounted() {

  // },

  methods: {
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        this.$store.commit("Toast", {
          visible: true,
          text: `'E-mail'ni kiriting`,
          type: "error",
        });
        return;
      }
      this.$axios
        .post("/users/password/reset/", {
          email: this.form.email,
        })
        .then(() => {
          this.$store.commit("Toast", {
            visible: true,
            duration: 8000,
            text: `Parolni tiklash uchun pochtaga yo'riqnoma xati ketdi. Iltimos, tekshirib ko'ring.`,
            type: "success",
          });
          this.close();
        });
    },

    close() {
      this.$refs.modalRef.classList.remove(ACTIVE_CLASS);
    },

    open() {
      this.$refs.modalRef.classList.add(ACTIVE_CLASS);
      this.$nextTick(() => {
        this.$refs.emailInputRef.focus();
      });
    },

    toAuthModal() {
      this.close();
      this.$emit("change:auth-modal");
    },
  },
};
</script>
