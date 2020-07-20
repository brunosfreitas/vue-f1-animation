<template>
  <div class="raceItem" :style="scuderiaColor">
    <p class="raceItem__racer">{{ racer.position }} - {{ racer.Driver.familyName }} <span class="raceItem__constructor">{{ constructorName }}</span></p>
    <p class="raceItem__timeDiff">{{ timeDiff }}</p>
  </div>
</template>

<script>
export default {
  name: 'RaceItem',
  props: {
    racer: {
      default: null,
      type: Object
    }
  },
  computed: {
    scuderiaColor: function() {
        return {
          borderLeft: "5px solid " + this.racer.color
        };
      },
    constructorName: function() {
      return this.racer.Constructor.name
    },
    timeDiff: function() {
      return this.racer.Time?.time;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .raceItem {
    height: 60px;
    padding-left: 30px;
  }

  .raceItem__constructor {
    font-size: 10px;
  }

  .raceItem__timeDiff {
    color: tomato;
    margin-top: 0;
  }

  .raceItem__racer {
    margin-bottom: 0;
  }
</style>