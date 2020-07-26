<template>
  <div class="user-manage">
    <div class="manage-header">
      <div class="add-user">
        <el-button
          type="primary"
          @click="drawerOpenHandler({title: '添加新用户',type: '添加'})">
          新增用户
        </el-button>
      </div>
      <common-form :form-label="searchFormLabel" :form="searchFormData"/>
    </div>
    <div class="manage-content">
      <common-table
        :table-label="tableLabel"
        :table="tableData"
        :tableConfig="tableConfig"
        can-operate
        showIndex
        @tableEdit="tableEditHandler($event,{title: '编辑用户信息',type: '修改'})"
        @tableDel="tableDelHandler"
      />
    </div>
    <el-drawer
      size="400px"
      ref="drawer"
      direction="ltr"
      :visible.sync="dialog"
      :before-close="drawerCloseHandler"
      :with-header="false"
      custom-class="demo-drawer"
    >
      <div class="drawer-content">
        <slot name="title">
          <h1 class="add-title">{{dialogConfig.title}}</h1>
        </slot>
        <common-form
          :inline="false"
          :form-label="formLabel"
          :form="formData"
          @formSubmit="tableAddHandler"/>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import CommonForm from '../../components/CommonForm'
import CommonTable from '../../components/CommonTable'

export default {
  name: 'UserManage',
  components: { CommonTable, CommonForm },
  data () {
    return {
      dialog: false,
      dialogConfig: {
        title: '',
        type: ''
      },
      searchFormLabel: [
        {
          type: 'search', // 表单控件类型,这里将input增加了一个搜索的类型
          label: '搜索', // 表单前面的描述
          searchKey: '用户名', // 搜索框使用的placeholder
          key: 'keyword', // 表单数据中的键名
          width: '100%' // 输入框的宽度，默认为auto
        },
        {
          type: 'submit', // 按钮类型有两种：reset和submit,
          label: '搜索' // submit点击后会触发formSubmit事件,并抛出一个表单值对象
        }
      ],
      searchFormData: {
        keyword: ''
      },
      formLabel: [
        {
          type: 'input',
          label: '姓名',
          key: 'name'
        },
        {
          type: 'input',
          label: '年龄',
          key: 'age'

        },
        {
          type: 'radio-group',
          label: '性别',
          key: 'sex',
          radioLabels: [
            '男',
            '女'
          ]
        },
        {
          type: 'date-picker',
          label: '生日',
          key: 'birth'

        },
        {
          type: 'textarea',
          label: '地址',
          key: 'addr'

        },
        {
          type: 'submit',
          width: '100%'
        },
        {
          type: 'reset',
          width: '100%'
        }
      ],
      formData: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: ''
      },
      tableLabel: {
        name: '姓名',
        age: '年龄',
        sex: '性别',
        birth: '生日',
        addr: '地址'
      },
      tableData: [],
      tableConfig: {
        page: 1,
        count: 15,
        total: 30,
        isLoading: true
      }
    }
  },
  methods: {
    drawerOpenHandler (config) {
      this.dialog = true
      this.dialogConfig = config
    },
    drawerCloseHandler () {
      this.$confirm('确定要关闭吗？')
        .then(_ => {
          this.$message({
            type: 'info',
            message: `取消${this.dialogConfig.type}`
          })
          this.dialog = false
        })
        .catch(() => {
        })
    },
    drawerCancelHandler () {
      this.dialog = false
      this.$message({
        type: 'info',
        message: `取消${this.dialogConfig.type}`
      })
    },
    drawerSubmitHandler () {
      this.dialog = false
      // 在此处理 修改 新增 操作
      this.$message({
        type: 'success',
        message: `${this.dialog.type}成功`
      })
      // this.$refs.drawer.closeDrawer()
    },
    tableAddHandler (val) {
      this.drawerSubmitHandler()
      console.log(val)
      // 清空对象
      for (const key in this.formData) {
        this.formData[key] = ''
      }
    },
    tableEditHandler (val, config) {
      this.dialogConfig = config
      this.formData = val
      this.dialog = true
      console.log(val)
    },
    tableDelHandler (val) {
      console.log(val)
    },
    getTableData () {
      this.tableConfig.isLoading = true
      this.$httpRequest.get('/user/getUser', {
        params: {
          page: this.tableConfig.page,
          limit: this.tableConfig.count
        }
      }).then(
        res => {
          const { list } = res.data
          console.log(this.tableData)
          this.tableData = list.map(item => {
            item.sex = item.sex ? '女' : '男'
            return item
          })
          this.tableConfig.total = res.data.count
          this.tableConfig.isLoading = false
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
    }
  },
  watch: {
    // 监视tableConfig.page属性
    'tableConfig.page': {
      handler: function () {
        this.getTableData()
      }
    }
  },
  created () {
    this.getTableData()
  }
}
</script>

<style lang="scss" scoped>
  @import './src/assets/scss/user-manage';
</style>
