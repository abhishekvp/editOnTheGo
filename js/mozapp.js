function appInstall() {
    var request = navigator.mozApps.getSelf();
    var manLink = document.querySelector('link[rel="app-manifest"]'),
        manifestURL = manLink.getAttribute('href');

    request.onsuccess = function () {
        if (request.result) {
            console.log("Application already installed !");
        } else {
            var request = navigator.mozApps.install(manifestURL);
            request.onsuccess = function () {
                alert("Application installed successfully !");
            }
            request.onerror = function () {
                alert(this.error.name);
            }
        }
    }
    request.onerror = function () {
        alert('Error checking installation status: ' + this.error.message);
    }

};