<script setup>
import { ref, reactive, onMounted } from 'vue'
import Print from './components/Print.vue'
import { useBtnAuth } from '@/utils/btnAuth'

const btnAuth = useBtnAuth()

let nodeList = ref([])
let searchParams = reactive({
  nuuid: 0,
  status: 1,
  user: '',
  cpu: '',
  ram: ''
})
let statusList = ref([])
let tableData = ref([])
let page = ref(1)
let pageSize = ref(10)
let total = ref(0)
const print = ref(null)


const handleInit = () => {
  nodeList.value = [
    { name: '全部', nuuid: 0 },
    { name: '美国', nuuid: 1 },
    { name: '台湾', nuuid: 2 },
    { name: '新加坡', nuuid: 3 },
    { name: '福州', nuuid: 4 },
    { name: '香港', nuuid: 5 },
  ]

  statusList.value = [
    { label: '所有', value: 1 },
    { label: '已过期', value: 2 },
    { label: '3天内过期', value: 3 },
    { label: '7天内过期', value: 4 },
    { label: '一个月内过期', value: 5 },
    { label: '已删除', value: 6 },
  ]

  tableData.value = [{ id: 1 }]
}

const handleCurrentChange = (val) => {
  page.value = val
  handleInit()
}

const handleSizeChange = (val) => {
  pageSize.value = val
  handleInit()
}

const handlePrint = () => {
  let tab = window.open()
  tab.document.body.appendChild(print.value.printInfo)
  tab.window.print()
  tab.window.close()
}

onMounted(() => {
  handleInit()
})
</script>

<template>
  <div class="service-vm-wrapper">
    <fieldset ref="demo1">
      <legend>所属节点</legend>
      <el-radio-group v-model="searchParams.nuuid" size="large">
        <el-radio-button v-for="item in nodeList" :key="item.nuuid" :label="item.nuuid">{{ item.name }}
        </el-radio-button>
      </el-radio-group>
    </fieldset>
    <fieldset>
      <legend>搜索信息</legend>
      <el-form v-model="searchParams" label-width="100px">
        <el-form-item label="uuid/关键词">
          <el-input v-model="searchParams.keyword" style="width: 300px">
          </el-input>
          <el-button type="primary" icon="Search">搜索</el-button>
        </el-form-item>
      </el-form>
    </fieldset>
    <el-table :data="tableData" border max-height="500px">
      <el-table-column>
        <template #header>
          <div class="table-top-bar">
            <section class="left">
              <el-button type="primary">同步私有网络</el-button>
              <el-button type="success">刷新云主机</el-button>
            </section>
            <section class="right">
              <el-button type="default" plain>导出</el-button>
              <el-button type="default" plain @click="handlePrint">打印</el-button>
            </section>
          </div>
        </template>
        <el-table-column label="三层网络" prop=""></el-table-column>
        <el-table-column label="二层网络" prop=""></el-table-column>
        <el-table-column label="ip段" prop=""></el-table-column>
        <el-table-column label="CIDR" prop=""></el-table-column>
        <el-table-column label="配置" prop=""></el-table-column>
        <el-table-column label="类型" prop=""></el-table-column>
        <el-table-column label="时间" prop=""></el-table-column>
        <el-table-column label="状态" width="180" align="center" fixed="right">
          <template #default="{ row }">
            
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary">编辑</el-button>
            <el-button size="small" type="primary">查看</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <div class="gva-pagination">
      <el-pagination :current-page="page" :page-size="pageSize" :page-sizes="[10, 30, 50, 100]" :total="total"
        layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
        @size-change="handleSizeChange" />
    </div>
    <Print :data="statusList" ref="print"></Print>
  </div>
</template>

<style lang='scss'>
.service-vm-wrapper {
  padding: 15px;
  background: #fff;

  fieldset {
    padding: 20px 30px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
  }

  .table-top-bar {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
}
</style>