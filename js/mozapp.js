function appInstall(result) {
			if(!result) {
            var manLink = document.querySelector('link[rel="app-manifest"]'),
                manifestURL = manLink.getAttribute('href');
            var requestChk = navigator.mozApps.install(manifestURL);
            requestChk.onsuccess = function () {
                alert("Application installed successfully !");
            }
            requestChk.onerror = function () {
                alert("Error while trying to install "+
				this.error.name);
            }
			}
			else
			{
			alert("App Already Installed");
			}
        };
		
function chkInstall() {
  try1();

  // TRY1: get our application management object using getSelf()
  //       this works correctly when running into the webapp runtime container 
  function try1() {

    var req1 = navigator.mozApps.getSelf();
    req1.onsuccess = function () {
      if (req1.result === null) {
	    console.log("going to try 21()");
        try2();
      } else {
        appInstall(req1.result);
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
	  console.log("host="+window.location.host);
      if (req2.result !== null) {
	  console.log("length="+req2.result.length);
        req2.result.forEach(function (app) {
		console.log("app origin="+app.origin);
          if (app.origin == myorigin) {
            result = app;
			console.log("app origin="+app.origin);
			}
        });
      }
	  console.log("result="+result);
      appInstall(result);
    }
    req2.onerror = error;
  }

  // TRY1: get our application management object using getInstalled()
  //       this works correctly when running as "self service installer"
  //       in a Firefox browser tab

};


