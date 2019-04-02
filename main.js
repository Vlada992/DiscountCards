var studentsArray = [];
var selectedIndex = -1;

console.log('It is:', localStorage.studentsRecord)

function init() {
    document.getElementById("tablerows").innerHTML = "";
    if (localStorage.studentsRecord) {
        studentsArray = JSON.parse(localStorage.studentsRecord);
        for (var i = 0; i < studentsArray.length; i++) {
            console.log(studentsArray);
            console.log('search bar:', document.querySelector('#mySearch').value)

            prepareTableCell(i, studentsArray[i].firstname, studentsArray[i].city, studentsArray[i].cardCode);
        }
    }
}

function onRegisterPressed() {
    var firstName = document.getElementById("firstname-id").value;
    var city = document.getElementById("city-id").value;
    var cardCode = document.getElementById("card-id").value;

    var cardInfo = {
        firstname: firstName,
        city: city,
        cardCode: cardCode
    };
    if (selectedIndex === -1) {
        studentsArray.push(cardInfo);
    } else {
        studentsArray.splice(selectedIndex, 1, cardInfo);
    }
    localStorage.studentsRecord = JSON.stringify(studentsArray);
    init();
    onClarPressed();
};

function onSearchPressed() {
    var searchQuery = document.getElementById('mySearch').value;
    console.log(searchQuery);
    if (localStorage.studentsRecord) {
        studentsArray = JSON.parse(localStorage.studentsRecord);
        for (var i = 0; i < studentsArray.length; i++) {
            console.log('IN onsearchpresSed:', studentsArray);
            if(searchQuery == studentsArray[i].firstname || searchQuery == studentsArray[i].city || searchQuery == studentsArray[i].cardCode){
                console.log('It works');                    
            }
        }
    }
};

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
};

function deleteTableRow(index) {
    studentsArray.splice(index, 1);
    localStorage.studentsRecord = JSON.stringify(studentsArray);
    init();
};

function onClarPressed() {
    selectedIndex = -1;
    document.getElementById("firstname-id").value = "";
    document.getElementById("city-id").value = "";
    document.getElementById("card-id").value = "";
    document.getElementById("submit").innerHTML = "Submit User";
};

function onEditPressed(index) {
    selectedIndex = index;
    var cardInfo = studentsArray[index];
    document.getElementById("firstname-id").value = cardInfo.firstname;
    document.getElementById("city-id").value = cardInfo.city;
    document.getElementById("card-id").value = cardInfo.cardCode;
    document.getElementById("submit").innerHTML = "Update";
};
