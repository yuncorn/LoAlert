<template>
  <div>
    <search-info ref="search_info"></search-info>
    <button @click="fetchAuctionsItems(true)">검색</button>
    <button @click="미정;">실행</button>
    <search-result
      ref="search_result"
      @search_items="fetchAuctionsItems"
    ></search-result>
  </div>
</template>

<script>
import SearchInfo from '~/components/SearchInfo.vue';
import SearchResult from '~/components/SearchResult.vue';

export default {
  components: {
    SearchInfo,
    SearchResult,
  },
  data() {},
  methods: {
    async fetchAuctionsItems(isInit) {
      await this.$store
        .dispatch(
          'FETCH_AUCTIONS_ITEMS',
          this.$refs.search_info.getApiJsonParams(isInit),
        )
        .then(() => {
          this.$refs.search_result.setSearchResult(
            this.$store.state.auctionItems.response.data,
          );
        });
    },
  },
};
</script>

<style>
h2 {
  font-size: 16px;
  line-height: 1.38;
  color: black;
  padding: 8px;
}
h3 {
  font-size: 14px;
  line-height: 1.38;
  color: black;
  padding: 8px;
  text-align: center;
}
</style>
