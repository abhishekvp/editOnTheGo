
function readBlob() {
    var files = document.getElementById('files').files;
    var reader = new FileReader();
    reader.onloadend = function(evt) {  
      if (evt.target.readyState == FileReader.DONE) {
        document.getElementById('content').innerHTML = evt.target.result;
      }	  
    };
    reader.readAsBinaryString(files[0]);
  }
