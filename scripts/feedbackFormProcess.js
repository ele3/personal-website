function feedbackFormProcess()
{
    var feedbackFormObj = document.getElementById("feedbackForm");

    if (feedbackFormValidate(feedbackFormObj)) {
        //Successful
    } else {
        alert("Invalid inputs! Please review your inputs.");
    }
}