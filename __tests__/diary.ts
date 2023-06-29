import { signup, getLoginSession, genIdPw, genPort } from "@/utils/testutil";
import { today, getFromDB, createFromDB } from "@/utils";
import db from "@/models";
import { Diary } from "@/types/models";
import setPort from "@/testapp";
import request from "supertest";

const app = setPort(genPort());
const url = (year: number, month: number, date: number) =>
  `/api/diary/${year}/${month}/${date}`;

test("create diary", async () => {
  const [id, pw] = genIdPw();
  await signup(id, pw, app);
  const cookie = await getLoginSession(id, pw, app);
  const [year, month, date] = today();
  const [title, content] = genIdPw();
  const res = await request(app)
    .post(url(year, month, date))
    .set("Cookie", cookie)
    .send({
      title,
      content,
      emotion: "1",
    });
  const resDiary = res.body as Diary;
  expect(resDiary?.title).toBe(title);
  const user = await getFromDB(db.user, {
    where: { username: id },
  });
  const dbDiary = await getFromDB(db.diary, {
    where: {
      user_id: user?.id,
      year,
      month,
      date,
    },
  });
  expect(dbDiary?.id).toBe(resDiary?.id);
});

test("get diary", async () => {
  const [year, month, date] = today();
  const diary = await getFromDB(db.diary, {
    where: { year, month, date },
  });
  const user_id = diary?.user_id;
  const user = await getFromDB(db.user, {
    where: { id: user_id },
  });
  if (!user) return;
  const [id, pw] = [user.username, user.password];
  const cookie = await getLoginSession(id, pw, app);
  const res = await request(app)
    .get(url(year, month, date))
    .set("Cookie", cookie);
  const result = res.body as Diary;
  expect(result?.title).toBe(diary?.title);
  expect(result?.content).toBe(diary?.content);
});
