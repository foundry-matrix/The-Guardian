$(document).ready(function(){

	// $.getJSON("http://content.guardianapis.com/search?api-key=jfrkfza276q5uz48kgwsrmp3&q=sports", function(json){
	// 	console.log(json);
	// 	$('#content').html(json.response.results[0].webTitle);
	// });

	// tech articles
	$.ajax({
    url: "http://content.guardianapis.com/search?api-key=jfrkfza276q5uz48kgwsrmp3&q=tech",
    dataType: 'jsonp',
    success: function(json){
    		console.log(json);
    		console.log(json.response.results[0].id);
    		console.log(json.response.results[0].webUrl);


	        var title = json.response.results[0].webTitle;
	        for(i=0; i<10; i++){
	        	$('#tech-articles').append('<li>' + '<a href=' +  json.response.results[i].webUrl + '>' + json.response.results[i].webTitle + '</a>' + '</li>');	
	        };
        
    	}
	});


	// sport articles

		$.ajax({
    url: "http://content.guardianapis.com/search?api-key=jfrkfza276q5uz48kgwsrmp3&q=sport",
    dataType: 'jsonp',
    success: function(json){
    		console.log(json);
    		console.log(json.response.results[0].id);
    		console.log(json.response.results[0].webUrl);


	        var title = json.response.results[0].webTitle;
	        for(i=0; i<10; i++){
	        	$('#sport-articles').append('<li>' + '<a href=' + json.response.results[i].webUrl + '>' + json.response.results[i].webTitle + '</a>' + '</li>');	
	        };
        
    	}
	});

		// politics articles

			$.ajax({
    url: "http://content.guardianapis.com/search?api-key=jfrkfza276q5uz48kgwsrmp3&q=politics",
    dataType: 'jsonp',
    success: function(json){
    		console.log(json);
    		console.log(json.response.results[0].id);
    		console.log(json.response.results[0].webUrl);


	        var title = json.response.results[0].webTitle;
	        for(i=0; i<10; i++){
	        	$('#politics-articles').append('<li>' + '<a href=' +  json.response.results[i].webUrl + '>' + json.response.results[i].webTitle + '</a>' + '</li>');	
	        };
        
    	}
	});
	




});