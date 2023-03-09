function similarFormProcess() {
    var selectedOption = document.querySelector('.selected').innerText;
    if (selectedOption == 'Dogs') {
        alert("Amazing choice! They are also my favorite!");
    } else if (selectedOption == 'Cats') {
        alert("Okay choice... They're my second favorite.");
    } else if (selectedOption == 'Other') {
        alert("I respect your choice, but we are not similar.");
    } else {
        alert("ERROR: Choose an option!");
    }
}