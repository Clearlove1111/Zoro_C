export default {
    state :{
        isCollapse : false, 
        //控制菜单展开
        tabList :[
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            },
        ],
        loginUser: null,
        userInfo: null,
        //面包屑
        menuData_admin:
        [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            },
            {
                path: '/user',
                name: 'user',
                label: '用户管理',
                icon: 'user',
                url: 'UserManage/UserManage'
            },
            {
                path: '/course',
                name: 'course',
                label: '课程管理',
                icon: 'video-play',
                url: 'CourseManage/CourseManage'
            },
            {
                label: '其他',
                icon: 'setting',
                children: [
                    {
                        path: '/page1',
                        name: 'pag1',
                        label: '成绩管理',
                        icon: 'setting',
                        url: 'Other/PageOne'
                    },
                    {
                        path: '/page2',
                        name: 'pag2',
                        label: '个人信息管理',
                        icon: 'setting',
                        url: 'Other/PageTwo'
                    },
                ]
            }
        ],
    menuData_student:
        [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            },
            {
                path: '/course',
                name: 'course',
                label: '选课系统',
                icon: 'reading',
                url: 'CourseManage/CourseManage'
            },
            {
                label: '其他',
                icon: 'setting',
                children: [
                    {
                        path: '/page1',
                        name: 'pag1',
                        label: '成绩查看',
                        icon: 'setting',
                        url: 'Other/PageOne'
                    },
                    {
                        path: '/page2',
                        name: 'pag2',
                        label: '个人信息管理',
                        icon: 'setting',
                        url: 'Other/PageTwo'
                    },
                ]
            }
        ],
    },
    mutations :{
        //修改方法
        collapseMenu(state) {
            state.isCollapse= !state.isCollapse
        },
        //更新面包屑的数据
        selectMenu(state,val) {
            //判断添加数据是否为首页
            if (val.name !== 'home'){
                const index=state.tabList.findIndex(item => item.name === val.name)
                if(index === -1){
                    state.tabList.push(val)
                }
            }
        },
        setLoginUser(state, user) {
            state.loginUser = user;
        },
        clearLoginUser(state) {
            state.loginUser = null;
        },
        setUserInfo(state, userinfo) {
            //console.log(userinfo,"userinfo");
            state.userInfo = userinfo;
        },
        clearUserInfo(state) {
            state.userInfo = null;
        },
        cleartabsList(state) {
            state.tabList = [
                {
                    path: '/',
                    name: 'home',
                    label: '首页',
                    icon: 's-home',
                    url: 'Home/Home'
                }//面包屑数据
            ]
        },
    }
}