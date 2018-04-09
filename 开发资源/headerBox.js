var tomezoneVar = 0;// 此变量记录的是时区，东八区 沙特为东三区；此变量应改为3
//从服务器端获取当地时区
function getTime(){
	var d=new Date();
	var utc=-(d.getTimezoneOffset()/60);
	return utc;
}
tomezoneVar=getTime();
var endDate;// 保存结束时间的控件
var startDate;// 保存开始时间的控件
var combobox;// 保存时间力度的控件
var domain;// 此变量为第一个框
var journry;// 此变量为第二个框
var customer;// 此变量保存第三个框
var lteVoPanel;// 存放第一个框的位置
var lteVoPane2;
var lteVoPane3;
var lteVoPane4;
var lteVoPane5;
var lteVoPane6;
var lteVoPane7;
var lteVoPane89;
var lteVoPane8;
var lteVoPanegg;
var lteVoPane9;
var lteVoPanek;
var targetArr={};
var panel1;// 存放时间力度的框
var btn;// 存放保存按钮
var queryBtn;// 存放按钮的容器
var channel;
var customGrop;
var servesId;
var serves;
var metrics;
var Technology;//Technology框只存在在ucf2
var startMinData = new Date().getTime() - 7 * 86400000;// 保存开始时间的最小置灰时间,默认为当前时间
var startMaxData = new Date().getTime();// 保存开始时间的最大置灰时间，默认为当前时间前的七天
var journryId = null;// 此变量保存场景
var serviceOrBlock = false;// 此变量用来保存是否显示service框的
Sweet.ToolTip.enable();
$(document).ready(function() {
	// 此处为第一个的下拉框
	domain = new Sweet.form.ComboBox_v1({
		label : false,
		resizAble:true,
		isSelectFirst : false,
	});

	lteVoPanel = new Sweet.panel.FlowPanel({
		height : 25,
		items : [ domain ],
		renderTo : "div_select_journey_dl1"
	});
	// 此处为第二个第三个单选下拉框
	journry = new Sweet.form.ComboBox_v1({
		label : false,
		resizAble:true,
		isSelectFirst : false,
	});
	lteVoPane2 = new Sweet.panel.FlowPanel({
		width : '100%',
		height : 25,
		items : [ journry ],
		renderTo : "div_select_journey_dl3"
	});
	customer = new Sweet.form.ComboBox_v1({
		label : false,
		resizAble:true,
		isSelectFirst : false,
	});
	lteVoPane3 = new Sweet.panel.FlowPanel({
		width : '100%',
		height : 25,
		items : [ customer ],
		renderTo : "div_select_journey_dl5"
	});

	// 此处为时间力度的下拉框 开始时间
	startDate = new Sweet.form.Date({
		label : false,
		resizAble:true,
		minDate : startMinData / 1000,
		maxDate : startMaxData / 1000,
		value : {
			value : "",
			text : "time"
		},
		format : "yyyy-MM-dd hh:mm",
		timeZone : tomezoneVar,
		emptyText : "Please input...",
		showDays : true,
	});
		// 此处为时间力度的下拉框 结束时间
	endDate = new Sweet.form.Date({
		label : false,
		value : {
			value : "",
			text : "time"
		},
		minDate : startMinData / 1000,
		resizAble:true,
		maxDate : startMaxData / 1000,
		format : "yyyy-MM-dd hh:mm",
		timeZone : tomezoneVar,// 此处的应改为沙特的时区
		emptyText : "Please input...",
		showDays : true,
	});
	lteVoPane4 = new Sweet.panel.FlowPanel({
		 width : '100%',
		height : 25,
		items : [ startDate],
		renderTo : "div_select_journey_dl7"
	});
	lteVoPanegg=new Sweet.panel.FlowPanel({
		    width : '100%',
			height : 25,
			items : [ endDate ],
			renderTo : "div_select_journey_dlgg"
		});
	// 此处为时间力度的下拉框
	combobox = new Sweet.form.ComboBox_v1({
		label : false,
		resizAble:true,
		isSelectFirst : false,
	});
	lteVoPane5 = new Sweet.panel.HPanel({
		width : "100%",
		height : "100%",
		items : [ combobox ],
		renderTo : "div_select_journey_dl9",
	});
	// channel框
	channel = new Sweet.form.ComboBox_v1({
		label : false,
		resizAble:true,
		isSelectFirst : true,
		data:[{
			"text" : "All",
			"value" : "000"
		}]
	});
	lteVoPane6 = new Sweet.panel.HPanel({
		width : "100%",
		height : "100%",
		items : [ channel ],
		renderTo : "div_select_journey_dl2",
	});
	// customGrop框
	customGrop = new Sweet.form.ComboBox_v1({
		label : false,
		resizAble:true,//此属性就是控制下拉框是否可以拖拽变大的
		isSelectFirst : true,
		data:[{
			"text" : "All",
			"value" : "000"
		}]
	});
	lteVoPane7 = new Sweet.panel.HPanel({
		width : "100%",
		height : "100%",
		items : [ customGrop ],
		renderTo : "div_select_journey_dl4",
	});
	// servesid框
	servesId = new Sweet.form.ComboBox_v1({
		label : false,
		resizAble:true,
		isSelectFirst : true,
		data:[{
			"text" : "All",
			"value" : "000"
		}]
	});
	lteVoPane8 = new Sweet.panel.HPanel({
		width : "98%",
		height : "100%",
		items : [ servesId ],
		renderTo : "div_select_journey_dl6",
	});
	// serves框
	serves = new Sweet.form.ComboBox_v1({
		label : false,
		resizAble:true,
		isSelectFirst : true,
		data:[{
			"text" : "All",
			"value" : "000"
		}]
	});
	lteVoPane9 = new Sweet.panel.HPanel({
		width : "100%",
		height : "100%",
		items : [ serves ],
		renderTo : "div_select_journey_dl8",
	});
	// metrics框
	metrics = new Sweet.form.ComboBox_v1({
		label : false,
		multi : true,
		value:'',
		emptyAll : false,
		/****2017/7/30 修改METRICS下拉框可拖拽****/
		resizAble:true,
		all : true,
		 tip: true
	});
	lteVoPanek = new Sweet.panel.HPanel({
		width : "100%",
		height : "100%",
		items : [ metrics ],
		itemExtend : false,
		renderTo : "div_select_journey_dl11",
		collapsible : true
	});
	//Technology框
	Technology = new Sweet.form.ComboBox_v1({
		label : false,
		isSelectFirst : true,
		data:[{
			"text" : "All",
			"value" : "000"
		},{
			"text" : "ADSL",
			"value" : "ADSL"
		},{
			"text" : "XDSL",
			"value" : "XDSL"
		},{
			"text" : "FTTH",
			"value" : "FTTH"
		}]
	});
	lteVoPane89 = new Sweet.panel.HPanel({
		width : "100%",
		height : "100%",
		items : [ Technology ],
		renderTo : "addkaung",
	});
	/** *****************************为时间力度框绑定改变事件时，时间范围确定并显示默认时间********************************** */
	combobox.addListener("change", function() {
		// 通过时间力度来置灰相应的力度
		var key = combobox.getValue().value;
		if (key == 900) {
		   endDate.setValue({
				value : "",
				text : "time"
			});
			startDate.setValue({
				value : "",
				text : "time"
			});
			//当前系统的utc时间         当客户端和服务器时区一致时这么取，否则从后台取当前utc时间
			var newTime = (new Date().getTime())*1-5400000;	
			var newTimees = new Date().getTime() - 31 * 86400000;
			//设置时间力度范围
			endDate.setMinDate(newTimees / 1000);// 将置灰最小时间传入结束时间
			endDate.setMaxDate(newTime / 1000);// 将置灰最大时间出入结束时间
			startDate.setMinDate(newTimees / 1000);// 将置灰最小时间传入开始时间
			startDate.setMaxDate(newTime / 1000);// 将置灰最大时间出入开始时间
		//通过判断是否存在告警下钻从而对开始时间和结束时间进行设置
				endDate.setValue({
					value : newTime/1000,
					text : "time"
				});
				startDate.setValue({
					value :newTime/1000,
					text : "time"
				});
				// 向前规整到当前十五分钟
				//endDate.setRegularization(900);
				//sweet有bug这个是自己写的时间规整	
				$("#sweet-1011_date_input").val(TimeRegularization(900,endDate.getValue().value));
				// 向前规整到当天零点	
				startDate.setRegularization(86400);

		} else if (key == 3600) {// 选择的是小时力度
			endDate.setValue({
				value : "",
				text : "time"
			});
			startDate.setValue({
				value : "",
				text : "time"
			});
			//当前系统的utc时间         当客户端和服务器时区一致时这么取，否则从后台取当前utc时间
			var newTimess = (new Date().getTime())*1-7200000;
			var newTimees = new Date().getTime() - 31 * 86400000;
			endDate.setMinDate(newTimees / 1000);// 将置灰最小时间传入结束时间
			endDate.setMaxDate(newTimess / 1000);// 将置灰最大时间出入结束时间
			startDate.setMinDate(newTimees / 1000);// 将置灰最小时间传入开始时间
			startDate.setMaxDate(newTimess / 1000);// 将置灰最大时间出入开始时间
		//通过判断是否存在告警下钻从而对开始时间和结束时间进行设置
				endDate.setValue({
					value : newTime/1000,
					text : "time"
				});
				startDate.setValue({
					value :newTime/1000,
					text : "time"
				});
			//	endDate.setRegularization(3600);	
				//sweet有bug这个是自己写的时间规整	
				$("#sweet-1011_date_input").val(TimeRegularization(3600,endDate.getValue().value));
				// 向前规整到当天零点	
				startDate.setRegularization(86400);
		} else if (key == 86400) {// 选择的是天力度
			endDate.setValue({
				value : '',
				text : "time"
			});
			startDate.setValue({
				value : "",
				text : "time"
			});
			//此处为时间力度的范围设置
			var newTimh = new Date().getTime();
			var newTimek = new Date().getTime() - 31 * 86400000;
			endDate.setMinDate(newTimek / 1000);// 将置灰最小时间传入结束时间
			endDate.setMaxDate(newTimh / 1000);// 将置灰最大时间出入结束时间
			startDate.setMinDate(newTimek / 1000);// 将置灰最小时间传入开始时间
			startDate.setMaxDate(newTimh / 1000);// 将置灰最大时间出入开始时间
			var currentSevents= new Date().getTime()-7*86400000;//当前时间向前推七天
		//通过判断是否存在告警下钻从而对开始时间和结束时间进行设置
				endDate.setValue({
					value : newTime/1000,
					text : "time"
				});
				startDate.setValue({
					value :currentSevents/1000,
					text : "time"
				});
				//设置时间结束
				endDate.setRegularization(86400);	
				// 向前规整到当天零点	
				startDate.setRegularization(86400);
		};	
	});
	/** **********************为时间框的时间改变时绑定时间粒度规整事件************************************** */
	endDate.addListener("change", function() {
		var key = combobox.getValue().value;
		var endTimeUtc = endDate.getValue().data;
		
		if(key==86400){
			endDate.setRegularization(86400, endTimeUtc);// 向后规整15分钟
		}else if(key==900){
			endDate.setRegularization(900, endTimeUtc);// 向后规整15分钟
		}else if(key==3600){
			endDate.setRegularization(3600, endTimeUtc);// 向后规整15分钟  2017-06-12 00:00
		}
	})
	startDate.addListener("change", function() {
		var key = combobox.getValue().value;
		var startTimeUtc = startDate.getValue().data;
		var nowTimeChange = new Date().getTime()/1000;
		startDate.setRegularization(900, startTimeUtc);
		if(nowTimeChange-startTimeUtc>=86400*31){
			startTimeUtc=startTimeUtc + 86400;
		}
		
		if(key==86400){
			startDate.setRegularization(86400, startTimeUtc);// 向后规整15分钟
		}else if(key==900){
			startDate.setRegularization(900, startTimeUtc);// 向后规整15分钟
		}else if(key==3600){
			startDate.setRegularization(3600, startTimeUtc);// 向后规整15分钟
		}
	})
	/** **********************为时间框的时间改变时绑定时间粒度规整事件结束************************************** */
	/** ***************************下拉框的时间力度绑定事件置灰处理******************************** */
	// 为开始时间绑定点击事件确定后面的时间选择范围
	startDate.addListener("click", function() {
		var key = combobox.getValue().value, temp = "";
		if (key == 900) {
			temp = "yyyy-MM-dd hh:mm";
		} else if (key == 3600) {
			temp = "yyyy-MM-dd hh";
		} else if (key == 86400) {
			temp = "yyyy-MM-dd";
		}
		if (key) {
			startDate.setDisableTimePart(temp);// 设置开始框的置灰
		}
	});
	// 为结束时间绑定点击事件确定后面的时间选择范围
	endDate.addListener("click", function() {
		var key = combobox.getValue().value, temp = "";
		if (key == 900) {
			temp = "yyyy-MM-dd hh:mm";
		} else if (key == 3600) {// 选择的是小时力度
			temp = "yyyy-MM-dd hh";
		} else if (key == 86400) {// 选择的是天力度
			temp = "yyyy-MM-dd";
		}
		if (key) {
			endDate.setDisableTimePart(temp);// 设置结束框的置灰
		}
	});
	/** **************************置灰处理结束******************************* */
	btn = new Sweet.form.Button({
		width : 80,
		highLight : true,
		value : {
			text : 'Query'
		}
	});
	queryBtn = new Sweet.panel.HPanel({
		width : "100%",
		height : "100%",
		items : [ btn ],
		renderTo : "queryBtn",
	});
	// 为current按钮绑定点击事件
	$("#current").click(function(e,paramObj) {
		e.preventDefault();
		// 首先先获得时间力度是多少
		if (combobox.getValue().value == 900) {
			 endDate.setValue({
					value : "",
					text : "time"
				});
				startDate.setValue({
					value : "",
					text : "time"
				});
				//当前系统的utc时间         当客户端和服务器时区一致时这么取，否则从后台取当前utc时间
				var newTime = (new Date().getTime())*1-5400000;	
				var newTimees = new Date().getTime() - 31 * 86400000;
				//设置时间力度范围
				endDate.setMinDate(newTimees / 1000);// 将置灰最小时间传入结束时间
				endDate.setMaxDate(newTime / 1000);// 将置灰最大时间出入结束时间
				startDate.setMinDate(newTimees / 1000);// 将置灰最小时间传入开始时间
				startDate.setMaxDate(newTime / 1000);// 将置灰最大时间出入开始时间
			
				endDate.setValue({
					value : newTime/1000,
					text : "time"
				});
				startDate.setValue({
					value :newTime/1000,
					text : "time"
				});
				// 向前规整到当前十五分钟
				//endDate.setRegularization(900);	
				//sweet有bug这个是自己写的时间规整	
				$("#sweet-1011_date_input").val(TimeRegularization(900,endDate.getValue().value));
				// 向前规整到当天零点	
				startDate.setRegularization(86400);
		} else if (combobox.getValue().value == 3600) {// 选择的是小时力度
			endDate.setValue({
				value : "",
				text : "time"
			});
			startDate.setValue({
				value : "",
				text : "time"
			});
			//当前系统的utc时间         当客户端和服务器时区一致时这么取，否则从后台取当前utc时间
			var newTimess = (new Date().getTime())*1-7200000;
			var newTimees = new Date().getTime() - 31 * 86400000;
			endDate.setMinDate(newTimees / 1000);// 将置灰最小时间传入结束时间
			endDate.setMaxDate(newTimess / 1000);// 将置灰最大时间出入结束时间
			startDate.setMinDate(newTimees / 1000);// 将置灰最小时间传入开始时间
			startDate.setMaxDate(newTimess / 1000);// 将置灰最大时间出入开始时间
			endDate.setValue({
				value : newTimess/1000,
				text : "time"
			});
			startDate.setValue({
				value : newTimess/1000,
				text : "time"
			});
		//	endDate.setRegularization(3600);	
			//sweet有bug这个是自己写的时间规整	
			$("#sweet-1011_date_input").val(TimeRegularization(3600,endDate.getValue().value));
			// 向前规整到当天零点	
	        startDate.setRegularization(86400);
		} else if (combobox.getValue().value == 86400) {// 选择的是天力度
			endDate.setValue({
				value : '',
				text : "time"
			});
			startDate.setValue({
				value : "",
				text : "time"
			});
			//此处为时间力度的范围设置
			var newTimh = new Date().getTime();
			var newTimek = new Date().getTime() - 31 * 86400000;
			endDate.setMinDate(newTimek / 1000);// 将置灰最小时间传入结束时间
			endDate.setMaxDate(newTimh / 1000);// 将置灰最大时间出入结束时间
			startDate.setMinDate(newTimek / 1000);// 将置灰最小时间传入开始时间
			startDate.setMaxDate(newTimh / 1000);// 将置灰最大时间出入开始时间
			var currentSevents= new Date().getTime()-7*86400000;//当前时间向前推七天
			endDate.setValue({
				value : newTimh/1000,
				text : "time"
			});
			startDate.setValue({
				value : currentSevents/1000,
				text : "time"
			});
			endDate.setRegularization(86400);	
			// 向前规整到当天零点	
	        startDate.setRegularization(86400);
		}
	})
	// 初始化时默认server隐藏
	$("#div_select_journey_dl8").css({
		"visibility" : "hidden"
	});// 初始化时默认serverplanid隐藏
	$("#div_select_journey_dl6").css({
		"visibility" : "hidden"
	});
//初始化时默认serverplanid隐藏
	$("#service_ID").css({
		"visibility" : "hidden"
	});
	$("#service").css({
		"visibility" : "hidden"
	});
	//Technology框初始默认的时候是隐藏的
	$("#addkaungText").css({
		"visibility" : "hidden"
	});
	$("#addkaung").css({
		"visibility" : "hidden"
	});
	// 我要开始发送请求啦。。。。。。
	frameDomain(paramObj);// 第一个框的请求
	// 第一个框改变时发生的事件
	domain.addListener("change", function(event, data) {
		var param = {
			domainType : domain.getValue().value
		};// 这个参数为第二个框发请求时所用的
		frameJuery(param,paramObj);// 第二个框的请求，也就是设置第二框的值
	});
	// 第二个框发生改变的时候发送到请求
	journry.addListener("change", function(event, data) {
		var params = {
			domainType : domain.getValue().value,
			journeyFamily : journry.getValue().value
		};
		frameCustomer(params,paramObj);// 第三个框的请求，也就是设置第三框的值
	});
	// 第三个框发生改变的时候发送到请求
	customer.addListener("change", function(event, data) {
		var params = {
			domainType : domain.getValue().value,
			journeyFamily : journry.getValue().value,
			customerType : customer.getValue().value
		};
		frameOther(params,paramObj);// 根据前三个框查询其余的框数据
	});
	// 为service框绑定change事件
	servesId.addListener("change", function(event, data) {
		
		var params = {
			journeyId : journryId,
			servicePlan : servesId.getValue().value
		};
		serviceId(params);// serviceid框的请求，也就是设置service框的值
	//如果是告警下钻过来的页面也就是paramObj存在的话，直接请求
		if(isEmptyObject(paramObj)==false){
			// getGorupValue(targetArr.data);
			 btnIframe();
			 paramObj={};
		}
	});
//在此处为scivice框绑定change框开始
/*	serves.addListener("change", function(event, data) {
		var params = {
				journeyId : journryId,
				servicePlan : serves.getValue().value
			};
			service(params);// serviceid框的请求，也就是设置service框的值
		});*/
//在此处为scivice框绑定change框结束
	// btn按钮点击时触发的事件
	btn.addListener("click", function(e, data) {
		e.stopPropagation();
		// 点击btn时候的发送的请求
		/** ****************时间框的非空验证以及开始结束时间的大小验证***************************** */
		 if (endDate.getValue() != null && startDate.getValue() !=null){
			 var endTimesh = endDate.getValue().data;
			 var startTimesl = startDate.getValue().data;
			 //验证开始时间不能大于结束时间
			 if(endTimesh <=startTimesl){
				  var sweetPrompt = Sweet.Dialog.warn({ width : 330,
				  height : 130, message : "The start time must be less than the end time", })
			 }else if(metrics.getValue().length==0){	 //metrics框至少有一个选项
				 var sweetPrompt = Sweet.Dialog.warn({ width : 330,
					  height : 130, message : "Please select at least one metrics box value", })
			 }else{
				 //console.log(targetArr);
				 //getGorupValue(targetArr.data);
				 btnIframe();				 
			 }	 
		 }
		/** ****************时间框的非空验证以及开始结束时间的大小验证结束***************************** */	
	});	
	//2017/6/2 调用下拉框拉伸的方法
	resize($(".content"),['right','down','rightDown']);
})
// 请求调用的函数
// 第一个下拉框发生chang改变事件的时候触发的请求
function frameDomain(paramObj) {
	// 菊花开转
	$("body").sweetMask({
		propagation : false,
		maskAll : true,
		loading : true,
		msg : ""
	});
	// 菊花开转
	$.ajax({
		dataType : "json",
		url : 'domainTypeQuery.action',
		type : "POST",
		success : function(result) {
			$("body").unSweetMask();//菊花 结束
			var data = result.rtnData;
			domain.setData(data, false, false);
			//如果回填参数不为空
			if(isEmptyObject(paramObj)==false){
			domain.setValue(plays(result,paramObj.domainType));
			}else{
				domain.setValue({
					text : result.rtnData[0].text,
					value : result.rtnData[0].value
				})
			}
		}
	});
};
// 第二个下拉框发生chang改变事件的时候触发的请求
function frameJuery(param,paramObj) {
	// 菊花开转
	$("body").sweetMask({
		propagation : false,
		maskAll : true,
		loading : true,
		msg : ""
	});
	// 菊花开转
	$.ajax({
		dataType : "json",
		url : 'journeyFamilyQuery.action',
		type : "POST",
		data : param,
		success : function(result) {
			$("body").unSweetMask();//菊花 结束
			var data = result.rtnData;
		    // TODO 在这块去除up1这个场景（暂时没有场景，需要过滤去除）start
            for(var as=0;as<data.length;as++){
                if(data[as].text=="Bill_Receive"){
                    data.splice(as,1);
                }                
            }
			journry.setData(data, false, false);
			//如果回填参数不为空
			if(isEmptyObject(paramObj)==false){
			journry.setValue(plays(result,paramObj.journeyFamily))
			}else{
				journry.setValue({
					text : result.rtnData[0].text,
					value : result.rtnData[0].value
				})
			}
		}
	});
}


