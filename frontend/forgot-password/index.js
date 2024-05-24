const forgotPassword = async (event) => {
  event.preventDefault();
  const token = localStorage.getItem("jwt_token");
  if (!token) {
    return (window.location.href = "../signin/signin.html");
  }
  const button = document.getElementById("submit");

  try {
    const formData = new FormData(event.target);
    const email = formData.get("email");

    button.textContent = "Sending...";
    const res = await axios.post(
      "http://localhost:3000/password/forgot-password",
      {
        email,
        otp,
      }
    );
    if (res.status !== 200)
      throw new Error("Failed to send OTP on your email address!");

    formData.delete("email");
    alert(
      "OTP and reset link sent!, Please check your email to reset the password."
    );
    window.location.href = "../signin/signin.html";
  } catch (e) {
    const error = document.getElementById("error");
    error.innerText = e.message;
  } finally {
    button.textContent = "Send";
  }
};

const resetPassword = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const enteredOtp = formData.get("otp");
  const newPassword = formData.get("new-password");
  const email = document.getElementById("submit-email-input").value;

  try {
    const user = localStorage.getItem("");
    const res = await axios.post(
      `http://localhost:3000/password/reset-password/${user.id}`,
      {
        email,
        newPassword,
        enteredOtp,
      }
    );
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
