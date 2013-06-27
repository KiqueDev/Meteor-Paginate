Coll1 = new Meteor.Collection("coll1");


// Paginate = {
//   coll: '',
//   itemPerPage: '',
//   config: function(options){
//     Paginate.coll = options.collection;
//     Paginate.perPage = options.perPage;
//     Paginate.template = options.template;
//   },
//   collectionCount: function(){
//     return Paginate.coll.find({}).count();
//   },
//   totalPages: function(){
//     return Paginate.coll.find({}).count()/Paginate.perPage;
//   }
// };
Paginate = function(options){
    this.coll = options.collection;
    this.perPage = options.perPage;
    this.name = options.name;
    this.results = new Meteor.Collection(null);
    Paginate[this.name] = this;
}

Paginate.prototype.totalPages = function(){
  return Math.ceil(this.coll.find({}).count() / this.perPage);
}
Paginate.prototype.calculate= function(page){
  this.results.remove({});
  var items = this.coll.find({},{skip:(page-1)*this.perPage, limit:this.perPage}).fetch();
  var self = this;
  items.forEach(function(item){
    self.results.insert(item);
  });
}
// var p1 = new Paginate();
// Paginate.SOME_CONSTANT

if (Meteor.isClient) {

  var P1 = new Paginate({collection:Coll1, perPage:4, name:'p1'});


  //Paginate.config({collection:Coll, perPage:5, template:''});

  // Template.template.collection = function () {
  //   return Coll.find({}).fetch();
  // };

  // Meteor.startup(function(){
  //   console.log("startup called");
  // });
  //   Handlebars.registerHelper("paginate_pagesBar", function(name) {
  //     console.log(name);
  //     return Template.paginate_pages({totalPages: Paginate[name].totalPages()});
  //   });

  // Handlebars.registerHelper("paginate_pagesBar", function(name) {
  //   console.log(name);
  //   return Template.paginate_pages({totalPages: Paginate[name].totalPages()}).invalidate();
  //   // return Template.paginate_pages.totalPages = function(){
  //   //   return Paginate[name].totalPages();
  //   // }
  //   // return Template.paginate_pages({
  //   //   totalPages : Paginate[name].totalPages()
  //   // });
  //   //Template.paginate_pages({totalPages: Paginate[name].totalPages()});
  //   //return Paginate[name].totalPages();
  // });

  // Template.paginate_pages.totalPages = function (name) {
  //   return Paginate[name].totalPages;
  // }; 
  Template.paginate_pages.events({
    'click .previous': function(e){
      e.preventDefault();
      //console.log(e);
      var cP = parseInt(Session.get("currentPage"), 10)-1;
      var name = Session.get("paginateName");
      if(cP > 0){
        Meteor.Router.to("/"+ name +"/" + cP);
      }
      // if(cP === 1){
      //   console.log($(e.target));
      //   $(e.target).parent().addClass("disabled");
      // }
    },
    'click .next': function(e){
      e.preventDefault();
      //console.log(e);
      var cP = parseInt(Session.get("currentPage"), 10)+1;
      var name = Session.get("paginateName");
      var totalPages = Session.get("totalPages");
      if(cP <= totalPages){
        Meteor.Router.to("/"+ name +"/" + cP);
      }

    }

  });

  Template.paginate_pages.data = function () {
    var currentPage = Session.get("currentPage");
    var totalPages =  Session.get("totalPages");

    var obj = {
      currentPage : currentPage,
      totalPages : totalPages
    }
    return obj;
  };


  Template.template1.collection1 = function () {
    return Paginate.p1.results.find({});
  };

  Meteor.Router.add({ 
    '/:name/:page': function(name, page) {
      console.log('we are at ' + this.canonicalPath);
      if(Paginate[name]){
        var paginate = Paginate[name];
        paginate.calculate(page);

        Session.set("totalPages", paginate.totalPages());
        Session.set("currentPage", page);
        Session.set('paginateName', name);
      }else{
        alert("error");
      }
    }
  });


  Meteor.autorun(function() {
    Meteor.subscribe("coll1");

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
  Meteor.publish("coll1", function() { 
    return Coll1.find({}, {fields: {}});
  });
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

