<template>
    <div class="header-container">
        <div class="l-content">
            <el-button @click="handleMenu" icon="el-icon-menu" size="mini" style="margin-right: 20px"></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleClick">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/images/Deft.jpg" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                    <el-dropdown-item command="cancel">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
    data() {
        return {}
    },
    //点击触发mutation(collapseMenu)
    methods: {
        handleMenu() {
            this.$store.commit('collapseMenu')
        },
        handleClick(command) {
            if (command === 'cancel') {
                //清除token
                this.$store.commit('clearLoginUser');
                this.$store.commit('cleartabsList');
                Cookie.remove('token')
                //跳转
                this.$router.push('/login')
            }
            else if (command === 'userinfo') {
                if (this.$route.path !== '/Page2') {
                    this.$router.push('/Page2');
                }
            }
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabList
        })
    }
}
</script>
<style lang="less" scoped>
.header-container {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .text {
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
    }

    .r-content {
        .user {
            widows: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }

    .l-content {
        display: flex;
        align-items: center;


        .el-breadcrumb ::v-deep .el-breadcrumb__inner {
            color: #87CEFA !important;
            border-left: 30px;
        }
    }
}
</style>