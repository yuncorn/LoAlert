import { fetchNewsEvents, fetchAuctionsItems } from '~/api';

export const FETCH_CART_ITEMS = 'FETCH_CART_ITEMS';

export const state = () => ({
  newsItems: [],
  auctionItems: [],
});

export const mutations = {
  SET_NEWS_EVENTS(state, item) {
    state.newsItems = item;
  },
  SET_AUCTION_ITEMS(state, item) {
    state.auctionItems = item;
  },
};

export const actions = {
  async FETCH_NEWS_EVENTS({ commit }) {
    await fetchNewsEvents().then(response => {
      commit('SET_NEWS_EVENTS', { response });
    });
  },
  async FETCH_AUCTIONS_ITEMS({ commit }, payload) {
    await fetchAuctionsItems(payload).then(response => {
      commit('SET_AUCTION_ITEMS', { response });
    });
  },
};
