var oldTable;
var oldName;
var oldAge;

function save() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var table = document.getElementById("register");
    oldTable = document.getElementById("register");
    var canSave = checkSave(table, name);
    if (canSave == 0) {

        var rowNumber = table.rows.length
        var row = table.insertRow(-1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.setAttribute('id', "name-" + rowNumber);
        cell2.setAttribute('id', "age-" + rowNumber);

        cell1.innerHTML = name;
        cell2.innerHTML = age;
        cell3.innerHTML = "<input id=del_btn-" + rowNumber + " type=\"button\" value=\"delete\" onclick=\"deleteRow(this)\" />";
        cell3.innerHTML += "<input id=edit_btn-" + rowNumber + " type=\"button\" value=\"edit\" onclick=\"editRow(" + rowNumber + ")\" />";
        cell3.innerHTML += "<input id=save_btn-" + rowNumber + " style='display: none;' type=\"button\" value=\"save\" onclick=\"saveRow(" + rowNumber + ")\" />";
        cell3.innerHTML += "<input id=cancel_btn-" + rowNumber + " style='display: none;' type=\"button\" value=\"cancel\" onclick=\"cancelRow(" + rowNumber + ")\" />";
    } else {
        alert("Nome repetido!");
    }
    orderTableDescByAge(table)
}

function checkSave(table, name) {
    var count = 0;
    for (var r = 0, n = table.rows.length; r < n; r++) {
        for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
            var name2 = table.rows[r].cells[c].innerHTML;
            if (name.toUpperCase() == name2.toUpperCase()) {
                count++;
            }
        }
    }
    return count;
}

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    let resposta = confirm("Tem certeza que deseja excluir essa linha?")

    if (resposta == true) {
        document.getElementById("register").deleteRow(i);
    }
}

function editRow(no) {
    document.getElementById("edit_btn-" + no).style.display = "none";
    document.getElementById("save_btn-" + no).style.display = "block";
    document.getElementById("cancel_btn-" + no).style.display = "block";

    var name = document.getElementById("name-" + no);
    var age = document.getElementById("age-" + no);

    var nameData = name.innerHTML;
    var ageData = age.innerHTML;

    oldName = nameData;
    oldAge = ageData;

    name.innerHTML = "<input type='text' id='name_text" + no + "' value='" + nameData + "'>";
    age.innerHTML = "<input type='text' id='age_text" + no + "' value='" + ageData + "'>";
}

function saveRow(no) {
    var nameVal = document.getElementById("name_text" + no).value;
    var ageVal = document.getElementById("age_text" + no).value;

    var canSave = checkSave(oldTable, nameVal);

    if (canSave == 0) {
        document.getElementById("name-" + no).innerHTML = nameVal;
        document.getElementById("age-" + no).innerHTML = ageVal;

        document.getElementById("edit_btn-" + no).style.display = "block";
        document.getElementById("save_btn-" + no).style.display = "none";
        document.getElementById("cancel_btn-" + no).style.display = "none";
    } else {
        alert("Nome repetido!");
    }
    orderTableDescByAge(oldTable)
}

function cancelRow(no) {
    document.getElementById("name-" + no).innerHTML = oldName;
    document.getElementById("age-" + no).innerHTML = oldAge;

    document.getElementById("edit_btn-" + no).style.display = "block";
    document.getElementById("save_btn-" + no).style.display = "none";
    document.getElementById("cancel_btn-" + no).style.display = "none";
}

function orderTableDescByAge(table) {
    var rows, switching, i, x, y, shouldSwitch;
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];
            if (Number(x.innerHTML) < Number(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function order(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("register");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (Number(x.innerHTML) > Number(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (Number(x.innerHTML) < Number(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}