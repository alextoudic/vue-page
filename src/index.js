var page = require('page');

exports.install = function (Vue, args) {
  var Router = Vue.extend({
    created: function () {
      if (args.default) {
        page('/', function () {
          window.location = args.default;
        });
      }
      
      for (var route in this.$options.routes) {
        this.parseRoute([route], this.$options.routes);
      }
    },
    
    attached: function () {
      page();
      this.$broadcast('router:start');
    },

    methods: {
      parseRoute: function (fragments, list) {
        var route = fragments[fragments.length-1];

        if (typeof list[route] == 'string') {
          var component = list[route];

          page(fragments.join(""), (function (ctx) {
            
            Vue.nextTick((function () {
              this.context = {
                path: ctx.path,
                canonicalPath: ctx.canonicalPath,
                querystring: ctx.querystring,
                pathname: ctx.pathname,
                state: ctx.state,
                title: ctx.title,
                params: {}
              };

              for (var obj in ctx.params) {
                this.context.params[obj] = ctx.params[obj];
              }

              if (args.viewsPath) {
                var path = args.viewsPath + component + '/index';
                var require = args.require ? args.require : require; 
                Vue.component(component, require(path));
              }

              this.currentView = component;
              this.$broadcast('router:update');
              
            }).bind(this));
            
          }).bind(this));
        }
        else {
          for (var subRoute in list[route]) {
            this.parseRoute(fragments.concat(subRoute), list[route]);
          }
        }
      },

      show: function (path) {
        page(path);
      }
    }
  });

  if (args.base) {
    page.base(args.base);
  }
  
  var viewClass = (args.class) ? args.class : 'view';
  
  Vue.page = new Router({
    el: args.rootElement,
    template: '<div class="'+viewClass+'" v-component="{{currentView}}" v-with="context: context" v-transition="view"'+ ((args.keepAlive) ? ' keep-alive' : '') +'></div>',
    routes: args.routes,
    data: {
      currentView: null,
      context: null
    },
    methods: args.methods

  });
  
  if (!args.cssTransitions) {
    Vue.transition('view', {
      beforeEnter: function () {
        if (this.beforeEnter) {
          this.beforeEnter();
        }
      },
      enter: function (el, done) {
        if (this.enter) {
          this.enter(done);
        }
        else {
          done();
        }
      },
      leave: function (el, done) {
        if (this.leave) {
          this.leave(done);
        }
        else {
          done();
        }
      }
    });
  }
};