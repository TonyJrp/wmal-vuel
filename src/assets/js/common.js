/**
 * 公共方法-- 判断是否是微信浏览器
 */
export function isWeiXinBrowser() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

/**
 * 公共方法-- 获取Token
 */
export function getUserToken() {
    if(document.cookie.length > 0) {
       let c_start = document.cookie.indexOf("UserToken=")
        if(c_start != -1) {
            c_start = c_start + "UserToken".length + 1;
            let c_end = document.cookie.indexOf(";", c_start);
            if(c_end === -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

/**
 * 公共方法-- 判断微信账号绑定
 */
export function checkWechat() {
    if (isWeiXinBrowser()) {
        let bcurl = window.location.href.split("#")[0];
        let backurl = encodeURI(apibaseUrl.wxloginUrl + encodeURI(bcurl + "?date=" + new Date().getTime() + ""));
        if(bcurl.indexOf("?") > 0){
            backurl = encodeURI(apibaseUrl.wxloginUrl + encodeURI(bcurl + "&date=" + new Date().getTime() + "")); //encodeURI(window.location.href));
        }
        setTimeout(function(){
             window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + apibaseUrl.appId + "&redirect_uri=" + backurl + "&response_type=code&scope=snsapi_userinfo&state=zhangwenjian#wechat_redirect"; //如果是微信浏览器，跳转到微信绑定地址
        },500);
    } else {
        if (!getUserToken()) {
            alert("denglu tools");
            window.location.href = "";
        }
    }
}

/**
 * 公共方法-- 获取链接参数的值
 */
export function getQueryString(paramName) {
    let reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
       return "";
    }
}

/**
 * 公共方法-- 删除链接某个参数
 */
export function delQueStr(url, ref) {
        let str = "";
        if (url.indexOf('?') != -1) {
            str = url.substr(url.indexOf('?') + 1);
        } else {
            return url;
        }
        let arr = "";
        let returnurl = "";
        let setparam = "";
        if (str.indexOf('&') != -1) {
            arr = str.split('&');
            for (i in arr) {
                if (arr[i].split('=')[0] != ref) {
                    returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
                }
            }
            return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
        } else {
            arr = str.split('=');
            if (arr[0] == ref) {
                return url.substr(0, url.indexOf('?'));
            } else {
                return url;
            }
        }
    }

/**
 * 公共方法-- set cookie
 */
export function setCookie(keys,val,time){
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + parseInt(time));
    let domain = ".wochu.cn"
    if(document.location.hostname.indexOf('i-kitchen.cn') > 0){
        domain = '.i-kitchen.cn';
    }
    document.cookie = keys + "=" + val + ";expires=" + exdate.toGMTString() + ";domain=" + domain + ";path=/;";
}

/**
 * 公共方法-- get cookie
 */
export function getCookie(c_name) {
    if(document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=")
        if(c_start != -1) {
            c_start = c_start + c_name.length + 1;
            let c_end = document.cookie.indexOf(";", c_start);
            if(c_end === -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

/**
 * 公共方法-- delete cookie
 */
export function delCookie(name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = Common.getCookie(name);
    if (cval != null) {
        let domain = ".wochu.cn"
        if(document.location.hostname.indexOf('i-kitchen.cn') > 0){
            domain = '.i-kitchen.cn';
        }
        document.cookie=name+'="";expires=' + exp.toGMTString() +';path=/';
        document.cookie=name+'="";expires=' + exp.toGMTString() +';domain=' + domain + ';path=/';
    }
}

