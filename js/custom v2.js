$(document).ready(function(){

	// adding an event listener to when the user clicks one of the audio-icons
	$(document).on('click', ".audio_link" ,function(){
		var article_index = $(this).attr("id");
		var article_section = $(this).attr("class").split(" ")[1];
		readHeadline(article_index,article_section);
	});


	// getting the web speech api to read the message, based upon an article's index (in an array of their titles) and the section (sports,tech,politics) 
	function readHeadline(index,section){
		section_array = window[section];
		title = section_array[index];		
		var message = new SpeechSynthesisUtterance(title);
		window.speechSynthesis.speak(message);
		
	}


	// $.getJSON("http://content.guardianapis.com/search?api-key=jfrkfza276q5uz48kgwsrmp3&q=sports", function(json){
	// 	console.log(json);
	// 	$('#content').html(json.response.results[0].webTitle);
	// });

	var cats = ["technology","sport","politics"];

	var baseURL = "http://content.guardianapis.com/search?section="
	var key = "&api-key=jfrkfza276q5uz48kgwsrmp3"

	for(var i=0; i<cats.length; i++){

		var search = "sport" //cats[i];
		var callurl = baseURL+search+key;

		var ol = document.getElementById(search + "-articles");
		// tech articles
		$.ajax({
	    url: callurl,
	    dataType: 'jsonp',
	    success: function(json){
	    		var articles_titles = [];
	    		var articles_array = [];
		        var title = json.response.results[0].webTitle;
		        for(i=0; i<10; i++){
		        	articles_array.push('<li>' + '<a href=' + json.response.results[i].webUrl + ' id="link' + i + '"">' + json.response.results[i].webTitle + '</a>' + '<a href="#" class="audio_link tech_articles_titles"  id="' + i + '"><img class="audio" src="img/audio.png"></a></li>');
		        	articles_titles.push(json.response.results[i].webTitle);
		        };
	
		        //appending the tech articles to the DOM
		        $(ol).append(articles_array.join(""));
	    	}
		});

	}


		// politics articles
			$.ajax({
    url: "http://content.guardianapis.com/search?section=politics&api-key=jfrkfza276q5uz48kgwsrmp3",
    dataType: 'jsonp',
    success: function(json){
    		console.log(json);
    		console.log(json.response.results[0].id);
    		console.log(json.response.results[0].webUrl);
    		politics_articles_titles = [];
    		var politics_articles_array = [];
	        var title = json.response.results[0].webTitle;
	        for(i=0; i<10; i++){
	        	politics_articles_array.push('<li>' + '<a href=' + json.response.results[i].webUrl + ' id="link' + i + '"">' + json.response.results[i].webTitle + '</a>' + '<a href="#" class="audio_link politics_articles_titles"  id="' + i + '"><img class="audio" src="img/audio.png"></a></li>');	
	        	politics_articles_titles.push(json.response.results[i].webTitle);        	
	        };
	        
	   	//appending the sport articles to the DOM
        $('#politics-articles').append(politics_articles_array.join(""));
    	}
	});


	$("#add").click(function(){

		$("li").removeClass("active");
		$("div").removeClass("tab-pane fade in active");
		
		var search = document.getElementById("input").value;
		cats.push(search);

		$("#category").html("").append(search);

		$("#myTab").append("<li class='active'><a href='#" + search + "' data-toggle='tab'>Added: " + search + "</a></li>");

		$("#myTabContent").append("<div class='tab-pane fade in active' id='" + search + "'><ol id = '" + search + "-articles'></ol></div>");

	});



});