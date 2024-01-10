export {};

declare global {
  interface Fn<T = any> {
    (...arg: T[]): T;
  }

  type Nullable<T> = T | null;

  type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

  type Recordable<T = any, K = string> = Record<
    K extends null | undefined ? string : K,
    T
  >;

  class Voice9 {
    constructor();
    /** 身份初始化方法 */
    init(loginInfo: Record<string, any>): void;
    /** 主动触发登出 */
    logout(): void;

    /** 设置登录状态为”忙碌“ */
    setBusy();
    /** 设置登录状态为”空闲“ */
    setReady();

    /** 拨打电话 */
    makeCall(telNum: string): void;
    /** 接通电话 */
    acceptCall(): void;
    /** 挂断电话 */
    closeCall(): void;

    /** 转接 */
    phoneTransfer(telNum: string): void;
    /** 咨询 */
    phoneConsult(telNum: string): void;
    /** 取消咨询 */
    phoneConsultCancel(telNum: string): void;
    /** 咨询转接 */
    phoneConsultTransfer(telNum: string): void;
    /** 转多方 */
    phoneConsultParty(): void;

    /** 通话静音 */
    mutePhone(): void;
    /** 通话取消静音 */
    cancelMute(): void;
    /** 通话保持 */
    holdTalking(): void;
    /** 通话取消保持 */
    cancelHold(): void;

    addEventListener(
      type: "message" | "logout",
      cb: (data: Recordable) => void
    );
  }
}
