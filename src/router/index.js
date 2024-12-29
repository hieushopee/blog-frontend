import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import DetailPage from '../views/DetailPage.vue';
import CreatePage from '../views/CreatePage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/detail/:id', name: 'Detail', component: DetailPage },
  { path: '/create', name: 'Create', component: CreatePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
