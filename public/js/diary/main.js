const currentPath = window.location.pathname;

window.onload = function () {
  buildCalendar();
}; // 웹 페이지가 로드되면 buildCalendar 실행
let newDIV = document.createElement("p");

let nowMonth = new Date(); // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date(); // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0); // 비교 편의를 위해 today의 시간을 초기화
const calMonth = document.getElementById("calMonth");

// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function buildCalendar() {
  let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1); // 이번달 1일
  let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0); // 이번달 마지막날
  let tbody_Calendar = document.querySelector(".Calendar > tbody");
  document.getElementById("calYear").innerText = nowMonth.getFullYear(); // 연도 숫자 갱신
  document.getElementById("calMonth").innerText = leftPad(
    nowMonth.getMonth() + 1
  ); // 월 숫자 갱신

  while (tbody_Calendar.rows.length > 0) {
    // 이전 출력결과가 남아있는 경우 초기화
    tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
  }
  let nowRow = tbody_Calendar.insertRow(); // 첫번째 행 추가
  for (let j = 0; j < firstDate.getDay(); j++) {
    // 이번달 1일의 요일만큼
    let nowColumn = nowRow.insertCell(); // 열 추가
  }

  for (
    let nowDay = firstDate;
    nowDay <= lastDate;
    nowDay.setDate(nowDay.getDate() + 1)
  ) {
    // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복
    let nowColumn = nowRow.insertCell(); // 새 열을 추가하고
    let newDIV = document.createElement("p");
    newDIV.innerHTML = leftPad(nowDay.getDate()); // 추가한 열에 날짜 입력
    nowColumn.appendChild(newDIV);
    let newIMG = document.createElement("img");
    newIMG.append("");
    if (nowDay.getDay() == 6) {
      // 토요일인 경우
      nowRow = tbody_Calendar.insertRow(); // 새로운 행 추가
    }

    if (nowDay < today) {
      // 지난날인 경우
      newDIV.className = "pastDay";
      newDIV.onclick = function () {
        choiceDate(this);
      };
    } else if (
      nowDay.getFullYear() == today.getFullYear() &&
      nowDay.getMonth() == today.getMonth() &&
      nowDay.getDate() == today.getDate()
    ) {
      // 오늘인 경우
      newDIV.className = "today";
      newDIV.onclick = function () {
        choiceDate(this);
      };
    } else {
      // 미래인 경우
      newDIV.className = "futureDay";
      newDIV.onclick = function () {
        notDate(this);
      };
    }
  }
}

//작성불가 날짜
function notDate(newDiv) {
  if (document.getElementsByClassName("choiceDay")[0]) {
    // 기존에 선택한 날짜가 있으면
    document
      .getElementsByClassName("choiceDay")[0]
      .classList.remove("choiceDay"); // 해당 날짜의 "choiceDay" class 제거
  }

  newDIV.classList.add("choiceDay"); // 선택된 날짜에 "choiceDay" class 추가
  alert("미래일기는 쓸 수 없어요!");
}

// 날짜 선택
function choiceDate(newDIV) {
  if (document.getElementsByClassName("choiceDay")[0]) {
    // 기존에 선택한 날짜가 있으면
    document
      .getElementsByClassName("choiceDay")[0]
      .classList.remove("choiceDay"); // 해당 날짜의 "choiceDay" class 제거
  }

  newDIV.classList.add("choiceDay"); // 선택된 날짜에 "choiceDay" class 추가
  localStorage.setItem("calYear", calYear.innerText);
  localStorage.setItem("calMonth", calMonth.innerText);
  localStorage.setItem("calDay", newDIV.innerText);
  document.getElementById("Monthshow").innerText = `${calMonth.innerText}월`;
  document.getElementById("Dayshow").innerText = `${newDIV.innerText}일`;
  initDiary();
}

function updateClick() {
  console.log("수정하세요");
  const year = localStorage.getItem("calYear");
  const month = localStorage.getItem("calMonth");
  const day = localStorage.getItem("calDay");
  window.location.href = `/diary/${year}/${month}/${day}`;
}

function deleteClick() {
  console.log("삭제하세요");
}

// 이전달 버튼 클릭
function prevCalendar() {
  nowMonth = new Date(
    nowMonth.getFullYear(),
    nowMonth.getMonth() - 1,
    nowMonth.getDate()
  ); // 현재 달을 1 감소
  buildCalendar(); // 달력 다시 생성
}

// 다음달 버튼 클릭
function nextCalendar() {
  nowMonth = new Date(
    nowMonth.getFullYear(),
    nowMonth.getMonth() + 1,
    nowMonth.getDate()
  ); // 현재 달을 1 증가
  buildCalendar(); // 달력 다시 생성
}

// input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
function leftPad(value) {
  if (value < 10) {
    value = "0" + value;
    return value;
  }
  return value;
}

const diaryList = document.querySelector("ul.diaryList");
const apiIndivURL = (id) => `/api/diary/${id}`;

async function initDiary() {
  const year = localStorage.getItem("calYear");
  const month = localStorage.getItem("calMonth");
  const day = localStorage.getItem("calDay");
  const apiDateURL = `/api/diary/${year}/${month}/${day}?position=todocalendar`;
  console.log("hi");
  // get, post, deleteAll
  // 서버에서 다이어리를 가져와서 화면에 렌더링
  const diarys = await (await fetch(apiDateURL)).json();
  appendTodo(diarys);
}
function removeAllItems() {
  //diaryList의 모든 자식요소를 제거
  while (diaryList.firstChild) {
    diaryList.removeChild(diaryList.firstChild);
  }
}
//추가
function appendTodo(diarys) {
  console.log(diarys.content);
  const diLi = document.querySelector(".diaryList");
  const imgSrc = diarys.image;
  if (imgSrc && diarys.content) {
    diLi.innerHTML = `
      <div>
        <img src="${imgSrc}" alt="Diary Image" class="showimg">
      </div>
      <div>
        ${diarys.content}
      </div>
    `;
  } else if (!imgSrc && !diarys.content) {
    diLi.innerHTML = "일기가 작성되지 않았습니다!!";
  } else {
    diLi.innerHTML = `
      <div>
        ${diarys.content || "일기가 작성되지 않았습니다!!"}
      </div>
    `;
  }
  console.log(diarys);
}
