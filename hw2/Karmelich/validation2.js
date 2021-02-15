function validate2() {
    handleField(emailCheck, "email", "Email");
    handleField(phoneCheck, "phone", "Phone");
    handleField(addressCheck, "address", "Address");
}

function handleField(checker, field, section) {
    var isValid = Boolean(checker(document.forms["contact information"][field].value));
    var image = getImage(isValid, field);
    var notifier = getNotification(isValid, field);
    document.getElementById(section).appendChild(image);
    document.getElementById(section).appendChild(notifier);
}

//function retreived from Sample Code
function emailCheck(email) {
    let atSplit = email.split('@');
    if (atSplit.length == 2 && alphaNumCheck(atSplit[0])) {
        let periodSplit = atSplit[1].split('.')
        if (periodSplit.length == 2 && alphaNumCheck(periodSplit[0] + periodSplit[1])) {
            return true;
        }
    }
    return false;
}

function phoneCheck(str) {
    return /^\d{10}$/.test(str) || /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(str);
}

function addressCheck(str) {
    let atSplit = str.split(",")
    return atSplit.length == 2 && alphaNumCheck(atSplit[0]) && alphaNumCheck(atSplit[0])
}

function getNotification(bool, ID) {
    var label = document.getElementById("labelNotify" + ID);
    if (label == null) {
        label = document.createElement("LABEL");
        label.id = "labelNotify" + ID;
        label.setAttribute('class', 'errorMessage');
    }

    var str;
    if (ID === "email") {
        str = " * Required. Must be in the form xxx@xxx.xxx. x should be alphanumeric (e.g. no special symbols)";
    }
    else if(ID === "phone") {
        str = " * Required. Must be in the form xxx-xxx-xxxx or xxxxxxxxxx. x should be numeric"
    }
    else {
        str = " * Required. Must be in the form of city & state. example: Ames,IA";
    }

    label.innerHTML = bool ? "" : str;
    return label;
}

//function retreived from Sample Code
function getImage(bool, ID) {
    var image = document.getElementById("image" + ID);
    if (image == null) {
        image = new Image(15, 15);
        image.id = "image" + ID;
    }
    image.src = bool ? './correct.png' : './wrong.png';
    return image;
}

//function retreived from Sample Code
function alphaNumCheck(entry) {
    let regex = /^[a-z0-9]+$/i;
    if (entry != null && entry.match(regex)) {
        return true;
    } else {
        return false;
    }
}