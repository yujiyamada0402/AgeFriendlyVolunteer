// Personal checklist progress, stored only in this browser (localStorage).
// Nothing is sent to any server — each volunteer's checkmarks stay on their own device.

document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".checklist input[type='checkbox'][data-key]");

  boxes.forEach((box) => {
    const key = "afvp-" + box.dataset.key;
    box.checked = localStorage.getItem(key) === "1";
    box.closest("li").classList.toggle("done", box.checked);

    box.addEventListener("change", () => {
      if (box.checked) {
        localStorage.setItem(key, "1");
      } else {
        localStorage.removeItem(key);
      }
      box.closest("li").classList.toggle("done", box.checked);
    });
  });
});
