/*用于公共头部的语言切换，以及所有的有select样式的下拉框*/
var common={
   init:function(){
	    $(".nowLanguage,.selectUl span").click(function(){
	       common.updown($(this));
		});
		$(".languageChange ul li").click(function(){
		   if($(this).text()=="ENGLISH"){
			 $(this).parent().parent().find("span").addClass("enBackground");  
		   }else{
			 $(this).parent().parent().find("span").removeClass("enBackground");   
		   }
		});
		$(".languageChange ul li,.selectUl ul li").click(function(){
		   common.textChange($(this));
		});
		$("#menuItem ul li").each(function(){
			if($(this).hasClass("on")){
				var index=$(this).index();
			    var Ileft=55+(index)*130
			    $("#menuItem ul em").css("left",Ileft+"px");
			}
		});
   },
   updown:function(obj){
	   $(obj).parent().find("ul").toggle();
	   $(obj).find("i").toggleClass("upDown");	
   },
   textChange:function(obj){
	   var text=$(obj).parent().parent().find("span em").text();
	   $(obj).parent().parent().find("span em").text($(obj).text());
	   var text2=$(obj).parent().parent().find("span em").text();
	   if($(obj).parent().parent().attr("id")=="testId"&&text!=text2){
		  	test.say($(obj).parent().parent());
	   }
	   $(obj).parent().parent().find("input[type='hidden']").val($(obj).attr("data"));
	   $(obj).parent().parent().find("i").removeClass("upDown");
	   $(obj).parent().hide();	
   }
}
$(function(){
	common.init();
	$(document).click(function (evt) {//点击其他区域下拉框和搜索框隐藏
		var evt = window.event ? window.event : evt,
		target = evt.srcElement || evt.target;
		if(target.parentNode.className!="selectUl"&&target.parentNode.parentNode.className!="selectUl"&&target.id!="hotelQueryValue"){
			$(".selectUl").find("ul").hide();
			$("#hotelQueryValue").parent().find(".hotelSearch").hide();
		}
   })
});
