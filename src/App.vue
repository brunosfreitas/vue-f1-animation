<template>
  <div id="app" class="app">
    <aside class="app__board">
      <RaceList/>
    </aside>
    <div class="app__view">
      <RaceInfo></RaceInfo>
    </div>
  </div>
</template>

<script>
import RaceList from './components/RaceList.vue'
import RaceInfo from './components/RaceInfo.vue'

export default {
  name: 'App',
  components: {
    RaceList,
    RaceInfo
  }
}
</script>

<style>
  body {
  margin: 0;
  height: 100vh;
  width: 100%;
  font-family: 'Mukta', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #1b1b1e;
  color: #e1e5ee;  
  border-color: #262728;
}

.app {
  font-size: 16px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(150px, 25%) 1fr;
}

  .app__board {
    background-color: #0c0c0d;
    padding-top: 60px;
  }

  .app__view {

  }
</style>