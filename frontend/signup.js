const signup = async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  // console.log(name, email, password);

  try {
    const res = await axios.post("https://localhost/3000/user/signup", {
      name,
      email,
      password,
    });

    
    if (res.status === "201") {
      console.log(res.data);
    }
  } catch (e) {
    alert(e.message);
  }
};
