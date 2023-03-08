<template>
  <header class="header bg-white shadow-md fixed w-full top-0 left-0 z-20">
    <div class="container py-3 mx-auto">
      <div class="flex items-center">
        <div class="w-4/12 sm:w-2/12">
          <div class="flex items-center space-x-4">
            <MLogo />
          </div>
        </div>
        <div class="w-8/12 sm:w-10/12">
          <div class="flex items-center justify-end space-x-5 sm:space-x-6">
            <SearchInput />

            <a
              class="flex items-center space-x-2 text-blue-500 group"
              href="https://savollar.islom.uz"
              target="_blank"
            >
              <svg
                class="h-9 w-9"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>

              <span class="hidden md:block group-hover:underline">Savol so'rang?</span>
            </a>

            <button
              v-if="!isLoggedIn"
              class="hidden md:block px-3 sm:px-6 py-2 bg-primary text-white rounded hover:opacity-90 transition"
              @click="isAuthModal = !isAuthModal"
            >Kirish</button>

            <nuxt-link
              v-if="isAuthor && isLoggedIn"
              class="px-3 sm:px-6 py-2 bg-primary text-white rounded hover:opacity-90 transition"
              :to="
                localePath({
                  name: 'publish',
                })
              "
            >Yozish</nuxt-link>

            <div v-if="isLoggedIn">
              <div class="relative" @keydown.escape="isOpen = false">
                <button
                  class="flex items-center space-x-2 text-gray-400 focus:outline-none"
                  @click="isOpen = !isOpen"
                >
                  <img
                    v-if="authStrategy == 'facebook'"
                    :alt="currentUser.username"
                    :src="
                      currentUser.picture ||
                      currentUser.picture?.data?.url ||
                      defaultAvatar
                    "
                    class="w-9 h-9 rounded-full"
                  />

                  <img
                    v-else
                    :alt="currentUser.username"
                    :src="currentUser.picture || defaultAvatar"
                    class="w-9 h-9 rounded-full"
                  />

                  <svg
                    :class="{ 'rotate-180': isOpen }"
                    class="h-4 w-4 flex-shrink-0 transition"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 9l-7 7-7-7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                </button>

                <div
                  v-show="isOpen"
                  class="absolute top-11 right-0 py-2 bg-white rounded border border-gray-200 whitespace-nowrap z-20 shadow-md min-w-[200px]"
                  @click="isOpen = false"
                >
                  <ul>
                    <!-- <li>
                      <nuxt-link
                        class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition"
                        to="/notifications"
                      >
                        <span class="relative">
                          <NotificationIcon />

                          <span
                            class="absolute bg-red-600 -top-4 left-1.5 text-white text-xs rounded-full p-1 px-1.5"
                            >12</span
                          >
                        </span>
                        <span>Eslatmalar</span>
                      </nuxt-link>
                    </li>-->
                    <!-- <li>
                      <nuxt-link
                        class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition"
                        to="/posts"
                      >
                        <PostIcon />
                        <span>Postlar</span>
                      </nuxt-link>
                    </li>-->
                    <!-- <li>
                      <nuxt-link
                        class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition"
                        to="/drafts"
                      >
                        <DraftIcon />
                        <span>Qoralamalar</span>
                      </nuxt-link>
                    </li>-->
                    <!-- <li>
                      <nuxt-link
                        class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition"
                        to="/ratings"
                      >
                        <RatingIcon />

                        <span>Reytinglar</span>
                      </nuxt-link>
                    </li>-->
                    <!-- <li>
                      <nuxt-link
                        class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition"
                        to="/help"
                      >
                        <HelpIcon />
                        <span>Yordam</span>
                      </nuxt-link>
                    </li>-->
                    <!-- <li>
                      <hr class="border-t border-gray-200 my-2" />
                    </li>-->
                    <li>
                      <nuxt-link
                        class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition"
                        to="/settings"
                      >
                        <SettingsIcon />

                        <span>Sozlamalar</span>
                      </nuxt-link>
                    </li>
                    <li>
                      <button
                        class="flex w-full items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition"
                        @click="Logout()"
                      >
                        <LogOutIcon />

                        <span>Chiqish</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="w-full h-[65px] bg-white shadow-md border-t border-gray-200 fixed md:absolute bottom-0 md:top-[67px]"
    >
      <div class="container mx-auto pt-3 pb-3 flex items-center justify-center">
        <ul class="flex space-x-4 items-center justify-center media-bottom-tap">
          <!-- <li
            class="group border-b-2 border-transparent hover:border-primary transition"
          >
            <a
              class="flex items-center space-x-2 px-3 pb-3 transition group-hover:text-primary"
              href="#"
            >
              <svg
                class="h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                />
              </svg>

              <span class="hidden md:block">O'qiydiganlarim</span>
            </a>
          </li>-->
          <li class="group border-b-2 border-transparent hover:border-primary transition">
            <button class="flex items-center space-x-2 px-3 pb-3 transition group-hover:text-primary lg:hidden media-bottom-bars" @click="onMenuClick">
              <svg 
                class="h-9 w-9"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                />
              </svg>
            </button>
          </li>
          <li
            class="group border-b-2 border-transparent hover:border-primary transition"
            :class="[{ active: /^(followers)/.test($route.name) }]"
          >
            <button
              class="flex items-center space-x-2 px-3 pb-3 transition group-hover:text-primary"
              @click="goToFollowersRoute($event)"
            >
              <svg
                class="h-9 w-9"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                />
              </svg>
              <span class="hidden md:block">Kuzatadiganlarim</span>
            </button>
          </li>
          <li
            :class="{ active: /^(saved)/.test($route.name) }"
            class="group border-b-2 border-transparent hover:border-primary transition"
          >
            <button
              class="flex items-center space-x-2 px-3 pb-3 transition group-hover:text-primary"
              @click="
                isLoggedIn
                  ? $router.push(
                      localePath({
                        name: 'saved',
                      })
                    )
                  : (isAuthModal = true)
              "
            >
              <svg
                class="h-9 w-9"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                />
              </svg>

              <span class="hidden md:block">Saqlanganlar</span>
            </button>
          </li>
          <li class="md:hidden group border-b-2 border-transparent hover:border-primary transition">
            <a
              v-if="!isLoggedIn"
              class="flex items-center space-x-2 px-3 pb-3 transition group-hover:text-primary"
              href="#"
              @click="isAuthModal = !isAuthModal"
            >
              <svg
                class="w-9 h-9"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <AuthModal
      v-bind="{ isOpen: isAuthModal }"
      @on-close="isAuthModal = false"
      @change:reset-password="$refs.forgetPassModal.open()"
    />

    <ForgetPasswordModal ref="forgetPassModal" @change:auth-modal="isAuthModal = true" />
  </header>
