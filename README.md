# DEPRECATED, YOU SHOULD USE [VUE-ROUTER](https://github.com/vuejs/vue-router) WHICH IS THE OFFICIAL VUEJS' ROUTER

# vue-page

Routing plugin for Vue.js (v0.11). Based on Vue.js Guide about routing and using pagejs.

Basically, this plugin is just a wrapper for pagejs. It creates a global ViewModel in which your components will be rendered using v-component, v-transition so you can define methods which will be called before enter, on enter and/or on leave and v-with so you can get url params.

### Getting started

First install the plugin

```
npm install vue-page --save
```

### Initialize

Then initialize the plugin with your routes (see [pagejs](http://visionmedia.github.io/page.js) for more infos on routes). Note that the routes initialization is a little bit different from the pagejs one because I wanted to allow url "nesting".
Each string value which is affected to a property is the of a v-component instance.

```javascript
var Vue     = require('Vue'),
    vuePage = require('vue-page');

Vue.use(vuePage, {
  rootElement: '#app', //element in which the components will injected
  class: 'page', //class of the components' wrappers (default is view)
  base: '/base', //optionnal
  cssTransitions: false, //optionnal default is false
  keepAlive: true, //optionnal default is false
  routes: {
    '/fr': {
      '/accueil': 'home',
      '/a-propos': 'about'
    },
    '/en': {
      '/home': 'home',
      '/about': 'about'
    },
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

'/hello/:name' -> 'greetings'

'*' -> 'lost'

Each component have to be defined if you don't want a warning.

Two differents url can load the same template. In this example /base/fr/accueil and /base/en/home both load the home component. This way, my french and english users will both have a url in their language but I will only make my template and controller one time. I'm sure you'll find a lot of cases in which you want something like that too.

### Usage

This plugin won't force you to implement your components with any specific syntax. Moreover, it allows you to define methods which will be called by v-transition.

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
      Vue.page.show('/hello/VueJS');
    },

    beforeEnter: function () {
      //set style before anim

      TweenMax.set(this.$el, {
        x: -window.innerWidth/2
      });
    },
    enter: function (cb) {
      //animate enter

      TweenMax.to(this.$el, 0.8, {
        x: 0,
        onComplete: cb
      });
    },
    leave: function (cb) {
      //animate leave

      TweenMax.to(this.$el, 0.8, {
        x: -window.innerWidth/2,
        onComplete: cb
      });
    }
  }
});
```

As you can see in this component example, the plugin fires events. On startup, it fires 'router:start' and on each url change 'router:update'. So you can listen those events to do whatever you want.

You can also define beforeEnter, enter and leave as methods but they're all optionnal. It becomes pretty handy if you want fancy transitions between your pages. For enter and leave don't forget to call the callbacks, the world won't collapse if you don't but your DOM will be dirty as v-transition uses it to clean up.

You can also set cssTransitions to true and define the animations in your CSS file using .view-enter and .view-leave classes. But note that if you use css transitions, your beforeEnter, enter and leave methods won't be called and you'll have to listen update events if you want to execute a method on update.

You also have a Vue.page.show method which call the pagejs show method so you can redirect your user on an other url.

### Params

All properties from pagejs context can be found in a context property on your component which is set using v-with. Thanks to that, if I go to /hello/world which fires the url /hello/:name and call my greetings component, I will be able to use name in my template as following

```html
<h1>Hello {{context.params.name}}</h1>
```

And of course, it doesn't need any specific development in my component instantiation

```javascript
var Vue = require('Vue');
var template = require('./template.html');

module.exports = Vue.component('greetings', {
  template: template,
  methods: {
    beforeEnter: function () {
      //set style before anim

      TweenMax.set(this.$el, {
        y: -20,
        opacity: 0
      });
    },
    enter: function (cb) {
      //animate enter

      TweenMax.to(this.$el, 0.4, {
        y: 0,
        opacity: 1,
        onComplete: cb
      });
    },
    leave: function (cb) {
      //animate leave

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

This context object also contains infos about the url so if you two urls which call the same component, you can easily know the url used to open it.

You should look at the [pagejs documentation](http://visionmedia.github.io/page.js/) to know what other properties you can get from context.

### Working with Webpack

Vue-page is now working with Webpack. My example is based on [vue-webpack-example](https://github.com/vuejs/vue-webpack-example).

Here is the main.js I used as entry.

```javascript
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
```

The important part is the viewsPath property. You have to define it so the plugin will know where to find the components your referencing. All components have to be defined in an index.js at ./views/[component-name].

For example the b component is defined in ./views/b/index.js as following

```javascript
module.exports = {
  template: require('./template.html'),
  replace: true
}
```

This component declaration is comming directly from vue-webpack-example.
