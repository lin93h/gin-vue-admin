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
  ram: '',
  type: 0
})
let serviceType = ref(0)
let statusList = ref([])
let tableData = ref([])
let page = ref(1)
let pageSize = ref(10)
let total = ref(0)
let selectData = ref([])
let typeList = ref([])
let sortList = ref([])
const print = ref(null)


const handleInit = () => {
  nodeList.value = [
    { label: '美国', value: 1 },
    { label: '台湾', value: 2 },
    { label: '新加坡', value: 3 },
    { label: '福州', value: 4 },
    { label: '香港', value: 5 },
  ]

  typeList.value = [
    { label: '全部', value: 0},
    { label: '企业', value: 1},
    { label: '个人', value: 2},
  ]

  sortList.value = [
    { label: '逆序', value: 1},
    { label: '顺序', value: 2},
  ]

  statusList.value = [
    { label: '全部', value: 1 },
    { label: '启用', value: 2 },
    { label: '停用', value: 3 },
    { label: '删除', value: 4 },
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
    <fieldset>
      <legend>搜索信息</legend>
      <el-form v-model="searchParams" label-width="100px">
        <el-form-item label="状态">
          <el-radio-group v-model="searchParams.status">
            <el-radio-button v-for="item in statusList" :label="item.value">{{ item.label }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序(时间)">
          <el-radio-group v-model="searchParams.sort">
            <el-radio-button v-for="item in sortList" :label="item.value">{{ item.label }}</el-radio-button>
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
              <el-button type="primary">刷新</el-button>
            </section>
            <section class="right">
              <el-button type="default" plain>导出</el-button>
              <el-button type="default" plain @click="handlePrint">打印</el-button>
            </section>
          </div>
        </template>
        <el-table-column type="selection" width="55" />
        <el-table-column label="域名" prop=""></el-table-column>
        <el-table-column label="用户信息" prop="" width="140"></el-table-column>
        <el-table-column label="状态" prop=""></el-table-column>
        <el-table-column label="创建时间" prop=""></el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="danger" size="small">停用</el-button>
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