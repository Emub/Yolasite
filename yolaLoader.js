(function(){
	var myScript = document.createElement("script"),
	jQueryScript = document.createElement("script"),
	mubLibScript = document.createElement("script");

	myScript.setAttribute("src", "https://dl.dropboxusercontent.com/u/77624511/yolasiteContent.js");
	jQueryScript.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js");
	mubLibScript.setAttribute("src", "https://dl.dropboxusercontent.com/u/77624511/mubLib.js");

	var clearSite = function(){
		clearTimeout(timeout);

		document.head.innerHTML = '';
		document.body.innerHTML = '';

		document.head.appendChild(myScript);
		document.head.appendChild(jQueryScript);
		document.head.appendChild(mubLibScript);
	};

	var timeout = setTimeout(function(){
		document.body.innerHTML = "<h1 style='text-align: center; position: fixed; top: 0; left: 0; right: 0; bottom: 0; margin: auto; font: 72px Calibri; height: 180px'>Please wait.</h1>";
	}, 100);

	$(document).on("ready", clearSite);
})();
