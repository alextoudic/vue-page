require('./main.styl')

var Vue = require('vue')
var vuePage = require('./VuePage')

window.onload = (function () {
  Vue.use(vuePage, {
    rootElement: '#app',
    keepAlive: true,
    cssTransitions: true,
    viewsPath: './views/',
    routes: {
      '/a': 'a',
      '/b/:name': 'b'
    }
  })
})