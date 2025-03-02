import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ActivitiesView from '../views/ActivitiesView.vue';
import InfoView from '../views/InfoView.vue';
import UserView from '../views/UserView.vue';
import ProfilView from '../views/ProfilView.vue';
import ParametresView from '../views/ParametresView.vue';
import LogoutView from '../views/LogoutView.vue';
import FavorisView from '../views/FavorisView.vue';
import ActivitesDetenteView from '../views/ActivitesDetenteView.vue';
import CategoriesView from '../views/CategoriesView.vue';
import DetailsActivitesView from '../views/DetailsActivitesView.vue';
import ActivitiesManagementAdmin from '../views/ActivitiesManagementAdmin.vue';
import InfosManagementAdmin from '../views/InfosManagementAdmin.vue';
import UserManagementAdmin from '../views/UserManagementAdmin.vue';
import ProfilAdmin from '@/views/ProfilAdmin.vue';
import DashboardAdmin from '@/views/DashboardAdmin.vue';

const routes = [
  {
    path: '/ActivitiesManagementAdmin',
    name: 'ActivitiesManagementAdmin',
    component: ActivitiesManagementAdmin
  },
  {
    path: '/InfosManagementAdmin',
    name: 'InfosManagementAdmin',
    component: InfosManagementAdmin
  },
  {
    path: '/DashboardAdmin',
    name: 'DashboardAdmin',
    component: DashboardAdmin
  }, {
    path: '/UserManagementAdmin',
    name: 'UserManagementAdmin',
    component: UserManagementAdmin
  },
  {
    path: '/ProfilAdmin',
    name: 'ProfilAdmin',
    component: ProfilAdmin
  },
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
    name: 'ActivitiesView',
    component: ActivitiesView,
  },
  {
    path: '/categorie',
    name: 'CategoriesView',
    component: CategoriesView
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
  },
  {
    path: '/profil',
    name: 'Profil',
    component: ProfilView,
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
    path: '/favoris',
    name: 'FavorisView',
    component: FavorisView,
    meta: { requiresAuth: true }
  },
  {
    path: '/activites/:id/:category',
    name: 'ActivitesDetenteView',
    component: ActivitesDetenteView
  },
  {
    path: '/details-activites/:id',
    name: 'DetailsActivitesView',
    component: DetailsActivitesView
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
