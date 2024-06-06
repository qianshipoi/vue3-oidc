import { defineStore } from "pinia";
import { UserManager, type UserManagerSettings } from 'oidc-client-ts';
import { useUserStore } from "./user";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

type LoginState = {
  targetUrl?: string;
}

export const useAuthStore = defineStore('auth', () => {
  const userStore = useUserStore();
  const userRouter = useRouter();
  const isAuthorized = ref(false);

  const openIdConnectSettings: UserManagerSettings = {
    authority: `https://localhost:44395`,
    redirect_uri: `${window.location.origin}/callback`,
    post_logout_redirect_uri: `${window.location.origin}`,
    popup_post_logout_redirect_uri: `${window.location.origin}/logout-callback`,
    client_id: `vueclient`,
    scope: 'openid profile email dataEventRecords offline_access',
    response_type: `code`,
    automaticSilentRenew: true,
  }
  const userManager = new UserManager(openIdConnectSettings);

  const checkAuth = () => {
    userManager.getUser().then(user => {
      if (user) {
        userStore.setUser(user);
        isAuthorized.value = true;
      }
    });
  }

  const login = () => {
    userManager.signinRedirect({
      state: { targetUrl: window.location.pathname } as LoginState
    });
  }

  const loginPopup = async () => {
    const user = await userManager.signinPopup();
    if (user) {
      userStore.setUser(user);
      isAuthorized.value = true;
    }
  }

  const loginCallbackPopup = async () => {
    await userManager.signinPopupCallback();
  }

  onMounted(() => {
    window.addEventListener('message', (event) => {
      if (event.data === 'logout') {
        userStore.setUser();
        isAuthorized.value = false;
        userRouter.replace('/');
      }
    })
  })

  const logoutPopup = async () => {
    await userManager.signoutPopup();
  }

  const signoutCallback = async () => {
    await userManager.signoutCallback()
    window.opener.postMessage('logout', window.location.origin);
  }

  const callback = async () => {
    const user = await userManager.signinCallback();
    if (user) {
      userStore.setUser(user);
      isAuthorized.value = true;
      const targetUrl = (user.state as LoginState).targetUrl || '/';
      userRouter.replace(targetUrl);
    }
  }

  const logout = () => {
    userManager.signoutRedirect();
  }

  const getAccessToken = (): string => {
    if (isAuthorized.value) {
      return userStore.user!.access_token;
    }
    login();
    return '';
  }

  return {
    login,
    callback,
    logout,
    checkAuth,
    isAuthorized,
    getAccessToken,
    loginPopup,
    loginCallbackPopup,
    logoutPopup,
    signoutCallback
  }
});
