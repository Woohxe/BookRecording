<template>
    <div class="container">
        <div class="content">
            <div class="title">Book-Record</div>
            <div class="wrap">
                <div class="nav">
                    <router-link to="/login" class="login-title">用户登录</router-link>
                    <router-link to="/register" class="register-title" >用户注册</router-link>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
    .container{
        background: url("@/assets/images/background.png");
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
    .title{
        font:30px "微软雅黑";
        font-weight: 600;
        color: #333;
    }
    .wrap{
        width: 500px;
        min-height: 100px;
        padding-bottom: 30px;
        margin: 10px auto;
        background: rgb(248, 233, 233);
        border-radius: 15px;
        overflow: hidden;
    }
    /* 导航框 */
    .nav{
        width: 200px;
        height: 30px;
        font-size: 20px;
        margin: 10px auto 5px;
        height: 30px;
    }
    .login-title{
        text-decoration: none;
        color: #f0979f;
        display: inline;
        float: left;
    }
    .register-title{
        text-decoration: none;
        color: #f0979f;
        display: inline;
        float: right;
    }
    .router-link-active{
        color: #961924;
    }
</style>