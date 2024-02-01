<template>
  <div class="app">
    <h1>이벤트 목록</h1>
    <table>
      <thead>
        <td>순서</td>
        <td>이벤트</td>
      </thead>
      <tbody>
        <tr v-for="(item, index) in eventItem" :key="index">
          <th>{{ index }}</th>
          <th>
            <tr>
              <span>
                <a :href="item.Link"> {{ item.Title }}</a>
              </span>
            </tr>

            <tr>
              <img :src="item.Thumbnail" alt="" />
            </tr>
            <tr>
              이벤트 시작일 :
              {{
                item.StartDate
              }}
            </tr>
            <tr>
              이벤트 종료일 :
              {{
                item.EndDate
              }}
            </tr>
            <tr v-if="item.RewardDate !== null">
              보상 수령일 :
              {{
                item.RewardDate
              }}
            </tr>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      eventItem: [],
    };
  },
  created() {
    this.test();
  },
  updated() {},
  methods: {
    async test() {
      await this.$store.dispatch('FETCH_NEWS_EVENTS').then(() => {
        this.eventItem = this.$store.state.newsItems.response.data;
        console.log(this.$store.state.newsItems.response.data);
      });
    },
  },
};
</script>

<style scoped>
body {
  font: 90%/1.4 system-ui;
  margin: 0;
  font-family: sans-serif;
}
header {
  padding: 7vh 5vw;
  border-bottom: 1px solid #ddd;
}
header h1,
header p {
  margin: 0;
}
footer {
  padding: 7vh 5vw;
  border-top: 1px solid #ddd;
}
aside {
  padding: 7vh 5vw;
}
.primary {
  overflow: auto;
  scroll-snap-type: both mandatory;
  height: 80vh;
}
@media (min-width: 40em) {
  main {
    display: flex;
  }
  aside {
    flex: 0 1 20vw;
    order: 1;
    border-right: 1px solid #ddd;
  }
  .primary {
    order: 2;
  }
}
table {
  border-collapse: collapse;
  border: 0;
}
th,
td {
  border: 1px solid #aaa;
  background-clip: padding-box;
  scroll-snap-align: start;
}
tbody tr:last-child th,
tbody tr:last-child td {
  border-bottom: 0;
}
td {
  padding: 0.6rem;
  min-width: 6rem;
  text-align: center;
  margin: 0;
}
</style>
