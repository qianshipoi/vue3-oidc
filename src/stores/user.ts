import { User } from "oidc-client-ts";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
  const user = ref<User>();

  const setUser = (newUser?: User) => {
    user.value = newUser;
  }

  return {
    user,
    setUser
  }
})
