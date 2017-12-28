var Url = {
    h5BaseUrl: ('https:' == document.location.protocol ? 'https://' : 'http://') + "hshop.wochu.cn/client/v1",
    api5BaseUrl: ('https:' == document.location.protocol ? 'https://' : 'http://') + "192.168.15.230:9999/client/v1",
    api4BaseUrl: ('https:' == document.location.protocol ? 'https://' : 'http://') + "dev1.i-kitchen.cn:9093/client/v1",
    groupBaseUrl: ('https:' == document.location.protocol ? 'https://' : 'http://') + '192.168.15.151:9098/client/v1',
	quickPayUrl: ('https:' == document.location.protocol ? 'https://' : 'http://') + "180.168.130.155:8011/api",
	apiCmsUrl: ('https:' == document.location.protocol ? 'https://' : 'http://') + "192.168.15.153:8078",
    imgUploadUrl: ('https:' == document.location.protocol ? 'https://' : 'http://') + 'hshop.wochu.cn/client/v1/image/upload', //图片上传地址
	weChatPayUrl: ('https:' == document.location.protocol ? 'https://' : 'http://') + "hshop.wochu.cn/wxpay/pay/weixin/example/JsApiPayPage.aspx", //微信支付地址
	alipayUrl: ('https:' == document.location.protocol ? 'https://' : 'http://') + "hshop.wochu.cn/wxpay/pay/Alipay/UPlay.aspx", //支付宝支付地址
	wxloginUrl: ('https:' == document.location.protocol ? 'https://' : 'http://') + 'hshop.wochu.cn/wxzc/Third/Index?backUrl=', //微信授权页跳转地址
	wxshareUrl: ('https:' == document.location.protocol ? 'https://' : 'http://') + 'hshop.wochu.cn/tuan/Common/GetShare', //微信分享接口地址
	unionPayUrl: ('https:' == document.location.protocol ? 'https://' : 'http://')+ "hshop.wochu.cn/wxpay/Pay/UnionPayPC/index.aspx", //银联支付地址
	logoUrl: ('https:' == document.location.protocol ? 'https://' : 'http://') + 'hshop.wochu.cn/h5', //我厨logo地址
	loginUrl: ('https:' == document.location.protocol ? 'https://' : 'http://') + 'hshop.wochu.cn/token',  //登录接口
	appId: "wx5345ed6dac2fdfc4", //测试环境
}
