var usersArray = [],
    selectedIndex = -1;
var cardCodes, city, firstName, filterDOM;
var cardCategory = [],
    cardPercentage = [],
    cardExpiration;

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
    var cardNumbArr = [],
        cardNumber, cardOptionId = [];
    var cardExpiration, dateFormatted;
    cardOptionId = ['category-id', 'accumulation-id', 'percentage-id'];
    cardExpiration = document.getElementById('expiration-id').value;
    dateFormatted = moment(cardExpiration).format("DDMMYY");

    for (let n = 0; n < cardOptionId.length; n++) {
        cardNumbArr.push(document.getElementById(cardOptionId[n]).value);
    }
    cardNumbArr.push(dateFormatted)
    cardNumber = Number(cardNumbArr.join(''));

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


function onSearchPressed(calledFrom) {
    var searchQuery = document.getElementById('search-querry').value;
    var arrayFromCode = [];
    //var searchSpan = document.getElementById('search-span-id');
    if (localStorage.studentsRecord) {
        usersArray = JSON.parse(localStorage.studentsRecord);

        firstName = usersArray.map(u => u.firstname);
        city = usersArray.map(u => u.city);
        cardCodes = usersArray.map(u => u.cardCode);



        for (let i = 0; i < usersArray.length; i++) {
            document.getElementById('tablerows-0').children[i].classList.remove('searched-box')
            if (searchQuery == usersArray[i].firstname || searchQuery == usersArray[i].city || searchQuery == usersArray[i].cardCode) {
                document.getElementById('search-btn').href = '#tablerows-0';
                document.getElementById('tablerows-0').children[i].classList.add('searched-box')

                if (calledFrom == 'filter') {
                    filterDOM = document.getElementById('filter-searched-code').value;
                    console.log(filterDOM)

                    cardPercentage.push((String(cardCodes[i])[2] + String(cardCodes[i])[3]).split(' ').join()) //percentage PART
                    cardCategory.push(String(cardCodes[i])[0]); //card category PART
                    cardExpiration.push(String(cardCodes[i].substr(4)))
                    //--------------------------------------------------------------

                    if (cardPercentage.includes(String(filterDOM)) || cardCategory.includes(filterDOM) || cardExpiration.includes(filterDOM)) {
                        console.log('works')
                        document.getElementById('tablerows-0').children[i].style.border = '5px solid blue'
                    }
                    //--------------------------------------------------------------
                } //if called from filter buttons

                //======================================================================================================================//
            } else if ((firstName.includes(searchQuery) || city.includes(searchQuery) || cardCodes.includes(searchQuery)) == false) {
                alert('Search term doesn\'t exist!')
                return;
            }
        }
    }
};



function sortUsers(sortArg) {
    if (localStorage.studentsRecord) {
        var userProp = document.getElementById('sort-opt-ascending').value;
        var userPropDesc = document.getElementById('sort-opt-descending').value;
        usersArray = JSON.parse(localStorage.studentsRecord);

        if (sortArg == 'ascending') {
            usersArray.sort((a, b) => {
                return a[userProp] === b[userProp] ? 0 : a[userProp] < b[userProp] ? -1 : 1; //ternary inside ternary.
            })
        } else {
            usersArray.sort((a, b) => {
                return a[userPropDesc] === b[userPropDesc] ? 0 : a[userPropDesc] > b[userPropDesc] ? -1 : 1;
            })
        }
        localStorage.studentsRecord = JSON.stringify(usersArray); //send back to localStorage
        init();
    }
};


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
    submitDom.style.border = '2px solid darkred';
    submitDom.style.boxShadow = '5px 5px 5px darkred';
    document.querySelector('.form-cont').style.backgroundColor = '#c4c4c4';
};