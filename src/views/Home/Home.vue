<template>
  <el-row :gutter="10" class="home-wrap">
    <el-col :span="7" class="home-left flex-column">
      <el-card class="box-card info" shadow="hover">
        <div class="user">
          <el-avatar :size="80" :src="userData.avatar"/>
          <div class="user-info flex-column">
            <p class="name">{{userData.name}}</p>
            <p class="access">{{userData.access}}</p>
          </div>
        </div>
        <div class="login-info flex-column">
          <p class="last-login-time">
            上次登录时间：
            <span>{{20202}}</span>
          </p>
          <p class="last-login-location">
            上次登录 I P ：
            <span>{{11111111}}</span>
          </p>
        </div>
      </el-card>
      <!--表格-->
      <el-card class="box-card table" shadow="hover">
        <el-table
          width="100%"
          height="100%"
          :data="tableData"
          size="medium"
          show-overflow-tooltip
          stripe>
          <el-table-column
            v-for="(val,key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
            :sortable="key === 'date' "
            :filters="tableFiltersData(key) "
            :filter-method="filterHandler"
            :width="key === 'name'? 70: key === 'date' ? 110: 'auto'"
          >
          </el-table-column>
          <!--<el-table-column
            prop="tag"
            label="标签"
            width="70"
            :filters="tableFiltersData('tag')"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.tag === '家' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.tag}}
              </el-tag>
            </template>
          </el-table-column>-->
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="17" class="home-right flex-column">
      <div class="project-status">
        <el-card
          v-for="(item,index) in projectStatus"
          :key="index"
          shadow="hover"
          class="box-card project-item">
          <i
            :class="`el-icon-${item.icon}`"
            :style="`background-color: ${item.color};`"/>
          <div class="item-detail flex-column">
            <p class="number">{{item.value}} 个</p>
            <p class="text">{{item.type}}</p>
          </div>
        </el-card>
        <!--<el-card
          v-for="item in projectStatus"
          :key="item.value"
          shadow="hover"
          class="box-card project-item">
          <el-progress :width="50" type="circle" :percentage="60" status="warning"/>
          <div class="item-detail flex-column">
            <p class="number">{{item.value}} 个</p>
            <p class="text">{{item.type}}</p>
          </div>
        </el-card>-->
      </div>
      <div class="chart1">
        <el-card class="box-card" shadow="hover">
          <echarts :chartData="chartData.order"/>
        </el-card>
      </div>
      <div class="chart2">
        <el-card class="box-card" shadow="hover">
          <echarts :chartData="chartData.user"/>
        </el-card>
        <el-card class="box-card" shadow="hover">
          <echarts :chartData="chartData.project" :is-axis-chart="false"/>
        </el-card>
      </div>

    </el-col>
  </el-row>
</template>

<script>
import Echarts from '../../components/Echarts'

export default {
  name: 'Home',
  components: { Echarts },
  data () {
    return {
      canOperate: false,
      userData: {},
      projectStatus: [],
      tableLabel: {},
      tableData: [],
      chartData: {
        order: {
          xAxisData: [],
          seriesData: []
        },
        user: {
          xAxisData: [],
          seriesData: []
        },
        project: {
          seriesData: []
        }
      }
    }
  },
  computed: {},
  created () {
    this.getHomeData()
  },
  methods: {
    getHomeData () {
      this.$httpRequest.get('/home/getHomeData').then(
        res => {
          const { data: homeData } = res.data
          console.log(homeData)
          this.userData = homeData.userData
          this.tableData = homeData.tableData
          this.tableLabel = homeData.tableLabel
          this.projectStatus = homeData.projectStatus
          this.chartData.project.seriesData = homeData.projectData
          this.chartData.order.xAxisData = homeData.orderData.date
          this.formatOrderSeries(homeData.orderData.data, this.chartData.order.seriesData)
          this.formatUserSeries(homeData.userHistoryData, this.chartData.user, 'bar')
        },
        err => {
          console.log(err)
        }
      )
    },
    // 对订单信息原始数据进行处理
    formatOrderSeries (originalData, targetData, type = 'line') {
      const keyArray = Object.keys(originalData[0])
      keyArray.forEach(key => {
        targetData.push({
          name: key,
          type: type,
          data: originalData.map(item => item[key])
        })
      })
    },
    formatUserSeries (originalData, targetData, type = 'line') {
      targetData.xAxisData = originalData.map(item => item.date)
      targetData.seriesData.push({
        name: '新增用户',
        type: type,
        data: originalData.map(item => item.new)
      })
      targetData.seriesData.push({
        name: '活跃用户',
        type: type,
        data: originalData.map(item => item.active)
      })
    },
    tableFiltersData: function (key) {
      const res = new Map()
      const tags = this.tableData.map(item => ({ text: item[key], value: item[key] }))
      return tags.filter(item => !res.has(item.value) && res.set(item.value, 1))
    },
    resetDateFilter () {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter () {
      this.$refs.filterTable.clearFilter()
    },
    formatter (row, column) {
      return row.address
    },
    filterTag (value, row) {
      return row.tag === value
    },
    filterHandler (value, row, column) {
      const property = column.property
      return row[property] === value
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  @import './src/assets/scss/home';
</style>
