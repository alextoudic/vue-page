var Vue      = require('Vue'),
    TweenMax = require('TweenMax');
var template = require('./template.html');

module.exports = Vue.component('home', {
  template: template,
  events: {
    'router:update': function () {
      console.log('url changed');
    }
  },
  methods: { 
    helloVue: function () {
      Vue.router.show('/hello/VueJS');
    },
    
    beforeEnter: function () {
      TweenMax.set(this.$el, {
        x: -window.innerWidth/2
      });
    },
    enter: function (cb) {
      TweenMax.to(this.$el, 0.8, {
        x: 0,
        onComplete: cb
      });
    },
    leave: function (cb) {
      TweenMax.to(this.$el, 0.8, {
        x: -window.innerWidth/2,
        onComplete: cb
      });
    }
  }
});
