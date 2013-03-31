var count= 0;
var temp= 0;

function toggle() {
	var ele = document.getElementById("menu");
	var imgEle= document.getElementById("tog");
	if(ele.style.display == "block") {
	        $("#menu").fadeOut("slow");
    		/*ele.style.display = "none";*/
			imgEle.src='images_all/menu_img/show.jpg';
  	}
	else {
	      $("#menu").fadeIn("slow");
		/*ele.style.display = "block";*/
		imgEle.src='images_all/menu_img/hide.jpg';
	}
} 
/*
function up() 
{
  temp=count;
  count= (++count % 4);
  var next1= 'm'+ count;
  var prev1= 'm'+ temp;
  var going1=document.getElementById(prev1);
  var coming1=document.getElementById(next1);
   going1.style.display="none";
   coming1.style.display="block";
}

function down() 
{
  temp=count;
  count= --count;
  if(count<0)
    count=3;
  var next2= 'm'+ count;
  var prev2= 'm'+ temp;
   var going2=document.getElementById(prev2);
  var coming2=document.getElementById(next2);
   going2.style.display="none";
   coming2.style.display="block";
}
*/
function expand_menu(m)
{
 /*var menu=document.getElementById("sub_menu");
 var menu_next=document.getElementById(""+m);
   menu.style.display="none";
   menu_next.style.display="block";*/
  $("#sub_menu").hide("300");
     $("#"+m).show("500");
}

function hide_all()
{
 /*var menu=document.getElementById("sub_menu");
 var menu_hide0=document.getElementById("m0");
 var menu_hide1=document.getElementById("m1");
 var menu_hide2=document.getElementById("m2");
 var menu_hide3=document.getElementById("m3");
 menu_hide0.style.display="none";
 menu_hide1.style.display="none";
 menu_hide2.style.display="none";
 menu_hide3.style.display="none";
 menu.style.display="block";*/
  $("#m0").hide("300");
  $("#m1").hide("300");
  $("#m2").hide("300");
  $("#m3").hide("300");
  $("#sub_menu").show("500");
}