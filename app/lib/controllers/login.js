require('app/core');

App.LoginController = Em.Controller.extend({

  email: 'your@email.com',
  password: 'password123',
  
  login: function(){
    console.log('logging in...');
  }
    
});