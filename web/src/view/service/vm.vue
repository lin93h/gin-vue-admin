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
        <el-form-item label="状态">
          <el-radio-group v-model="searchParams.status">
            <el-radio v-for="item in statusList" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="筛选条件">
          <el-select v-model="searchParams.user">
            <el-option label="所属用户" value=""></el-option>
          </el-select>
          <el-select v-model="searchParams.cpu">
            <el-option label="CPU" value=""></el-option>
          </el-select>
          <el-select v-model="searchParams.ram">
            <el-option label="内存" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间筛选">
          <el-date-picker v-model="searchParams.date" type="daterange" value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
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
              <el-button type="success">刷新</el-button>
              <el-button type="success">刷新云主机</el-button>
            </section>
            <section class="right">
              <el-button type="default" plain v-auth="btnAuth.export">导出</el-button>
              <el-button type="default" plain @click="handlePrint">打印</el-button>
            </section>
          </div>
        </template>
        <el-table-column label="服务器名" prop=""></el-table-column>
        <el-table-column label="用户" prop=""></el-table-column>
        <el-table-column label="ip" prop=""></el-table-column>
        <el-table-column label="计费" prop=""></el-table-column>
        <el-table-column label="配置" prop=""></el-table-column>
        <el-table-column label="创建/到期时间" prop=""></el-table-column>
        <el-table-column label="状态" prop=""></el-table-column>
        <el-table-column label="运维" width="180" align="center" fixed="right">
          <template #default="{ row }">
            <el-button size="small">同步</el-button>
            <el-button size="small">暂停</el-button>
            <el-button size="small">重启</el-button>
            <el-button size="small">控制台</el-button>
            <el-button size="small">修改密码</el-button>
            <el-button size="small">日志</el-button>
            <el-button size="small">关闭防欺诈</el-button>
            <el-button size="small">临时带宽</el-button>
            <el-button size="small">新增ip</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template #default="{ row }">
            <el-button size="small">过户</el-button>
            <el-button size="small">到期</el-button>
            <el-button size="small">监控</el-button>
            <el-button size="small">锁定</el-button>
            <el-button type="danger" size="small">删除</el-button>
            <el-button size="small">恢复删除</el-button>
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