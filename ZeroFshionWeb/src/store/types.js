//--------调用接口域名申明--------
let IMGHOST_PRO ='';//图片域名，基本都是0-fashion，
let HOST_PRO = '';//其实host最好别放type里，有点别扭，但是为了全局方便改没办法。
let IMGHOST_DEV = "";//HOST
let HOST_DEV = ";//HOSTAPI
//--------------end--------------
//这里也删了！！哈哈
let IsDev = false;//正式环境
//let IsDev = true;//测试环境

/*
 * -------------以下是各种接口申明------------
*/

const IMGHOST = !IsDev?IMGHOST_PRO:IMGHOST_DEV;
const HOST = !IsDev?HOST_PRO:HOST_DEV;
const HOME = IMGHOST + "/home/store/index.html";

const GETPRODUCT_DETEALS=HOST+"/Api/Products/Product/GetBigProductDetail";//商品详情
const GETPRODUCT_COLORLIST=HOST+"/Api/Properties/Color/GetList";//获取所有颜色
const GETPRODUCT_LISTBYNAME=HOST+"/Api/Products/ProductAttribute/GetListByName";//根据name获取商品属性
const GETPRODUCT_GETLIST=HOST+"/Api/Products/Product/GetListRecommend";//获取商品
const PRODUCT_COLLET_ADD=HOST+"/Api/Members/MemberFavourite/Add";//添加收藏
const PRODUCT_BOX_ADD=HOST+"/Api/Members/MemberBox/Add";//添加单品到box（加入box）

const ADDBYPLAN=HOST+'/API/Members/Appointment/addByPlan';//预约此Box

const PRODUCT_BOX_GETCOUNT=HOST+"/Api/Members/MemberBox/GetCount";//获得box里面的单品数量
const GET_MUTIPLE_PRODUCT_INFO = HOST+"/Api/Products/Product/GetProductInfo";//通过货号批量获取商品信息

const GETMEMBERSCORE=HOST+"/api/Members/MemberInfo/GetMemberName";//获得储值和积分
const GETMEMBERCOLLECTBOX=HOST+"/Api/Members/MemberCollocationPlan/GetList";//获得我的方案收藏
const ADDMEMBERCOLLECTBOX=HOST+"/Api/Members/MemberCollocationPlan/Add";//添加我的方案收藏
const GETMEMBERCOLLECTSIGLE=HOST+"/Api/Members/MemberFavourite/GetList";//获得我的单品收藏
const SUBSCRIBE=HOST+"/API/Members/Appointment/getall";//获得我的预约
//const GETPROGRESS=HOST+'/API/Members/Appointment/' //获取状态详情
const GETMEMBERINFO=HOST+"/API/Members/MemberInfo/GetMemberInfo";//获得我的个人信息
const UPDATEMEMBERINFO=HOST+'/api/Members/MemberInfo/UpdateInfo';  //更改个人信息(性别、生日。。。。)
const GETPLANS=HOST+'/api/members/appointment/getPlans' //获取搭配方案详情
const GRTOPTIONS = HOST+'/API/Members/AppointmentUserFeedback/getOptions'  //获取评论题目
const SUBMITFEEDBACKS = HOST+'/API/Members/AppointmentUserFeedback/SubmitFeedbacks' //提交评论

const DELETEFAVOURITE = HOST+'/Api/Members/MemberFavourite/Remove'  //删除收藏单品
const DELETEBOX =HOST+'/Api/Members/MemberCollocationPlan/Remove'  //删除收藏BOX

const GETCOUPON = HOST+'/api/members/mywallet/get'  //获取优惠券

const APIADDRESS=HOST+'/Api/Members/Address/';//收获地址
const GETADDRESS=APIADDRESS+'GetList';//获取我的收获地址
const ADJUSTADDRESS=APIADDRESS+'Adjust';//调整 以[默认][最新]排序的第一个地址，不存在时自动添加
const UPDATE_PASSWORD=HOST+"/Api/Members/MemberInfo/UpdatePassword";  //更改密码

const COMMITSTYLETEST=HOST+'/api/members/member/addattr';//提交风格测试数据
const COMMITSTYLEDETAILSTEST=HOST+'/api/Members/CollocationQuestionnaire/InsertCQA';//提交详版测试数据


