<template>
    <div class="manage">
        <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <!--用户表单信息-->
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="学号" prop="sno">
                    <el-input placeholder="请输入学号" v-model="form.sno"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="sname">
                    <el-input placeholder="请输入姓名" v-model="form.sname"></el-input>
                </el-form-item>
                <el-form-item label="用户类型" prop="usertype">
                    <el-input placeholder="请输入用户类型" v-model="form.usertype"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input placeholder="请输入密码" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="name">
                    <el-input placeholder="请输入昵称" v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button @click="handleAdd" type="primary">
                +新增
            </el-button>
        </div>
        <div class="table">
            <el-table stripe height="600px" :data="tableData" style="width: 100%">
                <el-table-column prop="sno" label="学号">
                </el-table-column>
                <el-table-column prop="sname" label="姓名">
                </el-table-column>
                <el-table-column prop="usertype" label="用户类型">
                </el-table-column>
                <el-table-column prop="password" label="密码">
                </el-table-column>
                <el-table-column prop="name" label="昵称">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDele(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pager">
                <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { getLoginUser,delLoginUser,updateLoginUser,addLoginUser,submitData,updateData,deleteData } from '@/api';
export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                sname: '',
                sno: '',
                usertype: '',
                password: ''
            },
            rules: {
                sname: [
                    {
                        required: true,message: '请输入姓名'
                    }
                ],
                sno: [
                    {
                        required: true,message: '请输入学号'
                    }
                ]
            },
            tableData: [
                {
                    name: '',
                    sname: '',
                    sno: '',
                    usertype: '',
                    password: ''
                }
            ],
            modelType: 0, //0表示新增，1表示编辑
            total: 100,//当前页面总条数
            pageData: {
                page: 1,
                limit: 10
            }
        }
    },
    methods: {
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.modelType === 0) {
                        addLoginUser(this.form)
                        submitData(this.form).then(() => {
                            this.$message.success("添加成功");
                            this.getList();
                            //清空表单数据
                            this.$refs.form.resetFields()
                            //关闭弹窗
                            this.dialogVisible = false
                        }).catch(() => {
                            this.$message.error("添加失败");
                        })
                    }
                    else {         
                        console.log(this.form,'form')
                        updateLoginUser(this.form)
                        updateData(this.form).then(() => {
                            this.$refs.form.resetFields()
                            //关闭弹窗
                            this.dialogVisible = false
                            this.getList();
                            this.$message.success("编辑成功");
                        }).catch(() => {
                            this.$message.error("编辑失败");
                        })
                        //清空表单数据

                    }
                    this.handleClose();
                }
            })
        },
        //弹窗关闭
        handleClose() {
            this.$refs.form.resetFields()
            this.dialogVisible = false
        },
        cancel() {
            this.handleClose()
        },
        handleEdit(row) {
            this.modelType = 1
            this.dialogVisible = true
            //对当前行数据进行深拷贝
            this.form = JSON.parse(JSON.stringify(row))
        },
        handleAdd() {
            this.modelType = 0
            this.dialogVisible = true
        },
        handleDele(row) {
            this.$confirm('此操作将永久删除该条信息, 是否继续?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteData({ sno: row.sno }).then(() => {
                    delLoginUser({ sno: row.sno });
                    this.getList();
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handlePage(val) {
            this.pageData.page = val;
            this.getList();
        },
        getList() {
            // 获取列表数据
            getLoginUser(this.pageData).then(({ data }) => {
                this.tableData = data;
            })
        }
    },
    mounted() {
        this.getList();
    }
}
</script>
<style lang="less" scoped>
.manage {
    height: 90%;

    .manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .table {
        position: relative;
        height: calc(100%-62px);

        .pager {
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }
}
</style>