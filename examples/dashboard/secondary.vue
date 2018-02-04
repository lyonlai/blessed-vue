<template>
  <bar label="Press F1 to swap to line graph" :top="0" :left="0" :maxHeight="10" :width="100" :height="20" :style="logStyle" :data="barData"/>
</template>

<script>
import moment from 'moment'
let counter = 10;

let interval

export default {
  name: 'bar-component',
  data: () => {
    return {
      logStyle: {
        bg: 'black',
        fg: 'white',
        border: {
          fg: 'green',
        }
      },
      barData: {
        titles: ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10'],
        data: [5, 1, 7, 5, 2, 4, 7, 5, 2, 3]
      }
    }
  },
  mounted () {
    interval = setInterval(() => {
      this.barData = {
        titles: [...this.barData.titles.slice(1), `t${++counter}`],
        data: [...this.barData.data.slice(1), Math.floor(Math.random() * 10 % 10) + 1] 
      }
    }, 1000)
  },
  beforeDestroy () {
    if(interval) {
      clearInterval(interval)
    }
  }
}
</script>
