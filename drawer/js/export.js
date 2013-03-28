function exportFile() {
	alert("exportFile entered");
   navigator.mozSetMessageHandler('activity', function(activity) {

   var name=activity.source.name;
   if(name != "pick")
   return;
   else
   {
   var blob=readBlob();
   alert("File exported successfully.");
   activity.postResult({ type: "text/html", blob: blob });
   }
 });
}

function readBlob()
{
	alert("readBlob entered");
	var blob;
	var file = fn;
	return new Blob([text1], { type: 'text/html' });
}  
