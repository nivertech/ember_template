require('app/core');
require('app/controllers/email_submissions');

App.sortedEmailSubmissionsController = Em.ArrayProxy.create({
  content: [],
  fullContentBinding: Em.Binding.oneWay('App.emailSubmissionsController.content'),
  dataReadyBinding: Em.Binding.oneWay('App.emailSubmissionsController.dataReady'),

  totalBinding: Em.Binding.oneWay('fullContent.length'),

  sortParams: {attr: 'createdAtTimestamp', dir: 'asc'},
  
  sorted: false,
  
  doSort: function() {
    if(this.get('dataReady')){
    
      var sortAttr = this.get('sortParams').attr;
      var sortDir = this.get('sortParams').dir;
      console.log('sorting... attr:'+sortAttr+', dir:'+sortDir);

      var sortedContent = [];
      if (sortDir == "asc") {
          sortedContent = this.get("fullContent").sort( function(a,b){
            if(a.get(sortAttr) < b.get(sortAttr)){return -1;}
            else if(a.get(sortAttr) > b.get(sortAttr)){return 1;}
            else{return 0;}
            // return a.get("campaign_name") - b.get("campaign_name");
          })
      } else {
          sortedContent = this.get("fullContent").sort( function(a,b){
            if(a.get(sortAttr) > b.get(sortAttr)){return -1;}
            else if(a.get(sortAttr) < b.get(sortAttr)){return 1;}
            else{return 0;}
            // return b.get("campaign_name") - a.get("campaign_name");
          })
      }
      
      this.set('content', sortedContent);
      this.notifyPropertyChange('sorted');
      
    }
  }.observes('dataReady', 'sortParams')
  
});