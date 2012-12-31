
  function readBlob() {
    var files = document.getElementById('files').files;
    var reader = new FileReader();
	//alert(evt.target.readyState);
    reader.onloadend = function(evt) {
	
      if (evt.target.readyState == FileReader.DONE) {
        document.getElementById('content').innerHTML = evt.target.result;
      }	  
    };
    var blob = files[0].slice(0, files[0].size);
	reader.readAsBinaryString(blob);
  }