import Mock from 'mockjs'

let list = []

export default {
  // mock请求的回调函数
  getHomeData: () => {
    list = []
    for (let i = 0; i < 7; i++) {
      list.push(
        Mock.mock({
          Vue: Mock.Random.integer(0, 100),
          React: Mock.Random.integer(0, 100),
          Angular: Mock.Random.integer(0, 100),
          SpringBoot: Mock.Random.integer(0, 100),
          HTML: Mock.Random.integer(0, 100),
          CSS: Mock.Random.integer(0, 100),
          JavaScript: Mock.Random.integer(0, 100)
        })
      )
    }
    return {
      code: 2000,
      data: {
        projectData: [
          {
            name: 'Vue',
            value: Mock.Random.integer(1, 100)
          },
          {
            name: 'React',
            value: Mock.Random.integer(1, 100)
          },
          {
            name: 'Angular',
            value: Mock.Random.integer(1, 100)
          },
          {
            name: 'SpringBoot',
            value: Mock.Random.integer(1, 100)
          }
        ],
        userData: {
          name: Mock.Random.name(),
          access: '管理员',
          avatar: require('../assets/imgs/avatar.png')
          // Mock.Random.image('100x100')
        },
        tableLabel: {
          date: '日期',
          name: '姓名',
          address: '地址'
        },
        tableData: [
          {
            date: Mock.Random.date(),
            name: Mock.Random.cname(),
            address: Mock.Random.county(true),
            tag: '家'
          },
          {
            date: Mock.Random.date(),
            name: Mock.Random.cname(),
            address: Mock.Random.county(true),
            tag: '公司'
          },
          {
            date: Mock.Random.date(),
            name: Mock.Random.cname(),
            address: Mock.Random.county(true),
            tag: '家'
          },
          {
            date: Mock.Random.date(),
            name: Mock.Random.cname(),
            address: Mock.Random.county(true),
            tag: '公司'
          },
          {
            date: Mock.Random.date(),
            name: Mock.Random.cname(),
            address: Mock.Random.county(true),
            tag: '公司'
          },
          {
            date: Mock.Random.date(),
            name: Mock.Random.cname(),
            address: Mock.Random.county(true),
            tag: '公司'
          },
          {
            date: Mock.Random.date(),
            name: Mock.Random.cname(),
            address: Mock.Random.county(true),
            tag: '公司'
          },
          {
            date: Mock.Random.date(),
            name: Mock.Random.cname(),
            address: Mock.Random.county(true),
            tag: '公司'
          },
          {
            date: Mock.Random.date(),
            name: Mock.Random.cname(),
            address: Mock.Random.county(true),
            tag: '公司'
          },
          {
            date: Mock.Random.date(),
            name: Mock.Random.cname(),
            address: Mock.Random.county(true),
            tag: '公司'
          },
          {
            date: Mock.Random.date(),
            name: Mock.Random.cname(),
            address: Mock.Random.county(true),
            tag: '公司'
          },
          {
            date: Mock.Random.date(),
            name: Mock.Random.cname(),
            address: Mock.Random.county(true),
            tag: '公司'
          },
          {
            date: Mock.Random.date(),
            name: Mock.Random.cname(),
            address: Mock.Random.county(true),
            tag: '公司'
          }
        ],
        orderData: {
          date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
          data: list
        },
        projectStatus: [
          {
            type: '今日订单总量',
            value: '12',
            icon: 's-order',
            color: '#409EFF'
          },
          {
            type: '今日订单完成总量',
            value: '12',
            icon: 'success',
            color: '#67C23A'
          },
          {
            type: '今日订单未完成总量',
            value: '0',
            icon: 'warning',
            color: '#E6A23C'
          },
          {
            type: '本月订单总量',
            value: '44',
            icon: 's-order',
            color: '#409EFF'
          },
          {
            type: '本月订单完成总量',
            value: '34',
            icon: 'success',
            color: '#67C23A'
          },
          {
            type: '本月订单未完成总量',
            value: '5',
            icon: 'warning',
            color: '#E6A23C'
          }
        ],
        userHistoryData: [
          {
            date: '周一',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(1, 100)
          },
          {
            date: '周二',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(1, 100)
          },
          {
            date: '周三',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(1, 100)
          },
          {
            date: '周四',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(1, 100)
          },
          {
            date: '周五',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(1, 100)
          },
          {
            date: '周六',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(1, 100)
          },
          {
            date: '周日',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(1, 100)
          }
        ]
      }
    }
  }
}
