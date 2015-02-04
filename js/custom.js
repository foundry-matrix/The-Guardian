$(document).ready(function(){

	// adding an event listener to when the user clicks one of the audio-icons
	$(document).on('click', ".audio_link" , function(){
		if (window.speechSynthesis.speaking == true)
		{
			window.speechSynthesis.cancel();
		} 
		else
		{
			var title = $(this).attr("id");
			readHeadline(title);
		} 
	});


	// getting the web speech api to read the message, based upon an article's index (in an array of their titles) and the section (sports,tech,politics) 

	function readHeadline(input){	
	var message = new SpeechSynthesisUtterance(input);
	var voices = window.speechSynthesis.getVoices();
	console.log(voices);
	input.voice = voices.filter(function(voice) { return voice.name == 'Alex'; })[0];
	window.speechSynthesis.speak(message);
	}

	// list of categories
	var categories = ["technology","sport","politics"];
	var articles = {};

function renderArticles(articles, category) {
	//appending the tech articles to the DOM
	var listItems = [];
	articles[category].map(function(article){
		var link  = '<a href="' + article.webUrl + '" id="link">'+article.webTitle +'</a>';
		var img   = '<img class="audio" src="img/audio.png">';
		var audio = '<a class="audio_link" id="' + article.webTitle +  '">' +img +'</a>';
		var item  = '<li>' + link + audio +'</li>';
		listItems.push(item);
	})

	var id = '#'+ category + '-articles'
	$(id).append(listItems.join(""));
	return;
}



function getArticles(category) {
	$.ajax({
		url: "http://content.guardianapis.com/search?section=" + category + "&api-key=v2jpnga8trgw9x4p3u84yvrw",
		dataType: 'jsonp',
		success: function(json){
			articles[category] = json.response.results;
			renderArticles(articles,category);
		}
	})
}



categories.map(function(category) {
	getArticles(category);
})




});



