// description.js
var postlist = require("../../../data/data-zhuye.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 接收来自url的id
    var postid = options.id;
    // 根据数组的下标(postid)传递数据
    var postData = postlist.des[postid];
    this.setData({
      desIn: postData,
      id: postid
    });
    // 获取页面缓存
    var caches = wx.getStorageSync("key");
    if (caches) {
      // 根据id获取每个页面的缓存值
      var cache = caches[postid];
      this.setData({
        cache: cache
      })
    } else {
      // 初始化缓存，每个页面的缓存
      var caches = {};
      caches[postid] = false;
      wx.setStorageSync("key", caches);
    }
  },
  onshareTap: function (event) {
    var itemList = ["分享到QQ", "分享到微信", "分享到微博"];
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        if (res.tapIndex != undefined) {
          wx.showModal({
            title: '用户分享到' + itemList[res.tapIndex],
            content: '是否取消?该程序暂时不支持分享' + itemList[res.tapIndex],
            success: function (res) {
              if (res.confirm) {
                wx.showToast({
                  title: '分享成功',
                });
              } else if (res.cancel) {
                wx.showToast({
                  title: '取消分享',
                });
              }
            }
          });
        } else {
          wx.showToast({
            title: '取消分享',
          });
        }
      }
    });
  },
  collection: function (event) {
    // 获取页面缓存值
    var caches = wx.getStorageSync("key");
    var cache = caches[this.data.id];
    // 收藏未收藏转换
    cache = !cache;
    // 更新缓存
    caches[this.data.id] = cache;
    wx.setStorageSync("key", caches);
    // 更新页面数据
    this.setData({
      cache: cache
    });
    wx.showToast({
      title: cache ? "收藏成功" : "取消成功",
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