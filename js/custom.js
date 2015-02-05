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
			console.log(title);
			readHeadline(title);
		} 
	});


	// getting the web speech api to read the message, based upon an article's index (in an array of their titles) and the section (sports,tech,politics) 


	function readHeadline(input){	
	var message = new SpeechSynthesisUtterance(input);
	var voices = window.speechSynthesis.getVoices();
	input.voice = voices.filter(function(voice) { return voice.name == 'Alex'; })[0];
	window.speechSynthesis.speak(message);
	}

	// list of categories
	var categories = ["technology","sport","politics"];
	var articles = {};

	function renderArticles(articles, category) {
		var listItems = [];
		articles[category].map(function(article){
			var link  = '<a href="' +article.webUrl + '" id="link">'+article.webTitle +'</a>';
			var img   = '<img class="audio" src="img/audio.png">';
			var audio = '<a class="audio_link" id="' + article.webTitle  +  '">' +img +'</a>';
			var item  = '<li>' +link +audio + '</li>';
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


	// Adding tab functionality 

	$("#add").click(function(){

		var exists;
		var search = document.getElementById("input").value;

		$("li").removeClass("active");
		$("div").removeClass("active in");

		categories.map(function(category){
			if (search == category){
				exists = true;
			}
			else{
				exists = false;
			}
		});

		if (exists)
		{
			$("li").addClass("active");

		//	$("#myTabContent").addClass("active in");
		}
		else
		{
			categories.push(search);

			$("#myTab").append("<li class='active'><a href='#" + search + "' data-toggle='tab'>Added: " + search + "</a>" + '<i class="fa fa-times">' + "</i></li>");

			$("#myTabContent").append("<div class='tab-pane fade active in' id='" + search + "'><ol id = '" + search + "-articles'></ol></div>");

			getArticles(search);
		}

		$("#category").html("").append("#"+search);

	});

	$("a").click(function(){

		var header =  $(this).attr("href");
		$("#category").html(header);

	});



	// closing a tab functionality
	
	// $(document).on("click", ".fa-times",function(){   //for elements inserted via jquery, use this document thing.  
	// 	$(this).parent().remove();
	// 	$("div").removeClass("active in");
	// 	$("#sport").click();
		
	// });
		

	

	$(document).on("click", ".fa-times",function(){   //for elements inserted via jquery, use this document thing.  
		
		console.log(categories);
	categories.splice( $.inArray(category, categories), 1 );  //this removes the search term from the categories array. 
		console.log(categories);

		
	});





	$("h1").click(function(){
		console.log(" sportclicked");
	});

	$("#sport").click(function(){
		console.log(" h1clicked");
	});


// end of JS
});


