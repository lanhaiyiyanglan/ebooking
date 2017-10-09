var HotelCommon = HotelCommon || {};
HotelCommon.SearchKey = function () {
    var word = $("#cityName").val();
    word = $.trim(word);
    if (word !== "" && word) {
        $(".citys").hide();
        $.post("/Action/Hotel.ashx", { "action": "search", "key": word }, function (dataHtml) {
            try {
                var obj = eval('(' + dataHtml + ')');
                location.reload();
            } catch (ex) {
                $("#resultList li").remove();
                $("#resultList ").html(dataHtml);
                //加载事件
                $("#resultList li").click(function () {
                    var typeid = $(this).find("a").attr("t");
                    var sid = $(this).find("a").attr("sid");
                    var currentA = $(this).find("a").clone();
                    $(currentA).find("span").remove();
                    var name = $(this).find("a").attr("key");

                    $("#cityName").val(name);
                    $("#id").val(sid);
                    $("#type").val(typeid); 
                    $(".results").hide();
                });
                $(".results").show();
            }
            
        });
    } else {
        $(".citys").show();
        $(".results").hide();
    }
}
$(function(){
  $(".searchCity").on("click",function(){//获取焦点
      if(!$(".results").is(":visible")){
		  var left=$(this).offset().left+"px";
		  var top=33+$(this).offset().top+"px";
		  $(".searchCont .citys").css({"margin-left":left,"top":top});
		  $(".searchCont .citys").show(); 
	  }
  });	
  $(window).resize(function() {
	 var left=$(".searchCity").offset().left+"px";
	 var top=33+$(".searchCity").offset().top+"px";
	 $(".searchCont .citys,.results").css({"margin-left":left,"top":top}); 
  });
  $(".searchCity").keyup(function(){//输入关键字    
	  $(".searchCont .citys").hide();
	  var left=$(this).offset().left+"px";
	  var top=33+$(this).offset().top+"px";
	  $(".results").css({"margin-left":left,"top":top});
	  $(".results").show(); 
	  /*$.post("/Action/Hotel.ashx", { "action": "search", "key": word }, function (dataHtml) {//根据关键字模糊搜索append到resultList里，然后resultList显示
           var html='';
		   html+='';
		   $("#resultList").append(html);
		   $(".results").show();
      });*/
  });
  $(".city_list > li dl dd > ul > li,.city_list > li > ul li,#resultList li").on("click",function(){//点击当前分类中的项目或者关键字，将选中的填充到输入框中
	  var thisText=$(this).find("a").text();
	  $(".searchCity").val(thisText); 
  });
  $(document).click(function (evt) {//点击搜索以外的区域隐藏搜索框
		var evt = window.event ? window.event : evt,
		target = evt.srcElement || evt.target;
		if (target.className != "searchCity"&&target.className != "acti"&&target.parentNode.parentNode.className!="citys_nav") {
			$(".results").hide();
			$("#citys").hide();
		}
  })
  $(".citys_nav li").on("click",function () {//点击地区分类
		$(this).addClass("acti").siblings().removeClass("acti");//当前地区按拼音的分类，如ABCDEF
		var index=$(this).index();
		$(".city_list").hide().eq(index).show();
		
   });
	laypage({
			cont: 'resultsListPage',
			pages: 11, //总页数
			first: 1, //将首页显示为数字1,。若不显示，设置false即可
            last: 11, //将尾页显示为总页数。若不显示，设置false即可
			prev: '<', 
			next: '>' ,
			skin: 'molv',
			jump: function(obj){

			}
	}) 
   $('#hotelQueryValue').InputFull(function(obj){
		 common2.searchSuggest(obj, '1', obj.val());
		 console.log(obj);
	});	
	$('input:checkbox[name="ckFx"]').change(function(){//特惠类型
	   var txt=$("#fx").val();
	   if($(this).prop("checked") == true){
		 txt=txt+$(this).parent().text()+",";
		 $("#fx").val(txt);
	   }else{
		   txt='';
		   $("#fx").val(txt);
		   $('input:checkbox[name="ckFx"]').each(function(){
			   if($(this).prop("checked") == true){
				   txt=txt+$(this).parent().text()+",";
		           $("#fx").val(txt);
			   }
		   });
	   }
   });
   $("#fx").keyup(function(){
	  if($(this).val()==''){
		 $('input:checkbox[name="ckFx"]').each(function(){
			   if($(this).prop("checked") == true){
				  $(this).prop("checked",false);
			   }
		 }); 
	  }
   });
});
