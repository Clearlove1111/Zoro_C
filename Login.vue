<template>
    <div class="login">
        <el-form class="login-container" ref="form" :model="form" :rules="rules">
            <h3 class="login_title">系统登录</h3>
            <el-form-item label="用户名" prop="name">
                <el-input v-model="form.name" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit" style="margin-left:137px;margin-top:10px" type="primary">Login</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>
<script>
import { getLogin,Query_Userinfo } from '../api'
import Cookie from 'js-cookie'
export default {
    data() {
        return {
            form: {
                name: '',
                password: '',
                sno: '',
                usertype: ''
            },
            rules: {
                name: [
                    { required: true,trigger: 'blur',message: '请输入用户名' }
                ],
                password: [
                    { required: true,trigger: 'blur',message: '请输入密码' }
                ]
            }
        }
    },
    methods: {
        //登录
        submit() {
            // token信息
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getLogin(this.form).then(({ data }) => {
                        //console.log(data);
                        if (data.status_code == "20000") {
                            // 将token信息存入cookie 用于不同页面间的通信
                            Cookie.set('token',data.status_code);
                            // 跳转到首页
                            this.$message.success("登录成功");
                            //console.log(data.username);
                            this.$store.commit('setLoginUser',data);
                            Query_Userinfo({ userid: data.sno }).then(({ data }) => {
                                this.$store.commit('setUserInfo',data);
                            })
                            this.$router.push('/home');
                        }
                        else {
                            this.$message.error("登录失败,请检查账号密码");
                        }
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.login {
    background: url("../assets/images/deft_1.jpg");
    width: 100%;
    height: 1200px;
    position: fixed;
    margin-top: -65px;
    margin-left: -10px;
    background-size: 100% 100%;

    .login-container {
        width: 350px;
        border: 1px solid #eaeaea;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0 0 25px #cac6c6;

        .login_title {
            text-align: center;
            margin-bottom: 40px;
            color: #505458;
        }
    }
}
</style>