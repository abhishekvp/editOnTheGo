function pickFile()
{
alert("pickFile called");
var pick = new MozActivity({
   name: "pick",
   data: {
	   type: ["text/html"]
   } 
});

pick.onsuccess = function () {
	var sec = document.getElementById("contentE");
	 var f = new FileReader(); 
	 f.readAsText(this.result.blob); 
	 f.onload = function(evt) {
	 alert("File received successfully.");
	 sec.innerHTML=evt.target.result;
	 }
};
 
pick.onerror = function () {
    // If an error occurred or the user canceled the activity
    alert("pick failed");
};
}
