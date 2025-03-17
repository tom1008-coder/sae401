<template>
  <div>
    <h2>Inscription</h2>

    <input v-model="nom" placeholder="Nom">
    <input v-model="prenom" placeholder="Prénom">
    <input v-model="adresse_universitaire" type="email" placeholder="Adresse universitaire">
    <input v-model="password" type="password" placeholder="Mot de passe">

    <button @click="register">S'inscrire</button>

    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>

    <p>Déjà un compte ? <router-link to="/connexion">Se connecter</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nom: '',
      prenom: '',
      adresse_universitaire: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:5000/register', {
          nom: this.nom,
          prenom: this.prenom,
          adresse_universitaire: this.adresse_universitaire,
          password: this.password
        });

        alert('Inscription réussie ! Connectez-vous.');
        this.$router.push('/connexion'); // Redirige vers la connexion

      } catch (error) {
        this.errorMessage = error.response?.data?.error || 'Erreur lors de l’inscription';
      }
    }
  }
};
</script>
