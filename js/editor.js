    var gActiveEditor = null; // active editing host
    function ExecCommand(toolbarElement) {
      var argVal, argStr,
          type    = toolbarElement.getAttribute("type"),
          command = toolbarElement.getAttribute("data-command");
      switch (type) {    // get the execCommand argument according to the button type
        case "button":   // toolbar button: no argument
          argVal = argStr = false;
          break;
        case "checkbox": // styleWithCSS: boolean argument
          argVal = argStr = toolbarElement.checked;
          break;
        default:         // <select> menu: string argument
          if (!toolbarElement.selectedIndex) return;
          argVal = toolbarElement.value;
          argStr = "'" + argVal.replace("<", "&lt;").replace(">", "&gt;") + "'";
          toolbarElement.selectedIndex = 0; // reset drop-down list
      }
      document.execCommand(command, false, argVal); // send requested action
      if (gActiveEditor) gActiveEditor.focus();     // re-focus the editable element
    }
    window.addEventListener("DOMContentLoaded", function() {
      var i,
        buttons = document.querySelectorAll("*[data-command]"),
        editors = document.querySelectorAll("*[contenteditable]");
      for (i = 0; i < buttons.length; i++) {
        buttons[i].onclick  = function() { ExecCommand(this); };
        buttons[i].onchange = function() { ExecCommand(this); };
      }
      for (i = 0; i < editors.length; i++)
        editors[i].onfocus = function() { gActiveEditor = this; };
      
      ExecCommand(document.querySelector("*[data-command=styleWithCSS]"));
    }, false);
	
	function printDoc() {
	  var oPrntWin = window.open("","_blank","width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
	  oPrntWin.document.open();
	  var docTextPrint = document.getElementById("contentE");
	  oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + docTextPrint.innerHTML + "<\/body><\/html>");
   	  oPrntWin.document.close();
	}