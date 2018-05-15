import Vue from 'vue'
import Router from 'vue-router'

//home index
import Index from '@/components/index'
//home page
import BoxMall from '@/components/home/homeBoxMall'
import SingleMall from '@/components/home/homeSingle'
import DiyBox from '@/components/home/homeDiyBox'
import HomeMine from '@/components/home/homeMine'
//风格测试
import Fenggeceshi from '@/components/home/fenggeceshi'

//绑定手机
import BindPhone from '@/components/home/bindphone'
//绑定归属店铺
import BindSotre from '@/components/home/bindStore'
//绑定归属店铺地图
import BindSotreMap from '@/components/childView/wxgetposition/index'

//2级页面 （方案，单品页面)，，，
import Project from '@/components/childView/project'
import Project2 from '@/components/childView/project2'
import SigleProduct from '@/components/childView/sigleProduct'
import Projectall from '@/components/childView/projectall'
import Yryk from '@/components/childView/yryk'
import MyReservation from '@/components/childView/myReservation'

//2级页面  我的(我的预约、我的钱包、我的收藏、我的订单,测试报告。。。。)
import Subscribe from "@/components/childView/subscribe"
import MineWallet from "@/components/childView/mineWallet"
import MineCollect from "@/components/childView/mineCollect"
import Activity from "@/components/childView/activity"
import CeshiReport from "@/components/childView/mineFenggeReport"
import Checkmatch from "@/components/childView/checkmatch"

//box定制答题
import BoxCustomized from "@/components/childView/boxCustomized"
import BoxSelectLike from "@/components/childView/boxSelectLike"

//我的BOX
import MyBoxList from "@/components/childView/myBoxList"
//box答题选择喜欢BOX
import SelectMyBoxList from "@/components/childView/selectMyBoxList"
import boxWriteNote from "@/components/childView/boxWriteNote"

//3级页面 预约详情
import Progress from "@/components/childView/progress"
import Evaluate from "@/components/childView/evaluate"
import Payment from "@/components/childView/payment"
import Topic from "@/components/childView/topic"

//3级页面（Box集合）
import ProjectDetatils from '@/components/childView/projectDetails'
import MineSet from '@/components/childView/mineSet'
import SingleChild from "@/components/childView/singleChild"

//3级页面  (性别、归属店铺、生日、修改密码,收货地址)
import MineSex from "@/components/childView/mineSex"
import Address from "@/components/childView/address"

//登录3个页面（登录，忘记密码，注册）
import Login from '@/components/login/login'
import Register from '@/components/login/register'
import ForgetPassword from '@/components/login/forgetpassword'
//我的订单
import Order from '@/components/childView/order'

import OrderDetails from '@/components/childView/orderDetails'

Vue.use(Router)

