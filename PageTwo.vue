<template>
    <div class="manage">
        <el-dialog title="提示" :visible.sync="dialogVisible" width=" 40%" :before-close="handleClose">
            <!-- 用户的个人信息 -->
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="编号" prop="userid">
                    <el-input :disabled="status_form" placeholder="请输入编号" v-model="form.userid"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input placeholder="请输入姓名" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="userphone">
                    <el-input placeholder="请输入手机号" v-model="form.userphone"></el-input>
                </el-form-item>
                <el-form-item label="居住地" prop="userlivingcity">
                    <el-input placeholder="请输入居住地" v-model="form.userlivingcity"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="usernote">
                    <el-select v-model="form.usernote" placeholder="请选择备注">
                        <el-option label="学校" :value="'学校'"></el-option>
                        <el-option label="家" :value="'家'"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系地址" prop="useraddress">
                    <el-input placeholder="请输入联系地址" v-model="form.useraddress"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <el-descriptions class="margin-top" title="个人信息" :column="1" border>
            <template slot="extra">
                <el-button type="primary" size="small" @click="handleEdit">编辑</el-button>
            </template>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    编号
                </template>
                {{ userInfo.userid }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    用户名
                </template>
                {{ userInfo.username }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    手机号
                </template>
                {{ userInfo.userphone }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-location-outline"></i>
                    居住地
                </template>
                {{ userInfo.userlivingcity }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-tickets"></i>
                    备注
                </template>
                <el-tag size="small"> {{ userInfo.usernote }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-office-building"></i>
                    联系地址
                </template>
                {{ userInfo.useraddress }}
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script>
import { updateUserInfo,Query_Userinfo } from '../api'
import { mapState } from 'vuex';
export default {
    data() {
        return {
            dialogVisible: false,
            status_form: false,
            form: {
                userid: '',
                username: '',
                userphone: '',
                userlivingcity: '',
                usernote: '',
                useraddress: '',
            },
            rules: {
                userid: [
                    { required: true,message: '请输入编号' }
                ],
                username: [
                    { required: true,message: '请输入姓名' }
                ],
                userphone: [
                    { message: '请输入手机号' }
                ],
                userlivingcity: [
                    { message: '请输入居住地' }
                ],
                usernote: [
                    { message: '请选择备注' }
                ],
                useraddress: [
                    { message: '请输入联系地址' }
                ]
            },
        };
    },
    methods: {
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    updateUserInfo(this.form).then(() => {
                        this.$message.success("编辑成功");
                        Query_Userinfo({ userid: this.form.userid }).then(({ data }) => {
                            this.$store.commit('setUserInfo',data);
                        })
                    }).catch(() => {
                        this.$message.error("编辑失败");
                    })
                }
                this.handleClose();
            })
        },
        handleClose() {
            this.$refs.form.resetFields();
            this.dialogVisible = false;
        },
        cancel() {
            this.handleClose();
        },
        handleEdit() {
            this.dialogVisible = true;
            this.status_form = true;
            // 注意需要对当前行数据进行深拷贝
            //console.log(row,"row");
            this.form = this.userInfo;
            //console.log(this.form,"form");
        },
    },
    computed: mapState({
        loginUser: state => state.tab.loginUser,
        userInfo: state => state.tab.userInfo,
    })
}
</script>

<style lang="less" scoped>
/deep/.el-descriptions__title {
    font-size: 22px;
    margin-left: 800px;
}
</style>