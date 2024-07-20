// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-05-26",
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase", "@pinia/nuxt"],
  supabase: { redirect: false },
  runtimeConfig: {
    public: {
      loginRedirect: process.env.LOGIN_REDIRECT,
    },
  },
});
