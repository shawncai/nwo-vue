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
      default: '300px'
    },
    pieData: {
      type: Array,
      default: null
    },
    pieData2: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      chart: null,
      pieData3: this.pieData,
      xpieData: this.pieData2
    }
  },
  watch: {
    pieData(val) {
      this.pieData3 = val
      this.initChart()
    },
    pieData2(val) {
      this.xpieData = val
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
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: this.xpieData
        },
        calculable: true,
        series: [
          {
            name: '维修问题',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '50%'],
            data: this.pieData3,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
