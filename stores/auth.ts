import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({ isAuth: false, user: null }),
  actions: {
    setUser(user: any) {
      this.user = user;
    },
    setAuth(value: boolean) {
      this.isAuth = value;
    },
  },
});
