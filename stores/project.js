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
            const apiServerBaseURL = config.public.HOST ? config.public.HOST : config.public.apiServerBaseURL;
            const host = typeof window !== 'undefined' ? `${window.location.origin}/api` : apiServerBaseURL;
            const api = config.public.apiBaseURL === '' ? host : config.public.apiBaseURL;

            const { data, pending, error, refresh } = await useFetch(`${api}/v1/project/${projectId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

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

    async function donate(projectId, token, formData) {
        try {
            const apiServerBaseURL = config.public.HOST ? config.public.HOST : config.public.apiServerBaseURL;
            const host = typeof window !== 'undefined' ? `${window.location.origin}/api` : apiServerBaseURL;

            const { data, error } = await useFetch(`${host}/v1/project/${projectId}/donation`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
                body: formData,
            });

            return {
                data: {
                    value: { message: data?.value?.message },
                },
                error: {
                    value: error?.value?.data?.message,
                },
            };
        } catch (error) {
            console.log('donate error', error);
            return { data: null, error: { value: error } };
        }
    }

    return { project, cover, getProject, showPage, donate };
});
