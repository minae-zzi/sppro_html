function setBreadcrumbByPath() {
  const path = window.location.pathname;

  let depth1 = ""; // 1차 메뉴
  let depth2 = ""; // 2차 메뉴

  // 1차 메뉴 설정
  if (path.includes("/admin/page/site")) depth1 = "사이트 관리";
  else if (path.includes("/admin/page/panel")) depth1 = "게시판 관리";
  else if (path.includes("/admin/page/global")) depth1 = "해외파트너사 관리";
  else if (path.includes("/admin/page/partner")) depth1 = "업체별 견적관리";

  // 2차 메뉴 설정
  if (path.includes("estimate.html")) depth2 = "견적요청";
  else if (path.includes("estimate-detail.html")) depth2 = "견적요청 상세보기";
  else if (path.includes("panelprofile.html")) depth2 = "패널프로파일 조사";
  else if (path.includes("dataarea.html")) depth2 = "MS 패널 자료실";
  else if (path.includes("knowhow.html")) depth2 = "KNOW-HOW";
  else if (path.includes("sitelog.html")) depth2 = "이용현황";
  else if (path.includes("codesetting.html")) depth2 = "코드관리";
  else if (path.includes("joinmem.html")) depth2 = "회원관리";
  else if (path.includes("partner.html")) depth2 = "파트너사 관리";
  else if (path.includes("partner-register.html")) depth2 = "파트너사 등록";
  else if (path.includes("estimate-global.html")) depth2 = "해외견적문의하기";
  else if (path.includes("estimate-partner.html")) depth2 = "업체별 견적관리";

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

// DOM이 준비되면 실행
document.addEventListener("DOMContentLoaded", function () {
  setBreadcrumbByPath();
});
