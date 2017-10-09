var popStyle={
	init:function(){
		$("#setSpecail").click(function(){
			popStyle.setSpecailDate();
		});
		$(".addSale").click(function(){
			popStyle.addSale($(this));
		});
		$("#wliStyle").click(function(){
			popStyle.ckAll($(this),"typeHouse");
		});
		$("#qxCkAll").click(function(){
			popStyle.ckAll($(this),"quanxian");
		});
	},
	setSpecailDate:function(){//添加特殊日期
		var html='';
		html+='<div class="popBox popBox1" id="setSpecial">';
		   html+='<h3>添加特殊日期</h3>';
		   html+='<dl>';
		     html+='<dt>特殊日期</dt>';
			 html+='<dd><input type="text" value="2017-06-3" onClick="WdatePicker({})"></dd>';
		   html+='</dl>';
		   html+='<dl>';
		     html+='<dt>&nbsp;</dt>';
			 html+='<dd><label><input type="radio" name="specailRadio">不准入住</label><label><input type="radio" name="specailRadio">不准离店</label></dd>';
		   html+='</dl>';
		   html+='<div class="popButton">';
		      html+='<input type="button" value="确定"><input type="reset" value="取消">';
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
	addSale:function(obj){//添加物理房型
		var html='';
		html+='<div class="popBox popBox2">';
		   html+='<h3>添加物理房型</h3>';
		   html+='<p><label><input type="checkbox" onClick="popStyle.ckAll($(this),\'houseCk\')">全选</label></p>';
		   html+='<ul>';
		      html+='<li><lable><input type="checkbox" name="houseCk" value="0">特大号床套房</label></li>';
			  html+='<li><lable><input type="checkbox" name="houseCk" value="1">高级客房</label></li>';
			  html+='<li><lable><input type="checkbox" name="houseCk" value="2">奢华套房</label></li>';
			  html+='<li><lable><input type="checkbox" name="houseCk" value="3">单间套房</label></li>';
			  html+='<li><lable><input type="checkbox" name="houseCk" value="4">标准房</label></li>';
			  html+='<li><lable><input type="checkbox" name="houseCk" value="5">尊贵房</label></li>';
			  html+='<li><lable><input type="checkbox" name="houseCk" value="6">露台客房</label></li>';
			  html+='<li><lable><input type="checkbox" name="houseCk" value="7">纯净客房</label></li>';
			  html+='<li><lable><input type="checkbox" name="houseCk" value="8">阳台套房</label></li>';
			  html+='<li><lable><input type="checkbox" name="houseCk" value="9">居家套房</label></li>';
			  html+='<li><lable><input type="checkbox" name="houseCk" value="10">特色套房</label></li>';
			  html+='<li><lable><input type="checkbox" name="houseCk" value="11">SLS套房</label></li>';
			  html+='<li><lable><input type="checkbox" name="houseCk" value="12">总统套房</label></li>';
		   html+='</ul>';
		   html+='<div class="popButton">';
		      html+='<input type="button" value="确定"><input type="reset" value="取消">';
		   html+='</div>';
		html+='</div>';
		layer.open({
		  type: 1,
		  title: false,
		  closeBtn: 0,
		  shadeClose: true,
		  area: ['760px', 'auto'],
		  content:html
	  });
	},
	ckAll:function(obj,name){//全选
		var flag2=$(obj).prop("checked");
        $("[name="+name+"]:checkbox").each(function(){
			  $(this).prop("checked", flag2);
		});
	}
}
$(function(){
	popStyle.init();
});