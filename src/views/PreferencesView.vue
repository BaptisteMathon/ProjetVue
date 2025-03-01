<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'

const favorites = ref<any[]>([])
const searchQuery = ref('')

const loadFavorites = () => {
  favorites.value = JSON.parse(localStorage.getItem('favorites') || '[]')
}

const removeFavorites = (link: string) => {
  favorites.value = favorites.value.filter(article => article.link !== link)
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

const filteredFavorites = computed(() => {
  if(searchQuery.value === ""){
    return favorites.value
  } 
  return favorites.value.filter(article =>
    article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )    
})

onMounted(loadFavorites)
</script>

<template>
  <div>
    <h1>News sauvegardées</h1>

    <input type="text" v-model="searchQuery" placeholder="Rechercher un article !">

    <!-- <ul v-if="favorites.length > 0"> -->      
      <!-- <li v-for="article in favorites" :key="article.link"> -->
      <ul v-if="filteredFavorites.length > 0">
        <li v-for="article in filteredFavorites" :key="article.link">
        <h3>{{ article.title }}</h3>
        <p v-if="article.image"><img :src="article.image" alt="Image de news sauvegardées"></p>
        <p>{{ article.description }}</p>
        <a :href="article.link" target="_blank">Lire l'article</a>
        <button @click="removeFavorites(article.link)">Supprimer</button>
      </li>
    </ul>

    <p v-else>Aucun article sauvegardées</p>
  </div>
</template>
