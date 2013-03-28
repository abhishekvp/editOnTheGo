window.onLoad=function(){
  navigator.mozSetMessageHandler('activity', function handler(activityRequest) {
    var activityName = activityRequest.source.name;
    if (activityName !== 'pick')
      return;
    startPick(activityRequest);
  }
  var savedDoc = document.getElementById('docList');
  var pickActivity;
  
  function startPick(request)
  {
    pickActivity = request;
	savedDoc.addEventListener('click', pickFile);
	// not sure whether to write the cancel button function or not.
  }
  
  function pickFile(e)
  {
  /*
  var listElement = document.getElementById("docList");
  var li = document.createElement("li");
  var a = document.createElement("a");
  var aDel = document.createElement("a");
  a.setAttribute('href',"#");
  a.addEventListener("click", function () {
    fn= row.filename;
	tmp= row.timeStamp;
	//alert("This is going to be displayed:\n"+row.text);
    document.getElementById('contentE').innerHTML = row.text;
	document.getElementById('saveButton').disabled = false;
	currentDoc();
  }, false);
  */

  }
  
