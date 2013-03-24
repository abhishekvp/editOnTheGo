
function readFile() {
    var files = document.getElementById('files').files;
    if(!files.length)
	return;    
    var reader = new FileReader();
    reader.onloadend = function(evt) {  
      if (evt.target.readyState == FileReader.DONE) {
        document.getElementById('contentE').innerHTML = evt.target.result;
      }	  
    };
    reader.readAsBinaryString(files[0]);
  }
