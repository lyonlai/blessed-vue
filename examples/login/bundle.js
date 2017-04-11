'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('blessed-vue'));

var TestComponent = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('screen',{ref:"screen",attrs:{"smartCSR":true,"keys":true}},[_c('form',{staticStyle:{"bg":"white"},attrs:{"top":"center","left":"center","width":"50%","height":20,"keys":true,"mouse":true}},[_c('box',{staticStyle:{"bg":"white","fg":"black","bold":"true"},attrs:{"width":50,"height":1,"top":1,"left":"center","align":"center","content":"Login Form"}}),_vm._v(" "),_c('text',{ref:"txt",staticStyle:{"bold":"true","blink":"true","underline":"true"},attrs:{"top":3,"left":"50%-20"}},[_vm._v("Username: ")]),_vm._v(" "),_c('textbox',{ref:"username",staticStyle:{"bg":"blue","fg":"white"},attrs:{"keys":true,"mouse":true,"top":3,"left":"50%-8","length":10,"width":30,"height":1,"value":_vm.username},on:{"submit":_vm.submitUsername}}),_vm._v(" "),_c('text',{staticStyle:{"bold":"true","blink":"false","underline":"true"},attrs:{"top":5,"left":"50%-20"}},[_vm._v("Password: ")]),_vm._v(" "),_c('textbox',{ref:"password",staticStyle:{"bg":"blue","fg":"white"},attrs:{"keys":true,"mouse":true,"top":5,"left":"50%-8","length":10,"width":30,"height":1,"value":_vm.password,"censor":true},on:{"submit":_vm.submitPassword}}),_vm._v(" "),_c('checkbox',{staticStyle:{"bg":"blue"},attrs:{"keys":true,"mouse":true,"top":7,"left":"center","checked":_vm.rememberMe,"text":"remember me","width":20,"height":1},on:{"check":function($event){_vm.updateRememberMe(true);},"uncheck":function($event){_vm.updateRememberMe(false);}}}),_vm._v(" "),_c('button',{style:([_vm.buttonStyle, _vm.submitting && _vm.loggingStyle]),attrs:{"keys":true,"mouse":true,"content":"Login","width":20,"height":3,"top":9,"left":"center","align":"center","valign":"middle"},on:{"press":_vm.login}}),_vm._v(" "),_c('message',{ref:"message",attrs:{"top":"center","left":"center","width":50,"height":5,"align":"center","valign":"middle"}})],1)])},
staticRenderFns: [],
  name: 'test-component',
  data: function () {
    return {
      username: '',
      password: '',
      rememberMe: false,
      submitting: false
    }
  },
  computed: {
    buttonStyle: function buttonStyle () {
      return {
        bg: 'blue',
        fg: 'white'
      }
    },
    loggingStyle: function loggingStyle () {
      return {
        bg: 'grey'
      }
    }
  },
  methods: {
    submitUsername: function submitUsername(username) {
      this.username = username;
    },
    submitPassword: function submitPassword(password) {
      this.password = password;
    },
    updateRememberMe: function updateRememberMe(val) {
      this.rememberMe = val;
    },
    login: function login() {
      var this$1 = this;

      debugger
      this.submitting = true;
      this.$refs.message.log(("Logging in. Username: " + (this.username) + ", password: " + (this.password) + ", rememberMe: " + (this.rememberMe)), 3, function () {
        this$1.$refs.message.log('Logged in', 1, function () {
          this$1.submitting = false;
        });
      });
    }
  },
  mounted: function mounted () {
    debugger
    this.$refs.screen.key(['C-c'], function () {
      process.exit(0);
    });
    this.$refs.username.focus();
    this.$refs.message.hide();
  }
};

var el = Vue.dom.createElement();

Vue.dom.append(el);

var instance = new Vue({
  name: 'app',
  components: {
    TestComponent: TestComponent
  },
  template: '<test-component />'
}).$mount(el);
