var order={
	init:function(){
	   /*$('input:radio[name="chooseDate"]').change(function(){//非所有时间则显示日期选择器
		   if($(this).prop("checked") == true&&$(this).val()!=0){
			 $(".timeSlide").css({"display":"inline-block"});
		   }else{
			 $(".timeSlide").css({"display":"none"});
		   }
	   });*/	
	   $("#beizhu").click(function(){
		  order.beizhu(); 
	   });
	   $("#jieshou").click(function(){
		  order.jieshou(); 
	   });
	   $(".orderNav ul li").click(function(){
		  if($(this).text()=="******"){
			  return;
		  }else{
			 $(this).addClass("on").siblings().removeClass("on");  
		  }
	   });
	    
	},
	beizhu:function(){
		var html='';
		html+='<div class="popBox">';
		   html+='<h3>添加备注</h3>';
		   html+='<textarea id="bzTxt" placeholder="请输入备注信息"></textarea>';
		   html+='<div class="popButton">';
		      html+='<input type="button" value="确定"><input type="reset" value="取消" onClick="order.layerClose();">';
		   html+='</div>';
		html+='</div>';
		layer.open({
		  type: 1,
		  title: false,
		  closeBtn: 0,
		  shadeClose: true,
		  area: ['640px', '350px'],
		  content:html
	  });
	},
	jieshou:function(){
		var html='';
		html+='<div class="popBox popBoxjs">';
		   html+='<h3>接受</h3>';
		   html+='<p><input type="text"></p>';
		   html+='<div class="popButton">';
		      html+='<input type="button" value="确定"><input type="reset" value="取消" onClick="order.layerClose();">';
		   html+='</div>';
		html+='</div>';
		layer.open({
		  type: 1,
		  title: false,
		  closeBtn: 0,
		  shadeClose: true,
		  area: ['640px', '300px'],
		  content:html
	  });
	},
	layerClose:function(){
		layer.closeAll();
	}
}
var SysSecond=[];
var InterValObj='';
$(function(){
	order.init();
	$("#orderTable tr td .remainSeconds").each(function(i){
	  SysSecond.push(parseInt($(this).val()));
    });
    InterValObj=window.setInterval(SetRemainTime,1000); //间隔函数，1秒执行
});
function SetRemainTime(){
	for(var i=0;i<SysSecond.length;i++){
		if(SysSecond[i] > 0) { 
		   SysSecond[i] = SysSecond[i] - 1; 
		   SysSecond.splice(i,1,SysSecond[i]);
		   console.log(SysSecond);
		   var second = Math.floor(SysSecond[i] % 60);            
		   var minite = Math.floor((SysSecond[i] / 60) % 60);     
		   var hour = Math.floor((SysSecond[i] / 3600) % 24);     
		   if(second<10){second="0"+second;}
		   if(minite<10){minite="0"+minite;}
		   if(hour<10){hour="0"+hour;}
		   console.log(hour + ":" + minite + ":" + second);
		   $("#orderTable tr:eq("+(i+1)+") td .remainTime").html(hour + ":" + minite + ":" + second); 
	   } else {
        window.clearInterval(InterValObj); 
       } 
	}  
}