const otp = Math.floor(111111 + Math.random() * 999999).toString();

const sendSMTPEmailOTP = async (event) => {
  event.preventDefault();
  const token = localStorage.getItem("jwt_token");
  if (!token) {
    return (window.location.href = "../signin/signin.js");
  }
  try {
    const formData = new FormData(event.target);
    const email = formData.get("email");

    const res = await axios.post(
      "http://localhost:3000/user/send-smtp-email-otp",
      {
        email,
        otp,
      }
    );
    if (res.status !== 200)
      throw new Error("Failed to send OTP on your email address!");

    const formNext = document.getElementById("form-next");
    const formSubmit = document.getElementById("form-submit");
    const emailSubmit = document.getElementById("submit-email-input");

    formNext.classList.add("hidden");
    formSubmit.classList.remove("hidden");
    emailSubmit.setAttribute("value", email);
  } catch (e) {
    const error = document.getElementById("error");
    error.innerText = e.message;
  }
};

const forgotPassword = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const enteredOtp = formData.get("otp");
  const newPassword = formData.get("new-password");
  const email = document.getElementById("submit-email-input").value;

  try {
    if (enteredOtp !== otp) throw new Error("OTP didn't match!");
    const res = await axios.post("http://localhost:3000/user/forgot-password", {
      email,
      newPassword,
      enteredOtp
    });
    if (res.status !== 200)
      throw new Error("Failed to update password, please try again later!");

    alert("Succesfully updated your password.");
    window.location.href = "../signin/signin.html";
  } catch (e) {
    console.log(e);
    alert(e.message);
  }
};

let toggle = false;
const toggle1 = (e, refElementId) => {
  const refElement = document.getElementById(refElementId);
  toggle = !toggle;

  refElement.setAttribute("type", toggle ? "text" : "password");
  e.target.textContent = toggle ? "hide" : "view";
};
