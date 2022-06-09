/**unielepy
 * 公共方法
 * @author lybbn
 * @date 2022.4.18
 */
module.exports = {
	dateFormats(dateObj, format){
	  let date = {
	    'M+': dateObj.getMonth() + 1,
	    'd+': dateObj.getDate(),
	    'h+': dateObj.getHours(),
	    'm+': dateObj.getMinutes(),
	    's+': dateObj.getSeconds(),
	    'q+': Math.floor((dateObj.getMonth() + 3) / 3),
	    'S+': dateObj.getMilliseconds()
	  };
	  if (/(y+)/i.test(format)) {
	    format = format.replace(RegExp.$1, (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length))
	  }
	  for (let k in date) {
	    if (new RegExp('(' + k + ')').test(format)) {
	      format = format.replace(RegExp.$1, RegExp.$1.length === 1
	        ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
	    }
	  }
	  return format
	},
	getHoursT(t2){
		let t1 = dateFormats(new Date(),'yyyy-MM-dd hh:mm:ss')
	    t1 = new Date(t1.replace(/-/g,'/'));
	    t2 = new Date(t2.replace(/-/g,'/'));
		let ms = Math.abs(t1.getTime() - t2.getTime())
		return ms/1000/60/60
	},
	// 计算时间差
	timeago(dateTimeStamp){ 
		var result='';
	     var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
	     var hour = minute * 60;
	     var day = hour * 24;
	     var week = day * 7;
	     var halfamonth = day * 15;
	     var month = day * 30;
	     var now = new Date().getTime();   //获取当前时间毫秒
	     //console.log(now)
	     var diffValue = now - dateTimeStamp;//时间差
	 
	     if(diffValue < 0){
	         return;
	     }
	     var minC = diffValue/minute;  //计算时间差的分，时，天，周，月
	     var hourC = diffValue/hour;
	     var dayC = diffValue/day;
	     var weekC = diffValue/week;
	     var monthC = diffValue/month;
	     if(monthC >= 1 && monthC <= 3){
	         result = " " + parseInt(monthC) + "月以前"
	     }else if(weekC >= 1 && weekC <= 3){
	         result = " " + parseInt(weekC) + "周以前"
	     }else if(dayC >= 1 && dayC <= 6){
	         result = " " + parseInt(dayC) + "天以前"
	     }else if(hourC >= 1 && hourC <= 23){
	         result = " " + parseInt(hourC) + "小时以前"
	     }else if(minC >= 1 && minC <= 59){
	         result =" " + parseInt(minC) + "分钟以前"
	     }else if(diffValue >= 0 && diffValue <= minute){
	         result = "刚刚"
	     }else {
	         var datetime = new Date();
	         datetime.setTime(dateTimeStamp);
	         var Nyear = datetime.getFullYear();
	         var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
	         var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
	         var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
	         var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
	         var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
	         result = Nyear + "-" + Nmonth + "-" + Ndate
	     }
	     return result;
	 },
	 // 跳转页面(支持http、https、/pages/** 页内跳转,isindex是否跳转的tabar，默认false,isredirect 关闭本页跳转默认为false)
	 linkjump(link,isindex=false,isredirect=false){
	 	if (link && (link.indexOf("http://") != -1 || link.indexOf("https://") != -1)) {
	 		uni.navigateTo({
	 			url: `/pages/content/webview?url=${link}`
	 		});
	 	} else if (link && link.indexOf("/pages/") != -1) {
			if(isindex){
				uni.switchTab({
					url:`${link}`
				})
			}else if(isredirect){
				uni.redirectTo({
					url:`${link}`
				})
			}
			else{
				uni.navigateTo({
					url: `${link}`
				});
			}
	 	}	
	 },
	 //剪切板（复制）兼容安卓 、ios 和 大部分小程序
	 copyData(val){
		let vm = this
		// #ifndef H5
		uni.setClipboardData({
			data: val,
			success: function() {
				vm.showToast("内容已复制")
			}
		})
		// #endif
		// #ifdef H5
		var textarea = document.createElement("textarea")
		textarea.value = val
		textarea.readOnly = "readOnly"
		document.body.appendChild(textarea)
		textarea.select()
		textarea.setSelectionRange(0, val.length)
		document.execCommand("copy")
		textarea.remove()
		vm.showToast("内容已复制")
		// #endif
	 },
	 //透明加载提示框
	 showLoading(title) {
	 		uni.showLoading({
	 			title: title
	 		});
	 	},
	 //显示透明提示框
	showToast(title,mask=false,duration=2000,icon="none") {
		uni.showToast({
			title: title,
			mask: mask,
			duration: duration,
			icon: icon,
		});
	},
	//设置json缓存
	setJson: function(key, value) {
		let jsonString = JSON.stringify(value);
		try {
			uni.setStorageSync(key, jsonString);
		} catch (e) {
			// error
		}
	},
	//获取json缓存
	getJson: function(key) {
		try {
			const value = uni.getStorageSync(key);
			if (value) {
				return JSON.parse(value);
			}
		} catch (e) {
			// error
		}

	},
	//设置缓存
	setData: function(key, value) {
		try {
			uni.setStorageSync(key, value);
		} catch (e) {
			// error
		}
	},
	//获取缓存
	getData: function(key) {
		try {
			const value = uni.getStorageSync(key);
			if (value) {
				return value;
			}
		} catch (e) {
			// error
		}
	},
	//删除某条队列
	remove: function(key) {
		try {
			uni.removeStorageSync(key);
			//localStorage.removeItem(key)
		} catch (e) {
			// error
		}
	},
	//清除普通用户的缓存
	clearUser(){
		this.remove("nuserlogininfo");
	},
	//清除所有缓存
	clear: function() {
		uni.clearStorage();
	},
	//检查普通用户登录
	checkLogin(){
		var logininfo = this.getData("nuserlogininfo");
		if(logininfo){
			return true
		}else{
			return false
		}
	},
	//重新加载页面
	reloadPage(path){
		//延迟重载该页面
		setTimeout(()=>{
			uni.redirectTo({
				url: path,
			});
		},2000)
	},
	/**
	 * 判断是否价格
	 * @param {Object} val
	 */
	isRealPrice:function(val) {
		if (val === "" || val == null ||val == 0) return false;
		let dot = val.indexOf('.');   //包含小数点
		if (dot > -1) {//判断是否小数点后两位
			if (val.length > dot + 3) {
				return false
			}
		}
		if(/^\d*(\.?\d{0,2})$/.test(val)){
			return true;
		};
		if (!isNaN(val)) return true;
		return false;
	},
	/**
	 * 判断是否为正整数
	 * @param {Object} val
	 */
	isRealZhengNum:function(val) {
		if (val === "" || val == null) return false;
		if(/(^[1-9]\d*$)/.test(val)){
			return true;
		};
		if(isNaN(val)) return false;
		return false;
	},
	/**
	 * 验证手机号是否合法
	 * @param {Number} number
	 */
	checkPhoneNum(number) {
		let reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
		if (number == '' || number.length != 11 || !reg.test(number)) return false;
		return true;
	},
	/**
	 * 验证身份证号是否合法
	 * @param {Number} number
	 */
	checkIdcard(number) {
		let reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
		if (number == '' || !reg.test(number)) return false;
		return true;
	},
	/**
	 * 商城详情商品选择
	 * 参数：obj商品详情的数据的对象，selectArray选择的规格值id数组['1','2','3']
	 * 返回选择的sku信息
	 */
	selectGoodsSKU(obj,selectArray){
		var skus = obj.skus
		var specs = obj.specs
		var spec_length = selectArray.length
		for (let i = 0 ; i<skus.length;i++){
			var temp_spec_array = []
			skus[i].spec.forEach((item,index)=>{
				temp_spec_array.push(item.spec_value_id)
			})
			let temp_new_spec_array = temp_spec_array.filter((v)=>{
				return selectArray.indexOf(v) !== -1
			})
			if(temp_new_spec_array.length==spec_length){
				return skus[i]
			}
		}
		return {}
	},
	// 给下载的文件重命名
	renameFileName(sFilePath, sFileName) {
		var sFileName = sFileName.split('/')[sFileName.split('/').length - 1];//原来的文件名
		
		var aFileUrl = sFilePath.split('/').splice(0, sFilePath.split('/').length - 1);//saveFile API保存的本地地址
		
		var url = this.downloadUlr;//下载地址
			// 'url下载地址（和上面的一样）'
		let dtask = plus.downloader.createDownload(url, {
				filename: "file://storage/emulated/0/lybbn-uniapp/" + sFileName //在手机存储更目录创建一个叫AAA的文件夹，把文件存储进去，并更改会原名
			},
			(d, status) => {
				if (status == 200) {
					let fileSaveUrl = plus.io.convertLocalFileSystemURL(d.filename);
					
				} else {
					//下载失败
					plus.downloader.clear(); //清除下载任务
				}
			})
		dtask.start();
	},
	/**
	 * 根据url下载图片或视频或其他类型资源保存到本地相册
	 */
	downloadFile(url){
		uni.downloadFile({
			url: url, //资源地址
			success: (res) => {
				if (res.statusCode === 200) {
					var temppath = res.tempFilePath;
					var suffix = url.split(".")[url.split(".").length - 1];//获取地址后缀
					var ext = url.substring(url.length - 3);//对于有4位后缀的文件不准
					//判断是否为（图片或视频）
					if(suffix == "MP4" || suffix == "mp4" ||suffix == "flv" ||suffix == "FLV" || suffix == "jpg"  ||suffix == "JPG" || suffix == "png" ||suffix == "jpeg" || suffix == "PNG"||suffix == "gif"||suffix == "GIF"){
						//视频
						if(suffix == "MP4" || suffix == "mp4" ||suffix == "flv" ||suffix == "FLV"){
							this.showLoading("正在保存中")
							uni.saveVideoToPhotosAlbum({
								filePath: temppath,
								success: function () {
									uni.showToast({
										title: '保存成功',
										icon: 'none',
										duration:2000,
										mask:true
									});
								},
								fail: function() {
									uni.showToast({
										title: '保存失败',
										icon: 'none'
									});
								}
							});
							uni.hideLoading()
						}else{//图片
							uni.saveImageToPhotosAlbum({
								filePath: temppath,
								success: function () {
									uni.showToast({
										title: '保存成功',
										icon: 'none',
										duration:2000,
										mask:true
									});
								},
								fail: function() {
									uni.showToast({
										title: '保存失败',
										icon: 'none'
									});
								}
							});
						}
					}else{//下载文件为非图片和视频的文件
						let _this = this;
						var sFileName = url.split('/')[url.split('/').length - 1];//原来的文件名
						//#ifdef APP-PLUS
						//文件保存到本地
						uni.saveFile({
							tempFilePath: temppath,//临时路径
							success:function(res1){
								var savedFilePath = res1.savedFilePath;
								let osname = plus.os.name;
								//ios手机直接打开文件，手动存储文件到手机，Android手机从根目录创建文件夹，保存文件并改名
								if (osname == 'Android') {
									uni.showToast({
										icon:'none',
										mask:true, 
										title:'保存成功',
										duration:1000,
									});
									_this.renameFileName(res.savedFilePath, sFilePath);
								}
								setTimeout(() => {
									//打开文档查看
									uni.openDocument({
										filePath:res.savedFilePath,
										success:function(res){
											// console.log("成功打开文件")
										},
										fail(){
											// console.log("打开文件失败")
										}
									})
								},1000)
							},
							fail:function(res1){
								
							}
						});
						//#endif
						//#ifdef MP-WEIXIN
						//小程序对文件下载并不友好，不建议使用小程序当做下载器
						const FileSystemManager = wx.getFileSystemManager();
						FileSystemManager.saveFile({//下载成功后保存到本地
							tempFilePath:data.tempFilePath,
							filePath:wx.env.USER_DATA_PATH + "/" + sFileName,
							success(res2){
								if(res2.errMsg == 'saveFile:ok'){
									
									// 判断手机平台是 Android 还是 IOS
									if (uni.getSystemInfoSync().platform === 'android') {
										// console.log('运行Android上')
										uni.showModal({
											title:"保存地址为",
											content:"手机存储/Android/data/com.tencent.mm/MicroMsg/lybbn-uniapp"
										})
									} else {
										// console.log('运行iOS上')
										uni.showToast({
											title:"请转移APP下载",
											icon:"none"
										})
									}
									
								}else{
									uni.showToast({
										title:"下载失败",
										icon:"none"
									})
								}
							},
							fail(){
								uni.showToast({
									title:"下载失败",
									icon:"none"
								})
							}
						})
						//#endif
					}
					
				}else{
					uni.showToast({
						icon:"none",
						mask:true,
						title:"下载失败"
					})
				}
			},
			fail:(err) => {
				uni.showToast({
					icon:"none",
					mask:true,
					title:"下载失败"
				})
			}
		});
	},
}