var topics = ["Lil Bub", "Grumpy Cat", "Nyan Cat", "Maru Cat", "Colonel Meow"];

// displayTopicInfo function re-renders the HTML to display the appropriate content
function displayTopicInfo() {
    var topic = $(this).attr("data-name"); //topic is the string value linked to "data-name" 

    //our query URL pops in the topic and has the limit set to 10, we GET 10 results each time .ajax is called 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(topic)
    // Creating an AJAX call for the specific topic button being clicked


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // 10 responses for each TOPIC request
        //Giphy returns everything in an array, each data[0-9] 
        //results is a way to abbreviate
        var results = response.data;    //shortcut to arrays Array(10)

        console.log(results); //10 results
        // we need a loop to go throug the 10 responses
        for (var i = 0; i < results.length; i++) {
            // Creating a div to hold the image and rating
            var topicDiv = $("<div class='topic'>");
            var topicThumb = $("<div class='thumbnail'>");
            var topicCap = $("<div class='caption'>");

            // Storing the rating data
            var rating = results[i].rating;

            // Storing the animated URL

            var animateUrl = results[i].images.original.url;
            console.log(animateUrl);
            //storing the still URL
            var stillUrl = results[i].images.original_still.url;
            console.log(stillUrl);
            // Creating an paragraph to have the items rating displayed
            var p = $("<p>").text("Rating: " + rating);

            var download = $("<a>").attr("href", animateUrl);
            download.text(topic);

            // Creating an image tag 
            var topicImage = $("<img>");

            //give topicImage attributes so we can implement the Pause/Play
            topicImage.attr("src", stillUrl);
            topicImage.attr("data-still", stillUrl);
            topicImage.attr("data-animate", animateUrl);
            topicImage.attr("data-state", "still");
            topicImage.attr("class", "gif");

            // Appending the paragraph and personImage we created to the "gifDiv" div we created

            topicCap.append(p);
            topicCap.append(download);
            topicThumb.append(topicImage, topicCap);
            topicDiv.append(topicThumb)
            // Hey, jQuery! Look through the DOM and find me an element with the ID "topics-view" and put in the "topicDIv"
            $("#topics-view").prepend(topicDiv);
        }
    });
}//display Topic info

// Let's try animating our gifs
function animate() {
    // $("img").on("click", function () {
    // event.preventDefault();
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    console.log("you clicked a gif");
    console.log(state);
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    // });
}
// Below here is for getting new topics into the topics array and making buttons
function renderButtons() {

    // Deleting the topics prior to adding new topics
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Try using a loop that appends a button for each string in the array.
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each topic in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of topic-btn to our button

        a.addClass("topic-btn");
        //let's also add in some bootstrap style
        a.addClass("btn-outline-primary");
        a.attr("type", "button");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a topic button is clicked
$("#add-topic").on("click", function (event) {
    event.preventDefault();
    console.log("You added a topic");
    // This line grabs the input from the textbox
    var topic = $("#topic-input").val().trim();
    console.log(topic)
    if (topic == "" || topic == null) {
        alert("Whoops! You didn't Add a Topic")
    } else {
        topics.push(topic);
    }
    // Calling renderButtons which handles the processing of our topic array
    renderButtons();
});
function clear() {
    $("#topics-view").empty();
}
// Adding a click event listener to all elements with a class of "topic-btn"
$(document).on("click", ".topic-btn", displayTopicInfo);
// Adding a click event listener to all elements with a class of "gif"
$(document).on("click", ".gif", animate);
$(document).on("click", ".clear", clear);
// Calling the renderButtons function to display the intial buttons
renderButtons();
