

JSP内置对象
out request response session  application  page pageCcontext exception config  
web 程序的请求响应模式
用户发送请求 request 
服务器给用户响应 response 
out 对象
缓冲区 buffer 就是内存的一块区域来保存临时数据
out 对象是jspWriter类的实例，是客户端输出常用的对象
常用方法如下
1：void printIn()向客户端打印字符串
2：void clear()清除缓冲区的内容，如果在flush之后调用会抛出异常
3：void clearBuffer()清除缓冲区的内容，如果在flush之后不会抛出异常
4：void flush()将缓冲区内容输出到客户端
5：int getBufferSize() 返回缓冲区字节数的大小，如果不设置则返回0
6：int getRemaining()返回缓冲区还剩多少可用
7：boolean isAutoFlush 返回缓冲期满时，是自动清空还是抛出异常
8：void close()关闭输出流
版本控制工具SVN
css透明度兼容处理
opacity: 0.4;
filter: alpha(opacity=40);
canvas画图的用法
<canvas id="mycanvas" width="400" height="500">您的浏览器不支持canvas标签</canvas>
var canvas=document.getElementById("mycanvas")

var ctx=canvas.getContext("2d")
ctx.befinPath();
Echart基本知识点
Echart.init()
--初始化Echart实例
--setOption用指定的数据绘图
Option对象
--标题
--图裂：legend
--X轴：xAxis
--数据：series;
  --Name,type和data
标题组件
Text标题文字
SubtextColor:边框颜色
Left,top,right,bottom标题位置
borderColor:边框颜色
borderWidth:边框宽度

HTML5离线事件的应用
Application Cache
Manifest文件
Application Cache的浏览器事件
特点
缺点：更新必须完全，否则抛弃更新，等待下次更新
更新后下次打开生效
1:Manifest文件有变化更新
2：一次必须更新Mainifest中的所有文件
3：下次才生效
<html mainifest="phone.mainifest">
webSQL 浏览器访问的本地数据库
特点：占用资源少，处理速度快
-----------------------------------------------------
es6新的特性
let暂时性的死区必须先申明后用，不然不像var 报underfind,而是报错
let不允许相同作用域申明同一个变量
不能在函数内部申明变量
函数内部重新申明变量，会导致变量提升，内层变量覆盖了外部变量，使得报错或是underfined
解构赋值不仅适用于数组，同样适用于数组
结构失败变量等于underfined
字符串根据length长度解构赋值
函数的解构赋值
include(传参)返回布尔值，表示是否找到了参数字符串
startWith(传参)返回布尔值，表示字符串是否遭头部
endWidth(传参)返回布尔值，表示字符串是否在尾部
xxx.repeat(参数)表示将字符串重复多次
模板字符串的用法
``可在字符串中切入变量
如果在模板字符串中选要用到模板字符串，必须要有用反斜杠转义`\\`  ${变量} 也可放入对象属性
模板字符串所有空格和换行都是保留的可以用trim()方法去除

字符串对象的4个方法 match() search() replace() split()
Math.sign()
Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。

它会返回五种值。

参数为正数，返回+1；
参数为负数，返回-1；
参数为0，返回0；
参数为-0，返回-0;
其他值，返回NaN。
var f=(num1,num2)=>{}箭头函数
Set函数可以接受一个数组作为参数，用来初始化，set结构不会添加重复的值
[...arr]扩展运算符
WeakSet是一个构造函数，可以使用new命令，创建WeakSet数据结构
const a=[[1,2],[2,3]]
const ws=new WeakSet(a)
//{[1,2],[2,3]}
a是一个数组，他有一个成员，也都是数组，a将作为WeakSet构造函数的参数，a的成员也会成为weakSet的成员，数组成员只能是对象，WeakSet没有size属性，他的成员没法遍历，节点从文档消失，移除时不会引发内存泄露
Object.values()值
Object.keys()键
Object.entries()键值
set()

