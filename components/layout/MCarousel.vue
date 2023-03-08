<template>
  <div class="box relative">
    <VueSlickCarousel
      v-if="personList != 0"
      ref="carousel"
      class="author-list flex -mx-2 mb-6"
      v-bind="settings"
      :arrows="false"
      @init="onSlickCarouselInit"
      @afterChange="afterChange"
    >
      <div v-for="(item, index) in personList" :key="index" class="px-2">
        <div
          class="h-full p-2 flex flex-col justify-between gap-2 text-center items-center rounded border border-opacity-70 card"
        >
          <div
            class="rounded-full basis-1/2 mx-auto mb-3 w-24 h-24 overflow-hidden"
          >
            <img
              :src="item.picture || avatarPerson"
              :alt="item.name"
              class="w-full h-full object-cover object-top pointer-events-none"
            />
          </div>
          <div class="flex flex-col justify-between p-1 h-[60%]">
            <p class="mb-[10px] h-[45px]  line-clamp-2">{{ item.name }}</p>
            <button
              :disabled="!isLoggedIn"
              :class="{ 'text-white bg-blue-500': item.followed }"
              class="w-full block px-2 py-1 border border-blue-500  text-blue-500 text-xs tracking-wider uppercase rounded opacity-80 hover:opacity-100 hover:text-white hover:bg-blue-500 transition"
              @click="PageFollow(item)"
            >
              {{ item.followed ? "Kuzatilyapti" : "Kuzatish" }}
            </button>
          </div>
        </div>
      </div>
    </VueSlickCarousel>

    <div class="authors-dot">
      <ul role="tablist">
        <li
          v-for="page in pagesCount"
          :key="page"
          :class="[{ 'slick-active': currentPage == page }]"
          role="presentation"
        >
          <button
            :id="`slick-slide-control0${page}`"
            type="button"
            role="tab"
            :aria-controls="`slick-slide0${page}`"
            :aria-label="`${page} of ${pagesCount}`"
            tabindex="0"
            aria-selected="true"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

import avatarPerson from "@/assets/images/avatar-person.svg";

export default {
  components: { VueSlickCarousel },
  data() {
    return {
      avatarPerson,

      settings: {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        autoplay: false,
        autoplaySpeed: 4000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: false,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
      pagesCount: 0,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState({
      personList: (state) => state.person?.people || [],
    }),
    isLoggedIn() {
      return this.$store.state.auth.loggedIn;
    },
  },

  methods: {
    ...mapMutations("person", ["setPersonFollowedById"]),
    ...mapMutations("post", ["SET_POST_AUTHOR_FOLLOW_STATE"]),
    onSlickCarouselInit() {
      if (process.client) {
        this.pagesCount = Math.round(
          (this.personList?.length || 0) / this.settings.slidesToShow
        );
      }
    },

    afterChange(sliceNumber) {
      this.currentPage = Math.round(sliceNumber / 4 + 1);
    },

    goToPage(page) {
      this.$refs.carousel.goTo(page);
    },
    PageFollow(person) {
      let followState = false;
      if (!person.followed) {
        this.$store.dispatch("person/followPage", person.id).then(() => {
          followState = true;
          const data = {
            id: person.id,
            followState,
          };
          this.setPersonFollowedById(data);
          this.SET_POST_AUTHOR_FOLLOW_STATE(data);
        });
      } else {
        this.$store.dispatch("person/unfollowPage", person.id).then(() => {
          const data = {
            id: person.id,
            followState,
          };
          this.setPersonFollowedById(data);
          this.SET_POST_AUTHOR_FOLLOW_STATE(data);
        });
      }
    },
  },
};
</script>
