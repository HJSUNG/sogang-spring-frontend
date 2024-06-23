<template>
  <div class="sign-up-terms">
    <nav id="navbar-example2" class="navbar navbar-light bg-light px-3">
      <a class="navbar-brand" href="#">이용약관 동의</a>
      <label>약관에 동의합니다<input type="checkbox" v-model="isAgreeTerm"></label>
    </nav>
    <textarea class="w-100" readonly>유비무환 (주) Sogang Spring 회원가입 약관

      제 1 조 (목적)
이 약관은 유비무환(이하 "서비스")의 이용 조건 및 절차, 이용자와 서비스 제공자의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

      제 2 조 (회원가입)
회원가입은 서비스 제공자가 제공하는 가입 양식에 따라 회원 정보를 기입한 후 약관에 동의함으로써 완료됩니다.
서비스는 다음 각 호에 해당하는 경우 회원가입을 승인하지 않을 수 있습니다:
가입 신청자가 이전에 회원 자격을 상실한 적이 있는 경우
허위 정보를 기재하거나, 서비스 제공자가 요구하는 내용을 기재하지 않은 경우
기타 가입 신청자의 귀책 사유로 인하여 승인이 불가능하다고 판단되는 경우

      제 3 조 (회원의 권리와 의무)
회원은 관련 법령, 본 약관의 규정, 이용안내 및 서비스와 관련하여 공지한 주의사항 등을 준수하여야 합니다.
회원은 자신의 계정 및 비밀번호에 대한 관리 책임이 있으며, 이를 제3자가 이용하도록 하여서는 안 됩니다.
회원은 개인정보가 변경된 경우, 즉시 이를 서비스에 업데이트해야 합니다.

      제 4 조 (서비스 제공 및 변경)
서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.
서비스는 필요하다고 판단되는 경우, 서비스의 일부 또는 전부를 사전 예고 없이 변경할 수 있습니다.

      제 5 조 (개인정보 보호)
서비스는 회원의 개인정보를 보호하기 위해 관련 법령을 준수하며, 개인정보 보호정책을 따릅니다.
서비스는 회원의 개인정보를 본인의 동의 없이 제3자에게 제공하지 않습니다. 단, 법률에 의해 요구되는 경우는 예외로 합니다.

      제 6 조 (계약 해지 및 이용 제한)
회원은 언제든지 서비스에 해지 요청을 할 수 있으며, 서비스는 즉시 회원 탈퇴를 처리합니다.
서비스는 회원이 다음 각 호에 해당하는 행위를 하였을 경우, 사전 통지 없이 이용 계약을 해지하거나 이용을 제한할 수 있습니다:
공공질서 및 미풍양속에 반하는 경우
범죄 행위와 관련된 경우
기타 법령이나 서비스가 정한 이용 조건을 위반한 경우

      제 7 조 (약관의 개정)
서비스는 본 약관을 변경할 수 있으며, 변경된 약관은 공지사항을 통해 회원에게 통지됩니다.
회원은 변경된 약관에 대해 거부할 권리가 있으며, 변경된 약관에 동의하지 않을 경우 회원 탈퇴를 요청할 수 있습니다.

      제 8 조 (준거법 및 재판 관할)
본 약관은 대한민국 법률에 따라 규정되며, 서비스와 회원 간에 발생한 분쟁에 대해서는 서비스의 본사 소재지를 관할하는 법원을 전속 관할로 합니다.

      부칙
