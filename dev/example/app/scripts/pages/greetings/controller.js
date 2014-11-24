var Vue = require('Vue');
var template = require('./template.html');

module.exports = Vue.component('greetings', {
  template: template,
  methods: {
    beforeEnter: function () {
      TweenMax.set(this.$el, {
        y: -20,
        opacity: 0
      });
    },
    enter: function (cb) {
      TweenMax.to(this.$el, 0.4, {
        y: 0,
        opacity: 1,
        onComplete: cb
      });
    },
    leave: function (cb) {
      TweenMax.to(this.$el, 0.4, {
        y: 20,
        opacity: 0,
        onComplete: cb
      });
    }
  }
});
