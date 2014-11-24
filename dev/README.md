# vue-router

Routing plugin for Vue.js (v0.11). Based on Vue.js Guide about routing and using pagejs.

Basically, this plugin is just a wrapper for pagejs. It creates a global ViewModel in which your components will be rendered using v-component and v-transition so you can define methods which will be called before enter, on enter and/or on leave.

### Getting started

First install the plugin

`npm install vue-page --save`

### Initialize

Then initialize the plugin with your routes (see [pagejs](http://visionmedia.github.io/page.js) for more info on routes).

```javascript
  var Vue     = require('Vue'),
      vuePage = require('vue-page');

  Vue.use(vuePage, {
    rootElement: '#app', //element in which the components will injected
    class: 'page', //class of the components' wrappers (default is view)
    base: '/base', //optionnal
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
      '*': 'lost' //not found
    },
    default: '/base/en/home' //redirection for '/' if needed
  });
```

This configuration will create the following routes (on right are the components names):

'/base/fr/accueil' -> 'home'

'/base/fr/a-propos' -> 'about'

'/base/en/home' -> 'home'

'/base/en/about' -> 'about'

'/page/:id' -> 'pageId'

'/hello/:name' -> 'greetings'

'*' -> 'lost'

Each component have to be defined in Vue.

### Usage

This plugin won't force you to implement your components with any specific syntax. Moreover, it allows you to define methods which will be fired by v-transition.

```javascript
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
```

As you can see in this component example, the plugin fires events. On startup, it fires 'router:start' and on each url change 'router:update'. So you can listen those events to do whatever you want.

You can also define beforeEnter, enter and leave as methods but they're all optionnal. It becomes pretty handy if you want fancy transitions between your pages. For enter and leave don't forget to call the callbacks, the world won't collapse but your DOM will be dirty as v-transition uses it to clean up.

You also have a Vue.router.show method which call the pagejs method so you can redirect your user on a other url.

### Params

All property from pagejs context are in cloned in a context property on your component using v-with. Thanks to that, if I go to /hello/world which fires /hello/:name and call my greetings component, I will be able to use name in my template as following

```html
<h1>Hello {{context.params.name}}</h1>
```

And of course, it doesn't need any specific development in my component instanciation

```javascript
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
```

See, nothing but animations.

One more time, you should see [pagejs documentation](http://visionmedia.github.io/page.js/) to know what properties you can get from context.