<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    },
    regionName: {
      type: Array,
      default: null
    },
    serviceNumber: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      chart: null,
      regionName2: this.regionName,
      serviceNumber2: this.serviceNumber
    }
  },
  watch: {
    regionName(val) {
      this.regionName2 = val
      this.initChart()
    },
    serviceNumber(val) {
      this.serviceNumber2 = val
      this.initChart()
    },
    deep: true
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: this.regionName
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '维修量',
          data: this.serviceNumber,
          type: 'line'
        }]
      })
    }
  }
}
</script>
