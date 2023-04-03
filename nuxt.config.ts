// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['@/styles/index.scss'],
    runtimeConfig: {
        public: {
            apiBaseURL: process.env.NODE_ENV === 'production' ? 'http://apigateway:8080' : '/api',
            apiServerBaseURL: 'http://apigateway:8080',
            LIFF_ID: process.env.LIFF_ID,
        },
        private: {},
    },
    modules: [
        // ['@nuxtjs/tailwindcss'],
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
