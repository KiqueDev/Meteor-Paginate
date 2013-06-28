
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
Paginate.prototype.calculate = function(page){
  this.results.remove({});
  var items = this.coll.find({},{skip:(page-1)*this.perPage, limit:this.perPage}).fetch();
  var self = this;
  items.forEach(function(item){
    self.results.insert(item);
  });
}



Template.paginate_pages.events({
  'click .previous': function(e){
    e.preventDefault();
    //console.log(e);
    var cP = parseInt(Session.get("currentPage"), 10)-1;
    var name = Session.get("paginateName");
    if(cP > 0){
      Meteor.Router.to("/"+ name +"/" + cP);
    }
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


Template.paginate_pages.rendered = function () {
  var cP = Session.get("currentPage");
  var tP = Session.get("totalPages").toString();
  if(cP === "1"){
    $(".previous").addClass("disabled");
  }
  if(cP === tP){
    $(".next").addClass("disabled");
  }
};


Meteor.startup(function () {  
  // code to run on server at startup
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
});

        

