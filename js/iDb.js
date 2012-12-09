var db;
const dbName = "documents";

/**
 *Checks browser compatibilty with indexedDB and calls |initIndexedDB()|
 */
function init() {
  window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
  if (!window.indexedDB) window.alert("Your browser doesn't support a stable version of IndexedDB. Saving and Loading Documents feature will not be available.");
  else initIndexedDB();
};

/**
 *Creates or opens database.
 *Calls |displayDocList()| to display the list of documents in the database.
 */
function initIndexedDB() {
  var request = indexedDB.open(dbName);

  request.onerror = function (event) {
    alert("Error Opening/Creating Database");
  }

  request.onsuccess = function (event) {
    db = request.result;
    displayDocList();
  }

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("doc", {
      keyPath: "timeStamp"
    });
  }
};

/**
 *Saves the document in the database.
 *	@param	docName
 *		Name of the Document 
 *	@param	docContent
 *		Content of the Document.
 *
 *	Database Structure :
 *		Key Path : timeStamp
 *		Field (text) : Document Name
 * 		Field (text) : Document Contents
 *		
 */
function saveDocument(docName, docContent) {
  trans = db.transaction(["doc"], "readwrite");
  store = trans.objectStore("doc");
  var data = {
    "filename": docName,
    "text": docContent,
    "timeStamp": new Date().getTime()
  };
  request = store.put(data);
  request.onsuccess = function (e) {
    displayDocList();
  };
  request.onerror = function (e) {
    alert("An Error Occured while Saving Document!");
  };
};

/**
 *Deletes the document from the database.
 *	@param	id
 *		timeStamp of the document that needs to be deleted 
 */
function deleteDoc(id) {
  trans = db.transaction(["doc"], "readwrite");
  store = trans.objectStore("doc");
  request = store.delete(id);
  request.onsuccess = function (e) {
    document.getElementsByTagName('section')[0].innerHTML = "";
    displayDocList();
  };

  request.onerror = function (e) {
    alert("Delete Request Error !");
  };
};

/**
 *Displays the list of document present in the database.
 */
function displayDocList() {
  var listElement = document.getElementById("docList");
  listElement.innerHTML = "";

  var trans = db.transaction(["doc"], "readwrite");
  var store = trans.objectStore("doc");

  var cursorRequest = store.openCursor();
  cursorRequest.onsuccess = function (e) {
    var result = e.target.result;
    if ( !! result == false) return;
    renderTodo(result.value);
    result.
    continue ();
  };

  cursorRequest.onerror = function (e) {
    alert("Cursor Request Error !");
  }
};

/**
 *Renders the Document list on the Web page.
 */
function renderTodo(row) {
  var listElement = document.getElementById("docList");
  var li = document.createElement("li");
  var a = document.createElement("a");
  var aDel = document.createElement("a");
  a.addEventListener("click", function () {
    document.getElementsByTagName('section')[0].innerHTML = row.text;
  }, false);

  aDel.addEventListener("click", function () {
    deleteDoc(row.timeStamp);
  }, false);

  aDel.textContent = " [Delete]";
  a.textContent = row.filename;
  li.appendChild(a);
  li.appendChild(aDel);
  listElement.appendChild(li);
};

/**
 *Captures the user input values of Document Name and Document Contents from Web page. 
 *Calls |saveDocument()| method.
 */
function saveDoc() {
  var docName = document.getElementById('docName').value;
  var docContent = document.getElementsByTagName('section')[0].innerHTML;
  alert("test");
  saveDocument(docName, docContent);
  document.getElementById('docName').value = "";
};