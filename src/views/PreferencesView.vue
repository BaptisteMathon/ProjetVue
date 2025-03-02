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

    <div class="search">
      <img src="https://icones.pro/wp-content/uploads/2021/06/icone-loupe-gris.png" alt="" width="25px" height="25px">
      <input type="text" v-model="searchQuery" placeholder="Rechercher un article !" class="search">
    </div>

    <!-- <ul v-if="favorites.length > 0"> -->
      <!-- <li v-for="article in favorites" :key="article.link"> -->
      <ul v-if="filteredFavorites.length > 0">
        <li v-for="article in filteredFavorites" :key="article.link">
        <h3>{{ article.title }}</h3>
        <p v-if="article.image" class="image"><img :src="article.image" alt="Image de news sauvegardées"></p>
        <p>{{ article.description }}</p>
        <div class="div-info">
          <a :href="article.link" target="_blank">Lire l'article</a>
          <button @click="removeFavorites(article.link)">Supprimer</button>
        </div>
      </li>
    </ul>

    <p v-else>Aucun article sauvegardées</p>
  </div>
</template>

<style>
  .search {
    margin-top: 25px;
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search img {
    margin-right: 10px;
  }

  .search input {
    width: 250px;
    padding: 5px;
    border-radius: 10px;
  }

  .image {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .div-info {
    display: flex;
    justify-content: center;
  }

  .div-info button {
    background: green;
    color: white;
    border: none;
    padding: 3px 10px;
    border-radius: 15px;
    cursor: pointer;
    transition: 0.3s ease;
    margin-left: 25px;
  }

  .div-info button:hover{
    background-color: greenyellow;
  }
</style>
