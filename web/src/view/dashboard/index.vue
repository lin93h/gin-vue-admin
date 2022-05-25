<template>
  <div class="page dashboard-wrapper">
    <div class="gva-card-box">
      <div class="gva-card gva-top-card">
        <el-row>
          <el-col :span="24">
            <el-card class="info-card">
              <template #header>
                <div class="card-header">
                  <el-icon color="#1aa094">
                    <Grid />
                  </el-icon>
                  <span class="card-header-label">数据统计</span>
                </div>
              </template>
              <el-row :gutter="10" class="stat-section">
                <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                  <div class="stat-item">
                    <div class="stat-item-header">
                      <span class="label">会员统计</span>
                      <el-tag effect="dark" size="small">实时</el-tag>
                    </div>
                    <div class="stat-item-main">
                      <div class="panel">
                        <div class="digit">0.00</div>
                        <div class="desc">当前注册会员总记录数</div>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                  <div class="stat-item">
                    <div class="stat-item-header">
                      <span class="label">充值记录</span>
                      <el-tag type="info" effect="dark" size="small">实时</el-tag>
                    </div>
                    <div class="stat-item-main">
                      <div class="panel">
                        <div class="digit">0.00</div>
                        <div class="desc">本月充值余额</div>
                      </div>
                      <div class="panel">
                        <div class="digit">0.00</div>
                        <div class="desc">本月充值虚拟金</div>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                  <div class="stat-item">
                    <div class="stat-item-header">
                      <span class="label">提现记录</span>
                      <el-tag type="warning" effect="dark" size="small">实时</el-tag>
                    </div>
                    <div class="stat-item-main">
                      <div class="panel">
                        <div class="digit">0.00</div>
                        <div class="desc">本月提现总额</div>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                  <div class="stat-item">
                    <div class="stat-item-header">
                      <span class="label">主机统计</span>
                      <el-tag type="success" effect="dark" size="small">实时</el-tag>
                    </div>
                    <div class="stat-item-main">
                      <div class="panel">
                        <div class="digit">0.00</div>
                        <div class="desc">未到期的主机数量</div>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="gva-card-box">
      <el-card class="gva-card quick-entrance">
        <template #header>
          <div class="card-header">
            <span>快捷入口</span>
          </div>
        </template>
        <el-row :gutter="20">
          <el-col v-for="(card, key) in toolCards" :key="key" :span="4" :xs="8" class="quick-entrance-items"
            @click="toTarget(card.name)">
            <div class="quick-entrance-item">
              <div class="quick-entrance-item-icon" :style="{ backgroundColor: card.bg }">
                <el-icon>
                  <component :is="card.icon" :style="{ color: card.color }" />
                </el-icon>
              </div>
              <p>{{ card.label }}</p>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <!-- <div class="quick-entrance-title"></div> -->
    </div>
    <div class="gva-card-box">
      <div class="gva-card">
        <div class="card-header">
          <span>数据统计</span>
        </div>
        <div class="echart-box">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="18">
              <echarts-line />
            </el-col>
            <el-col :xs="24" :sm="6">
              <dashboard-table />
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import echartsLine from '@/view/dashboard/dashboardCharts/echartsLine.vue'
import dashboardTable from '@/view/dashboard/dashboardTable/dashboardTable.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const toolCards = ref([
  {
    label: '用户管理',
    icon: 'monitor',
    name: 'user',
    color: '#ff9c6e',
    bg: 'rgba(255, 156, 110,.3)'
  },
  {
    label: '角色管理',
    icon: 'setting',
    name: 'authority',
    color: '#69c0ff',
    bg: 'rgba(105, 192, 255,.3)'
  },
  {
    label: '菜单管理',
    icon: 'menu',
    name: 'menu',
    color: '#b37feb',
    bg: 'rgba(179, 127, 235,.3)'
  },
  {
    label: '代码生成器',
    icon: 'cpu',
    name: 'autoCode',
    color: '#ffd666',
    bg: 'rgba(255, 214, 102,.3)'
  },
  {
    label: '表单生成器',
    icon: 'document-checked',
    name: 'formCreate',
    color: '#ff85c0',
    bg: 'rgba(255, 133, 192,.3)'
  },
  {
    label: '关于我们',
    icon: 'user',
    name: 'about',
    color: '#5cdbd3',
    bg: 'rgba(92, 219, 211,.3)'
  }
])

const router = useRouter()

const toTarget = (name) => {
  router.push({ name })
}

</script>
<script>
export default {
  name: 'Dashboard'
}
</script>

<style lang="scss">
@mixin flex-center {
  display: flex;
  align-items: center;
}

.page {
  background: #f0f2f5;
  padding: 0;

  .gva-card-box {
    padding: 12px 16px;

    &+.gva-card-box {
      padding-top: 0px;
    }
  }

  .gva-card {
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 2px;
    height: auto;
    padding: 26px 30px;
    overflow: hidden;
    box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.03);
  }

  .gva-top-card {
    .info-card {
      .card-header {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        .el-icon {
          font-size: 16px;
          margin-right: 5px;
        }
      }
    }
  }

  .stat-section {
    .stat-item {
      background: #ddd;
      padding: 10px;
      margin-bottom: 10px;

      &-header {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;

        .label {
          font-size: 12px;
        }
      }

      &-main {
        display: flex;
        flex-flow: row nowrap;

        .panel {
          flex-grow: 1;
          flex-basis: 0;

          .digit {
            font-size: 28px;
          }

          .desc {
            font-size: 12px;
          }
        }
      }
    }
  }

  .quick-entrance-title {
    height: 30px;
    font-size: 22px;
    color: #333;
    width: 100%;
    border-bottom: 1px solid #eee;
  }

  .quick-entrance-items {
    @include flex-center;
    justify-content: center;
    text-align: center;
    color: #333;

    .quick-entrance-item {
      padding: 16px 28px;
      margin-top: -16px;
      margin-bottom: -16px;
      border-radius: 4px;
      transition: all 0.2s;

      &:hover {
        box-shadow: 0px 0px 7px 0px rgba(217, 217, 217, 0.55);
      }

      cursor: pointer;
      height: auto;
      text-align: center;

      // align-items: center;
      &-icon {
        width: 50px;
        height: 50px !important;
        border-radius: 8px;
        @include flex-center;
        justify-content: center;
        margin: 0 auto;

        i {
          font-size: 24px;
        }
      }

      p {
        margin-top: 10px;
      }
    }
  }

  .echart-box {
    padding: 14px;
  }
}

.dasboard-icon {
  font-size: 20px;
  color: rgb(85, 160, 248);
  width: 30px;
  height: 30px;
  margin-right: 10px;
  @include flex-center;
}

.flex-center {
  @include flex-center;
}

//小屏幕不显示右侧，将登陆框居中
@media (max-width: 750px) {
  .gva-card {
    padding: 20px 10px !important;

    .gva-top-card {
      height: auto;
    }

    .gva-middle-card {
      &-item {
        line-height: 20px;
      }
    }

    .dasboard-icon {
      font-size: 18px;
    }
  }
}
</style>
