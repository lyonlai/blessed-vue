<template>
  <screen ref='screen' :smartCSR="true" :keys="true">
    <log ref='log' :blessed='true' :content="logs" align="center" valign="middle" :border="{ type: 'line' }" :style="logStyle" top="center" left="center" width="50%" height="50%"/>
  </screen>
</template>

<script>
import moment from 'moment'
import faker from 'faker'
import prettySeconds from 'pretty-seconds'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'log-component',
  computed: mapState({
    logs: state => state.logs
  }),
  methods: mapActions([
    'appendLog'
  ]),
  data: () => {
    return {
      logStyle: {
        bg: 'black',
        fg: 'white',
        border: {
          fg: 'green',
          // bg: 'red'
        }
      }
    }
  },
  mounted () {
    this.$refs.screen.key(['C-c'], () => {
      process.exit(0)
    })
    setInterval(() => {
      this.appendLog(`${faker.name.findName()} called from ${faker.address.state()} ${prettySeconds(faker.random.number(3600))} ago.`)
    }, 1000)
  }
}
</script>
