var $lib = function(selector, context){

	return new $lib.init(selector, context);
};

(function(){
	$lib.init = function(selector, context){

		this.target = [];

		// No target
		if($lib.isEmpty(selector)) $lib.error("An argument must be passed");

		// Getting the target
		switch(typeof selector){

			// Assume a selector is being passed
			case "string":
				this.target = $lib.getQueries(selector, context);
			break;

			case "object":

				var isArray = JSON.stringify(selector).charAt(0) === "[" ? true : false;

				if(isArray){
					$lib.error("Arrays are not supported selectors");
				}

				else {
					var query = "";

					if($lib.hasProperty(selector, "id")) query += "#" + selector.id;
					if($lib.hasProperty(selector, "class")) query += "." + selector.class;
					if($lib.hasProperty(selector, "type")) query = selector.type + "";

					this.target = $lib.getQueries(query, context);
				}

			break;
		}
	};

	// Defining the extend function
	$lib.extend = function(extending, obj){

		// No arguments passed
		if(!extending || typeof extending !== "object"){

			// Extending functions
			if(obj && typeof extending === "function"){

			}

			else {
				$lib.error("At least one object must be provided when using $lib.extend");
			}
		}

		// Extend $lib object if only 1 element is passed
		if(!obj || typeof obj !== "object"){
			for(var a in extending){
				$lib[a] = extending[a];
			}

			return $lib;
		}

		else {
			for(var b in obj){
				extending[b] = obj[b];
			}

			// If multiple objects are passed
			if(arguments.length > 2){
				for(var c in arguments){

					// Skip the first arguments to avoid duplicates
					if(c < 2) continue;
					$lib.extend(extending, arguments[c]);
				}
			}

			return extending;
		}
	}

	// Extending the $lib DOM
	$lib.extend($lib.init.prototype, {

		html: function(html){
			if($lib.isEmpty(html)) html = "";

			for(var a in this.target){
				this.target[a].innerHTML = html;
			}
		}
	});

	// Extending the $lib
	$lib.extend($lib, {

		version: 0.001,
		framerate: 60,

		error: function(msg){
			$lib.calledErrors.push({ msg: msg, when: new Date() });

			throw new Error(msg);
		},

		calledErrors: [],

		isEmpty: function(testing){
			if(testing == void 8 || !testing || testing == [] || testing == {}) return true;
		},

		getQueries: function(selector, context){
			context = context || document;

			if($lib.isEmpty(selector)) $lib.error("An argument must be passed");

			try {
				var queries = context.querySelectorAll(selector);
			}

			catch (err){
				$lib.error("Invalid context provided, context needs to have function querySelectorAll");
				return $lib.calledErrors[$lib.calledErrors.length - 1];
			}

			return queries;
		},

		hasProperty: function(object, prop){

			// No object passed
			if(typeof object !== "object" || JSON.stringify(object).charAt(0) !== "{" || object === {} || JSON.stringify(object).length < 7){
				$lib.error("First argument passed must be an object when using $lib.hasProperty");

				return false;
			}

			// No property passed
			if(typeof prop !== "string" || prop === ""){
				return $lib.error("Second argument passed must be a string when using $lib.hasProperty");
			}

			// Testing if it has property
			if(object.hasOwnProperty(prop)){

				// Test if it's empty
				if($lib.isEmpty(object[prop])) return false;

				return true;
			}

			return false;
		},

		// Make it possible to use arrays
		getScript: function(url, appendTo){
			if(!url){
				$lib.error("A URL must be passed when using $lib.getScript");
			}

			var script = document.createElement("script");
			script.setAttribute("src", url);
			script.setAttribute("type", "text/javascript");

			if(appendTo){
				try {
					if(appendTo instanceof HTMLElement){
						return appendTo.appendChild(script);
					}

					else {
						console.warn("$lib: appendTo variable isn't HTML, $lib will ignore it and append the script to the head element");

						return document.head.appendChild(script);
					}
				}

				catch(err){
					console.warn("$lib: Your browser doesn't support instanceof, script will be appended to the head element");

					return document.head.appendChild(script);
				}
			}

			else {
				return document.head.appendChild(script);
			}
		},

		getStyle: function(url, appendTo){
			if(!url){
				$lib.error("A URL must be passed when using $lib.getStyle");
			}

			var style = document.createElement("link");
			style.setAttribute("href", url);
			style.setAttribute("rel", "stylesheet");
			style.setAttribute("type", "text/css");

			if(appendTo){
				try {
					if(appendTo instanceof HTMLElement){
						return appendTo.appendChild(style);
					}

					else {
						console.warn("$lib: appendTo variable isn't HTML, $lib will ignore it and append the style to the head element");

						return document.head.appendChild(style);
					}
				}

				catch(err){
					console.warn("$lib: Your browser doesn't support instanceof, style will be appended to the head element");

					return document.head.appendChild(style);
				}
			}

			else {
				return document.head.appendChild(style);
			}
		},

		ajax: function(){

			// Modern browsers
			if(window.XMLHttpRequest){
				return new XMLHttpRequest();
			}

			// Older browsers
			else {
				return new ActiveXObject("Microsoft.XMLHTTP");
			}
		},

		ajaxGet: function(url){

			if($lib.isEmpty(url)) return $lib.error("A URL must be passed when using $lib.ajaxGet");

			var request = $lib.ajax();

			request.open("GET", url, true);

			return request;
		},

		getjQuery: function(){
			if(document.querySelector("script[src='http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js']") != void 8){
				$lib.error("Another instance of jQuery added by $lib is already running");
			}

			var jQueryScript = document.createElement("script");
			jQueryScript.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js");
			document.head.appendChild(jQueryScript);
		},

		removejQuery: function(){
			var jQueryScript = document.querySelector("script[src='http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js']");

			if(jQueryScript == void 8){
				$lib.error("No jQuery script added by $lib was found");
			}

			$ = jQuery = void 8;

			jQueryScript.parentNode.removeChild(jQueryScript);
		}

	});
})();
