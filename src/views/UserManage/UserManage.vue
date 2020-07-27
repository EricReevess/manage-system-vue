<template>
  <div class="user-manage">
    <el-dialog
      width="500px"
      :title="dialogTypes[dialogType]"
      :before-close="dialogCloseHandler"
      :visible.sync="dialogFormVisible">
      <common-form
        :inline="false"
        :form-label="formLabel"
        :form.sync="dialogFormData"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCloseHandler">取 消</el-button>
        <el-button type="primary" @click="dialogFormSubmit">提 交</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <div class="add-user">
        <el-button
          type="primary"
          @click="tableAddHandler">
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
        @tableEdit="tableEditHandler"
        @tableDel="tableDelHandler"
      />
    </div>
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
      dialogFormVisible: false,
      dialogType: 'add',
      dialogTypes: {
        add: '添加',
        edit: '修改',
        del: '删除'
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
            {
              label: '女',
              value: 0
            },
            {
              label: '男',
              value: 1
            }
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

        }
      ],
      dialogFormData: {
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
    dialogFormSubmit () {
      // 在这里调用接口提交dialogFormData数据
      if (this.dialogType === 'edit') {
        this.dialogFormData.sex = this.dialogFormData.sex ? '男' : '女'
        const temp = this.tableData.filter(item => {
          if (item.id === this.dialogFormData.id) {
            return item
          }
        })
        console.log(JSON.stringify(temp[0]))
        console.log(JSON.stringify(this.dialogFormData))
        if (JSON.stringify(temp[0]) === JSON.stringify(this.dialogFormData)) {
          this.$message({
            showClose: true,
            type: 'warning',
            center: true,
            message: '您未做任何修改'
          })
          this.dialogFormData.sex = this.dialogFormData.sex === '女' ? 0 : 1
          return
        }
      }
      this.dialogFormData.sex = this.dialogFormData.sex === '女' ? 0 : 1
      this.operateTableData(this.dialogType, this.dialogFormData)
      this.dialogFormVisible = false
    },
    dialogCloseHandler () {
      this.$confirm(`确定要取消${this.dialogTypes[this.dialogType]}吗？`, {
        distinguishCancelAndClose: true,
        confirmButtonText: `放弃${this.dialogTypes[this.dialogType]}`,
        cancelButtonText: `继续${this.dialogTypes[this.dialogType]}`
      })
        .then(_ => {
          this.$message({
            showClose: true,
            type: 'warning',
            center: true,
            message: `放弃${this.dialogTypes[this.dialogType]}`
          })
          this.dialogFormVisible = false
          this.clearFormData()
        })
        .catch(() => {
        })
    },
    tableAddHandler () {
      this.dialogType = 'add'
      this.dialogFormVisible = true
    },
    tableEditHandler (val) {
      this.dialogType = 'edit'
      val.sex = val.sex === '女' ? 0 : 1
      this.dialogFormData = val
      this.dialogFormVisible = true
    },
    tableDelHandler (val) {
      this.dialogType = 'del'
      this.$confirm('确定要删除吗？')
        .then(_ => {
          this.operateTableData(this.dialogType, val)
        })
        .catch(() => {
        })
      console.log(val)
    },
    clearFormData () {
      for (const key in this.dialogFormData) {
        this.dialogFormData[key] = ''
      }
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
          this.tableData = list.map(item => {
            item.sex = !item.sex ? '女' : '男'
            return item
          })
          console.log(this.tableData === list)
          console.log()
          this.tableConfig.total = res.data.count
          this.tableConfig.isLoading = false
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
    },
    operateTableData (operateType, data) {
      this.$httpRequest.post(`/user/${operateType}`, data).then(
        res => {
          if (res.data.code === 20000) {
            this.$message({
              showClose: true,
              type: 'success',
              center: true,
              message: res.data.data.message
            })
            this.clearFormData()
            this.getTableData()
          }
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
