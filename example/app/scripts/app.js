var Vue       = require('Vue'),
    vuePage = require('./VuePage'),
    home = require('./pages/home/controller'),
    pageId = require('./pages/pageId/controller'),
    about = require('./pages/about/controller'),
    greetings = require('./pages/greetings/controller'),
    lost = require('./pages/lost/controller');

Vue.use(vuePage, {
  rootElement: '#app',
  class: 'page',
  base: '/base',
  routes: {
    '/fr': {
      '/accueil': 'home',
      '/a-propos': 'about'
    },
    '/en': {
      '/home': 'home',
      '/about': 'about',
    },
    '/page/:id': 'pageId',
    '/hello/:name': 'greetings',
    '*': 'lost'
  },
  default: '/base/en/home'
});