// 第三个下拉框发生chang改变时间的时候触发的请求
function frameCustomer(params,paramObj) {
	// 菊花开转
	$("body").sweetMask({
		propagation : false,
		maskAll : true,
		loading : true,
		msg : ""
	});
	// 菊花开转
	$.ajax({
		dataType : "json",
		url : 'customerTypeQuery.action',
		type : "POST",
		data : params,
		success : function(result) {
			$("body").unSweetMask();//菊花 结束
			var data = result.rtnData;
			customer.setData(data, false, false);
			//如果回填参数不为空
			if(isEmptyObject(paramObj)==false){
			customer.setValue(plays(result,paramObj.customerType))
			}else{
				customer.setValue({
					text : result.rtnData[0].text,
					value : result.rtnData[0].value
				})
			}
		}
	});
}
// 第四个service下拉框发生chang改变时间的时候触发的请求 servicePlan
function serviceId(params) {
	// 菊花开转
	$("body").sweetMask({
		propagation : false,
		maskAll : true,
		loading : true,
		msg : ""
	});
	// 菊花开转
	$.ajax({
		dataType : "json",
		url : 'serviceQuery.action',
		type : "POST",
		data : params,
		success : function(result) {
			$("body").unSweetMask();//菊花 结束
			result.rtnData.unshift({
				text : "All",
				value : "000"
			});
			serves.setData(result.rtnData, false, false);
		}
	});
};
//第四个service下拉框发生chang改变时间的时候触发的请求 servicePlan
function service(params) {
	// 菊花开转
	$("body").sweetMask({
		propagation : false,
		maskAll : true,
		loading : true,
		msg : ""
	});
	// 菊花开转
	$.ajax({
		dataType : "json",
		url : 'serviceQuery.action',
		type : "POST",
		data : params,
		success : function(result) {
			$("body").unSweetMask();//菊花 结束
			result.rtnData.unshift({
				text : "All",
				value : 0
			});
			servesId.setData(result.rtnData, false, false);
		}
	});
}
// 第四个ajax其余查询条件下拉列表
function frameOther(params,paramObj) {
	// 菊花开转
	$("body").sweetMask({
		propagation : false,
		maskAll : true,
		loading : true,
		msg : ""
	});
	// 菊花开转
	$.ajax({
		dataType : "json",
		url : 'otherParameterQuery.action',
		type : "POST",
		data : params,
		success : function(result) {
			//console.log(result)
			$("body").unSweetMask();//菊花 结束
			journryId = null;
			serviceOrBlock = result.rtnData.isServiceShow;
			journryId = result.rtnData.journeyId;
			if(journryId==7||journryId==8){
				result.rtnData.channel.unshift({
					"text" : "All",
					"value" : "000"
				},{
					"text" : "USSD",
					"value" : "USSD"
				},{
					"text" : "ECHANNEL",
					"value" : "ECHANNEL"
				});
				channel.setData(result.rtnData.channel, false, false);
			}
	//因需求要求在此处通过后台返回不同的场景id进而设置不同的查询框的值7,8,9,10,14,16,17,18
			else if(journryId==9||journryId==10||journryId==14||journryId==18){
				// 向下面的框前面压入all选项
				result.rtnData.channel.unshift({
					"text" : "CRM",
					"value" : "000"
				});
				//1.11zhangda添加
				channel.setData(result.rtnData.channel, false, false);
			}else if(journryId==17||journryId==16){//1.12zhangda add
				// 向下面的框前面压入all选项
				result.rtnData.channel.unshift({
					"text" : "NA",
					"value" : "000"
				});
				//1.11zhangda添加
				channel.setData(result.rtnData.channel, false, false);
			}else{
				if(result.rtnData.channel != "000"){
					result.rtnData.channel.unshift({
						text : "All",
						value : "000"
					});
					// channel框
					channel.setData(result.rtnData.channel, false, false);
				}
			}
			// 查询返回的时间力度
			combobox.setData(result.rtnData.times, false, false);
			//如果回填参数不为空
			if(isEmptyObject(paramObj)==false){
				if(paramObj.timeInterval==900){
					combobox.setValue({text:"15 minutes",value:900})
				}else if(paramObj.timeInterval==3600){
					combobox.setValue({text:"1 hours",value:3600})
				}else if(paramObj.timeInterval==86400){
					 combobox.setValue({text:"1 day",value:86400})
				}
			}else{
				combobox.setValue({
					text : result.rtnData.times[0].text,
					value : result.rtnData.times[0].value
				})
			}
			
			
		// TODO 		30天首用户现在需要注销掉，用的时候放开，下面的代码删除			
//2.22 renzhao 给customerGroup赋值   start...........
			var groupVal ="";
			if(journryId==1 || journryId==2 || journryId==3){
				groupVal ="000";
			}else{
				groupVal ="001";
			}
			if(result.rtnData.customerGroup.length==1){
				//如果是fixed,也就是ucf2，upf5，没有NewUserGroup
				if(journryId==18||journryId==12){
					/*customGrop.setData([{
						"text" : "All",
						"value" : "000"
					}]);*/
					select([{
						"text" : "All",
						"value" : "000"
					}]);
				}else{
					select([{
						"text" : "All",
						"value" : "000"
					},{
						"text" : "NewUserGroup",
						"value" : groupVal
					}]);
				}
			}else{
				if(journryId==18||journryId==12){
					result.rtnData.customerGroup.unshift({
						"text" : "All",
						"value" : "000"
					});
				}else{
					result.rtnData.customerGroup.unshift({
						"text" : "NewUserGroup",
						"value" : groupVal
					});
					result.rtnData.customerGroup.unshift({
						"text" : "All",
						"value" : "000"
					});
				}
				//targetArr.data=result.rtnData.customerGroup;//赋值给全局对象
				//console.log(result.rtnData.customerGroup);
				select(result.rtnData.customerGroup);
		//		customer(result.rtnData.customerGroup);
				//customGrop.setData(result.rtnData.customerGroup, false, false);
			}
			
			
//2.22 renzhao 给customerGroup赋值   end...........  
			// metircs指标框
			metrics.setData(result.rtnData.metrics, false, false);
			//设置metircs框的默认显示状态
			metrics.setValue(result.rtnData.metrics);
			//Technology框的显示与隐藏（只在ucf2中显示 journeyId为1时显示）
			if(18==journryId){
				$("#addkaungText").css({
					"visibility" : "visible"
				});
				$("#addkaung").css({
					"visibility" : "visible"
				});
				//2017/6/28  秦亚南 调整ucf2 tecnology下拉框样式
				$(".ServicePlanID").css("display","none");//service Plan ID框
				$(".Serviceaa").css("display","none");//Service框
				$(".technology").css("width","17.5%");//Technology框
				$(".metrics").css("marginLeft","29.6%");//Metrics框
			}else{
				$("#addkaungText").css({
					"visibility" : "hidden"
				});
				$("#addkaung").css({
					"visibility" : "hidden"
				});
				//2017/6/28   秦亚南 调整ucf2 tecnology下拉框样式
				$(".ServicePlanID").css("display","block");//service Plan ID框
				$(".Serviceaa").css("display","block");//Service框
				$(".technology").css("width","12.1%");//Technology框
				$(".metrics").css("marginLeft",0);//Metrics框
			}
			// 通过返回的场景进行判断哪个框要显示哪个框不显示
			if (result.rtnData.isServiceShow == true) {
				result.rtnData.servicePlan.unshift({
					text : "All",
					value : "000"
				})
				$("#div_select_journey_dl6").css({
					"visibility" : "visible"
				});
				$("#div_select_journey_dl8").css({
					"visibility" : "visible"
				});
				$("#service_ID").css({
					"visibility" : "visible"
				});
				$("#service").css({
					"visibility" : "visible"
				});
				// service plan 框
				servesId.setData(result.rtnData.servicePlan, false, false);
			} else {
				$("#div_select_journey_dl6").css({
					"visibility" : "hidden"
				});
				$("#div_select_journey_dl8").css({
					"visibility" : "hidden"
				});
				$("#service_ID").css({
					"visibility" : "hidden"
				});
				$("#service").css({
					"visibility" : "hidden"
				});
				//2017/2/6  zhangda add..............
				servesId.setData({
					"text" : "All",
					"value" : "000"
				});
				//2017/2/6  zhangda end..............
			}
		}
	});
};
// btn点击时请求页面
function btnIframe() {
	if(isEmptyObject(paramObj)==false){
		console.log(paramObj);
		startDate.setValue({
			value : paramObj.startTime/1000,
			text : paramObj.timeInterval
		});
		endDate.setValue({
			value : paramObj.endTime/1000,
			text : paramObj.timeInterval
		});	
		var interval = "15 minutes";
		if(paramObj.timeInterval == 3600){
			interval = "1 hour";
		}else if(paramObj.timeInterval == 86400){
			interval = "1 day";
		}
		lteVoPane5.setValue({
			value : paramObj.timeInterval,
			text : interval
		});	
	}
	var url = 'JourneyQuery.action?';
	url = top.showTabPanel ? '../../../STC_IT/' + url : url;
	var str = "";// 此变量用于将metrics框的值进行拼接
	// 传参应为全部框的值，后面需要补全。。。。。。。。。。需修改擦
	for (var i = 0; i < metrics.getValue().length; i++) {// 遍历得到的值
		str += metrics.getValue()[i].value + ","
	};
	if (serviceOrBlock == true) {// 此处就是返回的数据中是默认显示两个框的话拼接的参数
		$("#iframe")
				.html(
						"<iframe name='Info1' id='Info1' src='"+url
								+ "domainType="
								+ domain.getValue().value
								+ "&domainName="
								+ domain.getValue().text
								+ "&journeyFamily="
								+ journry.getValue().value
								+ "&journeyFamilyName="
								+ journry.getValue().text
								+ "&customerType="
								+ customer.getValue().value
								+ "&customerTypeName="
								+ customer.getValue().text
								+ "&journeyId="
								+ journryId
								+ "&timeInterval="
								+ combobox.getValue().value
								+ "&timeIntervalName="
								+ combobox.getValue().text
								+ "&startTime="
								+ startDate.getValue().value
								+ "&endTime="
								+ endDate.getValue().value
								+ "&channel="
								+ channel.getValue().value
								+ "&channelName="
								+ channel.getValue().text
								+ "&customerGroup="
								+ targetArr.value
								+ "&customerGroupName="
								+ targetArr.text								
								+ "&servicePlan="
								+ servesId.getValue().value
								+ "&servicePlanName="
								+ servesId.getValue().text
								+ "&service="
								+ serves.getValue().value
								+ "&serviceName="
								+ serves.getValue().text
								+ "&metrics="
								+ str.substring(0, str.length - 1)
								+ "' width='100%' height = '2190'  frameborder='0' scrolling='no'></iframe>");
	} else {// 默认不显示两个框的时候拼接的参数
		if(journryId==18){
			$("#iframe")
			.html(
					"<iframe name='Info1' id='Info1' src='"+url
					+ "domainType="
					+ domain.getValue().value
					+ "&domainName="
					+ domain.getValue().text
					+ "&journeyFamily="
					+ journry.getValue().value
					+ "&journeyFamilyName="
					+ journry.getValue().text
					+ "&customerType="
					+ customer.getValue().value
					+ "&customerTypeName="
					+ customer.getValue().text
					+ "&journeyId="
					+ journryId
					+ "&timeInterval="
					+ combobox.getValue().value
					+ "&timeIntervalName="
					+ combobox.getValue().text
					+ "&startTime="
					+ startDate.getValue().value
					+ "&endTime="
					+ endDate.getValue().value
					+ "&channel="
					+ channel.getValue().value
					+ "&channelName="
					+ channel.getValue().text
					+ "&customerGroup="
					+ targetArr.value
					+ "&customerGroupName="
					+ targetArr.text
					+ "&technology="
					+  Technology.getValue().value
					+ "&technologyName="
					+  Technology.getValue().text
					+ "&servicePlan=000"
					+ "&servicePlanName=000"
					+ "&service=000"
					+ "&serviceName=000"
							+ "&metrics="
							+ str.substring(0, str.length - 1)
							+ "'width='100%' height = '2190'  frameborder='0' scrolling='no'></iframe>");
		}else{
			$("#iframe")
			.html(
					"<iframe name='Info1' id='Info1' src='"+url
					+ "domainType="
					+ domain.getValue().value
					+ "&domainName="
					+ domain.getValue().text
					+ "&journeyFamily="
					+ journry.getValue().value
					+ "&journeyFamilyName="
					+ journry.getValue().text
					+ "&customerType="
					+ customer.getValue().value
					+ "&customerTypeName="
					+ customer.getValue().text
					+ "&journeyId="
					+ journryId
					+ "&timeInterval="
					+ combobox.getValue().value
					+ "&timeIntervalName="
					+ combobox.getValue().text
					+ "&startTime="
					+ startDate.getValue().value
					+ "&endTime="
					+ endDate.getValue().value
					+ "&channel="
					+ channel.getValue().value
					+ "&channelName="
					+ channel.getValue().text
					+ "&customerGroup="
					+ targetArr.value
					+ "&customerGroupName="
					+ targetArr.text
					+ "&servicePlan=000"
					+ "&servicePlanName=000"
					+ "&service=000"
					+ "&serviceName=000"
							+ "&metrics="
							+ str.substring(0, str.length - 1)
							+ "'width='100%' height = '2190'  frameborder='0' scrolling='no'></iframe>");
		}
		
	}	

}


