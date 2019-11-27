//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    two: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    lunbo: ["http://img0.imgtn.bdimg.com/it/u=2086423499,4205961149&fm=11&gp=0.jpg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559240042649&di=143c778404fc340e390c188a22446a32&imgtype=0&src=http%3A%2F%2Fzhejiang.eol.cn%2Fzhejiang_gkkx%2F201503%2FW020150318313773570683.jpg",
  "http://p1.wowodx.com/wow_article_img/hangdiandianziqingxie/png/7ce4a446-2fd2-4667-9e61-be5f5dfafa2a.png",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559240697420&di=0a863842277f4417a33f5c132577d584&imgtype=0&src=http%3A%2F%2Fwww.photo1990.com%2Fphotos%2Fbig_6fadfc90-df7a-4758-9423-3049ec7e9a48.jpg"],
    filmDetails: [
      { _id: "0", cid: "7", film_name: "海贼王剧场版", lead_names: "路飞", pic: "http://img3.imgtn.bdimg.com/it/u=371486659,1962901694&fm=26&gp=0.jpg", star: 4.5, star_people: 20 }],
    filmShowing: [],
    filmComing: []
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://47.106.13.104:3000/swipers',
      //定义传到后台的数据
      method: 'get',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("调用API成功");
        console.log(res.data.message);
        if (res.data.error_code == 0) {
          wx.showToast({
            title: '成功',
          })
          console.log(res.data.data.swipers);
          var i = 0;
          var myswipers = new Array()
          for (var sw in res.data.data.swipers){
            var img_url = res.data.data.swipers[sw].swiperImgUrl
            myswipers[i] = img_url
            var price = 'lunbo[' + i + ']'
            that.setData({
              [price]: img_url
            })
            i++
          }
          
         
          
        }
        else {
          wx.showModal({
            title: '提示',
            content: '用户名或者密码错误',
            showCancel: false
          })
        }
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    })
    wx.request({
      url: 'http://47.106.13.104:3000/movies/showing',
      //定义传到后台的数据
      method: 'get',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("调用API成功");
        if (res.data.error_code == 0) {
          wx.showToast({
            title: '成功',
          })
          console.log(res.data.data.showingMovies);
          var i = 0;
          var myswipers = new Array()
          for (var sw in res.data.data.showingMovies) {
            //var img_url = res.data.data.showingMovies[sw]
            var id = 'filmDetails[' + i + ']._id'
            var type = 'filmDetails[' + i + '].cid'
            var name = 'filmDetails[' + i + '].film_name'
            var lead_names = 'filmDetails[' + i + '].lead_names'
            var pic = 'filmDetails[' + i + '].pic'
            var star = 'filmDetails[' + i + '].star'
            var price = 'lunbo[' + i + ']'
            that.setData({
              [id]: res.data.data.showingMovies[i].movieId,
              [type]: res.data.data.showingMovies[i].playType,
              [name]: res.data.data.showingMovies[i].movieName,
              [lead_names]: res.data.data.showingMovies[i].stars,
              [pic]: res.data.data.showingMovies[i].movieImgUrl,
              [star]: res.data.data.showingMovies[i].score,
            })
            i++
          }
          that.setData({
            filmShowing: that.data.filmDetails
          })


        }
        else {
          wx.showModal({
            title: '提示',
            content: '用户名或者密码错误',
            showCancel: false
          })
        }
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    })
    wx.request({
      url: 'http://47.106.13.104:3000/movies/coming',
      //定义传到后台的数据
      method: 'get',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("调用API成功");
        if (res.data.error_code == 0) {
          wx.showToast({
            title: '成功',
          })
          console.log(res.data.data.comingMovies);
          var i = 0;
          var myswipers = new Array()
          for (var sw in res.data.data.comingMovies) {
            //var img_url = res.data.data.showingMovies[sw]
            var id = 'filmComing[' + i + ']._id'
            var type = 'filmComing[' + i + '].cid'
            var name = 'filmComing[' + i + '].film_name'
            var lead_names = 'filmComing[' + i + '].lead_names'
            var pic = 'filmComing[' + i + '].pic'
            var star = 'filmComing[' + i + '].star'
            //var price = 'filmComing[' + i + ']'
            that.setData({
              [id]: res.data.data.comingMovies[i].movieId,
              [type]: res.data.data.comingMovies[i].playType,
              [name]: res.data.data.comingMovies[i].movieName,
              [lead_names]: res.data.data.comingMovies[i].stars,
              [pic]: res.data.data.comingMovies[i].movieImgUrl,
              [star]: res.data.data.comingMovies[i].score,
            })
            i++
          }


        }
        else {
          wx.showModal({
            title: '提示',
            content: '用户名或者密码错误',
            showCancel: false
          })
        }
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getSwipers: function (e) {
    var app = getApp();

  },
  toBuy:function(){
    wx.navigateTo({
      url: '../chooseTime/chooseTime'　　
    })
  },
  toOne: function () {
    this.setData({ 
      two: true,
      filmDetails: this.data.filmShowing
    })
    this.onLoad
  },

  toTwo: function () {
    this.setData({ 
      two: false,
      filmDetails: this.data.filmComing

    })
  },
})
