<template>
    <div class="logo-container">
        <div key="collapse" class="logo-link" to="/">
            <img src="~/assets/common/logo.svg" :src="logo" class="logo" />
        </div>
    </div>
</template>

<script setup>
defineProps({});
</script>

<style lang="scss" scoped>
.logoFade-enter-active {
    transition: opacity 1.5s;
}

.logoFade-enter,
.logoFade-leave-to {
    opacity: 0;
}

.logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: transparent;

    & .logo-link {
        & .logo {
            width: 151px;
            height: 25px;
            vertical-align: middle;
        }
    }
}
</style>
