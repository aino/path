====
Path
====

:path is a useful jQuery selector. It filters out anchor elements where the href attribute matches the window.location path, including ancestors.

Adding active classes is very common in navigational elements in order to style an 'active state'. This is normally added server-side using sometimes complicated logic.

As a compelling alternative for front-end developers and designers, :path uses javascript and jQuery to parse the window.location and match it with href attributes. The plugin works recursively, meaning it can take the entire path to your page, match it with anchor hrefs and return navigational anchor elements that points to the page's ancestors, as well as itself. Use CSS or jQuery to parse and style the active elements properly.

:path is a pseudo-class, so you can continue the chain for easy manipulation.

In addition to the :path selector, the package also includes a :current pseudo-class that targets the anchor that links to the current page.


Features
========

Works on all relative href paths (including '../') as well as absolute paths
Returns empty if the href points to root
Ignores a custom array of file names, such as index.html
Works on query strings, such as ?s1=home&s2=blog
includes a :current pseudo-class so you can style the anchor that links to the current page location
Tested in Safari 3, Firefox 2, MSIE 6, MSIE 7, Opera 9

Usage
=====

Since :path is a pseudo-class, implementation is dead-easy. The following example will add an 'active' class to the filtered anchors parent inside every <ul>:

$('ul a:path').parent().addClass('active');

:path also comes with the similar pseudo-class :current that targets the current page. Since Nielsen says that you should never have a link that points to the current page, the following example replaces the anchor that points to the current page with it's containing text:

$('ul a:current').each(function() { 
    $(this).replaceWith($(this).text()); 
});

Options
=======

:path comes with two options

strictQuery - a boolean that sets if the script should ignore the order of query strings or not. Example: $.path.strictQuery = false; means that ?a=b&c=d equals ?c=d&a=b. Defaults to true.
ignoreFiles - an array of file names to ignore when comparing, so that / equals /index.html and /index.php etc. Defaults to ['index.htm','index.html','index.shtml','index.cgi','index.php'].
You can override the defaults like this (example):

$.path.strictQuery = false;

$.path.ignoreFiles = ['default.asp','home.html'];

License
=======
:path is currently licensed under the GPL license.