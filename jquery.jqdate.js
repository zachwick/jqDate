(function ($) {
    var methods = {
	init : function (options) {
	    var options = $.extend({
		width:"450px",
		height:"300px",
		date:new Date(),
		prevImg:"../CuckooCoffee/static/img/arrow-calendarbutton-",
		nextImg:"../CuckooCoffee/static/img/arrow-nextbutton-",
		dateImg:"../CuckooCoffee/static/img/arrow-timeslot-button.png"
	    },options);

	    //Global vars
	    var weekCounter = 0;
	    jqDays = new Array();
	    jqDays[0] = new Array();
	    jqDays[1] = new Array();
	    jqDays[2] = new Array();
	    jqDays[3] = new Array();
	    jqDays[4] = new Array();
	    jqDays[5] = new Array();

	    //Methods
	    activateTimes = function(row) {
		$("#jqdate-time-table-row-"+row).children("td").each(function() {
		    $(this).addClass("active");
		    //$(this).bind("click",returnSelected());
		});
		$("#jqdate-time-table-row-"+row).siblings().each(function() {
		    $(this).children().each(function() {
			$(this).removeClass("active");
			//$(this).unbind("click");
		    });
		});
	    };
	    /*returnSelected = function(wrapper) {
		console.log("In _returnSelected. Params are: "+wrapper);
		var today = new Date();
		var year  = today.getFullYear();
		var month = today.getMonth();
		var day   = parseInt($(".jqdate-header-date.selected").children(".jqdate-header-num").html());
		alert(day);
	    };*/
	    selectTime = function(timeID) {
		$("#"+timeID).siblings().each(function() {
		    $(this).removeClass("selected");
		});
		$("#"+timeID).addClass("selected");
	    };
	    getNextWeek = function() {
		if (weekCounter < 5) {
		    removeSelection();
		    var lastDate = parseInt($("#jqdate-wrapper").children("#jqdate-header").children(".jqdate-header-date").last().children(".jqdate-header-num").html());
		    var date = new Date();
		    switch(date.getMonth()) {
		    case 0:
			var modder = 31+1;
			break;
		    case 1:
			var modder = 28+1;
			//What about leap years?
			break;
		    case 2:
			var modder = 31+1;
			break;
		    case 3:
			var modder = 30+1;
			break;
		    case 4:
			var modder = 31+1;
			break;
		    case 5:
			var modder = 30+1;
			break;
		    case 6:
			var modder = 31+1;
			break;
		    case 7:
			var modder = 31+1;
			break;
		    case 8:
			var modder = 30+1;
			break;
		    case 9:
			var modder = 31+1;
			break;
		    case 10:
			var modder = 30+1;
			break;
		    case 11:
			break;
			var modder = 31+1;
		    }
		    var startDate = new Date(date.getFullYear(),date.getMonth(),lastDate+3);
		    for (var i=0;i<5;i++) {
			if ((startDate.getDate()+i) >= modder) {
			    var dispDate = ((startDate.getDate()+i) % modder)+1;
			} else {
			    var dispDate = ((startDate.getDate()+i) % modder);
			}
			jqDays[weekCounter+1][i] = dispDate;
			$("#jqdate-header-num-"+i).html(dispDate);
		    }
		    weekCounter = weekCounter + 1;
		}
	    };
	    getPrevWeek = function() {
		if (weekCounter > 0) {
		    removeSelection();
		    for (var i=0;i<5;i++) {
			$("#jqdate-header-num-"+i).html(jqDays[weekCounter-1][i]);
		    }
		    weekCounter = weekCounter - 1;
		}
	    };
	    removeSelection = function() {
		$(".jqdate-header-date").each(function() {
		    $(this).removeClass("selected");
		});
	    };
	    doSelect = function(idToSelect) {
		removeSelection();
		$("#jqdate-header-date-"+idToSelect).addClass("selected");
	    };
	    //DOM Element Creation
	    $(this).append("<div class='jqdate-wrapper' id='jqdate-wrapper'></div>");
	    $(this).children("#jqdate-wrapper").append("<div class='jqdate-header' id='jqdate-header'></div>");
	    $(this).children("#jqdate-wrapper").append("<div class='jqdate-body' id='jqdate-body'></div>");
	    $(this).children("#jqdate-wrapper").children("#jqdate-header").append("<div class='jqdate-date-nav-button' id='prev-week-button'></div>");
	    var confDate = new Date();
	    var dateOffset = 0 - confDate.getDay();
	    for (var i=0;i<5;i++) {
		$(this).children("#jqdate-wrapper").children("#jqdate-header").append("<div class='jqdate-header-date' id='jqdate-header-date-"+i+"' onclick='doSelect("+i+");'></div>");
		//Put in header dates here
		var date = new Date();
		var dateNum = date.getDate()+(i-1)-dateOffset;
		var dateStrNum = date.getDay()+(i-1)-dateOffset;
		switch (dateStrNum) {
		case 0:
		    var dateStr = "Sun";
		    break;
		case 1:
		    var dateStr = "Mon";
		    break;
		case 2:
		    var dateStr = "Tue";
		    break;
		case 3:
		    var dateStr = "Wed";
		    break;
		case 4:
		    var dateStr = "Thu";
		    break;
		case 5:
		    var dateStr = "Fri";
		    break;
		case 6:
		    var dateStr = "Sat";
		    break;
		case 7:
		    var dateStr = "Sun";
		    break;
		}
		$(this).children("#jqdate-wrapper").children("#jqdate-header").children("#jqdate-header-date-"+i).append("<div class='jqdate-header-str' id='jqdate-header-str-"+i+"'>"+dateStr+"</div>");
		$(this).children("#jqdate-wrapper").children("#jqdate-header").children("#jqdate-header-date-"+i).append("<div class='jqdate-header-num' id='jqdate-header-num-"+i+"'>"+dateNum+"</div>");
		jqDays[0][i] = dateNum;
		if (i == 1) {
		    $("#jqdate-header-date-"+i).addClass("selected");
		}
		//dateNums = [date.getDate()-1,date.getDate(),date.getDate()+1,date.getDate()+2,date.getDate()+3];
	    }
	    $(this).children("#jqdate-wrapper").children("#jqdate-header").append("<div class='jqdate-date-nav-button' id='next-week-button'></div>");
	    $(this).children("#jqdate-wrapper").children("#jqdate-header").children("#next-week-button").bind("click",function() {
		getNextWeek();
	    });
	    $(this).children("#jqdate-wrapper").children("#jqdate-header").children("#prev-week-button").bind("click",function() {
		getPrevWeek();
	    });
	    var table_html = "<table id='jqdate-time-table' class='jqdate-time-table'>";
	    for (var hour=8;hour<18;hour++) {
		var minutes = 0;
		table_html += "<tr class='jqdate-time-table-row' id='jqdate-time-table-row-"+hour+"'>";
		for (var col=0;col<4;col++) {
		    table_html += "<td class='jqdate-time-table-col-"+col+"' id='jqdate-time-table-col-"+hour+"-"+minutes+"' ";
		    if (col == 0) {
			table_html += " onclick='activateTimes("+hour+");'><img src='"+options.dateImg+"'/>";
		    } else {
			table_html += "'>";
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
	    //console.log();
	    $(this).children("#jqdate-wrapper").children("#jqdate-body").children("#jqdate-time-table").children("tbody").children(".jqdate-time-table-row").each(function() {
		$(this).children("td").each(function() {
		    $(this).bind("click",function() {
			selectTime($(this).attr('id'));
		    });
		});
	    });
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