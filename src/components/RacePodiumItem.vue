<template>
  <div class="racePodiumItem" :class="[{'racePodiumItem--odd': oddItem }, positionOffsetClass]">
    <div class="racePodiumItem__position" :style="positionStyle">
        {{ orderingNumber }}
    </div>
    <div class="racePodiumItem__info">
      <p class="racePodiumItem__racer"><a :href="racer.Driver.url" target="_blank">{{ driverName }}</a></p>
      <p class="racePodiumItem__constructor"><a :href="racer.Constructor.url" target="_blank">{{ constructorName }}</a></p>
    </div>
    <div class="racePodiumItem__imageWrapper">
      <a :href="racer.Constructor.url" target="_blank">
        <img class="racePodiumItem__image" :src="racer.Constructor.carImage" :alt="constructorName"/>
      </a>
    </div>
  </div>
</template>


<script>
export default {
  name: 'RacePodiumItem',
  data: function () {
    return {
      hoverName: false
    }
  },
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
    },
  },
  computed: {
    positionStyle: function() {
      if(this.orderByResult) {
        return { boxShadow: `10px 0px 0px 0px ${this.racer.Constructor.color}, 0px -5px 0px 0px transparent`};
      }
      
      return { 
        boxShadow: '-5px -5px 0px 0px #53535d, 5px -5px 0px 0px #53535d',
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
    },
    driverName: function() {
      // return !this.hoverName ? this.racer.Driver.familyName : `${this.racer.Driver.givenName} ${this.racer.Driver.familyName}` ;
      return this.racer.Driver.familyName;
    },
    positionOffsetClass: function() {
      if(this.racer.positionOffset < 0){
        return 'racePodiumItem--offsetNegative';
      } 

      if(this.racer.positionOffset === 0){
        return 'racePodiumItem--offsetSame';
      }

      return 'racePodiumItem--offsetPositive';
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

    /* delay leaving transition */
    transition: transform 1s, color 0.3s 0.6s;
  }
  
  .raceInfo__row--byResult .flip-list-move.racePodiumItem--offsetNegative {
    color: tomato;
    transition: transform 1s, color 0.3s;
  }

  .raceInfo__row--byResult .flip-list-move.racePodiumItem--offsetPositive {
      color: lawngreen;
      transition: transform 1s, color 0.3s;
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