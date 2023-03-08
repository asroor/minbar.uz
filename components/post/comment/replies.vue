<template>
  <div
    :class="{
      'overflow-y-scroll h-72 scrollbar pb-6 pt-4': comment.replies_count > 1,
    }"
  >
    <div
      v-for="replies in visibleReplies"
      :key="replies.id"
      class="mt-6 border-l-3 border-gray-200 pl-4"
    >
      <div class="flex items-start space-x-3">
        <img
          class="rounded-full w-7 h-7 flex-shrink-0"
          :src="replies.user.profile_picture || defaultAvatar"
        />

        <p class="leading-tight">
          <strong class="block font-medium text-gray-600 text-sm"
            ><a href="#" class="group-hover:underline">{{
              (replies.user.first_name, replies.user.last_name) || "No Name"
            }}</a></strong
          ><span class="text-sm text-gray-400">{{
            $dayjs(replies.created_at).format("DD MMM YYYY")
          }}</span>
        </p>
      </div>

      <div class="font-serif space-y-1.5 my-3 leading-7">
        <p>
          {{ replies.body }}
        </p>
      </div>
      <div class="flex items-center text-sm space-x-3 mt-[1.5rem!important]">
        <button
          class="flex items-center space-x-2 py-2 px-3 rounded-full shadow opacity-70 hover:opacity-100 hover:bg-gray-100 transition"
          aria-label="like button"
          :class="{ 'text-blue-500': replies.actions.liked }"
          @click="$emit('vote', replies.id, replies.actions.liked, 1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          <span>&middot;</span>
          <span>{{ replies.likes }}</span>
        </button>

        <button
          class="flex items-center space-x-2 py-2 px-3 rounded-full shadow hover:bg-gray-100 transition"
          @click="
            $emit('replyComment', comment.id, replies.user.name || 'No name')
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="font-medium">Javob berish</span>
        </button>

        <button
          class="flex items-center space-x-2 py-2 px-3 rounded-full shadow ml-[auto!important] opacity-70 hover:opacity-100 hover:bg-gray-100 transition"
          aria-label="dislike button"
          :class="{ 'text-blue-500': replies.actions.disliked }"
          @click="$emit('vote', replies.id, replies.actions.disliked, -1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-7 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
            />
          </svg>
          <span>&middot;</span>
          <span>{{ replies.dislikes }}</span>
        </button>

        <div
          x-data="{isOpen: false}"
          class="relative"
          @keydown.escape="isOpen = null"
        >
          <button
            class="opacity-70 hover:opacity-100"
            aria-label="more options button"
            @click="
              isOpen === replies.id ? (isOpen = null) : (isOpen = replies.id)
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
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>

          <div
            v-show="isOpen == replies.id"
            x-transition:enter="transition ease-out duration-150"
            x-transition:enter-start="opacity-0 translate-y-4"
            x-transition:enter-end="opacity-100 translate-y-0"
            x-transition:leave="transition ease-in duration-150"
            x-transition:leave-start="opacity-100 translate-y-0"
            x-transition:leave-end="opacity-0 translate-y-4"
            class="absolute bottom-8 right-0 py-2 bg-white rounded border border-gray-200 whitespace-nowrap z-20 shadow-md"
            @click="isOpen = null"
          >
            <ul>
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
            </ul>
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="comment.replies_count > 5"
      class="w-full pt-8 bg-gradient-to-b flex items-center justify-center space-x-2 text-blue-400 underline hover:text-blue-500 hover:no-underline"
      @click="visible === 5 ? (visible = 9999) : (visible = 5)"
    >
      <span
        >{{
          visible === 9999
            ? `Javoblarni kamaytirish`
            : `Barchasini ko'rish(${comment.replies_count - visible})`
        }}
      </span>
      <svg
        :class="{ 'rotate-180': visible === 9999 }"
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "Replies",
  props: {
    comment: {
      required: true,
      type: Object,
    },
    defaultAvatar: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      isOpen: null,
      visible: 5,
    };
  },
  computed: {
    visibleReplies() {
      return this.comment.replies.slice(0, this.visible);
    },
  },
};
</script>
<style>
.scrollbar::-webkit-scrollbar {
  width: 7px;
  height: 10px;
}

.scrollbar::-webkit-scrollbar-track {
  border-radius: 100vh;
  background: #b6b8bb;
}

.scrollbar::-webkit-scrollbar-thumb {
  background: #ccd3ea;
  border-radius: 100vh;
  border: 2px solid #ccd3ea;
}

.scrollbar::-webkit-scrollbar-thumb:hover {
  background: #ccd3ea;
}
</style>
