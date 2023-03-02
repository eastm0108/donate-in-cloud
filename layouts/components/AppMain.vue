<template>
    <section class="app-main">
        <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </transition>
        </router-view>
    </section>
</template>

<script setup>
const route = useRoute();
const key = computed(() => route.path);
</script>

<style lang="scss" scoped>
.app-main {
    position: relative;
    overflow: hidden;
    min-height: calc(100vh - 56px);
    width: 100%;
    margin-right: 30px;
    padding: 15px 49px;
    @media (max-width: 1200px) {
        padding-top: 0px;
    }

    @media (max-width: 475px) {
        padding: 15px 25px;
        padding-top: 0px;
    }
}

.fixed-header + .app-main {
    margin-top: 56px;
}
</style>
