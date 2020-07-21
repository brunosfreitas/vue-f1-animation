<template>
  <div class="racePodiumItem" :class="{'racePodiumItem--odd': oddItem }">
    <div class="racePodiumItem__position" :style="positionStyle">
        {{ orderingNumber }}
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
      default: 0,
      type: Number
    },
    orderByResult: {
      default: true,
      type: Boolean
    }
  },
  computed: {
    positionStyle: function() {
      if(this.orderByResult) {
        const position = this.oddItem ? 'borderLeft' : 'borderRight';
        let style = {};

        style[position] = "10px solid " + this.racer.Constructor.color;
        return { ...style, boxShadow: '10px 10px 0px 0px #f00'};
      }
      
      return { 
        border: "4px solid #53535d",
        borderBottom: 'none' 
      }
    },
    constructorName: function() {
      return this.racer.Constructor.name
    },
    timeDiff: function() {
      return this.racer.Time?.time;
    },
    oddItem: function() {
      return this.itemId % 2 === 1;
    },
    orderingNumber: function() {
      return this.orderByResult ? this.racer.position : this.racer.grid;
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

  .racePodiumItem--odd {
    margin-top: 60px;
    margin-bottom: 20px;
  }

  .racePodiumItem__position {
    font-size: 40px;
    font-weight: 700;
    padding: 8px 16px;
    line-height: 40px;

    /* transition: border-color 1s; */
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

  .racePodiumItem--odd .racePodiumItem__info {
    order: 2;
  }

  .racePodiumItem--odd .racePodiumItem__position {
    order: 1;
  }

  .racePodiumItem--odd .racePodiumItem__imageWrapper {
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