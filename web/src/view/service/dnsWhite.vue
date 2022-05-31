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
let serviceType = ref(0)
let statusList = ref([])
let tableData = ref([])
let page = ref(1)
let pageSize = ref(10)
let total = ref(0)
let selectData = ref([])
const print = ref(null)


const handleInit = () => {
  nodeList.value = [
    { label: '美国', value: 1 },
    { label: '台湾', value: 2 },
    { label: '新加坡', value: 3 },
    { label: '福州', value: 4 },
    { label: '香港', value: 5 },
  ]

  statusList.value = [
    { label: '所有', value: 1 },
    { label: '已审', value: 2 },
    { label: '未审', value: 3 },
    { label: '有效', value: 4 },
    { label: '无效', value: 5 },
  ]

  tableData.value = [{ id: 1 }]
}

const handleSelectionChange = (val) => {
  selectData.value = val
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
      <legend>白名单操作</legend>
      <el-button type="success">添加白名单</el-button>
      <el-button type="primary">同步域名</el-button>
    </fieldset>
    <fieldset>
      <legend>搜索信息</legend>
      <el-form v-model="searchParams" label-width="100px">
        <el-form-item label="状态">
          <el-radio-group v-model="searchParams.status">
            <el-radio v-for="item in statusList" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="筛选条件">
          <el-select v-model="searchParams.user">
            <el-option label="所属用户" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间筛选">
          <el-date-picker v-model="searchParams.date" type="daterange" value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至" start-placeholder="到期开始日期" end-placeholder="到期结束日期"></el-date-picker>
          <el-date-picker v-model="searchParams.date" type="daterange" value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至" start-placeholder="订单开始日期" end-placeholder="订单结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="uuid/关键词">
          <el-input v-model="searchParams.keyword" style="width: 300px">
          </el-input>
          <el-button type="primary" icon="Search">搜索</el-button>
        </el-form-item>
      </el-form>
    </fieldset>
    <el-table :data="tableData" @selection-change="handleSelectionChange" border max-height="500px">
      <el-table-column>
        <template #header>
          <div class="table-top-bar">
            <section class="left">
              <el-button type="danger" :disabled="!selectData.length">批量删除</el-button>
              <el-button type="success" :disabled="!selectData.length">批量生效</el-button>
              <el-button type="info" :disabled="!selectData.length">批量失效</el-button>
            </section>
            <section class="right">
              <el-button type="default" plain v-auth="btnAuth.export">导出</el-button>
              <el-button type="default" plain @click="handlePrint">打印</el-button>
            </section>
          </div>
        </template>
        <el-table-column type="selection" width="55" />
        <el-table-column label="域名" prop=""></el-table-column>
        <el-table-column label="备案号" prop=""></el-table-column>
        <el-table-column label="用户" prop=""></el-table-column>
        <el-table-column label="模板" prop=""></el-table-column>
        <el-table-column label="服务器类型" prop="" width="300">
          <template #default="{ row }">
            <el-select v-model="serviceType" multiple placeholder="Select">
              <el-option v-for="item in nodeList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="时间" prop=""></el-table-column>
        <el-table-column label="状态" prop=""></el-table-column>
        <el-table-column label="系统备注" prop=""></el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template #default="{ row }">
            <el-button size="small">保存</el-button>
            <el-button size="small">备注</el-button>
            <el-button size="small">生效</el-button>
            <el-button size="small">审核</el-button>
            <el-button type="danger" size="small">删除</el-button>
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