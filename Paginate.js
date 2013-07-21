
Paginate = function(collection, template, options){
  if(!collection){
    throw new Error("Collection not defined in Paginate");
  }
  if(!template){
    throw new Error("Template not defined in Paginate");
  }

  var settings = {
   perPage:5,
   pathName: collection._name,
   templateData: collection._name
  }

  if(options){
    _.extend(settings, options);
  }

  this.template = template;
  this.coll = collection;
  this.perPage = settings.perPage;
  this.pathName = settings.pathName;
  this.templateData = settings.templateData;

  this.Results = new Meteor.Collection(null);
  Paginate[this.pathName] = this;


  var self = this;
  Template[self.template][self.templateData] = function(){
    //console.log("RESULT " , Sessionget("results"));
    return Session.get("results");
  }
}

// // TODO
// Paginate.prototype.insert = function(query) {
//   return this.coll.insert(query);
// };


Paginate.prototype.previous = function () {
  $('.previous').click();
};

Paginate.prototype.next = function () {
  console.log('called next');
  $('.next').click();
};

Paginate.prototype.goTo = function(pageNum) {
  Meteor.Router.to("/"+ Session.get("paginateName") +"/" + pageNum);
};


Paginate.prototype.totalPages = function(){
  return Math.ceil(this.coll.find({}).count() / this.perPage);
}
Paginate.prototype.calculate = function(page){
  console.log("Calculating Pages...");
  this.Results.remove({});
  var items = this.coll.find({},{skip:(page-1)*this.perPage, limit:this.perPage}).fetch();
  var self = this;
  items.forEach(function(item){
    self.Results.insert(item);
  });
}


Template.paginate_pages.events({
  'click .previous': function(e){
    e.preventDefault();
    //console.log(e);
    var cP = parseInt(Session.get("currentPage"), 10)-1;
    var pathName = Session.get("paginateName");
    if(cP > 0){
      Meteor.Router.to("/"+ pathName +"/" + cP);
    }
  },
  'click .next': function(e){
    e.preventDefault();
    //console.log(e);
    var cP = parseInt(Session.get("currentPage"), 10)+1;
    var pathName = Session.get("paginateName");
    var totalPages = Session.get("totalPages");
    if(cP <= totalPages){
      Meteor.Router.to("/"+ pathName +"/" + cP);
    }
  },
  'change .pagerSelect': function(e){
    var pageNum = e.target.value;
    console.log(pageNum);
    Meteor.Router.to("/"+ Session.get("paginateName") +"/" + pageNum);
  }

});


Template.paginate_pages.tPages = function () {
  return  Session.get("totalPages");;
};

Template.paginate_pages.pages  = function(){
  var result = [];
  for(var i =1; i <= Session.get("totalPages"); i++){
    obj={
      index: i
    }
    result.push(obj);
  }
  return result;
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

  $(".pagerSelect").val(cP);
};



// code to run on server at startup
Meteor.Router.add({ 
  '/:pathName/:page': function(pathName, page) {
    console.log('We are at path: ' + this.canonicalPath);
    if(Paginate[pathName]){
      var paginate = Paginate[pathName];
      paginate.calculate(page);

      Session.set("totalPages", paginate.totalPages());
      Session.set("currentPage", page);
      Session.set('paginateName', pathName);
      Session.set('results', paginate.Results.find().fetch());
  
      return paginate.template;
    }else{
      alert("Error: No Routing");
    }
  }
});


        

