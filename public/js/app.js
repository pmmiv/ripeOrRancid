$(document).ready(function(){
	$("#peelHoverMsg").show();

	$(".commentsDiv").hide();
	console.log("fuck you, idiot")

	$(".commentsBtn").click(function(){
		$(".commentsDiv").hide();
		var commentDiv = $(this).attr("data-id");
		console.log(commentDiv)
		$("#"+commentDiv).show();
	})

	$(".commentSubmit").click(function(event){
		event.preventDefault();
		var thisId = $(this).attr("data-id");

		$.ajax({
			method: "POST",
			url: "/api/comment/" + thisId,
			data: {
				title: $(".titleInput").val(),
				note: $(".noteInput").val()
			}
		}).then(function(data) {
			// Log the response
			console.log(data);
			// Empty the notes section
			alert("Comment Posted!")
    	});
    });

	$("#peelBtn").hover(function(event){
		$("#peelHoverMsg").hide();
	});

	$(".ripeBtn").click(function(){
		var thisId = $(this).attr("data-id");

		$.ajax({
			method: "POST",
			url: "/api/ripe/" + thisId
		})
		// With that done
		.then(location.reload());
	});

	$(".rancidBtn").click(function(){
		var thisId = $(this).attr("data-id");

		$.ajax({
			method: "POST",
			url: "/api/rancid/" + thisId
		})
		// With that done
		.then(location.reload());
	});


});