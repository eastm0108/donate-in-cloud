export const useNotificationStore = defineStore('notification', () => {
    const notifications = reactive([]);
    const position = ref('bottom');

    const addNotification = ({ message, type = 'success', seconds = 3 }) => {
        notifications.push({
            message,
            type,
            seconds,
        });

        if (seconds !== 0) {
            setTimeout(() => removeNotification(0), seconds * 1000);
        }
    };

    const removeNotification = (index) => {
        notifications.splice(index, 1);
    };

    const changePosition = (position) => {
        position = position;
    };

    return { notifications, addNotification, removeNotification, position };
});
