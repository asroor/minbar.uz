<template>
  <div>
    <div class="container mx-auto">
      <div class="flex flex-wrap -mx-3">
        <MRuknlar />
        <div class="content w-full md:w-8/12 lg:w-7/12 px-3 pb-6">
          <form class="sm:hidden search-f flex-grow mb-4 relative">
            <input
              id="content-search"
              type="text"
              name="content-search"
              class="w-full rounded-md py-3 px-4 pl-12 border focus:outline-none"
              placeholder="Minbar.uz dan qidiring"
            />
            <button
              class="absolute inset-y-0 left-3 text-gray-400 hover:text-gray-500"
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>

          <div class="space-y-4 sm:space-y-6">
            <client-only>
              <MCarousel class="fade-in" />
            </client-only>

            <template v-if="fetching">
              <m-skeleton
                v-for="(num, i) in 6"
                :key="i"
                class="box"
              ></m-skeleton>
            </template>

            <template v-else-if="postsCount == 0">
              <div class="box fade-in">Hozirda bu ruknda postlar yo'q</div>
            </template>
            <template v-else>
              <MPost
                v-for="post in posts"
                :key="post.id + '_' + post.title"
                :post="post"
              />
            </template>
          </div>
        </div>
        <Poll></Poll>
      </div>
    </div>
  </div>
</template>
<script>
// import SocialFacebook from "~/components/auth/social/SocialFacebook";
// import SocialGoogle from "~/components/auth/social/SocialGoogle";
// import SocialTelegram from "~/components/auth/social/SocialTelegram";
import MSkeleton from "~/components/post/subcomponents/MSkeleton.vue";
import MRuknlar from "~/components/layout/MRuknlar";
import MPost from "~/components/post/MPost.vue";
import MCarousel from "~/components/layout/MCarousel";
import Poll from "~/components/layout/RightSidebar.vue";

function fetchData({ store, query }) {
  const { page, cat_id, limit = 15 } = query;
  return store.dispatch("post/FetchPosts", {
    page,
    limit,
    category: cat_id,
  });
}

export default {
  components: { MRuknlar, MPost, MSkeleton, MCarousel, Poll },

  fetch({ store, query }) {
    return fetchData({ store, query });
  },

  data() {
    return {
      fetching: false,
    };
  },

  computed: {
    posts() {
      return this.$store.state.post.posts?.results || [];
    },
    postsCount() {
      return this.$store.state.post.posts?.count || 0;
    },
  },

  watch: {
    "$route.query": {
      handler() {
        this.selfFetchPosts();
      },
      deep: true,
    },
  },

  methods: {
    selfFetchPosts() {
      this.fetching = true;
      return fetchData({ store: this.$store, query: this.$route.query })
        .then(() => {
          this.fetching = false;
        })
        .catch(() => {
          this.fetching = false;
        });
    },
  },

  head() {
    return {
      title: "Bosh sahifa",
    };
  },
};
</script>
