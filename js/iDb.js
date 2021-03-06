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
var db, fn, tmp, uTime;
const DB_NAME = "documents";


/**
 *Checks browser compatibilty with indexedDB and calls |initIndexedDB()|
 */
function init() {
 if(!window.navigator.mozSetMessageHandler)
 {
   document.getElementById('export_file').disabled = true;
   document.getElementById('pick_file').disabled = true;
 }
  chkInstall();
  chkPrintCompat();
  window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Saving and Loading Documents feature will not be available.");
  } else {
    initIndexedDB();
	document.getElementById('saveButton').disabled = true;
	setInterval(function(){autoSave()},10000);
	currentDoc();
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
 *	        Name of the Document 
 *	@param	docContent
 *	        Content of the Document.
 *		
 */
function saveDocument(docName, docContent, timeStamp) {
  var trans = db.transaction(["doc"], "readwrite");
  var store = trans.objectStore("doc");
  if(timeStamp==" "){
  timeStamp = Date.now();
  tmp = timeStamp;
  }
  else
  timeStamp = tmp;
    var data = {
    "filename": docName,
    "text": docContent,
    "timeStamp": timeStamp
  };
  var request = store.put(data);
  request.onsuccess = function onSuccess_Save(e) {
    displayDocList();
  };
  request.onerror = function onError_Save(e) {
    alert("An Error Occured while Saving Document!");
  };
  document.getElementById('saveButton').disabled = false;
  currentDoc();
};

/**
 *Deletes the document from the database.
 *	@param	id
 *	        timeStamp of the document that needs to be deleted 
 */
function deleteDoc(id) {
  var trans = db.transaction(["doc"], "readwrite");
  var store = trans.objectStore("doc");
  var request = store.delete(id);
  fn = null;
  document.getElementById('saveButton').disabled = true;
  request.onsuccess = function onSuccess_Del(e) {
    displayDocList();
  };

  request.onerror = function onError_Del(e) {
    alert("Delete Request Error !");
  };
  currentDoc();
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
 *Captures the user input values of Document Name and Document Contents from Web page. 
 *Calls |saveDocument()| method.
 */
function saveAsDoc() {
  var docName = prompt("Please enter document name","");
  var tmpDocName = docName.replace(/^\s+|\s+$/, '');
  if(tmpDocName.length!=0) {
    var docContent = document.getElementById('contentE').innerHTML;
    //alert("This is going to be saved:\n"+docContent);
    fn = docName;
    saveDocument(docName, docContent, " ");
    alert("Document "+docName+" saved successfully !");
    document.getElementById('docName').value = "";
  }
};

/**
 *Updates already saved document 
 *Calls |saveDocument()| method.
 */
function saveDoc() {
  var docName = fn;
  //alert("This is going to be saved:\n"+docContent);
  var docContent = document.getElementById('contentE').innerHTML;
  saveDocument(docName, docContent, tmp);
  
};

function autoSave() {
  if(fn!=null){
  var docName = fn;
  var docContent = document.getElementById('contentE').innerHTML;
  uTime=(new Date).getTime();
  //alert("This is going to be saved:\n"+docContent);
  saveDocument(docName, docContent, tmp);
  console.log("Auto saved");
  }
  else
  console.log("No file selected for auto saving");
};
function checkCurrentDoc() {
	if(fn!=null) {
	if(uTime) {
		var pressed = confirm("Document "+fn+" was Auto-saved "+(((new Date).getTime()-uTime)/1000)+"s ago. Do you wish to save the document now?");
		if(pressed==true) {
		saveDoc();
		}
		}
	else {
		var pressed = confirm("Do you wish to save the current document?");
		if(pressed==true) {
		saveDoc();
		}
	}
	
	}
	else {
		var pressed = confirm("The Document has not been saved yet ! Do you wish to save the document now?");
		if(pressed==true) {
		saveAsDoc();
		}
	}

}
function newDoc() {
checkCurrentDoc();
window.location.reload();	
}
/**
 * Checks Print Compatibility on devices.
 * Uses navigator.userAgent to detect Mobiles and Tablets, where print is not currently  
 * possible
 */
function chkPrintCompat() {
var uA = navigator.userAgent;
if(uA.match(new RegExp("Android","i")) || uA.match(new RegExp("Mobile","i")))
document.getElementById("print_file").style.visibility = "hidden";
}



