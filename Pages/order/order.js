var app = getApp()
Page({
  data: {

    primarySize: 'warn',
    warnSize: 'mini',
    disabled: false,
    plain: false,

    note: [
      {
        "url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575265730589&di=33dc0cde8171f59c43736ed6eab2b5d1&imgtype=0&src=http%3A%2F%2Fupload.ahwang.cn%2F2019%2F0525%2F1558775787135.jpg",
        "cinema": "中影星辰都尚影城>",
        "paytime": "支付剩余时间 13:27",
        "name": "攀登者",
        "count": "2张",
        "releasetime": "10月13日 12:05",
        "seat": "1号厅-4K1排07座,2排08座",
        "price": "总价：70元",
        "concel": "取消",
        "other1": "如果您有未展示的订单，可查看",
        "other2": "更早的订单>"
      }
    ]

  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

 
})