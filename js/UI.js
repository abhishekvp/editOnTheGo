/**
* UI.js: JavaScript relating to UI goes here.
*
*/

/**
 *Renders the Document list on the Web page.
 *  @param  row
 *	        It is a tuple containing the atrributes Document Name, Time Stamp and Document Contents.
 */
function renderDocNames(row) {
  var listElement = document.getElementById("docList");
  var li = document.createElement("li");
  var a = document.createElement("a");
  var aDel = document.createElement("a");
  a.addEventListener("click", function () {
    document.getElementsByTagName('section')[0].innerHTML = row.text;
  }, false);

  aDel.addEventListener("click", function () {
    deleteDoc(row.timeStamp);
  }, false);

  aDel.textContent = " [Delete]";
  a.textContent = row.filename;
  li.appendChild(a);
  li.appendChild(aDel);
  listElement.appendChild(li);
};