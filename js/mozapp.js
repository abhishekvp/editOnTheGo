function renderInstallButton(result) {
    if (!result) { 
		console.log("App Not Installed");    
    } else {
		document.getElementById("installBtn").style.visibility="hidden"; 
		console.log("App Already Installed");	      
    }
};

function installApp() {
  var manLink = document.querySelector('link[rel="app-manifest"]'),
            manifestURL = manLink.getAttribute('href');
  var requestChk = navigator.mozApps.install(manifestURL);
  requestChk.onsuccess = function () {
    document.getElementById("installBtn").style.visibility="hidden";
    console.log("Application installed successfully !");	
  }
  requestChk.onerror = function () {
    alert("Error while trying to install :" + this.error.name);
  }
}

function chkInstall() {
    try1();
    function try1() {
        var req1 = navigator.mozApps.getSelf();
        req1.onsuccess = function () {
            if (req1.result === null) {
                console.log("Got null from getSelf() ! Now trying getInstalled()");
                try2();
            } else {
                renderInstallButton(req1.result);
            }
        };
        req1.onerror = function () {
            try2();
        }
    }

    function try2() {
        var req2 = navigator.mozApps.getInstalled();
        req2.onsuccess = function () {
            var result = null;
            var myorigin = window.location.protocol + "//" + window.location.host;
			
            if (req2.result !== null) {
                req2.result.forEach(function (app) {     
                    if (app.origin == myorigin) {
                        result = app;
                    }
                });
            }
            renderInstallButton(result);
        }
        req2.onerror = function() {
		alert(this.error.name);
		};
    }
};