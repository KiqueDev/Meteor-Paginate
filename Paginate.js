Coll = new Meteor.Collection("coll");

if (Meteor.isClient) {

  // Template.template.collection = function () {
  //   return Coll.find({}).fetch();
  // };

  Meteor.autorun(function() {
    Meteor.subscribe("coll");
  });

  Meteor.Router.add({ 
    '/item/:page': function(page) {
      console.log('we are at ' + this.canonicalPath);
      // access parameters in order a function args too

      // Session.set('userProfile', user);
      // console.log(user);

      // var userExist = employerProfileHelpers.getUser(user);

      return 'template';
    }
  });
  // Template.template.events({
  //   'click input' : function () {
  //     // template data, if any, is available in 'this'
  //     if (typeof console !== 'undefined')
  //       console.log("You pressed the button");
  //   }
  // });
}

if (Meteor.isServer) {
  Meteor.publish("coll", function() { 
    return Coll.find({}, {fields: {}});
  });

  Meteor.startup(function () {
    // code to run on server at startup
  });
}


Paginate = {
  coll: '',
  itemPerPage: '',
  config: function(Collection, itemPerPage){
    Paginate.coll = Collection;
    Paginate.itemPerPage = itemPerPage;
  },
  collectionCount: function(){
    return Paginate.coll.find({}).count();
  },
  totalPages: function(){
    return Paginate.coll.find({}).count()/Paginate.itemPerPage;
  }
};
