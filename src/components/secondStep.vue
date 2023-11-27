<template>
    <div>

        두번째 페이지
      <!-- <form @submit.prevent="submitForm">
        <div>
          <label for="email">이름</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div>
          <label for="password">연락처</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div>
          <label for="confirmPassword">주소</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required>
        </div>
        <div>
          <button type="submit">다음</button>
        </div>
      </form> -->
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const email = ref('');
      const password = ref('');
      const confirmPassword = ref('');
  
      const submitForm = () => {
        if (email.value && password.value && confirmPassword.value && password.value === confirmPassword.value) {
          console.log('폼이 제출되었습니다!');
        } else {
          console.log('유효하지 않은 입력입니다.');
        }
      };
  
      return {
        email,
        password,
        confirmPassword,
        submitForm
      };
    }
  };
  </script>
  
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>
  