<template>
    <div class="app-wrapper">
        <div class="main-container">
            <div :class="{ 'fixed-header': fixedHeader }">
                <Navbar />
            </div>
            <AppMain />
        </div>
    </div>
</template>

<script setup>
import { useSettingsStore } from '@/stores/settings';
import AppMain from './components/AppMain.vue';
import Navbar from './components/Navbar.vue';

const store = useSettingsStore();

const { fixedHeader } = storeToRefs(store);
</script>

<style lang="scss" scoped>
@import '../styles/mixin.scss';
@import '../styles/variables.scss';

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: auto;
    transition: width 0.28s;
    width: 100%;
}
</style>
