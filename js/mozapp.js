window.onload=function(){
var request = navigator.mozApps.getSelf();
request.onsuccess = function() {
  if (request.result) {
    // we're installed
  } else {
    var request1 = navigator.mozApps.install("https://abhishekp91.github.com/richtextdoc_edit_OWA/manifest.webapp");
    request1.onsuccess = function() {
  alert("App installed successfully !");
}
request1.onerror = function() {
 alert(this.error.name);
  // whoops - this.error.name has details
}
  }
}
request.onerror = function() {
  alert('Error checking installation status: ' + this.error.message);
}
   
};



