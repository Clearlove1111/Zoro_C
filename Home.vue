<template>
    <el-row>
        <el-col :span="12">
            <el-card class="box-card">
                <div class="user">
                    <img src="../assets/images/Deft.jpg" alt="">
                    <div class="userinfo">
                        <p class="name">{{ loginUser.name }}</p>
                        <p class="access">{{ loginUser.usertype }}</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>登录时间:<span>{{ this.time }}</span></p>
                    <p>登录地点:<span>北京</span></p>
                </div>
            </el-card>
            <el-card style="margin-top:20px;height:460px;">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="sno" label="学号">
                    </el-table-column>
                    <el-table-column prop="sname" label="姓名">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="12">
            <div class="grid-content bg-purple-light"></div>
        </el-col>
    </el-row>
</template>
<script>
import { getData } from '@/api';
import { mapState } from 'vuex';
export default {
    data() {
        return {
            tableData: [
            ],
            time: [],
        }
    },
    mounted() {
        getData().then(({ data }) => {
            this.tableData = data
        })
        this.time = new Date().toLocaleDateString();
    },
    computed: mapState({
        loginUser: state => state.tab.loginUser,
    })
}
</script>
<style lang="less" scoped>
.user {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;

    img {
        margin-right: 40px;
        width: 50%;
        height: 50%;
        border-radius: 50%;
    }

    .userinfo {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .access {
            color: #999999
        }
    }
}

.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;

        span {
            color: #666666;
            margin-left: 60px;
        }
    }
}
</style>