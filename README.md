Meteor-Paginate
===============

Meteor package that provide developers a simple way to paginate collections.  

Checkout my <a href="http://paginate.meteor.com/">Live Demo</a>
<h2>Usage</h2>  
<pre>mrt add paginate  </pre>

-Make sure to publish and subscribe your collection before usage.   
Example:  

////// CLIENT SIDE  ///////////////   
Creates collection  
<pre>Coll = new Meteor.Collection("coll");  </pre>

Subscribe collection at autorun  
<pre>Meteor.autorun(function() {  
    Meteor.subscribe("coll");  
});  </pre>


Create object paginate. //Paginate(COLLECTION, TEMPLATE NAME, {OPTIONS});  
Default Settings in {OPTIONS}:  
{	
   perPage:5,	
   pathName: (your collection name in lowercase),	
   templateData: (your collection name in lowercase)  
}  
  
<b>perPage </b>is the number of item you want to show per page  
<b>pathName </b>is the path from the url where will direct you   
to your pageinate following by a number ex: ...pathName/1  
<b>templateData </b>is the data use in your template in your handlebars ex: {{#each <b>templateData</b>}} ....{{/each}}  

SINGLE USAGE:  
<pre>var P = new Paginate(Coll, "myTemplate"); </pre>  

MULTIPLE USAGE:  
<pre>var P1 = new Paginate(Coll1, "myTemplate", {perPage: 10, templateData:"sameTemplateData"}); </pre>
<pre>var P2 = new Paginate(Coll2, "myTemplate", {perPage: 2, templateData:"sameTemplateData"}); </pre>
  
Also you can use my embbedded template design to paginate <b>previous</b> or <b>next</b> pages by just adding the following in to your template   
<pre>{{> paginate_pages}}</pre>

////// SERVER SIDE  ///////////////   
Publish collection  
<pre>Meteor.publish("coll", function() {   
  return Coll.find({}, {fields: {}});  
});  </pre>
  
