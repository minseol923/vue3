<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="email">이메일 </label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">비밀번호 </label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div>
        <label for="confirmPassword">비밀번호 확인 </label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required>
      </div>
      <div>
        <button type="submit">다음</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  computed: {
    isFormValid() {
      return this.email && this.password && this.confirmPassword && this.password === this.confirmPassword;
    }
  },
  methods: {
    submitForm() {
      if (this.isFormValid) {
        console.log('폼이 제출되었습니다!');
        this.$router.push('/secondStep'); 
      } else {
        console.log('유효하지 않은 입력입니다.');
      }
    },
  }
};
</script>