// miniprogram/pages/chooseTime/chooseTime.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date : ["10月12日","10月13日"],
    data : [[{time:"19:42",room:"1号厅",price:"43元",type:"国语2D"},
    {time:"19:42",room:"1号厅",price:"43元",type:"英语4D"},
    {time:"19:42",room:"1号厅",price:"43元",type:"德语2D"},
    {time:"19:42",room:"1号厅",price:"43元",type:"国语2D"},
    {time:"19:42",room:"1号厅",price:"43元",type:"国语2D"}],
    [{time:"12:42",room:"1号厅",price:"43元",type:"国语2D"},
    {time:"12:42",room:"1号厅",price:"43元",type:"英语4D"},
    {time:"12:42",room:"1号厅",price:"43元",type:"德语2D"},
    {time:"12:42",room:"1号厅",price:"43元",type:"国语2D"},
    {time:"12:42",room:"1号厅",price:"43元",type:"国语2D"}]],
    time : [],
    ind : 0
  },

  chooseDate: function (event) {
    let times = this.data.times
    console.log(event.currentTarget.dataset.id)
    console.log(times[event.currentTarget.dataset.id])
    this.setData({
      time : times[0].timesToday,
      ind : event.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = this.data.data
    this.setData({
      time:data[0]
    })

    let that = this

    wx.request({
      url: 'http://47.106.13.104:3000/movies?movieId=' + "00001",
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data.data.movie)
        that.setData({
          movie: res.data.data.movie
        })
      }
    })

    wx.request({
      url: 'http://47.106.13.104:3000/times?movieId=' + "00001",
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data.data.times)
        let time = res.data.data.times[0].timesToday
        that.setData({
          times: res.data.data.times,
          time: time
        })

        console.log(time)
      }
    })
  },
toChooseSeat:function(){
  wx.navigateTo({
    url: '../../Pages/select_seat/select_seat',
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})