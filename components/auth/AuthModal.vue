<template>
  <div v-show="isOpen">
    <div v-show="loginOpen" id="signin-popup" x-data="{isOpen: false}">
      <div
        class="w-screen h-screen flex fixed top-0 left-0 transform bg-gray-900 bg-opacity-80 z-10 overflow-y-auto"
      >
        <div
          class="w-full max-w-md sm-down:max-w-11/12 m-auto bg-white p-6 rounded-lg relative"
        >
          <!-- --------- LOGIN MODAL CLOSE START ------------>
          <button
            type="button"
            class="w-10 h-10 inline-flex items-center justify-center absolute top-0 right-0 text-black"
            @click="onClose()"
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
          <!-- --------- LOGIN MODAL CLOSE END ------------>
          <p class="font-medium text-center text-gray-600 text-lg mb-6">
            Tizimga kirish
          </p>
          <!-- --------- EMAIL OR TELEPHONE START ------------>
          <div class="space-y-4 mb-6">
            <div>
              <input
                id="signin-phone-email"
                v-model="login.email"
                type="email"
                name="signin-phone-email"
                class="w-full py-3 px-4 rounded border border-gray-200 transition"
                :class="{
                  '!border-red-500': $v.login.email.$error,
                }"
                placeholder="Email"
                @input="$v.login.email.$touch"
              />
              <p
                v-show="$v.login.email.$error"
                class="mt-2 italic text-red-500 text-sm"
              >
                Email* tog'ri formatda bo'lishi shart!
              </p>
            </div>
            <!-- --------- EMAIL OR TELEPHONE END ------------>
            <!-- --------- PASSWORD START ------------>
            <div>
              <input
                id="signin-password"
                v-model="login.password"
                type="password"
                name="signin-password"
                class="w-full py-3 px-4 rounded border border-gray-200 transition"
                :class="{
                  '!border-red-500': $v.login.password.$error,
                }"
                placeholder="Parol"
                @input="$v.login.password.$touch"
                @keyup.enter="Login()"
              />
              <p
                v-show="$v.login.password.$error"
                class="mt-2 italic text-red-500 text-sm"
              >
                Parol kamida 6 simvoldan iborat bo'lishi shart!
              </p>
              <p class="hidden mt-2 italic text-red-500 text-sm">
                Login yoki paroldan biri hato, iltimos tekshirib, qaytadan terib
                ko'ring!
              </p>
            </div>
            <!-- --------- PASSWORD END ------------>
            <!-- LOGIN BUTTON START -->
            <button
              class="w-full p-3 flex space-x-2 items-center justify-center text-blue-500 border border-blue-400 rounded hover:bg-blue-500 hover:border-transparent hover:text-white transition duration-300"
              @click="Login()"
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
                  class="w-6 h-6 rotate-180 transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span>Kirish</span>
              </div>
            </button>
            <!-- LOGIN BUTTON END -->
          </div>
          <!-- --------- LINKS TO FORGOT A PASSWORD , REGISTRATION  START ------------>
          <div
            class="flex items-center justify-center divide-x divide-gray-300"
          >
            <button
              class="px-3 font-serif text-blue-500 text-center underline hover:no-underline"
              @click="emitResetPassword"
            >
              Parolni unutdingizmi?
            </button>
            <button
              class="px-3 text-center font-serif text-blue-500 underline hover:no-underline"
              @click="(registerOpen = true), (loginOpen = false)"
            >
              Ro'yhatdan o'ting!
            </button>
          </div>
          <!-- --------- LINKS TO FORGOT A PASSWORD , REGISTRATION  END ------------>
          <div class="relative text-center py-6 pb-4">
            <hr class="w-full bg-gray-300 absolute top-1/2 left-0 transform" />
            <span
              class="bg-white px-3 uppercase text-xs tracking-widest relative z-auto"
              >yoki</span
            >
          </div>
          <!------------- LOGIN WITH FACEBOOK , GOOGLE , TELEGRAM -------- -->
          <div class="flex flex-wrap -mx-2">
            <SocialGoogle @on-auth-google="$auth.loginWith('google')" />
            <SocialFacebook @on-auth-fb="$auth.loginWith('facebook')" />
          </div>
        </div>
      </div>
    </div>
    <!-------- REGISTRATION MODAL COMPONENT -------->
    <Register
      v-show="registerOpen"
      @close="onClose()"
      @to-login="(registerOpen = false), (loginOpen = true)"
    >
    </Register>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import Register from "./registerModal.vue";
import SocialGoogle from "~/components/auth/social/SocialGoogle";
import SocialFacebook from "~/components/auth/social/SocialFacebook";

export default {
  name: "AuthModal",
  components: { Register, SocialGoogle, SocialFacebook },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      loginOpen: true,
      registerOpen: false,
      login: {
        email: "",
        password: null,
      },
    };
  },
  validations() {
    return {
      login: {
        email: { required, email },
        password: { required, minLength: minLength(6) },
      },
    };
  },
  methods: {
    emitResetPassword() {
      this.$emit("change:reset-password");
      this.onClose();
    },
    onClose() {
      this.$emit("on-close");
      this.registerOpen = false;
      this.loginOpen = true;
      this.login = {};
      this.$v.login.$reset();
      this.loading = false;
    },
    async Login() {
      this.$v.login.$touch();
      if (!this.$v.login.$error) {
        this.loading = true;
        try {
          const { data } = await this.$auth.loginWith("local", {
            data: this.login,
          });
          // console.log("Login data", data);
          await this.$auth.setUserToken(data.access, data.refresh);
          await this.$auth.setUser(data.user);
          await this.$auth.strategies.local.token.set(data.access);
          await this.$axios.setToken(data.access, "Bearer");
          this.$store.commit("Toast", {
            visible: true,
            text: "Xush kelibsiz",
            type: "success",
          });
          this.loading = false;
          this.onClose();
          this.$store.dispatch("nuxtServerInit");
          this.$store.dispatch("post/FetchPosts");
        } catch (error) {
          this.loading = false;
          this.$store.commit("Toast", {
            visible: true,
            text: `Email yoki password noto'g'ri`,
            type: "error",
          });
          console.log(error);
        }
      }
    },
  },
};
</script>
