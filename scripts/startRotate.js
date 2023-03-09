var prefix;
var imageArray = new Array(3);
var imageCounter = 0;
var intervalID = null;

function processRotate(selectedOption) {
    if (selectedOption == 'Dogs') {
        prefix = "images/dog";
    } else if (selectedOption == 'Cats') {
        prefix = "images/cat";
    } else if (selectedOption == 'Other') {
        prefix = "images/other";
    }

    for (let i=0; i<imageArray.length; i++) {
        imageArray[i] = prefix + (i+1) + ".jpg";
    }
    clearInterval(intervalID);
    setTimeout(intervalID, 1000);
    startRotate();
}

function rotate() {
    var imageObject = document.getElementById('placeholderImage');
    imageObject.src = imageArray[imageCounter];
    ++imageCounter;
    if (imageCounter == 3) imageCounter = 0;
}

function startRotate() {
    document.getElementById('placeholderImage').src = imageArray[0];
    intervalID = setInterval('rotate()', 1500);
}