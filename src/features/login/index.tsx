import Button from "../../components/common/button";
import InputContainer from "../../components/common/input/input-container";
import Input from "../../components/common/input/input-field";
import apis from "../../services/apis";
import type { FormEvent } from "react";
import Cookies from "js-cookie";
const Login = () => {
  const data = {
    email: "",
    password: "",
  };
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const [connection, error] = await apis.auth.login(data);
    if (error) {
      alert(error.message);
    } else {
      Cookies.set("sid", "session id", {
        path: "",
        secure: true,
        sameSite: "None",
        domain: ".github",
      });
      localStorage.setItem("authentication", connection);
    }
  };

  return (
    <div className="page-container bg-primary-5">
      <div className="responsive-container">
        <form onSubmit={handleLogin}>
          <InputContainer lable="Email">
            <Input
              type="email"
              onBlur={(e) => {
                data.email = e.target.value;
              }}
              required
            />
          </InputContainer>
          <InputContainer lable="Password">
            <Input
              type="password"
              onBlur={(e) => {
                data.password = e.target.value;
              }}
              required
            />
          </InputContainer>
          <Button>Login</Button>
          <Button
            type="button"
            onClick={() => {
              localStorage.clear();
            }}
          >
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
};
export default Login;
