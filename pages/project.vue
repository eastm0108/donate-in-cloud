<template>
    <div>
        <div class="project" v-if="showPage">
            <!-- 上半部資訊 -->
            <el-row :gutter="17" class="projectTopArea">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <!-- 照片區 -->
                    <div class="imgArea">
                        <!-- 跑馬燈 -->
                        <el-carousel
                            ref="carouselImgRef"
                            style="margin-bottom: 8px"
                            height="250px"
                            indicator-position="none"
                        >
                            <el-carousel-item v-for="(item, index) in project.marquees" :key="index" name="index">
                                <img :src="item.url" class="image" />
                            </el-carousel-item>
                        </el-carousel>
                        <!-- 圖片區 -->
                        <el-scrollbar :noresize="true" class="pictures" wrap-style="height: 84px;">
                            <li
                                v-for="(item, index) in project.marquees"
                                :key="item.url + index"
                                class="picture"
                                :style="{ backgroundImage: `url(${item.url})` }"
                                @click="clickPicture(index)"
                            />
                        </el-scrollbar>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <!-- 資訊區 -->
                    <div class="infoArea">
                        <h3 class="taxonomy">{{ project.taxonomy }}</h3>
                        <h2 class="projectTitle">{{ project.title }}</h2>
                        <p class="summary">{{ project.summary }}</p>
                        <div class="fundraisingArea">
                            <p class="fundraisingPeriod">募款期限：只剩 <span class="remainingDays">30</span> 天</p>
                            <el-button type="primary" class="primaryBtn donateBtn" @click="gotoDonatePage">
                                支持專案
                            </el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div style="position: relative">
                <!-- 詳細介紹區 -->
                <el-tabs v-model="tabName" class="detail">
                    <el-tab-pane v-for="projectTab in project.desc" :label="projectTab.tab" :name="projectTab.tab">
                        {{ outDetail(projectTab.tab) }}
                    </el-tab-pane>
                </el-tabs>

                <!-- 手機版選單 -->
                <div class="mobileTabSelect">
                    <p @click="mobileTabMenu = !mobileTabMenu">
                        {{ tabName }}
                    </p>
                    <span class="arrowIcon" :class="{ rotate: mobileTabMenu }" />
                    <ul v-show="mobileTabMenu" id="submenu">
                        <li v-for="projectTab in project.desc" @click="clickMenu(projectTab.tab)">
                            {{ projectTab.tab }}
                        </li>
                    </ul>
                </div>
                <p class="mobileTabContent">{{ outDetail(tabName) }}</p>
            </div>
        </div>
        <div v-else-if="loading" class="project--empty">
            <p>讀取資料中...</p>
        </div>
        <div v-else class="project--empty">
            <p>無此專案資料</p>
        </div>
    </div>
</template>

<script setup>
import { useProjectStore } from '@/stores/project';
import { useSettingsStore } from '@/stores/settings';

const settings = useSettingsStore();
const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();
const store = useProjectStore();
const { project, showPage } = storeToRefs(store);
const carouselImgRef = ref(null);
const tabName = ref('專案說明');
const mobileTabMenu = ref(false);
const loading = ref(true);

function clickPicture(index) {
    carouselImgRef.value.setActiveItem(index);
}

function outDetail(type) {
    const target = this.project.desc.filter((item) => item.tab === type);

    return target.length > 0 ? target[0].content : '';
}

function gotoDonatePage() {
    router.push({ path: `/donate${route.query?.p}` });
}

async function fetchData() {
    try {
        loading.value = true;
        settings.changeLoading(true);
        await store.getProject(route?.query?.p);
    } catch (error) {
        console.log('fetchData error', error);
    } finally {
        settings.changeLoading(false);
        loading.value = false;
    }
}

function clickMenu(menuName) {
    this.mobileTabMenu = false;
    this.tabName = menuName;
}

// onMounted(async () => {
//     fetchData();
// });

