import { KEYS } from '@/constants/key';

export function getToken() {
  return (
    (typeof localStorage !== 'undefined' && localStorage.getItem(KEYS.LOGIN_TOKEN_STORE_KEY)) ||
    undefined
  );
}

export function getTenant() {
  return (
    (typeof localStorage !== 'undefined' && localStorage.getItem(KEYS.TENANT_KEY)) || undefined
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

export function generateUrlParams(params: { [key: string]: string | undefined }): string {
  const filteredParams: Record<string, string> = {};
  for (const key in params) {
    if (params[key] !== undefined && params[key] !== '') {
      filteredParams[key] = params[key]!;
    }
  }
  const urlParams = new URLSearchParams(filteredParams);
  return urlParams.toString();
}
