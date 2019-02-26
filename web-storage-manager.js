

//session storage manager use this list to keep data.

document.addEventListener("DOMContentLoaded", function (event) {

    if (typeof (Storage) !== "undefined") {
        document.getElementById("main").innerHTML += 'Mr.Budala says:<br/>Nicely done. Your browser supports Web Storage.<br/><br/>';

        if (budala.defaultStorage == null) {

            document.getElementById("main").innerHTML += 'You did not set budala.defaultStorage. So i set it as session storage. <br/>';
            document.getElementById("main").innerHTML += 'If you want to use sessionStorage, you can set on document ready.<br/>';
            document.getElementById("main").innerHTML += 'Use <b>budala.help()</b> function to get help<br/>';
            budala.defaultStorage = sessionStorage;
        } 
        else {
            var tmp = budala.defaultStorage.getItem(budala.settings.webStorageKey);
            if (tmp === null || tmp === '') {
                budala.defaultStorage.setItem(budala.settings.webStorageKey, JSON.stringify([]));
            }
        }

    } else {
        // Sorry! No Web Storage support..
        document.getElementById("main").innerHTML += 'Mr.Budala says: "Sorry! Your browser does not support Web Storage".<br/>';
    }
});

var budala = {
    help: function () {
        console.log('---------------------- methods -----------------------')
        console.log('budala.defaultStorage = sessionStorage; or budala.defaultStorage = localStorage;');
        console.log('budala.addDummyData() to add some data to the list in webstorage');
        console.log('budala.addIt(id, name) to add data to the list in webstorage');
        console.log('budala.getIt(id) to get your data by id from the list in webstorage');
        console.log('budala.getAll(id) to get your all data from the list in webstorage');
        console.log('budala.getIDList() to get your all data id list from the list in webstorage');
        console.log('budala.removeIt(id) to remove your data by id from the list in webstorage');
        console.log('budala.removeAll() to remove your all data from the list in webstorage');
        console.log('');
        console.log('');
        console.log('------------------additional informations--------------------');
        console.log('budala.settings.webStorageKey set with default value: "budalaStorageManagerKey"');
        console.log('budala.settings.consoleMessageIsOn set as false. If you want to see console messages, you can set this property as true on document ready.');
    },
    defaultStorage: null,
    settings: {
        webStorageKey: 'budalaStorageManagerKey', //this is the session key to keep list
        consoleMessageIsOn: true //if you turn on this, you will see all messages on console after each methods.

    },
    addDummyData: function () {
        var list = JSON.parse(budala.defaultStorage.getItem(budala.settings.webStorageKey));
        if (list === null || list === '') {
            list = [];
            budala.defaultStorage.setItem(budala.settings.webStorageKey, JSON.stringify(list));
        }
        list.push({ ID: Math.floor((Math.random() * 100) + 1), Number: Math.floor((Math.random() * 10000) + 1), Name: 'Budala' });
        list.push({ ID: Math.floor((Math.random() * 100) + 1), Number: Math.floor((Math.random() * 10000) + 1), Name: 'Aycan' });
        budala.defaultStorage.setItem(budala.settings.webStorageKey, JSON.stringify(list));

        if (budala.settings.consoleMessageIsOn)
            console.log('Mr.Budala says: "Added two dummy data to list on session storage".');
    },
    addIt: function (id, name) {
        var list = JSON.parse(budala.defaultStorage.getItem(budala.settings.webStorageKey));
        list.push({ ID: id, Name: name });
        budala.defaultStorage.setItem(budala.settings.webStorageKey, JSON.stringify(list));
    },
    getIt: function (id) {
        var list = JSON.parse(budala.defaultStorage.getItem(budala.settings.webStorageKey));
        var item = findElement(list, 'ID', id);
        console.log(item);
    },
    getAll: function () {
        var list = JSON.parse(budala.defaultStorage.getItem(budala.settings.webStorageKey));
        ////sort list
        //list.items.sort(function (obj1, obj2) {
        //    return new Date(obj2.EklenmeTarihi) - new Date(obj1.EklenmeTarihi);
        //});
        return list;
    },
    getIDList: function () {
        var list = JSON.parse(budala.defaultStorage.getItem(budala.settings.webStorageKey));
        var retval = new Array();

        for (i = 0; i < list.length; i++) {
            retval.push(list[i].ID);
        }
        return retval;
    },
    removeIt: function (id) {
        var list = JSON.parse(budala.defaultStorage.getItem(budala.settings.webStorageKey));
        var item = findElement(list, 'ID', id);
        var index = list.indexOf(item);
        list.splice(index, 1);

        budala.defaultStorage.setItem(budala.settings.webStorageKey, JSON.stringify(list));
        if (budala.settings.consoleMessageIsOn)
            console.log('Mr.Budala says: "Item has been deleted from list."');


    },
    removeAll: function () {
        budala.defaultStorage.setItem(budala.settings.webStorageKey, JSON.stringify([]));

        if (budala.settings.consoleMessageIsOn)
            console.log('Mr.Budala says: "Removed all data from list."');
    },
    getDefaultStorageSize: function () {
        var allStrings = '';
        for (var key in budala.defaultStorage) {
            if (budala.defaultStorage.hasOwnProperty(key)) {
                allStrings += budala.defaultStorage[key];
            }
        }
        return allStrings ? 3 + ((allStrings.length * 16) / (8 * 1024)) + ' KB' : 'Empty (0 KB)';
    }
}

function findElement(arr, propName, propValue) {
    for (var i = 0; i < arr.length; i++)
        if (arr[i][propName] == propValue)
            return arr[i];

    // will return undefined if not found; you could return a default instead
}