require('app/core');
require('app/controllers/sorted_email_submissions');

App.filteredEmailSubmissionsController = Em.ArrayProxy.create({
  content: [],
  fullContentBinding: Em.Binding.oneWay('App.sortedEmailSubmissionsController.content'),
  totalBinding: Em.Binding.oneWay('fullContent.length'),
  
  totalFoundBinding: Em.Binding.oneWay('content.length'),
  totalFoundCaption: function(){
    if(this.get('totalFound') == 0){
      return 'No email submissions found'
    }else{
      return 'Found ' + this.get('totalFound') + ' email submissions'
    }
  }.property('totalFound').cacheable(),
  
  filters: Em.A([]),
  
  isEmpty: function(){
    return this.get('filters').length == 0
  }.property('filters.@each').cacheable(),
  
  addFilter: function(attr, keyword, filterViewPath){
    this.get('filters').pushObject(Em.Object.create({
      attr: attr, 
      keyword: ''
    }));
  },
  
  removeFilter: function(filterToRemove){
    var fr = this.get('filters').find(function(filter){
      return filter.attr.attr == filterToRemove.attr.attr;
    });
    this.set('filters', this.get('filters').without(fr));
  },
  
  doFilter: function(){
    console.log('filtering...');
    if(this.get('filters').length < 1){
      this.set('content', this.get('fullContent'));
    }else{
      var that = this;
      this.set('content', this.get('fullContent').filter(function(emailSubmission){
        return that.get('filters').every(function(filter){
          return emailSubmission[filter.attr.attr].match(new RegExp(filter.keyword, 'i'));
        })
      }))
    }
    this.notifyPropertyChange('content'); //needed to propagate sorting changes
  }.observes('filters.@each.keyword', 'App.sortedEmailSubmissionsController.sorted', 'App.sortedEmailSubmissionsController.content'),
  
});