// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    css: ['@/styles/index.scss'],
    runtimeConfig: {
        public: {
            apiBaseURL: process.env.API_DOMAIN_URL,
            HOST: process.env.HOST,
            apiServerBaseURL: 'http://apigateway:8080',
        },
        private: {},
    },
    modules: [
        // ['@nuxtjs/tailwindcss'],
        '@element-plus/nuxt',
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    // automatically imports `defineStore`
                    'defineStore', // import { defineStore } from 'pinia'
                    'storeToRefs', // import { storeToRefs } from 'pinia'
                    // automatically imports `defineStore` as `definePiniaStore`
                    // ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
                ],
            },
        ],
    ],
    elementPlus: {},
    nitro: {
        devProxy: {
            '/api': {
                target: 'http://localhost:9080',
                changeOrigin: true,
                prependPath: true,
            },
        },
    },
});
