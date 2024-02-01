<template>
  <div>
    <h2>검색결과</h2>
    <div class="searchResult" style="overflow-x: auto">
      <table>
        <tr id="tableHeader">
          <th colspan="4">아이템정보</th>
          <th id="ITEM_QUALITY" class="ASC" @click="changeSort">
            품질 <span></span>
          </th>
          <th id="EXPIREDATE" class="ASC" @click="changeSort">
            남은시간 <span></span>
          </th>
          <th id="BIDSTART_PRICE" class="ASC" @click="changeSort">
            최소입찰가 <span></span>
          </th>
          <th id="BUY_PRICE" class="ASC" @click="changeSort">
            즉시구매가 <span></span>
          </th>
        </tr>
        <tr v-if="isEmptyResult">
          <td colspan="8">
            <h3>검색 결과가 없습니다.</h3>
          </td>
        </tr>
        <tr v-for="(item, index) in SearchResult" v-else :key="index">
          <td style="width: 80px">
            <img :src="item.Icon" alt="" />
          </td>
          <td style="width: 190px">
            <p>[{{ item.Tier }}티어 {{ item.Grade }}]</p>
            <p>{{ item.Name }}</p>
            <p>[구매 시 거래 {{ item.AuctionInfo.TradeAllowCount }}회 가능]</p>
          </td>
          <td style="width: 100px">
            <p
              v-for="(option, idx) in item.Options.filter(
                o => o.Type === 'STAT',
              )"
              :key="idx"
            >
              {{ option.OptionName }} +{{ option.Value }}
            </p>
          </td>
          <td style="width: 180px">
            <p
              v-for="(option, idx) in item.Options.filter(
                o => o.Type !== 'STAT',
              )"
              :key="idx"
            >
              <span :class="option.IsPenalty ? 'isPenalty' : null"
                >[{{ option.OptionName }}]</span
              >
              +{{ option.Value }}
            </p>
          </td>
          <td style="width: 220px">
            <p>{{ item.GradeQuality }}</p>
            <progress
              :class="getGradeQualityClass(item.GradeQuality)"
              :value="item.GradeQuality"
              max="100"
            ></progress>
          </td>
          <td style="width: 150px">
            <p>{{ getRemainTime(item.AuctionInfo.EndDate) }}</p>
          </td>
          <td style="width: 150px">
            <p>
              {{
                item.AuctionInfo.BidPrice !== '0'
                  ? item.AuctionInfo.BidStartPrice.toLocaleString()
                  : item.AuctionInfo.BidPrice.toLocaleString()
              }}
            </p>
          </td>
          <td style="width: 150px">
            <p>
              {{
                item.AuctionInfo.BuyPrice !== null
                  ? item.AuctionInfo.BuyPrice.toLocaleString()
                  : '-'
              }}
            </p>
          </td>
        </tr>
      </table>
      <paging :page="page" @onPage="onPage" />
    </div>
  </div>
</template>

<script>
import paging from '@/components/Paging.vue';

