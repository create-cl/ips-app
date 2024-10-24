import VueRouter from 'vue-router';

import Navigation from "./components/Navigation";
import Login from "./components/pages/login/Login";
import NotFound from "./components/pages/NotFound";
import Users from "./components/pages/Users";
import Viewer from "./components/pages/Viewer";
import UploadIPS from "./components/pages/UploadIPS";
import SearchIPS from "./components/pages/SearchIPS.vue";
import HealthCheck from "./components/pages/HealthCheck.vue";
import PublicNavigation from "./components/PublicNavigation";
import VHL from './components/pages/VHL.vue';
import DVC from './components/pages/DVC.vue';

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/login',
      component: Login,
    },
    {
      path: '*',
      component: PublicNavigation,
      children: [
        {
          path: '/ips',
          redirect: '/ips/viewer'
        },
        {
          path: '/ips/viewer',
          component: UploadIPS,
        },
        {
          path: '/ips/find-ips',
          component: SearchIPS,
        },
        {
          path: '/ips/health-check',
          component: HealthCheck,
        },
        {
          path: 'vhl',
          component: VHL,
        },
        {
          path: 'dvc',
          component: DVC,
        },
        {
          path: '*',
          redirect: '/ips/viewer',
        }
      ]
    },
    {
      path: '/app/',
      component: Navigation,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'users',
          component: Users,
        },
        {
          path: 'viewer',
          component: Viewer,
        },
        {
          path: 'uploadIPS',
          component: UploadIPS,
        },
        {
          path: '*',
          component: NotFound,
        },

      ]
    },
  ]
});

export default router;
