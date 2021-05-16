export const axios = require('axios').create({
    baseURL: process.env.VUE_APP_API_URL ?? 'http://e28api.hesweb.loc:8080',
    responseType: 'json',
    withCredentials: true
})