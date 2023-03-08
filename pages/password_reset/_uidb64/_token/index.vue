<template>
  <div class="container mx-auto justify-center">
    <div class="w-full md:max-w-[500px] mx-auto">
      <form class="box w-full" @submit.prevent="onSubmit">
        <div class="mb-8 text-lg">
          <div class="mb-2 font-semibold">Parol o'ylab toping</div>
          <input
            ref="password1Ref"
            v-model="$v.form.new_password1.$model"
            placeholder="Parolni kiriting"
            type="password"
            autocomplete="none"
            class="px-3 py-2 flex-grow border rounded w-full"
          />

          <p
            v-show="
              $v.form.new_password1.$dirty && $v.form.new_password1.$error
            "
            class="mt-2 text-red-500 text-sm"
            style="display: none"
          >
            Parol kiritilishi shart
          </p>
        </div>

        <div class="mb-8 text-lg">
          <div class="mb-2 font-semibold">Parolni qayta kiriting</div>
          <input
            v-model="$v.form.new_password2.$model"
            placeholder="Tasdiqlash uchun parolni qayta kiriting"
            type="password"
            autocomplete="none"
            class="input px-3 py-2 flex-grow border rounded w-full"
          />

          <p
            v-show="
              $v.form.new_password2.$dirty && $v.form.new_password2.$error
            "
            class="mt-2 text-red-500 text-sm"
            style="display: none"
          >
            <template v-if="!$v.form.new_password2.$sameAsPassword">
              Parol va tasdiqlash paroli bir xil bo'lishi kerak
            </template>
            <template v-else> Parol kiritilishi shart </template>
          </p>
        </div>

        <div class="text-lg">
          <submitButton type="submit" :pending="pending" class="w-full block">
            Parolni yangilash
          </submitButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import submitButton from "@/components/buttons/submitButton.vue";

function defaultForm() {
  return {
    new_password1: "",
    new_password2: "",
    uid: "",
    token: "",
  };
}

export default {
  validations() {
    return {
      form: {
        new_password1: { required, minLength: minLength(6) },
        new_password2: { required, sameAsPassword: sameAs("new_password1") },
      },
    };
  },

  components: {
    submitButton,
  },

  data() {
    return {
      form: defaultForm(),

      pending: false,
    };
  },

  mounted() {
    if (process.client) {
      const { uidb64, token } = this.$route.params;

      this.form.uid = uidb64;
      this.form.token = token;

      this.$refs.password1Ref.focus();
    }
  },

  methods: {
    onSubmit() {
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        this.$store.commit("Toast", {
          visible: true,
          text: `Parolni kiriting`,
          type: "error",
        });

        return;
      }

      this.pending = true;

      const { new_password1, new_password2, uid, token } = this.form;

      this.$axios
        .post(`/users/password/reset/confirm/${uid}/${token}/`, {
          new_password1,
          new_password2,
          uid,
          token,
        })
        .then(() => {
          this.pending = false;
          this.$store.commit("Toast", {
            visible: true,
            text: `Parol muvaffaqiyatli o'zgartirildi`,
            type: "success",
          });

          this.form = defaultForm();
          this.$router.push("/");
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("Toast", {
            visible: true,
            text: `Yangi parol o'rnatishda xato yuz berdi`,
            type: "error",
          });
          this.pending = false;
        });
    },
  },
};
</script>
