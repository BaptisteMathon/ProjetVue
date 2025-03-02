<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const feed = ref<{ id: number; title: string; url: string } | null>(null)
const articles = ref<any[]>([])
const limit = ref<number>(10)

const loadFeed = () => {
  const feeds = JSON.parse(localStorage.getItem('feeds') || '[]')
  feed.value = feeds.find((f: any) => f.id === Number(route.params.id)) || null
  if (!feed.value){
    return
  }
  fetchRSS(feed.value.url, feed.value.id)
}

const fetchRSS = async (url: string, id: number) => {
  try {
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    const data = await response.json()
    const parser = new DOMParser()
    const xml = parser.parseFromString(data.contents, 'application/xml')

    articles.value = Array.from(xml.querySelectorAll('item')).map((item: any) => ({
      title: item.querySelector('title')?.textContent,
      link: item.querySelector('link')?.textContent,
      description: item.querySelector('description')?.textContent,
      image: item.querySelector('media\\:content, content')?.getAttribute('url') || item.querySelector('enclosure')?.getAttribute('url') || null,
      pubDate: item.querySelector('pubDate')?.textContent,
      ids: id
    }))
  } catch (error) {
    console.error('Erreur lors du chargement du flux RSS', error)
  }
}

const saveToFavorites = (article: any) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  console.log(favorites.length)
  console.log(article)
  if(favorites.length !== 0){
    favorites.forEach((news: { title: any; }) => {
      if(news.title !== article.title){
        favorites.push(article)
        localStorage.setItem('favorites', JSON.stringify(favorites))
        console.log('Article sauvegardé')
      } else {
        console.log('Article déjà sauvegardé')
      }
    });
  } else {
    console.log("else")
    favorites.push(article)
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
}

const filteredArticles = computed(() => {
  return limit.value === 0 ? articles.value : articles.value.slice(0, limit.value)
})

onMounted(loadFeed)
</script>

<template>
  <div>
    <h1>Articles de {{ feed?.title || 'Flux inconnu' }}</h1>

    <div v-if="articles.length > 0">
      <label>Nombre d'articles à afficher :</label>
      <select v-model="limit">
        <option :value="10">10</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
        <option :value="0">Tout</option>
      </select>

      <ul>
        <li v-for="article in filteredArticles" :key="article.link">
          <h3>{{ article.title }}</h3>
          <p v-if="article.image" class="p-image"><img :src="article.image" alt="Image de l'article"></p>
          <p>{{ article.description }}</p>
          <div class="div-info">
            <a :href="article.link" target="_blank">Lire la suite</a>
            <p style="display: none">{{ article.ids }}</p>
            <button @click="saveToFavorites(article)" class="sauvegarder">Sauvegarder</button>
          </div>
        </li>
      </ul>
    </div>

    <p v-else>Aucun article trouvé.</p>
  </div>
</template>

<style>
  .sauvegarder {
    background: green;
    color: white;
    border: none;
    padding: 3px 10px;
    border-radius: 15px;
    cursor: pointer;
    transition: 0.3s ease;
    margin-left: 25px;
  }

  .sauvegarder:hover {
    background: #218c74;
  }

  .p-image {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .div-info{
    display: flex;
    width: 100%;
    justify-content: center;
  }
</style>
