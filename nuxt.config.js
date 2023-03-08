// import { resolve } from "path";
require("dotenv").config();

const ENV = process.env;

const isDev = process.env.NODE_ENV === "development";

export default {
  // rootDir: resolve(__dirname, ".."),
  // buildDir: resolve(__dirname, ".minbar"),
  // srcDir: __dirname,
  render: {
    resourceHints: false,
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: "settings",
        path: "/settings",
        component: resolve("@/pages/profile/index.vue"),
      });
    },
  },
  serverMiddleware: ['~/server-middleware/check-spa'],
  env: ENV,
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 3000, // default: 3005
  },
  head: {
    titleTemplate: "Minbar.uz | %s",
    title: "Web sahifa",
    htmlAttrs: {
      lang: "uz",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/style/style.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/axios.js",
    { src: "~/plugins/vuelidate.js", ssr: true },
    { src: "~/plugins/froala-editor.js", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  ssr: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules

  buildModules: [
    // https://go.nuxtjs.dev/eslint
    [
      "@nuxtjs/eslint-module",
      {
        threads: true,
      },
    ],
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
    "@nuxtjs/tailwindcss",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "cookie-universal-nuxt",
    "@nuxtjs/dotenv",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/dayjs",
    [
      "nuxt-i18n",
      {
        locales: [
          {
            code: "ru",
            file: "ru.js",
          },
          {
            code: "uz",
            file: "uz.js",
          },
          {
            code: "oz",
            file: "oz.js",
          },
        ],
        strategy: "prefix_and_default",
        defaultLocale: "oz",
        detectBrowserLanguage: false,
        lazy: true,
        vueI18nLoader: true,
        langDir: "languages/",
      },
    ],
    "nuxt-vue-multiselect",
  ],
  // ["@nuxtjs/pwa", { workbox: false }],
  auth: {
    // plugins: ["~/plugins/auth/index.js"],
    redirect: {
      login: "/callback",
      logout: "/",
      // callback: "/callback",
      home: "/",
    },
    strategies: {
      local: {
        scheme: "refresh",
        token: {
          property: "token",
          global: false,
        },
        user: {
          property: false,
          autoFetch: true,
        },
        refreshToken: {
          property: "refresh_token",
          data: "refresh_token",
          maxAge: 60 * 60 * 24 * 30,
        },
        endpoints: {
          login: { url: "/users/auth/token/", method: "post" },
          // refresh: { url: "/users/auth/token/refresh", method: "post" },
          refresh: false,
          user: { url: "/users/profile/", method: "get" },
          logout: false,
        },
      },
      google: {
        endpoints: {
          authorization: "https://accounts.google.com/o/oauth2/auth",
          // token: "access_token",
          user: false,
          // userInfo: false,
          userInfo: "/users/profile/",
          // logout: "https://example.com/logout",
        },
        responseType: "code token id_token",
        grantType: "authorization_code",
        // accessType: undefined,
        redirectUri:
          (isDev && "http://localhost:8080/callback") ||
          process.env.GOOGLE_REDIRECT_URI,
        logoutRedirectUri: undefined,
        clientId: process.env.GOOGLE_APP_ID,
        scope: ["profile", "email"],
        // state: "UNIQUE_AND_NON_GUESSABLE",
        codeChallengeMethod: "",
        responseMode: "",
        acrValues: "",
      },
      facebook: {
        redirectUri:
          (isDev && "http://localhost:8080/callback") ||
          process.env.REDIRECT_URI,
        responseType: "code token",
        endpoints: {
          userInfo: "/users/profile/",
        },
        clientId: process.env.FACEBOOK_APP_ID,
        scope: ["public_profile", "email"],
      },
    },

    localStorage: false,
  },
  dayjs: {
    locales: ["uz-latn", "uz", "en"],
    defaultLocale: "uz-latn",
    defaultTimeZone: "Asia/Tashkent",
    plugins: [
      "utc", // import 'dayjs/plugin/utc'
      "timezone", // import 'dayjs/plugin/timezone'
    ], // Your Day.js plugin
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.AXIOS_BASE_URL,
  },

  publicRuntimeConfig: {
    axios: {
      retry: { retries: 0 },
      baseURL: process.env.AXIOS_BASE_URL,
      browserBaseURL: process.env.AXIOS_BASE_URL,
    },
  },

  privateRuntimeConfig: {
    axios: {
      retry: { retries: 0 },
      baseURL: process.env.AXIOS_BASE_URL,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: {
      ignoreOrder: true,
    },
    transpile: [
      'defu'
    ]
  },
};
