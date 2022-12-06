<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <h3>{{ isCollapse ? "系统" : "信息管理系统" }}</h3>
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
                <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>
<style lang="less"scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    height: 1080px;

    h3 {
        color: #ffffff;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400px;
    }
}
</style>
  
<script>
export default {
    data() {
        return {
            menuData: [
            ]
        };
    },
    methods: {
        handleOpen(key,keyPath) {
            console.log(key,keyPath);
        },
        handleClose(key,keyPath) {
            console.log(key,keyPath);
        },
        //点击菜单跳转路由
        clickMenu(item) {
            //当页面与跳转路由不一致的时候才跳转
            if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) {
                this.$router.push(item.path)
            }
            this.$store.commit('selectMenu',item)
        }
    },
    //computed中定义isCollapse
    computed: {

        //没有子菜单
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },

        //有子菜单
        hasChildren() {
            return this.menuData.filter(item => item.children)
        },
        //折叠展开
        isCollapse() {
            return this.$store.state.tab.isCollapse
        }

    },
    mounted() {
        if (this.$store.state.tab.loginUser.usertype == "学生") {
            this.menuData = this.$store.state.tab.menuData_student;
        }
        else if (this.$store.state.tab.loginUser.usertype == "管理员") {
            this.menuData = this.$store.state.tab.menuData_admin;
        }
    }
}
</script>
<style lang="less" scoped>
.el-menu {
    border-right: none;
}
</style>