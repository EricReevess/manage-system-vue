<template>
  <el-row class="tags">
    <el-tag
      :key="tag.name"
      v-for="tag in tagsList"
      closable
      effect="dark"
      :color="$route.name === tag.name ? '#e7604a': '#909399'"
      :disable-transitions="false"
      @close="handleClose(tag.name)"
      @click="handleClick(tag)">
      {{tag.label}}
    </el-tag>
  </el-row>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'CommonTags',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      tagsList: state => state.headerNav.tagsList
    })
  },
  methods: {
    ...mapMutations({
      selectMenu: 'selectMenu',
      closeTag: 'closeTag'
    }),
    handleClose (name) {
      this.closeTag(name)
    },
    handleClick (tag) {
      this.$router.push({ name: tag.name })
      this.selectMenu(tag)
    }
  }
}
</script>

<style lang="scss" scoped>
  .tags {
    width: 80%;
    height: 40px;
    line-height: 40px;
    background-color: inherit;
  }

  .el-tag {
    cursor: pointer;
    border: none;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }

</style>
