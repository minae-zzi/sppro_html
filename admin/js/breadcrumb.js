function setBreadcrumbByPath() {
  const path = window.location.pathname;

  let depth1 = "";
  let depth2 = "";

  // 1차 분류
  if (path.includes("/admin/site")) depth1 = "사이트 관리";
  else if (path.includes("/admin/mspanel")) depth1 = "MS 정보검색";
  else if (path.includes("/estimate")) depth1 = "견적요청";
  else if (path.includes("/panelprofile")) depth1 = "패널프로파일조사";
  else if (path.includes("/dataarea")) depth1 = "MS 패널자료실";
  else if (path.includes("/knowhow")) depth1 = "KNOW-HOW";
  else if (path.includes("/mypage")) depth1 = "내견적보기";

  // 2차 페이지 이름 매핑
  if (path.includes("estimate.html")) depth2 = "Draft견적";
  else if (path.includes("estimate-advanced.html")) depth2 = "세부견적의뢰";
  else if (path.includes("estimate-rewrite.html")) depth2 = "재견적 요청";
  else if (path.includes("estimate-prevlist.html")) depth2 = "이전견적목록";
  // ✅ 사이트관리 페이지들 추가
  else if (path.includes("site-member.html")) depth2 = "회원관리";
  else if (path.includes("site-status.html")) depth2 = "이용 현황";
  else if (path.includes("site-code.html")) depth2 = "코드관리";

  // DOM 업데이트
  const pageTitle = document.getElementById("pageTitle");
  const d1 = document.getElementById("breadcrumbDepth1");
  const d2 = document.getElementById("breadcrumbDepth2");
  const d3 = document.getElementById("breadcrumbDepth3");

  if (pageTitle) {
    pageTitle.textContent = depth2 || depth1;
    pageTitle.classList.remove("opacity-0");
  }

  if (d1) d1.textContent = "홈";
  if (d2) d2.textContent = depth1;
  if (d3) d3.textContent = depth2;
}
