<script setup>
import { ref } from 'vue';
const props = defineProps({
  data: Array
})

const name = ref('hahahahahhhh')
const childDom = ref(null)

defineExpose({
  childDom,
  name
})

</script>

<template>
  <table class="print-wrapper" ref="childDom" :style="{border: '1px solid #ddd', width: '100%'}">
    <tr v-for="item of data" :key="item.value">
      <td :style="{border: '1px solid #ddd'}">{{item.label}}</td>
      <td :style="{border: '1px solid #ddd'}">{{item.value}}</td>
    </tr>
  </table>
</template>

<style lang='scss'>
.print-wrapper {
  display: none;
}
</style>