function setBreadcrumbByPath() {
  const path = window.location.pathname;

  let depth1 = "";
  let depth2 = "";

  // 1차 분류
  if (path.includes("/admin/page/site")) depth1 = "사이트 관리";
  else if (path.includes("/admin/page/panel")) depth1 = "게시판 관리";
  else if (path.includes("/admin/page/global")) depth1 = "해외파트너사 관리";
  // 2차 페이지 이름 매핑
  if (path.includes("estimate.html")) depth2 = "견적요청";
  else if (path.includes("panelprofile.html")) depth2 = "패널프로파일 조사";
  else if (path.includes("dataarea.html")) depth2 = "MS 패널 자료실";
  else if (path.includes("knowhow.html")) depth2 = "KNOW-HOW";
  else if (path.includes("sitelog.html")) depth2 = "이용현황";
  else if (path.includes("codesetting.html")) depth2 = "코드관리";
  else if (path.includes("joinmem.html")) depth2 = "회원관리";

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