if (process.server) {
    fetchData();
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.project {
    margin-top: 20px;

    @media (max-width: 992px) {
        margin-top: 0px;
    }

    &--empty {
        height: calc(100vh - 56px);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
    }
}

.projectTopArea {
    margin-bottom: 24px;

    @media (max-width: 475px) {
        margin-bottom: 10px;
    }
}
.imgArea {
    box-sizing: border-box;
    height: 350px;
    @media (max-width: 992px) {
        width: calc(100% + 49px + 49px);
        transform: translateX(-48px);
        height: 280px;
    }

    .image {
        width: 100%;
        object-fit: contain;
    }

    .pictures {
        overflow: hidden;
        width: 100%;
        list-style: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        white-space: nowrap;
        max-height: 80px;

        @media (max-width: 992px) {
            display: none;
        }
    }

    .picture {
        display: inline-block;
        height: 61px;
        width: 109px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        margin-right: 16px;

        &:nth-last-child(1) {
            margin-right: 0;
        }
    }
}

.infoArea {
    .taxonomy {
        margin: 0;
        color: $baseFont;
        font-size: 16px;
        margin-bottom: 19px;
    }

    .projectTitle {
        margin: 0;
        margin-bottom: 22px;
        font-size: 24px;
        color: $primary;
    }

    .summary {
        margin: 0;
        color: $baseFont;
        font-size: 16px;
        min-height: 100px;
        margin-bottom: 28px;
    }

    .donateBtn {
        margin: 0;
        margin-top: 10px;

        @media (max-width: 475px) {
            width: 100%;
        }
    }

    .donateDetailBtn {
        margin: 0;
    }

    .fundraisingArea {
        display: flex;
        width: 100%;
        align-items: flex-end;
        flex-wrap: wrap;
        margin-bottom: 20px;
    }

    .fundraisingPeriod {
        font-size: 24px;
        margin-right: 58px;
    }

    .remainingDays {
        font-size: 32px;
        font-weight: 700;
        color: $primary;
        margin: 0 8px;
    }
}

.detail {
    @media (max-width: 475px) {
        display: none;
    }
    .el-tabs__item {
        width: 184px;
        text-align: center;
        font-size: 16px;
    }

    .el-tabs__active-bar {
        height: 8px;
    }

    .el-tabs__content {
        display: inline-block;
        background-color: $menuBg;
        padding: 16px 18px;
        border-radius: 4px;
        margin-right: 17px;
        min-height: 330px;
    }
}

.arrowIcon {
    position: absolute;
    width: 16px;
    height: 11px;
    top: 16px;
    right: 20px;
    -webkit-transition: all 0.25s ease;
    -moz-transition: all 0.25s ease;
    -ms-transition: all 0.25s ease;
    -o-transition: all 0.25s ease;
    transition: all 0.25s ease;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('@/assets/common/arrowicon.svg');

    &.rotate {
        transform: rotate(180deg);
    }
}
.mobileTabSelect {
    display: none;

    @media (max-width: 475px) {
        display: block;
    }

    p {
        cursor: pointer;
        background: $primary;
        color: #ffffff;
        display: block;
        font-size: 16px;
        padding: 12px 25px;
        font-weight: bold;
        text-align: center;
    }
}

#submenu {
    left: 0;
    position: absolute;
    z-index: 1;
    width: 100%;
}

#submenu li {
    cursor: pointer;
    text-align: center;
    width: 100%;
    background: #ffffff;
    border: 2px solid $primary;
    border-top: none;
    font-size: 16px;
    padding: 12px 25px;
    color: $baseFont;

    &:hover {
        background: $primary;
        color: #ffffff;
    }
    &:active {
        background: $primary;
        color: #ffffff;
    }
}

.mobileTabContent {
    display: none;
    margin-top: 18px;
    margin-bottom: 20px;
    width: 100%;
    background-color: $baseBgc;
    padding: 16px 18px;
    border-radius: 4px;
    min-height: 330px;

    @media (max-width: 475px) {
        display: inline-block;
    }
}
</style>
