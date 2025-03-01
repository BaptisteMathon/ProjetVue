import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddFeedView from '../views/AddFeedView.vue'
import FeedNewsView from '../views/FeedNewsView.vue'
import PreferencesView from '../views/PreferencesView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/add-feed',
      name: 'AddFeed',
      component: AddFeedView,
    },
    {
      path: '/feed/:id',
      name: 'FeedNews',
      component: FeedNewsView,
      props: true,
    },
    {
      path: '/preferences',
      name: 'Preferences',
      component: PreferencesView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
    }
  ],
})

export default router
