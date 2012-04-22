(function ($) {
    var methods = {
	init : function (options) {
	    var options = $.extend({
		width:"450px",
		height:"300px",
		date:new Date(),
	    },options);
	    console.log($(this));
	    $(this).append("<div class='jqdate-wrapper' id='jqdate-wrapper'></div>");
	    $(this).children("#jqdate-wrapper").append("<div class='jqdate-header' id='jqdate-header'></div>");
	    $(this).children("#jqdate-wrapper").append("<div class='jqdate-body' id='jqdate-body'></div>");
	    $(this).children("#jqdate-wrapper").children("#jqdate-header").append("<div class='jqdate-date-nav-button' id='prev-week-button'></div>");
	    for (var i=0;i<5;i++) {
		$(this).children("#jqdate-wrapper").children("#jqdate-header").append("<div class='jqdate-header-date' id='jqdate-header-date-"+i+"'></div>");
	    }
	    $(this).children("#jqdate-wrapper").children("#jqdate-header").append("<div class='jqdate-date-nav-button' id='next-week-button'></div>");
	    
	},
	hide : function () {

	},
	show : function () {

	}
    };
    $.fn.jqdate = function (method) {
	if (methods[method]) {
	    return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
	} else if (typeof method === 'object' || !method) {
	    return methods.init.apply(this,arguments);
	} else {
	    $.error("Method "+method+" does not exist of jQuery.jqdate");
	}
    };
})(jQuery);