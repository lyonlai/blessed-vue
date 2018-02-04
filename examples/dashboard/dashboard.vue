<template>
  <screen ref='screen' :smartCSR="true" :keys="true">
    <component :is="activeGraph" />
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
import Primary from './primary.vue'
import Secondary from './secondary.vue'
let counter = 12;

export default {
  name: 'log-component',
  components: {
    Primary,
    Secondary
  },
  data: () => {
    return {
      activeGraph: "Primary",
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

    this.$refs.screen.key(['f1'], () => {this.activeGraph = 'Primary'})
    this.$refs.screen.key(['f2'], () => {this.activeGraph = 'Secondary'})

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
