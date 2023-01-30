//使用方法示例：（需要再data中声明：noClick:true）
//main.js中全局引入：
//import stopRepeatClick from './utils/stopRepeatClick.js';
//Vue.prototype.$stopRepeatClick = stopRepeatClick //vue2
//app.config.globalProperties.$stopRepeatClick = stopRepeatClick; //vue3
//引用页使用方式：
//<button class="btn" @click="$stopRepeatClick(btnSave,'')">保存</button>
function stopRepeatClick (methods, info) {
	// methods是需要点击后需要执行的函数， info是点击需要传的参数
    let that = this;
	if (that.noClick) {
		// 第一次点击(需要再引用的页面的data中声明noClick:true)
		that.noClick= false;
		if(info && info !== '') {
			// info是执行函数需要传的参数
			methods(info);
		} else {
			methods();
		}
		setTimeout(()=> {
			that.noClick= true;
		}, 2000)
	} else {
		// 这里是重复点击的判断
	}
}

export default stopRepeatClick