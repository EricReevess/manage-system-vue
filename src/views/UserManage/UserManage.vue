<template>
  <div class="user-manage">
    <div class="manage-header">
      <div class="add-user">
        <el-button type="primary" @click="dialog = true">新增用户</el-button>
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
        @tableEdit="tableEdit"
        @tableDel="tableDel"
      />
    </div>
    <el-drawer
      size="30%"
      ref="drawer"
      direction="ltr"
      :visible.sync="dialog"
      :before-close="handleClose"
      :with-header="false"
      custom-class="demo-drawer"
    >
      <div class="drawer-content">
        <slot name="title">
          <h1 class="add-title">添加新用户</h1>
        </slot>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取消</el-button>
          <el-button type="primary" @click="submitForm">
            提交
          </el-button>
        </div>
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
      formLabel: {},
      formData: {},
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
    handleClose () {
      this.$confirm('确定要关闭吗？')
        .then(_ => {
          this.$message({
            type: 'info',
            message: '取消添加'
          })
          this.dialog = false
        })
        .catch(() => {
        })
    },
    cancelForm () {
      this.dialog = false
      this.$message({
        type: 'info',
        message: '取消添加'
      })
    },
    submitForm () {
      this.dialog = false
      this.$message({
        type: 'success',
        message: '添加成功'
      })
      // this.$refs.drawer.closeDrawer()
    },
    tableEdit (val) {
      console.log(val)
    },
    tableDel (val) {
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
