<template>
  <div class="pt-[50px] md:pt-[120px]">
    <MHeader />
    <main class="main pt-12">
      <nuxt />
    </main>
    <transition name="toast">
      <Toast v-if="showToast" />
    </transition>
  </div>
</template>
<script>
import MHeader from "~/components/layout/MHeader";
import Toast from "~/components/Toast.vue";
export default {
  components: { MHeader, Toast },
  computed: {
    showToast() {
      return this.$store.state.messages.visible;
    },
  },
};
</script>
<style>
.toast-enter-active {
  animation: wobble 0.5s ease;
}
.toast-leave-to {
  opacity: 0.01;
  transform: translateY(-60px);
}
.toast-leave-active {
  transition: all 0.3s ease;
}
@keyframes wobble {
  0% {
    transform: translateY(-100px);
    opacity: 0.1;
  }
  50% {
    transform: translateY(0.1px);
    opacity: 1;
  }
  60% {
    transform: translateX(8px);
    opacity: 1;
  }
  70% {
    transform: translateX(-8px);
    opacity: 1;
  }
  80% {
    transform: translateX(4px);
    opacity: 1;
  }
  90% {
    transform: translateX(-4px);
    opacity: 1;
  }
  100% {
    transform: translateX(0.1px);
    opacity: 1;
  }
}
</style>
