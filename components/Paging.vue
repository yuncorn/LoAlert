<template>
  <div v-if="page.total > 0" class="pagination">
    <p v-if="startPage > defaultPages">
      <a @click="prevPages()">《 이전</a>
    </p>
    <a
      v-for="item in countInPages"
      :key="item"
      :class="startPage - 1 + item == page.page ? 'active' : null"
      @click="selectPage(startPage - 1 + item)"
    >
      {{ startPage - 1 + item }}
    </a>
    <p v-if="startPage + defaultPages <= totalPage">
      <a @click="nextPages()">다음 》</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'PagingView',
  props: {
    page: {
      type: Object,
      default() {
        return {
          total: 0,
          page: 0,
          count: 0,
        };
      },
    },
    defaultPages: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    // 현재 화면의 시작 페이징 번호
    startPage: function () {
      const value = Math.floor((this.page.page - 1) / this.defaultPages) * this.defaultPages + 1;
      return value;
    },
    // 전체 페이징 리스트
    totalPage: function () {
      return Math.floor(this.page.total / this.page.count) + (this.page.total % this.page.count === 0 ? 0 : 1);
    },
    // 현재 화면의 페이징 리스트 개수
    countInPages: function () {
      const currPages = this.totalPage - (this.startPage - 1);

      return currPages <= this.defaultPages ? currPages : this.defaultPages;
    },
  },
  methods: {
    selectPage: function (page) {
      this.$emit('onPage', page);
    },
    prevPages: function () {
      this.selectPage(this.startPage - 1);
    },
    nextPages: function () {
      this.selectPage(this.startPage + this.defaultPages);
    },
  },
};
</script>

<style scoped>
.pagination {
  width: 700px;
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 6px 12px;
  text-decoration: none;
}

.pagination a.active {
  background-color: #4caf50;
  color: white;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}
</style>