export default {
  components: {
    paging,
  },
  data() {
    return {
      page: {
        total: 0,
        page: 0,
        count: 0,
      },
      SearchResult: {},
      SearchOptions: {},
      isEmptyResult: false,
    };
  },
  methods: {
    onPage(pageNo) {
      this.SearchOptions = JSON.parse(sessionStorage.getItem('searchOptions'));
      this.SearchOptions.PageNo = pageNo;
      sessionStorage.setItem(
        'searchOptions',
        JSON.stringify(this.SearchOptions),
      );

      this.$emit('search_items', false);
    },
    changeSort(event) {
      const currentSortCondition = event.target.className.replaceAll(
        ' active',
        '',
      );
      const targetSortCondition =
        currentSortCondition === 'ASC' ? 'DESC' : 'ASC';

      this.SearchOptions = JSON.parse(sessionStorage.getItem('searchOptions'));
      this.SearchOptions.Sort = event.target.id;
      this.SearchOptions.SortCondition = targetSortCondition;
      sessionStorage.setItem(
        'searchOptions',
        JSON.stringify(this.SearchOptions),
      );

      event.target.classList.remove(currentSortCondition);
      event.target.classList.add(targetSortCondition);
      this.$emit('search_items', false);
    },
    setSearchResult(items) {
      this.SearchResult = items.Items;

      if (this.SearchResult === null) {
        this.isEmptyResult = true;
      } else {
        this.isEmptyResult = false;
        this.page.total = items.TotalCount;
        this.page.page = items.PageNo;
        this.page.count = Object.keys(items.Items).length;

        Array.from(document.getElementById('tableHeader').children).forEach(
          (e, index) => {
            if (index > 0) {
              e.classList.remove('active');
            }
          },
        );

        this.SearchOptions = JSON.parse(
          sessionStorage.getItem('searchOptions'),
        );
        const targetElem = document.getElementById(this.SearchOptions.Sort);
        targetElem.classList.add('active');
      }
    },
    getRemainTime(time) {
      const xmasDay = new Date(time);
      const currDay = new Date();

      let diff = xmasDay - currDay;

      if (diff <= 0) {
        return '판매시간 종료';
      }
      const diffDays = Math.floor(
        (xmasDay.getTime() - currDay.getTime()) / (1000 * 60 * 60 * 24),
      );
      diff -= diffDays * (1000 * 60 * 60 * 24);
      const diffHours = Math.floor(diff / (1000 * 60 * 60));
      diff -= diffHours * (1000 * 60 * 60);
      const diffMin = Math.floor(diff / (1000 * 60));
      diff -= diffMin * (1000 * 60);
      const diffSec = Math.floor(diff / 1000);

      let remainTime = '';
      if (diffDays > 0) {
        remainTime += diffDays + '일 ';
      }
      if (diffHours > 0) {
        remainTime += diffHours + '시간 ';
      }
      if (diffMin > 0) {
        remainTime += diffMin + '분';
      }
      if (diffDays === 0 && diffHours === 0 && diffMin === 0) {
        remainTime += diffSec + '초';
      }

      return remainTime;
    },
    getGradeQualityClass(qty) {
      if (qty > 99) {
        return 'orange';
      } else if (qty > 89) {
        return 'violet';
      } else if (qty > 69) {
        return 'blue';
      } else if (qty > 29) {
        return 'green';
      } else if (qty > 9) {
        return 'yellow';
      } else if (qty > 0) {
        return 'red';
      } else {
        return 'gray';
      }
    },
  },
};
</script>

<style>
.searchResult {
  display: block;
  text-align: center;
}
.isPenalty {
  color: rgba(255, 0, 0, 0.747);
}
progress {
  appearance: none;
}
progress::-webkit-progress-bar {
  background-color: #ffffff;
  border: 1px solid #cccccc;
}

progress.orange::-webkit-progress-value {
  background-color: rgb(238, 204, 9);
}
progress.violet::-webkit-progress-value {
  background-color: rgb(212, 3, 212);
}
progress.blue::-webkit-progress-value {
  background-color: rgb(7, 95, 228);
}
progress.green::-webkit-progress-value {
  background-color: rgb(39, 173, 13);
}
progress.yellow::-webkit-progress-value {
  background-color: rgb(236, 236, 13);
}
progress.red::-webkit-progress-value {
  background-color: rgb(255, 0, 0, 0.747);
}
progress.gray::-webkit-progress-value {
  background-color: rgba(128, 128, 128, 0.507);
}
table {
  border-collapse: collapse;
  width: 1220px;
}
table,
th,
td {
  border: 1px solid rgba(255, 255, 255, 0.747);
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

th {
  background-color: #04aa6d;
  color: white;
}

th.active {
  border: 3px solid rgb(57, 95, 69);
}
.ASC span {
  position: relative;
  pointer-events: none;
}

.ASC span::after {
  content: '';
  width: 20px; /* 사이즈 */
  height: 20px; /* 사이즈 */
  border-top: 2px solid white; /* 선 두께 */
  border-right: 2px solid white; /* 선 두께 */
  display: inline-block;
  transform: rotate(315deg); /* 각도 */
  position: relative;
  top: 0px; /* 기본 0px 값으로 해주세요 */
  left: 0px; /* 기본 0px 값으로 해주세요 */
}

.DESC span {
  position: relative;
  pointer-events: none;
}

.DESC span::after {
  content: '';
  width: 20px; /* 사이즈 */
  height: 20px; /* 사이즈 */
  border-top: 2px solid white; /* 선 두께 */
  border-right: 2px solid white; /* 선 두께 */
  display: inline-block;
  transform: rotate(135deg); /* 각도 */
  position: relative;
  top: 0px; /* 기본 0px 값으로 해주세요 */
  left: 0px; /* 기본 0px 값으로 해주세요 */
}
</style>
