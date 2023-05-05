/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
require.config( {
	baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
} );


require( ["js/qlik"], function ( qlik ) {
  //open app	
  var app = qlik.openApp('a92e83cb-98b5-4c02-9dad-753067b309bd', config);
  //get object
  	//get objects -- inserted here --
	app.getObject('CurrentSelections','CurrentSelections');
	
	
	
	
	
app.getObject('kpi1','Mucjqa');
  app.getObject('kpi2','TrRcd');
  app.getObject('kpi3','mpfTcL');
  app.getObject('kpi4','zmXPJPa');
  app.getObject('obj2','ewbPV');
  app.getObject('obj3','tTZQUX');
  app.getObject('obj4','cbBHXD');
  app.getObject('obj5','sqYtfY');
  app.getObject('obj6','pvJDPB');
  app.getObject('obj7','FbmGRwK');
  app.getObject('obj8','JNhxrdy');

  app.getObject('obj9','pvJDPB');
  app.getObject('obj10','ewbPV'); 
  app.getObject('obj11','tTZQUX'); 
  app.getObject('obj12','cbBHXD');
  app.getObject('obj13','sqYtfY');
  app.getObject('obj14','pvJDPB');
  app.getObject('obj15','FbmGRwK');
  app.getObject('obj16','JNhxrdy');
  app.getObject('obj17','sqYtfY');
  app.getObject('obj18','pvJDPB');
  app.getObject('obj19','FbmGRwK');
  app.getObject('obj20','JNhxrdy');


 

 
//tabs
  
var li = document.querySelectorAll("#list a"); //list array

const main_content = document.querySelectorAll("#content .main"); //main array

function removeActive() {
  li.forEach((l) => {
    l.classList.remove("activeli");
  });
  main_content.forEach((m) => {
    m.classList.remove("active");
  });
}

li.forEach((l, i) => {
  l.addEventListener("click", () => {
    removeActive();
    l.classList.add("activeli");
    main_content[i].classList.add("active");
	//qlik resize
	qlik.resize();
  });
});


//list display
window.onresize = window.onload = () => {
  var width = this.innerWidth;
  if (width > 1110) {
    list.style.display = "block";
  } else {
    list.style.display = "none";
  }
};


//Collapse Expand
const btn = document.getElementById("collpase-button");
const list = document.getElementById("list");
function myFunction() {
  if (list.style.display === "block") {
    list.style.display = "none";
  } else {
    list.style.display = "block";
  }
}
btn.addEventListener("click", myFunction);


//Dynamic items
const list_item = document.querySelectorAll(".list_item");
const item = document.querySelector("#item h4");

li.forEach((l, i) => {
  l.addEventListener("click", () => {
    let text = list_item[i].textContent;
    item.innerText = text;
  });
});

//Selection Bar
const cb=document.querySelector("#clrbtn");
const backb=document.querySelector("#backbtn");
const forwardb=document.querySelector("#forwardbtn");
cb.addEventListener("click",()=>{
app.clearAll();
});
backb.addEventListener("click",()=>{
app.back();
});
forwardb.addEventListener("click",()=>{
app.forward();
});
var select=document.querySelector("#selbar");
var selectionCont=document.querySelector("#selectionCont");
app.getList("SelectionObject", function(reply) 
{ 
   
	var selectionList = reply.qSelectionObject.qSelections; 
	
    console.log(reply);
	if(selectionList.length === 0){
		selectionCont.style.display="none";
	}
	else{
		selectionCont.style.display="flex";
		select.style.display="flex";
		select.innerHTML=" ";
		
	    for(var i=0;i<selectionList.length;i++){
		const selitemCont=document.createElement("div");
       selitemCont.className="selitemCont";
      select.appendChild(selitemCont);

	   const selitem=document.createElement("div");
		selitem.className="selitems";
		selitemCont.appendChild(selitem);
		selitem.innerHTML=" ";

       const field=document.createElement("div");
		field.className="field";
		selitem.appendChild(field);
		
		const subfield=document.createElement("div");
		subfield.className="subfield";
		selitem.appendChild(subfield);
		
		const clrselicon=document.createElement("div");
		clrselicon.className="clrselicon";
		clrselicon.innerHTML='<i class="bi bi-x-circle-fill"></i>';
		selitemCont.appendChild(clrselicon);
		
	clrselicon.addEventListener('click', () => {
  const field = clrselicon.parentElement.querySelector('.field').textContent;
  app.field(field).clear();
});
		
		field.innerText=selectionList[i].qField ;
		if((selectionList[i].qSelectedFieldSelectionInfo.length) === 1){
		    
			subfield.innerText=selectionList[i].qSelected;
			console.log(selectionList[i].qSelected);
		}
		else{
		    if(selectionList[i].qSelectedCount === selectionList[i].qTotal ){
			subfield.innerText=selectionList[i].qSelected;
			}
			else{
			subfield.innerText=selectionList[i].qSelectedCount + " of " + selectionList[i].qTotal;
			console.log(selectionList[i].qSelectedCount);
			}
			
		}
	}
	}
		
	
});

});


/*
app.getList("SelectionObject", function(reply){
	var selbar=document.querySelector("#selbar");
	var selitem=document.querySelector("#selitems");
	selitem.html(" ");
	var selectionList = reply.qSelectionObject.qSelections;
	if(selectionList.length === 0){
		selbar.style.display="none";
	}
	else{
		selbar.style.display="flex";
	}
	selectionList.forEach(function(value){
	var field=value.qField;
	console.log(field);
	var val=value.qSelected;
	var valCount=value.qSelectedCount;
	var total=value.qTotal;
	if(valCount === 1){
	var html = "";
    html += "<span class='selected-field-container' id='" + field + "'>";
    html += "<span class='selected-field'>" + field + ": </span>";
    html += val;
    html += " <span class='clear-field'>X</span>";
    html += "</span>";
    selitem.innerHTML=html;
   }
   else{
   var html = "";
    html += "<span class='selected-field-container' id='" + field + "'>";
    html += "<span class='selected-field'>" + field + ": </span>";
    html += valCount+" of "+total;
    html += " <span class='clear-field'>X</span>";
    html += "</span>";
    selitem.innerHTML=html;
   }
});

} );

});
*/