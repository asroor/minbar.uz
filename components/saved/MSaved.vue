<template>
  <li class="pb-12 w-full">
    <div class="flex items-start justify-between">
      <div class="flex items-center space-x-3 mb-6">
        <img
          :src="bookmark.post.author.picture || avatarPerson"
          alt="abdulazim ziyouddin"
          class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-top"
        />
        <p>
          <a
            href="#"
            class="block font-medium text-gray-600 hover:text-blue-500 hover:underline"
            >{{ bookmark.post.author.name }}</a
          ><span class="text-sm text-gray-400"
            ><nuxt-link
              v-for="(category, i) in bookmark.post.categories"
              :key="i"
              :to="
                localePath({
                  name: 'index',
                  query: {
                    cat_id: category.id,
                  },
                })
              "
              class="hover:text-primary hover:underline"
              >{{ category.name }},
            </nuxt-link>
            {{ $dayjs(bookmark.created_at).format("DD MMM YYYY") }}</span
          >
        </p>
      </div>
      <div
        x-data="{isOpen: false}"
        class="relative"
        @keydown.escape="isOpen = false"
      >
        <button aria-label="more options button" @click="isOpen = !isOpen">
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
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>

        <div
          v-show="isOpen"
          x-transition:enter="transition ease-out duration-150"
          x-transition:enter-start="opacity-0 translate-y-4"
          x-transition:enter-end="opacity-100 translate-y-0"
          x-transition:leave="transition ease-in duration-150"
          x-transition:leave-start="opacity-100 translate-y-0"
          x-transition:leave-end="opacity-0 translate-y-4"
          class="absolute top-11 right-0 py-2 bg-white rounded border border-gray-200 whitespace-nowrap z-20 shadow-md"
          @click="isOpen = false"
        >
          <ul>
            <li>
              <button
                class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition"
                @click="$emit('un-save', bookmark.post.id)"
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
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>

                <span>Saqlanmasin</span>
              </button>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition"
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
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition"
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
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <h2 class="text-xl mb-1 line-clamp-1 font-light font-serif text-gray-600">
      {{ bookmark.post.title }}
    </h2>
    <p class="line-clamp-2 mb-3" v-html="bookmark.post.body"></p>
    <p>
      <nuxt-link
        :to="'/post/' + bookmark.post.id"
        class="text-blue-500 underline hover:no-underline"
        >Davomini o'qish</nuxt-link
      >
    </p>
  </li>
</template>
<script>
import avatarPerson from "@/assets/images/avatar-person.svg";
export default {
  props: {
    bookmark: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
      avatarPerson,
    };
  },
};
</script>
