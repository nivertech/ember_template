require('app/core');
require('app/views/login');


App.reopen({
  
  store: DS.Store.create(),

  ApplicationController: Em.Controller.extend(),
  ApplicationView: Em.View.extend({
    templateName: 'application'
  }),
  
  Router: Ember.Router.extend({
    enableLogging: true,
    location: 'hash',
    
    root: Ember.Route.extend({
      gotoLogin: Ember.Route.transitionTo('login'),
      index: Em.Route.extend({
        route: '/',
        redirectsTo: 'login'
      }),
      login: Ember.Route.extend({
        route: '/login',
        connectOutlets: function(router, context) {
          return router.get('applicationController').connectOutlet({name: 'login'});
        },
        enter: function() {
          console.log('entered login');
        },
        exit: function() {
          console.log('exited login');
        },
      })
    
    })
  })

});

$(function() {
  App.initialize();
});
