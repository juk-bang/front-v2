//쿠키 시간 지정안하면 기본 1000분.. 1분 단위로 입력가능
export const set_cookie = (name: string, val: string, exp : number = 1000): void => {
    const expires = new Date();
    expires.setTime(expires.getTime() + 1000 * 60 * exp);
  
    document.cookie =
      name + "=" + val + "; expires=" + expires.toUTCString() + "; path=/";
};
  
export const get_cookie = (name: string): string | null => {
    const val = "; " + document.cookie;
    const cookie = val.split("; " + name + "=");
  
    if (cookie.length === 2) {
      const res: string | undefined = cookie.pop()?.split(";").shift();
      return res !== undefined ? res : null;
    } else {
      return null;
    }
};
  
export const remove_cookie = (name: string): void => {
    const val = document.cookie;
    if(val.indexOf(name+'=') === -1){
      return;
    }
    
    const expires = new Date();
    expires.setTime(expires.getTime() + -1 * 24 * 60 * 60 * 1000);
  
    document.cookie = name + "=; expires=" + expires.toUTCString() + "; path=/";
};
  