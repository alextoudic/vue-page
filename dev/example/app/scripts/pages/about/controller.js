var Vue = require('Vue');
var template = require('./template.html');

module.exports = Vue.component('about', {
  template: template,
  methods: {
    enter: function (cb) {
      TweenMax.staggerFromTo('span', 0.2, {
        y: -10,
        opacity: 0
      },{
        y: 0,
        opacity: 1
      }, 0.1, cb);
    },
    leave: function (cb) {
      TweenMax.staggerTo('span', 0.2, {
        y: 10,
        opacity: 0
      }, 0.1, cb);
    }
  }
});
