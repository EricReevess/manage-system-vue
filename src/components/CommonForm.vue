<template>
  <el-form
    :inline="inline"
    :model="privateForm"
    ref="ruleForm"
    class="demo-form-inline">
    <!--    利用表单配置数据formLabel来配置所需要的表单组件-->
    <el-form-item
      v-for="(item, index) in formLabel"
      :label="(item.type === 'submit' || item.type === 'reset') ? '': item.label  "
      :key="index"
      :prop="item.key"
    >
      <el-input
        v-if="item.type === 'input'"
        :placeholder="`请输入${item.label}`"
        v-model="privateForm[item.key]"
        :style="item.width? `width: ${item.width};`: null"
      />
      <el-input
        v-if="item.type === 'search'"
        :placeholder="`请输入${item.searchKey}`"
        v-model="privateForm[item.key]"
        :style="item.width? `width: ${item.width};`: null"
      />
      <el-select
        v-if="item.type === 'select'"
        v-model="privateForm[item.key]"
        :placeholder="`请选择${item.label}`">
        <el-option
          v-for="(optionItem,index) in item.options "
          :key="index"
          :label="optionItem.label"
          :value="optionItem.value"/>
      </el-select>
      <el-date-picker
        v-if="item.type === 'date-picker'"
        type="date"
        :placeholder="`选择${item.label}`"
        v-model="privateForm[item.key]"
        :style="item.width? `width: ${item.width};`: null"/>
      <el-time-picker
        v-if="item.type === 'time-picker'"
        :placeholder="`选择${item.label}`"
        v-model="privateForm[item.key]"
        :style="item.width? `width: ${item.width};`: null"/>
      <el-switch
        v-if="item.type === 'switch'"
        v-model="privateForm[item.key]"/>
      <el-checkbox-group
        v-if="item.type === 'checkbox-group'"
        v-model="privateForm[item.key]">
        <el-checkbox
          border
          v-for="(label, index) in item.checkboxLabels"
          :label="label"
          :key="index"
          :name="item.type"/>
      </el-checkbox-group>
      <el-radio-group
        v-if="item.type === 'radio-group'"
        v-model="privateForm[item.key]">
        <el-radio
          v-for="(labels,index) in item.radioLabels"
          :key="index"
          :label="labels"/>
      </el-radio-group>
      <el-input
        v-if="item.type === 'textarea'"
        type="textarea"
        v-model="privateForm[item.key]"
        :style="item.width? `width: ${item.width};`: null"/>
      <el-button
        v-if="item.type === 'submit'"
        type="primary"
        @click="onSubmit"
        :style="item.width? `width: ${item.width};`: null">
        {{item.label || '提交'}}
      </el-button>
      <el-button
        v-if="item.type === 'reset'"
        :style="item.width? `width: ${item.width};`: null"
        @click="resetForm('ruleForm')">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CommonForm',
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formLabel: {
      type: Array,
      default: () => {
        return []
      }
    },
    inline: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      privateForm: {}
    }
  },
  methods: {
    onSubmit () {
      // 在这触发父级传递的函数，或者触发父级的自定义事件
      this.$emit('formSubmit', this.privateForm)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted () {
    this.privateForm = this.form
  }
}
</script>

<style lang="scss" scoped>

</style>
