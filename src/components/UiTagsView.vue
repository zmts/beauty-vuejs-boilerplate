<template>
  <div class="tags-view component">
    <div class="tag" v-for="tag in tags" :key="tag.id">
      <router-link :to="{ name: 'tag', params: { name: tag.name }}">{{ tag.label }}<span class="comma">,</span></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagsView',
  props: {
    tagsList: {
      type: Array,
      default: () => []
    },
    labelName: {
      type: String,
      default: 'label'
    }
  },
  computed: {
    tags () {
      return this.tagsList.map(item => ({label: item[this.labelName], ...item}))
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view.component {
  display: flex;
  flex-wrap: wrap;
  a {
    color: inherit;
    &:hover {
      opacity: 0.7;
    }
  }
  .tag{
    margin-bottom: 5px;
    margin-right: 5px;
    &:last-child .comma {
      display: none;
    }
  }
}
</style>
