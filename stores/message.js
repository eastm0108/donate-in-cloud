export const useMessageStore = defineStore('message', () => {
    const messages = reactive([]);

    function addMessage({ text, type = 'info', seconds = 3 }) {
        messages.push({
            text,
            type,
            seconds,
        });

        if (seconds !== 0) {
            setTimeout(() => removeMessage(0), seconds * 1000);
        }
    }

    function removeMessage(index) {
        messages.splice(index, 1);
    }

    return { messages, addMessage, removeMessage };
});
