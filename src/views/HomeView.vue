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

const editFlux = (id: number) => {
  router.push(`/edit-feed/${id}`)
}

onMounted(loadFeeds)
</script>

<template>
  <div>
    <h1>Liste des flux RSS</h1>

    <ul v-if="feeds.length > 0" class="liste-flux-rss">
      <li v-for="feed in feeds" :key="feed.id">
        <p>{{ feed.title }}</p>
        <button @click="viewFeedNews(feed.id)" class="news">Voir les news</button>
        <button @click="deleteFeed(feed.id)" class="delete">supprimer</button>
        <button @click="editFlux(feed.id)" class="edit">Modifier le flux</button>
        <a :href="feed.url" target="_blank">Voir le flux RSS</a>
      </li>
    </ul>
    <p v-else>Aucun flux enregistré</p>
  </div>
</template>

<style>
  h1 {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 25px;
  }

  .liste-flux-rss{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
  }

  .liste-flux-rss p {
    font-weight: bold;
  }

  .liste-flux-rss a, .liste-flux-rss button{
    margin-right: 25px;
  }

  .liste-flux-rss li
  {
    border-bottom: 1px solid black;
    padding-bottom: 10px;
  }

  .delete{
    background: red;
    color: white;
    border: none;
    padding: 3px 10px;
    border-radius: 15px;
    cursor: pointer;
    transition: 0.3s ease;
  }

  .news {
    background: green;
    color: white;
    border: none;
    padding: 3px 10px;
    border-radius: 15px;
    cursor: pointer;
    transition: 0.3s ease;
  }

  .edit{
    background: blue;
    color: white;
    border: none;
    padding: 3px 10px;
    border-radius: 15px;
    cursor: pointer;
    transition: 0.3s ease;
  }

  .delete:hover, .news:hover{
    background: greenyellow;
  }

  .delete:hover{
    background: darkred;
  }

  .edit:hover{
    background: darkblue;
  }
</style>
