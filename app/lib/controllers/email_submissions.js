require('app/core');
require('app/models/email_submission');

App.emailSubmissionsController = Em.ResourceController.create({
  resourceType: App.EmailSubmission,
  dataReady: false,
  
  onRefresh: function(){
    $('.loader').hide();
    this.set('dataReady', true);
  },
    
});
