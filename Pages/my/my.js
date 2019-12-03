// miniprogram/pages/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto:'../../images/IMG_3509.JPG',
    userName:'小小一水',
    userLevel:'普通用户',
    setting:'../images/设置.png',
    hasUserInfo:false,
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  

  getUserInfo: function (e) {
    console.log(e.detail)
    //console.log(e.detail.userInfo.userName)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      userName:e.detail.userInfo.nickName,
      userPhoto: e.detail.userInfo.avatarUrl
    })
   
    // 获取openid
    var that=this
    wx.request({
      url: 'http://47.106.13.104:3000/login',
      data: { 
        
        js_code: getApp().globalData.code ,
        appid: getApp().globalData.appid,
        secret: getApp().globalData.secret,
        grant_type: 'authorization_code'

          
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
         //console.log(res.data.data.user.openId)
          // that.globalData.openid = res.data
          wx.setStorageSync('openid', res.data.data.user.openId)
        } else {
          console.log(res.errMsg)
        }
      },
    })
   
  },
  toOrder:function(){
    wx.navigateTo({
      url:"../order/order"
    })
  }
  
})//page