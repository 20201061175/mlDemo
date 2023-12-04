<template>
  <e-charts style="margin-top: 3%;" class="chart" :option="option"/>
  <div style="display: flex;">
    数据集选择：
    <RadioGroup v-model:value="data">
      <RadioButton value="1">数据集1</RadioButton>
      <RadioButton value="2">数据集2</RadioButton>
    </RadioGroup>
  </div>
  <Row style="margin-top: 2%;">
    正则化参数：
    <Col :span="8">
      <Slider v-model:value="C" :min="0" :max="1" :step="0.001" />
    </Col>
    <Col :span="1">
      <Input
        v-model:value="C"
        :min="0"
        :max="1"
        :step="0.01"
        style="margin-left: 16px"
      />
    </Col>
  </Row>
  <Row style="margin-top: 2%;">
    数值公差：
    <Col :span="8">
      <Slider v-model:value="tol" :min="0" :max="1" :step="0.001" />
    </Col>
    <Col :span="1">
      <Input
        v-model:value="tol"
        :min="0"
        :max="1"
        :step="0.01"
        style="margin-left: 16px"
      />
    </Col>
  </Row>
  <Row style="margin-top: 2%;">
    阿尔法容差（支持向量的阈值）：
    <Col :span="8">
      <Slider v-model:value="alphaTol" :min="0" :max="1" :step="0.001" />
    </Col>
    <Col :span="1">
      <Input
        v-model:value="alphaTol"
        :min="0"
        :max="1"
        :step="0.01"
        style="margin-left: 16px"
      />
    </Col>
  </Row>
  <RadioGroup v-model:value="kernel" size="large" style="display:flex; margin-top: 3%;">
    <RadioButton value="linear">linear线性核</RadioButton>
    <RadioButton value="gaussian">gaussian高斯核</RadioButton>
    <RadioButton value="polynomial">polynomial多项式核</RadioButton>
    <RadioButton value="exponential">exponential指数核</RadioButton>
  </RadioGroup>
  <Row style="margin-top: 0.3%; display:flex; flex-direction: row;" v-if="kernel === 'gaussian'">
    sigma：
    <Col :span="4">
      <Slider v-model:value="sigma" :min="0" :max="1" :step="0.01" />
    </Col>
    <Col :span="1">
      <Input
        v-model:value="sigma"
        :min="0"
        :max="1"
        :step="0.01"
        style="margin-left: 16px"
      />
    </Col>
  </Row>
  <Row style="margin-top: 0.3%; display:flex; flex-direction: row;" v-if="kernel === 'polynomial'">
    degree：
    <Col :span="4">
      <Slider v-model:value="degree" :min="0" :max="1" :step="0.01" />
    </Col>
    <Col :span="1">
      <Input
        v-model:value="degree"
        :min="0"
        :max="1"
        :step="0.01"
        style="margin-left: 16px"
      />
    </Col>
  </Row>
  <Row style="margin-top: 0.3%; display:flex; flex-direction: row;" v-if="kernel === 'polynomial'">
    constant：
    <Col :span="4">
      <Slider v-model:value="constant" :min="0" :max="1" :step="0.01" />
    </Col>
    <Col :span="1">
      <Input
        v-model:value="constant"
        :min="0"
        :max="1"
        :step="0.01"
        style="margin-left: 16px"
      />
    </Col>
  </Row>
  <Row style="margin-top: 0.3%; display:flex; flex-direction: row;" v-if="kernel === 'polynomial'">
    scale：
    <Col :span="4">
      <Slider v-model:value="scale" :min="0" :max="1" :step="0.01" />
    </Col>
    <Col :span="1">
      <Input
        v-model:value="scale"
        :min="0"
        :max="1"
        :step="0.01"
        style="margin-left: 16px"
      />
    </Col>
  </Row>
  <div style="height: 50px;"></div>
</template>

<script lang="ts" setup>

import {ref, watch, toRaw} from 'vue';
import * as echarts from 'echarts';
import ecStat from 'echarts-stat';
import { Row, Col, Input, Slider, RadioGroup, RadioButton } from 'ant-design-vue';
import { data5, data6 } from '../data'
var SVM = require('ml-svm');

echarts.registerTransform(ecStat.transform.regression);

const lineName = ref('null')
let startNode = ref([0, 0])
let endNode = ref([25, 0])
let kernel = ref('gaussian')
const border0 = ref([] as any)
const border1 = ref([] as any)
const data = ref('1')
let a = ref(data5.filter(item => item[2] === 0).map(item => [item[0], item[1]]))
let b = ref(data5.filter(item => item[2] === 1).map(item => [item[0], item[1]]))

const option = ref({
  title: {
    text: 'SVM',
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
      data: a
    },
    {
      name: 'B',
      type: 'scatter',
      emphasis: {
        focus: 'series'
      },
      data: b
    },
  ]
})

// 训练参数
const C = ref(0.5)
const tol = ref(0.001)
const alphaTol = ref(0.001)
const sigma = ref(0.5)
const degree = ref(1)
const constant = ref(1)
const scale = ref(1)


const x = [] as any
const y = [] as any
for (let i = 0; i < 100; i = i + 1.5 ) {
  x.push(i)
  y.push(i)
}
const train = [] as any
for (let i = 0; i < x.length; i++) {
  for (let j = 0; j < y.length; j++) {
    train.push([x[i], y[j]])
  }
}

function findBorder() {
  let options = {
    C: C.value,
    tol: tol.value,
    alphaTol: alphaTol.value,
    maxPasses: 10,
    maxIterations: 10000,
    kernel: kernel.value,
    kernelOptions: {
      sigma: sigma.value,
      degree: degree.value,
      constant: constant.value,
      scale: scale.value,
    }
  };
  let svm = new SVM(options);

  let features = [...a.value,...b.value];
  let labels = [...Array(a.value.length).fill(-1), ...Array(b.value.length).fill(1)];
  svm.train(features, labels);

  // 预测
  let res = svm.predict(train); 
  
  border0.value = train.filter((item: any, index: any) => res[index] === -1)
  border1.value = train.filter((item: any, index: any) => res[index] === 1)
}
findBorder()
watch([kernel, C, tol, alphaTol, sigma, degree, constant, scale, data], () => {
  a.value = (data.value === '1' ? data5 : data6).filter(item => item[2] === 0).map(item => (data.value === '1' ? [item[0], item[1]] : [item[0]*50+50, item[1]*50+50]))
  b.value = (data.value === '1' ? data5 : data6).filter(item => item[2] === 1).map(item => (data.value === '1' ? [item[0], item[1]] : [item[0]*50+50, item[1]*50+50]))
  findBorder()
})

</script>

<style scoped>
.chart{
  height: 600px;
  width: 600px;
}
</style>