export default new Router({
	routes: [
		//订单
		{
			path: '/OrderDetails',
			name: 'OrderDetails',
			component: OrderDetails
		},
		//订单
		{
			path: '/Order',
			name: 'Order',
			component: Order
		},
		{
			path: '/BindSotreMap',
			name: 'BindSotreMap',
			component: BindSotreMap
		},
		//预约备注
		{
			path: '/boxWriteNote',
			name: 'boxWriteNote',
			component: boxWriteNote
		},
		//评价题目
		{
			path: '/Topic',
			name: 'Topic',
			component: Topic
		},
		//支付
		{
			path: '/Payment',
			name: 'Payment',
			component: Payment
		},
		//评价
		{
			path: '/Checkmatch',
			name: 'Checkmatch',
			component: Checkmatch
		},
		//评价
		{
			path: '/Evaluate',
			name: 'Evaluate',
			component: Evaluate
		},
		//预约方案
		{
			path: '/Progress',
			name: 'Progress',
			component: Progress
		},
		//bindphone
		{
			path: '/bindPhone',
			name: 'BindPhone',
			component: BindPhone
		},
		{
			path: '/bindSotre',
			name: 'BindSotre',
			component: BindSotre
		},
		//home index
		{
			path: '/',
			component: Index,
			meta: {
				keepAlive: false
			},
			children: [{
					path: '/',
					name: 'rojectall',
					redirect: '/projectall',
					component: Projectall,
					meta: {
						keepAlive: false
					}

				},
				{
					path: '/homeBoxMall',
					name: 'homeBoxMall',
					component: BoxMall,
					meta: {
						keepAlive: false
					}
				},
				{
					path: '/project',
					name: 'project',
					component: Project,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/projectall',
					name: 'projectall',
					component: Projectall,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/yryk',
					name: 'yryk',
					component: Yryk,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/myReservation',
					name: 'MyReservation',
					component: MyReservation,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/project2',
					name: 'project2',
					component: Project2,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/homeSingle',
					name: 'homeSingle',
					component: SingleMall,
					meta: {
						keepAlive: false
					}
				},
				{
					path: '/homeDiyBox',
					name: 'homeDiyBox',
					component: DiyBox,
					meta: {
						keepAlive: false,
					}
				},
				{
					path: '/homeMine',
					name: 'homeMine',
					component: HomeMine,
					meta: {
						keepAlive: false
					}
				},
				/*
				 *我的三级页面 (设置头像)
				 */
				{
					path: '/mineSet',
					name: 'mineSet',
					component: MineSet,
					meta: {
						keepAlive: false
					}
				},
				/*
				 * 收货地址
				 */
				{
					path: '/address',
					name: 'address',
					component: Address,
					meta: {
						keepAlive: false
					}
				}

			]
		},
		/*
		 * 登录，注册，忘记密码 
		 */
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				keepAlive: false
			}
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
			meta: {
				keepAlive: false
			}
		},
		{
			path: '/forgetpassword',
			name: 'forgetpassword',
			component: ForgetPassword,
			meta: {
				keepAlive: false
			}
		},
		/*
		 * 单品商城
		 */
		{
			path: '/sigleProduct',
			name: 'sigleProduct',
			component: SigleProduct,
			meta: {
				keepAlive: true
			}
		},
		/*
		 * 单品详情
		 */
		{
			path: '/singleChild',
			name: 'singleChild',
			component: SingleChild,
			meta: {
				keepAlive: false
			}
		},
		/*
		 *方案详情Box
		 * */
		{
			path: '/projectDetails',
			name: 'projectDetails',
			component: ProjectDetatils,
			meta: {
				keepAlive: true
			}
		},
		/*
		 *我的预约
		 * */
		{
			path: '/subscribe',
			name: 'subscribe',
			component: Subscribe,
			meta: {
				keepAlive: false
			}
		},
		/*
		 *我的钱包
		 * */
		{
			path: '/mineWallet',
			name: 'mineWallet',
			component: MineWallet,
			meta: {
				keepAlive: false
			}
		},
		/*
		 *我的收藏
		 * */
		{
			path: '/mineCollect',
			name: 'mineCollect',
			component: MineCollect,
			meta: {
				keepAlive: false
			}
		},
		/*
		 *优惠活动
		 * */
		{
			path: '/activity',
			name: 'activity',
			component: Activity,
			meta: {
				keepAlive: false
			}
		},
		/*
		 *修改性别
		 */
		{
			path: '/mineSex',
			name: 'mineSex',
			component: MineSex,
			meta: {
				keepAlive: false
			}
		},
		/*
		 * 测试报告
		 */
		{
			path: '/CeshiReport',
			name: 'CeshiReport',
			component: CeshiReport,
			meta: {
				keepAlive: false
			}
		},
		/*
		 * 风格测试
		 */
		{
			path: '/fenggeceshi',
			name: 'fenggeceshi',
			component: Fenggeceshi,
			meta: {
				keepAlive: false
			}
		},
		{
			path: '/boxCustomized',
			name: 'boxCustomized',
			component: BoxCustomized,
			meta: {
				keepAlive: false
			}
		},
		{
			path: '/myBoxList',
			name: 'myBoxList',
			component: MyBoxList,
			meta: {
				keepAlive: false
			}
		},
		{
			path: '/selectMyBoxList',
			name: 'selectMyBoxList',
			component: SelectMyBoxList,
			meta: {
				keepAlive: false
			}
		},
		{
			path: '/boxSelectLike',
			name: 'boxSelectLike',
			component: BoxSelectLike,
			meta: {
				keepAlive: false
			}
		},

	]
})