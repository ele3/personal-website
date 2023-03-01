function contactFormValidate(contactFormObj) {
    var email = contactFormObj.email.value;
    
    emailFlag = isEmailValid(email);

    return emailFlag;
}

function isEmailValid(address)
{
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (regex.test(address)) {
        return true;
    } else {
        alert("Error: Invalid e-mail address.");
        return false;
    }
}