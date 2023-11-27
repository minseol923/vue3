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
  created() {
    // 페이지가 로드될 때 로컬 스토리지에서 email과 password를 불러옵니다.
    this.email = localStorage.getItem('savedEmail') || '';
    this.password = localStorage.getItem('savedPassword') || '';
    this.confirmPassword = localStorage.getItem('savedConfirmPassword') || '';

  },
  computed: {
    isFormValid() {
      return (
        this.email &&
        this.password &&
        this.confirmPassword &&
        this.password === this.confirmPassword &&
        this.isPassword(this.password)
      );
    }
  },
  methods: {
    submitForm() {
      if (this.isFormValid) {
        console.log('폼이 제출되었습니다!');
        // 로컬 스토리지에 email과 password 저장
        localStorage.setItem('savedEmail', this.email);
        localStorage.setItem('savedPassword', this.password);
        localStorage.setItem('savedConfirmPassword', this.confirmPassword);
        this.$router.push('/secondStep'); 
      } else if( this.password !== this.confirmPassword) {
        alert('비밀번호 확인을 다시 입력해주세요.');
      } else {
        alert('비밀번호에는 영문 대문자, 소문자, 숫자, 특수문자를 포함한 8자리 이상의 문자열이 필요합니다.');
      }
    },
    //비밀번호 유효성 검사
    isPassword(password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
      return passwordRegex.test(password);
    }
  }
};
</script>
