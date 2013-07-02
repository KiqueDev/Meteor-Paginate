Meteor-Paginate
===============

Meteor package that provide developers a simple way to paginate collections.  

Checkout my <a href="http://paginate.meteor.com/pages/1">Live Demo</a>
<h2>Usage</h2>  
<pre>mrt add paginate  </pre>

-Make sure to publish and subscribe your collection before usage.   
Example:  
///////////////////////////////////  
////// CLIENT SIDE  ///////////////  
///////////////////////////////////  
//Creates collection  
<pre>Coll = new Meteor.Collection("coll");  </pre>

//Subscribe collection at autorun  
<pre>Meteor.autorun(function() {  
    Meteor.subscribe("coll");  
});  </pre>

//Create object paginate Paginate(Collection, int, string);   
<pre>var P = new Paginate({collection:Coll, perPage:5, name:'pages'}); </pre>

<pre>Template.myTemplate.collection = function () {  
    //return Paginate.pages.results.find({});  
    return P.results.find({});  
};  </pre>
  
///////////////////////////////////  
////// SERVER SIDE  ///////////////  
///////////////////////////////////  
//Publish collection  
<pre>Meteor.publish("coll", function() {   
  return Coll.find({}, {fields: {}});  
});  </pre>

