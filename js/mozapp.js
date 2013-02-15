function appInstall() {
    var requestIns = navigator.mozApps.getSelf();
    requestIns.onsuccess = function () {
        console.log("requestIns = " + requestIns.result);
        if (requestIns.result) {
            alert("Already Installed");
        } else {
            var manLink = document.querySelector('link[rel="app-manifest"]'),
                manifestURL = manLink.getAttribute('href');
            var requestChk = navigator.mozApps.install(manifestURL);
            requestChk.onsuccess = function () {
                alert("Application installed successfully !");
            }
            requestChk.onerror = function () {
                alert(this.error.name);
            }
        }
    }
    requestIns.onerror = function () {
        alert('Error checking installation status: ' + this.error.message);
    }
};