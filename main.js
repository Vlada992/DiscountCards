var usersArray = [];
var selectedIndex = -1;

console.log('It is:', localStorage.studentsRecord)

function init() {
    document.getElementById("tablerows-0").innerHTML = "";
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

        const firstName = usersArray.map(u => u.firstname);
        const city = usersArray.map(u => u.city);
        const cardCodes = usersArray.map(u => u.cardCode);
  
        for (let i = 0; i < usersArray.length; i++) {
            document.getElementById('tablerows-0').children[i].classList.remove('searched-box')
            if (searchQuery == usersArray[i].firstname || searchQuery == usersArray[i].city || searchQuery == usersArray[i].cardCode) {
                document.getElementById('search-btn').href = '#tablerows-0'; 
                document.getElementById('tablerows-0').children[i].classList.add('searched-box')
                document.getElementById('search-span-id').classList.remove('show-search-txt')
                document.getElementById('search-span-id').classList.add('hide-search-txt')
            } else if( (firstName.includes(searchQuery) || city.includes(searchQuery) || cardCodes.includes(searchQuery)) == false){

                document.getElementById('search-span-id').classList.remove('hide-search-txt')
                document.getElementById('search-span-id').classList.add('show-search-txt')
            }
        }
    }
};


/*----------------------------------*/
/*-----------------------------------*/

function prepareTableCell(index, firstName, city, cardCode, invokedFrom) {
    var table = document.getElementById("tablerows-0");
    var row = table.insertRow();
    var firstNameCell = row.insertCell(0);
    var cityCell = row.insertCell(1);
    var cardCell = row.insertCell(2);
    var actionCell = row.insertCell(3);
    firstNameCell.innerHTML = firstName;
    cityCell.innerHTML = city;
    cardCell.innerHTML = cardCode;
    actionCell.innerHTML = '<button onclick="onEditPressed(' + index + ')">Edit</button class="btn-del-style"><br/><button onclick="deleteTableRow(' + index + ')">Delete</button>';

   //-----------------------------------------
   //--------------------------------------------

};


function deleteTableRow(index) {
    usersArray.splice(index, 1);
    var deletePrompt = prompt('Do you really want to delete cell?', 'yes');
    if (deletePrompt == 'yes') {
        localStorage.studentsRecord = JSON.stringify(usersArray);
        init();
    }
};

function onClarPressed() {
    selectedIndex = -1;
    document.getElementById("firstname-id").value = "";
    document.getElementById("city-id").value = "";
    document.getElementById("submit").innerHTML = "Submit User";
    //you need to clear also the select/options tags to initial value
};


function onEditPressed(index) { 
    selectedIndex = index;
    var cardInfo = usersArray[index];
    document.getElementById("firstname-id").value = cardInfo.firstname;
    document.getElementById("city-id").value = cardInfo.city;
    document.getElementById("submit").innerHTML = "Update";
};