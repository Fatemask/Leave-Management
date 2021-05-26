const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validate();
});
function validate() {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  if (username.length < 8) {
    alert("Your username must be at least 8 characters");
    return false;
  }
  if (username == null || username == "") {
    alert("Please enter the username.");
    return false;
  }
  if (password.length < 8) {
    alert("Your password must be at least 8 characters");
    return false;
  }
  if (password.search(/[a-z]/i) < 0) {
    alert("Your password must contain at least one letter.");
    return false;
  }
  if (password.search(/[0-9]/) < 0) {
    alert("Your password must contain at least one digit.");
    return false;
  }
  document.querySelector("#username").value = "";
  document.querySelector("#password").value = "";
  alert("Login successful");
  return 1;
}
