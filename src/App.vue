<template>
  <header>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Feed-icon.svg/800px-Feed-icon.svg.png" alt="RSS logo" width="50px">
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/add-feed">Ajouter un flux</router-link>
      <router-link to="/preferences">Préférences</router-link>
    </nav>
  </header>

  <router-view></router-view>
</template>

<style>
  header {
    display: flex;
    align-items: center;
  }
  nav {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
</style>
