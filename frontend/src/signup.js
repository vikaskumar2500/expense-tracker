const signup = async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const res = await axios.post("http://localhost:3000/user/signup", {
      name,
      email,
      password,
    });
    console.log("res", res);
    if (res.status !== 200) throw new Error("Failed to signup");
    e.target.name.value = "";
    e.target.email.value = "";
    e.target.password.value = "";
    window.location.href =
      "file:///D:/Sharpener/Backend(node.js)/expense-tracker/frontend/html/signin.html";
  } catch (e) {
    const error = document.getElementById("error");
    error.innerText = e.message;
  }
};
