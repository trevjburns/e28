import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/components/pages/HomePage.vue'
import DeckPage from '@/components/pages/DeckPage.vue'
import AddCardPage from '@/components/pages/AddCardPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/deck/:name', component: DeckPage, props: true },
    { path: '/deck/add', component: AddCardPage }
  ],
})

createApp(App).use(router).mount('#app')
