<template>
  <div class="hidden sm:block search-f flex-grow relative">
    <form>
      <input
        id="header-search"
        v-model="search"
        class="w-full rounded-md py-3 px-4 pl-12 shadow focus:outline-none"
        name="header-search"
        placeholder="Minbar.uz dan qidiring"
        type="search"
        @input="debounceSearch"
      />
      <button
        type="button"
        aria-label="search button"
        class="absolute inset-y-0 left-3 text-gray-400 hover:text-gray-500"
        @click="handleClickFilter(searchResult.length > 0)"
      >
        <svg
          v-if="searchResult.length > 0"
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
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
          />
        </svg>
        <svg
          v-else
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </button>
    </form>
    <div
      v-if="searchFilterOpen"
      class="absolute shadow bg-white w-auto top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto mt-1"
    >
      <div class="flex flex-col p-2">
        <div class="cursor-pointer border-gray-100 rounded-t">
          <fieldset>
            <legend class="contents text-base font-medium text-gray-900">
              Search Filters
            </legend>
            <div class="mt-4 space-y-4">
              <div class="flex items-center">
                <input
                  id="search-title"
                  v-model="filter"
                  value="title"
                  name="search-filter"
                  type="radio"
                  class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked
                />
                <label
                  for="push-everything"
                  class="ml-3 block text-sm font-medium text-gray-700"
                  >Nomi bo'yicha izlash</label
                >
              </div>
              <div class="flex items-center">
                <input
                  id="search-body"
                  v-model="filter"
                  value="body"
                  name="search-filter"
                  type="radio"
                  class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  for="push-email"
                  class="ml-3 block text-sm font-medium text-gray-700"
                  >Matin boyicha izlash</label
                >
              </div>
              <div class="flex items-center">
                <input
                  id="search-all"
                  v-model="filter"
                  value=""
                  name="search-filter"
                  type="radio"
                  class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  for="push-nothing"
                  class="ml-3 block text-sm font-medium text-gray-700"
                  >Xammasi bo'yicha izlash</label
                >
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
    <div
      v-if="searchResultOpen"
      class="flex flex-col bg-white border border-gray-100 w-full h-full absolute mt-1"
    >
      <h3 class="flex text-sm items-center justify-center p-2">
        <b>{{ search }} </b>
        <p class="pl-1">
          kalimasi bilan izlangan natijalar
          {{ searchResult.length === 0 ? "topilmadi" : "" }}
        </p>
      </h3>
      <ul
        v-if="searchResult.length > 0"
        class="bg-white border border-gray-100 mt-2"
      >
        <li
          v-for="(item, index) in searchResult"
          :key="index"
          class="pl-14 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900"
          @click="handleClickItem(item)"
        >
          <img
            :src="item.author.picture"
            :alt="item.author.name"
            class="stroke-current absolute w-10 h-10 left-2 top-2 rounded-full object-cover object-top"
          />
          <div class="font-semibold flex flex-row justify-between">
            <h2>
              {{ item.title }}
            </h2>
            <ul class="flex flex-wrap items-center -mx-1 text-sm">
              <li
                v-for="(category, indexCategory) in item.categories"
                :key="indexCategory"
                class="mx-1 mb-2"
              >
                <a
                  href="#"
                  class="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    ></path></svg
                  ><span>{{ category.name }}</span></a
                >
              </li>
            </ul>
          </div>
          <p v-html="truncate(item.body, 200)" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchInput",
  data: () => ({
    search: "",
    debounce: null,
    searchFilterOpen: false,
    searchResultOpen: false,
    filter: "title",
  }),
  computed: {
    searchResult() {
      return this.$store.state.search.items;
    },
  },
  watch: {
    filter(newVal, oldVal) {
      this.searchFilterOpen = false;
      this.handleSearch(this.search, newVal);
    },
  },
  methods: {
    handleClickFilter(filter) {
      this.searchFilterOpen = !!filter;
    },
    handleClickItem(item) {
      this.searchResultOpen = false;
      this.search = "";
      return this.$router.push("/pages/posts/" + item.title);
    },
    truncate(str, n) {
      return str.length > n ? str.slice(0, n - 1) + "&hellip;" : str;
    },
    debounceSearch(event) {
      this.message = event.target.value.trim();
      this.searchResultOpen = true;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.handleSearch(this.search, this.filter);
      }, 600);
    },
    handleSearch(q, filter) {
      return this.$store.dispatch("search/GET_SEARCH_REQUEST", {
        q,
        filter,
      });
    },
  },
};
</script>

<style scoped>
#header-search::-webkit-search-cancel-button   {
  appearance: none;
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  background: url(./assets/images/cancel-icon.svg) no-repeat;
  background-size: 100%;
  cursor: pointer;
}
</style>
