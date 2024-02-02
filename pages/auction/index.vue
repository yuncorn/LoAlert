<template>
  <div>
    <search-info ref="search_info"></search-info>
    <button id="search" @click="fetchAuctionsItems(true)">일반검색</button>
    <button @click="fetchAuctionsItemsAlertStart()">알림시작</button>
    <button @click="fetchAuctionsItemsAlertStop()">알림종료</button>
    <search-result
      ref="search_result"
      @search_items="fetchAuctionsItems"
      @search_alert_items="fetchAuctionsItemsAlertInterval"
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
      await this.$store.dispatch('FETCH_AUCTIONS_ITEMS', this.$refs.search_info.getApiJsonParams(isInit)).then(() => {
        this.$refs.search_result.setSearchResult(this.$store.state.auctionItems.response.data);
      });
    },
    async fetchAuctionsItemsAlertStart() {
      Notification.requestPermission().then(function (permission) {
        console.log('permission', permission);
      });

      await this.$store.dispatch('FETCH_AUCTIONS_ITEMS', this.$refs.search_info.getApiJsonParams(true)).then(() => {
        document.getElementById('search').style.display = 'none';
        this.$refs.search_result.setSearchAlertResult(this.$store.state.auctionItems.response.data, true);
      });
    },
    async fetchAuctionsItemsAlertInterval() {
      await this.$store.dispatch('FETCH_AUCTIONS_ITEMS', sessionStorage.getItem('searchAlertOptions')).then(() => {
        this.$refs.search_result.setSearchAlertResult(this.$store.state.auctionItems.response.data, false);
      });
    },
    fetchAuctionsItemsAlertStop() {
      document.getElementById('search').style.display = 'inline-block';
      this.$refs.search_result.stopSearchAlert();
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
button {
  margin: 0;
  padding: 0.5rem 1rem;

  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;

  display: inline-block;
  width: auto;

  border-radius: 4px;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  cursor: pointer;

  transition: 0.5s;
}
button:active,
button:hover,
button:focus {
  background: var(--button-hover-bg-color);
  outline: 0;
}
button:disabled {
  opacity: 0.5;
}
</style>
