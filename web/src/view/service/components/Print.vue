<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps({
  data: Array
})

const name = ref('hahahahahhhh')
const printInfo = ref(null)
const tableStyle = ref({
  border: '1px solid #ddd',
  width: '100%',
  borderCollapse: 'collapse',
  breakAfter: 'page',
})
const tdStyle = ref({
  border: '1px solid #ddd',
  padding: '10px',
})

defineExpose({
  printInfo,
  name
})

</script>

<template>
  <div ref="printInfo" class="print-wrapper">
    <table v-for="item in 10" :style="tableStyle" width="100%" align="center">
      <thead>
        <tr>
          <th :style="tdStyle">服务器</th>
          <th :style="tdStyle">用户</th>
          <th :style="tdStyle">ip</th>
          <th :style="tdStyle">计费</th>
          <th :style="tdStyle">配置</th>
          <th :style="tdStyle">创建/到期时间</th>
          <th :style="tdStyle">状态</th>
        </tr>
      </thead>
      <tbody style="text-align:center">
        <tr v-for="n in 40">
          <td :style="tdStyle" v-for="d in 7">
            系统名：(431888.castleuser.105111)<br />自定义名：431888.castleuser.105111
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang='scss' scoped>
.print-wrapper {
  display: none;
}
</style>