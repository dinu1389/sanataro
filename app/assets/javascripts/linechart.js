(function(window) {
    var selectedPlot = function(plot_id, choices_id, datasets) {
	var i = 0;
	$.each(datasets, function(key, val) {
            val.color = i;
           ++i;
	});
	
	var choiceContainer = $(choices_id);
	var all_check_id = "all_" + choices_id.replace(/#/gi,'');
	var check_prefix = "id" + choices_id.replace(/#/gi,'');
        choiceContainer.append('<input type="checkbox" name="' + all_check_id
			       + '" checked="checked" rel="all">'
			       + '<label for="' + all_check_id
			       + '">ALL</label> ');

	$.each(datasets, function(key, val) {
	    id = check_prefix + key;
            choiceContainer.append('<input type="checkbox" name="' + key +
				   '" checked="checked" id="' + id + '">' +
				   '<label for="' + id + '">'
                                   + val.label + '</label> ');
	});
	
	choiceContainer.find("input[rel!=all]").bind("change", plotAccordingToChoices);
	choiceContainer.find("input[rel=all]").bind("change", function() {
	    checked = $(this).attr("checked");
            choiceContainer.find("input[rel!=all]").each(function () {
		if (checked == "checked") {
		    $(this).attr("checked", "checked");
		} else {
		    $(this).removeAttr("checked");
		}
		plotAccordingToChoices();
	    });
	});

	function plotAccordingToChoices() {
            var data = [];

            choiceContainer.find("input:checked[rel!=all]").each(function () {
		var key = $(this).attr("name");
		if (key && datasets[key])
                    data.push(datasets[key]);
            });

            if (data.length > 0) {
		$.plot($(plot_id), data, {
                    xaxis: {
			mode: "time",
			timeformat: "%y/%m",
			tickSize: [1, "month"],
		    }
		});
	    }
	}

	plotAccordingToChoices();
    };

    var lineChart = function(plot_id, choices_id, data) {
	selectedPlot(plot_id, choices_id, data);
    };
    window.lineChart = lineChart;
})(window);


