<template>
    <div class="container">
        <div class="content">
            <div class="nav">Book-Record</div>
            <div class="register-wrap">
                <div class="title">
                    <a class="register-title" href="">用户注册</a>
                    <a class="login-title" href="">用户登录</a>
                </div>
                <form class="input-wrap" 
                    @keyup.enter="submitForm()" 
                    :model="registerUser"
                    >
                    <input class="input" type="text" placeholder="手机号 / 邮箱" v-model="registerUser.name"/>
                    <input class="input" type="password" placeholder="密码" v-model="registerUser.password"/>
                    <input class="input" type="password" placeholder="确认密码" v-model="registerUser.confirmPassword"/>
                    <div class="btn" @click="submitForm()">注册</div>
                </form>
                <div class="tips">{{errorInfo}}</div>
            </div>
        </div>
    </div>
</template>


<script setup>
import {ref, reactive, getCurrentInstance} from "vue";
import {useRouter} from "vue-router"

const {proxy} = getCurrentInstance();
const router = useRouter();


const registerUser = reactive({
  name: "",
  password: "",
  confirmPassword: "",
});

let errorInfo = ref("");


const submitForm = () => {
    console.log(registerUser)
    if(registerUser.name === "" || registerUser.password === "" || registerUser.confirmPassword === ""){
        errorInfo = "输入项不能为空";
    }
    
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
          // console.log(err)
          proxy.$message.error("注册失败！");
        });
    
};
</script>

<style scoped>
    .container{
        background: url("../assets/images/background.png");
        background-size: 100% 100%;
        background-attachment: fixed;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .content{
        width: 800px;
        height: 450px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;

    }
    .nav{
        font:30px "微软雅黑";
        font-weight: 600;
        color: #333;
    }
    .register-wrap{
        width: 500px;
        height: 300px;
        margin: 10px auto;
        background: rgb(248, 233, 233);
        border-radius: 15px;
        overflow: hidden;
    }
    .title{
        width: 200px;
        height: 30px;
        font-size: 20px;
        margin: 10px auto 5px;
        height: 30px;
    }
    .register-title{
        text-decoration: none;
        display: inline;
        float: left;
    }
    .login-title{
        text-decoration: none;
        display: inline;
        float: right;
    }
    .input {
        width: 350px;
        height: 40px;
        font-size: 14px;
        padding: 10px;
        border-radius: 10px;
        box-sizing: border-box;
        border: 3px solid #f0979f;
        background: #fff;
        outline: none;
        margin-top: 10px;
    }
    .btn {
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
    .tips {
        color: red;
        text-align: left;
        width: 350px;
        margin: 0 auto;
    }

</style>