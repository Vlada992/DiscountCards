var usersArray = [], selectedIndex = -1;
var cardCodes, city, firstName, filterDOM, cardCode;
var cardCategory = [], cardPercentage = [], cardExpiration1;
var cardExpiration,  cardExp = [], allRowsDom = [];

var regTable =  document.getElementById('regtable').style;
var tableRow0 = document.getElementById("tablerows-0");

function init() {
    tableRow0.innerHTML = "";
    regTable.display = 'table';

    if (localStorage.studentsRecord) {
        usersArray = JSON.parse(localStorage.studentsRecord);
        for (var i = 0; i < usersArray.length; i++) {
            prepareTableCell(i, usersArray[i].firstname, usersArray[i].city, usersArray[i].cardCode);
        }
    }
};

function onRegisterPressed() {
    var cardNumbArr = [], cardNumber, cardOptionId = [], dateFormatted;
    cardOptionId = ['category-id', 'accumulation-id', 'percentage-id'];
    cardExpiration = document.getElementById('expiration-id').value;
    cardExpiration1 = document.getElementById('expiration-id-1').value;
    dateFormatted = moment(cardExpiration).format("DDMMYY");

    for (let n = 0; n < cardOptionId.length; n++) {
        cardNumbArr.push(document.getElementById(cardOptionId[n]).value);
    }
    cardNumbArr.push(dateFormatted)
    cardNumber = Number(cardNumbArr.join(''));

    firstName = document.getElementById("firstname-id").value;
    city = document.getElementById("city-id").value;
    cardCode = cardNumber;

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
    onClearPressed();
};


function onSearchPressed(calledFrom) {
    regTable.display = 'table';
    var searchQuery = document.getElementById('search-querry').value;

    if (localStorage.studentsRecord) {
        usersArray = JSON.parse(localStorage.studentsRecord);
        firstName = usersArray.map(u => u.firstname);
        city = usersArray.map(u => u.city);
        cardCodes = usersArray.map(u => u.cardCode); 

        for (let i = 0; i < usersArray.length; i++) {
            tableRow0.children[i].style.display = 'none';

            if (searchQuery == usersArray[i].firstname || searchQuery == usersArray[i].city || searchQuery == usersArray[i].cardCode) {
                document.getElementById('search-btn').href = '#tablerows-0';
                tableRow0.children[i].style.display = 'table-row'

                allRowsDom.push(tableRow0.children[i])
                cardPercentage.push((String(cardCodes[i])[2] + String(cardCodes[i])[3]).split(' ').join())
                cardCategory.push(String(cardCodes[i])[0]);
                cardExp.push(String(cardCodes).substr(4))

                if (calledFrom == 'filter') {
                    filterDOM = document.getElementById('filter-searched-code').value;

                    if (cardPercentage.includes(filterDOM)  ) {
                        Array.from(allRowsDom).map((eachEl, itr) => {
                            eachEl.style.display = 'none';
                            if (eachEl.cells[2].innerText.slice(2, 4) == filterDOM) {
                                eachEl.style.display = 'table-row';
                            }
                        })
                    } else if(cardCategory.includes(filterDOM)){
                        Array.from(allRowsDom).map((eachEl, itr) => {
                            eachEl.style.display = 'none';
                            if (eachEl.cells[2].innerText.slice(0,1) == filterDOM) {
                                eachEl.style.display = 'table-row';
                            }
                        })
                    } else if(cardExp.includes(filterDOM)){
                        console.log('bla')
                    } else regTable.display = 'none'
                }
                //======================================================================================================================//
            } else if ((firstName.includes(searchQuery) || city.includes(searchQuery) || cardCodes.includes(searchQuery)) == false) {
                alert('Search term doesn\'t exist!')
                tableRow0.style.visibility = 'hidden';
                regTable.display = 'none';
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
        localStorage.studentsRecord = JSON.stringify(usersArray);
        init();
    }
};


function prepareTableCell(index, firstName, city, cardCode) {
    var table = tableRow0;
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

function onClearPressed() {
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