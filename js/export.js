function exportFile() {
   navigator.mozSetMessageHandler('activity', function(activity) {

   var name=activity.source.name;
   if(name != "pick")
   return;
   else
   {
   var blob=readBlob();
   alert("File Exported Successfully");
   activity.postResult({ type: "text/html", blob: blob });
   }
 });
}

function readBlob()
{
	return new Blob([eText], { type: 'text/html' });
}  
