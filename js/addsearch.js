$(document).ready(function(){

	var cats =[];

	$("#add").click(function(){

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

	$("#tfnewsearch").click(function(){

	//	$("#categories").html("");
		
		cats.push(document.getElementById("input").value);
		console.log(cats);

		$("#category").html("");

		if(cats.length == 1){				
			$("#category").append(cats);
		}
		else
		{
			$("#category").append(cats + "");
		}

	});

});