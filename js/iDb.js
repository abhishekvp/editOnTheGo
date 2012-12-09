var editor = {};
window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;

if ('webkitIndexedDB' in window) {
  window.IDBTransaction = window.webkitIDBTransaction;
  window.IDBKeyRange = window.webkitIDBKeyRange;
}
editor.indexedDB = {};
editor.indexedDB.db = null;
editor.indexedDB.open = function () {
  var v = 1; // used to deal with versions
  var request = indexedDB.open("documents", v); 
  request.onsuccess = function (e) {
    editor.indexedDB.db = e.target.result;
    var db = editor.indexedDB.db;


	
	
    //code for db init
    if (v != db.version && db.setVersion) {
      var setVrequest = db.setVersion(v);

      // onsuccess is the only place we can create Object Stores
      setVrequest.onerror = editor.indexedDB.onerror;
      setVrequest.onsuccess = function (e) {
        if (db.objectStoreNames.contains("doc")) {
          db.deleteObjectStore("doc");
        }

        var store = db.createObjectStore("doc", {
          keyPath: "timeStamp"
        });

        editor.indexedDB.getAllTodoItems();
      };
    } else {
      editor.indexedDB.getAllTodoItems();
    }
  };

  request.onerror = editor.indexedDB.onerror;
}

editor.indexedDB.saveDoc = function saveDocument(docName, docContent) {
  var db = editor.indexedDB.db;
  var trans = db.transaction(["doc"], "readwrite");
  var store = trans.objectStore("doc");

  var data = {
    "filename": docName,
    "text": docContent,
    "timeStamp": new Date().getTime()
  };

  var request = store.put(data);

  request.onsuccess = function (e) {
    editor.indexedDB.getAllTodoItems();
  };

  request.onerror = function (e) {
    console.log("Error Adding: ", e);
  };
};

editor.indexedDB.deleteTodo = function (id) {
  var db = editor.indexedDB.db;
  var trans = db.transaction(["doc"], "readwrite");
  var store = trans.objectStore("doc");

  var request = store.delete(id);

  request.onsuccess = function (e) {
    editor.indexedDB.getAllTodoItems();
  };

  request.onerror = function (e) {
    console.log("Error Adding: ", e);
  };
};

editor.indexedDB.getAllTodoItems = function () {
  var todos = document.getElementById("todoItems");
  todos.innerHTML = "";

  var db = editor.indexedDB.db;
  var trans = db.transaction(["doc"], "readwrite");
  var store = trans.objectStore("doc");

  // Get everything in the store;
  var cursorRequest = store.openCursor();

  cursorRequest.onsuccess = function (e) {
    var result = e.target.result;
    if ( !! result == false) return;

    renderTodo(result.value);
    result.
    continue ();
  };

  cursorRequest.onerror = editor.indexedDB.onerror;
};

function renderTodo(row) {
  var todos = document.getElementById("todoItems");
  var li = document.createElement("li");
  var a = document.createElement("a");
  var a1 = document.createElement("a");


  a1.addEventListener("click", function () {
    document.getElementsByTagName('section')[0].innerHTML = row.text;
  }, false);


  a.addEventListener("click", function () {
    editor.indexedDB.deleteTodo(row.timeStamp);
  }, false);

  a.textContent = " [Delete]";
  a1.textContent = row.filename;
  li.appendChild(a1);
  li.appendChild(a);
  todos.appendChild(li);
}

function saveDoc() {
  var docName = document.getElementById('docName').value;
  var docContent = document.getElementsByTagName('section')[0].innerHTML;
  editor.indexedDB.saveDoc(docName, docContent);
  document.getElementById('docName').value = "";
}

function init() {
  editor.indexedDB.open();
}

window.addEventListener("DOMContentLoaded", init, false);