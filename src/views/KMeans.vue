<template>
  <e-charts :ref="myChart" style="margin-top: 3%;" class="chart" :option="option2" v-if="CLUSTER_COUNT === 2"/>
  <e-charts :ref="myChart" style="margin-top: 3%;" class="chart" :option="option3" v-if="CLUSTER_COUNT === 3"/>
  <e-charts :ref="myChart" style="margin-top: 3%;" class="chart" :option="option4" v-if="CLUSTER_COUNT === 4"/>
  <e-charts :ref="myChart" style="margin-top: 3%;" class="chart" :option="option5" v-if="CLUSTER_COUNT === 5"/>
  <e-charts :ref="myChart" style="margin-top: 3%;" class="chart" :option="option6" v-if="CLUSTER_COUNT === 6"/>
  <e-charts :ref="myChart" style="margin-top: 3%;" class="chart" :option="option7" v-if="CLUSTER_COUNT === 7"/>
  <Row style="margin-top: 2%;">
    K：
    <Col :span="8">
      <Slider v-model:value="CLUSTER_COUNT" :min="2" :max="7" :step="1" />
    </Col>
    <Col :span="1">
      <Input
        v-model:value="CLUSTER_COUNT"
        :min="0"
        :max="1"
        :step="0.01"
        style="margin-left: 16px"
      />
    </Col>
  </Row>
</template>

<script lang="ts" setup>
import {reactive, ref, watch} from 'vue'
import * as echarts from 'echarts';
import ecStat from 'echarts-stat';
import {data4} from '../data'
import { Alert, Row, Col, Input, Slider } from 'ant-design-vue';

echarts.registerTransform(ecStat.transform.clustering);

const myChart = ref()
const msg = ref('------------------')
const CLUSTER_COUNT = ref(5);
const DIENSIION_CLUSTER_INDEX = 2;
const COLOR_ALL = [
  '#37A2DA',
  '#e06343',
  '#37a354',
  '#b55dba',
  '#b5bd48',
  '#8378EA',
  '#96BFFF',
];

const pieces = [];
for (var i = 0; i < 7; i++) {
  pieces.push({
    value: i,
    label: 'cluster ' + i,
    color: COLOR_ALL[i]
  });
}

const option2 = {
  dataset: [
    {
      source: data4
    },
    {
      transform: {
        type: 'ecStat:clustering',
        // print: true,
        config: {
          clusterCount: 2,
          outputType: 'single',
          outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX
        }
      }
    }
  ],
  tooltip: {
    position: 'top'
  },
  visualMap: {
    type: 'piecewise',
    top: 'middle',
    min: 0,
    max: 2,
    left: 10,
    splitNumber: 2,
    dimension: DIENSIION_CLUSTER_INDEX,
    pieces: pieces.slice(0, 2)
  },
  grid: {
    left: 120
  },
  xAxis: {},
  yAxis: {},
  series: {
    type: 'scatter',
    encode: { tooltip: [0, 1] },
    symbolSize: 15,
    itemStyle: {
      borderColor: '#555'
    },
    datasetIndex: 1
  }
}
const option3 = {
  dataset: [
    {
      source: data4
    },
    {
      transform: {
        type: 'ecStat:clustering',
        // print: true,
        config: {
          clusterCount:3,
          outputType: 'single',
          outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX
        }
      }
    }
  ],
  tooltip: {
    position: 'top'
  },
  visualMap: {
    type: 'piecewise',
    top: 'middle',
    min: 0,
    max:3,
    left: 10,
    splitNumber:3,
    dimension: DIENSIION_CLUSTER_INDEX,
    pieces: pieces.slice(0, 3)
  },
  grid: {
    left: 120
  },
  xAxis: {},
  yAxis: {},
  series: {
    type: 'scatter',
    encode: { tooltip: [0, 1] },
    symbolSize: 15,
    itemStyle: {
      borderColor: '#555'
    },
    datasetIndex: 1
  }
}
const option4 = {
  dataset: [
    {
      source: data4
    },
    {
      transform: {
        type: 'ecStat:clustering',
        // print: true,
        config: {
          clusterCount: 4,
          outputType: 'single',
          outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX
        }
      }
    }
  ],
  tooltip: {
    position: 'top'
  },
  visualMap: {
    type: 'piecewise',
    top: 'middle',
    min: 0,
    max: 4,
    left: 10,
    splitNumber: 4,
    dimension: DIENSIION_CLUSTER_INDEX,
    pieces: pieces.slice(0, 4)
  },
  grid: {
    left: 120
  },
  xAxis: {},
  yAxis: {},
  series: {
    type: 'scatter',
    encode: { tooltip: [0, 1] },
    symbolSize: 15,
    itemStyle: {
      borderColor: '#555'
    },
    datasetIndex: 1
  }
}
const option5 = {
  dataset: [
    {
      source: data4
    },
    {
      transform: {
        type: 'ecStat:clustering',
        // print: true,
        config: {
          clusterCount: 5,
          outputType: 'single',
          outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX
        }
      }
    }
  ],
  tooltip: {
    position: 'top'
  },
  visualMap: {
    type: 'piecewise',
    top: 'middle',
    min: 0,
    max: 5,
    left: 10,
    splitNumber: 5,
    dimension: DIENSIION_CLUSTER_INDEX,
    pieces: pieces.slice(0, 5)
  },
  grid: {
    left: 120
  },
  xAxis: {},
  yAxis: {},
  series: {
    type: 'scatter',
    encode: { tooltip: [0, 1] },
    symbolSize: 15,
    itemStyle: {
      borderColor: '#555'
    },
    datasetIndex: 1
  }
}
const option6 = {
  dataset: [
    {
      source: data4
    },
    {
      transform: {
        type: 'ecStat:clustering',
        // print: true,
        config: {
          clusterCount:6,
          outputType: 'single',
          outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX
        }
      }
    }
  ],
  tooltip: {
    position: 'top'
  },
  visualMap: {
    type: 'piecewise',
    top: 'middle',
    min: 0,
    max: 6,
    left: 10,
    splitNumber: 6,
    dimension: DIENSIION_CLUSTER_INDEX,
    pieces: pieces.slice(0, 6)
  },
  grid: {
    left: 120
  },
  xAxis: {},
  yAxis: {},
  series: {
    type: 'scatter',
    encode: { tooltip: [0, 1] },
    symbolSize: 15,
    itemStyle: {
      borderColor: '#555'
    },
    datasetIndex: 1
  }
}
const option7 = {
  dataset: [
    {
      source: data4
    },
    {
      transform: {
        type: 'ecStat:clustering',
        // print: true,
        config: {
          clusterCount: 7,
          outputType: 'single',
          outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX
        }
      }
    }
  ],
  tooltip: {
    position: 'top'
  },
  visualMap: {
    type: 'piecewise',
    top: 'middle',
    min: 0,
    max: 7,
    left: 10,
    splitNumber: 7,
    dimension: DIENSIION_CLUSTER_INDEX,
    pieces: pieces.slice(0, 7)
  },
  grid: {
    left: 120
  },
  xAxis: {},
  yAxis: {},
  series: {
    type: 'scatter',
    encode: { tooltip: [0, 1] },
    symbolSize: 15,
    itemStyle: {
      borderColor: '#555'
    },
    datasetIndex: 1
  }
}

</script>

<style scoped>
.chart{
  height: 600px;
  width: 600px;
}
</style>
