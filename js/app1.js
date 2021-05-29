const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validate();
});
function validate() {
  const username = document.querySelector("#username").value;
  const sub = document.querySelector("#sub").value;
  const dept = document.querySelector("#dept").value;
  const reason = document.querySelector("#reason").value;

  if (username.length < 8) {
    alert("Your username must be at least 8 characters");
    return false;
  }
  if (username == null || username == "" || sub == "" || dept == "") {
    alert("Please enter the username.");
    return false;
  }
  if(sub.length >40 ){
    alert("Subject is too long");
    return false;
  }

  if(dept != "computer" || dept != "it" || dept != "entc"){
    alert("enter valid dept , computer ,it or entc");
    return false;
  }

  if(reason.length <20 ){
    alert("Insufficient data");
    return false;
  }

  
  document.querySelector("#username").value = "";
  document.querySelector("#sub").value = "";
  document.querySelector("#dept").value = "";
  document.querySelector("#reason").value = "";
  alert("Applied successful");
  return 1;
}
