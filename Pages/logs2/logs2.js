Page({
  data: {
    quantity1: {
      quantity: 1,
      min: 1,
      max: 20,
      delStatus: 'disabled',
      addStatus: 'normal'
    },
    showDialog: false,
    isLike: true,
    // banner
    imgUrls: [
      'http://img1.imgtn.bdimg.com/it/u=4159727068,3998475379&fm=26&gp=0.jpg',
      'http://img005.hc360.cn/y5/M00/F7/5D/wKhQUVXWyY-EQd9jAAAAANSaS4E556.jpg',
      'http://img1.lukou.com/static/p/blog/medium/0007/26/96/66/7269666.jpg'
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 2000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    currentTab: 0,//记录当前位置

    // 商品详情介绍
    detailImg: [
      "http://img1.imgtn.bdimg.com/it/u=4159727068,3998475379&fm=26&gp=0.jpg",
    "http://brup.shengri.cn/goods/2016/07/19154126_ed8386e0e87dd7f4a5bd07be3fa64ddd.jpg",
      "http://s.7k7kimg.cn/kba/kbaupload/20131015/1381834855520000000000000000000000000000000000000.jpg",
      "http://img005.hc360.cn/y5/M00/F7/5D/wKhQUVXWyY-EQd9jAAAAANSaS4E556.jpg",
      "http://img1.lukou.com/static/p/blog/medium/0007/26/96/66/7269666.jpg",
      "http://image2.suning.cn/uimg/b2c/newcatentries/0070173397-000000000728108937_4_800x800.jpg",
    ],
  },

  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.detailImg // 需要预览的图片http链接列表  
    })
  },

  //sku弹出
  toggleDialog: function () {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },

  //sku 关闭 
  closeDialog: function () {
    console.info("关闭");
    this.setData({
      showDialog: false
    });
  },

  //减数 
  delCount: function (e) {
    console.log("刚刚您点击了减一");
    var count = this.data.quantity1.quantity;
    // 商品总数量-1
    if (count > 1) {
      count -= 1;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var delStatus = count <= 1 ? 'disabled' : 'normal';
    // 只有大于10件的时候，才能normal状态，否则disable状态  
    var addStatus = count >= 10 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      quantity1: {
        quantity: count,
        delStatus: delStatus,
        addStatus: addStatus
      }
    });
  },

  //加数 
  addCount: function (e) {
    console.log("刚刚您点击了加一");
    var count = this.data.quantity1.quantity;
    // 商品总数量-1  
    if (count < 10) {
      count += 1;
    }

    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var delStatus = count <= 1 ? 'disabled' : 'normal';
    // 只有大于10件的时候，才能normal状态，否则disable状态  
    var addStatus = count >= 10 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      quantity1: {
        quantity: count,
        delStatus: delStatus,
        addStatus: addStatus
      }
    });
  },

  // 输入框事件 
  bindManual: function (e) {
    var count = this.data.quantity1.quantity;
    // 将数值与状态写回  
    this.setData({
      count: count
    });
  },
  
  //加入购物车
  addCar: function (e) {
    console.log(e.target.dataset.goodid);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    });
    console.info("关闭");
    this.setData({
      showDialog: false
    });
  },

  // 跳到购物车
  toCar() {
    wx.navigateTo({
      url: '../cart/cart'
    })
  },

  // 收藏
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
  },

  // 立即购买
  immeBuy() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });
  },

})