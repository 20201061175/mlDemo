<template>
  <Button size="large" style="margin-top: 10%; color: rgb(0, 85, 241);" @click="handleClick1"> 线性回归</Button>
  <Button size="large" style="margin-top: 10%; margin-left: 3%; color: rgb(0, 85, 241);"  @click="handleClick2"> 逻辑回归</Button>
  <Button size="large" style="margin-top: 10%; margin-left: 3%; color: rgb(0, 85, 241);"  @click="handleClick3"> KNN分类</Button>
  <Button size="large" style="margin-top: 10%; margin-left: 3%; color: rgb(0, 85, 241);"  @click="handleClick4"> SVM</Button>
  <Button size="large" style="margin-top: 10%; margin-left: 3%; color: rgb(0, 85, 241);"  @click="handleClick5"> KMeans聚类</Button>
</template>

<script lang="ts" setup>
import { Button } from 'ant-design-vue';
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
