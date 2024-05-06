// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase", "@pinia/nuxt"],
  supabase: { redirect: false },
  runtimeConfig: {
    public: {
      loginRedirect: process.env.LOGIN_REDIRECT,
    },
  },
});
