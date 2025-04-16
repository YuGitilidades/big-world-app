import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import SmallWorld from '../views/SmallWorld.vue';
import SeventhTachyon from '../views/SeventhTachyon.vue';
import MetalTronus from '../views/MetalTronus.vue';
import YgoProb from '../views/YgoProb.vue';
import DatabaseYugi from '../views/DatabaseYugi.vue';

const routes = [
  {
    path: '/',
    alias:'/home-page',
    name: 'HomePage',
    component: HomePage // Default route
  },
  {
    path: '/small-world',
    name: 'SmallWorld',
    component: SmallWorld // Small World route
  },
  {
    path: '/seventh-tachyon',
    name: 'SeventhTachyon',
    component: SeventhTachyon // Seventh Tachyon route
  },
  {
    path: '/metal-tronus',
    name: 'MetalTronus',
    component: MetalTronus // Metal Tronus route
  },
  {
    path: '/ygo-prob',
    name: 'YgoProb',
    component: YgoProb // YGO Probability route
  },
  {
    path: '/database-yugi',
    name: 'DatabaseYugi',
    component: DatabaseYugi // Database Yugi route
  }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(/*to, from, savedPosition*/) {
      // Sempre rola para o topo ao trocar de rota
      return { top: 0 };
    }
  });

export default router;