function setBreadcrumbByPath() {
  const path = window.location.pathname;
  let depth1 = "";
  let depth2 = "";

  // 1차 분류
  if (path.includes("/admin/page/site")) depth1 = "사이트 관리";
  else if (path.includes("/admin/page/panel")) depth1 = "게시판 관리";
  else if (path.includes("/admin/page/global")) depth1 = "해외파트너사 관리";
  else if (path.includes("/admin/page/partner")) depth1 = "업체별 견적관리";

  // 2차 페이지 이름 매핑
  const pageName = path.split("/").pop(); // 마지막 경로명만 추출

  switch (pageName) {
    case "estimate.html":
      depth2 = "견적요청";
      break;
    case "estimate-detail.html":
      depth2 = "견적요청 상세보기";
      break;
    case "panelprofile.html":
      depth2 = "패널프로파일 조사";
      break;
    case "dataarea.html":
      depth2 = "MS 패널 자료실";
      break;
    case "knowhow.html":
      depth2 = "KNOW-HOW";
      break;
    case "sitelog.html":
      depth2 = "이용현황";
      break;
    case "codesetting.html":
      depth2 = "코드관리";
      break;
    case "joinmem.html":
      depth2 = "회원관리";
      break;
    case "partner.html":
      depth2 = "파트너사 관리";
      break;
    case "partner-register.html":
      depth2 = "파트너사 등록";
      break;
    case "estimate-global.html":
      depth2 = "해외견적문의하기";
      break;
    case "estimate-partner.html":
      depth2 = "업체별 견적관리";
      break;
  }

  // DOM 업데이트
  const $pageTitle = $("#pageTitle");
  const $d1 = $("#breadcrumbDepth1");
  const $d2 = $("#breadcrumbDepth2");
  const $d3 = $("#breadcrumbDepth3");

  if ($pageTitle.length) {
    $pageTitle.text(depth2 || depth1).removeClass("opacity-0");
  }

  if ($d1.length) $d1.text("홈");
  if ($d2.length) $d2.text(depth1);
  if ($d3.length) $d3.text(depth2);
}

$(document).ready(function () {
  setBreadcrumbByPath();
});
