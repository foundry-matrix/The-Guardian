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

	// tech articles
	$.ajax({
    url: "http://content.guardianapis.com/search?section=technology&api-key=jfrkfza276q5uz48kgwsrmp3",
    dataType: 'jsonp',
    success: function(json){
    		console.log(json);
    		console.log(json.response.results[0].id);
    		console.log(json.response.results[0].webUrl);
    		var section = "tech";
    		tech_articles_titles = [];
    		var tech_articles_array = [];
	        var title = json.response.results[0].webTitle;
	        for(i=0; i<10; i++){
	        	tech_articles_array.push('<li>' + '<a href=' + json.response.results[i].webUrl + ' id="link' + i + '"">' + json.response.results[i].webTitle + '</a>' + '<a href="#" class="audio_link tech_articles_titles"  id="' + i + '"><img class="audio" src="img/audio.png"></a></li>');
	        	tech_articles_titles.push(json.response.results[i].webTitle);
	        };

	        //appending the tech articles to the DOM
	        $('#tech-articles').append(tech_articles_array.join(""));
    	}
	});


	// sport articles

		$.ajax({
    url: "http://content.guardianapis.com/search?section=sport&api-key=jfrkfza276q5uz48kgwsrmp3",
    dataType: 'jsonp',
    success: function(json){
    		console.log(json);
    		console.log(json.response.results[0].id);
    		console.log(json.response.results[0].webUrl);
    		sport_articles_titles = [];
    		var sport_articles_array = [];
	        var title = json.response.results[0].webTitle;
	        for(i=0; i<10; i++){
	        	sport_articles_array.push('<li>' + '<a href=' + json.response.results[i].webUrl + ' id="link' + i + '"">' + json.response.results[i].webTitle + '</a>' + '<a href="#" class="audio_link sport_articles_titles"  id="' + i + '"><img class="audio" src="img/audio.png"></a></li>');	
	        	sport_articles_titles.push(json.response.results[i].webTitle);
	        };

	  	//appending the sport articles to the DOM
        $('#sport-articles').append(sport_articles_array.join(""));
    	}
	});


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


});