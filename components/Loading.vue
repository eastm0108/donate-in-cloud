<template>
    <div class="loading">
        <div class="bouncing__loader">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../styles/mixin.scss';
@import '../styles/variables.scss';
.loading {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    background: #ffffff;
}

.bouncing__loader {
    display: flex;
    justify-content: center;
}

@keyframes bouncing-loader {
    to {
        opacity: 0.1;
        transform: translate3d(0, -1rem, 0);
    }
}

.bouncing__loader > div {
    z-index: 1000000;
    width: 1rem;
    height: 1rem;
    margin: 3rem 0.2rem;
    background: $primary;
    border-radius: 50%;
    animation: bouncing-loader 0.6s infinite alternate;
}

.bouncing__loader > div:nth-child(2) {
    animation-delay: 0.2s;
}

.bouncing__loader > div:nth-child(3) {
    animation-delay: 0.4s;
}
</style>
