<template>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">이름</label>
          <input type="text" id="name" v-model="name" required>
          <div v-if="!isValidateName && name">
            <p>2글자 이상의 한글 완성형, 또는 3글자 이상의 영문 알파벳이고 그 외 특수문자, 숫자, 공백은 허용하지 않습니다.</p>
          </div>
        </div>
        <div>
          <label for="phoneNumber">연락처</label>
          <input type="text" id="phoneNumber" v-model="phoneNumber" required>
          <div v-if="!isValidatePhoneNumber && phoneNumber">
            <p>0으로 시작하며 중간 3-4자리, 마지막 4자리의 형식이며 하이픈 또는 공백 허용합니다.</p>
          </div>
        </div>
        <div>
          <label for="phoneNumber">주소</label>
          <button @click="daumPostcode">주소검색</button> <br>
          <input type="text" v-model="address" readonly>
          <input type="text" v-model="extraAddress">
        </div>
        <div>
          <button @click="goBack">이전</button>          
          <button :disabled="!isFormValid" type="submit" @click="gofinalPage">다음</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  export default {
    setup() {
      const name = ref('');
      const phoneNumber = ref('');
      const address = ref('');
      const extraAddress = ref('');
      const router = useRouter();

  
      onMounted(() => {
        // 페이지가 로드될 때 로컬 스토리지에서 name, phoneNumber, address 셋팅
        name.value = localStorage.getItem('savedName') || '';
        phoneNumber.value = localStorage.getItem('savedPhoneNumber') || '';
        address.value = localStorage.getItem('savedAddress') || '';
        extraAddress.value = localStorage.getItem('savedExtraAddress') || '';
      });
  
      const isValidateName = computed(() => {
        const nameRegex = /^[가-힣]{2,}|[a-zA-Z]{3,}$/;
        return nameRegex.test(name.value);
      });
  
      const isValidatePhoneNumber = computed(() => {
        const phoneRegex = /^0\d{2,3}[ -]?\d{3,4}[ -]?\d{4}$/;
        return phoneRegex.test(phoneNumber.value);
      });
  
      const isFormValid = computed(() => {
        return (
          name.value &&
          phoneNumber.value &&
          address.value &&
          extraAddress.value &&
          isValidatePhoneNumber.value
        );
      });
  
      const submitForm = () => {
        if (isValidateName.value && isValidatePhoneNumber.value && address.value && extraAddress.value) {
          localStorage.setItem('savedName', name.value);
          localStorage.setItem('savedPhoneNumber', phoneNumber.value);
          localStorage.setItem('savedAddress', address.value);
          localStorage.setItem('savedExtraAddress', extraAddress.value);
  
          console.log('폼이 제출되었습니다!');
          
        } else {
          console.log('유효하지 않은 입력입니다.');
        }
      };
  
    const daumPostcode = function() {
     new window.daum.Postcode({
        oncomplete: (data) => {
            if (this.extraAddress !== '') {
            this.extraAddress = '';
            }
            if (data.userSelectedType === 'R') {
            // 도로명 주소를 선택했을 경우
            this.address = data.roadAddress;
            } else {
            // 지번 주소를 선택했을 경우
            this.address = data.jibunAddress;
            }
            if (data.userSelectedType === 'R') {
            // 건물명이 있을 경우
            if (data.buildingName !== '' && data.apartment === 'Y') {
                this.extraAddress +=
                this.extraAddress !== ''
                    ? `, ${data.buildingName}`
                    : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우
            if (this.extraAddress !== '') {
                this.extraAddress = `(${this.extraAddress})`;
            }
            } else {
            this.extraAddress = '';
            }
        }
        }).open();
        };
  
      const goBack = () => {
        window.history.back();
      };
      const gofinalPage = () => {
        router.push('/finalStep');
      }
  
      return {
        name,
        phoneNumber,
        address,
        extraAddress,
        isValidateName,
        isValidatePhoneNumber,
        isFormValid,
        submitForm,
        daumPostcode,
        goBack,
        gofinalPage
      };
    },
  };
  </script>
  