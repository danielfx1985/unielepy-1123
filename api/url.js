let _url;
if (process.env.NODE_ENV == "development") {
    //本地开发
    _url = 'http://django-vue-lyadmin.lybbn.cn/api/'; //测试地址/
} else {
    _url = 'http://django-vue-lyadmin.lybbn.cn/api/'; //线上地址
}
export const url = _url;