//判断对象是否为空对象，true的话就是空对象
function isEmptyObject(obj){
	for(var key in obj){
	   return false;
	}
	return true;
}
//根据告警下钻过来传入的value遍历找到对应的text,参数依次为查询返回的下拉框的值，告警返回的value
function plays(result,objValue){
	//是告警下钻过来的数据
	for(var i=0;i<result.rtnData.length;i++){
		if(result.rtnData[i].value==objValue){
			return {value:objValue,text:result.rtnData[i].text};
		}
	}
}

function select(arr) {
	 var arr1,arr2,arr3; //存放如果找不到的情况下之前的数据
	  if(arr.length<=2){
		  arr1=arr;
		  $(".content").css({"height":"80px"});
		  $(".itemWrap").css({"height":"80px"});
		  $(".aaaa").css({"height":"80px"});
	  }else{
		  if(arr.length>=1000){
			  arr2=arr.slice(0,500);
			  arr3=arr.slice(-500,arr.length);
			  arr1=arr2.concat(arr3);
			  $(".content").css({"height":"210px","max-height": "210px"});
			  $(".itemWrap").css({"height":"210px"});
			  $(".aaaa").css({"height":"210px"});
		 }else{
			  arr1=arr;
			  $(".content").css({"height":"210px","max-height": "210px"});
			  $(".itemWrap").css({"height":"210px"});
			  $(".aaaa").css({"height":"210px"});
		 }
	  }
	 
	 
		var falg=true,a=false;//记录下拉框是点击展开的还是关闭的默认是展开的(a是判断模糊查询的时候找到了还是没匹配到)
	     var str='';
		targetArr={"text":arr1[0].text,"value":arr1[0].value};//用来保存返回数据的选中对象
	   for(var d=0;d<arr1.length;d++){
		   //给每个li添加一个类名，这个类名没有什么实际的样式
			if(d==0){
				str+="<li class='bgColor items' title='"+arr1[d].text+"'>"+arr1[d].text+"</li>";//2017/5/29 马琳修改字符串的拼接，让title显示
			}else{
				str+="<li class='items' title='"+arr1[d].text+"'>"+arr1[d].text+"</li>";//2017/5/29 马琳修改字符串的拼接，让title显示
			}
	   }
	   $("#container .aaaa").html('');
		$("#container .aaaa").html(str);
		$("#container input").val(arr1[0].text);
			$("#container input").focus(function(){
				$(".content").css("display","block");
				$("#mask").css("display","block");//2017/6/4 模态框显示
				falg=true;
			})
		/*//绑定点击事件
		$("#container input").click(function(){		
			if(falg==false){
				$(".content").css("display","none");
				$("#mask").css("display","none");//2017/6/4 模态框消失
				falg=true;
			}else if(falg==true){
				$(".content").css("display","block");
				$("#mask").css("display","block");//2017/6/4 模态框隐藏
				falg=false;
			}
		}) */
		//2017/6/2  秦亚南 给右边小图标绑定点击事件
		$(".customer .sweet-form-comboboxv1-arrow,#container input").click(function(){
			if(falg==false){
				$(".content").css("display","none");//让下拉框消失
				$("#mask").css("display","none");//2017/6/4 模态框消失
				falg=true;
			}else if(falg==true){
				$(".content").css("display","block");
				$("#mask").css("display","block");//2017/6/4 模态框隐藏
				falg=false;	
			}
		});
		var sum=0;//判断放进去的数据长度
		$("#container input").on("keyup",function(){
		//	alert("获取焦点");
			//键盘弹起获取他的值
			if(falg==true){
				$(".content").css("display","block");
				falg=false;
			}
			var val='';
			val=$("#container input").val();
			var strM='';
			sum=0;
			for(var z=0;z<arr.length;z++){
				if(arr[z].text.toLowerCase().indexOf(val.toLowerCase())!=-1){//找到了//2017/5/29  秦亚南 模糊查询不区分大小写  
				    sum+=1;
					if(sum<=1000){
						strM+="<li title='"+arr[z].text+"'>"+arr[z].text+"</li>";//2017/5/29 马琳修改字符串的拼接，让title显示
					}else{
						break;
					}			
				}else{
					a=true;
				}
			}	
	        $("#container .aaaa").html('');		
		    $("#container .aaaa").html(strM);		
		})
		//给li绑定点击事件,这块必须事件委托不然dom刷新后就捕获不到元素   这块事件有冲突所以用鼠标按下事件
		$("#container .aaaa").on("mousedown",function(e){	
		     e=e.target;	
			var content ="";
			//2017/6/2 去除背景颜色
			/*$(e).siblings().removeClass('bgColor');
			$(e).toggleClass("bgColor");*/
			if($(e).html().indexOf("<li")==-1 ){
				content=$(e).text();
				$("#container input").val(content);
				//2017/6/2  修改class的类名
				/*$(".aaaa").css("display","none");*/
				$(".content").css("display","none");
				targetArr.text=content;//放进去的值
				//获取value
				for(var c=0;c<arr.length;c++){
					if(targetArr.text==arr[c].text){
						targetArr.value=arr[c].value;
					}
				}
				
			}
		});
		$("#container input").blur(function(e){
			//2017/6/2 如果点击的是div的最右边、最下边和右下角，则拉伸时，div框不消失
			if(e.originalEvent.explicitOriginalTarget.className=="dragrightDown drag"||e.originalEvent.explicitOriginalTarget.className=="dragright drag"||
					e.originalEvent.explicitOriginalTarget.className=="dragdown drag"){
				$(".content").css("display","block");
				$("#mask").css("display","block");//2017/6/4 模态框显示
			}else{
				$(".content").css("display","none");
				$("#mask").css("display","none");//2017/6/4 模态框消失
			}
			falg=true;
			$("#container input").val(targetArr.text);
			if(a==true){
				$("#container .aaaa").html('');
				str='';
				for(var b=0;b<arr1.length;b++){
					str+="<li>"+arr1[b].text+"</li>";
				}
				$("#container .aaaa").html(str);
				a=false;
			}
		});
		//如果下拉框显示，点击空白的地方让它隐藏
		$(document).click(function(e){
			if($(".content").css("display")=="block"){//2017/6/2 当点击空白的地方，下拉框消失
				var _con=$("#container");//设置目标区域
				if(!_con.is(e.target)&&_con.has(e.target).length===0){
					$(".content").css("display","none");
					$("#mask").css("display","none");//2017/6/4 模态框消失
				}
			}
		})
		
	 }
