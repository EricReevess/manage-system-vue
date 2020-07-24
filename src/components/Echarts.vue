<template>
  <div class="echart-warp" ref="echart">
  </div>
</template>

<script>
import echarts from 'echarts'
import '../assets/echart-style/macarons'

export default {
  name: 'Echarts',
  props: {
    chartData: {
      type: Object,
      default () {
        return {
          xAxisData: [],
          seriesData: []
        }
      }
    },
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      echartObj: null,
      // 为坐标轴图表准备的选项
      axisOption: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: []
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: []
      },
      // 为饼状图表准备的选项
      pieOption: {
        title: {
          text: '项目类型',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: []
        },
        series: [
          {
            name: '项目类型',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  computed: {
    // 判断使用的是什么类型的图表
    options () {
      return this.isAxisChart ? this.axisOption : this.pieOption
    }
  },
  watch: {
    chartData: {
      handler: function () {
        this.initEchart()
      },
      deep: true
    }
  },
  methods: {
    // 初始化echartObj 对象
    initEchart () {
      this.initEchartData() // 初始化图表数据
      if (this.echartObj) { // 如果不为null
        this.echartObj.setOption(this.options)
      } else {
        this.echartObj = echarts.init(this.$refs.echart, 'macarons')
        this.echartObj.setOption(this.options)
      }
    },
    initEchartData () {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xAxisData
        this.axisOption.series = this.chartData.seriesData
        this.axisOption.legend.data = this.chartData.seriesData.map(item => item.name)
      } else {
        this.pieOption.series[0].data = this.chartData.seriesData
        this.pieOption.legend.data = this.chartData.seriesData.map(item => item.name)
      }
    },
    chartResize () {
      this.echartObj.resize()
    }
  },
  mounted () {
    window.$collapseMenuBtn.$on('click', () => {
      setTimeout(() => {
        this.chartResize()
      }, 300)
    })

    window.addEventListener('resize', () => {
      this.chartResize()
    })
  }
}
</script>

<style lang="scss" scoped>
  .echart-warp {
    width: 100%;
    height: 100%;
  }
</style>
