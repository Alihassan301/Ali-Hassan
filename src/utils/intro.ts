const KEY = "ah-intro-seen";

export function readIntroSeen(): boolean {
  try {
    return window.sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function markIntroSeen() {
  try {
    window.sessionStorage.setItem(KEY, "1");
  } catch {

    /* storage unavailable — intro simply plays in full next time */}
}