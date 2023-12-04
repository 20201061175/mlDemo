<template>
  <e-charts style="margin-top: 3%;" class="chart" :option="option"/>
  <div style="display: flex;">
    训练过程慢动作：
    <Switch v-model:checked="slow" checked-children="开" un-checked-children="关" />
  </div>
  <Row style="margin-top: 2%;">
    学习率：
    <Col :span="8">
      <Slider v-model:value="learn_rate" :min="0" :max="0.5" :step="0.0001" />
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
  <Alert style="margin-top: 2%;"  :message="h('pre',{}, msg)" type="success" />
</template>

<script setup>

import {ref, watch, h} from 'vue';
import * as echarts from 'echarts';
import ecStat from 'echarts-stat';
import { Alert, Row, Col, Input, Slider, Switch } from 'ant-design-vue';
import { data5 } from '../data'


const lineName = ref('null')
let startNode = ref([0, 0])
let endNode = ref([25, 0])
const border0 = ref([])
const slow = ref(false)
const border1 = ref([])
const option = ref({
  title: {
    text: '逻辑回归',
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
      name: 'a',
      type: 'scatter',
      emphasis: {
        focus: 'series'
      },
      data: border0
    },
    {
      name: 'b',
      type: 'scatter',
      emphasis: {
        focus: 'series'
      },
      data: border1
    },
    {
      name: 'A',
      type: 'scatter',
      emphasis: {
        focus: 'series'
      },
      data: data5.filter(item => item[2] === 0).map(item => [item[0], item[1]])
    },
    {
      name: 'B',
      type: 'scatter',
      emphasis: {
        focus: 'series'
      },
      data: data5.filter(item => item[2] === 1).map(item => [item[0], item[1]])
    },
  ]
})

const msg = ref('')

// 节流函数
function throttle(fn, time) {
    let timer = null;//声明一个定时器
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

const learn_rate = ref(0.001)
const iter = ref(10000)


class LogisticRegression {
  constructor(numFeatures) {
    this.weights = new Array(numFeatures).fill(0);
    this.bias = 0;
  }

  sigmoid(z) {
    return 1 / (1 + Math.exp(-z));
  }

  predict(features) {
    const z = this.bias + features.reduce((acc, val, i) => acc + val * this.weights[i], 0);
    return this.sigmoid(z);
  }

  changeLine(a, b) {
    setTimeout(() => {
      border0.value = a
      border1.value = b
    }, 0)
  } 

  train(features, labels, learningRate, numIterations) {
    msg.value = ''
    for (let i = 0; i < numIterations; i++) {
      let errorSum = 0;
      for (let j = 0; j < features.length; j++) {
        const predicted = this.predict(features[j]);
        const error = labels[j] - predicted;
        errorSum += error;
        this.weights = this.weights.map((w, k) => w + error * features[j][k] * learningRate);
        this.bias += error * learningRate;
      }
      if (i % 250 === 0) {
        msg.value = msg.value + ' 训练' + i + '次' + 'w:' + this.weights + '，b:' + this.bias + '\n'
        if (slow.value) {
          const a = []
          const b = []
          for (let i = 0; i < train.length; i++) {
            var pred = this.predict(train[i])
            if (pred < 0.5) {
              a.push(train[i])
            } else {
              b.push(train[i])
            }
          }
          this.changeLine(a, b)
        }
      }
      if (errorSum === 0) break;
    }
  }
}


const xx = []
const yy = []
for (let i = 0; i < 100; i = i + 1.5 ) {
  xx.push(i)
  yy.push(i)
}
const train = []
for (let i = 0; i < xx.length; i++) {
  for (let j = 0; j < yy.length; j++) {
    train.push([xx[i], yy[j]])
  }
}

function findBorder() {
  const X = data5.map(item => [item[0], item[1]]);
  const y = data5.map(item => item[2]);
  const clf = new LogisticRegression(X[0].length);
  clf.train(X, y, learn_rate.value, iter.value);

  const a = []
  const b = []
  for (let i = 0; i < train.length; i++) {
    var pred = clf.predict(train[i])
    if (pred < 0.5) {
      a.push(train[i])
    } else {
      b.push(train[i])
    }
  }
  
  border0.value = a
  border1.value = b
}
findBorder()
watch([learn_rate, iter], () => {
  findBorder()
})


</script>

<style scoped>
.chart{
  height: 600px;
  width: 600px;
}
</style>
