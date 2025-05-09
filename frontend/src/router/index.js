import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/users/HomeView.vue';
import LoginView from '../views/commun/LoginView.vue';
import RegisterView from '../views/commun/RegisterView.vue';
import ActivitiesView from '../views/users/ActivitiesView.vue';
import InfoView from '../views/users/InfoView.vue';
import UserView from '../views/users/UserView.vue';
import ProfilView from '../views/users/ProfilView.vue';
import ParametresView from '../views/users/ParametresView.vue';
import LogoutView from '../views/commun/LogoutView.vue';
import FavorisView from '../views/users/FavorisView.vue';
import ActivitesDetenteView from '../views/users/ActivitesDetenteView.vue';
import CategoriesView from '../views/users/CategoriesView.vue';
import DetailsActivitesView from '../views/users/DetailsActivitesView.vue';
import ActivitiesManagementAdmin from '../views/admins/ActivitiesManagementAdmin.vue';
import InfosManagementAdmin from '../views/admins/InfosManagementAdmin.vue';
import UserManagementAdmin from '../views/admins/UserManagementAdmin.vue';
import ProfilAdmin from '../views/admins/ProfilAdmin.vue';
import DashboardAdmin from '@/views/admins/DashboardAdmin.vue';
import FaqsView from '@/views/commun/faqsView.vue';
import TermsView from '@/views/commun/TermsView.vue';
import LegalView from '@/views/commun/LegalView.vue';
import PrivacyView from '@/views/commun/PrivacyView.vue';
import EmotionTrackerView from '@/views/users/EmotionTracker.vue';

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
  },
  {
    path: '/faqsView',
    name: 'faqsView',
    component: FaqsView,
  },
  {
    path: '/termsView',
    name: 'TermsView',
    component: TermsView,
  },
  {
    path: '/legalView',
    name: 'LegalView',
    component: LegalView,
  },
  {
    path: '/privacyView',
    name: 'PrivacyView',
    component: PrivacyView,
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
  },
  {
    path: '/emotion-tracker',
    name: 'EmotionTrackerView',
    component: EmotionTrackerView,
  },
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
