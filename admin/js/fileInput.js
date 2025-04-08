// 전역 초기화 상태 체크
if (typeof window.fileInputInitialized === "undefined") {
  window.fileInputInitialized = false;
}

window.renderFileInput = function (containerId) {
  const container = $(`#${containerId}`);

  // 초기 파일 입력 그룹 생성
  const initialGroup = $("<div>", {
    class: "file-input-group flex gap-2 items-center mt-2",
  }).html(`
    <input type="file" class="file-input file-input-bordered w-full max-w-xs"/>
    <button class="btn btn-neutral btn-sm text-xs add-file-btn">추가</button>
    <button class="btn btn-error btn-sm text-xs remove-file-btn">삭제</button>
  `);

  container.html(initialGroup);
};

$(function () {
  if (window.fileInputInitialized) return;

  $(document).on("click", "#fileInputContainer .add-file-btn", function () {
    const container = $("#fileInputContainer");
    const currentCount = container.children().length;

    // 최대 6개까지만 추가 가능
    if (currentCount >= 6) {
      alert("최대 6개까지만 추가할 수 있습니다.");
      return;
    }

    const newGroup = $("<div>", {
      class: "file-input-group flex gap-2 items-center mt-2",
    }).html(`
      <input type="file" class="file-input file-input-bordered w-full max-w-xs"/>
      <button class="btn btn-neutral btn-sm text-xs add-file-btn">추가</button>
      <button class="btn btn-error btn-sm text-xs remove-file-btn">삭제</button>
    `);
    container.append(newGroup);
  });

  $(document).on("click", "#fileInputContainer .remove-file-btn", function () {
    const container = $("#fileInputContainer");
    if (container.children().length > 1) {
      $(this).closest(".file-input-group").remove();
    }
  });

  window.fileInputInitialized = true;
});
