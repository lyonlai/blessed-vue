<template>
  <screen ref='screen' :smartCSR="true" :keys="true">
    <line label="blah" :data="lineData" :barWidth="4" :barSpacing="6" :xOffset="0" :maxHeight="9" align="center" valign="middle" :border="{ type: 'line' }" :style="logStyle" :top="0" :left="0" :width="100" :height="20" />
    <donut :border="{ type: 'line' }" :style="{ border: { fg: 'green' } }" label="Progress" :radius="10" :arcWidth="4" remainColor="black"  :width="50" :height="20" :top="20" left="center" :data="donut"/>
    <lcd :segmentWidth="0.06"  :segmentInterval="0.11"
     :strokeWidth="0.11"
     :elements="8"
     :display="lcd"
     :elementSpacing="4"
     :elementPadding="2"
     :width="100"
     :height="20"
     :top="0"
     :left="100"
     color="white"
     :border="{ type: 'line' }" :style="{ border: { fg: 'green' } }"
     label="Time" />
  </screen>
</template>

<script>
import moment from 'moment'
let counter = 12;

export default {
  name: 'log-component',
  data: () => {
    return {
      lineData: {
         x: ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10', 't11', 't12'],
         y: [5, 1, 7, 5, 2, 4, 9, 1, 7, 3, 4, 5]
      },
      logStyle: {
        bg: 'black',
        fg: 'white',
        border: {
          fg: 'green',
          // bg: 'red'
        }
      },
      markers: [
        {"lon" : "-37.90", "lat" : "65.90", color: "red", char: "X" }
      ],
      donut: [
       	{percent: 87, label: 'left','color': 'green'},
    	  {percent: 43, label: 'right','color': 'cyan'},
      ],
      lcd: "5324"
    }
  },
  mounted () {
    this.$refs.screen.key(['C-c'], () => {
      process.exit(0)
    })

    setInterval(() => {
      this.lineData = {
        x: [...this.lineData.x.slice(1), `t${++counter}`],
        y: [...this.lineData.y.slice(1), Math.floor(Math.random() * 10 % 10) + 1]
      }
    }, 1000)

    setInterval(() => {
      this.lcd = moment().format("HH mm ss")
    }, 1000)

    setInterval(() => {
      this.donut = this.donut.map(donut => {
        return Object.assign({}, donut, {
          percent: Math.floor(Math.random() * 100 % 100) + 1
        })
      })
    }, 1000)
  }
}
</script>
