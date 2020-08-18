<template>
  <div id="app" class="app">
    <aside class="app__board">
      <SeasonList/>
    </aside>
    <div class="app__view">
      <RaceInfo></RaceInfo>
    </div>
  </div>
</template>

<script>
import SeasonList from './components/SeasonList.vue'
import RaceInfo from './components/RaceInfo.vue'

export default {
  name: 'App',
  components: {
    SeasonList,
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

a {
  text-decoration: none;
  color: #eeeeee;
  font-weight: bold;
  transition: color 0.3s;
}

a:hover {
  color: #bbbbbb;
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