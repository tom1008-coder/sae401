import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/Register.vue';
import ConnexionView from '../views/Connexion.vue';
import AdminView from '../views/AdminView.vue'; // Importer la page Admin

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/connexion',
      name: 'connexion',
      component: ConnexionView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true } // ✅ Protège la page d'accueil
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/admin', // Route pour la page Admin
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true } // Protège la page Admin
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    }
  ],
});

// ✅ Vérifie si l'utilisateur est connecté avant d'accéder aux pages protégées
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user'); // Vérifie si un utilisateur est stocké
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/connexion'); // Redirige vers la connexion si non connecté
  } else {
    next();
  }
});

export default router;
