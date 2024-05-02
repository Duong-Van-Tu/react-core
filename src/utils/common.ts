import { KEYS } from '../constants/key';

export function getToken() {
  return (
    (typeof localStorage !== 'undefined' && localStorage.getItem(KEYS.LOGIN_TOKEN_STORE_KEY)) ||
    undefined
  );
}

export async function tick(delay: number = 0) {
  return new Promise<void>((res) => {
    setTimeout(res, delay);
  });
}

export function undefinedRefine(obj: Record<string, any>) {
  return JSON.parse(JSON.stringify(obj)); //remove key has undefined value
}

export function isJSON(str: string): boolean {
  try {
    return !!JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
}

export function isEmpty(value: any) {
  return value === '' || value == null;
}
