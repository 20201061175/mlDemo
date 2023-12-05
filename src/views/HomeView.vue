<template>
  <div>
    <h1 style="margin-top: 10%;">
      机器学习算法可视化平台
    </h1>
    <p>
      软件2013 唐浩然 20201061175
    </p>
  </div>
  <Button size="large" style="color: rgb(0, 85, 241);" @click="handleClick1"> 线性回归</Button>
  <Button size="large" style="margin-left: 3%; color: rgb(0, 85, 241);"  @click="handleClick2"> 逻辑回归</Button>
  <Button size="large" style="margin-left: 3%; color: rgb(0, 85, 241);"  @click="handleClick3"> KNN分类</Button>
  <Button size="large" style="margin-left: 3%; color: rgb(0, 85, 241);"  @click="handleClick4"> SVM</Button>
  <Button size="large" style="margin-top: 3%; margin-left: 3%; color: rgb(0, 85, 241);"  @click="handleClick5"> KMeans聚类</Button>
  <Card title="修改记录（根据陆老师建议）" style="width: 33%; margin: 50px auto">
    <p>1：线性回归、逻辑回归添加训练过程慢动作</p>
    <p>2：KNN、SVM添加多份代表性数据集</p>
  </Card>
</template>

<script lang="ts" setup>
import { Button, Card } from 'ant-design-vue';
// import {ref} from Vue
import { useRouter } from 'vue-router';

const router = useRouter()
const handleClick1 = () => {
  router.push({
    path: '/LinearRegression'
  })
}

const handleClick2 = () => {
  router.push({
    path: '/LogisticRegression'
  })
}

const handleClick3 = () => {
  router.push({
    path: '/Knn'
  })
}

const handleClick4 = () => {
  router.push({
    path: '/svm'
  })
}

const handleClick5 = () => {
  router.push({
    path: '/KMeans'
  })
}

</script>
