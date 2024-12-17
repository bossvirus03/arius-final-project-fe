import { Button, Form, FormProps, Input, message } from "antd";
import GoogleColorIcon from "../../../components/Icons/GoogleColorIcon";
import useLogin, { LoginCredentials } from "../hooks/useLogin";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Login() {
  const { loginUser, isPending } = useLogin();
  const onFinish: FormProps<LoginCredentials>["onFinish"] = (values) => {
    loginUser(
      { ...values },
      {
        onSuccess: () => {
          message.success("Login successfully");
        },
      }
    );
  };

  const onFinishFailed: FormProps<LoginCredentials>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Left Section (Image or Illustration) */}
        <div className="flex items-center justify-center w-1/2 bg-blue-500">
          <LazyLoadImage
            src="https://images.pexels.com/photos/3612182/pexels-photo-3612182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Login Illustration"
            className="object-cover max-h-full"
          />
        </div>

        {/* Right Section (Login Form) */}
        <div className="flex flex-col justify-center w-1/2 p-10">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">FASCO</h1>
          <h3 className="mb-6 text-xl font-semibold text-gray-600">
            Sign In to FASCO
          </h3>

          {/* Social Login Buttons */}
          <div className="mb-6 space-y-4">
            <Button
              className="flex items-center justify-center w-full h-12 text-gray-700 border border-gray-300 hover:bg-gray-100"
              icon={<GoogleColorIcon />}
              onClick={() => {}}
            >
              <span className="ml-3">Sign in with Google</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6 text-center">
            <span className="px-3 text-gray-600 bg-white">or</span>
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
                className="w-full h-12 border-gray-300 rounded-lg"
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
                className="w-full h-12 border-gray-300 rounded-lg"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-12 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
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
