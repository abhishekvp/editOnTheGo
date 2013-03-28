var count= 0;
var temp= 0;

function toggle() {
	var ele = document.getElementById("sub_menu");
	var imgEle= document.getElementById("tog");
	if(ele.style.display == "block") {
    		ele.style.display = "none";
			imgEle.src='menu_img/show.jpg';
  	}
	else {
		ele.style.display = "block";
		imgEle.src='menu_img/hide.jpg';
	}
} 

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