// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['@/styles/index.scss'],
    runtimeConfig: {
        public: {
            apiBaseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:9080' : '/api',
            // 之後使用 login 取得
            token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJlZWhpdmUiLCJ0eXAiOiJKV1QifQ.eyJhY2MiOiJndWVzdCIsImlhdCI6MTY3Mzg0ODY3MiwiaXNzIjoibG9jYWxob3N0OjkwODAiLCJuYW0iOiJndWVzdCIsInBlciI6Imd1ZXN0Iiwic3ViIjoiNjNiMGRmN2E3YzU4ODRlN2ZjZDZmMjVkIiwidGFyIjoib3JnIn0.UT0Sf4C2YyyXrEu4xLOu1sy7Iz0AGQVUWxhiFpTVw9-915M22Ff-wEcSzvXK-mflWLhVfDWNtFaGo02_qyiirdZpY_SfIYbajwBqRjeGnSvqDk9gnMjpOMiOxtjQ-39bmXuofL3UBxLsIu19CrVIbX6oHkTuT4Vhe78fQfvDj4Vxc1rYA1e-HXZ9glL8Z6tkZwT4fPTM3X1s0iSgAvOh6N4PvcPhaHsWViV4c3-rhtu6juGOBTMp17rwSsdNr4HHLn2p6HWJT7GIxpPaMTQlANduuVJYpeNeBAJ6iI63RcgaEmFTO9C9rcj7grIxahzSlaS9nphi7y2pu_79IEKdgw',
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
