<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'

const feeds = ref<{id: number, title: string, url: string}[]>([])
const router = useRouter()

const loadFeeds = () => {
  feeds.value = JSON.parse(localStorage.getItem('feeds') || '[]')
}

const deleteFeed = (id: number) => {
  feeds.value = feeds.value.filter(feed => feed.id !== id)
  localStorage.setItem('feeds', JSON.stringify(feeds.value))

  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  console.log(favorites)
  console.log(id)  
  favorites = favorites.filter((article: { ids: number }) => article.ids !== id)  
  localStorage.setItem('favorites', JSON.stringify(favorites))
}

const viewFeedNews = (id: number) => {
  router.push(`/feed/${id}`)
}

onMounted(loadFeeds)
</script>

<template>
  <div>
    <h1>Liste des flux RSS</h1>

    <ul v-if="feeds.length > 0">
      <li v-for="feed in feeds" :key="feed.id">
        <p>{{ feed.title }}</p>  
        <a :href="feed.url" target="_blank">Voir le flux</a>
        <button @click="viewFeedNews(feed.id)">Voir les news</button>
        <button @click="deleteFeed(feed.id)">supprimer</button>
      </li>
    </ul>
    <p v-else>Aucun flux enregistré</p>
  </div>
</template>
