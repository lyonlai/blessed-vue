# blessed-vue [![Build Status](https://travis-ci.org/lyonlai/blessed-vue.svg?branch=master)](https://travis-ci.org/lyonlai/blessed-vue) [![Dependency Status](https://david-dm.org/boennemann/badges.svg)](https://david-dm.org/boennemann/badges) [![npm version](https://badge.fury.io/js/blessed-vue.svg)](https://badge.fury.io/js/blessed-vue)

This package is a runtime for [blessed](https://github.com/chjj/blessed). Blessed is a great replacement for [ncurses](https://en.wikipedia.org/wiki/Ncurses) in building UI for terminal interface in Javascript. The intention of creating this runtime is to bring declarative templates and reactive components of VueJS to simplify the layout of blessed components.

This package is inspired by [react-blessed](https://github.com/Yomguithereal/react-blessed).

## Table of content
- [Features](#features)
  - [Supported Element](#supported-elements)
  - [Style](#style)
    - [Static string style](#static-string-style)
    - [Array style binding](#static-string-style)
    - [Object style](#object-style)
- [Installation](#installation)
- [Example](#example)  

## Features
### Supported Element
All the widgets in [Blessed Widgets](https://github.com/chjj/blessed#widgets) should be supported out of the box. For details of what attributes is available for each element. Please refer to the specific widget in the [document](https://github.com/chjj/blessed).


### Style
The styling in Blessed Vue is not quite like CSS in the Web. In CSS the style you defined in parent can cascade/flow down to its children tree, where in blessed the style is only for the defined element.

You can style your blessed element in the following ways.

#### Static string style
If your don't need value binding in your element style. Blessed Vue supports string style definition. For nested value like focus, hover, scrollbar, etc..., you can use dot style to specify the nested value. See the following example.

```html
<box style='bg: white; fg: black; hover.bg: black; hover.fg: white'/>
```

#### Array style binding
```html
<template>
  <box :style="[baseStyle, isLoading && loadingStyle]" />
</template>

<script>
export default {
  ...
  data: {
    isLoading: false
  }
  computed: {
    baseStyle () {
      return {
        bg: 'blue',
        fg: 'white'
      }
    },
    loadingStyle () {
      return {
        bg: 'yellow'
      }
    }
  }
  ...
}
</script>
```

#### Object style
```html
<template>
  <box :style="objectStyle" />
</template>

<script>
export default {
  ...
  computed: {
    objectStyle () {
      return {
        bg: 'blue',
        fg: 'white',
        hover: {
          bg: 'red'
        }
      }
    }
  }
  ...
}
</script>
```

## Installation

``` bash
npm install blessed-vue
```

## Example
The following exmample consists of two files. `index.js` & `test-component.vue`. At the moment blessed-vue shares the same template compiler with web runtime. So in order to load the [single file component](https://vuejs.org/v2/guide/single-file-components.html), you can use either [vue-loader](https://github.com/vuejs/vue-loader) when you are with [webpack](https://webpack.github.io/), or [rollup-plugin-vue](https://github.com/vuejs/rollup-plugin-vue) when you are with [rollup](https://rollupjs.org/).

![Example screen shot](./screenshot.png "Example screen shot")


### index.js

```Javascript
import Vue from 'blessed-vue'
import TestComponent from './test-component.vue'

/*
Due the fact that Blessed library doesn't have concept similar to web dom.
Blessed Vue provided a dom element which simulate the behaviour of a web dom to mount the component on.
*/
const el = Vue.dom.createElement() // create a placebo element for Blessed Vue to append on

Vue.dom.append(el) // attaching the placebo element

const instance = new Vue({
  name: 'app',
  components: {
    TestComponent
  },
  template: '<test-component />'
}).$mount(el) // create the landing element then mount it on the placebo one
```

### template.vue
```html
<template>
  <screen ref='screen' :smartCSR="true" :keys="true">
    <form top="center" left="center" width="50%" :height="20" :keys="true" :mouse="true" style="bg: white">
      <box :width="50" :height="1" :top="1" left="center" align="center" content="Login Form" style="bg: white; fg: black; bold: true" />
      <text :top="3" left="50%-20" style="bold: true">Username: </text>
      <textbox :keys="true" :mouse="true" ref='username'
              :top="3" left="50%-8" :length="10" :width="30" :height="1"
              :value="username" @submit="submitUsername"
              style="bg: blue; fg: white"/>
      <text :top="5" left="50%-20" style="bold: true">Password: </text>
      <textbox :keys="true" :mouse="true" ref='password'
              :top="5" left="50%-8" :length="10" :width="30" :height="1"
              :value="password" @submit="submitPassword"
              style="bg: blue; fg: white" :censor="true"/>
      <checkbox :keys="true" :mouse="true" :top="7" left="center"
              :checked="rememberMe" @check="updateRememberMe(true)" @uncheck="updateRememberMe(false)"
              text='remember me' :width="20" :height="1"
              style="bg: blue"/>
      <button :keys="true" :mouse="true" content="Login"
              :width="20" :height="3" :top="9" left="center"
              align="center" valign="middle"
              :style="[buttonStyle, submitting && loggingStyle]"
              @press="login"/>
      <message ref="message" top="center" left="center" :width="50" :height="5" align="center" valign="middle"/>
    </form>
  </screen>
</template>

<script>
export default {
  name: 'test-component',
  data: {
    username: '',
    password: '',
    rememberMe: false,
    submitting: false
  },
  computed: {
    buttonStyle () {
      return {
        bg: 'blue',
        fg: 'white'
      }
    },
    loggingStyle () {
      return {
        bg: 'grey'
      }
    }
  },
  methods: {
    submitUsername(username) {
      this.username = username
    },
    submitPassword(password) {
      this.password = password
    },
    updateRememberMe(val) {
      this.rememberMe = val
    },
    login() {
      this.submitting = true
      this.$refs.message.log(`Logging in. Username: ${this.username}, password: ${this.password}, rememberMe: ${this.rememberMe}`, 3, () => {
        this.$refs.message.log('Logged in', 1, () => {
          this.submitting = false
        })
      })
    }
  },
  mounted () {
    this.$refs.screen.key(['C-c'], () => {
      process.exit(0)
    })
    this.$refs.username.focus()
    this.$refs.message.hide()
  }
}
</script>
```
