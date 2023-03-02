<template>
    <div class="navbar">
        <Logo />
        <!-- dashboard 樣式 -->
        <div class="dashBoardNavbar"></div>
    </div>
</template>

<script setup>
import Logo from './Logo.vue';

const logout = async () => {};
</script>

<style lang="scss" scoped>
@import '../../styles/element-variables.scss';
@import '../../styles/variables.scss';

.navbar {
    height: 56px;
    position: relative;
    background: $menuBg;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $--color-primary;
    padding: 0 48px;

    // 首頁樣式
    &.dashBoardNavbar {
        position: relative;
        height: 133px;
    }

    .dashBoardNavbar {
        display: flex;
        justify-content: center;
        align-items: center;

        &__prevStep {
            cursor: pointer;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            left: 63px;
            top: 50%;
            transform: translateY(-50%);
            height: 22px;

            &:hover {
                p {
                    color: darken($--color-primary, 20%);
                    border-bottom: 1px solid darken($--color-primary, 20%);
                }
            }

            p {
                transition: 0.333;
                display: inline-block;
                margin: 0;
                margin-top: 5px;
                margin-left: 8px;
                line-height: 1;
                color: $--color-primary;
                border-bottom: 1px solid $--color-primary;
                padding-bottom: 1px;
            }
        }

        .titleArea {
            height: 100%;
            padding-top: 42px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            h1 {
                margin: 0;
                margin-bottom: 4px;
                color: $baseFont;
            }

            p {
                margin: 0;
                color: $baseFont-secondary-gray;
            }
        }

        .dashBoardNavbarImg {
            position: absolute;
            object-fit: contain;
            z-index: 1;

            @media (max-width: 1440px) {
                display: none;
            }

            &--1 {
                top: 0;
                right: 0;
                width: 130px;
                height: 277px;
            }
        }
    }

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }

    .right-menu {
        position: relative;
        float: right;
        line-height: 98px;
        margin-right: 22px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            border: 1px solid $--color-primary;
            background-color: $menuBg;
            border-radius: 20px;
            margin-right: 30px;

            .avatar-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                position: relative;
                margin: 3px 0;

                p {
                    line-height: 1.2;
                    display: inline-block;
                    margin: 0;
                    font-size: 16px;
                    margin-top: 5px;
                    margin-left: 8px;
                    font-weight: bold;
                }

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }

    .userIcon {
        margin-left: 5px;
        display: inline-block;
        width: 16px;
        height: 16px;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url('../../assets/common/userIcon.svg');
    }
}
</style>
