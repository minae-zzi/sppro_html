function renderEmailInput(containerId) {
  const $container = $(`#${containerId}`);
  let emails = [];
  let inputValue = "";
  const suggestions = [
    "searchpro@email.com",
    "searchpro2@email.com",
    "other@email.com",
    "dataspring@email.com",
    "gmor@email.com",
    "dynata@email.com",
    "marketlink@email.com",
  ];

  const render = () => {
    $container.html(`
      <div class="flex flex-col gap-2 relative">
        <div class="relative flex gap-2 items-center">
          <button type="button" class="flex-shrink-0 text-xs bg-zinc-900 text-white rounded-md py-1 px-2 h-btn-xs min-w-[70px] text-[0.85rem]" id="toggleDropdown">참조추가</button>
          <div class="w-full">
            <input type="text" id="emailInput" placeholder="이메일을 입력하세요" class="w-full p-2 border-none rounded-md outline-none bg-transparent border ${
              $container.data("error") ? "border-red-500" : ""
            }" value="${inputValue}" />
            <p class="text-red-500 text-xs mt-1">${
              $container.data("error") || ""
            }</p>
          </div>
          <div id="suggestionBox" class="hidden absolute left-0 top-[calc(100%+4px)] w-full bg-white border rounded-md shadow-lg z-10"></div>
        </div>
        <div class="flex flex-wrap gap-2" id="emailList">
          ${emails
            .map(
              (email, i) => `
            <div class="bg-gray-400 text-white text-sm px-3 py-1 rounded-md flex items-center gap-2">
              <span>${email}</span>
              <button type="button" data-index="${i}" class="text-white hover:text-gray-200">×</button>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `);

    const $input = $container.find("#emailInput");
    const $suggestionBox = $container.find("#suggestionBox");
    const $dropdownToggle = $container.find("#toggleDropdown");

    $input.on("input", function () {
      inputValue = $(this).val();
      $container.removeData("error");
      showSuggestions();
    });

    let highlightIndex = -1;

    $input.on("keydown", function (e) {
      const filtered = suggestions.filter(
        (email) => email.includes(inputValue) && !emails.includes(email)
      );

      if (e.key === "ArrowDown") {
        e.preventDefault();
        highlightIndex = (highlightIndex + 1) % filtered.length;
        updateSuggestionHighlight(filtered);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        highlightIndex =
          (highlightIndex - 1 + filtered.length) % filtered.length;
        updateSuggestionHighlight(filtered);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (highlightIndex >= 0 && filtered[highlightIndex]) {
          addEmail(filtered[highlightIndex]);
          highlightIndex = -1;
        } else {
          addEmail(inputValue);
        }
      } else if (e.key === "Escape") {
        $suggestionBox.addClass("hidden");
        highlightIndex = -1;
      }
    });

    function updateSuggestionHighlight(filtered) {
      $container.find("#suggestionBox > div").each(function (index) {
        $(this).toggleClass("bg-blue-100", index === highlightIndex);
      });
    }

    $dropdownToggle.on("click", function () {
      $suggestionBox.toggleClass("hidden");
      showSuggestions();
    });

    $suggestionBox.on("click", function (e) {
      if ($(e.target).data("email")) {
        addEmail($(e.target).data("email"));
      }
    });

    $container.find("#emailList button").on("click", function () {
      const index = +$(this).data("index");
      emails.splice(index, 1);
      render();
    });
  };

  const addEmail = (email) => {
    const trimmed = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
      $container.data("error", "유효하지 않은 이메일 형식입니다.");
      render();
      return;
    }
    if (emails.includes(trimmed)) {
      $container.data("error", "이미 추가된 이메일입니다.");
      render();
      return;
    }
    emails.push(trimmed);
    inputValue = "";
    $container.removeData("error");
    render();
  };

  const showSuggestions = () => {
    const filtered = suggestions.filter(
      (email) => email.includes(inputValue) && !emails.includes(email)
    );
    const $suggestionBox = $container.find("#suggestionBox");
    $suggestionBox.html(
      filtered
        .map(
          (email) =>
            `<div class="p-2 cursor-pointer hover:bg-gray-100" data-email="${email}">${email}</div>`
        )
        .join("")
    );
    $suggestionBox.toggleClass("hidden", !filtered.length);
  };

  render();
}

$(document).ready(() => {
  renderEmailInput("emailInputContainer");
});
