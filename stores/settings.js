export const useSettingsStore = defineStore('settings', () => {
    const fixedHeader = ref(false);
    const loading = ref(false);

    /** 改變固定 Header 樣式
     * @param {*} boolean show / hide
     */
    function changeFixedHeader(boolean) {
        fixedHeader.value = boolean;
    }

    /** 改變 Loading 狀態
     * @param {*} boolean show / hide
     */
    function changeLoading(boolean) {
        loading.value = boolean;
    }

    return { loading, changeLoading, fixedHeader, changeFixedHeader };
});
