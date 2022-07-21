<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/port-info">L2 switch data</router-link> |
    </div>
    <router-view class="router"/>

  </div>
</template>

<style>
  .router{
    background-color: rgb(226, 226, 226);
    min-height: 100vh
  }  
</style>

