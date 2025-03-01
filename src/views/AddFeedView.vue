<script setup lang="ts">
import {ref} from 'vue'

const title = ref('')
const url = ref('')
const errorMessage = ref('')
let doublon = false

const addFeed = () => {
  errorMessage.value =  ''
  doublon = false

  if(!title.value || !url.value){
    errorMessage.value = 'Tous les champs doivent être remplis'
    return
  }

  const allFeeds = JSON.parse(localStorage.getItem('feeds') || '[]')
  allFeeds.forEach((element: { title: string, url: string })=> {
    if(element.title === title.value){
      errorMessage.value = 'Titre du flux déjà existant'
      doublon = true
    } else if(element.url === url.value){
      errorMessage.value = 'URL du flux déjà existant'
      doublon = true
    }
  });
  if (doublon){
    return
  }
  console.log(allFeeds)

  allFeeds.push({id: Date.now(), title: title.value, url: url.value})
  localStorage.setItem('feeds', JSON.stringify(allFeeds))

  errorMessage.value = "Flux ajouté"
}
</script>

<template>
  <div>
    <h1>Ajouter un flux RSS</h1>

    <form @submit.prevent="addFeed">
      <div>
        <label for="title">Nom du flux :</label>
        <input type="text" id="title" v-model="title">
      </div>

      <div>
        <label for="url">URL du flux : </label>
        <input type="text" id="url" v-model="url">
      </div>

      <button type="submit">Enregistrer</button>

      <p v-if="errorMessage">{{ errorMessage }}</p>
    </form>

  </div>
</template>
