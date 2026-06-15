export default defineAppConfig({
  pages: [
    'pages/booking/index',
    'pages/handover/index',
    'pages/updates/index',
    'pages/messages/index',
    'pages/mine/index',
    'pages/expense/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '宠托托',
    navigationBarTextStyle: 'black',
    backgroundColor: '#fff8f5'
  },
  tabBar: {
    color: '#86909c',
    selectedColor: '#ff7a45',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/booking/index',
        text: '预约'
      },
      {
        pagePath: 'pages/handover/index',
        text: '交接单'
      },
      {
        pagePath: 'pages/updates/index',
        text: '在店动态'
      },
      {
        pagePath: 'pages/messages/index',
        text: '消息'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})
