<template>
    <div>
        <!-- <PreviousBtn text="返回專案" :path="`/project/${route.query?.p}`" /> -->
        <div v-if="showPage">
            <div class="cover">
                <h2 class="title">{{ project.title }}</h2>
                <img :src="cover.url" :alt="project.title + '封面圖片'" />
            </div>
            <!-- 捐款人資料 -->
            <div class="container">
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <p class="subtitle">捐款人資料</p>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18" class="form">
                        <el-form label-position="top" label-width="80px" :model="form" :rules="rules" ref="donorForm">
                            <!-- 捐款人姓名 -->
                            <el-form-item label="捐款人姓名" prop="name">
                                <el-input v-model="form.name" class="baseInput" />
                            </el-form-item>

                            <!-- 身分證字號／統一編號 -->
                            <el-form-item label="身分證字號／統一編號" prop="idNumber">
                                <p style="margin-top: 5px" class="comment">
                                    需要收據的個人戶請填寫 “身分證字號” / 公司戶請填寫
                                </p>
                                <p style="margin-bottom: 5px" class="comment">“統一編號” / 如不需要收據請填 “無”</p>
                                <el-input v-model="form.idNumber" class="baseInput" />
                            </el-form-item>

                            <!-- 手機號碼 -->
                            <el-form-item label="手機號碼" prop="phone">
                                <el-input v-model="form.phone" :max="10" class="baseInput" />
                            </el-form-item>

                            <!-- 聯絡地址 -->
                            <el-form-item label="聯絡地址" prop="address">
                                <p style="margin-top: 5px; margin-bottom: 5px" class="comment">
                                    需要紙本收據請“詳填地址”
                                </p>
                                <div
                                    style="
                                        position: relative;
                                        width: 100%;
                                        max-width: 310px;
                                        margin-bottom: 8px;
                                        box-sizing: border-box;
                                        display: flex;
                                    "
                                >
                                    <select
                                        v-model="form.city"
                                        placeholder="縣市"
                                        style="width: 150px; margin-right: 8px"
                                        :data-selected="form.city"
                                        @change="changeCity"
                                    >
                                        <option :value="-1" selected disabled hidden>縣市</option>
                                        <option
                                            v-for="(city, index) in counties"
                                            :key="index"
                                            :label="city"
                                            :value="index"
                                        >
                                            {{ city }}
                                        </option>
                                    </select>
                                    <select
                                        v-model="form.country"
                                        placeholder="行政區"
                                        style="width: 150px"
                                        :data-selected="form.country"
                                        :disabled="form.city === -1"
                                    >
                                        <option :value="-1" selected disabled hidden>行政區</option>
                                        <option
                                            v-for="(country, index) in districtOptions"
                                            :key="index"
                                            :label="country"
                                            :value="index"
                                        >
                                            {{ country }}
                                        </option>
                                    </select>
                                </div>

                                <el-input v-model="form.address" class="addressInput" />
                            </el-form-item>

                            <!-- 電子信箱 -->
                            <el-form-item label="電子信箱" prop="email">
                                <p style="margin-top: 5px; margin-bottom: 5px" class="comment">
                                    需要電子收據請“詳填電子信箱”
                                </p>
                                <el-input v-model="form.email" class="baseInput" />
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
            <Divider />
            <!-- 捐款資料 -->
            <div class="container" style="margin-top: 0px">
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <p class="subtitle">捐款資料</p>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18" class="form">
                        <el-form label-position="top" label-width="80px" :model="form" :rules="rules" ref="baseForm">
                            <!-- 捐款金額 -->
                            <el-form-item label="捐款金額" prop="amount">
                                <div class="amount">
                                    <el-input v-model="form.amount" type="number" style="max-width: 230px" />
                                    <span>NTD</span>
                                </div>
                            </el-form-item>
                            <!-- 捐款方式 -->
                            <el-form-item label="捐款方式" prop="donateMethod">
                                <select
                                    v-model="form.donateMethod"
                                    class="donateMethod baseInput"
                                    placeholder="請選擇捐款方式"
                                    :data-selected="form.donateMethod"
                                    @change="changeDonateMethod"
                                >
                                    <option :value="-1" selected disabled hidden>捐款方式</option>
                                    <option
                                        v-for="(donateMethod, index) in donateMethods"
                                        :key="index"
                                        :label="donateMethod.title"
                                        :value="donateMethod.title"
                                    >
                                        {{ donateMethod.title }}
                                    </option>
                                </select>
                            </el-form-item>
                            <!-- 捐款方式詳述 -->
                            <div class="donateMethodDetail" v-html="donateMethodDetail" />
                            <!-- 是否需要開立收據 -->
                            <el-form-item label="是否需要開立收據" prop="needReceipt">
                                <div class="baseInput receipt">
                                    <div
                                        class="btn"
                                        :class="{ selected: form.needReceipt }"
                                        @click="form.needReceipt = true"
                                    >
                                        是
                                    </div>
                                    <div
                                        class="btn"
                                        :class="{ selected: !form.needReceipt }"
                                        @click="form.needReceipt = false"
                                    >
                                        否
                                    </div>
                                </div>
                            </el-form-item>
                            <!-- 收據人姓名 -->
                            <el-form-item label="收據人姓名" prop="receiptName" v-if="form.needReceipt">
                                <el-input v-model="form.receiptName" class="baseInput" />
                            </el-form-item>
                            <el-form-item label="捐款日期" prop="date">
                                <input
                                    class="timePicker"
                                    v-model="form.date"
                                    type="date"
                                    label="捐款日期"
                                    placeholder="選擇捐款日期"
                                />
                            </el-form-item>
                            <!-- 匯款帳號後五碼 -->
                            <el-form-item label="匯款帳號後五碼" prop="note">
                                <div style="width: 100%">
                                    <p style="margin-top: 5px; margin-bottom: 5px" class="comment baseInput">
                                        如捐款方式為現金，請填“無” / 若是無摺存款請提供“匯款人名稱＋帳號”
                                    </p>
                                </div>
                                <el-input v-model="form.note" class="baseInput" />
                            </el-form-item>
                            <!-- 邀請人 -->
                            <el-form-item label="邀請人">
                                <el-input
                                    v-model="form.introducer"
                                    class="baseInput"
                                    placeholder="請填寫邀請您一起貢獻付出的人"
                                />
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
            <!-- 按鈕區 -->
            <el-row class="container" style="margin-top: 0px">
                <el-col :xs="0" :sm="0" :md="0" :lg="6" :xl="6"> </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                    <div class="btnArea">
                        <div class="btn cancel" @click="cancel()">取消</div>
                        <div class="btn confirm" @click="confirm()">確定</div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-else-if="loading" class="empty">讀取資料中...</div>
        <div v-else class="empty">
            <p>無此專案資料</p>
        </div>
    </div>
