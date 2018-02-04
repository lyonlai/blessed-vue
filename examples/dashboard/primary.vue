<template>
  <line-graph :lineData="lineData" :style="logStyle"/>
</template>

<script>
import moment from 'moment'
import LineGraph from './line.js'
let counter = 12;

let interval

export default {
  name: 'log-component',
  components: {
    LineGraph
  },
  data: () => {
    return {
      logStyle: {
        bg: 'black',
        fg: 'white',
        border: {
          fg: 'green',
          // bg: 'red'
        }
      },
      lineData: {
         x: ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10', 't11', 't12'],
         y: [5, 1, 7, 5, 2, 4, 9, 1, 7, 3, 4, 5]
      }
    }
  },
  mounted () {
    interval = setInterval(() => {
      this.lineData = {
        x: [...this.lineData.x.slice(1), `t${++counter}`],
        y: [...this.lineData.y.slice(1), Math.floor(Math.random() * 10 % 10) + 1]
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
