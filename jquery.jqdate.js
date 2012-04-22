(function ($) {
    var methods = {
	init : function (options) {
	    var options = $.extend({
		width:"450px",
		height:"300px",
		date:new Date(),
	    },options);

	    //Methods
	    activateTimes = function(row) {
		$("#jqdate-time-table-row-"+row).children("td").each(function() {
		    $(this).addClass("active");
		});
		$("#jqdate-time-table-row-"+row).siblings().each(function() {
		    $(this).children().each(function() {
			$(this).removeClass("active");
		    });
		});
	    };
	    returnSelected = function(wrapper) {
		console.log("In _returnSelected. Params are: "+wrapper);
	    };

	    //DOM Element Creation
	    $(this).append("<div class='jqdate-wrapper' id='jqdate-wrapper'></div>");
	    $(this).children("#jqdate-wrapper").append("<div class='jqdate-header' id='jqdate-header'></div>");
	    $(this).children("#jqdate-wrapper").append("<div class='jqdate-body' id='jqdate-body'></div>");
	    $(this).children("#jqdate-wrapper").children("#jqdate-header").append("<div class='jqdate-date-nav-button' id='prev-week-button'></div>");
	    for (var i=0;i<5;i++) {
		$(this).children("#jqdate-wrapper").children("#jqdate-header").append("<div class='jqdate-header-date' id='jqdate-header-date-"+i+"'></div>");
	    }
	    $(this).children("#jqdate-wrapper").children("#jqdate-header").append("<div class='jqdate-date-nav-button' id='next-week-button'></div>");
	    var table_html = "<table id='jqdate-time-table' class='jqdate-time-table'>";
	    for (var hour=8;hour<18;hour++) {
		var minutes = 0;
		table_html += "<tr class='jqdate-time-table-row' id='jqdate-time-table-row-"+hour+"'>";
		for (var col=0;col<4;col++) {
		    table_html += "<td class='jqdate-time-table-col-"+col+"' id='jqdate-time-table-col-"+hour+"-"+minutes+"' ";
		    if (col == 0) {
			table_html += " onclick='activateTimes("+hour+");'>";
		    } else {
			table_html += " onclick='returnSelected("+this.id+");'>";
		    }
		    var display_hour = hour;
		    var display_meridian = "AM";
		    var display_minutes = minutes;
		    if (hour > 12) {
			display_hour = hour % 12;
			display_meridian = "PM";
		    }
		    if (hour == 12) {
			display_meridian = "PM";
		    }
		    if (minutes == 0) {
			display_minutes = "00";
		    } else {
			display_minutes = minutes;
		    }
		    table_html += display_hour+":"+display_minutes+display_meridian;
                    table_html += "</td>";
		    minutes += 15;
		}
		table_html += "</tr>";
	    }
	    table_html += "</table>";
	    $(this).children("#jqdate-wrapper").children("#jqdate-body").append(table_html);
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