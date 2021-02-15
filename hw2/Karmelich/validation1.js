function validate1() {
    if (isValid()) {
        window.open("validation2.html", "_self");
    }
}

function isValid() {
    var firstNameChecker = handleField(alphaNumCheck, "firstName", "FirstName");
    var lastNameChecker = handleField(alphaNumCheck, "lastName", "LastName");
    var genderChecker = handleField(nullCheck, "gender", "Gender");
    var stateChecker = handleField(nullCheck, "state", "State");

    return firstNameChecker && lastNameChecker && genderChecker && stateChecker;
}

function handleField(checker, field, section) {
    var isValid = Boolean(checker(document.forms["validation information"][field].value));
    var image = getImage(isValid, field);
    var notifier = getNotification(isValid, field);
    document.getElementById(section).appendChild(image);
    document.getElementById(section).appendChild(notifier);

    return isValid;
}

function getNotification(bool, ID) {
    var label = document.getElementById("labelNotify" + ID);
    if (label == null) {
        label = document.createElement("LABEL");
        label.id = "labelNotify" + ID;
        label.setAttribute('class', 'errorMessage');
    }

    var str;
    if (ID === "firstName" || ID === "lastName") {
        str = " * Required. Must contain only alphabetic or numeric characters."
    }
    else {
        str = " * Required. Select from given list."
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

function nullCheck(entry) {
    return entry !== "";
}