</template>

<script setup>
import Divider from '@/components/Divider';
import PreviousBtn from '@/components/PreviousBtn';
import { useProjectStore } from '@/stores/project';
import { useNotificationStore } from '@/stores/notification';
import { useMessageStore } from '@/stores/message';
import { counties, districts } from '@/data/address';
import { validatePhoneNumber } from '@/utils/validators';
import { useSettingsStore } from '@/stores/settings';

const settings = useSettingsStore();
const donorForm = ref(null);
const baseForm = ref(null);
const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();
const store = useProjectStore();
const notificationStore = useNotificationStore();
const messageStore = useMessageStore();
const { project, cover, showPage } = storeToRefs(store);
const loading = ref(true);
const liff = reactive({
    api: null,
});

const lineUserId = ref('');
const isClient = process.client;

const title = ref('');
const description = ref('');
const coverImage = ref('');

let form = reactive({
    name: '',
    date: '',
    amount: 0,
    donateMethod: -1,
    phone: '',
    note: '',
    introducer: '',
    needReceipt: true,
    receiptName: '',
    postalCode: '',
    country: -1,
    city: -1,
    address: '',
    idNumber: '',
    email: '',
});

const checkPhoneNumber = (rule, value, callback) => {
    validatePhoneNumber(value) && value.length === 10 ? callback() : callback(new Error('請輸入正確電話號碼'));
};

