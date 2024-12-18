import { Button, Form, Input, DatePicker, message } from "antd";
import GoogleColorIcon from "../../../components/Icons/GoogleColorIcon";
import { LazyLoadImage } from "react-lazy-load-image-component";
import moment from "moment";
import { Link } from "react-router";
import useRegister from "../hooks/useRegister";

interface RegisterCredentials {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: Date;
}

function Register() {
  const { registerUser, isPending } = useRegister();
  const onFinish = (values: RegisterCredentials) => {
    const { confirmPassword, password } = values;

    if (password !== confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    registerUser(
      {
        email: values.email,
        username: values.username,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        dob: values.dob,
      },
      {
        onSuccess: () => {
          // Handle registration logic here
          message.success("Registration successful!");
          console.log(values);
        },
      }
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Left Section (Image or Illustration) */}
        <div className="flex items-center justify-center w-1/2 bg-blue-500">
          <LazyLoadImage
            src="https://images.pexels.com/photos/3184636/pexels-photo-3184636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Register Illustration"
            className="object-cover max-h-full"
          />
        </div>

        {/* Right Section (Register Form) */}
        <div className="flex flex-col justify-center w-1/2 p-10">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">Furniro</h1>
          <h3 className="mb-6 text-xl font-semibold text-gray-600">
            Create Your Furniro Account
          </h3>

          {/* Social Register Buttons */}
          <div className="mb-6 space-y-4">
            <Button
              className="flex items-center justify-center w-full h-12 text-gray-700 border border-gray-300 hover:bg-gray-100"
              icon={<GoogleColorIcon />}
              onClick={() => {}}
            >
              <span className="ml-3">Sign up with Google</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6 text-center">
            <span className="px-3 text-gray-600 bg-white">or</span>
            <div className="absolute inset-0 h-px bg-gray-300" />
          </div>

          {/* Register Form */}
          <Form
            name="register"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="space-y-4"
          >
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input
                placeholder="Enter your first name"
                className="w-full h-12 border-gray-300 rounded-lg"
              />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input
                placeholder="Enter your last name"
                className="w-full h-12 border-gray-300 rounded-lg"
              />
            </Form.Item>

            <Form.Item
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
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                placeholder="Enter your email"
                className="w-full h-12 border-gray-300 rounded-lg"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="w-full h-12 border-gray-300 rounded-lg"
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                placeholder="Confirm your password"
                className="w-full h-12 border-gray-300 rounded-lg"
              />
            </Form.Item>

            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[
                {
                  required: true,
                  message: "Please select your date of birth!",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
                disabledDate={(current) =>
                  current && current > moment().endOf("day")
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-12 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                {isPending ? "Sign Up..." : "Sign Up"}
              </Button>
            </Form.Item>
            <p className="text-gray-600 ">
              Ready to buy?
              <Link className="text-blue-500" to={"/login"}>
                Sign in now.
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
