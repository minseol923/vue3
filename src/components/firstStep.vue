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
        <div v-if="!isPasswordValid && password">
          <p>비밀번호는 영문 대문자, 소문자, 숫자, 특수문자를 포함한 8자리 이상의 문자열이어야 합니다.</p>
        </div>
      </div>
      <div>
        <label for="confirmPassword">비밀번호 확인 </label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required>
        <div v-if="password !== confirmPassword && confirmPassword">
          <p>비밀번호와 비밀번호 확인이 일치하지 않습니다.</p>
        </div>
      </div>
      <div>
        <button :disabled="!isFormValid" type="submit">다음</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const router = useRouter();

    onMounted(() => {
      // 페이지가 로드될 때 로컬 스토리지에서 email과 password 셋팅
      email.value = localStorage.getItem('savedEmail') || '';
      password.value = localStorage.getItem('savedPassword') || '';
      confirmPassword.value = localStorage.getItem('savedConfirmPassword') || '';
    });

    const isPasswordValid = computed(() => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
      return passwordRegex.test(password.value);
    });

    const isFormValid = computed(() => {
      return (
        email.value &&
        password.value &&
        confirmPassword.value &&
        password.value === confirmPassword.value &&
        isPasswordValid.value
      );
    });

    const submitForm = () => {
      if (isFormValid.value) {
        console.log('폼이 제출되었습니다!');
        // 로컬 스토리지에 email과 password 저장
        localStorage.setItem('savedEmail', email.value);
        localStorage.setItem('savedPassword', password.value);
        localStorage.setItem('savedConfirmPassword', confirmPassword.value);
        router.push('/secondStep');
      } else if (password.value !== confirmPassword.value) {
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      }
    };

    return {
      email,
      password,
      confirmPassword,
      isPasswordValid,
      isFormValid,
      submitForm,
    };
  },
};
</script>
