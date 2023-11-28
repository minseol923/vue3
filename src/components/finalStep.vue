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
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';

  
  export default {
    setup() {
      const cardNumber = ref(['', '', '', '']);
      const router = useRouter();
  
      const isValidCardNumber = computed(() => {
        const flattened = cardNumber.value.join('');
        if (flattened.length !== 16 || isNaN(flattened)) {
          return false;
        }
  
        let sum = 0;
        for (let i = 0; i < flattened.length; i++) {
          let digit = parseInt(flattened[i], 10);
  
          if ((i + 1) % 2 === 0) {
            digit *= 2;
            if (digit > 9) {
              digit = digit - 9;
            }
          }
          sum += digit;
        }
        
        return sum % 10 === 0;
      });
  
      const submitForm = () => {
        if (!isValidCardNumber.value) {
          alert("유효하지 않는 카드 번호 입니다.");
        } else {
          console.log("제출 완료");
          router.push('/infoPage') 
        }
      };
  
      return {
        cardNumber,
        isValidCardNumber,
        submitForm,
      };
    },
  };
  </script>
  