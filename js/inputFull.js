(function($){
	$.fn.InputFull = function(callback) {
		var indexLi = -1;
		var self=this;
		var Item=Item||{};
		Item.initDrop=function(){
			$(self).on('keyup',function(even) {
				var $this=$(this);
				if (even.which == 38 || even.which == 40 || even.which == 13){return;}
				Item.fullData($this);
				$this.parent().find('ul').unbind('click').on('click', 'li',function(){
					$this.val($(this).text());
					$(this).parent().parent().hide();
				});
			});
		   $(self).on('keydown',function(e){//38向上  //40向下  /13/回车zzheli 
		   		console.info('keydown');
				if( e.which == 38){Item.keychang("up",$(this))}
				else if(e.which == 40){Item.keychang("down",$(this));
				}else if(e.which == 13){Item.fullTxt($(this));}
			});
		}
		Item.keychang=function(up,obj){
			if(up == "up"){
				if(indexLi == -1){indexLi = $(obj).parent().find("ul li").length-1;}
				else{indexLi--;}
			}else{
				if(indexLi ==  $(obj).parent().find("ul li").length-1){indexLi = 0;}
				else{indexLi++;}
			}
			$(obj).parent().find("ul li").eq(indexLi).addClass("active").siblings().removeClass();
		}
		Item.fullTxt=function(obj){
			obj.val(obj.parent().find("ul li.active").text());
			obj.parent().find(".hotelSearch").hide();
		}
		Item.fullData=function(obj){
			 if(callback&&typeof callback === 'function'){
				 callback(obj);
			 }
		}
		Item.initDrop();
	}
})(jQuery); 

/*$(function(){
	$('#hotelInfo').InputFull(function(obj){
		 common2.searchSuggest(obj, '1', obj.val());
		 console.log(obj);
	});	
});*/
var common2={
	 searchSuggest: function (obj, searchType, keyword) {
		    var chooseOjb=obj;
			chooseOjb.parent().find(".hotelSearch").show();
		    var data = ['北京','上海','广州','深圳','杭州','长沙','合肥','宁夏','成都','西安','南昌','上饶','沈阳','济南','厦门','福州','九江','宜春','赣州','宁波','绍兴','无锡','苏州','徐州','东莞','佛山','中山',
			'成都','武汉','青岛','天津','重庆','南京','九江','香港','澳门','台北'];
			var nums = 10;
			var pages = Math.ceil(data.length/nums);
			var thisDate = function(curr){
				var str = '', last = curr*nums - 1;
				last = last >= data.length ? (data.length-1) : last;
				for(var i = (curr*nums - nums); i <= last; i++){
					str += '<li><span class=\"searchKeys\">芭</span>'+ data[i] +'</li>';
				}
				return str;
			};
			laypage({
				    cont: 'hotelListPage',
					pages: pages,
					first: 1, //将首页显示为数字1,。若不显示，设置false即可
                    last: pages, //将尾页显示为总页数。若不显示，设置false即可
					prev: '<', 
                    next: '>' ,
					skin: 'molv',
					jump: function(obj){
						document.getElementById('hotel_list').innerHTML = thisDate(obj.curr);
					}
			}) 
	 } 
}
