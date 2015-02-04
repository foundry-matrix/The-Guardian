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

	var categories = ["technology","sport","politics"];
	var articles = {};

	function renderArticles(articles, category) {
		var listItems = [];
		articles[category].map(function(article){
			var link  = '<a href="' +article.webUrl + '" id="link">'+article.webTitle +'</a>';
			var img   = '<img class="audio" src="img/audio.png">';
			var audio = '<a class="audio_link" id="' + '">' +img +'</a>';
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

		var search = document.getElementById("input").value;
		
		

		categories.push(search);

		$("#category").html("").append("#"+search);

		$("li").removeClass("active");
		$("div").removeClass("active in");

		$("#myTab").append("<li class='active'><a href='#" + search + "' data-toggle='tab'>Added: " + search + "</a>" + '<i class="fa fa-times">' + "</i></li>");

		$("#myTabContent").append("<div class='tab-pane fade active in' id='" + search + "'><ol id = '" + search + "-articles'></ol></div>");

		getArticles(search);

	});

	$("a").click(function(){

		var header =  $(this).attr("href");
		console.log(header);
		$("#category").html(header);

	});


	// closing a tab functionality
	
	$(document).on("click", ".fa-times",function(){   //for elements inserted via jquery, use this document thing.  
		console.log("clicked")
		// $("#myTab li").remove();
		$(this).parent().remove();
	});


	$("h1").click(function(){
		$(this).remove();
	});

	$("h1").click(function(){
		console.log("clicked");
	});

	$("li").click(function(){
		console.log("clicked");
	});


// end of JS
});