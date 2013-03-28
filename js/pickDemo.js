
function pickFile()
{
var pick = new MozActivity({
   name: "pick",
   data: {
       type: ["image/png", "image/jpg", "image/jpeg"]
   }
});

pick.onsuccess = function () {
    var img = document.createElement("img");
	var sec = document.getElementById("contentE");
    img.src = window.URL.createObjectURL(this.result.blob);
    sec.appendChild(img);
};
 
pick.onerror = function () {
    // If an error occurred or the user canceled the activity
    alert("Can't view the image!");
};
}