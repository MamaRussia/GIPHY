$(document).ready(function () {
    var hotArray = ["Tabasco", "Habanero", "Ghost Pepper", "Sun", "Carolina Reaper", "Curry", "Siracha", "Lava", "Super Saiyan"]
    var tempCheck = true;
    console.log(hotArray)
    // Function to create and display the navbar

    function navBar() {
        var navDiv = $("<div>");
        var nav = $("<nav>").addClass("navbar").addClass("navbar-dark").addClass("bg-dark");
        var navForm = $("<form class='form-inline'>");
        var navInput = $("<input id='topic-input'>").attr("type", "text").addClass("form-control").attr("placeholder", "Enter something here...");
        var navSubmit = $("<input id='add-gif'>").attr("type", "submit").attr("value", "Add New GIF").addClass("btn").addClass("btn-warning");
        navForm.append(navInput).append(navSubmit);
        nav.append(navForm).append(navDiv);
        $("#navRow").append(nav);
        // Function that adds a new button based on the text input when the Add GIF button is clicked
        $("#add-gif").on("click", function (event) {
            event.preventDefault();
            var newHotThing = $("#topic-input").val().trim();
            hotArray.push(newHotThing);
            renderButtons();
        });
    }
    // Function to render the buttons based on the items in the array
    function renderButtons() {
   
        $("#buttons-row").empty();
        for (var i = 0; i < hotArray.length; i++) {
            var a = $("<button>");
            a.addClass("hot-stuff").addClass("btn").addClass("btn-danger").attr("data-hot");
            a.text(hotArray[i]);
            $("#buttons-row").append(a);
        }
        // clears input once text is entered
        var ab = $("#topic-input").val().trim();
        $("#topic-input").val("");
        if (ab === "") {} else if (tempCheck === true) {
            hotArray.push(ab);
        }
   
    }
    navBar();
    renderButtons();


    // $(document).on("click", "body *", function (event) {
    //     event.preventDefault();
        // Function that calls giphy API to display based on data-hot
        var spicy = $(this).attr("data-hot");
        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            spicy + "&api_key=gY103xjj5wXc888B28DWUEzThzJ2Czz8&limit=10";

        // Performing our AJAX GET request
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            // After the data comes back from the API
            .then(function (response) {
                // Storing an array of results in the results variable
                var results = response.data;
                console.log(response);

                // Looping over every result item
                for (i = 0; i < results.length; i++) {

                    // Creating a div for the gif
                    var gifDiv = $("<div>").addClass("card");
                    var textDiv = $("<div>").addClass("card-body");

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p class='cardbody'>").text("Rating: " + rating).css("align", "middle");;

                    // Creating an image tag with a src attribute
                    var hotImage = $("<img>").attr("src", results[i].images.fixed_height.url).attr("data-state",
                        "still").addClass("gif");

                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    textDiv.append(p);
                    gifDiv.append(hotImage).append(textDiv);

                    // appending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gif-row").append(gifDiv);

                }
            });

        // $(".gif").on("click", function () {
        //     // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        //     var state = $(this).attr("data-hot");
        //     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        //     // Then, set the image's data-state to animate
        //     // Else set src to the data-still value
        //     if (state === "still") {
        //         $(this).attr("src", $(this).attr("data-animate"));
        //         $(this).attr("data-state", "animate");
        //     } else {
        //         $(this).attr("src", $(this).attr("data-still"));
        //         $(this).attr("data-state", "still");
        //     }
        // });
    // })

})