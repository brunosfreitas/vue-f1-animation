<template>
  <h1>{{ raceName }}</h1>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
    name: 'RaceInfo',
    computed: {
        ...mapState(['raceResults']),
        ...mapGetters(['raceInfo']),
        raceName() {
            return `${this.raceResults?.season} - ${this.raceInfo?.raceName}`;
        }
    }
}
</script>

<style>

</style>