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
      this.$emit('tableEdit', row)
    },
    handleDelete (row) {
      // console.log(row)
      this.$emit('tableDel', row)
    },
    tableFiltersData: function (key) {
      const res = new Map()
      const tags = this.table.map(item => ({ text: item[key], value: item[key] }))
      return tags.filter(item => !res.has(item.value) && res.set(item.value, 1))
    },
    filterHandler (value, row, column) {
      const property = column.property
      return row[property] === value
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
