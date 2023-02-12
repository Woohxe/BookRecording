<template>
    <el-form
        ref="registerForm"
        :model="registerUser"
        :rules="rules"
        @keyup.enter="submitForm(registerForm)" 
        >
        <el-form-item label="用户名" prop="name" class="item">
          <input class="input"
            v-model="registerUser.name"
            type="text"
            autocomplete="off"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password" class="item">
          <input class="input"
            v-model="registerUser.password"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" class="item">
          <input class="input"
            v-model="registerUser.confirmPassword"
            type="password"
            autocomplete="off"
            placeholder="请在此输入密码"
          />
        </el-form-item>
        <el-button type="primary" class="btn" @click="submitForm(registerForm)">注册</el-button>
    </el-form>
</template>


<script setup>
import { reactive, ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const { proxy } = getCurrentInstance();

const registerForm = ref(null);

const registerUser = reactive({
  name: "",
  password: "",
  confirmPassword: "",
});

const validatePasswordAgain = (rule, value, callback) => {
  if (value !== registerUser.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};
const rules = reactive({
  name: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "blur",
    },
    {
      min: 2,
      max: 30,
      message: "长度要在2-30个字符之间",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },
    {
      min: 6,
      max: 30,
      message: "长度在6到30个字符",
      trigger: "blur",
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },
    {
      min: 6,
      max: 30,
      message: "长度在6到30个字符",
      trigger: "blur",
    },
    {
      validator: validatePasswordAgain,
      trigger: "blur",
    },
  ],
  // identify: [],
});

// 注册事件
const submitForm = (registerForm) => {
  registerForm.validate((valid) => {
    if (valid) {
      proxy.$axios
        .post("/admin/register", registerUser)
        .then((res) => {
          // 注册成功
          proxy.$message({
            messaeg: "账号注册成功",
            type: "success",
          });

          // 路由跳转
          router.push("/login");
        })
        .catch((err) => {
          proxy.$message.error(err.response.data);
        });
    } else {
      proxy.$message({
        type: "error",
        message: "错误提交申请,请按要求填写",
      });
      return false;
    }
  });
};
</script>

<style>
    .item{
        width: 350px;
        height: 50px;
        font-size: 14px;
        margin:10px auto;
    }
    .el-form-item__label{
        width: 80px;
        line-height: 50px;
        justify-content: flex-start;
    }
    .input {
        width: 270px;
        height: 30px;
        padding: 10px;
        border-radius: 10px;
        box-sizing: border-box;
        border:3px solid #f0979f;
        background: #fff;
        outline: none;
    }
    .btn{
        width: 350px;
        height: 40px;
        border: none;
        border-radius: 3px;
        color: #fff;
        font-size: 20px;
        font-weight: 600;
        line-height: 36px;
        text-align: center;
        outline: 0;
        cursor: pointer;
        margin: 0 auto;
        margin-top: 10px;
        background-color: #ebaec2;
    }
    .btn:hover{
        background-color: #e95888;
    }

</style>