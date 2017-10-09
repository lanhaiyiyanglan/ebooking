var test={
  say:function(obj){
	  if(obj.find("input").attr("name")=="byHotelWt"){
		 test.change1();  
	  }else{
		 test.change2();  
	  }
  },
  change1:function(){
	 alert("haha");  
  },
  change2:function(){
	 alert("huhu");  
  }
}