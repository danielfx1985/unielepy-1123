import {upgradeApp} from '@/api/api.js'
const PACKAGE_UPDATE_KEY = '__unielepy_package_update__'
const PACKAGE_INFO_KEY = '__unielepy_package_info__'
const is_silently = false //app的wgt更新是否静默安装
//应用初始化页
// #ifdef APP-PLUS
plus.screen.lockOrientation('portrait-primary'); //竖屏正方向锁定 
//热更新
const updated = uni.getStorageSync(PACKAGE_UPDATE_KEY); // 尝试读取storage
if (updated.completed === true) {
	// 如果上次刚更新过
	// 删除安装包及安装记录
	console.log('安装记录被删除，更新成功');
	uni.removeSavedFile({
		filePath: updated.packgePath,
		success: res => {
			uni.removeStorageSync(PACKAGE_UPDATE_KEY);
		}
	});
} else if (updated.completed === false) {
	uni.removeStorageSync(PACKAGE_UPDATE_KEY);
	plus.runtime.install(updated.packgePath, {
		force: true
	});
	uni.setStorage({
		key: PACKAGE_UPDATE_KEY,
		data: {
			completed: true,
			packgePath: updated.packgePath
		},
		success: res => {
			console.log('成功安装上次的更新，应用需要重启才能继续完成');
		}
	});
	uni.showModal({
		title: '提示',
		content: '应用将重启以完成更新',
		showCancel: false,
		complete: () => {
			plus.runtime.restart();
		}
	});
}else{
	// 初始化appVersion（检查当前版本信息并尝试更新--仅app生效）
	initAppVersion();
}
// #endif

/**
 * // 初始化appVersion并尝试更新版本
 */
function initAppVersion() {
	// #ifdef APP-PLUS
	let appid = plus.runtime.appid;
	plus.runtime.getProperty(appid, (wgtInfo) => {
		let appVersion = plus.runtime;
		let currentVersion = appVersion.versionCode > wgtInfo.versionCode ? appVersion.version : wgtInfo.version;
		getApp().globalData.appVersion = currentVersion
		var formdata = {
			appid:appid,
			version:currentVersion,
		}
		// 检查服务器端版本号
		upgradeApp().then(res => {
			// console.log('检查是否有可以更新的版本', res);
			if (res.code == 2000) {
				// 判断是否更新
				checkVersionToUgrade(res.data.version,currentVersion,res.data)
			}
		})
	});
	// 检查更新
	// #endif
}

/**
 * 对比版本号,并更新app
 * @param {Object} server_version 服务器端最新的版本号
 * @param {Object} current_version 当前应用的版本号
 * @param {Object} data 服务器返回的数据
 */
function checkVersionToUgrade(server_version, current_version,data) {
	//如果有更新
	if(compare(server_version,current_version)){
		let downloadLink = ''
		let androidLink = res.androidWgtUrl
		let iosLink = res.iosWgtUrl
		let ready = false
		let platform = plus.os.name.toLowerCase() === 'android' ? 'android' : 'ios'
		if (res.wgtUrl.match(RegExp(/.wgt/))) {
			// 判断系统类型
			if (platform === 'android') {
				console.log('安卓系统');
				if (androidLink && androidLink !== '#') {
					// 我这里默认#也是没有地址，请根据业务自行修改
					console.log('发现下载地址');
					// 安卓：创建下载任务
					if (androidLink.match(RegExp(/.wgt/))) {
						console.log('确认wgt热更新包');
						downloadLink = androidLink;
						ready = true;
					} else {
						console.log('安卓推荐.wgt强制更新，.apk的强制更新请您自行修改程序');
					}
				} else {
					console.log('下载地址是空的，无法继续');
				}
			}else{
				console.log('苹果系统');
				if (iosLink && iosLink !== '#') {
					// 我这里默认#也是没有地址，请根据业务自行修改
					console.log('发现下载地址');
					// 苹果(A)：进行热更新（如果iosLink是wgt更新包的下载地址）判断文件名中是否含有.wgt
					if (iosLink.match(RegExp(/.wgt/))) {
						console.log('确认wgt热更新包');
						downloadLink = iosLink;
						ready = true;
					} else {
						console.log('苹果只支持.wgt强制更新');
					}
				} else {
					console.log('下载地址是空的，无法继续');
				}
			}
			if (ready) {
				console.log('任务开始')
				let downloadTask = uni.downloadFile({
					url: downloadLink,
					success: res => {
						if (res.statusCode === 200) {
							// 静默更新，只有wgt有
							if (is_silently) {
								// 下载好直接安装，下次启动生效
								plus.runtime.install(res.tempFilePath, {
									force: false
								});
								// 任务完成，关闭下载任务
								console.log('任务完成，关闭下载任务');
								downloadTask.abort();
								downloadTask = null;
								return
							}else{
								// 保存下载的安装包(非静默安装，下次启动安装)
								console.log('保存安装包');
								uni.saveFile({
									tempFilePath: res.tempFilePath,
									success: res => {
										const packgePath = res.savedFilePath;
										// 保存更新记录到stroage，下次启动app时安装更新
										uni.setStorage({
											key: PACKAGE_UPDATE_KEY,
											data: {
												completed: false,
												packgePath: packgePath
											},
											success: () => {
												console.log('成功保存记录');
											}
										});
										// 任务完成，关闭下载任务
										console.log('任务完成，关闭下载任务，下一次启动应用时将安装更新');
										downloadTask.abort();
										downloadTask = null;
									}
								});
							}
						}
					}
				});
			} else {
				console.log('下载地址未准备，无法开启下载任务');
				}
				
			}else{//完整包更新
				uni.setStorageSync(PACKAGE_INFO_KEY, data)
				uni.navigateTo({
					url: `../components/ly-upgrade-app/upgrade-popup?local_storage_key=${PACKAGE_INFO_KEY}`,
					fail: (err) => {
						console.error('更新弹框跳转失败', err)
						uni.removeStorageSync(PACKAGE_INFO_KEY)
					}
				})
			}
		}
		
		
	}
}

/**
 * 对比版本号，如需要，请自行修改判断规则
 * 支持比对	("3.0.0.0.0.1.0.1", "3.0.0.0.0.1")	("3.0.0.1", "3.0")	("3.1.1", "3.1.1.1") 之类的
 * @param {Object} v1
 * @param {Object} v2
 * v1 > v2 return 1
 * v1 < v2 return -1
 * v1 == v2 return 0
 */
function compare(v1 = '0', v2 = '0') {
	v1 = String(v1).split('.')
	v2 = String(v2).split('.')
	const minVersionLens = Math.min(v1.length, v2.length);

	let result = 0;
	for (let i = 0; i < minVersionLens; i++) {
		const curV1 = Number(v1[i])
		const curV2 = Number(v2[i])

		if (curV1 > curV2) {
			result = 1
			break;
		} else if(curV1 < curV2) {
			result = -1
			break;
		}
	}

	if (result === 0 && (v1.length !== v2.length)) {
		const v1BiggerThenv2 = v1.length > v2.length;
		const maxLensVersion = v1BiggerThenv2 ? v1 : v2;
		for (let i = minVersionLens; i < maxLensVersion.length; i++) {
			const curVersion = Number(maxLensVersion[i])
			if (curVersion > 0) {
				v1BiggerThenv2 ? result = 1 : result = -1
				break;
			}
		}
	}

	return result;
}
