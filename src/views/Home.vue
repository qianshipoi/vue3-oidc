<template>
  <div>
    <h1>Home({{ authStore.isAuthorized ? '已登录' : '未登录' }})</h1>
    <ul>
      <li style="overflow: hidden; white-space:nowrap;" v-for="item in data" :key="item.key">{{ item.key }}:
        {{ item.value }}
      </li>
    </ul>
    <template v-if="!authStore.isAuthorized">
      <button @click="authStore.loginPopup">LOGIN Popup</button>
      <button @click="authStore.login">LOGIN</button>
    </template>
    <template v-else>
      <button @click="authStore.logoutPopup">LOGOUT Popup</button>
      <button @click="authStore.logout">LOGOUT</button>
      <button @click="feactData">FeactData</button>
    </template>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, watchEffect } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useUserStore } from '../stores/user'
import { useDataEventRecord } from '../hooks/UseDataEventRecord'
const authStore = useAuthStore();
const userStore = useUserStore();

const { getDataEventRecords } = useDataEventRecord()

type UserProp = {
  key: string
  value: string
}

const feactData = async () => {
  const result = await getDataEventRecords();
  console.log(result);
}

const data = ref<UserProp[]>([])

watchEffect(() => {
  data.value = userStore.user != null ? Object.entries(userStore.user).map(([key, value]) => ({ key, value } as UserProp)) : []
})

onMounted(() => {
  authStore.checkAuth()
})

</script>
