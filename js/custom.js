$(document).ready(function(){

	var j = 0;
	current_reader = 'Nora';
	id = "Nora";
	voices_loaded = false;
	characters = ['Thomas','Ioana','Tarik','Diego', 
	'Hysterical','Bruce','Alice', 'Nora','Xander','Amelie','Kyoko'];
	character_images = [];

	// adding an event listener to when the user clicks one of the audio-icons
	$(document).on('click', ".audio_link" , function(){
		console.log(".audio_link clicked");
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



	$("#charSelector").on('click', '.image',function(){
		id = $(this).attr('id');
		console.log(id);
		$("#"+current_reader).animate({height: "50px"});
		$("#"+id).animate({height: "100px"})
		current_reader = id;
	});


	voiceSelector = document.getElementById("voice");
	charSelector = document.getElementById("charSelector");

	function fetch_voices(){
	voices.map(function(voice){
		for (i=0;i<characters.length; i++)
			if (voice.name == characters[i]) {
				character_images.push('<li class="character"><img class="image" src="img/' + voice.name +'.jpg" id= ' + voice.name + '></li>');	
		}
	});

	animationLoop();
	voices_loaded = true;
	}

	function animationLoop(){
			$("#" + id).css({height: "100px"});
		setTimeout(function(){ 
			$(character_images[0]).css({height:'100px;'});
			$('#charSelector').append(character_images[j]);
			j++;
			if (j<character_images.length){
			animationLoop();
			}
			else if (j = character_images.length) {

			}
		}, 50)
	}

	// event thats triggered when the voices are ready. Populates the voice selector with options

	window.speechSynthesis.onvoiceschanged = function(){
	console.log('onvoicechanges triggered');	
	voices = speechSynthesis.getVoices();

	}

	$("#character_activator").click(function(){
		$(this).animate({width: 'hide'}, 150 , function(){
				fetch_voices();
		});
	});



	// getting the web speech api to read the message, and fetching the choosen voice
	function readHeadline(input){	
	message = new SpeechSynthesisUtterance(input);	
	message.voice = voices.filter(function(voice_alternative){ 
		return voice_alternative.name == id; 
	})[0];
	window.speechSynthesis.speak(message);
	}

	// list of categories
	var categories = ["technology","sport","politics"];
	var articles = {};

	function renderArticles(articles, category) {
		var listItems = [];
		articles[category].map(function(article){
			var link  = '<a href="' +article.webUrl + '" id="link">'+ article.webTitle +'</a>';
			var img   = '<img class="audio" src="img/audio.png">';
			var audio = '<a class="audio_link" id="' + article.webTitle  +  '">' +img +'</a>';
			var item  = '<li>' +link +audio + '</li>';
			listItems.push(item);
		})

		$("li").removeClass("active");
		$("div").removeClass("active in");

		$("#myTab").append("<li id='tab-" + category + "'class='active'><a href='#" + category + "link' data-toggle='tab'>" + category + "</a>" + '<i id='+ category + ' class="fa fa-times">' + "</i></li>");
		$("#myTabContent").append("<div class='tab-pane fade active in' id='" + category + "link'><ol id = '" + category + "-articles' class='articles-list'></ol></div>");

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
		var searchLower = search.toLowerCase();

		for (var i=0; i<categories.length; i++){
			if (searchLower == categories[i]){
				exists = true;
				break;
			}
			else{
				exists = false;
			}		
		}
		
		if (exists)
		{
			$("li").removeClass("active");
			$("div").removeClass("active in");	

			$("#tab-" + searchLower).addClass("active");
			$("#" + searchLower + "link").addClass("active in");	
		}
		else
		{
			categories.push(searchLower);
			getArticles(searchLower);
		}

		$("#category").html("").append("#"+search);

		console.log(categories);
	});

	// closing a tab functionality
	
	 $(document).on("click", ".fa-times",function(){  
	  //for elements inserted via jquery, use this document thing.  
	  
	 	var category = $(this).attr("id");
	 	//var categoryindex = categories.indexOf(category) ;

	 	$("#tab-" + category).remove();
	 	$("#" + category + "link").remove();

	 	var index = $.inArray(category, categories);
	 	if(index != -1){
	 		categories.splice(index,1);
	 	}

	 	var categoryindex = categories[0];
	 	console.log(categoryindex);

	 	$("li").removeClass("active");
		$("div").removeClass("active in");	

		$("#tab-" + categoryindex).addClass("active");
		$("#" + categoryindex + "link").addClass("active in");	
	 });
// end of JS
});


