var usersArray = [];
var selectedIndex = -1;

console.log('It is:', localStorage.studentsRecord)
console.log('moment', moment(), moment)

function init() {
    document.getElementById("tablerows-0").innerHTML = "";
    document.getElementById('regtable-1').style.visibility = 'hidden';

    if (localStorage.studentsRecord) {
        usersArray = JSON.parse(localStorage.studentsRecord);
        for (var i = 0; i < usersArray.length; i++) {
            console.log(usersArray);
            console.log('search bar:', document.querySelector('#search-querry').value)
            prepareTableCell(i, usersArray[i].firstname, usersArray[i].city, usersArray[i].cardCode, 'init');
        }
    }
};

function onRegisterPressed() {
    var cardNumbArr = [], cardNumber, cardOptionId = [];
    var cardExpiration, dateFormatted;
     cardOptionId = ['category-id', 'accumulation-id', 'percentage-id'];
     cardExpiration = document.getElementById('expiration-id').value;
     dateFormatted = moment(cardExpiration).format("DDMMYY"); 


    for (let n = 0; n < cardOptionId.length; n++) {
        cardNumbArr.push(document.getElementById(cardOptionId[n]).value);
    }
    cardNumbArr.push(dateFormatted)
    cardNumber = Number(cardNumbArr.join(''))

    var firstName = document.getElementById("firstname-id").value;
    var city = document.getElementById("city-id").value;
    var cardCode = cardNumber;

    console.log('TO US:', String(firstName).charAt(0))
    console.log('TOSU:', String(city).charAt(0))
    console.log("tO SU:", cardCode, String(cardCode).charAt(0))
    


    //so to have ascending or descending order => you need  to fetch first letter of each and then arrange them
    //also in number => just fetch first digit

    var cardInfo = {
        firstname: firstName,
        city: city,
        cardCode: cardCode
    };

    if (selectedIndex === -1) {
        usersArray.push(cardInfo);
    } else {
        usersArray.splice(selectedIndex, 1, cardInfo);
    }
    localStorage.studentsRecord = JSON.stringify(usersArray);
    init();
    onClarPressed();
};


function onSearchPressed() {
    var searchQuery = document.getElementById('search-querry').value;
    if (localStorage.studentsRecord) {
        usersArray = JSON.parse(localStorage.studentsRecord);
        for (let i = 0; i < usersArray.length; i++) {
            if (searchQuery == usersArray[i].firstname || searchQuery == usersArray[i].city || searchQuery == usersArray[i].cardCode) {
                prepareTableCell(i, usersArray[i].firstname, usersArray[i].city, usersArray[i].cardCode, 'onSearchPressed');
            }
        }
    }
    document.getElementById('regtable-1').style.visibility = 'visible';
};

function prepareTableCell(index, firstName, city, cardCode, invokedFrom) {
    let table;
    if (invokedFrom == 'onSearchPressed') {
        table = document.getElementById('tablerows-1')
    } else {
        table = document.getElementById("tablerows-0");
    }

    var row = table.insertRow();
    var firstNameCell = row.insertCell(0);
    var cityCell = row.insertCell(1);
    var cardCell = row.insertCell(2);
    var actionCell = row.insertCell(3);

    firstNameCell.innerHTML = firstName;
    cityCell.innerHTML = city;
    cardCell.innerHTML = cardCode;
    actionCell.innerHTML = '<button onclick="onEditPressed(' + index + ')">Edit</button class="btn-del-style"><br/><button onclick="deleteTableRow(' + index + ')">Delete</button>';
};


function deleteTableRow(index) {
    usersArray.splice(index, 1);
    var deletePrompt = prompt('Do you really want to delete cell?', 'yes');
    if (deletePrompt == 'yes') {
        localStorage.studentsRecord = JSON.stringify(usersArray);
        document.getElementById('regtable-1').style.visibility = 'hidden';
        init();
    }
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
    var cardInfo = usersArray[index];
    document.getElementById("firstname-id").value = cardInfo.firstname;
    document.getElementById("city-id").value = cardInfo.city;
    document.getElementById("card-id").value = cardInfo.cardCode;
    document.getElementById("submit").innerHTML = "Update";
};