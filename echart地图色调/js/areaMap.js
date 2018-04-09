
	/* 全局变量设置 */
		var option = {};
		var chart = echarts.init(document.getElementById('main'));
		var countryViewOption;/*首选项 */
		var cityViewOption;
		var province;
		var city;
		var provinces = [ 'shanghai', 'hebei', 'shanxi', 'neimenggu',
				'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang',
				'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei',
				'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan',
				'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai',
				'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing',
				'xianggang', 'aomen' ];
		var provincesText = [ '上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏',
				'浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西',
				'海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆',
				'北京', '天津', '重庆', '香港', '澳门' ];
		/*省份钻取处理函数*/
		function showProvince(data) {
			var nameNum = jQuery.inArray(data, provincesText); /* 判断数据是否包含数据返回index */
			var name = provinces[nameNum];
		}

		/*市级钻取处理函数*/
		function showCity(data) {
			$.get('echartsMap/cityTown/' + data + '.json', function(geoJson) {/* 地图Json文件获取 */
				echarts.registerMap(data, geoJson);/* 地图注册 */

				chart.setOption(option = {
					tooltip : {
						trigger : 'item',
						formatter : '{b}'
					},
					geo : {
						map : data,
						silent : false,/*无鼠标等事件*/
						label : {
							normal : {

								show : true,
							},
							emphasis : {
								show : true,
							}
						},
						itemStyle : {
							normal : {
								color : 'skyblue',
								label : {
									show : true,
									textStyle : {
										color : '#fff',
										fontSize : 24
									}
								}
							},
							emphasis : {
								color : 'pink',
								label : {
									show : false,
								}
							}
						}
					/*animation: true*/
					// animationDurationUpdate: 1000,
					// animationEasingUpdate: 'quinticInOut'
					},
					series : [

					],
				});
				window.onresize = chart.resize;
			});
		}

		/*首选项*/
		option = {
			title : {
				text : "基于Echarts的地图钻取(精确到县级)",
				left : 'center',
				top : 15,
			},
			tooltip : {
				trigger : 'item',
				formatter : '{b}'
			},
			geo : /* 地图基础坐标系 */
			{
				map : 'china',
				/* roam:'move', *//* 鼠标缩放和平移漫游 */
				mapType : '北京市',
			},

			series : [],
		};
		/*结束基础首选项*/

		window.onresize = chart.resize;/* 根据屏幕调整宽度 */
		chart.setOption(option);/*设置选项*/
		countryViewOption = chart.getOption();/*取得基础视图省级内容全局变量 */
		bindClick();
		aa("zhengzhou");
		$("#areaVal").on("change", function() {
			var areaId = $("#areaVal option:selected").val()
			var cityName = '';
			if(areaId=="2"){
				cityName = 'zhengzhou';
			}else if(areaId=="3"){
				cityName = 'luoyang';
			}else if(areaId=="4"){
				cityName = 'kaifeng';
			}else if(areaId=="5"){
				cityName = 'anyang';
			}else if(areaId=="6"){
				cityName = 'xuchang';
			}else if(areaId=="7"){
				cityName = 'xinxiang';
			}else if(areaId=="8"){
				cityName = 'luohe';
			}else if(areaId=="9"){
				cityName = 'shangqiu';
			}else if(areaId=="10"){
				cityName = 'xinyang';
			}else if(areaId=="11"){
				cityName = 'nanyang';
			}else if(areaId=="12"){
				cityName = 'jiaozuo';
			}else if(areaId=="13"){
				cityName = 'sanmenxia';
			}else if(areaId=="14"){
				cityName = 'hebi';
			}else if(areaId=="15"){
				cityName = 'pingdingshan';
			}else if(areaId=="16"){
				cityName = 'zhoukou';
			}else if(areaId=="17"){
				cityName = 'zhumadian';
			}else if(areaId=="18"){
				cityName = 'puyang';
			}else if(areaId=="19"){
				cityName = 'jiyuan';
			}else{
				cityName = 'zhengzhou';
			}
			aa(cityName);
		});
		function aa(cityName) {
			var dataName = cityName;/*区域名称*/
			if ((jQuery.inArray(dataName, provincesText)) != -1) {/*省级点击触发*/
				showProvince(dataName);/* 展示省级内容 */
				/*var dom = chart.getDom();*/
				province = dataNae;/*全局省份名称变量*/
			} else {
				$.ajax({/*判断JSON文件是否存在*/
					url : 'echartsMap/cityTown/' + dataName + '.json',
					async : false,
					error : function() {
						/*JSON文件不存在触发*/
					},
					success : function() {
						/*JSON文件存在触发*/
						city = dataName;
						showCity(city);/* 展示市级内容 */
					}
				});
			}
		}
		function bindClick() {
			/* 全局鼠标事件绑定 */
			chart.on('click', function(params) {

				var dataName = params.name;/*区域名称*/
				if ((jQuery.inArray(dataName, provincesText)) != -1) {/*省级点击触发*/
					showProvince(dataName);/* 展示省级内容 */
					/*var dom = chart.getDom();*/
					province = dataName;/*全局省份名称变量*/
					beIcn(chart, function(params) {/*添加返回省级视图按钮*/
						exitProvice();
					});
				} else {
					$.ajax({/*判断JSON文件是否存在*/
						url : 'echartsMap/cityTown/' + dataName + '.json',
						async : false,
						error : function() {
							/*JSON文件不存在触发*/
							beIcn(chart, function(params) {/*添加返回省级视图按钮*/
								exitBView(dataName);
							});
						},
						success : function() {
							/*JSON文件存在触发*/
							city = dataName;
							showCity(city);/* 展示市级内容 */
							beIcn(chart, function(params) {
								chart.setOption(cityViewOption);/*添加返回市级视图按钮*/
								beIcn(chart, function(params) {
									exitProvice();
								});
							});
						}
					});
				}
			});
		}