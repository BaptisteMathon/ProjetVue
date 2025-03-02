<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const feed = ref<{ id: number; title: string; url: string } | null>(null)
const flux = ref('')
const url = ref('')

const loadFeed = () => {
  const allFlux = JSON.parse(localStorage.getItem('feeds') || '[]')
  feed.value = allFlux.find((f: any) => f.id === Number(route.params.id)) || null
  if(!feed.value){
    return
  }

  flux.value = feed.value.title
  url.value = feed.value.url
}

const updateFlux = () => {
  const allFlux = JSON.parse(localStorage.getItem('feeds') || '[]')
  const index = allFlux.findIndex((f: any) => f.id === Number(route.params.id))
  allFlux[index] = {id: allFlux[index].id, title: flux.value, url: url.value}
  localStorage.setItem('feeds', JSON.stringify(allFlux))
  router.push('/')
}

onMounted(loadFeed)
</script>

<template>
  <h1>Modifier le flux</h1>
  <form @submit.prevent="updateFlux">
    <div>
      <label for="flux">Nom du Flux : </label>
      <input type="text" id="flux" v-model="flux" />
    </div>

    <div>
      <label for="URL">URL du flux : </label>
      <input type="text" id="URL" v-model="url" />
    </div>

    <button type="submit" class="updateFlux">Modifier</button>
  </form>
</template>

<style>
  form div input {
    margin-left: 15px;
  }

  .updateFlux{
    background: blue;
    color: white;
    border: none;
    padding: 3px 10px;
    border-radius: 15px;
    cursor: pointer;
    transition: 0.3s ease;
    margin-left: 25px;
  }

  .updateFlux:hover{
    background: darkblue;
  }
</style>
