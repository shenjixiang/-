var app = getApp()
Page({
  data: {
    imgUrls:  [
      'http://img5.imgtn.bdimg.com/it/u=3849458585,2029621276&fm=26&gp=0.jpg',      'http://f.hiphotos.baidu.com/zhidao/pic/item/ca1349540923dd54c34a9f71d109b3de9c8248e9.jpg',
      'http://res.hpoi.net.cn/gk/pic/s/2015/12/5e2d497e909447febd1e1e94390caa37.jpg'
    ],

    indicatorDots: true,//是否显示指示点
    vertical: false,//滑块方向是否为纵向
    autoplay: true,
    interval: 2000,//自动切换时间间隔
    duration: 500,//滑块滑动时长
    
    isLike: true,
    navbar: ['推荐', '商品', '美图', '情报'],

    imgWidth: 0,
    imgHeight: 0,
    currentTab: 0,

    note:[{
      "url":"https://t8.baidu.com/it/u=550829899,3283600291&fm=199&app=68&f=JPEG?w=550&h=550&s=27C29D4F4A3893DC04E0F0320300D042",
      "title": "Aniplex+Fate/Grand Order贞德 英灵正装",
      "lable1":"预售",
      "lable2":"新品",
      "price":"￥200",
      "numpeople":"3786人想要"
    },
    {
      "url": "https://img14.360buyimg.com/n0/jfs/t1/61288/5/15782/208797/5dd23a34E0874f8c4/4867583d0fe959f3.jpg",
      "title":"疾风传火影忍者手办 漩涡鸣人",
      "lable1": "预售",
      "lable2": "新品",
      "price": "￥200",
      "numpeople": "3786人想要"
    },
    {
      "url": "https://img14.360buyimg.com/n0/jfs/t1/67973/31/4829/138688/5d2e761bE56cf1546/ee74d8c7f88aeeda.jpg",
      "title":"复仇者联盟4合金属蜘蛛侠钢铁侠",
      "lable1": "预售",
      "lable2": "新品",
      "price": "￥200",
      "numpeople": "3786人想要"
    },
    {
      "url": "https://t9.baidu.com/it/u=801662363,307070602&fm=199&app=68&f=JPEG?w=400&h=400&s=4A90EC09510042E44E7830D2030080B0",
      "title":"圣女达尔克 Ruler figma 366 贞德可动手办摆件",
      "lable1": "预售",
      "lable2": "新品",
      "price": "￥200",
      "numpeople": "3786人想要"
    },
     {
       "url": "https://img14.360buyimg.com/n0/jfs/t1/27225/6/8614/80118/5c7844caE031c0c16/5982d69397217307.jpg",
       "title":"至高之拳盲僧手办摆件模型 19cm ",
       "lable1": "预售",
       "lable2": "抱团购",
       "price": "￥200",
       "numpeople": "3786人想要"
    },
     {
       "url": "https://img14.360buyimg.com/n0/jfs/t1/42581/18/15932/76040/5d8b2d6aE5fbaf784/ed0265e9c1a2d0ca.jpg",
       "title":"七龙珠手办模型Z黑发孙悟空20周年剧场版盒装机箱摆件 ",
       "lable1": "预售",
       "lable2": "新品",
       "price": "￥200",
       "numpeople": "3786人想要"
    },
     {
       "url": "https://img14.360buyimg.com/n0/jfs/t1/56749/24/13897/154523/5da7d105Ef710885d/fb576893dcf19a84.jpg",
       "title": "手办动漫女摆件 约会大作战Ⅱ反转ver1/7鸢一折纸",
       "lable1": "预售",
       "lable2": "新品",
       "price": "￥200",
       "numpeople": "3786人想要"
    },
     {
       "url": "https://img14.360buyimg.com/n0/jfs/t1/74842/33/8950/43435/5d6d1a74E16ccadbd/aa344adfb91f8c0c.jpg",
       "title":"国产 wave 夜明前的琉璃色手办 菲娜法姆阿修莱特手办模型 实拍 现货 ",
       "lable1": "预售",
       "lable2": "新品",
       "price": "￥200",
       "numpeople": "3786人想要"
    },
    {
        "url": "https://img30.360buyimg.com/n2/jfs/t1/37121/30/11428/205474/5d18767fEea5fc754/386deb66f422caba.jpg",
        "title": "巨炮黑岩(26厘米) ",
        "lable1": "预售",
        "lable2": "新品",
        "price": "￥200",
        "numpeople": "3786人想要"
    },
    {
      "url": "https://img30.360buyimg.com/n7/jfs/t1/71142/1/359/88224/5ce8de9cEe8beeac5/3fb3ba12059f52c5.jpg",
      "title": "国产优质版缘之空春日野穹行李箱手办【18cm】 ",
        "lable1": "预售",
        "lable2": "新品",
        "price": "￥200",
        "numpeople": "3786人想要"
    },
    {
      "url": "https://img30.360buyimg.com/n7/jfs/t1/72398/1/14041/69967/5db2e519Ecdb60def/476fb461a3c90f06.jpg",
      "title": "天使的跳心手办",
        "lable1": "预售",
        "lable2": "新品",
        "price": "￥200",
        "numpeople": "3786人想要"
    }
    ]
  },

  // 导航切换监听
  navbarTap: function (e) {
    console.debug(e);
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  }

})