/*!
 * Copyright (c) 2010, Aino - http://aino.se/
 * Usage: $('a:path').addClass('active');
 */
(function($){
    var path = {
	
    	// array of files to ignore
    	ignoreFiles : ['index.htm','index.html','index.shtml','index.cgi','index.php'],
	
    	// strict mode boolean
    	strictQuery : true,
	
    	// regexp for ignored file names
    	ignore : function() {
    		return new RegExp('('+this.ignoreFiles.join('|')+')','i');
    	},
	
    	// grab and parse the location
    	window : function() {
		
    		// define window.location as a short variable
    		var _l = window.location;
		
    		// grab the window path, split & and parse
    		var _w = _l.href.cleanPath(this.ignore()).split('/');
		
    		// grab the query string, split & sort if not in strict mode
    		var _q = _l.search.substring(1).length > 0 ? _l.search.substring(1).split('&') : [];
    		if (!this.strictQuery) { _q.sort(); }
		
    		// merge the arrays
    		return _w.concat(_q);
    	},
	
    	// grab and parse the anchor
    	anchor : function(_this) {
		
    		// grab the hrefs
    		var _org = _this.getAttribute('href',1);
		
    		// return false if node is not anchor or href is not present
    		if (!_org || _this.nodeName != 'A') { return false; }
		
    		var _l = window.location;
		
    		// parse href
    		var _href = _org.absUrl().cleanPath(this.ignore());
		
    		// return if href is root
    		if (_href === (_l.protocol + '//' + _l.hostname).replace(/www\./,'').noSlash()) {
    			return false;
    		}

    		// split href into path & query
    		var _s = _href.split("?");
    		var _a = _s[0].noSlash().split('/');
    		var _q = _s.length > 1 ? _s[1].split('&') : [];
		
    		// sort query if not in strict mode
    		if (!this.strictQuery) { _q.sort(); }
		
    		// merge the arrays
    		return _a.concat(_q);
		
    	},
	
    	compareArray : function(o,t) {
    		if (o.length != t.length) { return false; }
    		for (var i = 0; i < t.length; i++) {
    			if (o[i] !== t[i]) { 
    				return false;
    			}
    		}
    		return true;
    	},
	
    	// match the anchor with window
    	match : function(_this) {
	    
    	    if ($(_this).attr('href') == '#') {
    	        return false;
    	    }
		
    		var _a = this.anchor(_this);
    		var _w = this.window();
		
    		// check if root
    		if(_this.pathname.split('/').length < 3) {
    		    return this.compareArray(_w,_a);
    		}
    		// compare and return
    		return (_w.length < _a.length) ? false : this.compareArray(_w.slice(0,_a.length),_a);
		
    	},
	
    	current : function(_this) {
	    
    	    if ($(_this).attr('href') == '#') {
    	        return false;
    	    }

    		var _a = this.anchor(_this);
    		var _w = this.window();
		
    		// compare and return
    		//console.log(_this,_w,_a,this.compareArray(_w,_a))
    		return this.compareArray(_w,_a);
    	}
    };


    // Extend jQuery with the :path selector
    $.extend($.expr[":"], { path : function(a) { return path.match(a); } } );

    // Extend jQuery with the :current selector
    $.extend($.expr[":"], { current : function(a) { return path.current(a); } } );

    String.prototype.noSlash = function() {
    	return this.lastIndexOf('/') === this.length-1 || this.lastIndexOf('#') === this.length-1 ? this.substr(0,this.length-1) : this.toString();
    };


    String.prototype.absUrl = function() {
    	var l = window.location, h, p, f, i;
    	if (/^\w+:/.test(this)) {
    		return this.toString();
    	}
    	h = l.protocol + '//' + l.host;
    	if (this.indexOf('/') === 0) {
    		return h + this.toString();
    	}
    	p = l.pathname.replace(/\/[^\/]*$/, '');
    	f = this.match(/\.\.\//g);
    	if (f) {
    		var n = this.substring(f.length * 3);
    		for (i = f.length; i--;) {
    			p = p.substring(0, p.lastIndexOf('/'));
    		}
    	} else {
    		n = this.toString();
    	}
    	return h + p + '/' + n;
    };

    String.prototype.cleanPath = function(ignore) {
    	return this.replace(/www\./i,'').replace(ignore,'').replace(/\.\//,'').noSlash().toString();
    };
})(jQuery);
