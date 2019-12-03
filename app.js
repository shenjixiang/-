//app.js
App({
  onLaunch: function () {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
        if (res.code) {
         this.globalData.code=res.code

        }
      }
    })//logine
 
  },
  globalData: {
    code:'',
    userInfo: null,
    appid: 'wx24e286d51a295d9a',
    secret: '3aa359f7a83d11b523d21e4509866f56'
  }
})