<template>
    <el-form  
        ref="loginForm"
        :rules="rules"
        @keyup.enter="submitForm(loginForm)" 
        :model="user"
        >
         <el-form-item label="用户名" prop="name" class="item">
          <input class="input"
            v-model="user.name"
            type="text"
            autocomplete="off"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password" class="item">
          <input class="input"
            v-model="user.password"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submitForm(loginForm)"
            >登录</el-button
          >
        </el-form-item>
    </el-form>
</template>


<script setup>
import jwt_decode from "jwt-decode";
import { ref, reactive, getCurrentInstance } from "vue";
import { useRouter } from "vue-router"
import { useStore } from "vuex"

const {proxy} = getCurrentInstance();
const router = useRouter();
const store = useStore();

const loginForm = ref(null);

const user = reactive({
  name: "",
  password: "",
});

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
});

// 判断token是否为空
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

// 登录事件
const submitForm = (loginForm) => {
    loginForm.validate((valid) => {
        if(valid){
            proxy.$axios
                .post("./admin/login", user)
                .then((res) => {
                    const { token } = res.data;
                    localStorage.setItem("bookRecordToken", token);

                    const decoded = jwt_decode(token);
                    store.dispatch("setAuthenticated", !isEmpty(decoded));
                    store.dispatch("setUser", decoded);
                    //登录后跳转
                    router.push("/home");
                })
                .catch((err) => {
                  proxy.$message.error("登录失败，请重试！");
                });
        }
        else{
          proxy.$message({
            type: "error",
            message: "错误提交申请,请按要求填写"
          });
          return false;
        }
    });
};
</script>

<style scoped>
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