import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ActivitiesView from '../views/ActivitiesView.vue';
import InfoView from '../views/InfoView.vue';
import UserView from '../views/UserView.vue';
import ProfilView from '../views/ProfilView.vue';
import ProgressionView from '../views/ProgressionView.vue';
import ParametresView from '../views/ParametresView.vue';
import LogoutView from '../views/LogoutView.vue';
import FavoritesView from '../views/FavoritesView.vue';
import DetenteActivitiesView from '../views/DetenteActivitiesView.vue';

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: RegisterView
  },
  {
    path: '/activities',
    name: 'Activities',
    component: ActivitiesView,
  },
  {
    path: '/info',
    name: 'Info',
    component: InfoView,
  },
  {
    path: '/users',
    name: 'Users',
    component: UserView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profil',
    name: 'Profil',
    component: ProfilView,
    meta: { requiresAuth: true }
  },
  {
    path: '/progression',
    name: 'Progression',
    component: ProgressionView,
    meta: { requiresAuth: true }
  },
  {
    path: '/parametres',
    name: 'Parametres',
    component: ParametresView,
    meta: { requiresAuth: true }
  },
  {
    path: '/deconnexion',
    name: 'Deconnexion',
    component: LogoutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: FavoritesView,
    meta: { requiresAuth: true }
  },
  {
    path: '/detente-activities',
    name: 'DetenteActivities',
    component: DetenteActivitiesView,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem('token');

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