본 약관은 2024년 5월 26일부터 시행됩니다.
    </textarea>
  </div>

  <div class="sign-up-input">
    <div class="bd-example pt-3">
      <label for="exampleFormControlInput1" class="form-label">아이디</label>
      <div class="d-flex">
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" v-model="id" :readonly="isIdValid">
        <button type="button" class="btn btn-secondary" style="margin-left: 10px;width: 105px" :style="{'background': isIdValid ? 'green' : ''}" @click="onClickCheckIdValidationBtn">{{isIdValid ? '확인완료' : '중복확인'}}</button>
      </div>
    </div>

    <div class="bd-example pt-3">
      <label for="exampleFormControlInput1" class="form-label">비밀번호</label>
      <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" v-model="password">
    </div>

    <div class="bd-example pt-3">
      <label for="exampleFormControlInput1" class="form-label">비밀번호 재확인</label>
      <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" v-model="passwordCheck">
    </div>

    <div class="bd-example pt-3">
      <label for="exampleFormControlInput1" class="form-label">이름</label>
      <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" v-model="name">
    </div>

    <div class="bd-example pt-3">
      <label for="exampleFormControlInput1" class="form-label">생년월일</label>
      <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" v-model="birthday">
    </div>

    <div class="bd-example pt-3">
      <label for="exampleFormControlInput1" class="form-label">성별</label>
      <div class="form-group">
        <select class="form-control" id="exampleFormControlSelect1" v-model="gender">
          <option>남자</option>
          <option>여자</option>
        </select>
      </div>
    </div>

    <div class="bd-example pt-3">
      <label for="exampleFormControlInput1" class="form-label">본인확인 이메일</label>
      <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="emailaddress@example.com" v-model="email">
    </div>

    <div class="bd-example pt-3">
      <label for="exampleFormControlInput1" class="form-label">주소</label>
      <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" v-model="address">
    </div>

    <div class="pt-3 align-content-center">
      <button type="button" class="btn btn-primary" :disabled="!isIdValid || !isAgreeTerm" @click="onClickSignUpBtn">회원가입</button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import axiosHttp from "@/utils/axiosHttp";
import router from "@/router";
import { useToast } from 'primevue/usetoast';

export default {
  name: "SignUp",
  setup() {
    const toast = useToast();
    const state = reactive({
      isAgreeTerm: false,
      isIdValid: false,

      id: '',
      password:'',
      passwordCheck:'',
      name: '',
      birthday: '',
      gender: '남자',
      email:'',
      address: '',
    })
    
    function onClickCheckIdValidationBtn() {
      if(state.id.length > 0) {
        checkIdValidation();
      }
    }
    
    function onClickSignUpBtn(){
      signUp();
    }

    function initializePage() {
      state.id = "";
      state.password = "";
      state.passwordCheck = "";
      state.name = "";
      state.birthday = "";
      state.gender = "남자";
      state.email = "";
      state.address = "";

      state.isAgreeTerm = false;
      state.isIdValid = false;
    }
    
    async function checkIdValidation() {
      await axiosHttp.post("/api/user/checkIdValidation", state.id, {})
        .then((res) => {
          console.log(res.data);

          if(res.data.stacd == 100) {
            state.isIdValid = true;
            toast.add({ severity: 'success', summary: '', detail: '사용 가능한 아이디입니다.', life: 3000 });
          } else {
            toast.add({ severity: 'error', summary: '', detail: '중복된 아이디입니다.', life: 3000 });
          }

        }).catch((error) => {
          console.log(error);
        });
    }

    async function signUp() {
      let param = {
        "USER_ID" : state.id,
        "USER_PW" : state.password,
        "USER_NM" : state.name,
        "USER_BIRTH_DT" : state.birthday,
        "USER_GENDER" : state.gender,
        "USER_EMAIL_ADDR" : state.email,
        "USER_ADDR" : state.address,
      }
      await axiosHttp.post("/api/user/signUp", param, {})
        .then((res) => {
          console.log(res.data);

          if(res.data.stacd == 100) {
            initializePage();
            toast.add({ severity: 'success', summary: '회원가입 성공', detail: '회원가입에 성공했습니다.', life: 3000 });
            router.push('/login')
          } else {
            toast.add({ severity: 'warn', summary: '회원가입 실패', detail: '입력정보를 다시 확인하세요.', life: 3000 });
          }

        }).catch((error) => {
          console.log(error);
        });
    }


    return {
      ...toRefs(state),
      onClickCheckIdValidationBtn,onClickSignUpBtn
    }
  }
};
</script>


<style scoped>
.sign-up-terms {
  margin-top: 30px;
  margin-left: 20%;
  margin-right: 20%;
  border: 1px lightgrey solid;
  border-radius: 10px;
  box-sizing: border-box;

  .navbar{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    input {
      margin-left:5px;
    }
  }

  textarea {
    height: 500px;
    border:none
  }

}

.sign-up-input {
  margin-top:10px;
  padding-bottom: 10px;
  margin-left: 20%;
  margin-right: 20%;
  margin-bottom: 10px;


  .bd-example {
    text-align: left;

    label::before{
      content: "○ ";
    }
  }
}


</style>