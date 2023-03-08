<template>
  <div class="container mx-auto">
    <div class="sidebar bg-gray-100 flex">
      <div
        class="active_sidebar bg-gray-100 p-5 md:p-0 w-80 h-screen fixed md:h-20 md:w-20 overflow-hidden left-[-100%] sidebar_left mr-10 absolute md:block"
        :class="mobileSidebarActive ? 'blocka' : ''"
      >
        <div class="sidebar_blog">
          <h5 class="font-bold text-base mb-7">{{ pageOptions.settings }}</h5>
        </div>
        <ul>
          <li class="mb-4">
            <a class="flex items-start" href="#"
              ><div class="w-5 h-5">
                <svg
                  class="w-5 h-5 fill-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h4 class="font-bold text-lg">{{ pageOptions.account }}</h4>
                <p class="text-sm"></p>
              </div>
            </a>
          </li>
          <li class="mb-4">
            <a class="flex items-start" href="#"
              ><div class="w-5 h-5">
                <svg
                  class="w-5 h-5 fill-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h4 class="font-bold text-lg">
                  {{ pageOptions.notifications }}
                </h4>
                <p class="text-sm"></p>
              </div>
            </a>
          </li>
          <li class="mb-4">
            <a class="flex items-start" href="#"
              ><div class="w-5 h-5">
                <svg
                  class="w-5 h-5 fill-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h4 class="font-bold text-lg">{{ pageOptions.privacy }}</h4>
                <p class="text-sm"></p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div
        class="bg-gray-100 p-5 md:p-0 w-96 sidebar_left md:w-1/4 mr-10 relative hidden md:block md:absolute"
      >
        <div class="sidebar_blog">
          <h5 class="font-bold text-base mb-7">{{ pageOptions.settings }}</h5>
        </div>
        <!-- Desktop sidebar -->
        <ul>
          <li class="mb-4">
            <a class="flex items-start" href="#"
              ><div class="w-5 h-5">
                <svg
                  class="w-5 h-5 fill-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h4 class="font-bold text-lg">{{ pageOptions.account }}</h4>
                <p class="text-sm"></p>
              </div>
            </a>
          </li>
          <li class="mb-4">
            <a class="flex items-start" href="#"
              ><div class="w-5 h-5">
                <svg
                  class="w-5 h-5 fill-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h4 class="font-bold text-lg">
                  {{ pageOptions.notifications }}
                </h4>
                <p class="text-sm"></p>
              </div>
            </a>
          </li>
          <li class="mb-4">
            <a class="flex items-start" href="#"
              ><div class="w-5 h-5">
                <svg
                  class="w-5 h-5 fill-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h4 class="font-bold text-lg">{{ pageOptions.privacy }}</h4>
                <p class="text-sm"></p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="sidebar_main md:w-3/4 w-full">
        <div class="sidebar_main_wrapper p-5 md:!p-10 bg-white rounded-md">
          <div class="flex items-center justify-between">
            <h1 class="text-slate-900 text-2xl mb-4">
              {{ pageOptions.account }}
            </h1>
            <svg
              class="fill-gray-700 w-5 h-5 cursor-pointer md-bars md:hidden"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              @click="mobileSidebarActive = !mobileSidebarActive"
            >
              <path
                d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
              />
            </svg>
          </div>
          <h4 class="text-xl text-neutral-800 mb-5">Profil</h4>
          <p></p>
          <form @submit.prevent="sendForm">
            <div class="mb-5 flex items-center">
              <div class="mr-5">
                <img
                  class="h-32 w-32 object-cover rounded-full"
                  :src="cAvatar"
                  alt="Current profile photo"
                />
              </div>
              <div>
                <input
                  ref="avatarImageRef"
                  type="file"
                  class="hidden"
                  accept="image/png, image/jpeg, image/jpg"
                  @change="onImageSelect"
                />
                <button
                  class="mr-5 py-1 px-3 border transition duration-150 text-blue-600 rounded-md border-blue-600 border-spacing-1 hover:text-white hover:bg-blue-600"
                  type="button"
                  @click="$refs.avatarImageRef.click()"
                >
                  O'zgartirish
                </button>
              </div>
            </div>

            <div class="mb-5 mt-5 flex flex-col gap-5 md:!flex-row items-start">
              <label class="w-full">
                <span class="block text-sm font-medium text-slate-700"
                  >Ism</span
                >
                <input
                  v-model="userProfile.first_name"
                  type="text"
                  class="w-full mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-600"
                />
              </label>
              <label class="w-full">
                <span class="block text-sm font-medium text-slate-700"
                  >Familiya</span
                >
                <input
                  v-model="userProfile.last_name"
                  type="text"
                  class="w-full mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-600"
                />
              </label>
            </div>
            <div>
              <span class="block text-xl font-medium text-slate-700 mb-2"
                >Biriktirilgan mualliflar ro'yxati</span
              >
              <div>
                <ul class="list-decimal list-inside">
                  <li
                    v-for="authorItem in followedPages"
                    :key="authorItem.id"
                    class="text-lg"
                  >
                    {{ authorItem.name }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- <div>
              <p class="block text-sm mb-2 font-medium text-slate-700 pt-5">
                Bio
              </p>
              <textarea
                class="w-full p-2 h-32 bg-white border rounded-md border-slate-300 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-600"
              ></textarea>
              <p>O'zingiz haqingizda</p>
            </div> -->

            <div class="mt-5">
              <h1 class="text-xl text-neutral-800">Shaxsiy ma'lumotlar</h1>
              <p class="">
                Bu ma'lumotlar ommaga chiqadi, shuning uchun ehtiyot bo'lib
                to'ldiring
              </p>
              <div
                class="mb-5 mt-5 flex items-start flex-col gap-5 md:!flex-row"
              >
                <label class="w-full">
                  <span class="block text-sm font-medium text-slate-700"
                    >Elektron manzil</span
                  >
                  <input
                    v-model="userProfile.email"
                    type="email"
                    class="w-full mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-600"
                  />
                </label>
                <label class="w-full">
                  <span class="block text-sm font-medium text-slate-700"
                    >Telefon raqami</span
                  >
                  <input
                    v-model="userProfile.phone_number"
                    type="number"
                    class="w-full mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-600"
                  />
                </label>
              </div>
            </div>
            <button
              class="mr-5 py-1 px-5 border transition duration-150 text-green-600 rounded-md border-green-600 border-spacing-1 hover:text-white hover:bg-green-600"
              type="submit"
            >
              Saqlash
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import defaultAvatar from "@/assets/images/avatar-person.svg";

const pageOptions = {
  account: "Akkaunt",
  settings: "Sozlamalar",
  profile: "Profil",
  additionalData: "Qo'shimcha ma'lumotlar",
  privacy: "Xavfsizlik",
  notifications: "Bildirishlar",
};

export default {
  data() {
    return {
      pageOptions,
      defaultAvatar,

      mobileSidebarActive: false,
      picture: null,
      selectedAuthor: null,
      userProfile: {
        email: "",
        phone_number: "",
        firt_name: "",
        last_name: "",
        is_author: false,
      },
    };
  },

  computed: {
    ...mapState({
      auth: (state) => state.auth?.user || {},
      followedPages: (state) => state.followedPages?.results || [],
    }),
    cAvatar() {
      if (this.picture) {
        const blob = URL.createObjectURL(this.picture);
        return blob;
      }

      return this.auth?.picture || defaultAvatar;
    },
  },

  mounted() {
    this.reassignFields();
    if (!this.followedPages?.length) {
      this.fetchFollowedPages();
    }
  },

  methods: {
    ...mapActions("followedPages", ["fetchFollowedPages"]),

    reassignFields() {
      const [first_name = "", last_name = ""] =
        this.auth?.full_name?.split?.(" ") || [];
      this.userProfile = {
        email: this.auth.email,
        phone_number: this.auth.phone_number,
        first_name,
        last_name,
      };
    },
    sendForm() {
      this.pending = true;
      const { first_name, last_name, ...props } = this.userProfile;
      const full_name = [last_name, first_name].filter(Boolean).join(" ");
      const f = new FormData();

      f.append("full_name", full_name);
      Object.keys(props).forEach((key) => {
        f.append(key, props[key]);
      });

      if(this.picture){
        f.append('picture', this.picture)
      }

      return this.$axios
        .patch("/users/profile/", f)
        .then(() => {
          this.pending = false;
          this.$store.commit("Toast", {
            visible: true,
            text: "Ma'lumotlar saqlandi",
            type: "success",
          });
        })
        .catch((err) => {
          this.pending = false;
          console.log(err);
        });
    },
    onImageSelect(event) {
      const file = event.target?.files?.[0];
      if (file) {
        this.picture = file;
      }

      event.target.value = null;
    },
  },
};
</script>

<style scoped>
.active_sidebar {
  transition: all 0.5s ease;
}
.blocka {
  left: 0 !important;
}
</style>
