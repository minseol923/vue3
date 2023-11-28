<template>
  <div>
    <h1>회원가입 완료</h1>
    <div>
      <p>"{{ savedName }}"님, 회원가입이 완료 되었습니다.</p>
      <p>이메일: {{ savedEmail }}</p>
      <p>주소: {{ savedAddress }}</p>
      <p>전화번호: {{ savedPhoneNumber }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const savedName = ref('');
    const savedEmail = ref('');
    const savedAddress = ref('');
    const savedPhoneNumber = ref('');

    onMounted(() => {
      savedName.value = localStorage.getItem('savedName') || '';
      savedEmail.value = localStorage.getItem('savedEmail') || '';
      savedAddress.value = localStorage.getItem('savedAddress') || '';
      savedPhoneNumber.value = localStorage.getItem('savedPhoneNumber') || '';
    });

    return {
      savedName,
      savedEmail,
      savedAddress,
      savedPhoneNumber,
    };
  },
};
</script>
