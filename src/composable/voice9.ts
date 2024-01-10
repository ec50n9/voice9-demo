import CryptoJS from "crypto-js";
import * as FSApi from "@/api/modules/fs";
import { UnwrapRef, computed, reactive, ref } from "vue";

export const useVoice9 = () => {
  const voice9 = reactive(new Voice9());

  const handlerList: ((msg: Recordable) => void)[] = [];

  voice9.addEventListener("message", (data: Recordable) => {
    handlerList.forEach((handler) => handler(data));
  });

  const init = (
    username: string,
    passwd: string,
    loginType: FSApi.FSLoginType = FSApi.FSLoginType.sip,
    workType: FSApi.FSWorkType = FSApi.FSWorkType.normal
  ) => {
    // 初始化 voice9
    FSApi.login({
      agentKey: username,
      passwd: CryptoJS.SHA256(passwd).toString(CryptoJS.enc.Hex),
      loginType,
      workType,
    }).then((res: any) => voice9.init(res.data));

    console.log(voice9)
  };

  const createRef = <T>(options: {
    initVal: T;
    updater: (msg: Recordable, currentValue: UnwrapRef<T>) => T;
    setter?: (newVal: UnwrapRef<T>, voice9: Voice9) => void;
  }) => {
    const value = ref(options.initVal);
    handlerList.push((msg) => {
      value.value = options.updater(
        msg,
        value.value as UnwrapRef<T>
      ) as UnwrapRef<T>;
    });

    return computed<UnwrapRef<T>>({
      get: () => value.value,
      set: (newVal) => options.setter?.(newVal, voice9),
    });
  };

  return {
    voice9,
    init,
    createRef,
  };
};
