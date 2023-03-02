<template>
    <Transition name="slide-fade-bottom">
        <div v-if="notifications.length > 0" class="notification-container">
            <div v-for="(notification, index) in notifications" :key="index" class="notification">
                <img
                    v-if="notification.type === 'error'"
                    src="@/assets/common/error.svg"
                    :alt="'錯誤訊息：' + notification.message"
                />
                <img
                    v-if="notification.type === 'success'"
                    src="@/assets/common/success.svg"
                    :alt="'成功訊息：' + notification.message"
                />
                <span class="notification-message">{{ notification.message }}</span>
                <div v-if="notification.seconds === 0" @click="store.removeNotification(index)" class="delete"></div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { useNotificationStore } from '@/stores/notification';
const store = useNotificationStore();
const { notifications, addNotification, removeNotification, position } = storeToRefs(store);
</script>

<style lang="scss" scoped>
@import '../styles/mixin.scss';
@import '../styles/variables.scss';

.notification-container {
    position: fixed;
    right: 0px;
    z-index: 999;
    width: 100%;
    bottom: 0;
}

.notification {
    position: relative;
    height: 80px;
    padding: 10px;
    background-color: rgba($baseFont, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        margin-right: 24px;
    }
    &-message {
        font-weight: bold;
        font-size: 16px;
        color: $basePrimary;
    }
}

.delete {
    position: absolute;
    cursor: pointer;
    font-size: 16px;
    color: #999;
    margin-left: 10px;
    top: 50%;
    right: 40px;
    width: 33px;
    height: 33px;
    background-image: url('@/assets/common/cross.svg');
    transform: translateY(-50%);
}

.slide-fade-bottom-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-bottom-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-bottom-enter-from,
.slide-fade-bottom-leave-to {
    transform: translateY(80px);
    opacity: 0;
}
</style>
