// ============
// HELPERS
// ============

// Selector
function $(expr) { return d.querySelector(expr); }

// Key binding
function k(c, f, p){
	if (w.c === c) f(p);
}

// Get current day number
Date.prototype.getDOY = function(){
	return Math.ceil((this - new Date(this.getFullYear(),0,1)) / 86400000);
}

// Browser sniffing
var ua = (function(){
	var agent = navigator.userAgent.toLowerCase();
	return function(browser){
		return agent.indexOf(browser) !== -1;
	};
}());

var browser = {
	ie: ua('msie'),
	chrome: ua('chrome'),
	webkit: ua('chrome') || ua('safari'),
	safari: ua('safari') && !ua('chrome'),
	mozilla: ua('mozilla') && !ua('chrome') && !ua('safari')
};


// ============
// VARIABLES
// ============


var d = document,
	w = window,
	today = new Date(),
	todayInt = today.getDOY(),
	content,
	loaded,
	canvas = d.getElementsByTagName('canvas')[0],
	ctx = canvas.getContext('2d');

canvas.width = canvas.height = 16;


// ============
// FUNCTIONS
// ============



function setHash(param){
	if(param){
		w.location.hash = param;
	} else {
		hash = w.location.hash.replace("#","");
		
	}
}


function drawFavicon(n){

	ctx.clearRect(0, 0, 16, 16);

	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, 16, 3);
	ctx.fillStyle = "#272d70";
	ctx.fillRect(0, 3, 16, 13);

	if (n !== ""){
		n = n[2] ? n : "0" + (n[1] ? n : "0" + n[0]);
	}

	ctx.fillStyle = "#fff";
	ctx.font = "6pt Arial";
	ctx.fillText(n, 2, 12);

	if (browser.chrome){
		$('[rel="shortcut icon"]').setAttribute("href", canvas.toDataURL());
	} else {
		var link = d.createElement('link'),
			oldLink = $('[rel="shortcut icon"]');
		link.type = "image/png";
		link.rel = "shortcut icon";
		link.href = canvas.toDataURL();
		if (oldLink) {
			d.head.removeChild(oldLink);
		}
		d.head.appendChild(link);
	}
}


// ============
// EVENTS
// ============


d.onkeydown = function(e){
	e.preventDefault();
	w.c = e.keyCode;

	k(37, navDate, -1); // Left
	k(39, navDate, 1); // Right

	k(116, refresh); // F5
};

w.onhashchange = function(){
	run();
};

w.onload = function(){
	//run();
};




// ==================
// RUN YOU CLEVER BOY
// ==================

//setHash();
