import { Button, Form, FormProps, Input } from "antd";
import GoogleColorIcon from "../../../components/Icons/GoogleColorIcon";
import useLogin, { LoginCredentials } from "../hooks/useLogin";

function Login() {
  const { loginUser, isPending } = useLogin();
  const onFinish: FormProps<LoginCredentials>["onFinish"] = (values) => {
    loginUser({ ...values });
};

  const onFinishFailed: FormProps<LoginCredentials>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex w-full max-w-4xl shadow-lg bg-white rounded-lg overflow-hidden">
        {/* Left Section (Image or Illustration) */}
        <div className="w-1/2 bg-blue-500 flex items-center justify-center">
          <img
            src="https://images.pexels.com/photos/3612182/pexels-photo-3612182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Login Illustration"
            className="object-cover max-h-full"
          />
        </div>

        {/* Right Section (Login Form) */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">FASCO</h1>
          <h3 className="text-xl font-semibold text-gray-600 mb-6">
            Sign In to FASCO
          </h3>

          {/* Social Login Buttons */}
          <div className="space-y-4 mb-6">
            <Button
              className="h-12 w-full border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-100"
              icon={<GoogleColorIcon />}
              onClick={() => {}}
            >
              <span className="ml-3">Sign in with Google</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="relative text-center mb-6">
            <span className="text-gray-500 bg-white px-3">or</span>
            <div className="absolute inset-0 h-px bg-gray-300" />
          </div>

          {/* Login Form */}
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="space-y-4"
          >
            <Form.Item<LoginCredentials>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                placeholder="Enter your username"
                className="h-12 w-full border-gray-300 rounded-lg"
              />
            </Form.Item>

            <Form.Item<LoginCredentials>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="h-12 w-full border-gray-300 rounded-lg"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="h-12 w-full bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
              >
                {isPending ? "Signing In..." : "Sign In"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
