export function getStrTimesIndex(str: string, cha: string, num: number) {
  let x = str.indexOf(cha);

  for (let i = 0; i < num; i++) {
    x = str.indexOf(cha, x + 1);
  }

  return x;
}

export function getFirstPathCode(path: string) {
  const index0 = getStrTimesIndex(path, '/', 0);
  const index1 = getStrTimesIndex(path, '/', 1);

  const activeKey = path.slice(index0 + 1, index1 > 0 ? index1 : path.length);

  return activeKey;
}

export function getLastPathCode(path: string) {
  const index = path.lastIndexOf('/');

  if (index === -1) {
    return '';
  }

  const lastPathCode = path.slice(index + 1);
  return lastPathCode;
}
export function convertToUppercaseFirstLetter<T extends Record<string, any>>(data: T): T {
  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) {
      return data.map((item) => convertToUppercaseFirstLetter(item)) as unknown as T;
    } else {
      return Object.keys(data).reduce((acc: any, key: string) => {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
        acc[capitalizedKey] = convertToUppercaseFirstLetter(data[key]);
        return acc;
      }, {}) as unknown as T;
    }
  } else {
    return data;
  }
}
