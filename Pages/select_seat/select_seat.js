// pages/select_seat/select_seat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieId: "",
    movieName:"",
    timeId: "",
    playType:"",
    planDetail:"",
    price: 0,
    seatIds: [[]],
    totalPrice: 0,
    seatList:[],
    seatId:[],
    userId:"",
    seatTypeList: [
      {
        "name": "可选",
        "type": "0",
        "seats": 1,
        "icon": "https://i.postimg.cc/BbbWyY5D/image.png",
        "isShow": "1",
        "position": "up"
      },
      {
        "name": "不可选",
        "type": "1",
        "seats": 1,
        "icon": "https://i.postimg.cc/LXywzkds/image.png",
        "isShow": "1",
        "position": "up"
      }  ,  {
        "name": "已选",
        "type": "0-1",
        "seats": 1,
        "icon": "https://i.postimg.cc/1X2dd93h/image.png",
        "isShow": "1",
        "position": "up"
      },
    ],
    hallName: "",
    seatStatus: [[]],
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      timeId: "00001", // "00001" 为测试数据，使用请改为options.timeId,
      movieId: "00001", // "00001" 为测试数据，使用请改为options.movieId,
    });

    //获取openid作为userid
    wx.login({
      success: res => {
        console.log(res);	//用户登录凭证 
        // 发送 res.code 到后台换取 openId, sessionKey
        var code = res.code;
        var appid = 'xxxx';	//小程序的appid
        var secret = 'xxxx';	//小程序的secret
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + code,
          header: { 'content-type': 'application/json' },
          success: function (res) {
            console.log(res);	// 返回的数据
            console.log(res.data.openid);	// openid
            that.setData({
              userId: res.data.openid
            });
          }
        })
      }
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
    let that = this;
    //---在此替换成api接口请求成功后--start--

    wx.request({
      url: 'http://47.106.13.104:3000/movies',
      data: {
        movieId: that.data.movieId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data)
        var result = res.data
        if (result.error_code == 0) {
          that.setData({
            movieName: result.data.movie.MovieName,
            playType: result.data.movie.PlayType,
          });
        }
      }
    })

    wx.request({
      url: 'http://47.106.13.104:3000/times',
      data: {
        movieId: that.data.movieId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data)
        let result = res.data
        if (result.error_code == 0) {
          that.setData({
            times: result.data.times,
          });
          let times = that.data.times
          let timeId = that.data.timeId
          for (var index in times) {
            for (var index1 in times[index].timesToday) {
              if (times[index].timesToday[index1].timeId === timeId) {
                that.setData({
                  planDetail: times[index].date + " " + times[index].timesToday[index1].startTime,
                  hallName: times[index].timesToday[index1].hallName,
                  price: times[index].timesToday[index1].price,
                });
                //console.log(that.data.price)
                wx.request({
                  url: 'http://47.106.13.104:3000/seatStatus',
                  data: {
                    timeId: that.data.timeId
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success: function (res) {
                    //console.log(res.data)
                    let result = res.data
                    if (result.error_code == 0) {
                      that.setData({
                        seatStatus: result.data.seatStatus,
                        seatIds: result.data.seatIds,
                      });
                      //console.log(that.data.seatStatus)
                      //console.log(that.data.seatIds)
                      let seatStatus = that.data.seatStatus
                      let seatIds = that.data.seatIds
                      let price = that.data.price;
                      var seatList = that.data.seatList
                      //console.log('seatList:')
                      //console.log(that.data.seatList)
                      // var seatList = [1,2,3,4]
                      // var l = seatList.length
                      // console.log('长度：')
                      // console.log(l)
                      for (var index in seatStatus) {
                        for (var index1 in seatStatus[index]) {
                          var slength = seatList.length
                          seatList[slength + 0] = {};
                          seatList[slength + 0].row = Number(index) + Number(1);
                          seatList[slength + 0].col = Number(index1) + Number(1);
                          seatList[slength + 0].type = seatStatus[index][index1] + "";
                          seatList[slength + 0].price = price + "";
                          seatList[slength + 0].id = seatIds[index][index1];
                          if (seatList[slength + 0].type == "0") {seatList[slength + 0].icon = "https://i.postimg.cc/BbbWyY5D/image.png"; }
                          if (seatList[slength + 0].type == "1") {seatList[slength + 0].icon = "https://i.postimg.cc/LXywzkds/image.png"; }
                          if (seatList[slength + 0].type == " ") {seatList[slength + 0].icon = ""; }

                        }
                      }
                      that.setData({
                        seatList: seatList,
                      });
                      //console.log(seatList)
                      
                    }
                  }
                })

              }
            }
          }
        }
      }
    })

  },

  // 点击每个座位触发的函数
  clickSeat: function (event) {
   
    //console.log("event:"+event)
    let index = event.currentTarget.dataset.seatindex;
    let seatList = this.data.seatList;
    let seatId = this.data.seatId;
    let totalPrice = this.data.totalPrice;
    console.log(index)
    console.log(seatList[index].icon)
    if (seatList[index].icon == "https://i.postimg.cc/BbbWyY5D/image.png"){
      seatList[index].icon = "https://i.postimg.cc/1X2dd93h/image.png"
      totalPrice = Number(totalPrice) + Number(seatList[index].price)
      seatId.push(seatList[index].id)
    }
    else if (seatList[index].icon == "https://i.postimg.cc/1X2dd93h/image.png") {
      seatList[index].icon = "https://i.postimg.cc/BbbWyY5D/image.png"
      totalPrice = Number(totalPrice) - Number(seatList[index].price)
      for(var index1 in seatId){
        if (seatId[index1] == seatList[index].id){
          seatId.splice(index1,1)
        }
      }
    }
    console.log(seatList[index].icon)
    this.setData({
      seatList: seatList, //这里的设置 是让定义的变量等于你写的变量
      totalPrice: totalPrice,
      seatId: seatId
    })
    console.log(seatId)
  },

//提交订单
  confirmHandle: function () {
    let totalPrice = this.data.totalPrice;
    let seatId = this.data.seatId;
    let timeId = this.data.timeId;
    let userId = this.data.userId;
    if (totalPrice == 0){
      wx.showToast({
        title: '请至少选择一个座位~',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (totalPrice != 0) {
      wx.showModal({
        title: '提示',
        content: "确认要支付" + totalPrice + "元吗?",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: "http://47.106.13.104:3000/order",
              method: "POST",
              data: {
                timeId: timeId,
                seatId: seatId,
                userId: userId
              },
              header: {
                "Content-Type": "application/json"
              },
              success: function (res) {
                //console.log(res.data.error_code);
                if (res.statusCode == 200) {
                  //访问正常
                  if (res.data.error_code == "0") {
                    wx.showToast({
                      title: "支付成功！",
                      icon: 'success',
                      duration: 3000,
                      success: function () {
                        wx.navigateTo({
                          url: '../select_seat/select_seat'  //支付成功后前往的下一个页面
                        })
                      }
                    })
                  }
                } else {
                  wx.showLoading({
                    title: '支付失败！',
                    fail
                  })
                  setTimeout(function () {
                    wx.hideLoading()
                  }, 2000)
                }
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
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