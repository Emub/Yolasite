$(document).on("ready", function(){

	// Remove the hidious body ID attribute
	document.body.removeAttribute("id");

	var createCORSRequest = function(method, url) {

		var xhr = new XMLHttpRequest();
		if ("withCredentials" in xhr) {

			// Check if the XMLHttpRequest object has a "withCredentials" property.
			// "withCredentials" only exists on XMLHTTPRequest2 objects.
			xhr.open(method, url, true);

		} else if (typeof XDomainRequest != "undefined") {

			// Otherwise, check if XDomainRequest.
			// XDomainRequest only exists in IE, and is IE's way of making CORS requests.
			xhr = new XDomainRequest();
			xhr.open(method, url);

		} else {

			// Otherwise, CORS is not supported by the browser.
			xhr = null;

		}

		return xhr;
	};

	// Setting the "please wait" text
	$("body").html("<h1 style='text-align: center; position: fixed; top: 0; left: 0; right: 0; bottom: 0; margin: auto; font: 72px Calibri; height: 180px'>Please wait. <br><br>Blame Yola for loading times, not me!</h1>");

	// Making a Site class
	var Site = function(){

		// Set time of initiation
		this.initTime = new Date().getTime();

		// Defining the init function
		this.init = function(HTML, refresh){

			Site.prototype.isInitted = true;

			// Removing spam
			setTimeout(site.cleanup, 2000);
			setTimeout(site.cleanup, 10000);
			setTimeout(site.cleanup, 30000);

			// Setting the HTML
			$("body").html(HTML);

			// Do not run if refreshing
			if(!refresh){

				// mubLib stylesheet
				$lib.getStyle("https://raw.githubusercontent.com/Emub/Yolasite/master/yolaStyle.css");

				// Tweenmax
				$("<script>", { src: "http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js" }).appendTo("head");

				// Page title. jQuery didn't work or give me any feedback
				var title = document.createElement("title");
				title.innerHTML = "Emubs Yolasite!";

				// Appending the page title
				document.head.appendChild(title);
			}

			/*

				Right click easter egg

			*/

			$("*").on("contextmenu", function(e){

				// Ignore if already spinning
				if( document.body.getAttribute("class") === "spin"){
					return false;
				}

				// Make it spin
				document.body.setAttribute("class", "spin");

				// Stop it from spinning
				setTimeout(function(){
					document.body.removeAttribute("class");
				}, 500);

				// Disable context menu
				return false;
			});

			// Shown variables
			var mubChatShown = false,
			xatShown = true;

			// Big PR2 button event handler
			$("#bigPr2").on("click", function(){

				// Testing to see if it's large or small
				if(parseFloat($("#pr2").css("width")) > 550){
					
					// Animated size change
					TweenMax.to("#pr2", 0.7, { css: { width: "550px", height: "400px" }, ease: "Elastic.easeOut" });

					// mubChat size
					TweenMax.to("#mubChat", 0.7, { css: { height: "400px" }, ease: "Elastic.easeOut" });

					// Button text change
					$("#bigPr2").html("Big PR2");
				}

				else {

					// Animated size change
					TweenMax.to("#pr2", 0.7, { css: { width: "687px", height: "500px" }, ease: "Elastic.easeOut" });

					// mubChat size
					TweenMax.to("#mubChat", 0.7, { css: { height: "500px" }, ease: "Elastic.easeOut" });

					// Button text change
					$("#bigPr2").html("Small PR2");
				}
			});

			// Xat button event handler
			$("#xatButton").on("click", function(){

				// Checking to see if mubChat is shown
				if(!mubChatShown) return false;

				// Setting the variables
				mubChatShown = false;
				xatShown = true;

				// Removing the mubChat
				$("#mubChat").remove();

				// Adding the Xat
				$('<embed src="http://www.xatech.com/web_gear/chat/chat.swf" wmode="transparent" bgcolor="#000000" width="550" height="400" flashvars="id=188075438&amp;xc=36128&amp;cn=175192939&amp;gb=9U6Gr&amp;gn=pr2godness" type="application/x-shockwave-flash" id="xat"></embed>').insertAfter("#pr2");
				
			});

			// mubChat button event handler
			$("#mubChatButton").on("click", function(){

				// Checking to see if Xat is shown
				if(!xatShown) return false;

				// Setting the variables
				xatShown = false;
				mubChatShown = true;

				// Removing the Xat
				$("#xat").remove();

				// Adding the mubChat
				$("<iframe src='http://web.mubsite.com/chat' id='mubChat'></iframe>").insertAfter("#pr2");

			});

			// Simming button event handler
			$("#simButton").on("click", function(){

				// Checking to see if simming or not
				if($("#simButton").html() === "Normal PR2"){

					// Reset the page
					site.init(site.loadedHTML.main, true);
				}

				else {

					// Remove the game and chat
					$("#pr2, #mubChat, #xat").remove();

					// Append first pr2 window
					$('<object id="pr2" type="application/x-shockwave-flash" data="http://cdn.jiggmin.com/games/platform-racing-2/platform-racing-2-loader-v13.swf" style="width: 412px; height: 300px;"></object>').prependTo("#gameContainer");

					// Appending the chat
					if(xatShown){
						$('<embed src="http://www.xatech.com/web_gear/chat/chat.swf" wmode="transparent" bgcolor="#000000" width="550" height="400" flashvars="id=188075438&amp;xc=36128&amp;cn=175192939&amp;gb=9U6Gr&amp;gn=pr2godness" type="application/x-shockwave-flash" id="xat"></embed>').insertAfter("#pr2");
					}

					else {
						$("<iframe src='http://web.mubsite.com/chat' id='mubChat' style='width: 600px; height: 400px;'></iframe>").insertAfter("#pr2");
					}

					// Appending the other 3 pr2 windows
					$('<object id="pr2x" type="application/x-shockwave-flash" data="http://cdn.jiggmin.com/games/platform-racing-2/platform-racing-2-loader-v13.swf" style="width: 412px; height: 300px;"></object>').appendTo("#gameContainer");
					$('<object id="pr2y" type="application/x-shockwave-flash" data="http://cdn.jiggmin.com/games/platform-racing-2/platform-racing-2-loader-v13.swf" style="width: 412px; height: 300px;"></object>').appendTo("#gameContainer");
					$('<object id="pr2z" type="application/x-shockwave-flash" data="http://cdn.jiggmin.com/games/platform-racing-2/platform-racing-2-loader-v13.swf" style="width: 412px; height: 300px;"></object>').appendTo("#gameContainer");

					// Line break for wide screens
					if($(window).width() > 1789) $("<br>").insertAfter("#pr2x");

					// Change text on the simming button
					$("#simButton").html("Normal PR2");
				}

			});
			
			// PR2 spin event handler
			$("#pr2Spin").on("click", function(){

				// Toggles "spin" class
				$("object#pr2").toggleClass("spin");
			});

			// PR2 reverse event handler
			$("#pr2Reverse").on("click", function(){

				// Toggles "reverse" class
				$("object#pr2").toggleClass("reverse");
			});

			// Rank calculator button
			$("#rankCalc").on("dblclick", function(){

				// Setting the loaded HTML
				$("body").html(site.loadedHTML.expCalc);

				// Calculator script
				$("#rankCalc").on("click", function(){

					// Printing the result
					$("#resultDiv").html(Site.prototype.calcExp($("#rankInput").val()));

				});

				$("#expNeededToGetTo").on("click", function(){

					// Printing the result
					$("#resultDiv").html(Site.prototype.expNeededToGetTo($("#rankInput").val()));
				});

				$("#goBack").on("click", function(){

					// Setting the HTML back to what it was
					site.init(site.loadedHTML.main, true);
				});
			});
		};
	};

	$lib.extend(Site.prototype, {

		isInitted: false,

		loadedHTML: {
			main: '<h1 id="siteHeader">Emubs Yolasite</h1><br /><div id="bigPr2" class="divButton">Big PR2</div><div id="pr2Spin" class="divButton">Spin PR2</div><div id="pr2Reverse" class="divButton">Reverse PR2</div><div id="simButton" class="divButton">Simming</div><div id="gameContainer"><object type="application/x-shockwave-flash" data="http://chat.kongregate.com/gamez/0001/0110/live/platform-racing-2-loader-v13.swf?kongregate_game_version=1362615086" width="550" height="400" id="pr2"></object><embed src="http://www.xatech.com/web_gear/chat/chat.swf" wmode="transparent" bgcolor="#000000" width="550" height="400" flashvars="id=188075438&amp;xc=36128&amp;cn=175192939&amp;gb=9U6Gr&amp;gn=pr2godness" type="application/x-shockwave-flash" id="xat"></embed></div><div id="mubChatButton" class="divButton small">mubChat</div><div id="xatButton" class="divButton small">Xat</div><div id="rankCalc" class="divButton small">Exp calc</div>',
			expCalc: '<h2>If you enter a number too high your computer will die. I am not responsible for your PCs death and will in no way fund or help fund its funeral.</h2><input id="rankInput" type="text" maxlength="3" /><input id="rankCalc" type="button" value="Calculate" /><input id="expNeededToGetTo" type="button" value="Exp needed to get to that rank" /><div id="resultDiv"></div><br><br><input id="goBack" type="button" value="Back to site" />'
		},

		// Defining the cleanup function
		cleanup: function(){

			// Taking care of iframes
			$("iframe").remove();

			// Weird stuff I found
			$("#dp_swf_engine, #sfMsgId").remove();

			// Taking care of yola CSS
			$("head style, head script").remove();

			// Weird stylesheet i found
			$("link[href='http://www.superfish.com/ws/css/main.css?v=13.1.1.37']").remove();

			// Fix multiple titles
			if($("title").length > 1){
				$($("title")[0]).remove();
			}
		},

		calcExp: function(rank){

			// If invalid rank is passed
			if(parseFloat(isNaN(rank))){

				alert("Invalid rank");
				return $lib.error("Invalid rank passed for calculation");
			}

			if(rank === 0) var exception = 1;

			// Calculating. Formula: 30 * 1.25 ^ rank
			return exception || Math.floor(30 * Math.pow(1.25, rank));
		},

		expNeededToGetTo: function(rank){

			// If invalid rank is passed
			if(parseFloat(isNaN(rank))){

				alert("Invalid rank");
				return $lib.error("Invalid rank passed for calculation");
			}

			// Make a result variable
			var result = 0;

			// Loop running for every rank
			for(var i = 0; i < rank; i++){

				// Adding the exp needed for that rank
				result += Site.prototype.calcExp(i);
			}

			// Returning the result
			return result;
		}
	});

	var site = new Site();

	// Initialize the site
	return site.init(site.loadedHTML.main);
});

/*
	Fix yola sometimes being a huge fuckwit
*/

var loadTimeout = setTimeout(function(){

	// Test if document is ready
	if(document.readyState !== 'complete'){

		// Simulate document ready
		$(document).triggerHandler("ready");
	}

}, 5000);
