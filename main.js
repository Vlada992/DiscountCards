var usersArray = [];
var selectedIndex = -1;

console.log('It is:', localStorage.studentsRecord)

function init() {
    document.getElementById("tablerows-0").innerHTML = "";
    if (localStorage.studentsRecord) {
        usersArray = JSON.parse(localStorage.studentsRecord);
        for (var i = 0; i < usersArray.length; i++) {
            prepareTableCell(i, usersArray[i].firstname, usersArray[i].city, usersArray[i].cardCode);
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
    var searchSpan = document.getElementById('search-span-id');
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
                //searchSpan.classList.remove('show-search-txt')
                //searchSpan.classList.add('hide-search-txt')
            } else if( (firstName.includes(searchQuery) || city.includes(searchQuery) || cardCodes.includes(searchQuery)) == false){
                //searchSpan.classList.remove('hide-search-txt')
                //searchSpan.classList.add('show-search-txt')
                alert('Search term doesn\'t exist!')
                return
            }
        }
    }
};



function sortUsers(sortArg){
    if (localStorage.studentsRecord) {
        var userProp = document.getElementById('sort-opt-ascending').value;
        var userPropDesc = document.getElementById('sort-opt-descending').value
    usersArray = JSON.parse(localStorage.studentsRecord);

    if(sortArg == 'ascending'){
        usersArray.sort(function(a, b){
            return a[userProp] === b[userProp] ? 0 : a[userProp] < b[userProp] ? -1 : 1;
        })    
    } else {
        usersArray.sort((a,b)=> {
            return a[userPropDesc] === b[userPropDesc] ? 0 : a[userPropDesc] > b[userPropDesc] ? -1 : 1;
        })
    }
    
    console.log(usersArray)
    localStorage.studentsRecord = JSON.stringify(usersArray); //send back to localStorage
    init();
    }
    //znaci sortiraj i skupinu sa istim imenima/prezimenima i slicno.
}

function filterCardCode(){
    console.log('test');
    console.log(document.getElementById('category-id').value)
}

function prepareTableCell(index, firstName, city, cardCode) {
    var table = document.getElementById("tablerows-0");
    var row = table.insertRow();
    var firstNameCell = row.insertCell(0);
    var cityCell = row.insertCell(1);
    var cardCell = row.insertCell(2);
    var actionCell = row.insertCell(3);
    firstNameCell.innerHTML = firstName;
    cityCell.innerHTML = city;
    cardCell.innerHTML = cardCode;
    actionCell.innerHTML = '<a class="btn btn-primary" href="#form-cont-id" onclick="onEditPressed(' + index + ')">Edit</a><br/><a class="btn btn-primary btn-prim-del" onclick="deleteTableRow(' + index + ')">Delete</a>';
   //-----------------------------------------
   //-----------------------------------------
   
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
};


function onEditPressed(index) { 
    selectedIndex = index;
    var cardInfo = usersArray[index];
    var submitDom = document.getElementById("submit");
    document.getElementById("firstname-id").value = cardInfo.firstname;
    document.getElementById("city-id").value = cardInfo.city;
    submitDom.value = "Update";
    submitDom.style.border= '2px solid darkred';
    submitDom.style.boxShadow = '5px 5px 5px darkred';
    document.querySelector('.form-cont').style.backgroundColor = '#c4c4c4';
};