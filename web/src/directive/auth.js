// 权限按钮展示指令
import { useUserStore } from '@/pinia/modules/user'
import { useRouterStore } from '@/pinia/modules/router'
export default {
  install: (app) => {
    const userStore = useUserStore()
    const routerStore = useRouterStore()
    app.directive('auth', {
      // 当被绑定的元素插入到 DOM 中时……
      mounted: function(el, binding) {
        const userInfo = userStore.userInfo
        let type = ''
        switch (Object.prototype.toString.call(binding.value)) {
          case '[object Array]':
            type = 'Array'
            break
          case '[object String]':
            type = 'String'
            break
          case '[object Number]':
            type = 'Number'
            break
          default:
            type = ''
            break
        }
        if (type === '') {
          el.parentNode.removeChild(el)
          return
        }
        const waitUse = binding.value.toString().split(',')
        //-----start-----
        // 这里修改了源码逻辑，当前判断权限按钮名称是否包含在指令挂载的数据中，且角色id相等
        let btns = {}
        for(let item of routerStore.routerList) {
          if(sessionStorage.activeValue.indexOf(item.value) != -1) {
            btns = item.btns
            break
          }
        }
        let flag = false
        for(let key in btns) {
          if(waitUse.includes(key) && btns[key] === userInfo.authorityId) {
            flag = true
            break
          }
        }
        // 源码为下方注释，判断角色id是包含在指令上挂载数据中
        // let flag = waitUse.some(item => item === userInfo.authorityId)
        //-------end--------
        if (binding.modifiers.not) {
          flag = !flag
        }
        if (!flag) {
          el.parentNode.removeChild(el)
        }
      }
    })
  }
}

