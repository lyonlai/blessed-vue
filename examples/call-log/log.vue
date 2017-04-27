<template>
  <screen ref='screen' :smartCSR="true" :keys="true">
    <log ref='log' :blessed='true' :content="logs" align="center" valign="middle" :border="{ type: 'line' }" :style="logStyle" top="center" left="center" width="50%" height="50%"/>
  </screen>
</template>

<script>
import moment from 'moment'
import faker from 'faker'
import prettySeconds from 'pretty-seconds'
export default {
  name: 'log-component',
  data: () => {
    return {
      logs: '',
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
      this.logs = `${this.logs}\n\n${faker.name.findName()} called from ${faker.address.state()} ${prettySeconds(faker.random.number(3600))} ago.`
    }, 1000)
  }
}
</script>
