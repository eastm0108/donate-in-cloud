<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <Message />
        <Notification />
        <Loading v-if="loading" />
    </div>
</template>

<script setup>
// import liff from '@line/liff';
import Notification from '@/components/Notification';
import Message from '@/components/Message';
import { useSettingsStore } from '@/stores/settings';
const store = useSettingsStore();
const { loading } = storeToRefs(store);
const config = useRuntimeConfig();

// async function initLiff() {
//     const liffId = config.public.LIFF_ID;
//     try {
//         await liff.init({ liffId });
//         console.log('LIFF initialization completed.');
//         alert('讓我看看', liff);
//     } catch (error) {
//         console.error('LIFF initialization failed.', error);
//     }
// }

// onMounted(async () => {
//     await initLiff();
// });
</script>
<style lang="scss">
.el-button {
    width: 150px;
    height: 40px;
    font-weight: bold;
    font-size: 16px;
}
</style>