类
class parent(){
	constructor(){
	this.name="zhangsan";
	this.age=66;
	this.love="打球"；
	this.size=20;
}

console.log(parent.size)
}
Array.of()将集合转为数组
Array.from()将伪数组转为数组
Object.assign()拷贝，浅拷贝，只拷贝引用地址，不会拷贝值

add deltete clear list 

promise异步编程解决方案（已封装）

  let url="https://free-api.heweather.com/v5/weather?city=西安市&key=c24778e3bb7c49c7860bed0f1665c5b4 "
    let getJSON = function(url) {
        let  promise = new Promise(function(resolve, reject){
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onreadystatechange = handler;
            xhr.responseType = "json";
            xhr.setRequestHeader("Accept", "application/json");
            xhr.send();
            function handler() {
                if (this.readyState !== 4) {
                    return;
                }
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    reject(new Error(this.statusText));
                }
            }
        });
        return promise;
    };
     getJSON(url).then(function(json) {
        console.log(json);
    }, function(error) {
        console.error('出错了', error);
    });

---------------------------------------------------------------------
深拷贝函数
 function ObjCopy(obj) {
 	var tmp_obj;
 	if (typeof obj == 'object') {
 		if (obj instanceof Array) {
 			tmp_obj = [];
 		} else {
 			tmp_obj = {};
 		}
 	} else {
 		return obj;
 	}
 	for (var i in obj) {
 		if (typeof obj[i] != 'object') {
 			tmp_obj[i] = obj[i];
 		} else if (obj[i] instanceof Array) {
 			tmp_obj[i] = [];
 			for (var j in obj[i]) {
 				if (typeof obj[i][j] != 'object') {
 					tmp_obj[i][j] = obj[i][j];
 				} else {
 					tmp_obj[i][j] = ObjCopy(obj[i][j]);
 				}
 			}
 		} else {
 			tmp_obj[i] = ObjCopy(obj[i]);
 		}
 	}
 	return tmp_obj;
 }

-------------------------------------------------------------
数据类型转型

    var obj=[
        {id:1,
            name:"s"
        },
        {id:2,
            name:"e"
        },
        {id:3,
            name:"t"
        }
    ]
 function transData(obj) {
     var res = {};
     var tenObj;
     for (var i = 0, len = obj.length; i < len; i++) {
         tenObj = $.extend({}, obj[i]);
         res[obj[i]['id']] = tenObj;
        

     }
     return res;
 }
console.log(transData(obj))


------------------------------------------------------------
linux系统的管理
进程管理  正在执行的程序或是命令
1：判断服务器的健康状态
2：查看系统中所有的进程
3：杀死进程
进程查看ps和pstree命令
进程查看top命令
ps aux 
ps -le
USER命令那个用户产生的
PID 进程ID好永远为1
%CPU该进程占用的内存
TTY系统进程，内核启动
%MEM 进程占用物理内存的百分比，占用越高越耗费资源
VSZ该进程占用实际物理内存的大小，单位KB
TTY该进程在那个终端运行的，其中tt1-tty7代表本地控制台终端，tt1-tty6是本地的子负面终端，tty7是图形终端，pts/0-255代表虚拟终端。
绝大多数进程是S（睡眠）
R：运行
T :停止状态
s：包含子进程
+：位于后台
START:当前进程启动的时间
pstree显示进程树
logout正确退出

-p查看每一个进程的pid
-u显示所有进程的所属用户




-----------------------------------------------------

Websocket
socket.io
public static void main(String[] args){
	
}


时间函数的封装
  function formatDate(now){     
              var   year=now.getFullYear();  
              var   month=now.getMonth()+1;     
              var   date=now.getDate();     
              var   h=now.getHours();     
              var   m=now.getMinutes();     
              var   s=now.getSeconds();  
              var  hour = h < 10 ? ('0' + h) : h;  
              var minute = m < 10 ? ('0' + m) : m;    
              var second = s< 10 ? ('0' + s) : s;   
              return   year+"-"+month+"-"+date+"   "+hour+":"+minute;     
              }     






