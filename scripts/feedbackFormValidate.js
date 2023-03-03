function feedbackFormValidate(feedbackFormObj) {
    var email = feedbackFormObj.email.value;
    var textbox = feedbackFormObj.message.value;
    var starList = document.querySelectorAll(".bi-star-fill");
    
    let emailFlag = isEmailValid(email);
    let starFlag = areStarsFilled(starList);

    console.log(textbox);

    let textboxFlag = true;
    if (textbox == '') {
        textboxFlag = false;
        alert("Error: Your message is empty!");
    }

    return emailFlag & textboxFlag & starFlag;
}

function isEmailValid(address) {
    let regex = new RegExp("[a-z0-9]+@[a-z]+[\.][a-z]{2,3}");
    if (regex.test(address)) {
        return true;
    } else {
        alert("Error: Invalid e-mail address!");
        return false;
    }
}

function areStarsFilled(starList) {
    let flag = false;
    let length = starList.length;
    for (i = 0; i < length; i++) {
        if (starList[i].classList.contains("filled")) {
            flag = true;
        }
    }
    if (flag == false) {
        alert("Error: Please give us a rating!");
    }
    return flag;
}

function wordCount(textbox) {
    var split = textbox.trim().replace(/\s+/g, ' ').split(' ');
    var count = split.length;

    return count;
}

function starRatingCount(starList) {
    let count = 0;
    let length = starList.length;
    for (var i = 0; i < length; i++) {
        if (starList[i].classList.contains("filled")) {
            count++;
        }
    }
    return count;
}