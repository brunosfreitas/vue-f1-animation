<template>
  <div class="racePodiumItem" :class="{'racePodiumItem--even': evenItem }">
    <div class="racePodiumItem__position" :style="scuderiaColor">
        {{ racer.position }}
    </div>
    <div class="racePodiumItem__info">
      <p class="racePodiumItem__racer">{{ racer.Driver.familyName }}</p>
      <p class="racePodiumItem__constructor">{{ constructorName }}</p>
    </div>
    <div class="racePodiumItem__imageWrapper">
      <img class="racePodiumItem__image" :src="racer.Constructor.carImage" :alt="constructorName"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RacePodiumItem',
  props: {
    racer: {
      default: null,
      type: Object
    },
    itemId: {
      default: "0",
      type: String
    }
  },
  computed: {
    scuderiaColor: function() {
      const position = this.evenItem ? 'borderLeft' : 'borderRight';

      let object = {};
      object[position] = "10px solid " + this.racer.Constructor.color;
        return object;
    },
    constructorName: function() {
      return this.racer.Constructor.name
    },
    timeDiff: function() {
      return this.racer.Time?.time;
    },
    evenItem: function() {
      return this.itemId % 2 === 0;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .racePodiumItem {
    /* height: 60px; */
    grid-gap: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    place-items: center;
    margin-bottom: 80px;
    line-height: 1;
  }

  .racePodiumItem--even {
    margin-top: 60px;
    margin-bottom: 20px;
  }

  .racePodiumItem__position {
    font-size: 40px;
    font-weight: 700;
    padding-left: 16px;
    padding-right: 16px;
    line-height: 40px;
  }

  .racePodiumItem .racePodiumItem__info {
    order: 2;
    width: 100%;
  }

  .racePodiumItem .racePodiumItem__position {
    order: 3;
  }

  .racePodiumItem .racePodiumItem__imageWrapper {
    order: 1;
  }

  .racePodiumItem--even .racePodiumItem__info {
    order: 2;
  }

  .racePodiumItem--even .racePodiumItem__position {
    order: 1;
  }

  .racePodiumItem--even .racePodiumItem__imageWrapper {
    order: 3
  }

  .racePodiumItem__constructor {
    font-size: 10px;
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    text-align: left;
  }

  .racePodiumItem__timeDiff {
    color: tomato;
    margin: 0;
  }

  .racePodiumItem__racer {
    margin: 0;
    font-size: 26px;
    font-weight: 500;
    text-align: left;
  }

  .racePodiumItem__image {
    height: 40px;
    width: auto;
  }
</style>