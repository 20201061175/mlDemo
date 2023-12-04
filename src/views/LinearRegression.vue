<template>
  <e-charts style="margin-top: 3%;" class="chart" :option="option"/>
  <div style="display: flex;">
    训练过程慢动作：
    <Switch v-model:checked="slow" checked-children="开" un-checked-children="关" />
  </div>
  <Row style="margin-top: 2%;">
    学习率：
    <Col :span="8">
      <Slider v-model:value="learn_rate" :min="0" :max="0.03" :step="0.0001" />
    </Col>
    <Col :span="1">
      <Input
        v-model:value="learn_rate"
        :min="0"
        :max="1"
        :step="0.01"
        style="margin-left: 16px"
      />
    </Col>
  </Row>
  <Row style="margin-top: 2%;">
    训练次数：
    <Col :span="8">
      <Slider v-model:value="iter" :min="0" :max="10000" :step="1" />
    </Col>
    <Col :span="1">
      <Input
        v-model:value="iter"
        :min="0"
        :max="1"
        :step="0.01"
        style="margin-left: 16px"
      />
    </Col>
  </Row>
  <Row style="margin-top: 2%;">
    输出log间隔：
    <Col :span="8">
      <Slider v-model:value="display_step" :min="0" :max="2000" :step="1" />
    </Col>
    <Col :span="1">
      <Input
        v-model:value="display_step"
        :min="0"
        :max="1"
        :step="0.01"
        style="margin-left: 16px"
      />
    </Col>
  </Row>
  <div style="display: flex;">
    <Alert style="margin-top: 2%; width: 40%;"  :message="h('pre',{}, msg)" type="success" />
  </div>
</template>

<script lang="ts" setup>

import {ref, watch, h} from 'vue';
import * as echarts from 'echarts';
import ecStat from 'echarts-stat';
import { Alert, Row, Col, Input, Slider, Switch } from 'ant-design-vue';
import { data1 } from '../data'
import { SHOW_ALL } from 'ant-design-vue/es/vc-tree-select/utils/strategyUtil';

echarts.registerTransform(ecStat.transform.regression);

const lineName = ref('null')
let startNode = ref([0, 0])
let endNode = ref([25, 0])
let slow = ref(false)
const markLineOpt = ref({
  animation: false,
  label: {
    formatter: lineName,
    align: 'right'
  },
  lineStyle: {
    type: 'solid',
    color: 'red'
  },
  data: [
    [
      {
        coord: startNode,
        symbol: 'none'
      },
      {
        coord: endNode,
        symbol: 'none'
      }
    ]
  ]
})

const option = ref({
  dataset: [
    {
      source: data1
    }
  ],
  title: {
    text: '线性回归',
    subtext: ' ',
    sublink: ' ',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  xAxis: {
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  yAxis: {
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  series: [
    {
      name: '',
      type: 'scatter',
      markLine: markLineOpt,
    }
  ]
})

const msg = ref('-------------')

// 训练参数
const learn_rate = ref(0.01)
const iter = ref(5000)
const display_step = ref(1000)

// 初始化
const x = data1.map(item => item[0]).flat()
const y = data1.map(item => item[1]).flat()

const mse = []
function average(arr: any) {
  const sum = arr.reduce(function(prev: any, cur: any) {
    return prev + cur
  }, 0)
  return sum / arr.length
}

function multiply(a: any, b:any) {
    // 相乘约束
    if (a[0].length !== b.length) {
        throw new Error();
    }
    let m = a.length;
    let p = a[0].length;
    let n = b[0].length;

    // 初始化 m*n 全 0 二维数组
    let c = new Array(m).fill(0).map(arr => new Array(n).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < p; k++) {
                c[i][j] += a[i][k] * b[k][j];
            }
        }
    }

    return c;
}

// 节流函数
function throttle(fn: any, time: any) {
    let timer: any = null;//声明一个定时器
    return function () {
        if (!timer) {
            timer = setTimeout(function () {
                fn()
                // 清楚定时器
                timer = null
            }, time)
        }
    }
}

function changeLine(w: any, b: any, time: any) {
  setTimeout(() => {
    
    lineName.value = 'w=' + w + ' ,  b=' + b
    // 5 0 
    // 22 22 
    startNode.value = startNode.value[0] < 5 || startNode.value[0] * w + b < 0 ? [4, 4 * w + b] : [startNode.value[0], startNode.value[0] * w + b]
    endNode.value = endNode.value[0] > 22 || endNode.value[0] * w + b > 22 ? [22, 22 * w + b] : [endNode.value[0], endNode.value[0] * w + b]
    console.log(w, b, startNode.value, endNode.value)
  }, time)
}

function excute() {
  msg.value = ''
  let w = Math.random()
  let b = Math.random()
  for (let i = 0; i < iter.value + 1; i++) {
    const t1 = x.map(item => item * w + b)
    let t2 = [] as any[]
    let t3 = [] as any[]
    for (let i = 0; i < t1.length; i++) {
      t2.push(x[i] * (t1[i] - y[i]))
      t3.push(t1[i] - y[i])
    }
    const dw = average(t2)  // x*(w * x + b - y)
    const db = average(t3) // w * x + b - y

    w = w - learn_rate.value * dw
    b = b - learn_rate.value * db

    if (i % 3 === 0) {
      if (slow.value) {
        changeLine(w, b, 0)
      }
    }

    if (i % display_step.value === 0) {
      console.log('训练中', w, b)
      msg.value = msg.value + '   训练' + i + '次' + 'w:' + w + '，b:' + b + '\n'
    }
  }
  changeLine(w, b, 0)
}

excute()

const f = throttle(excute, 100)

watch([learn_rate, iter, display_step], () => {
  f()
})

</script>

<style scoped>
.chart{
  height: 600px;
  width: 600px;
}
</style>