const GETCESHIREPORT=HOST+"/api/members/memberinfo/GetMemberAttr";//获得测试报告组图
const GETDETAILSTEST=HOST+"/api/members/CollocationQuestionnaire/GetCQA"// 获取详版测试
const GET_COLORANDSIZE=HOST+'/API/Products/Product/GetProductColorSize'//根据大款号获得对应的颜色和尺码
const GET_SELLER="GET_SELLER";
const SHOW_DETAIL="SHOW_DETAIL";
const HIDE_DETAIL="HIDE_DETAIL";
const GET_MYBOX='GET_MYBOX';//获得box单品数的type
const GET_VERIFICATIONCODE='GET_VERIFICATIONCODE' //获取验证码
const LOGIN_VALIDATE='LOGIN_VALIDATE';//校验登录

const CHANGESEX='CHANGESEX';  //更改性别
const DATATIME='DATATIME';//更改时间
const STORE='STORE';//更改店铺


const GETYUYUEOPTION=HOST+"/api/members/appointment/getOptions";//获得定制box、预约题目;

const MEMBERBOX = HOST+'/Api/Members/MemberBox/GetList';//获取我的box列表
const MEMBERBOXDELETE = HOST + '/Api/Members/MemberBox/Remove'//删除我的box中衣服

const GETBOXSHOPINGLIST=HOST+'/Api/Stores/CollocationPlan/GetList'//获得box方案
const GETUUID=HOST+"/Api/Members/MemberInfo/GetUUID"
const CHANGERECOMMEND=HOST+"/api/members/memberinfo/AddRecommend"//修改推荐人，只能一次

const GETORDERLIST=HOST+"/Api/Orders/Retail/GetList"  //获取订单列表 
const GETORDERLISTDETAILS=HOST+"/Api/Orders/Retail/GetRetailItemList"  //获取订单列表详情
const APPYAFTERSALE=HOST+"/Api/Stores/Aftermarket/Add"  //申请售后
const CANAPPLY=HOST+"/Api/Stores/Aftermarket/CanApply"  //能否申请售后
const GETTEMP=IMGHOST+"/Common/GetWebAppTemp"  //获取当前店铺的主题模板
const GetLatestStore = HOST + '/Api/Stores/Store/GetLatestStore'
export default {
	GETTEMP,
	CANAPPLY,
	APPYAFTERSALE,
	GETORDERLISTDETAILS,
	GETORDERLIST,
	CHANGERECOMMEND,
	GETUUID,
	HOME,
	IMGHOST,
	UPDATE_PASSWORD,
	ADJUSTADDRESS,
	GETADDRESS,
	GETCOUPON,
	SUBMITFEEDBACKS,
	GRTOPTIONS,
	GETPLANS,
	DELETEBOX,
	DELETEFAVOURITE,
	ADDMEMBERCOLLECTBOX,
	GETYUYUEOPTION,
	ADDBYPLAN,
	GETDETAILSTEST,
	COMMITSTYLEDETAILSTEST,
	COMMITSTYLETEST,
	GET_MUTIPLE_PRODUCT_INFO,
	STORE,
	DATATIME,
	UPDATEMEMBERINFO,
	GETMEMBERINFO,
	CHANGESEX,
	GET_COLORANDSIZE,
	GETMEMBERCOLLECTBOX,
	GETMEMBERCOLLECTSIGLE,
	GETMEMBERSCORE,
	SUBSCRIBE,
	GET_SELLER,
	SHOW_DETAIL,
	HIDE_DETAIL,
	GET_MYBOX,
    GET_VERIFICATIONCODE,
	HOST,
	PRODUCT_BOX_GETCOUNT,
	LOGIN_VALIDATE,
	PRODUCT_BOX_ADD,
	PRODUCT_COLLET_ADD,
	GETPRODUCT_DETEALS,
	GETPRODUCT_COLORLIST,
	GETPRODUCT_LISTBYNAME,
	GETPRODUCT_GETLIST,
	GETCESHIREPORT,
	MEMBERBOX,
	MEMBERBOXDELETE,
	GETBOXSHOPINGLIST,
	GetLatestStore
}