</template>

<script>
import MLogo from "~/components/layout/MLogo";
import AuthModal from "~/components/auth/AuthModal";
// import NotificationIcon from "~/components/icons/main-layout/NotificationIcon";
// import PostIcon from "~/components/icons/main-layout/PostIcon";
// import DraftIcon from "~/components/icons/main-layout/DraftIcon";
// import RatingIcon from "~/components/icons/main-layout/RatingIcon";
// import HelpIcon from "~/components/icons/main-layout/HelpIcon";
import SettingsIcon from "~/components/icons/main-layout/SettingsIcon";
import LogOutIcon from "~/components/icons/main-layout/LogOutIcon";
import ForgetPasswordModal from "~/components/auth/ForgetPasswordModal.vue";

import defaultAvatar from "@/assets/images/avatar-person.svg";
import SearchInput from "~/components/search/SearchInput.vue";

export default {
  name: "MHeader",
  components: {
    SearchInput,
    LogOutIcon,
    SettingsIcon,
    // HelpIcon,
    // RatingIcon,
    // DraftIcon,
    // PostIcon,
    // NotificationIcon,
    AuthModal,
    MLogo,
    ForgetPasswordModal,
  },
  data() {
    return {
      defaultAvatar,

      isAuthModal: false,
      isOpenCategory: false,
      isOpen: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },

    authStrategy() {
      return this.$store.state.auth.strategy;
    },
    isAuthor() {
      return this.$store.state.auth?.user?.is_author;
    },
  },
  methods: {
    goToFollowersRoute(e) {
      if (!this.isLoggedIn) {
        this.isAuthModal = true;
        e.preventDefault();
        return;
      }

      this.$router.push(
        this.localePath({
          name: "followers",
        })
      );
    },
    onMenuClick() {
      const asideDrawer = document.querySelector(".sidebar-mobile-wide");

      if (asideDrawer) {
        asideDrawer.classList.add("isOpenCategory");
      }
    },
    Logout() {
      // this.$auth.logout();
      this.$auth.strategy.token.reset();
      this.$auth.logout();
      this.$cookies.removeAll();
      window.location.reload();
    },
  },
};
</script>
<style lang="scss" scoped>

.media-bottom-bars svg path:hover {
  fill: rgba(55, 178, 31, 1);
  stroke: rgba(55, 178, 31, 1);
}
.active {
  border-color: rgba(55, 178, 31, 1);

  button {
    color: rgba(55, 178, 31, 1);
  }
}
</style>
