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
	
	// list of categories
	var categories = ["technology","sport","politics"];
	var articles = {};

function renderArticles(articles, category) {
	//appending the tech articles to the DOM
	var listItems = [];
	articles[category].map(function(article){
		var link  = '<a href="' +article.webUrl + '" id="link">'+article.webTitle +'</a>';
		var img   = '<img class="audio" src="img/audio.png">';
		var audio = '<a class="audio_link" id="' + '">' +img +'</a>';
		var item  = '<li>' +link +audio +'</li>';
		listItems.push(item);
	})

	var id = '#'+ category +'-articles'
	$(id).append(listItems.join(""));
	return;
}

function getArticles(category) {
	// tech articles
	$.ajax({
		url: "http://content.guardianapis.com/search?q=" + category + "&api-key=v2jpnga8trgw9x4p3u84yvrw",
		dataType: 'jsonp',
		success: function(json){
			articles[category] = json.response.results; // 
			console.log(articles);
			renderArticles(articles, category);
		}
	});
}

categories.map(function(category) {
	getArticles(category);
})





/*

	// sport articles
	$.ajax({
		url: "http://content.guardianapis.com/search?q=sport&api-key=v2jpnga8trgw9x4p3u84yvrw",
		dataType: 'jsonp',
		success: function(json){
			console.log(json);
			console.log(json.response.results[0].id);
			console.log(json.response.results[0].webUrl);
			sport_articles_titles = [];
			var sport_articles_array = [];
			var title = json.response.results[0].webTitle;
			for(i=0; i<10; i++){
				sport_articles_array.push('<li>' + '<a href=' + json.response.results[i].webUrl + ' id="link' + i + '"">' + json.response.results[i].webTitle + '</a>' + '<a href="#" class="audio_link sport_articles_titles" id="' + i + '"><img class="audio" src="img/audio.png"></a></li>');
				sport_articles_titles.push(json.response.results[i].webTitle);
				};
			//appending the sport articles to the DOM
			$('#sport-articles').append(sport_articles_array.join(""));
		}
	});

	// politics articles
	$.ajax({
    url: "http://content.guardianapis.com/search?q=politics&api-key=v2jpnga8trgw9x4p3u84yvrw",
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

		// var cats = ["technology","sport","politics"];

		$("li").removeClass("active");
		$("div").removeClass("tab-pane fade in active");
		
		var search = document.getElementById("input").value;
		cats.push(search);

		$("#category").html("").append(search);

		

		var baseURL = "http://content.guardianapis.com/search?q="
		var key = "&api-key=v2jpnga8trgw9x4p3u84yvrw"

	//	for(var i=0; i<cats.length; i++){

		//	var search = "sport" //cats[i];
		var callurl = baseURL+search+key;

		$("#myTab").append("<li class='active'><a href='#" + search + "' data-toggle='tab'>Added: " + search + "</a></li>");

		$("#myTabContent").append("<div class='tab-pane fade in active' id='" + search + "'><ol id = '" + search + "-articles'></ol></div>");

		var ol = document.getElementById(search + "-articles");



			$.ajax({
		    url: callurl,
		    dataType: 'jsonp',
		    success: function(data){
		    		var articles_titles = [];
		    		var articles_array = [];
			        var title = data.response.results[0].webTitle;
			        for(i=0; i<5; i++){
			        	articles_array.push('<li>' + '<a href=' + data.response.results[i].webUrl + ' id="link' + i + '"">' + data.response.results[i].webTitle + '</a>' + '<a href="#" class="audio_link tech_articles_titles"  id="' + i + '"><img class="audio" src="img/audio.png"></a></li>');
			        	articles_titles.push(data.response.results[i].webTitle);
			        };
		
			        //appending the tech articles to the DOM
			        $(ol).append(articles_array.join(""));
		    	}
			});

	//	}

	});
*/
});