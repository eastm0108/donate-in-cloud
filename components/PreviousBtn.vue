<template>
    <div class="prevStep" @click="prevStep">
        <img src="@/assets/common/arrow.svg" :alt="text + '按鈕'" />
        <p>{{ text }}</p>
    </div>
</template>

<script setup>
const router = useRouter();

const props = defineProps({
    path: { type: String, required: false, default: '/' },
    text: { type: String, required: false, default: '返回' },
});

function prevStep() {
    router.push({ path: props.path });
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.prevStep {
    cursor: pointer;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 50px;
    top: 38px;
    height: 22px;

    @media (max-width: 1200px) {
        position: relative;
        left: 0;
        top: 0;
        justify-content: flex-start;
        padding-top: 16px;
        padding-bottom: 16px;
        height: 50px;
    }

    &:hover {
        p {
            color: darken($primary, 20%);
            border-bottom: 1px solid darken($primary, 20%);
        }
    }

    p {
        transition: 0.333;
        display: inline-block;
        margin: 0;
        margin-left: 8px;
        line-height: 1;
        color: $primary;
        border-bottom: 1px solid $primary;
        padding-bottom: 1px;
        font-weight: bold;
    }
}
</style>
