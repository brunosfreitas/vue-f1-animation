<template>
  <div class="seasonStanding">
    <h1 class="seasonStanding__title">F1</h1>
    <ul class="seasonStanding__list">
      <li v-for="(racer, index) in driverStandings.DriverStandings" :key="index" class="seasonStanding__item">
        <a :href="racer.Driver.url" target="_blank">{{racer.Driver.familyName}} - {{racer.points}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import _ from 'lodash';

export default {
  name: 'SeasonStanding',
  components: {
  },
  data: function () {
    return {
        
    }
  },
  methods: {
    
  },
  computed: {
    ...mapGetters(['driverStandings']),
    racersRanking: function(){
        return true;
        // let ranking = _.orderBy(this.driverStandings.Results, (el) => {
        //     return parseInt(el.grid, 10);
        //     }, 'asc');
        // return ranking;
    }
  },
  mounted() {
      this.$store.dispatch('loadDriverStandings');
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .seasonStanding {
    text-align: left;
    padding-left: 20px;
  }

  .seasonStanding__title {

  }

  .seasonStanding__circuit{
    margin: 0 0 6px 6px;
  }

  .seasonStanding__list {
    list-style: none;
  }

  .seasonStanding__item {
    cursor: pointer;
  }

  .seasonStanding__item.seasonStanding__item--future {
    color: #999;
    cursor: default;
  }

  .seasonStanding__item:hover {
    color: #bbbbbb;
  }
</style>