var html5rocks = {};
window.indexedDB = window.indexedDB || window.webkitIndexedDB ||
                         window.mozIndexedDB;
      
      if ('webkitIndexedDB' in window) {
        window.IDBTransaction = window.webkitIDBTransaction;
        window.IDBKeyRange = window.webkitIDBKeyRange;
      }
html5rocks.indexedDB = {};
html5rocks.indexedDB.db = null;
html5rocks.indexedDB.open = function() {
  var v = 1;
  var request = indexedDB.open("documents", v);

  //Firefox code for db init
  request.onupgradeneeded = function (e) {
    html5rocks.indexedDB.db = e.target.result;
    var db = html5rocks.indexedDB.db;
    // We can only create Object stores in a setVersion transaction;

    if(db.objectStoreNames.contains("todo")) {
        var storeReq = db.deleteObjectStore("todo");
    }

    var store = db.createObjectStore("todo",
        {keyPath: "timeStamp"});

  }

  request.onsuccess = function(e) {
    html5rocks.indexedDB.db = e.target.result;
    var db = html5rocks.indexedDB.db;

    //Chrome code for db init
    if (v!= db.version && db.setVersion) {
      var setVrequest = db.setVersion(v);

      // onsuccess is the only place we can create Object Stores
      setVrequest.onerror = html5rocks.indexedDB.onerror;
      setVrequest.onsuccess = function(e) {
        if(db.objectStoreNames.contains("todo")) {
          db.deleteObjectStore("todo");
        }

        var store = db.createObjectStore("todo",
          {keyPath: "timeStamp"});

        html5rocks.indexedDB.getAllTodoItems();
      };
    }
    else {
        html5rocks.indexedDB.getAllTodoItems();
	}
  };

  request.onerror = html5rocks.indexedDB.onerror;
}
      
      html5rocks.indexedDB.addTodo = function(fn,todoText) {
        var db = html5rocks.indexedDB.db;
        var trans = db.transaction(["todo"], "readwrite");
        var store = trans.objectStore("todo");
      
        var data = {
		  "filename":fn,
          "text": todoText,
          "timeStamp": new Date().getTime()
        };
      
        var request = store.put(data);
      
        request.onsuccess = function(e) {
          html5rocks.indexedDB.getAllTodoItems();
        };
      
        request.onerror = function(e) {
          console.log("Error Adding: ", e);
        };
      };
      
      html5rocks.indexedDB.deleteTodo = function(id) {
        var db = html5rocks.indexedDB.db;
        var trans = db.transaction(["todo"], "readwrite");
        var store = trans.objectStore("todo");
      
        var request = store.delete(id);
      
        request.onsuccess = function(e) {
          html5rocks.indexedDB.getAllTodoItems();
        };
      
        request.onerror = function(e) {
          console.log("Error Adding: ", e);
        };
      };
      
      html5rocks.indexedDB.getAllTodoItems = function() {
        var todos = document.getElementById("todoItems");
        todos.innerHTML = "";
  
        var db = html5rocks.indexedDB.db;
        var trans = db.transaction(["todo"], "readwrite");
        var store = trans.objectStore("todo");
        
        // Get everything in the store;
        var cursorRequest = store.openCursor();
   
        cursorRequest.onsuccess = function(e) {
          var result = e.target.result;
          if(!!result == false)
            return;
     
          renderTodo(result.value);
          result.continue();
        };
          
        cursorRequest.onerror = html5rocks.indexedDB.onerror;
      };
      
      function renderTodo(row) {
        var todos = document.getElementById("todoItems");
        var li = document.createElement("li");
        var a = document.createElement("a");
		var a1 = document.createElement("a");
       
		
		a1.addEventListener("click", function() {
          document.getElementsByTagName('section')[0].innerHTML = row.text;
        }, false);

      
        a.addEventListener("click", function() {
          html5rocks.indexedDB.deleteTodo(row.timeStamp);
        }, false);
      
        a.textContent = " [Delete]";
        a1.textContent = row.filename;
	    li.appendChild(a1);
        li.appendChild(a);
        todos.appendChild(li);
      }
      
      function addTodo() {
	    var fn = document.getElementById('todo').value;
        var todo = document.getElementsByTagName('section')[0].innerHTML;
        html5rocks.indexedDB.addTodo(fn, todo);
        todo = "";
		document.getElementById('todo').value = "";
      }
      
      function init() {
        html5rocks.indexedDB.open();	
      }
 
      window.addEventListener("DOMContentLoaded", init, false);
      
    
 