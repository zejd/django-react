import {Button, Form, Input} from "antd";
import './LoginForm.css';

export function LoginForm({handleSubmit, isLoading}) {
    return (
        <div className="login-form-container">
            <Form
                layout="vertical"
                name="basic"
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item style={{marginBottom: 10}}>
                    <Button loading={isLoading} block type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
}
