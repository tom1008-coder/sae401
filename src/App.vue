<template>
  <div>
    <h1>Bienvenue sur mon site</h1>

    <!-- Barre de navigation -->
    <nav>
      <router-link to="/register">S'inscrire</router-link>
      <router-link to="/connexion">Se connecter</router-link>
    </nav>

    <!-- Message de chargement -->
    <p v-if="loading">Chargement des utilisateurs...</p>

    <!-- Message d'erreur -->
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>

   

    <!-- Affichage des composants selon la route -->
    <router-view />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      loading: true,
      errorMessage: ''
    };
  },
  async created() {
    await this.loadUsers();
  },
  methods: {
    async loadUsers() {
      try {
        const response = await axios.get('http://localhost:5000/users');
        this.users = response.data;
      } catch (error) {
        this.errorMessage = 'Erreur de chargement des utilisateurs';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async deleteUser(id) {
      try {
        await axios.delete(`http://localhost:5000/users/${id}`);
        this.users = this.users.filter(user => user.id !== id); // Mise à jour locale
      } catch (error) {
        this.errorMessage = 'Erreur lors de la suppression';
        console.error(error);
      }
    }
  }
};
</script>

<style>
nav {
  margin-bottom: 20px;
}
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: blue;
}
nav a:hover {
  text-decoration: underline;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: darkred;
}
</style>
