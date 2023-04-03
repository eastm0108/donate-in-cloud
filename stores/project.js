export const useProjectStore = defineStore('project', () => {
    const config = useRuntimeConfig();

    let project = ref({
        taxonomy: '',
        title: '',
        summary: '',
        remainingDays: 1,
        dateRange: { start: '', end: '' },
        kpi: {
            name: '捐款目標',
            value: 100,
            unit: '萬',
        },
        marquees: [],
        desc: [],
        members: [''],
        donateWay: [
            {
                title: '轉帳',
                desc: '銀行帳戶',
            },
        ],
        // static 是保留字，所以改成 statistics
        statistics: {
            countDonation: 100,
            sumDonation: 200000,
            countVerified: 90,
            sumVerified: 150000,
        },
        // 廣告圖片
        ads: [
            {
                url: 'https://www.kickads.co/wp-content/uploads/2019/07/your-google-text-ads-headline-01.jpg',
                name: '廣告名稱 1',
            },
        ],
    });

    const showPage = computed(() => (project.value?.title ? true : false));

    const cover = computed(() => {
        try {
            return project.value?.marquees[0] ? project.value?.marquees[0] : { key: '', url: '', desc: '' };
        } catch (error) {
            return { key: '', url: '', desc: '' };
        }
    });

    async function getProject(projectId, token) {
        try {
            project.value = {};

            const { data, pending, error, refresh } = await useFetch(
                `${config.public.apiServerBaseURL}/v1/project/${projectId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.error('取得專案錯誤', error.value);

            if (error?.value) {
                const { status, title } = error?.value?.data;
                const message = title === 'invalid project id' ? '無此專案資料' : title;

                console.error('取得專案錯誤', `status：${status}`, `message：${message}`);
                return false;
            }

            const { value: fetchData } = data;
            project.value = fetchData;
            return true;
        } catch (error) {
            const { status, title } = error?.value?.data;
            const message = title === 'invalid project id' ? '無此專案資料' : title;

            console.error('取得專案錯誤', `status：${error}`, `message：${message}`);
            return false;
        }
    }

    return { project, cover, getProject, showPage };
});