const checkAmount = (rule, value, callback) => {
    value > 0 ? callback() : callback(new Error('請輸入捐款金額必須大於 0'));
};

const checkDonateMethod = (rule, value, callback) => {
    typeof value !== 'number' && value !== -1 ? callback() : callback(new Error('請選擇捐款方式'));
};

const rules = reactive({
    name: [{ required: true, message: '請輸入捐款人姓名', trigger: 'blur' }],
    idNumber: [{ required: true, message: '請輸入資料', trigger: 'blur' }],
    phone: [{ validator: checkPhoneNumber, required: true, trigger: 'blur' }],
    address: [{ required: true, message: '請輸入地址', trigger: 'blur' }],
    email: [
        { required: true, message: '請輸入電子信箱', trigger: 'blur' },
        { type: 'email', message: '請輸入電子信箱格式', trigger: ['blur', 'change'] },
    ],
    amount: [{ validator: checkAmount, required: true, trigger: ['blur', 'change'] }],
    donateMethod: [{ validator: checkDonateMethod, required: true, trigger: ['blur', 'change'] }],
    needReceipt: [{ required: true, message: '請選擇是否需要開立收據', trigger: 'blur' }],
    receiptName: [{ required: true, message: '請輸入收據人姓名', trigger: 'blur' }],
    date: [{ required: true, message: '請選擇捐款日期', trigger: 'blur' }],
    note: [{ required: true, message: '請輸入資料', trigger: 'blur' }],
});

const districtOptions = computed(() => {
    if (form.city !== -1 && form.city != null) {
        const options = districts[form.city];

        return options.filter((option, index) => index === 0)[0];
    }

    return [[]];
});

const donateMethods = computed(() => {
    try {
        return project.value.donateWay;
    } catch (error) {
        return {
            title: '轉帳',
            desc: '',
        };
    }
});

const donateMethodDetail = computed(() => {
    try {
        const value = form.donateMethod;
        const date = donateMethods.value.find((item) => item.title === value);
        return date.desc;
    } catch (error) {
        return '<p>請選擇相關捐款方式，以顯示捐款說明</p>';
    }
});

function changeCity() {
    form.country = 0;
}

function cancel() {
    if (liff?.api?.closeWindow) {
        liff.api.closeWindow();
    } else {
        router.push({ path: `/project?p=${route.query?.p}` });
    }
}

