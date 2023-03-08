<template>
  <aside
    class="sidebar sidebar-mobile-wide w-full h-screen fixed top-0 left-0 z-20 lg:relative lg:z-0 lg:h-auto lg:w-2/12 lg:bg-transparent"
    x-show.transition="true"
  >
    <div
      class="w-10/12 sm:w-6/12 h-screen px-3 py-6 overflow-y-auto bg-white lg:sticky lg:top-[50px] lg:h-auto lg:w-full lg:py-0 lg:!bg-transparent isOpenNav"
    >
      <nav>
        <ul class="sidebar__list">
          <li v-for="(rukn, index) in visableRuknlar" :key="index" @click="onActiveBtnClick(index)">
            <nuxt-link
              :class="{
                'sidebar__link--active': $route.query.cat_id == rukn.id,
              }"
              :to="
                localePath({
                  name: 'index',
                  query: {
                    cat_id: rukn.id,
                  },
                })
              "
              class="sidebar__link"
            >
              <!--                  <span :class="`icon-${rukn.slug}`"></span>-->
              <i :class="`icon-${rukn.slug}`" class="text-[22px]" />
              <span>{{ rukn.name }}</span>
            </nuxt-link>
          </li>
        </ul>

        <div>
          <button
            v-if="categoryList && ruknlarVisable < categoryList.length"
            class="rounded-full w-full p-2 pl-3 flex items-center text-primary space-x-2 transition duration-900 ease-in-out"
            @click="moreButton"
          >
            Ko'proq
            <svg
              class="w-5"
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
            <span x-text="isOpen ? showText : hideText" />
          </button>
          <button
            v-else
            class="w-full p-2 pl-3 flex items-center text-primary rounded space-x-2"
            @click="lessButton"
          >
            Kamroq
            <svg
              class="rotate-180 w-5"
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
            <span x-text="isOpen ? showText : hideText" />
          </button>
        </div>
      </nav>
    </div>
    <button
      class="absolute top-6 right-3 text-white transition-all delay-1000 block md:hidden"
      @click="onCloseBtnClick"
    >
      <svg
        class="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 18L18 6M6 6l12 12"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
        />
      </svg>
    </button>
  </aside>
</template>
<script>
import "~/components/icons/icon-fonts/style.css";
import { mapState } from "vuex";

export default {
  data() {
    return {
      ruknlarVisable: 11,
      step: 9999,
    };
  },

  computed: {
    ...mapState({
      categoryList: (state) => state.category.categories || [],
    }),

    visableRuknlar() {
      return this.categoryList.slice(0, this.ruknlarVisable);
    },
  },
  methods: {
    onCloseBtnClick() {
      const asideDrawer = document.querySelector(".sidebar-mobile-wide");

      if (asideDrawer) {
        asideDrawer.classList.remove("isOpenCategory");
      }
    },
    onActiveBtnClick(index) {
      this.activeDefault = index;
    },
    moreButton() {
      this.ruknlarVisable += this.step;
    },
    lessButton() {
      this.ruknlarVisable = 11;
    },
  },
};
</script>
<style>
.sidebar__list {
  overflow-y: scroll;
  height: 450px;
}
.sidebar__list::-webkit-scrollbar {
  display: none;
  background: local;
}
</style>
