
console.log('test test test')


var studentsArray = [];
var selectedIndex = -1;

function init() {
    document.getElementById("tablerows").innerHTML = "";
    if (localStorage.studentsRecord) {
        studentsArray = JSON.parse(localStorage.studentsRecord);
        for (var i = 0; i < studentsArray.length; i++) {
            prepareTableCell(i, studentsArray[i].firstname, studentsArray[i].lastname, studentsArray[i].rollnum,
                studentsArray[i].subject);
        }
    }
}

function onRegisterPressed() {
    var firstName = document.getElementById("firstname-id").value;
    var city = document.getElementById("city-id").value;
    var cardCode = document.getElementById("card-id").value;
    
    var stuObj = {
        firstname: firstName,
        city: city,
        cardCode: cardCode
    };
    if (selectedIndex === -1) {
        studentsArray.push(stuObj);
    } else {
        studentsArray.splice(selectedIndex, 1, stuObj);
    }
    localStorage.studentsRecord = JSON.stringify(studentsArray);
    init();
    onClarPressed();
}

function prepareTableCell(index, firstName, city, cardCode) {
    var table = document.getElementById("tablerows");
    var row = table.insertRow();
    var firstNameCell = row.insertCell(0);
    var cityCell = row.insertCell(1);
    var cardCell = row.insertCell(2);
    var actionCell = row.insertCell(3);
    firstNameCell.innerHTML = firstName;
    cityCell.innerHTML = city;
    cardCell.innerHTML = cardCode;
    actionCell.innerHTML = '<button onclick="onEditPressed(' + index + ')">Edit</button><br/><button onclick="deleteTableRow(' + index + ')">Delete</button>';
}

function deleteTableRow(index) {
    studentsArray.splice(index, 1);
    localStorage.studentsRecord = JSON.stringify(studentsArray);
    init();
}

function onClarPressed() {
    selectedIndex = -1;
    document.getElementById("firstname-id").value = "";
    document.getElementById("city-id").value = "";
    document.getElementById("card-id").value = "";
    document.getElementById("submit").innerHTML = "Register";
}

function onEditPressed(index) {
    selectedIndex = index;
    var stuObj = studentsArray[index];
    document.getElementById("firstname-id").value = stuObj.firstname;
    document.getElementById("city-id").value = stuObj.city;
    document.getElementById("card-id").value = stuObj.rollnum;
    document.getElementById("submit").innerHTML = "Update";
}
