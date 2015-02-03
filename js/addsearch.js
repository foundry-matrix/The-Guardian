	var cats =[];

	$("#searchs").click(function(){

		$("#list").html(" ")

		var baseURL = "http://content.guardianapis.com/search?q="
		var key = "&api-key=v2jpnga8trgw9x4p3u84yvrw"

		for(var i=0; i<cats.length; i++){

			var search = cats[i];

			$.getJSON(baseURL+search+key, function(data){

				$("#list").append(search);
					
				for (var i=0; i<2; i++){
					
					$("#list").append("<li><a href='" + data.response.results[i].webUrl + "'</a>" + data.response.results[i].webTitle + "</li>");
				}
			});
		}

	});

	$("#add").click(function(){

		$("li").removeClass("active");
		
		cats.length = 0;

		cats.push(document.getElementById("input").value);

		$("#category").html("").append(cats);

		for(var i=0; i<cats.length; i++){

			var category = cats[i];

			$("#myTab").append("<li class='active'><a href='#" + category + "' data-toggle='tab'>Added: " + category + "</a></li>")

		}

	});