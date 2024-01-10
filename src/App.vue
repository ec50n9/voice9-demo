<script setup lang="ts">
import { useVoice9 } from "@/composable/voice9";
import { ref } from "vue";

const { voice9, createRef, init } = useVoice9();

const status = createRef({
  initVal: false,
  updater: (data, currentValue) =>
    ({
      NOT_READY: true,
      READY: false,
    }[data.type as string] ?? currentValue),
  setter: (newVal, voice9) => {
    if (newVal) voice9.setBusy();
    else voice9.setReady();
  },
});

const isLogin = createRef({
  initVal: false,
  updater: (data, currentValue) =>
    ({ LOGIN: true, LOGOUT: false }[data.type as string] ?? currentValue),
});

const targetPhone = ref("");
const handleMakeCall = () => {
  voice9.makeCall(targetPhone.value);
};
const handleHangupCall = () => {
  voice9.closeCall();
};
const handleAcceptCall = () => {
  voice9.acceptCall();
};
</script>

<template>
  <div>
    <div>
      登录状态：{{ isLogin ? "已登录" : "未登录" }}
      <button @click="init('1002@ty', '12345678')">登录</button>
      <button @click="voice9.logout()">登出</button>
    </div>

    <div>
      <input type="checkbox" v-model="status" />
      {{ status ? "繁忙" : "空闲" }}
    </div>

    <div>
      <input v-model="targetPhone" type="text" placeholder="请输入电话号码" />
      <button @click="handleMakeCall">拨打</button>
      <button @click="handleAcceptCall">接通</button>
      <button @click="handleHangupCall">挂断</button>
    </div>
  </div>
</template>

<style scoped></style>
