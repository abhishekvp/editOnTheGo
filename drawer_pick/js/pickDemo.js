function pickFile()
{
var pick = new MozActivity({
   name: "pick",
   data: {
	   type: ["text/html"]
   } 
});

pick.onsuccess = function () {
    //var img = document.createElement('a');
	alert("entered");
	var sec = document.getElementById("contentE");
    var textDoc = window.URL.createObjectURL(this.result.blob);
	alert("textDoc="+textDoc);
    sec.appendChild(textDoc);
};
 
pick.onerror = function () {
    // If an error occurred or the user canceled the activity
    alert("error1234");
};
}