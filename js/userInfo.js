var userInfo={
	init:function(){
		$("#updatePw").click(function(){//修改密码
			userInfo.updatePwd();
		});
		$("#eidtorInfo").click(function(){//编辑个人信息
			userInfo.ediorInfo();
		});
		$("#addRelax").click(function(){//新增休息时间
			userInfo.addRelax();
		});
		$("#chooseHotel").click(function(){//选择酒店
			userInfo.chooseHotel();
		});
		
	},
	updatePwd:function(){
		var html='';
		html+='<div class="popBox popBoxPwd">';
		   html+='<h3>修改密码</h3>';
		   html+='<dl>';
		     html+='<dt>旧密码</dt>';
			 html+='<dd><input type="password"></dd>';
		   html+='</dl>';
		   html+='<dl>';
		     html+='<dt>新密码</dt>';
			 html+='<dd><input type="password"></dd>';
		   html+='</dl>';
		   html+='<dl>';
		     html+='<dt>确认密码</dt>';
			 html+='<dd><input type="password"></dd>';
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
	ediorInfo:function(){
		var html='';
		html+='<div class="popBox popBoxEditor">';
		   html+='<h3>编辑用户信息</h3>';
		   html+='<dl>';
		     html+='<dt><em>*</em>登录账号</dt>';
			 html+='<dd><input type="text"></dd>';
		   html+='</dl>';
		   html+='<dl>';
		     html+='<dt><em>*</em>姓名</dt>';
			 html+='<dd><input type="text"></dd>';
		   html+='</dl>';
		   html+='<dl>';
		     html+='<dt>性别</dt>';
			 html+='<dd><label><input type="radio" name="sex">男</label><label><input type="radio" name="sex">女</label></dd>';
		   html+='</dl>';
		   html+='<dl>';
		     html+='<dt><em>*</em>部门</dt>';
			 html+='<dd><input type="text"></dd>';
		   html+='</dl>';
		   html+='<dl>';
		     html+='<dt>座机</dt>';
			 html+='<dd class="zuoji"><input type="text"><span><input type="text"></span><input type="text"></dd>';
		   html+='</dl>';
		   html+='<dl>';
		     html+='<dt>手机号</dt>';
			 html+='<dd><input type="text"></dd>';
		   html+='</dl>';
		   html+='<dl>';
		     html+='<dt>邮箱</dt>';
			 html+='<dd><input type="text"></dd>';
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
		  area: ['640px', '480px'],
		  content:html
	  });
	},
	addRelax:function(){
	   var html='';
		html+='<div class="popBox popBoxRelax">';
		   html+='<h3>新增日期</h3>';
		   html+='<dl>';
		     html+='<dt>休息日期</dt>';
			 html+='<dd>';
			 html+='<input type="text" id="txtBegin" name="date1"  onClick="WdatePicker({ startDate: \'%y-%M-%d\', readOnly: true, isShowClear: false, doubleCalendar: true, minDate: \'%y-%M-{%d+1}\', onpicked: function () { var txtBegin = $(\'#txtBegin\').val(); $(\'#txtEnd\').val(MT.Date.AddDay(txtBegin, 1)); } })" data-language="en" class="datepicker-here">';
            html+='<em>—</em>';
			html+='<input type="text" id="txtEnd" name="date2" value="2017-06-3" onClick="WdatePicker({ minDate: \'#F{$dp.$D(\'txtBegin\',{d:1})}\', readOnly: true, isShowClear: false, doubleCalendar: true })" data-language="en" class="datepicker-here">';
			html+='</dd>';
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
	chooseHotel:function(){
		var html='';
		html+='<div class="popBox popHotel">';
		html+='<h3>选择酒店</h3>';
		html+='<div class="searchHotel">';
              html+='<div><em>城市</em><input type="text" placeholder="中文/英文" id="cityName" class="searchCity">';
			  html+='</div>';
              html+='<div><em>酒店名称/酒店代码</em><input type="text" id="hotelInfoPop" onclick="search2(this);">';
                    html+='<div class="hotelSearch">';
                      html+='<ul id="hotel_list">';
                      html+='</ul>';
                      html+='<div id="hotelListPage"></div>';
                    html+='</div>';
              html+='</div>';
              html+='<div><input type="button" value="搜索"></div>';
       html+='</div>';
	   html+='<div class="containerTb"><table>';
	     html+='<tr>';
		    html+='<th width="10%">&nbsp;</th>';
		    html+='<th width="15%">城市</th>';
			html+='<th width="55%">酒店名称</th>';
			html+='<th width="20%">酒店编码</th>';
		 html+='</tr>';
		 html+='<tr>';
		    html+='<td><input type="checkbox" name="hotel"></td>';
			html+='<td>泰国</td>';
			html+='<td>大皇宫酒店</td>';
			html+='<td>202415</td>';
		 html+='</tr>';
		 html+='<tr>';
		    html+='<td><input type="checkbox" name="hotel"></td>';
			html+='<td>泰国</td>';
			html+='<td>大皇宫酒店</td>';
			html+='<td>202415</td>';
		 html+='</tr>';
		 html+='<tr>';
		    html+='<td><input type="checkbox" name="hotel"></td>';
			html+='<td>泰国</td>';
			html+='<td>大皇宫酒店</td>';
			html+='<td>202415</td>';
		 html+='</tr>';
	   html+='</table></div>';
	   html+='<div class="popButton">';
		  html+='<input type="button" value="确定"><input type="reset" value="取消">';
	   html+='</div>';
	  html+='</div>';
	   layer.open({
		  type: 1,
		  title: false,
		  skin: 'myClass',
		  closeBtn: 0,
		  shadeClose: true,
		  area: ['1200px', 'auto'],
		  content:html
	  }); 	
	}
}
$(function(){
  	userInfo.init();
});
function search2(obj){
   $(obj).InputFull(function(obj){
		common2.searchSuggest(obj, '1', obj.val());
   });	
}