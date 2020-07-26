<template>
  <div class="table-wrap">
    <el-table
      class="table"
      v-loading="tableConfig.isLoading"
      :data="table"
      border
      height="95%"
      stripe>
      <el-table-column
        label="序号"
        v-if="showIndex"
        width="50"
        :resizable="false"
      >
        <template slot-scope="scope">
          <span>{{(tableConfig.page - 1)*tableConfig.count + scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-for="(val,key) in tableLabel"
        :key="key"
        :prop="key"
        :label="val"
        :sortable="true"
        :filters="tableFiltersData(key) "
        :filter-method="filterHandler"
        :width=" key ==='name' || key ==='sex' || key ==='age' ? 100:'auto'"
      >
        <!--      使用插槽来单独控制某一列的样式-->
        <template slot-scope="scope">
          <span>{{scope.row[key]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        v-if="canOperate"
        :max-width="200"
        fixed="right"
        :resizable="false"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">Edit
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      hide-on-single-page
      layout="prev, pager, next"
      :current-page.sync="tableConfig.page"
      :page-size="tableConfig.count"
      :total="tableConfig.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'CommonTable',
  props: {
    showIndex: Boolean,
    canOperate: Boolean,
    tableConfig: {
      type: Object,
      default: () => {
        return {
          page: 1,
          count: 15,
          total: 200,
          isLoading: true
        }
      }
    },
    tableLabel: {
      type: Object,
      default: () => {
        return {}
      }
    },
    table: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    handleEdit (row) {
      // console.log(row)
      this.$emit('tableEdit', this.deepClone(row))
    },
    handleDelete (row) {
      // console.log(row)
      this.$emit('tableDel', row.id)
    },
    tableFiltersData: function (key) {
      const res = new Map()
      const tags = this.table.map(item => ({ text: item[key], value: item[key] }))
      return tags.filter(item => !res.has(item.value) && res.set(item.value, 1))
    },
    filterHandler (value, row, column) {
      const property = column.property
      return row[property] === value
    },
    deepClone (obj) {
      if (obj === null) return null
      if (typeof obj !== 'object') return obj
      if (obj.constructor === Date) return new Date(obj)
      const newObj = new obj.constructor() // 保持继承链
      for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) { // 不遍历其原型链上的属性
          const val = obj[key]
          // eslint-disable-next-line no-caller
          newObj[key] = typeof val === 'object' ? arguments.callee(val) : val // 使用arguments.callee解除与函数名的耦合
        }
      }
      return newObj
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-wrap {
    height: 100%;
  }

  .pagination {
    background-color: #fff;
    height: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
