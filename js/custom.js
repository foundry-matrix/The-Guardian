$(document).ready(function(){


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
	current_reader = 'Thomas';
	id = "Thomas";

$("#Thomas").css('height', "100px");

	$("#charSelector").on('click', '.image',function(){
	console.log("clicked char");
	console.log($(this)[0]);
	$(this[0]).fadeOut(500);
	id = $(this).attr('id');
	console.log(id);
	$("#"+current_reader).animate({height: "50px"});
	$("#"+id).animate({height: "100px"})
	current_reader = id;
});



/*

	$(".audio_link").click( function(){
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

*/

	voices_loaded = false;
	characters = ['Thomas','Ioana','Tarik','Diego', 
	'Hysterical','Bruce','Alice', 'Nora','Xander','Amelie','Kyoko'];




	voiceSelector = document.getElementById("voice");
	charSelector = document.getElementById("charSelector");

	function fetch_voices(){
	voices.map(function(voice) {
		var option = document.createElement('option');
		option.name = voice.name;
		option.innerHTML = voice.name;
		voiceSelector.appendChild(option);
	});
	voices.map(function(voice){
		for (i=0;i<characters.length; i++)
			if (voice.name == characters[i]) {
				console.log("found " + voice.name);
				$('#charSelector').append('<li class="character"><img class="image" src="img/' + voice.name +'.jpg" id= ' + voice.name + '></li>');
			}
		});	
	voices_loaded = true;
	};



	// event thats triggered when the voices are ready. Populates the voice selector with options

	window.speechSynthesis.onvoiceschanged = function(){
	console.log('onvoicechanges triggered');

	voices = speechSynthesis.getVoices();
	if (voices_loaded == false){
	fetch_voices();
	}
}



	// getting the web speech api to read the message, and fetching the choosen voice
	function readHeadline(input){	
	message = new SpeechSynthesisUtterance(input);
	
	message.voice = voices.filter(function(voice_alternative){ 
		return voice_alternative.name == id; 
	})[0];

	//message.voice = voices.filter(function(voice_alternative){ 
	//	return voice_alternative.name == voiceSelector.value; 
	//})[0];
	window.speechSynthesis.speak(message);
	}


	// list of categories
	var categories = ["technology","sport","politics"];
	var articles = {};

	// function setAttributes(element, attrs) {
	//     for (var i = 1; i < arguments.length; i+=2) {
	//         element.setAttribute(arguments[i], arguments[i+1]);
	//  	  }
	// }

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

		// var li = document.getElementById("myTab").appendChild(document.createElement("li"));
		// li.setAttribute("id", "tab-" + category);
		// li.setAttribute("class", "active");
		// var a = document.getElementById("tab-" + category).appendChild(document.createElement("a"));
		// a.setAttribute("href", "#" + category + "link");
		// a.setAttribute("data-toggle", "tab");

		// setAttributes("a", "src", "http://example.com/something.jpeg", "height", "100%");

		$("#myTab").append("<li id='tab-" + category + "'class='active'><a href='#" + category + "link' data-toggle='tab'>" + category + "</a>" + '<i id='+ category + ' class="fa fa-times">' + "</i></li>");
		$("#myTabContent").append("<div class='tab-pane fade active in' id='" + category + "link'><ol id = '" + category + "-articles'></ol></div>");

	//	document.getElementById("tab-" + category).className = "";
	//	document.getElementById(category + "link").className = "";

		var id = '#'+ category +'-articles'
		$(id).append(listItems.join(""));
		return;
	}

	// function getArticles(category) {
	// 	$.ajax({
	// 		url: "http://content.guardianapis.com/search?q=" + category + "&api-key=v2jpnga8trgw9x4p3u84yvrw",
	// 		dataType: 'jsonp',
	// 		success: function(json){
	// 		//	document.getElementById("myDiv").innerHTML = json.response.results;
	// 			articles[category] = json.response.results;  
	// 			renderArticles(articles, category);
	// 		}
	// 	});
	// }

	function getArticles(category) {

		var url = "http://content.guardianapis.com/search?q=" + category + "&api-key=v2jpnga8trgw9x4p3u84yvrw";
	    var xmlhttp;

	    if (window.XMLHttpRequest) {
	        // code for IE7+, Firefox, Chrome, Opera, Safari
	        xmlhttp = new XMLHttpRequest();
	    } else {
	        // code for IE6, IE5
	        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    }

	    xmlhttp.onreadystatechange = function() {
	        if (xmlhttp.readyState == 4 ) {
	           if(xmlhttp.status == 200){
	           		var data = JSON.parse(xmlhttp.response);
					articles[category] = data.response.results;
	            	renderArticles(articles, category); 
	           }
	           else if(xmlhttp.status == 400) {
	              alert('There was an error 400')
	           }
	           else {
	            //   alert('something else other than 200 was returned')
	           }
	        }
	    }

	    xmlhttp.open("GET", url, true);
	    xmlhttp.send();
	}

	var t0 = performance.now();

	categories.map(function(category) {
		getArticles(category);
	})

	var t1 = performance.now();
	console.log("Vanilla AJAX Call took: " + (t1 - t0) + " milliseconds.");


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

	 console.log(categories);

	$("#Thomas").animate({height: "100px"})

	

// end of JS
});


