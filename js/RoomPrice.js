var RoomPrice = {
    getdaysinonemonth: function () {
        var d = new Date($("#hiSearchYear").val(), $("#hiSearchMonth").val(), 0);//算某个月的总天数
        return d.getDate();
    },
    getfirstday: function () {
        var d = new Date($("#hiSearchYear").val(), $("#hiSearchMonth").val() - 1, 1);//算某个月的第一天是星期几
        return d.getDay();
    },
    //生成日历
    roomCalender: function () {
        var year = $("#hiSearchYear").val();
        var month = $("#hiSearchMonth").val();
        var days = RoomPrice.getdaysinonemonth();
        var weekday = RoomPrice.getfirstday();

        var date = new Date($("#hiNowDate").val());
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var day = date.getDate();
        $(".tdnocss").remove();
        //往日历中填入日期
        a = 1;
        for (var j = 0; j < 6; j++) {
            for (var i = 0; i < 7; i++) {
                if (j == 0 && i < weekday) {
                    $(".tablebox tbody tr").eq(0).find("td").eq(i).html("");
                } else {
                    if (a <= days) {
                        var sHtml = $("#tdTemp").html();
                        sHtml = sHtml.replace("{0}", a).replace("{0}", a).replace("{0}", a);//价格房态ID
                        sHtml = sHtml.replace("{Day}", a);//日期
                        sHtml = sHtml.replace("{PersonCount}", $("#hiMaxPerson").val());//人数
                        sHtml = sHtml.replace("{Breakfast}", $("#hBreakfasti").val());//早餐
                        if ($("#hBreakfasti").val() == '0')
                            sHtml = sHtml.replace("{style}", "style='color:red;'");//颜色
                        else
                            sHtml = sHtml.replace("{style}", "");//颜色
                        if (year < y) {
                            sHtml = sHtml.replace("{readonly}", "readonly").replace("{readonly}", "readonly");//是否可修改
                        }
                        else if (year == y) {
                            if (month < m) {
                                sHtml = sHtml.replace("{readonly}", "readonly").replace("{readonly}", "readonly"); //是否可修改
                            } else if (month == m) {
                                if (day <= a && a <= days) {
                                    sHtml = sHtml.replace("{readonly}", "").replace("{readonly}", ""); //是否可修改
                                    $(".tablebox tbody tr").eq(j).find("td").eq(i).attr("ac", "true");
                                } else {
                                    sHtml = sHtml.replace("{readonly}", "readonly").replace("{readonly}", "readonly"); //是否可修改
                                }
                            } else {
                                sHtml = sHtml.replace("{readonly}", "").replace("{readonly}", ""); //是否可修改
                                $(".tablebox tbody tr").eq(j).find("td").eq(i).data("row", j);
                                $(".tablebox tbody tr").eq(j).find("td").eq(i).data("col", i);
                                $(".tablebox tbody tr").eq(j).find("td").eq(i).attr("ac", "true");
                                $(".tablebox tbody tr").eq(j).find("td").eq(i).attr("rc", j + "_" + i);
                            }
                        }
                        else {
                            sHtml = sHtml.replace("{readonly}", "").replace("{readonly}", ""); //是否可修改
                            $(".tablebox tbody tr").eq(j).find("td").eq(i).attr("ac", "true");
                        }

                        $(".tablebox tbody tr").eq(j).find("td").eq(i).html(sHtml);
                        if (j == 5 && i == 0) {
                            $("#trRoom").show();
                        }
                        a++;
                    } else {
                        $(".tablebox tbody tr").eq(j).find("td").eq(i).html("");
                        if (j == 5 && i == 0) {
                            $("#trRoom").hide();
                        }
                        a = days + 1;
                    }
                }
            }
        }
    },
    //时间选择事件
    pickedFunc: function () {
        $dp.$('hiSearchYear').value = $dp.cal.getP('y');
        $dp.$('hiSearchMonth').value = $dp.cal.getP('M');
        RoomPrice.roomCalender();
        $(".tablebox  td").each(function () {
            $(this).css("background-color", "#ffffff");
        });
    },
    initEvent: function () {
        var flag = false;
        var myDate = new Date();
        var day = myDate.getDate();//当前日
        var month = myDate.getMonth();//当前月
        var year = myDate.getFullYear();//当前年
        var chooseDate = new Date($("#spSearchDate").val());
        var chooseMonth = chooseDate.getMonth();//选中月
		var chooseYear = chooseDate.getFullYear();//选中年
        $(".tablebox  td[ac=true]").unbind("mousedown").bind("mousedown", function () {
            StartTD = $(this);
            StartIndex = $(this).index("td") + 1;
            
            var nowDay = parseInt(StartTD.find("h2").text());
			if(StartTD.find("h2").text()!=''){
					if ((chooseYear > year) || (chooseYear == year && chooseMonth > month) || (chooseYear == year && chooseMonth == month && nowDay >= day)) {//选中的年大于今年，选中的年等于今年但是月大于当月，选中的年等于今年月等于当月但日大于等于当日
					flag = true;
					$(this).css("background-color", "#cbe3f8");
				} else {
					flag = false;
				}
				console.log(flag);
			}
        });
        $(".tablebox  td[ac=true]").unbind("mouseover").bind("mouseover", function () {
            EndTD = $(this);
            EndIndex = $(this).index("td") + 1;
            if (flag == true) {//flage=true，表示可以选中变色
			    
                if (parseInt(EndTD.find("h2").text()) != '') {
					if(year==chooseYear&&chooseMonth==month){
					    if(day>parseInt(EndTD.find("h2").text())){
							return;
						}else{
							SelectTD(StartIndex, EndIndex, "#cbe3f8");
						}
				    }else{
						SelectTD(StartIndex, EndIndex, "#cbe3f8");
					}
                }
            }
        });
        $(".tablebox  td[ac=true]").unbind("mouseout").bind("mouseout", function () {
            if (flag == true) {
                EndTD2 = $(this);
                EndIndex2 = $(this).index("td") + 1;
                if (parseInt(EndTD2.find("h2").text()) != '') {
                    SelectTD(StartIndex, EndIndex, "#ffffff");
                }
            }
        });
        $(".tablebox  td[ac=true]").unbind("mouseup").bind("mouseup", function () {
            $(".tablebox  td[ac=true]").each(function () {
                $(this).css({ "background-color": "#ffffff" });
            });
            if (flag == true) {
				if(year==chooseYear&&chooseMonth==month){
					if(day>parseInt(EndTD.find("h2").text())){
						return;
					}else{
						bigUpdate();
					}
				}else if((year==chooseYear&&chooseMonth>month)||(year<chooseYear)){
					bigUpdate();
				}
            }
            flag = false;
        });
    },
    initData: function () {
        var types = [];
        $("#hiddenType li").each(function () {
            var ic = { text: $(this).text(), msname: $(this).attr("msname"), rscode: $(this).attr("rscode") };
            types.push(ic);
        });
        if ($("#RoomCode").val() === "") {
            $("#RoomCode").text(types[0].rscode);
            $("#masterRoomName").text(types[0].msname);
            $(".typeGo span").text(types[0].text);
        } else {
            $.each(types, function (i, item) {
                if ($("#RoomCode").val() === item.rscode) {
                    $("#RoomCode").text(item.rscode);
                    $("#masterRoomName").text(item.msname);
                    $(".typeGo span").text(item.text);
                }
            });
        }
    }
}
$(function () {
    RoomPrice.roomCalender();
    RoomPrice.initEvent();
    RoomPrice.initData();
    var types = [];
    $("#hiddenType li").each(function () {
        var ic = { text: $(this).text(), msname: $(this).attr("msname"), rscode: $(this).attr("rscode") };
        types.push(ic);
    });
    var index = 0;
    var len = types.length;

    $("#beforeTp").addClass("disabled");
    $("#beforeTp").click(function () {//房型向前选择
        index -= 1;
        if (index < 0) {
            index = index + 1;
        } else if (index == 0) {
            $("#beforeTp").addClass("disabled");
            $("#afterTp").removeClass("disabled");
            $("#RoomCode").text(types[index].rscode);
            $("#masterRoomName").text(types[index].msname);
            $(".typeGo span").text(types[index].text);
        } else {
            $("#afterTp").removeClass("disabled");
            $("#RoomCode").text(types[index].rscode);
            $("#masterRoomName").text(types[index].msname);
            $(".typeGo span").text(types[index].text);
        }
    });
    $("#afterTp").click(function () {//房型向后选择
        index += 1;
        if (index >= len) {
            index = index - 1;
        } else if (index == len - 1) {
            $("#afterTp").addClass("disabled");
            $("#beforeTp").removeClass("disabled");
            $("#RoomCode").text(types[index].rscode);
            $("#masterRoomName").text(types[index].msname);
            $(".typeGo span").text(types[index].text);
        } else {
            $("#beforeTp").removeClass("disabled");
            $("#RoomCode").text(types[index].rscode);
            $("#masterRoomName").text(types[index].msname);
            $(".typeGo span").text(types[index].text);
        }
    });
    $("#allcheck").change(function () {//全选
        $(".quer_input :checkbox").prop('checked', $(this).prop('checked'));
    });
	$(".quer_input :checkbox").change(function(){
	   var arr=0;
	   if($(this).prop('checked')==false){
		  $("#allcheck").prop('checked',false);
	   }else{
		   $(".quer_input :checkbox").each(function(){
			   if($(this).prop('checked')==true){
				  arr+=1; 
				  if(arr==7){
					 $("#allcheck").prop('checked',true);  
				   }
			   }
		   });
	   }
	});
    $("#after").click(function () {//向后一个月
        var dd = new Date($("#spSearchDate").val());
        dd.setMonth(dd.getMonth() + 1);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;
        if (m < 10) { m = '0' + m; }
        $("#spSearchDate").val(y + "-" + m);
        $("#hiSearchYear").val(y);
        $("#hiSearchMonth").val(m);
        RoomPrice.roomCalender();
        RoomPrice.initEvent();
        $(".tablebox  td").each(function () {
            $(this).css({ "background-color": "" });
        });
    });
    $("#before").click(function () {//向前一个月
        var dd = new Date($("#spSearchDate").val());
        dd.setMonth(dd.getMonth() - 1);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;
        if (m < 10) { m = '0' + m; }
        $("#spSearchDate").val(y + "-" + m);
        $("#hiSearchYear").val(y);
        $("#hiSearchMonth").val(m);
        RoomPrice.roomCalender();
        RoomPrice.initEvent();
        $(".tablebox  td").each(function () {
            $(this).css({ "background-color": "" });
        });
    });
});
//选中单元格
function SelectTD(StartIndex, EndIndex, color) {
    if (StartIndex > EndIndex) {
        var temp = EndIndex;
        EndIndex = StartIndex;
        StartIndex = temp;
    }
    var num = EndIndex - StartIndex;
    $(".tablebox td").eq(StartIndex - 1).css("background-color", color);
    for (var n = 0; n < num; n++) {
        $(".tablebox td").eq(StartIndex + n).css("background-color", color);
    }
}
function bigUpdate() {
    var html = '';
    html += '<div class="popBox popBox3">';
    html += '<h3>设置房态价格</h3>';
    html += '<dl>';
    html += '<dt>价格</dt>';
    html += '<dd><input type="text" id="setPrice"></dd>';
    html += '</dl>';
    html += '<p>此价格包含税和服务费</p>';
    html += '<dl>';
    html += '<dt>房量</dt>';
    html += '<dd><span><input type="text"  placeholder="保留房" id="setBao" /><i>间</i></span><span><input placeholder="非保留房" type="text" id="setFei" /><i>间</i></span></dd>';
    html += '</dl>';
    html += '<p>当上线状态为开启时，房量必须输入</p>';
    html += '<dl>';
    html += '<dt>上线状态</dt>';
    html += '<dd><label class="label-switch"><input type="checkbox"><div class="checkbox"></div></label></dd>';
    html += '</dl>';
    html += '<div class="popButton">';
    html += '<input type="button" value="确定" onClick="updateNow($(this))"><input type="reset" value="取消" onClick="layer.closeAll()">';
    html += '</div>';
    html += '</div>';
    layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        shadeClose: true,
        area: ['760px', '400px'],
        content: html
    });
}
function updateNow(obj) {
    var setPrice = $(obj).parent().parent().find("#setPrice").val();
    var setBao = $(obj).parent().parent().find("#setBao").val();
    var setFei = $(obj).parent().parent().find("#setFei").val();
    $(".tablebox  td").each(function () {
        if (StartIndex > EndIndex) {
            var temp = EndIndex;
            EndIndex = StartIndex;
            StartIndex = temp;
        }
        if ($(this).index("td") >= (StartIndex - 1) && $(this).index("td") <= (EndIndex - 1)) {
            $(this).find(".tdprice").text(setPrice);
            $(this).find(".tdroomtype span").text(setBao);
            $(this).find(".tdroomtype em").text(setFei);
        }
    });
    layer.closeAll();
    SelectTD(StartIndex, EndIndex, "#ffffff");
}