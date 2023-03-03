function feedbackFormProcess()
{
    var feedbackFormObj = document.getElementById("feedbackForm");

    if (feedbackFormValidate(feedbackFormObj)) {
        //Successful
        var textbox = feedbackFormObj.message.value;
        var starList = document.querySelectorAll(".bi-star-fill");
        numWords = wordCount(textbox);
        numStarRating = starRatingCount(starList);
        alert("Your textbox has " + numWords + " words\n" + "You gave us a rating of " + numStarRating + "/5");
    } else {
        alert("Invalid inputs! Please review your inputs.");
    }
}