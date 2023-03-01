function contactFormProcess()
{
    var contactFormObj = document.getElementById("contactForm");

    if (contactFormValidate(contactFormObj)) {
        alert("Valid Email!");
    } else {
        alert("Not Valid Email!");
    }
}