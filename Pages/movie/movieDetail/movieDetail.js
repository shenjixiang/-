// pages/movie/movieDetail/movieDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieId: "",
    film: { name: "海贼王", star: "5", type: "动漫", area: "日本", time: "120", start_time: "2019/10/20", pic: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4236342036,891882353&fm=26&gp=0.jpg", details:"传说中的黄金大盗乌南，带着大批黄金隐居到某座岛屿，之后生死不明，向着伟大航道持续前进的的路飞一行人，遇到了梦想成为乌南的部下的少年托比欧，他因为不愿继承爷爷经营的关东煮摊，和爷爷闹的很不愉快，而爱黄金成痴的海贼艾拉德哥也正窥视著乌南埋藏的黄金……" },
    actors: [{ name: "路飞", actor: "路飞", pic: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1881762398,2417041772&fm=26&gp=0.jpg" }, { name: "乔巴", actor: "乔巴", pic: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2324422754,1966391812&fm=26&gp=0.jpg" }, { name: "索隆", actor: "索隆", pic: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2412063268,3418934192&fm=26&gp=0.jpg" }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movieId: options.id
    })
    console.log(this.data.movieId)
    var that = this;
    wx.request({
      url: 'http://47.106.13.104:3000/movies?movieId='+that.data.movieId,
      //定义传到后台的数据
      method: 'get',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("调用MOVIE_API成功");
        if (res.data.error_code == 0) {
          wx.showToast({
            title: '成功',
          })
          console.log(res.data.data.movie);
          var i = 0;
          var myswipers = new Array()
          for (var sw in res.data.data.movie) {
        
            //var id = 'film[' + i + ']._id'
            var type = 'film.type'
            var name = 'film.film_name'
            var lead_names = 'film.lead_names'
            var pic = 'film.pic'
            var star = 'film.star'
            var area = 'film.area'
            var start_time = 'film.start_time'
            var details = 'film.details'
            that.setData({
              [type]: res.data.data.movie.PlayType,
              [name]: res.data.data.movie.MovieName,
              [lead_names]: res.data.data.movie.Stars,
              [pic]: res.data.data.movie.MovieImgUrl,
              [star]: res.data.data.movie.Score,
              [area]: res.data.data.movie.SourceArea,
              [start_time]: res.data.data.movie.ReleaseDate,
              [details]: res.data.data.movie.Details,
              //[start_time]: res.data.data.movie[i].releaseDate,
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