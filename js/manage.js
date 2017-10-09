var manage={
	init:function(){
		$(".checkAll").click(function(){
			manage.checkAll($(this));
		});
		$("#manageTable tr th a").click(function(){
		   var text=$(this).parent().find("em").text();	
		   if(text=="倒序"){
			  $(this).parent().find("em").text("正序"); 
		   }else{
			  $(this).parent().find("em").text("倒序"); 
		   }
		});
	},
	checkAll:function(obj){//全选
		var flag=$(obj).prop("checked");
		$("[name='hotelName']:checkbox").each(function(){
			$(this).prop("checked", flag);
		});
	}
}
$(function(){
	manage.init();
});

