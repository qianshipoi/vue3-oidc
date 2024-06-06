<script setup lang='ts'>
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();
authStore.signoutCallback();
</script>
