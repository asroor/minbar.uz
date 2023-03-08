<template>
  <div v-if="totalPages > 1" class="pagination">
    <a
      href="#"
      aria-label="fist pagination link"
      :class="{ disabled: currentPage === 1 }"
      @click="gotoPageNumber(currentPage - 1)"
    >
      <svg
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
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </a>
    <template v-if="showDots('left')">
      <a
        href="#"
        :class="{ 'is_active disabled': isInFirstPage }"
        @click="gotoPageNumber(1)"
      >
        1
      </a>
      <a href="#" aria-label="dots pagination link">...</a>
    </template>
    <a
      v-for="(page, index) in pages"
      v-show="page !== 0"
      :key="`pages_${index}`"
      href="#"
      :class="{ is_active: page === currentPage }"
      @click="gotoPageNumber(page)"
    >
      {{ page }}
    </a>
    <template v-if="showDots('right')">
      <a href="#" aria-label="dots pagination link">...</a>
      <a
        href="#"
        :class="{ 'is_active disabled': currentPage === totalPages - 1 }"
        @click="gotoPageNumber(totalPages - 1)"
      >
        {{ totalPages - 1 }}
      </a>
      <a
        href="#"
        :class="{ 'is_active disabled': isInLastPage }"
        @click="gotoPageNumber(totalPages)"
      >
        {{ totalPages }}
      </a>
    </template>
    <a
      href="#"
      aria-label="last pagination link"
      :class="{ 'disabled cursor-not-allowed': isInLastPage }"
      @click="gotoPageNumber(currentPage + 1)"
    >
      <svg
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
          d="M9 5l7 7-7 7"
        />
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: { type: Number, required: true, default: () => ({}) },
    maxVisibleButtons: { type: Number, required: false, default: 3 },
  },
  computed: {
    currentPage() {
      return parseInt(this.$route.query.page) || 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },

    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push(i);
      }
      return range;
    },
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }
      return this.currentPage - 1;
    },

    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
  },

  methods: {
    showDots(position = "left") {
      const number = position === "left" ? 1 : this.totalPages;
      const nextNumber = position === "left" ? 2 : this.totalPages - 1;

      return !this.pages.includes(number) || !this.pages.includes(nextNumber);
    },
    gotoPageNumber(pageNumber) {
      this.$emit("page-changed", pageNumber);
    },
  },
};
</script>
