# Building 3rd Party Widgets with JavaScript

Example code prepared for the [Baltimore JavaScript Meetup January 31 2012](http://www.meetup.com/baltimore-dc-javascript-users/events/35051872/)

This example code will run in a PHP container (Apache). The 'server' dir is the document root. The 'client/index.html' is the reference implementation of the widget, embedded in another site. Open client/index.html in a browser (open the file directly) and interact with the server widget.

## Important Concepts

* the widget loads its own js and css, including jQuery from a CDN
* cleanslate is used to reset the style of the widget container
* an anonymous function is used to keep all of the widget code from colliding with client code on the host page
* JSONP is used to send information back to the server (more sophisticated techniques exist, like CORS or PostMessage)
* the JSONP destination is actually a PHP script