<template>
  <div>
    <div class="container mx-auto">
      <div class="flex flex-wrap -mx-3">
        <div class="content w-full md:w-8/12 lg:w-9/12 px-3 pb-6">
          <div class="space-y-4 sm:space-y-6">
            <div class="space-y-4 sm:space-y-6">
              <div
                x-data="{isOpen: false}"
                class="box flex flex-wrap items-center justify-between"
                @keydown.escape="isShow = false"
              >
                <span class="hidden sm:block"
                  >{{ bookmarkCat }} ta bo'limdan {{ bookmarksCount }} ta
                  maqola</span
                >
                <span class="block sm:hidden">Ja'mi 98 ta maqola</span>
                <button
                  class="flex items-center space-x-2 px-3 sm:px-6 py-2 bg-primary text-white rounded cursor-pointer hover:opacity-90 transition"
                  @click="isShow = true"
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
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>

                  <span>Saralash</span>
                </button>
              </div>
              <div class="box relative">
                <template v-if="loading">
                  <ul class="list-number mb-6">
                    <m-saved-skeleton
                      v-for="i in 6"
                      :key="i"
                    ></m-saved-skeleton>
                  </ul>
                </template>
                <template v-else-if="bookmarksCount == 0">
                  <div>Hech qanday natija topilmadi !</div>
                </template>
                <template v-else>
                  <ul class="flex flex-wrap list-number mb-6">
                    <SavedList
                      v-for="(bookmark, i) in bookmarks"
                      :key="i"
                      :bookmark="bookmark"
                      @un-save="unSave"
                    />
                  </ul>
                </template>
                <QPagination
                  :total-pages="totalPages"
                  @page-changed="setPage"
                ></QPagination>
              </div>
            </div>
          </div>
        </div>
        <RightSidebar></RightSidebar>
      </div>
    </div>
    <FilteringSaveds
      :is-open="isShow"
      @close="isShow = false"
    ></FilteringSaveds>
  </div>
</template>

<script>
import QPagination from "../components/QPagination.vue";
import SavedList from "~/components/saved/MSaved.vue";
import RightSidebar from "~/components/layout/RightSidebar.vue";
import FilteringSaveds from "~/components/saved/MSavedFilter.vue";
import MSavedSkeleton from "~/components/saved/MSavedSkeleton.vue";
function fetchData({ store, query }) {
  const { page, limit = 10, ordering, categories } = query;
  return store.dispatch("bookmarks/getBookmarks", {
    limit,
    ordering,
    page,
    categories,
  });
}
export default {
  name: "Saved",
  middleware({ store, redirect }) {
    if (!store.state.auth.loggedIn) {
      return redirect("/");
    }
  },
  components: {
    SavedList,
    RightSidebar,
    FilteringSaveds,
    MSavedSkeleton,
    QPagination,
  },
  fetch({ store, query }) {
    return fetchData({ store, query });
  },
  data() {
    return {
      isShow: false,
      loading: false,
      currentPage: 1,
    };
  },
  computed: {
    bookmarks() {
      return this.$store.state.bookmarks.bookmarks?.results || [];
    },
    bookmarksCount() {
      return this.$store.state.bookmarks.bookmarks?.count || 0;
    },
    totalPages() {
      return this.$store.state.bookmarks.bookmarks?.total_pages || 0;
    },
    bookmarkCat() {
      if (this.$route.query.categories)
        return this.$route.query.categories.split(",").length;
      else return "16";
    },
  },
  watch: {
    "$route.query": {
      handler() {
        this.FetchBookmarks();
      },
      deep: true,
    },
  },
  methods: {
    FetchBookmarks() {
      this.loading = true;
      return fetchData({ store: this.$store, query: this.$route.query })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    unSave(id) {
      this.$store.dispatch("bookmarks/removeBookmark", id).then(() => {
        this.$store.commit("Toast", {
          visible: true,
          text: "Saqlanganlardan o'chirildi !",
          type: "success",
        });
        this.FetchBookmarks();
      });
    },
    setPage(pageNumber) {
      this.$router.push({
        path: "/saved",
        query: { ...this.$route.query, page: pageNumber },
      });
    },
  },

  head() {
    return {
      title: "Saqlanganlar",
    };
  },
};
</script>
