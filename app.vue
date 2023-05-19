<template>
    <div :class="{ fixedLoading: loading }">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <Message />
        <Notification />
        <Loading v-if="loading" />
    </div>
</template>

<script setup>
import Notification from '@/components/Notification';
import Message from '@/components/Message';
import { useSettingsStore } from '@/stores/settings';
const store = useSettingsStore();
const { loading } = storeToRefs(store);
</script>

<style lang="scss">
.el-button {
    width: 150px;
    height: 40px;
    font-weight: bold;
    font-size: 16px;
}

.fixedLoading {
    overflow: hidden;
    position: fixed;
    height: 100vh;
    width: 100vw;
}
</style>
