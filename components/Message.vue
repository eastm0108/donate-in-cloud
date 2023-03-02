<template>
    <Transition name="slide-fade">
        <div v-if="messages.length > 0" class="message-container">
            <div v-for="(message, index) in messages" :key="index" class="message" :class="message.type">
                <img
                    v-if="message.type === 'error'"
                    src="@/assets/common/error.svg"
                    :alt="'錯誤訊息：' + message.text"
                />
                <img
                    v-if="message.type === 'success'"
                    src="@/assets/common/success.svg"
                    :alt="'成功訊息：' + message.text"
                />
                <span class="message-text">{{ message.text }}</span>
                <div v-if="message.seconds === 0" @click="store.removeMessage(index)" class="delete"></div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { useMessageStore } from '@/stores/message';
const store = useMessageStore();
const { messages, addMessage, removeMessage } = storeToRefs(store);
</script>

<style lang="scss" scoped>
@import '../styles/mixin.scss';
@import '../styles/variables.scss';

.message-container {
    position: fixed;
    top: 18px;
    right: 18px;
    z-index: 999;
    background-color: $baseBgc;
    border-radius: 4px;
}

.message {
    padding: 10px 16px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    img {
        margin-right: 12px;
    }
}

.message-icon {
    margin-right: 10px;
    font-size: 20px;
}

.message-text {
    flex: 1;
    margin-right: 12px;
}

.delete {
    display: inline-block;
    cursor: pointer;
    font-size: 16px;
    width: 33px;
    height: 33px;
    background-image: url('@/assets/common/crossBlue.svg');
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>
