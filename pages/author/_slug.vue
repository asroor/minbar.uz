<template>
  <div class="container mx-auto">
    <div class="flex flex-wrap -mx-3">
      <MRuknlar />

      <div class="content w-full md:w-8/12 lg:w-7/12 px-3 pb-6">
        <div class="box">
          <div class="flex">
            <div class="w-11">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 cursor-pointer"
                @click="$router.go(-1)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </div>
            <div class="flex-1 -mt-2.5">
              <div class="text-lg font-bold">{{ authorDetail.name }}</div>
              <div class="text-sm">
                {{ authorDetail.followers_count }} taqibchi
              </div>
            </div>
          </div>

          <div
            class="page__background__image h-60 -mx-5 mt-3 bg-slate-500/[0.2]"
          ></div>

          <div class="avatar__row flex">
            <div
              class="avatar__circle -mt-20 w-36 h-36 rounded-full bg-slate-600/[0.3] overflow-hidden flex items-center justify-center"
            >
              <div
                class="rounded-full overflow-hidden"
                style="width: 94%; height: 94%"
              >
                <img
                  class="w-full h-full"
                  :src="authorDetail.picture || defaultAvatar"
                  alt=""
                />
              </div>
            </div>

            <div class="avatar__actions__rows ml-auto mt-2">
              <button
                class="text-blue-500 ml-2 hover:underline"
                :class="[
                  { 'pointer-events-none': !isLoggedIn },
                  { '!text-gray-400': authorDetail.followed },
                ]"
                :disabled="!isLoggedIn"
                @click="PageFollow(authorDetail)"
              >
                {{ authorDetail.followed ? "Kuzatilyapti" : "Kuzatish" }}
              </button>
            </div>
          </div>

          <div class="mt-4">
            <div class="text-xl font-bold">{{ authorDetail.name }}</div>
            <div v-if="authorDetail.position" class="text-sm">
              {{ authorDetail.position }}
            </div>
          </div>

          <div class="mt-5 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
            Ro'yxatdan o'tilgan sana:
            {{ $dayjs(authorDetail.created_at).format("DD MMM YYYY") }}
          </div>

          <div class="mt-3 flex items-center gap-5">
            <!-- <a href="#"
              ><span class="font-bold text-md mr-2">{{
                authorDetail.followed || 0
              }}</span
              ><span class="text-sm">taqiblar</span>
            </a> -->
            <a href="#"
              ><span class="font-bold text-md mr-2">{{
                authorDetail.followers_count
              }}</span>
              <span class="text-sm">taqibchilar</span></a
            >
          </div>

          <div class="mt-3">
            <div class="bg-white border border-gray-100 mt-2 -mx-5"></div>
            <div class="font-bold pt-3 text-lg">
              Postlar {{ authorPostsCount }}
            </div>

            <div class="mt-2 -mx-5">
              <MPost
                v-for="post in authorPosts"
                :key="post.id + '_' + post.title"
                :post="post"
                no-picture
                class="!border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  </div>
</template>

<script>
import MRuknlar from "~/components/layout/MRuknlar";
import MPost from "~/components/post/MPost.vue";
//
import defaultAvatar from "@/assets/images/avatar-person.svg";

function fetchAuthorDetail({ $axios, params }) {
  const { slug } = params;
  return $axios.get(`/pages/${slug}/`).then((res) => {
    return { authorDetail: res?.data || {} };
  });
}

export default {
  components: {
    MRuknlar,
    MPost,
  },

  asyncData({ $axios, params }) {
    return fetchAuthorDetail({ $axios, params });
  },

  data() {
    return {
      defaultAvatar,

      authorDetail: {},
      authorPosts: [],
      authorPostsCount: 0,
      posts: [
        {
          id: 9,
          title: "Isnod ilmi",
          slug: "isnod-ilmi",
          body: "<p>&ldquo;Qola haddasano&rdquo; si bori haqiqiy ilimdir, va undan boshqasi shayton&nbsp;&nbsp;vasvasasidir&rdquo; . (Imom&nbsp;Shofe&#39;iy)</p>",
          image:
            "http://api.minbar.uz/media/307122-wallpaper-light-holy-book-god-quran-islam-lord-mercy-image.jpg",
          author: {
            id: 14,
            name: "Muhammad Ayub Usmon",
            position: "Mudarris, olim",
            picture:
              "http://api.minbar.uz/media/pages/%D0%9C%D1%83%D2%B3%D0%B0%D0%BC%D0%BC%D0%B0%D0%B4-%D0%90%D1%8E%D0%B1-%D0%A3%D1%81%D0%BC%D0%BE%D0%BD.jpg",
            is_organization: false,
            followed: false,
          },
          categories: [
            { id: 3, name: "Hadis" },
            { id: 5, name: "Fiqh" },
          ],
          views: 1415,
          likes: 0,
          dislikes: 0,
          actions: { saved: false, liked: false, disliked: false },
          allow_comments: true,
          comments_count: 5,
          visible: true,
          created_at: "2022-08-23T22:24:24.047689+05:00",
          updated_at: "2022-12-22T19:32:21.683402+05:00",
        },
      ],
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.auth.loggedIn;
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.fetchAuthorPosts();
    });
  },

  methods: {
    PageFollow(person) {
      if (!person.followed) {
        this.$store.dispatch("person/followPage", person.id).then(() => {
          fetchAuthorDetail({
            $axios: this.$axios,
            params: this.$route.params,
          }).then((res) => (this.authorDetail = res.authorDetail));
        });
      } else {
        this.$store.dispatch("person/unfollowPage", person.id).then(() => {
          fetchAuthorDetail({
            $axios: this.$axios,
            params: this.$route.params,
          }).then((res) => (this.authorDetail = res.authorDetail));
        });
      }
    },

    fetchAuthorPosts() {
      // #TODO pagination
      const { slug } = this.$route.params;
      const { limit, page = 1 } = this.$route.query;
      return this.$axios
        .get(`/pages/${slug}/posts/`, {
          limit,
          offset: limit * page - limit,
        })
        .then((res) => {
          this.authorPosts = res?.data.results || [];
          this.authorPostsCount = res?.data.count || 0;
        });
    },
  },
};
</script>

<!-- <style lang="scss" scoped></style> -->
