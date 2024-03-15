"use client";
import {
  DownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Dropdown, Form, Layout, Menu, Modal, Button, theme, Input } from "antd";

import { useRouter } from "next/navigation";

import Image from "next/image";

import React, { useState } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo.user,"==========userInfo===========")
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [form] = Form.useForm();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleShowChangePasswordModal = () => {
    setShowChangePasswordModal(true);
  };
  const navigate = (path) => {
    router.push(path);
  };
console.log(collapsed,"===================")
  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };
  const handleLogout = () => {

    Cookies.remove("apiToken");
 
    router.push("/");
  };
  const items = [
    {
      key: "1",
      label: (
        <a className="font !text-[#F24044] hover:none">
          <UserOutlined /> Profile edit
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          className="font !text-[#F24044]"
          onClick={handleShowChangePasswordModal}
        >
          <UserOutlined /> Change Password
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          className="flex justify-center text-center rounded-l-[20px] pt-[5px] pb-[5px] rounded-r-[20px]  bg-[#F24044] !text-white"
          onClick={handleLogout}
        >
          <LogoutOutlined />
          Logout
        </a>
      ),
    },
  ];
  const generateMenuItems = () => {
    console.log("sabgqebew");
    return [
      getItem(
        "Dashboard",
        "1",
        <Image
          src={"assets/icon/bxs_dashboard.svg"}
          width={20}
          height={20}
          alt=""
        />,
        null
      ),

      getItem(
        "Authentication",
        "sub1",
        <Image
          src={"assets/icon/carbon_two-factor-authentication.svg"}
          width={20}
          height={20}
          alt=""
        />,
        [
          getItem("All Users", "sub12", <Image src={""} alt="" />, null, () => navigate("/alluser")),
          getItem("Active Users", "sub13", <Image src={""} alt="" />, null),

          getItem("Inactive Users", "sub14", <Image src={""} alt="" />, null),
        ]
      ),
      getItem(
        "Subscription plans",
        "sub2",
        <Image
          src={"assets/icon/mdi_subscriptions.svg"}
          width={20}
          height={20}
          alt=""
        />,
        [
          getItem(
            "  Add Subscription",
            "sub15",
            <Image src={""} alt="" />,
            null
          ),

          getItem(
            "Fetch Subscription",
            "sub16",
            <Image src={""} alt="" />,
            null
          ),
        ]
      ),

      getItem(
        " User Subscription ",
        "sub3",
        <Image
          src={"assets/icon/uiw_user-add.svg"}
          width={20}
          height={20}
          alt=""
        />,
        [
          getItem(
            "Users Subscription",
            "sub17",
            <Image src={""} alt="" />,
            null
          ),
        ]
      ),
    ];
  };
  const item = generateMenuItems();
  function getItem(label, key, icon, children, onClick) {
    return {
      key,
      icon,
      children,
      label,
      onClick,
    };
  }

  return (
    <Layout className="!bg-[#fff]"
      style={{
        minHeight: "100vh",
        width: "auto",
      }}
    >
      <Sider
        className="sider min-w-[900px] rounded-[20px] m-[10px] !bg-[#fff]"
        trigger={null}
        collapsible
        width="300px"
        collapsed={collapsed}
      >
         <div className="p-[20px] text-[22px]">
          <h1 className="text-white text-center">
            <Image
              width={800}
              height={800}
              alt=""
              className=""
              src="/assets/images/white_logo.png"
            />
          </h1>
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          className=" bg-transparent"
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={item}
        />
        
      </Sider>
      <Layout  className=" !bg-[#fff]">
        <Header
          className="!bg-[#fff] header   "
          style={{
            padding: 0,
            background: colorBgContainer,
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex items-center justify-between">
           
          <div>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </div>
         
            <div>
              <Modal
                className="change-password-modal relative"
                height={379}
                open={showChangePasswordModal}
                onCancel={handleCloseChangePasswordModal}
                footer={null}
              >
                <img
                  className=" absolute"
                  src="/assets/images/GroupCircle.png"
                  alt="Modal Image"
                />
                <Form
                  form={form}
                  name="changePasswordForm"
                  // onFinish={handleForgetPassword}
                  // onFinishFailed={onFinishFailed}
                >
                  <div className="flex gap-0 flex-col w-[100%] h-[300px] justify-center items-center">
                    <p className="text-[22px] text-[#F24044] Poppins font-[500] mb-[10px]">
                      Change Password
                    </p>
                    <Form.Item
                      name="oldPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your old password!",
                        },
                      ]}
                    >
                      <Input.Password
                        className="w-[300px]  rounded-r-[20px] rounded-l-[20px]"
                        placeholder="Old Password"
                      />
                    </Form.Item>

                    <Form.Item
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your new password!",
                        },
                      ]}
                    >
                      <Input.Password
                        className="w-[300px]   rounded-r-[20px] rounded-l-[20px]"
                        placeholder="New Password"
                      />
                    </Form.Item>

                    <Form.Item
                      name="confirmPassword"
                      dependencies={["newPassword"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your new password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("The two passwords do not match!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        className="w-[300px]  rounded-r-[20px] rounded-l-[20px]"
                        placeholder="Confirm Password"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        className="bg-[#F24044] !border-none w-[200px] !text-white rounded-r-[20px] rounded-l-[20px]"
                        htmlType="submit"
                        // loading={loadingUpdateProfile}
                      >
                        Update Password
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </Modal>
              <div className="flex justify-between relative">
                <div className="flex text-center hello items-center w-[180px] h-[40px] bg-[#D55E79] mr-[20px] rounded-r-[50px]">
                  <Dropdown
                    className=" ml-[40px] w-[100px] "
                    menu={{
                      items,
                    }}
                    trigger={["click"]}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <div className="text-[#ffffff] font-semibold flex  overflow-ellipsis justify-between">
                      
                        <p className=" overflow-ellipsis">  {userInfo.user.userName}</p>
                        <DownOutlined className="" />
                      </div>
                    </a>
                  </Dropdown>
                </div>
                <img
                  alt=""
                  className="w-[50px] h-[50px] rounded-[50%] ml-[-20px] mt-[-5px]  absolute"
                  src={userInfo.user.profileImage|| null}
                  // src="/assets/images/Ellipse 1.png"
                />
              </div>
            </div>
          </div>
        </Header>
        <div>{children}</div>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;

// // {children}

// import { Layout } from 'antd'
// import React from 'react'

// const DashboardLayout = ({ children }) => {
//   return (
//     <Layout>

//       <div>{children}</div>
//     </Layout>
  

 
//   )
// }

// export default DashboardLayout