//customer group下拉框可以拉伸
var resize = function resizeM(container,opts){
    var directionArr =( ($.type(opts) ==='array') && opts)|| ['right'];
    directionArr.forEach(function(v,i){
        if(v==='right' || v=== 'rightDown'||v==='down'){
            resize(container,v);
        }
    });
    function resize(container,direction){
        var cssArray = {
            'right':{
                top: 0,
                bottom: '15px',
                right: 0,
                marginRight: '-4px',
                width:'8px',
                cursor:'e-resize',
            },
            'down':{
                left:0,
                right: '15px',
                bottom:0,
                marginBottom:'-4px',
                height: '8px',
                cursor:'n-resize',
            },
            'rightDown':{
                width:'30px',
                height: '30px',
                right:'-4px',
                bottom:'-4px',
                cursor:'se-resize',
            }
        };
        var cssStyle = $.extend({
            position:'absolute'
        },cssArray[direction]);

        var className = 'drag'+direction;
        container.append('<div class="'+className+' drag"></div>');
        var elem = container.find('.'+className);
        elem.css(cssStyle);
        const divWidth =  container.width();
        const divHeight =  container.height();
        elem.on('mousedown',function(e){
            var clientX = e.clientX;
            var clientY = e.clientY;
            var left = clientX - container.width();
            var top = clientY - container.height();
            var documentElem = $(document);
            var iframeDocument=$("#iframe");
			var FixScroll=$(".itemWrap");
			documentElem.on('mousemove', function(e){
                var docClientX = e.clientX;
                var docClientY = e.clientY;
                var width = docClientX - left;
                var height = docClientY - top;
                if(width >= divWidth && direction==='right' ){
                    container.css({width: width+'px'})
                    container.find('.itemWrap').css({width: width+"px"})
                    container.find('.aaaa').css({width: width+"px"})
                }
                if(height >= divHeight && direction==='down' ){
                    container.css({
                    	height: height+'px',
                    	maxHeight:height+1+'px'
                    	})
                    container.find('.itemWrap').css({
                    	height: height+'px',
                    	maxHeight:height+1+'px'
                    })
                    container.find('.aaaa').css({
                    	height: height+'px',
                    	maxHeight:height+1+'px'
                    })
                }
                if(height >= divHeight && width >= divWidth && direction==='rightDown'){
                    container.css({
                        height: height + 'px',
                        width: width + 'px',
                        maxHeight:height+1+'px'
                    })
                    container.find('.itemWrap').css({
                    	height: height + 'px',
                        width: width + 'px',
                        maxHeight:height+1+'px'
                    })
                    container.find('.aaaa').css({
                    	height: height + 'px',
                        width: width + 'px',
                        maxHeight:height+1+'px'
                    })
                }

            });
            documentElem.on('mouseup', function(){
                documentElem.off('mousemove');
                documentElem.off('mouseup');
				FixScroll.off('mouseup');
				FixScroll.off('mousemove');
                elem.off('mouseup');
            });
            elem.on('mouseup', function(){
                documentElem.off('mousemove');
                documentElem.off('mouseup');
				FixScroll.off('mouseup');
				FixScroll.off('mousemove');
                elem.off('mouseup');
            });
            //阻止事件默认行为，取消文字选中
            container.on('mousedown',function(e){
				e.preventDefault();
			});
			
        });
    };

};
//sweet时间规整有问题还是自己搞吧
//参数依次为时间力度   当前时间
function TimeRegularization(timeer,currentTime){
	//规整的十五分钟
	if(timeer==900){
		var Minter=parseInt(currentTime.split(" ")[1].split(":")[1]);
		var TimeStr="";
		if(Minter==0){
			TimeStr="00";
		}else if( Minter>0 && Minter<15){
			TimeStr="00";
		}else if(Minter==15){
			TimeStr="15";
		}else if(Minter>15 && Minter<30){
			TimeStr="15";
		}else if(Minter==30){
			TimeStr="30";
		}else if( Minter>30 && Minter<45){
			TimeStr="30";
		}else if(Minter==45){
			TimeStr="45";
		}else if(Minter>45){
			TimeStr="45";
		}
	var TimeMinter =	currentTime.split(" ")[0] + " " +currentTime.split(" ")[1].split(":")[0] +":" +TimeStr;
	return TimeMinter;
	}else if(timeer==3600){//规整的是小时粒度
		var TimeHour =	currentTime.split(" ")[0] + " " +currentTime.split(" ")[1].split(":")[0] +":" +"00";
		return TimeHour;
		
	}
}

