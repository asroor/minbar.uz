<template>
  <div
    v-show="isOpen"
    x-transition:enter="transition ease-out duration-200"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    x-transition:leave="transition ease-in duration-200"
    x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0"
    class="w-screen h-screen flex fixed top-0 left-0 transform bg-gray-900 bg-opacity-80 z-20 overflow-y-auto"
  >
    <div class="w-full max-w-lg m-auto bg-white p-5 rounded-lg relative">
      <button
        type="button"
        class="w-10 h-10 inline-flex items-center justify-center absolute top-0 right-0 text-black"
        @click="$emit('close')"
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

      <p class="font-medium text-lg text-gray-600">Natijani saralash</p>
      <hr class="-mx-4 mt-4 mb-6 border-t" />

      <form class="space-y-6" @submit.prevent="setQuery()">
        <div class="flex flex-wrap -mx-3 space-y-6 sm:space-y-0">
          <div class="w-full sm:w-6/12 px-3 space-y-2">
            <p class="text-gray-600">Vaqti bo'yicha:</p>

            <div class="c-select w-full relative my-2">
              <select
                id="vaqt-select"
                v-model="ordering"
                name="vaqt-select"
                class="block appearance-none text-body-light w-full bg-white border px-3 py-2 pr-9 rounded focus:shadow-outline"
              >
                <option value="-title">Z-A, Eng ohirgisidan boshlab</option>
                <option value="title" selected>
                  A-Z, Eng birinchisidan boshlab
                </option>
                <option value="-views">Eng ko'p o'qilganlaridan boshlab</option>
              </select>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13.828"
                height="7.914"
                class="absolute pointer-events-none top-1/2 right-3 -translate-y-1/2 transform"
              >
                <g id="angle-down-icon" transform="translate(.342 -2.585)">
                  <path
                    id="Path_27"
                    data-name="Path 27"
                    d="M1.072 3.999l5.5 5.5 5.5-5.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></path>
                </g>
              </svg>
            </div>
          </div>

          <div class="w-full sm:w-6/12 px-3 space-y-2">
            <p class="text-gray-600">Nechtadan ko'rsatish:</p>
            <div class="c-select w-full relative my-2">
              <select
                id="vaqt-select"
                v-model="limit"
                name="vaqt-select"
                class="block appearance-none text-body-light w-full bg-white border px-3 py-2 pr-9 rounded focus:shadow-outline"
              >
                <option value="50" selected>50 tadan saralab</option>
                <option value="100">100 tadan ko'rsatish</option>
                <option value="">Barchasini ko'rsatish</option>
              </select>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13.828"
                height="7.914"
                class="absolute pointer-events-none top-1/2 right-3 -translate-y-1/2 transform"
              >
                <g id="angle-down-icon" transform="translate(.342 -2.585)">
                  <path
                    id="Path_27"
                    data-name="Path 27"
                    d="M1.072 3.999l5.5 5.5 5.5-5.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-gray-600">Bo'lim bo'yicha:</p>

          <div class="flex flex-wrap -mx-3">
            <div
              v-for="(category, i) in categoryList"
              :key="i"
              class="px-3 py-2 w-6/12 sm:w-4/12"
            >
              <label
                :for="`cat-${category.slug}`"
                class="c-checkbox items-start cursor-pointer"
              >
                <input
                  :id="`cat-${category.slug}`"
                  v-model="selected"
                  type="checkbox"
                  :value="category.id"
                  :name="`cat-${category.slug}`"
                />
                <span class="c-checkbox__icon">
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
                <span class="c-checkbox__title not-italic">{{
                  category.name
                }}</span>
              </label>
            </div>
          </div>
        </div>
        <hr class="-mx-5 my-6 border-t" />

        <div class="flex justify-center">
          <button
            class="flex items-center space-x-2 px-3 sm:px-6 py-2 bg-primary text-white rounded cursor-pointer hover:opacity-90 transition"
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Saqlash</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: [],
      ordering: null,
      limit: null,
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.category.categories;
    },
  },
  methods: {
    setQuery() {
      this.$router.push({
        query: {
          categories: this.selected.length
            ? this.selected.toString()
            : undefined,
          ordering: this.ordering ? this.ordering : undefined,
          limit: this.limit ? this.limit : undefined,
        },
      });
      this.$emit("close");
    },
  },
};
</script>
