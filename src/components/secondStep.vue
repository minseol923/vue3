<template>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">이름</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div>
          <label for="phoneNumber">연락처</label>
          <input type="text" id="phoneNumber" v-model="phoneNumber" required>
        </div>
        <div>
            <label for="phoneNumber">주소</label>
            <button @click="execDaumPostcode">주소검색</button> <br>
            <input type="text" v-model="address" readonly>
            <input type="text" v-model="extraAddress" readonly>
        </div>
        <div>
            <button @click="goBack">이전</button>
            <button type="submit">다음</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        phoneNumber: '',
        address: '',
        extraAddress: ''
      };
    },
    methods: {
      submitForm() {
        if (this.validateName(this.name) && this.validatePhoneNumber(this.phoneNumber)) {
          // 이름과 핸드폰 번호가 유효한 경우에만 처리
          console.log('폼이 제출되었습니다!');
          // 다음 단계로 라우팅
          // this.$router.push('/nextStep');
        } else {
          console.log('유효하지 않은 입력입니다.');
        }
      },
      validateName(name) {
        const nameRegex = /^[가-힣]{2,}|[a-zA-Z]{3,}$/; // 한글 2글자 이상 또는 영문 3글자 이상
        return nameRegex.test(name);
      },
      validatePhoneNumber(phoneNumber) {
        const phoneRegex = /^0\d{2,3}-?\d{3,4}-?\d{4}$/; // 0으로 시작하고 하이픈 또는 공백 허용한 형식
        return phoneRegex.test(phoneNumber);
      },
      execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.extraAddress !== '') {
            this.extraAddress = '';
          }
          if (data.userSelectedType === 'R') {
            // 사용자가 도로명 주소를 선택했을 경우
            this.address = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.address = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === 'R') {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              this.extraAddress += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
              this.extraAddress +=
                this.extraAddress !== ''
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.extraAddress !== '') {
              this.extraAddress = `(${this.extraAddress})`;
            }
          } else {
            this.extraAddress = '';
          }
        }
      }).open();
    },
    goBack() {
      // 브라우저의 이전 페이지로 이동
      window.history.back();
    }
    }
  };
  </script>