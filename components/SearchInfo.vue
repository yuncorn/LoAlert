<template>
  <div class="SearchForm">
    <div>
      <div>
        <span>
          품질
          <select id="ItemGradeQuality" v-model="ResultJsonData.ItemGradeQuality">
            <option v-for="(item, index) in ItemGradeQualities" :key="index" :value="item">
              {{ item }}
            </option>
          </select>
        </span>
        <span>
          등급
          <select v-model="ResultJsonData.ItemGrade">
            <option v-for="(item, index) in ItemGrades" :key="index" :value="item">
              {{ item }}
            </option>
          </select>
        </span>
      </div>
      <div>
        <span>
          티어
          <select v-model="ResultJsonData.ItemTier">
            <option v-for="(item, index) in ItemTiers" :key="index" :value="item">
              {{ item }}
            </option>
          </select>
        </span>
        <span>
          직업
          <select id="CharacterClass" v-model="ResultJsonData.CharacterClass" @change="clickCharacterClass()">
            <option value="">전체</option>
            <option v-for="(item, index) in Classes" :key="index" :value="item">
              {{ item }}
            </option>
          </select>
        </span>
      </div>
      <div>
        <span>
          분류
          <select v-model="ResultJsonData.CategoryCode" @change="clickCategoryCode($event.target.value)">
            <option v-for="(item, index) in Categories" :key="index" :value="item.Code">
              {{ item.CodeName }}
            </option>
          </select>
        </span>
      </div>
    </div>
    <div>
      <h2>기타 상세옵션</h2>
      <div>
        <p>
          <select
            id="FirstOption1"
            v-model="EtcOption1.FirstOption"
            class="FirstOption"
            @change="clickFirstOption($event.target.id, $event.target.value)"
          >
            <option v-for="(item, index) in FirstOptions" :key="index" class="FirstOption1" :value="item.Value">
              {{ item.Text }}
            </option>
          </select>
          <select id="SecondOption1" v-model="EtcOption1.SecondOption"></select>
          <input v-model="EtcOption1.MinValue" type="text" placeholder="최소 수치" />
          <input v-model="EtcOption1.MaxValue" type="text" placeholder="최대 수치" />
        </p>
      </div>
      <div>
        <p>
          <select
            id="FirstOption2"
            v-model="EtcOption2.FirstOption"
            class="FirstOption"
            @change="clickFirstOption($event.target.id, $event.target.value)"
          >
            <option v-for="(item, index) in FirstOptions" :key="index" class="FirstOption2" :value="item.Value">
              {{ item.Text }}
            </option>
          </select>
          <select id="SecondOption2" v-model="EtcOption2.SecondOption"></select>
          <input v-model="EtcOption2.MinValue" type="text" placeholder="최소 수치" />
          <input v-model="EtcOption2.MaxValue" type="text" placeholder="최대 수치" />
        </p>
      </div>
      <div>
        <p>
          <select
            id="FirstOption3"
            v-model="EtcOption3.FirstOption"
            class="FirstOption"
            @change="clickFirstOption($event.target.id, $event.target.value)"
          >
            <option v-for="(item, index) in FirstOptions" :key="index" class="FirstOption3" :value="item.Value">
              {{ item.Text }}
            </option>
          </select>
          <select id="SecondOption3" v-model="EtcOption3.SecondOption"></select>
          <input v-model="EtcOption3.MinValue" type="text" placeholder="최소 수치" />
          <input v-model="EtcOption3.MaxValue" type="text" placeholder="최대 수치" />
        </p>
      </div>
      <div>
        <p>
          <select
            id="FirstOption4"
            v-model="EtcOption4.FirstOption"
            class="FirstOption"
            @change="clickFirstOption($event.target.id, $event.target.value)"
          >
            <option v-for="(item, index) in FirstOptions" :key="index" class="FirstOption4" :value="item.Value">
              {{ item.Text }}
            </option>
          </select>
          <select id="SecondOption4" v-model="EtcOption4.SecondOption"></select>
          <input v-model="EtcOption4.MinValue" type="text" placeholder="최소 수치" />
          <input v-model="EtcOption4.MaxValue" type="text" placeholder="최대 수치" />
        </p>
      </div>
      <div>
        <p>
          <select
            id="FirstOption5"
            v-model="EtcOption5.FirstOption"
            class="FirstOption"
            @change="clickFirstOption($event.target.id, $event.target.value)"
          >
            <option v-for="(item, index) in FirstOptions" :key="index" class="FirstOption5" :value="item.Value">
              {{ item.Text }}
            </option>
          </select>
          <select id="SecondOption5" v-model="EtcOption5.SecondOption"></select>
          <input v-model="EtcOption5.MinValue" type="text" placeholder="최소 수치" />
          <input v-model="EtcOption5.MaxValue" type="text" placeholder="최대 수치" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      ItemGradeQualities: [10, 20, 30, 40, 50, 60, 70, 80, 90],
      FirstOptions: [
        { Value: 0, Text: '전체' },
        { Value: 2, Text: '전투 특성' },
        { Value: 3, Text: '각인 효과' },
        { Value: 6, Text: '감소 효과' },
        { Value: 1, Text: '팔찌 기본 효과' },
        { Value: 5, Text: '팔찌 특수 효과' },
        { Value: 4, Text: '팔찌 옵션 수량' },
        { Value: 7, Text: '연마 효과' },
        { Value: 8, Text: '아크패시브' },
      ],
      SecondOptions_Stat: [
        {
          Value: 15,
          Text: '치명',
          Class: '',
        },
        {
          Value: 16,
          Text: '특화',
          Class: '',
        },
        {
          Value: 17,
          Text: '제압',
          Class: '',
        },
        {
          Value: 18,
          Text: '신속',
          Class: '',
        },
        {
          Value: 19,
          Text: '인내',
          Class: '',
        },
        {
          Value: 20,
          Text: '숙련',
          Class: '',
        },
      ],
      SecondOptions_Engrave_Common: [
        {
          Value: 118,
          Text: '원한',
          Class: '',
        },
        {
          Value: 123,
          Text: '굳은 의지',
          Class: '',
        },
        {
          Value: 237,
          Text: '실드 관통',
          Class: '',
        },
        {
          Value: 243,
          Text: '강령술',
          Class: '',
        },
        {
          Value: 247,
          Text: '저주받은 인형',
          Class: '',
        },
        {
          Value: 255,
          Text: '각성',
          Class: '',
        },
        {
          Value: 111,
          Text: '안정된 상태',
          Class: '',
        },
        {
          Value: 140,
          Text: '위기 모면',
          Class: '',
        },
        {
          Value: 238,
          Text: '달인의 저력',
          Class: '',
        },
        {
          Value: 240,
          Text: '중갑 착용',
          Class: '',
        },
        {
          Value: 242,
          Text: '강화 방패',
          Class: '',
        },
        {
          Value: 245,
          Text: '부러진 뼈',
          Class: '',
        },
        {
          Value: 248,
          Text: '승부사',
          Class: '',
        },
        {
          Value: 249,
          Text: '기습의 대가',
          Class: '',
        },
        {
          Value: 251,
          Text: '마나의 흐름',
          Class: '',
        },
        {
          Value: 254,
          Text: '돌격대장',
          Class: '',
        },
        {
          Value: 107,
          Text: '약자 무시',
          Class: '',
        },
        {
          Value: 109,
          Text: '정기 흡수',
          Class: '',
        },
        {
          Value: 110,
          Text: '에테르 포식자',
          Class: '',
        },
        {
          Value: 121,
          Text: '슈퍼 차지',
          Class: '',
        },
        {
          Value: 134,
          Text: '구슬동자',
          Class: '',
        },
        {
          Value: 141,
          Text: '예리한 둔기',
          Class: '',
        },
        {
          Value: 235,
          Text: '불굴',
          Class: '',
        },
        {
          Value: 239,
          Text: '여신의 가호',
          Class: '',
        },
        {
          Value: 244,
          Text: '선수필승',
          Class: '',
        },
        {
          Value: 142,
          Text: '급소 타격',
          Class: '',
        },
        {
          Value: 236,
          Text: '분쇄의 주먹',
          Class: '',
        },
        {
          Value: 241,
          Text: '폭발물 전문가',
          Class: '',
        },
        {
          Value: 246,
          Text: '번개의 분노',
          Class: '',
        },
        {
          Value: 253,
          Text: '바리케이드',
          Class: '',
        },
        {
          Value: 168,
          Text: '마나 효율 증가',
          Class: '',
        },
        {
          Value: 167,
          Text: '최대 마나 증가',
          Class: '',
        },
        {
          Value: 202,
          Text: '탈출의 명수',
          Class: '',
        },
        {
          Value: 288,
          Text: '결투의 대가',
          Class: '',
        },
        {
          Value: 295,
          Text: '질량 증가',
          Class: '',
        },
        {
          Value: 296,
          Text: '추진력',
          Class: '',
        },
        {
          Value: 297,
          Text: '타격의 대가',
          Class: '',
        },
        {
          Value: 298,
          Text: '시선 집중',
          Class: '',
        },
        {
          Value: 299,
          Text: '아드레날린',
          Class: '',
        },
        {
          Value: 300,
          Text: '속전속결',
          Class: '',
        },
        {
          Value: 301,
          Text: '전문의',
          Class: '',
        },
        {
          Value: 302,
          Text: '긴급구조',
          Class: '',
        },
        {
          Value: 303,
          Text: '정밀 단도',
          Class: '',
        },
      ],
      SecondOptions_Engrave_Class: [
        {
          Value: 125,
          Text: '광기',
          Class: '버서커',
        },
        {
          Value: 127,
          Text: '오의 강화',
          Class: '배틀마스터',
        },
        {
          Value: 129,
          Text: '강화 무기',
          Class: '데빌헌터',
        },
        {
          Value: 130,
          Text: '화력 강화',
          Class: '블래스터',
        },
        {
          Value: 188,
          Text: '광전사의 비기',
          Class: '버서커',
        },
        {
          Value: 189,
          Text: '초심',
          Class: '배틀마스터',
        },
        {
          Value: 190,
          Text: '극의: 체술',
          Class: '인파이터',
        },
        {
          Value: 191,
          Text: '충격 단련',
          Class: '인파이터',
        },
        {
          Value: 314,
          Text: '권왕파천무',
          Class: '브레이커',
        },
        {
          Value: 315,
          Text: '수라의 길',
          Class: '브레이커',
        },
        {
          Value: 192,
          Text: '핸드거너',
          Class: '데빌헌터',
        },
        {
          Value: 193,
          Text: '포격 강화',
          Class: '블래스터',
        },
        {
          Value: 194,
          Text: '진실된 용맹',
          Class: '바드',
        },
        {
          Value: 195,
          Text: '절실한 구원',
          Class: '바드',
        },
        {
          Value: 293,
          Text: '점화',
          Class: '소서리스',
        },
        {
          Value: 294,
          Text: '환류',
          Class: '소서리스',
        },
        {
          Value: 196,
          Text: '분노의 망치',
          Class: '디스트로이어',
        },
        {
          Value: 197,
          Text: '중력 수련',
          Class: '디스트로이어',
        },
        {
          Value: 198,
          Text: '상급 소환사',
          Class: '서머너',
        },
        {
          Value: 199,
          Text: '넘치는 교감',
          Class: '서머너',
        },
        {
          Value: 200,
          Text: '황후의 은총',
          Class: '아르카나',
        },
        {
          Value: 201,
          Text: '황제의 칙령',
          Class: '아르카나',
        },
        {
          Value: 224,
          Text: '전투 태세',
          Class: '워로드',
        },
        {
          Value: 225,
          Text: '고독한 기사',
          Class: '워로드',
        },
        {
          Value: 256,
          Text: '세맥타통',
          Class: '기공사',
        },
        {
          Value: 257,
          Text: '역천지체',
          Class: '기공사',
        },
        {
          Value: 258,
          Text: '두 번째 동료',
          Class: '호크아이',
        },
        {
          Value: 259,
          Text: '죽음의 습격',
          Class: '호크아이',
        },
        {
          Value: 276,
          Text: '절정',
          Class: '창술사',
        },
        {
          Value: 277,
          Text: '절제',
          Class: '창술사',
        },
        {
          Value: 278,
          Text: '잔재된 기운',
          Class: '블레이드',
        },
        {
          Value: 279,
          Text: '버스트',
          Class: '블레이드',
        },
        {
          Value: 280,
          Text: '완벽한 억제',
          Class: '데모닉',
        },
        {
          Value: 281,
          Text: '멈출 수 없는 충동',
          Class: '데모닉',
        },
        {
          Value: 282,
          Text: '심판자',
          Class: '홀리나이트',
        },
        {
          Value: 283,
          Text: '축복의 오라',
          Class: '홀리나이트',
        },
        {
          Value: 284,
          Text: '아르데타인의 기술',
          Class: '스카우터',
        },
        {
          Value: 285,
          Text: '진화의 유산',
          Class: '스카우터',
        },
        {
          Value: 286,
          Text: '갈증',
          Class: '리퍼',
        },
        {
          Value: 287,
          Text: '달의 소리',
          Class: '리퍼',
        },
        {
          Value: 289,
          Text: '피스메이커',
          Class: '건슬링어',
        },
        {
          Value: 290,
          Text: '사냥의 시간',
          Class: '건슬링어',
        },
        {
          Value: 291,
          Text: '일격필살',
          Class: '스트라이커',
        },
        {
          Value: 292,
          Text: '오의난무',
          Class: '스트라이커',
        },
        {
          Value: 305,
          Text: '회귀',
          Class: '도화가',
        },
        {
          Value: 306,
          Text: '만개',
          Class: '도화가',
        },
        {
          Value: 307,
          Text: '질풍노도',
          Class: '기상술사',
        },
        {
          Value: 308,
          Text: '이슬비',
          Class: '기상술사',
        },
        {
          Value: 309,
          Text: '포식자',
          Class: '슬레이어',
        },
        {
          Value: 310,
          Text: '처단자',
          Class: '슬레이어',
        },
        {
          Value: 311,
          Text: '만월의 집행자',
          Class: '소울이터',
        },
        {
          Value: 312,
          Text: '그믐의 경계',
          Class: '소울이터',
        },
      ],
      SecondOptions_Penalty: [
        {
          Value: 800,
          Text: '공격력 감소',
          Class: '',
        },
        {
          Value: 802,
          Text: '공격속도 감소',
          Class: '',
        },
        {
          Value: 801,
          Text: '방어력 감소',
          Class: '',
        },
        {
          Value: 803,
          Text: '이동속도 감소',
          Class: '',
        },
      ],
      SecondOptions_Bracelet_Basic: [
        {
          Value: 3,
          Text: '힘',
          Class: '',
        },
        {
          Value: 4,
          Text: '민첩',
          Class: '',
        },
        {
          Value: 5,
          Text: '지능',
          Class: '',
        },
        {
          Value: 6,
          Text: '체력',
          Class: '',
        },
      ],
      SecondOptions_Bracelet_Special: [
        {
          Value: 39,
          Text: '강타',
          Class: '',
        },
        {
          Value: 33,
          Text: '긴급 수혈',
          Class: '',
        },
        {
          Value: 38,
          Text: '돌진',
          Class: '',
        },
        {
          Value: 36,
          Text: '마나회수',
          Class: '',
        },
        {
          Value: 2,
          Text: '마법 방어력',
          Class: '',
        },
        {
          Value: 29,
          Text: '멸시',
          Class: '',
        },
        {
          Value: 30,
          Text: '무시',
          Class: '',
        },
        {
          Value: 1,
          Text: '물리 방어력',
          Class: '',
        },
        {
          Value: 28,
          Text: '반격',
          Class: '',
        },
        {
          Value: 31,
          Text: '반전',
          Class: '',
        },
        {
          Value: 26,
          Text: '속공',
          Class: '',
        },
        {
          Value: 35,
          Text: '앵콜',
          Class: '',
        },
        {
          Value: 37,
          Text: '오뚝이',
          Class: '',
        },
        {
          Value: 34,
          Text: '응급 처치',
          Class: '',
        },
        {
          Value: 6,
          Text: '전투 중 생명력 회복량',
          Class: '',
        },
        {
          Value: 4,
          Text: '최대 마나',
          Class: '',
        },
        {
          Value: 3,
          Text: '최대 생명력',
          Class: '',
        },
        {
          Value: 40,
          Text: '타격',
          Class: '',
        },
        {
          Value: 27,
          Text: '투자',
          Class: '',
        },
        {
          Value: 32,
          Text: '회생',
          Class: '',
        },
      ],
      SecondOptions_Bracelet_Option: [
        {
          Value: 1,
          Text: '고정 효과 수량',
          Class: '',
        },
        {
          Value: 2,
          Text: '부여 효과 수량',
          Class: '',
        },
      ],
      SecondOptions_Grinding_Effect: [
        {
          Value: 42,
          Text: '★적에게 주는 피해 증가',
          Class: '',
          Categorys: [200010],
          Tiers: null,
        },
        {
          Value: 41,
          Text: '★추가 피해',
          Class: '',
          Categorys: [200010],
          Tiers: null,
        },
        {
          Value: 45,
          Text: '★공격력 %',
          Class: '',
          Categorys: [200020],
          Tiers: null,
        },
        {
          Value: 46,
          Text: '★무기 공격력 %',
          Class: '',
          Categorys: [200020],
          Tiers: null,
        },
        {
          Value: 49,
          Text: '★치명타 적중률',
          Class: '',
          Categorys: [200030],
          Tiers: null,
        },
        {
          Value: 50,
          Text: '★치명타 피해',
          Class: '',
          Categorys: [200030],
          Tiers: null,
        },
        {
          Value: 53,
          Text: '공격력 +',
          Class: '',
          Categorys: null,
          Tiers: null,
        },
        {
          Value: 44,
          Text: '낙인력',
          Class: '',
          Categorys: [200010],
          Tiers: null,
        },

        {
          Value: 54,
          Text: '무기 공격력 +',
          Class: '',
          Categorys: null,
          Tiers: null,
        },
        {
          Value: 57,
          Text: '상태이상 공격 지속시간',
          Class: '',
          Categorys: null,
          Tiers: null,
        },
        {
          Value: 43,
          Text: '세레나데, 신성, 조화 게이지 획득량 증가',
          Class: '',
          Categorys: [200010],
          Tiers: null,
        },
        {
          Value: 51,
          Text: '아군 공격력 강화 효과',
          Class: '',
          Categorys: [200030],
          Tiers: null,
        },
        {
          Value: 52,
          Text: '아군 피해량 강화 효과',
          Class: '',
          Categorys: [200030],
          Tiers: null,
        },

        {
          Value: 58,
          Text: '전투 중 생명력 회복량',
          Class: '',
          Categorys: null,
          Tiers: null,
        },
        {
          Value: 56,
          Text: '최대 마나',
          Class: '',
          Categorys: null,
          Tiers: null,
        },
        {
          Value: 55,
          Text: '최대 생명력',
          Class: '',
          Categorys: null,
          Tiers: null,
        },
        {
          Value: 48,
          Text: '파티원 보호막 효과',
          Class: '',
          Categorys: [200020],
          Tiers: null,
        },
        {
          Value: 47,
          Text: '파티원 회복 효과',
          Class: '',
          Categorys: [200020],
          Tiers: null,
        },
      ],
      SecondOptions_Arc_Passive: [
        {
          Value: 1,
          Text: '깨달음',
          Class: '',
          Categorys: [200010, 200020, 200030],
          Tiers: [4],
        },
        {
          Value: 2,
          Text: '도약',
          Class: '',
          Categorys: [200040],
          Tiers: [4],
        },
      ],
      Categories: [
        {
          Code: 200000,
          CodeName: '전체',
        },
        {
          Code: 200010,
          CodeName: '목걸이',
        },
        {
          Code: 200020,
          CodeName: '귀걸이',
        },
        {
          Code: 200030,
          CodeName: '반지',
        },
        {
          Code: 200040,
          CodeName: '팔찌',
        },
      ],
      ItemGrades: ['일반', '고급', '희귀', '영웅', '전설', '유물', '고대', '에스더'],
      ItemTiers: [1, 2, 3, 4],
      Classes: [
        '버서커',
        '디스트로이어',
        '워로드',
        '홀리나이트',
        '슬레이어',
        '아르카나',
        '서머너',
        '바드',
        '소서리스',
        '배틀마스터',
        '인파이터',
        '기공사',
        '창술사',
        '스트라이커',
        '브레이커',
        '블레이드',
        '데모닉',
        '리퍼',
        '소울이터',
        '호크아이',
        '데빌헌터',
        '블래스터',
        '스카우터',
        '건슬링어',
        '도화가',
        '기상술사',
      ],
      ResultJsonData: {
        // default 노출값 세팅
        ItemGradeQuality: '70',
        ItemGrade: '유물',
        ItemTier: '4',
        CharacterClass: '',
        CategoryCode: 200040,
        EtcOptions: [],
        Sort: 'BUY_PRICE',
        PageNo: 1,
        SortCondition: 'ASC',
      },
      EtcOption1: {
        FirstOption: 0,
        SecondOption: 0,
        MinValue: '',
        MaxValue: '',
      },
      EtcOption2: {
        FirstOption: 0,
        SecondOption: 0,
        MinValue: '',
        MaxValue: '',
      },
      EtcOption3: {
        FirstOption: 0,
        SecondOption: 0,
        MinValue: '',
        MaxValue: '',
      },
      EtcOption4: {
        FirstOption: 0,
        SecondOption: 0,
        MinValue: '',
        MaxValue: '',
      },
      EtcOption5: {
        FirstOption: 0,
        SecondOption: 0,
        MinValue: '',
        MaxValue: '',
      },
    };
  },
  methods: {
    clickFirstOption(id, value) {
      const targetId = 'SecondOption' + id.replaceAll('FirstOption', '');

      $('#' + targetId + ' option').remove();

      let arrayObj = {};
      switch (value) {
        case '2':
          arrayObj = this.SecondOptions_Stat;
          break;
        case '3':
          if ($('#CharacterClass option:selected').val() === '') {
            arrayObj = Object.assign([], this.SecondOptions_Engrave_Common.concat(this.SecondOptions_Engrave_Class));
          } else {
            arrayObj = Object.assign([], this.SecondOptions_Engrave_Common);
          }

          arrayObj = arrayObj.sort(function (a, b) {
            const prevText = a.Text.charAt(0);
            const nextText = b.Text.charAt(0);
            if (prevText > nextText) {
              return 1;
            } else if (prevText < nextText) {
              return -1;
            } else {
              return 0;
            }
          });

          if ($('#CharacterClass option:selected').val() !== '') {
            Array.from(this.SecondOptions_Engrave_Class).forEach(i => {
              if ($('#CharacterClass option:selected').val() === i.Class) {
                arrayObj.unshift(i);
              }
            });
          }

          break;
        case '6':
          arrayObj = this.SecondOptions_Penalty;
          break;
        case '1':
          arrayObj = this.SecondOptions_Bracelet_Basic;
          break;
        case '5':
          arrayObj = this.SecondOptions_Bracelet_Special;
          break;
        case '4':
          arrayObj = this.SecondOptions_Bracelet_Option;
          break;
        case '7':
          arrayObj = this.SecondOptions_Grinding_Effect;
          break;
        case '8':
          arrayObj = this.SecondOptions_Arc_Passive;
          break;
        default:
          return;
      }

      $('#' + targetId).append('<option value="0"></option>');

      Array.from(arrayObj).forEach(i => {
        $('#' + targetId).append('<option value="' + i.Value + '">' + i.Text + '</option>');
      });
    },
    clickCategoryCode(value) {
      if (value === '200040') {
        $('#ItemGradeQuality').attr('disabled', true);
        $('#CharacterClass').attr('disabled', true);

        Array.from($('.FirstOption')).forEach(i => {
          if (i.value === '3' || i.value === '6') {
            this.clickFirstOption(i.id, 0);
          }
        });
      } else {
        $('#ItemGradeQuality').removeAttr('disabled');
        $('#CharacterClass').removeAttr('disabled');
      }
    },
    getApiJsonParams(isInit) {
      this.ResultJsonData.EtcOptions = [];

      if (this.EtcOption1.FirstOption !== 0) this.ResultJsonData.EtcOptions.push(this.EtcOption1);
      if (this.EtcOption2.FirstOption !== 0) this.ResultJsonData.EtcOptions.push(this.EtcOption2);
      if (this.EtcOption3.FirstOption !== 0) this.ResultJsonData.EtcOptions.push(this.EtcOption3);
      if (this.EtcOption4.FirstOption !== 0) this.ResultJsonData.EtcOptions.push(this.EtcOption4);
      if (this.EtcOption5.FirstOption !== 0) this.ResultJsonData.EtcOptions.push(this.EtcOption5);

      const SearchOptions = JSON.parse(sessionStorage.getItem('searchOptions'));
      if (SearchOptions !== null) {
        this.ResultJsonData.PageNo = isInit ? 1 : SearchOptions.PageNo;
        this.ResultJsonData.Sort = SearchOptions.Sort;
        this.ResultJsonData.SortCondition = SearchOptions.SortCondition;
      }

      if (this.ResultJsonData.CategoryCode === 200040) {
        const tempResultJsonData = Object.assign({}, this.ResultJsonData);
        tempResultJsonData.ItemGradeQuality = null;
        tempResultJsonData.CharacterClass = null;

        sessionStorage.setItem('searchOptions', JSON.stringify(tempResultJsonData));
        return JSON.stringify(tempResultJsonData);
      } else {
        sessionStorage.setItem('searchOptions', JSON.stringify(this.ResultJsonData));
        return JSON.stringify(this.ResultJsonData);
      }
    },
    clickCharacterClass() {
      Array.from($('.FirstOption')).forEach(i => {
        if (i.value === '3') {
          this.clickFirstOption(i.id, i.value);
        }
      });
    },
  },
};
</script>

<style>
select {
  width: 200px;
  padding: 0.8em 0.5em;
  border: 1px solid #999;
  font-family: inherit;
}
input {
  width: 100px;
  padding: 0.8em 0.5em;
  border: 1px solid #999;
  font-family: inherit;
}
.SearchForm {
  padding: 10px;
  margin: 10px;
}
</style>
