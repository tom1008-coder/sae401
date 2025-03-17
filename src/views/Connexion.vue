<template>
  <div>
    <h2>Connexion</h2>

    <input v-model="nom" type="text" placeholder="Nom">
    <input v-model="prenom" type="text" placeholder="Prénom">
    <input v-model="adresse_universitaire" type="email" placeholder="Adresse universitaire">
    <input v-model="password" type="password" placeholder="Mot de passe">

    <button @click="login">Se connecter</button>

    <p>Pas encore inscrit ? <router-link to="/register">Créer un compte</router-link></p>

    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
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
  async login() {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        nom: this.nom,
        prenom: this.prenom,
        adresse_universitaire: this.adresse_universitaire,
        password: this.password
      });

      localStorage.setItem('user', JSON.stringify(response.data.user));
      this.$router.push('/home'); // Redirection après connexion réussie

    } catch (error) {
      this.errorMessage = error.response?.data?.error || 'Connexion échouée';
    }
  }
}
};
</script>
