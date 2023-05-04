import type { FormEvent } from "react";
import Button from "../../components/common/button";
import InputContainer from "../../components/common/input/input-container";
import Input from "../../components/common/input/input-field";
import apis from "../../services/apis";
const Login = () => {
  const data = {
    email: "",
    password: "",
  };
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    apis.auth.login(data);
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
              apis.auth.logout();
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
