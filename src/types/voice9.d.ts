type ScoketMsg = {
  type: "pong" | "LOGIN" | "NOT_READY";
  status: number;
  sequence: number;
};
