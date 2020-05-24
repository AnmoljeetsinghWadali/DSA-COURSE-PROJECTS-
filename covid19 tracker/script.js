//https://api.covid19india.org/
//https://api.covid19india.org/data.json
function api(){
$(document).ready(function() {
  var url="https://api.covid19india.org/data.json"
  
  $.getJSON(url,function(data){
  	console.log(data);
  
  var states=[]
  var confirmed=[]
  var recovered=[]
  var deaths=[]
  var active=[]

  $.each(data.statewise,function(id,obj){
  	states.push(obj.state);
  	confirmed.push(obj.confirmed);
  	recovered.push(obj.recovered);
  	deaths.push(obj.deaths);
  	active.push(obj.active);
  })

states.shift()
confirmed.shift()
recovered.shift()
deaths.shift()

console.log(active,deaths);






   var total_cases,total_active,total_recovered,total_deaths,total_confirmed;
   total_confirmed=data.statewise[0].confirmed;
   total_recovered=data.statewise[0].recovered;
   total_active=data.statewise[0].active;
   total_deaths=data.statewise[0].deaths;

   $("#deaths").empty();
  $("#deaths").append(total_deaths);


  $("#active").empty();
  $("#active").append(total_active);

  $("#confirmed").empty();
  $("#confirmed").append(total_confirmed);

  $("#recovered").empty();
  $("#recovered").append(total_recovered); 


  var mychart=document.getElementById('mychart').getContext('2d')
  var chart=new Chart(mychart,{
  	type:'line',
  	data:{
  		labels:states,
  		datasets:[
  		{
  			 label:"CONFIRMED CASES",
  			 data:confirmed,
  			 backgroundColor: "#f1c40f",
  			 minBarLength:100
  		},

  		{
  			 label:"RECOVERED CASES",
  			 data:recovered,
  			 backgroundColor: "#33FF4C",
  			 minBarLength:100
  		},

  		{
  			 label:"ACTIVE CASES",
  			 data:active,
  			 backgroundColor: "#C70039",
  			 minBarLength:100
  		},

  		{
  			 label:"DEATHS CASES",
  			 data:deaths,
  			 backgroundColor: "#333CFF",
  			 minBarLength:100
  		},
  		]
  	},
  	options:{}
  })



  })

})}
api();