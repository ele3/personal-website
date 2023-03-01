function contactFormProcess()
{
    var contactFormObj = document.getElementById("contactForm");

    console.log("Success");
    console.log(contactFormObj.email.value);

    if (contactFormValidate(contactFormObj)) {
        alert("Valid Email!");
    } else {
        alert("Not Valid Email!");
    }
}