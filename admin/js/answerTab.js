$(document).ready(function () {
  const $tabs = $('[role="tab"]');
  const $tabContents = $(".stab-content");

  $tabs.on("click", function () {
    const targetId = $(this).data("tab");

    // 탭 버튼 상태 변경
    $tabs
      .removeClass("tab-active bg-neutral text-white")
      .addClass("bg-zinc-100 text-zinc-600");
    $(this)
      .removeClass("bg-zinc-100 text-zinc-600")
      .addClass("tab-active bg-neutral text-white");

    // 탭 컨텐츠 상태 변경
    $tabContents.removeClass("active-stab-content");
    $(`#${targetId}`).addClass("active-stab-content");
  });
});
