<template>
  <div>
    내부1<input v-model="inner1" type="text" /><br />
    외부1-1<input v-model="outer1" type="text" /><br />
    외부1-2<input v-model="outer2" type="text" /><br />
    내부2<input v-model="inner2" type="text" /><br />
    외부2-1<input v-model="outer3" type="text" /><br />
    외부2-2<input v-model="outer4" type="text" /><br />
    <textarea v-model="textarea" cols="10" rows="6" />
    <input id="copyText" ref="copy" v-model="copyText" hidden type="text" />
    <button @click="copy">복사</button>
    <div>
      <p>내부 진입(딜러) 11/3/7 | 외부 대기(딜러) 1/5/9 | 폿 저가</p>
      <p></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inner1: '',
      outer1: '',
      outer2: '',
      inner2: '',
      outer3: '',
      outer4: '',
      copyText: '',
      textarea: '',
    };
  },
  methods: {
    copy() {
      const array = this.textarea.split('\n');
      this.copyText = `내부는 자기 장판(${array[0]}시, ${array[3]}시) 지우고 // 첫번째 외부 ${array[1]}시, ${array[2]}시 정화 // 두번째 외부 ${array[4]}시, ${array[5]}시 정화`;
      // this.copyText = `내부는 자기 장판(${this.inner1}시, ${this.inner2}시) 지우고 // 첫번째 외부 ${this.outer1}시, ${this.outer2}시 정화 // 두번째 외부 ${this.outer3}시, ${this.outer4}시 정화`;
      console.log(this.copyText);
      navigator.clipboard.writeText(this.copyText);
    },
  },
};
</script>

<style></style>
