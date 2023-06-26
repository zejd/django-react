import {Button, Form, Input} from "antd";
import './RegisterForm.css';

export function RegisterForm({handleSubmit, isLoading}) {
    const [form] = Form.useForm();

    return (
        <div className="register-form-container">
            <Form
                form={form}
                layout="vertical"
                name="basic"
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Form.Item
                    style={{marginBottom: 5}}
                    label="Email"
                    name="email"
                    rules={[{type: "email"}, {required: true, message: 'Please input your email!'}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    style={{marginBottom: 5}}
                    label="First Name"
                    name="firstName"
                    rules={[{type: "firstName"}, {required: true, message: 'Please input your first name!'}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{marginBottom: 5}}
                    label="Last Name"
                    name="lastName"
                    rules={[{type: "lastName"}, {required: true, message: 'Please input your last name!'}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{marginBottom: 5}}
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    style={{marginBottom: 5}}
                    label="Confirm password"
                    name="confirm_password"
                    rules={[{
                        required: true,
                        message: 'Please confirm your password!'
                    }, ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }) ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item style={{marginTop: 20}}>
                    <Button loading={isLoading} block type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
