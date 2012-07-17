require('app/core');
require('app/mixins/paginatable');
require('app/controllers/filtered_email_submissions');

App.paginatedEmailSubmissionsController = Em.ArrayProxy.create(Em.Paginatable, {
  content: [],
  fullContentBinding: Em.Binding.oneWay('App.filteredEmailSubmissionsController.content'),
  totalBinding: Em.Binding.oneWay('fullContent.length'),
  
  rangeStart: 0,
  rangeWindowSize: 30,
  
  restartPaging: function() {
    console.log('paginating...');
    this.set('content', this.get('fullContent').slice(this.get('rangeStart'), this.get('rangeWindowSize')) );
  }.observes('App.filteredEmailSubmissionsController.content'),
  
  didRequestRange: function(rangeStart, rangeStop) {
    this.set('content', this.get('fullContent').slice(rangeStart, rangeStop) );
  }
});