<template>
  <div>
    <!-- REGISTRAION MODAL COMPONENT  -->
    <div id="register-popup" x-data="{isOpen: false}">
      <div
        class="w-screen h-screen flex fixed top-0 left-0 transform bg-gray-900 bg-opacity-80 z-10 overflow-y-auto"
      >
        <div
          class="w-full max-w-md sm-down:max-w-11/12 m-auto bg-white p-6 rounded-lg relative"
        >
          <!-- ----------- BUTTON CLOSE REGISTER MODAL START --------- -->
          <button
            type="button"
            class="w-10 h-10 inline-flex items-center justify-center absolute top-0 right-0 text-black"
            @click="
              $emit('close'), (register = {});
              $v.register.$reset();
            "
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

          <div class="flex mb-6 relative">
            <!-- back to sign in form start -->
            <button
              class="mr-3 absolute left-0 top-0 rounded hover:text-black transition duration-300"
              @click="onClose"
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
            <!-- ----------- BUTTON CLOSE REGISTER MODAL END --------- -->
            <p class="flex-1 font-medium text-center text-gray-600 text-lg">
              Ro'yhatdan o'tish
            </p>
          </div>
          <!-- ----------- USERNAME START --------- -->
          <div class="space-y-4">
            <div>
              <input
                id="register-name-family-name"
                v-model.trim="register.username"
                type="text"
                name="register-name-family-name"
                class="w-full p-3 rounded border border-gray-200 transition"
                :class="{ '!border-red-500': $v.register.username.$error }"
                placeholder="Familiya va ismi*"
                @input="$v.register.username.$touch()"
              />
              <p
                v-if="
                  !$v.register.username.required && $v.register.username.$error
                "
                class="mt-2 italic text-red-500 text-sm"
              >
                Familiya va ism* bo'lishi shart!
              </p>
              <p
                v-if="
                  !$v.register.username.alpha && $v.register.username.$error
                "
                class="mt-2 italic text-red-500 text-sm"
              >
                Familiya va ism* harflardan iborat va bosh joylar bo'lmastligi
                kerak
              </p>
              <p
                v-if="!$v.register.username.minLength"
                class="mt-2 italic text-red-500 text-sm"
              >
                5 ta harfdan kam bo'lmasligi kerak,
              </p>
            </div>
            <!-- ----------- USERNAME END --------- -->
            <!--  EMAIL START -->
            <div>
              <input
                id="register-phone-email"
                v-model="register.email"
                type="text"
                name="register-phone-email"
                class="w-full p-3 rounded border border-gray-200 transition"
                :class="{ '!border-red-500': $v.register.email.$error }"
                placeholder="Email*"
                @input="$v.register.email.$touch"
              />
              <p
                v-show="$v.register.email.$error"
                class="mt-2 italic text-red-500 text-sm"
              >
                Email* tog'ri formatda bo'lishi shart!
              </p>
            </div>
            <!-- EMAIL END -->
            <!-- PASSWORD START -->
            <div>
              <input
                id="register-password"
                v-model="register.password"
                type="password"
                name="register-password"
                class="w-full p-3 rounded border border-gray-200 transition"
                :class="{ '!border-red-500': $v.register.password.$error }"
                placeholder="Parol*"
                @input="$v.register.password.$touch"
              />
              <p
                v-show="$v.register.password.$error"
                class="mt-2 italic text-red-500 text-sm"
              >
                Parol kamida 6 simvoldan, hamda &laquo;Harflar va
                Sonlardan&raquo; iborat bo'lishi shart!
              </p>
            </div>
            <!-- PASSWORD CONFIRMATION END -->
            <!-- PASSWORD CONFIRMATION START -->
            <div>
              <input
                id="register-password-repeat"
                v-model="register.confirm_password"
                type="password"
                name="register-password-repeat"
                class="w-full p-3 rounded border border-gray-200 transition"
                :class="{
                  '!border-red-500': $v.register.confirm_password.$error,
                }"
                placeholder="Parolni takrorlash*"
                @input="$v.register.confirm_password.$touch"
              />
              <p
                v-show="$v.register.confirm_password.$error"
                class="mt-2 italic text-red-500 text-sm"
              >
                Parol mos kelmayabti, iltimos tekshirib qaytadan kiriting!
              </p>
            </div>
            <!-- PASSWORD CONFIRMATION END -->

            <div>
              <!-- TERMS OF CONDITIONS START -->
              <label
                for="register-agree"
                class="c-checkbox body-text items-start cursor-pointer"
              >
                <input
                  id="register-agree"
                  v-model="register.terms"
                  type="checkbox"
                  class="mt-2"
                  name="register-agree"
                />
                <span class="c-checkbox__icon mt-1 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="8.16"
                  >
                    <g id="check-icon" transform="translate(-508 -397.92)">
                      <path
                        id="Path_28"
                        data-name="Path 28"
                        d="M17.309 7.651a.72.72 0 010 1.018l-6.72 6.72a.72.72 0 01-1.018 0l-3.84-3.84a.72.72 0 111.018-1.018l3.331 3.331 6.211-6.211a.72.72 0 011.018 0z"
                        transform="translate(502.48 390.48)"
                        fill="#fff"
                        fill-rule="evenodd"
                      ></path>
                    </g>
                  </svg>
                </span>
                <span class="c-checkbox__title font-serif"
                  >Ro'yhattan o'tish tugmasini bosish orqali, men
                  <a href="#" class="text-blue-500 underline hover:no-underline"
                    >foydalanish shartlarini</a
                  >
                  tasdiqlayman.</span
                >
              </label>
              <p
                v-show="$v.register.terms.$error"
                class="mt-2 italic text-red-500 text-sm"
              >
                Iltmos shartlarni qabul qiling
              </p>
            </div>
            <!-- TERMS OF CONDITIONS END -->

            <!-- REGISTRATION  BUTTON START -->

            <button
              class="w-full p-3 flex space-x-2 items-center justify-center text-blue-500 border border-blue-400 rounded hover:bg-blue-500 hover:border-transparent hover:text-white transition duration-300"
              @click="RegisterUser()"
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
                    stroke-width="1.2"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
                <span>Ro'yxatdan o'tish</span>
              </div>
            </button>
            <!--------- REGISTRATION  BUTTON END ------------->
          </div>
          <!-- ----------- OTHER WAYS TO LOGIN START --------- -->
          <div class="relative text-center py-6">
            <hr class="w-full bg-gray-300 absolute top-1/2 left-0 transform" />
            <span
              class="bg-white px-3 uppercase text-xs tracking-widest relative z-auto"
              >yoki</span
            >
          </div>

          <div class="flex flex-wrap -mx-2">
            <SocialGoogle @on-auth-google="$auth.loginWith('google')" />
            <SocialFacebook @on-auth-fb="$auth.loginWith('facebook')" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  required,
  minLength,
  sameAs,
  email,
  alpha,
} from "vuelidate/lib/validators";
import SocialGoogle from "~/components/auth/social/SocialGoogle";
import SocialFacebook from "~/components/auth/social/SocialFacebook";
export default {
  name: "RegsiterModal",
  components: { SocialFacebook, SocialGoogle },
  data() {
    return {
      loading: false,
      registerOpen: false,
      register: {
        username: "",
        email: "",
        password: null,
        confirm_password: null,
        terms: false,
      },
    };
  },
  validations() {
    return {
      register: {
        username: {
          required,
          minLength: minLength(5),
          alpha,
        },
        email: { required, email },
        password: { required, minLength: minLength(6) },
        confirm_password: { sameAs: sameAs(() => this.register.password) },
        terms: { sameAs: sameAs(() => true) },
      },
    };
  },
  methods: {
    onClose() {
      this.$emit("to-login");
      this.register = {};
      this.$v.register.$reset();
    },
    RegisterUser() {
      this.$v.register.$touch();
      if (!this.$v.register.$error) {
        this.loading = true;
        delete this.register.terms;
        this.$axios
          .post("/users/auth/register/", this.register)
          .then((res) => {
            this.$store.commit("Toast", {
              visible: true,
              text: "Ro'yxatdan o'tish muffaqiyatli yakunlandi",
              type: "success",
            });
            this.loading = false;
            this.onClose();
          })
          .catch((error) => {
            this.loading = false;
            this.$store.commit("Toast", {
              visible: true,
              text: `${
                error.response.data.username || error.response.data.email
              }`,
              type: "error",
            });
            // console.log(error.response.data);
          });
      }
    },
  },
};
</script>
