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
export default {
  data() {
    return {
      savedName: '',
      savedEmail: '',
      savedAddress: '',
      savedPhoneNumber: '',
    };
  },
  created() {
    // 로컬 스토리지에서 정보를 가져와 데이터에 할당
    this.savedName = localStorage.getItem('savedName') || '';
    this.savedEmail = localStorage.getItem('savedEmail') || '';
    this.savedAddress = localStorage.getItem('savedAddress') || '';
    this.savedPhoneNumber = localStorage.getItem('savedPhoneNumber') || '';
  },
};
</script>
