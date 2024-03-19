"use client"
import React from 'react'
import Layout from './component/DashboardLayout'

import { Button, Checkbox, Form, Input } from 'antd'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginUser } from './features/userSlice';



const Page = () => {
const router = useRouter()

const dispatch = useDispatch();
const onFinish = (values) => {
  dispatch(loginUser({ userName: values.userName, password: values.password }))
    .unwrap()
    .then(() => {
      router.push("/dashboard");
    })
    .catch((error) => {
      console.error('Failed to login:', error);
    });
};
  return (
    
    <div
    className="flex min-h-screen flex-col justify-center items-center  loginbg"
  
  >
    <div className="text-[22px]">
      <h1 className="text-white text-center">
        <Image
          width={247}
          height={227}
          alt=""
          className=""
          quality={50}
          src="/assets/images/white_logo.png"
        />
      </h1>



    </div>
    <Form
      className=" flex justify-center flex-col !w-[30%]  items-center"
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h1 className="w-[100%] mb-[20px]  text-white text-[30px] flex justify-center text-center">
        Login
      </h1>
      <Form.Item
        className=""
        name="userName"
        rules={[
          {
            required: true,
            message: (
              <span style={{ color: "white" }}>Please input your userName!</span>
            ),
          },
        ]}
      >
        <Input
          placeholder="Email address"
          className="rounded-l-[10px] rounded-r-[10px] border-none !bg-[#c391aa] text-white  w-[390px]  "
        />
      </Form.Item>

      <Form.Item
        className=" "
        name="password"
        rules={[
          {
            required: true,
            message: (
              <span style={{ color: "white" }}>
                Please input your password!
              </span>
            ),
          },
        ]}
      >
        <Input.Password
          placeholder="Password"
          className="rounded-l-[10px] rounded-r-[10px] border-none !bg-[#c391aa] !text-white w-[390px]  "
        />
      </Form.Item>

      <Form.Item
        className="flex !justify-start w-[30px] !items-start  mt-[-15px] "
        name="remember"
        valuePropName="checked"
        // wrapperCol={{
        //   offset: 8,
        //   span: 16,
        // }}
      >
        <Checkbox  className="mt-[20px] !text-start w-[100%] flex !justify-start !items-start text-[#c391aa]">Remember me</Checkbox>
      </Form.Item>

      <Form.Item className=" flex justify-center">
        <Button
          type="enter"
          className="bg-[#3D266B] !text-white border-none flex justify-center rounded-l-[10px] rounded-r-[10px] w-[390px] "
          htmlType="submit"
       onClick={()=>{
        
       }}
          // loading={loading}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  </div>
  )
}

export default Page
