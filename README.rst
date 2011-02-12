====
Path
====

Adding active classes is very common in navigational elements in order to style an 'active state'. This is normally added server-side using sometimes complicated logic.

As a compelling alternative for front-end developers and designers, ``:path`` uses javascript and jQuery to parse the window.location and match it with href attributes. The plugin works recursively, meaning it can take the entire path to your page, match it with anchor hrefs and return navigational anchor elements that points to the page's ancestors, as well as itself. Use CSS or jQuery to parse and style the active elements properly.

``:path`` is a pseudo-class, so you can continue the chain for easy manipulation.

In addition to the :path selector, the package also includes a :current pseudo-class that targets the anchor that links to the current page.

Usage
=====

Since :path is a pseudo-class, implementation is dead-easy. The following example will add an 'active' class to the filtered anchors parent inside every <ul>::

    $('ul a:path').parent().addClass('active');

``:path`` also comes with the similar pseudo-class, ``:current`` that targets the current page::

    $('ul a:current').parent().addClass('current');

The difference is that while ``:path`` filters out all anchors pointing to parent locations, ``:current`` only filters out the anchors pointing to the exact same page that you are at.