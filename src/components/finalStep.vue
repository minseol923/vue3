<template>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <label for="cardNumber">카드번호</label>
          <input v-model="cardNumber[0]" maxlength="4" required>
          <input v-model="cardNumber[1]" maxlength="4" required>
          <input v-model="cardNumber[2]" maxlength="4" required>
          <input v-model="cardNumber[3]" maxlength="4" required>
        </div>
        <div>
          <button type="submit">완료</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cardNumber: ['', '', '', '']
      };
    },
    computed: {
      isValidCardNumber() {
        const flattened = this.cardNumber.join(''); // 카드번호를 합쳐서 하나의 문자열로 만듦
        if (flattened.length !== 16 || isNaN(flattened)) {
          return false;
        }
  
        let sum = 0;
        for (let i = 0; i < flattened.length; i++) {
          let digit = parseInt(flattened[i], 10);
  
          // 짝수 자릿수면서 9를 넘어가면 각 자릿수를 더함
          if ((i + 1) % 2 === 0) {
            digit *= 2;
            if (digit > 9) {
              digit = digit - 9;
            }
          }
          sum += digit;
        }
        
        // 유효성 검사
        return sum % 10 === 0;
      }
    },
    methods: {
      submitForm() {
        if (this.isValidCardNumber) {
          console.log('폼이 유효합니다. 제출됨!');
          // 여기에 제출 로직 추가
        } else {
          console.log('유효하지 않은 입력입니다.');
        }
      }
    }
  };
  </script>