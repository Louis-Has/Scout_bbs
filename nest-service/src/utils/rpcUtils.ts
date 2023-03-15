import { Observable } from 'rxjs';

export async function getValueFromObs<T>(
  obs: Observable<Promise<T>>,
): Promise<T> {
  if (!obs) return undefined;

  let resultList = [];
  await obs.forEach(async (value: Promise<T>) => {
    // 这里需注意，如果返回结果为空，会传过来空对象而不是 undefined ，注意判空处理
    const def = await value;
    resultList.push(def);
  });

  return resultList[0];
}
