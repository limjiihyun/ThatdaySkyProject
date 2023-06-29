import { Request } from 'express';

export function validateDate(y: number, m: number, d: number) {
  if ([y, m, d].some((v) => isNaN(v))) return false; // NaN 체크
  try {
    // 날짜 유효성 확인
    const dt = new Date(y, m - 1, d, 0, 0, 0, 0);
    const [yr, mon, day] = dateSeparate(dt);
    return (yr == y && mon == m && day == d);
  }
  catch (e) {
    // 이외에 에러 발생 시 false
    return false;
  }
}

export function isFuture(y: number, m: number, d: number) {
  // 오늘 날짜보다 미래인지 확인
  const today = new Date();
  const date = new Date(y, m - 1, d);
  return date > today;
}

export function dateSeparate(date: Date) {
  // Date 객체에 년, 월, 일로 분리
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ]
}

export function getDateFromUrl(req: Request) {
  // url에서 날짜 정보를 가져옴
  return ["year", "month", "date"]
    .map((key) => Number(req.params[key]))
}

export function today() {
  const date = new Date();
  return dateSeparate(date);
}
