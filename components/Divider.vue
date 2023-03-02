<template>
    <div :style="`height:${height}px`" class="divider" />
</template>

<script setup>
const props = defineProps({
    height: { type: Number, required: false, default: 2 },
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.divider {
    display: inline-block;
    width: 100%;
    background-color: $primary;
    margin: 24px 0;
}
</style>
