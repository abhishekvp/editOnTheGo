/**
 * iDb.js: IndexedDB has been used for storage, retrieval and deletion of Documents from database.
 * 
 * Database Details:
 * 
 * Database :  documents
 * ObjectStore : doc
 * 
 * Each entry is an object with fields timeStamp (number, which serves as key), filename (string, the document name), 
 * text (string, the contents of the document, generally in html).
 * 
 * Structure of Database Used:
 *		      Key Path : timeStamp
 *		      Field (text) : Document Name
 * 		      Field (text) : Document Contents [Generally in HTML]
 *
 */
var db;
const DB_NAME = "documents";

/**
 *Checks browser compatibilty with indexedDB and calls |initIndexedDB()|
 */
function init() {
  window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Saving and Loading Documents feature will not be available.");
  } else {
    initIndexedDB();
  }
};

/**
 *Creates or opens database.
 *Calls |displayDocList()| to display the list of documents in the database.
 */
function initIndexedDB() {
  var request = window.indexedDB.open(DB_NAME);

  request.onerror = function onError_Init(event) {
    alert("Error Opening/Creating Database");
  }

  request.onsuccess = function onSuccess_Init(event) {
    db = request.result;
    displayDocList();
  }

  request.onupgradeneeded = function onUpgradeNeeded(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("doc", {
      keyPath: "timeStamp"
    });
  }
};

/**
 *Saves the document in the database.
 *	@param	docName
 *		      Name of the Document 
 *	@param	docContent
 *		      Content of the Document.
 *		
 */
function saveDocument(docName, docContent) {
  var trans = db.transaction(["doc"], "readwrite");
  var store = trans.objectStore("doc");
  var data = {
    "filename": docName,
    "text": docContent,
    "timeStamp": Date.now()
  };
  var request = store.put(data);
  request.onsuccess = function onSuccess_Save(e) {
    displayDocList();
  };
  request.onerror = function onError_Save(e) {
    alert("An Error Occured while Saving Document!");
  };
};

/**
 *Deletes the document from the database.
 *	@param	id
 *		      timeStamp of the document that needs to be deleted 
 */
function deleteDoc(id) {
  var trans = db.transaction(["doc"], "readwrite");
  var store = trans.objectStore("doc");
  var request = store.delete(id);
  request.onsuccess = function onSuccess_Del(e) {
    displayDocList();
  };

  request.onerror = function onError_Del(e) {
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
  cursorRequest.onsuccess = function onSuccess_Cursor(e) {
    var result = e.target.result;
    if ( !! result == false) return;
    renderDocNames(result.value);
    result.continue ();
  };

  cursorRequest.onerror = function onError_Cursor(e) {
    alert("Cursor Request Error !");
  }
};

/**
 *Renders the Document list on the Web page.
 *  @param	row
 *			    It is a tuple containing the atrributes Document Name, Time Stamp and Document Contents.
 */
function renderDocNames(row) {
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
  saveDocument(docName, docContent);
  document.getElementById('docName').value = "";
};
