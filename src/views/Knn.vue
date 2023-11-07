<template>
  <e-charts style="margin-top: 3%;" class="chart" :option="option"/>
  <Row style="margin-top: 2%;">
    K：
    <Col :span="8">
      <Slider v-model:value="k" :min="2" :max="20" :step="1" />
    </Col>
    <Col :span="1">
      <Input
        v-model:value="k"
        :min="0"
        :max="1"
        :step="0.01"
        style="margin-left: 16px"
      />
    </Col>
  </Row>
</template>

<script lang="ts" setup>

import {ref, watch} from 'vue';
import * as echarts from 'echarts';
import ecStat from 'echarts-stat';
import { Alert, Row, Col, Input, Slider } from 'ant-design-vue';
import { data1 } from '../data'

echarts.registerTransform(ecStat.transform.regression);

const msg = ref('-------------')
const lineName = ref('null')
let startNode = ref([0, 0])
let endNode = ref([25, 0])
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
const border0 = ref([] as any)
const border1 = ref([] as any)
const border2 = ref([] as any)
const option = ref({
  dataset: [
    {
      source: data1
    }
  ],
  title: {
    text: 'KNN',
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
      name: 'A',
      type: 'scatter',
      data: border0
    },
    {
      name: 'C',
      type: 'scatter',
      data: border2
    },
    {
      name: 'B',
      type: 'scatter',
      data: border1
    },
    {
      name: 'aa',
      type: 'scatter',
      data: [
        [1,2],
        [2,1],
        [2,3],
        [1,3.5],
        [1.5,3.9],
        [3,4],
      ]
    },
    {
      name: 'bb',
      type: 'scatter',
      data: [
        [4,5],
        [5,4],
        [4.5,4],
        [3.5,3.9],
        [3.5,3],
        [2.5,2.9],
      ]
    },
    {
      name: 'cc',
      type: 'scatter',
      data: [
        [5,1],
        [4,0.5],
        [4.5,0.8],
        [4,0.3],
        [3,2],
        [3.5,1.8],
      ]
    },
    
  ]
})

function euclideanDistance(a:any, b:any) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function getDistances(testSample:any, data:any) {
  const distances = [];
  for (let i = 0; i < data.length; i++) {
    distances.push({
      sample: data[i],
      distance: euclideanDistance(testSample, data[i])
    });
  }
  return distances;
}

function getNeighbors(k:any, distances:any) {
  return distances.sort((a:any, b:any) => a.distance - b.distance).slice(0, k);
}

function predictClass(k:any, testSample:any, data:any) {
  const distances = getDistances(testSample, data);
  const neighbors = getNeighbors(k, distances);
  const classes = {} as any;
  for (let i = 0; i < neighbors.length; i++) {
    const cls = neighbors[i].sample.class;
    if (!classes[cls]) {
      classes[cls] = 0;
    }
    classes[cls]++;
  }
  let result;
  let maxCount = -1;
  for (const cls in classes) {
    if (classes[cls] > maxCount) {
      result = cls;
      maxCount = classes[cls];
    }
  }
  return result;
}

const data = [
  { x: 1, y: 2, class: 'A' },
  { x: 2, y: 1, class: 'A' },
  { x: 2, y: 3, class: 'A' },
  { x: 1, y: 3.5, class: 'A' },
  { x: 1.5, y: 3.9, class: 'A' },
  { x: 3, y: 4, class: 'A' },
  { x: 4, y: 5, class: 'B' },
  { x: 5, y: 4, class: 'B' },
  { x: 4.5, y: 4, class: 'B' },
  { x: 3.5, y: 3.9, class: 'B' },
  { x: 3.5, y: 3, class: 'B' },
  { x: 2.5, y: 2.9, class: 'B' },
  { x: 5, y: 1, class: 'C' },
  { x: 4, y: 0.5, class: 'C' },
  { x: 4.5, y: 0.8, class: 'C' },
  { x: 4, y: 0.3, class: 'C' },
  { x: 3, y: 2, class: 'C' },
  { x: 3.5, y: 1.8, class: 'C' },
];

const k = ref(5);

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

function findBorder() {
  const x = []
  const y = []
  for (let i = 0; i < 5; i = i + 0.08 ) {
    x.push(i)
    y.push(i)
  }
  const aa = []
  const bb = []
  const cc = []
  for (let i = 0; i < x.length; i++) {
    for (let j = 0; j < y.length; j++) {
      const pred = predictClass(k.value, { x: x[i], y: y[j] }, data)
      
      if (pred === 'A') {
        aa.push([x[i], y[j]])
      } else if (pred === 'B'){
        bb.push([x[i], y[j]])
      } else {
        cc.push([x[i], y[j]])
      }
    }
  }
  console.log(aa, bb, cc)
  border0.value = aa
  border1.value = bb
  border2.value = cc
}

const f = throttle(findBorder, 300)

findBorder()

watch([k], () => {
  f()
})

</script>

<style scoped>
.chart{
  height: 600px;
  width: 600px;
}
</style>