async function confirm() {
    try {
        const checkDonorForm = await donorForm.value.validate((valid) => {
            return valid;
        });

        const checkBaseForm = await baseForm.value.validate((valid) => {
            return valid;
        });

        if (!checkDonorForm || !checkBaseForm) {
            notificationStore.addNotification({ type: 'error', message: '資料填寫錯誤', seconds: 5 });
            return false;
        }

        if (form.city === -1 || form.country === -1) {
            notificationStore.addNotification({ type: 'error', message: '請選擇聯絡地址', seconds: 5 });
            return false;
        }

        const city = counties[form.city] ? counties[form.city] : '';
        const country = districtOptions.value[form.country] ? districtOptions.value[form.country] : '';
        const postalCode = districts[form.city][1][form.country] ? districts[form.city][1][form.country] : '';
        const time = new Date(form.date).toISOString();

        // 組資料
        const formData = {
            name: form.name,
            date: time,
            amount: Number(form.amount),
            donateMethod: form.donateMethod,
            phone: form.phone,
            note: form.note,
            introducer: form.introducer,
            needReceipt: form.needReceipt,
            lineUserId: lineUserId?.value,
            receipts: [
                {
                    name: form.receiptName,
                    idNumber: form.idNumber,
                    amount: Number(form.amount),
                    email: form.email,
                    address: {
                        postalCode: postalCode,
                        country: country,
                        city: city,
                        address: form.address,
                    },
                },
            ],
        };

        const { data, error } = await useFetch(`${config.public.apiBaseURL}/v1/project/${route.query?.p}/donation`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${route.query?.t}`,
            },
            method: 'POST',
            body: formData,
        });

        if (error?.value) {
            if (liff?.api?.sendMessages) {
                await liff.api.sendMessages([
                    {
                        type: 'text',
                        text: `${error.value}`,
                    },
                ]);

                liff.api.closeWindow();
            } else {
                notificationStore.addNotification({ type: 'error', message: '填寫資料失敗，請重新操作', seconds: 5 });

                cancel();
            }
        }

        if (data?.value) {
            if (liff?.api?.sendMessages) {
                await liff.api.sendMessages([
                    {
                        type: 'text',
                        text: `${data?.value?.message}`,
                    },
                ]);

                liff.api.closeWindow();
            } else {
                notificationStore.addNotification({ type: 'success', message: `${data?.value?.message}`, seconds: 5 });

                cancel();
            }
        }
    } catch (error) {
        console.log('API 錯誤', error);

        if (liff?.api?.sendMessages) {
            await liff.api.sendMessages([
                {
                    type: 'text',
                    text: `${'填寫資料失敗，請重新操作'}`,
                },
            ]);

            liff.api.closeWindow();
        } else {
            notificationStore.addNotification({ type: 'error', message: '填寫資料失敗，請重新操作', seconds: 5 });
            cancel();
        }
    }
}

function changeDonateMethod() {
    console.log('changeDonateMethod');
}

async function fetchData() {
    try {
        loading.value = true;
        settings.changeLoading(true);
        await store.getProject(route.query?.p, route.query?.t);
        title.value = project.value.title;
        description.value = project?.value?.taxonomy + project?.value?.summary;
        coverImage.value = project.value?.marquees[0]?.url ? project.value?.marquees[0]?.url : '';
    } catch (error) {
        console.log('fetchData error', error);
    } finally {
        settings.changeLoading(false);
        loading.value = false;
    }
}

let lineProfile = reactive({
    result: null,
});

// set the page SEO data to the <meta> tags
useHead({
    title: title,
    description: description,
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'title', property: 'title', name: 'title', content: title },
        { hid: 'description', property: 'description', name: 'description', content: description },
        { hid: 'og:title', property: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', property: 'og:description', name: 'og:description', content: description },
        { hid: 'og:image', property: 'og:image', name: 'og:image', content: coverImage },
        { hid: 'og:type', property: 'og:type', name: 'og:type', content: 'website' },
        { hid: 'twitter:card', property: 'twitter:card', name: 'twitter:card', content: coverImage },
        { hid: 'twitter:title', property: 'twitter:title', name: 'twitter:title', content: title },
        {
            hid: 'twitter:description',
            property: 'twitter:description',
            name: 'twitter:description',
            content: description,
        },
        { hid: 'twitter:image', property: 'twitter:image', name: 'twitter:image', content: coverImage },
    ],
});

onMounted(async () => {
    if (isClient) {
        const script = document.createElement('script');
        script.src = 'https://static.line-scdn.net/liff/edge/2/sdk.js';
        script.async = true;
        script.defer = true;
        script.onload = async () => {
            await window.liff.init({ liffId: config.public.LIFF_ID });
            liff.api = window.liff;
            lineProfile.result = await liff.api.getProfile();
            lineUserId.value = lineProfile?.result?.userId ? lineProfile.result.userId : '';
        };
        document.head.appendChild(script);
    }
});

if (process.server) {
    fetchData();
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.empty {
    height: calc(100vh - 56px);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
}

.baseInput {
    max-width: 310px;
}

.addressInput {
    max-width: 450px;
}

.amount {
    display: flex;
    align-items: center;

    span {
        display: inline-block;
        margin-left: 8px;
        font-size: 16px;
        color: $baseFont-gray;
    }
}

.donateMethod {
    background-position-x: 96%;
}

.donateMethodDetail {
    background-color: #fff;
    border: 1px solid #7e7e7e;
    padding: 18px 11px;
    border-radius: 4px;
    margin-bottom: 18px;
}

.receipt {
    width: 100%;
    display: flex;
    align-items: center;

    :nth-child(1) {
        margin-right: 5px;
    }

    :nth-last-child(1) {
        margin-left: 5px;
    }

    .btn {
        cursor: pointer;
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        transition: 0.3s;
        color: $baseFont-gray;
        border: 1px solid #7e7e7e;
        border-radius: 4px;
        background-color: $menuBg;

        &:hover {
            border: 1px solid $primary;
            background-color: $primary;
            color: $menuBg;
        }

        &.selected {
            border: 1px solid $primary;
            background-color: $primary;
            color: $menuBg;
        }
    }
}

.container {
    max-width: 785px;
    margin: 0 auto;
    margin-top: 25px;
}

.cover {
    position: relative;
    width: 100%;
    overflow: hidden;
    max-height: 200px;
    margin-bottom: 24px;
    max-width: 785px;
    margin: 0 auto;
    margin-top: 25px;

    @media (max-width: 1200px) {
        max-width: none;
        width: calc(100% + 49px + 49px);
        transform: translateX(-49px);
        margin-top: 0px;
    }

    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 100%;
        height: 100%;
        font-size: 24px;
        font-weight: bold;
        background-color: rgba(0, 0, 0, 0.3);
        color: $basePrimary;
        padding: 20px;

        @media (max-width: 475px) {
            padding: 20px 40px;
        }
    }

    img {
        width: 100%;
        max-height: 200px;
        object-fit: cover;
        object-position: center center;
    }
}

.subtitle {
    position: relative;
    width: 100%;
    display: inline-block;
    font-size: 16px;
    padding-left: 22px;
    padding-top: 11px;
    box-sizing: border-box;
    color: $baseFont;
    margin: 0;
    height: 40px;
    margin-bottom: 15px;

    &:before {
        content: '';
        position: absolute;
        display: inline-block;
        width: 7px;
        height: 40px;
        background-color: $primary;
        left: 0;
        top: 0;
    }
}

.form {
    background-color: $baseBgc;
    border-radius: 4px;
    padding: 32px 24px;

    .comment {
        width: 100%;
        font-size: 12px;
        margin: 0;
        color: $primary;
        line-height: 1.4;
    }
}

.btnArea {
    margin-top: 24px;
    max-width: 300px;
    margin: 24px auto 0 0;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 996px) {
        margin: 0 auto;
        margin-top: 24px;
    }

    .btn {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        transition: 0.3s;
        height: 40px;
        width: 100%;
        font-weight: bold;
        border-radius: 4px;

        &.cancel {
            max-width: 70px;
            background-color: $menuBg;
            border: 2px solid $primary;
            color: $primary;
            margin-right: 10px;

            &:hover {
                background-color: $primary;
                color: $menuBg;
            }

            &.selected {
                background-color: $primary;
                color: $menuBg;
            }
        }

        &.confirm {
            background-color: $primary;
            color: $menuBg;
            max-width: 220px;

            &:hover {
                border: 2px solid $primary;
                background-color: $menuBg;
                color: $primary;
            }

            &.selected {
                border: 2px solid $primary;
                background-color: $menuBg;
                color: $primary;
            }
        }
    }
}

.timePicker {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #7e7e7e;
    max-width: 310px;
}
</style>
