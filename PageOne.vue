<template>
    <div class="manage">
        <el-dialog title="提示" :visible.sync="dialogVisible" width=" 40%" :before-close="handleClose">
            <!-- 用户的表单信息 -->
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="学号" prop="sid">
                    <el-input :disabled="status_form" placeholder="请输入学号" v-model="form.sid"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="sname">
                    <el-input :disabled="status_form" placeholder="请输入姓名" v-model="form.sname"></el-input>
                </el-form-item>
                <el-form-item label="课程号" prop="cid">
                    <el-input :disabled="status_form" placeholder="请输入课程号" v-model="form.cid"></el-input>
                </el-form-item>
                <el-form-item label="课程名" prop="cname">
                    <el-input :disabled="status_form" placeholder="请输入课程名" v-model="form.cname"></el-input>
                </el-form-item>
                <el-form-item label="成绩" prop="grade">
                    <el-input placeholder="请输入课程成绩" v-model.number="form.grade"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button @click="handleAdd" type="primary" style="margin-bottom: 25px;">+ 新增</el-button>
            <!-- form搜素区域 -->
            <el-form :inline="true" :model="userForm">
                <el-form-item>
                    <el-input placeholder="请输入课程名" v-model="userForm.cname"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="common-table">
            <el-table stripe height="600px" :data="tableData" style="width: 100%">
                <el-table-column prop="sid" label="学号">
                </el-table-column>
                <el-table-column prop="sname" label="姓名">
                </el-table-column>
                <el-table-column prop="cid" label="课程号">
                </el-table-column>
                <el-table-column prop="cname" label="课程名">
                </el-table-column>
                <el-table-column prop="grade" label="成绩">
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleEdit(scope.row)" :disabled="status_edtbtn">
                            编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)" :disabled="status_delbtn">
                            删除</el-button>
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
import { Query_sc_cname,Query_sc,Insert_sc,Update_sc,Delete_sc,Querysc_s } from '../api'
import { mapState } from 'vuex';
export default {
    data() {
        var checkGrade = (rule,value,callback) => {
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else if (value < 0 || value > 100) {
                callback(new Error('请输入合法成绩值'));
            } else {
                callback();
            }
        };
        return {
            dialogVisible: false,
            status_form: false,
            status_delbtn: false,
            status_edtbtn: false,
            form: {
                sid: '',
                sname: '',
                cid: '',
                cname: '',
                grade: '',
            },
            rules: {
                sid: [
                    { required: true,message: '请输入学号' }
                ],
                sname: [
                    { required: true,message: '请输入姓名' }
                ],
                cid: [
                    { required: true,message: '请输入课程号' }
                ],
                cname: [
                    { required: true,message: '请输入课程名' }
                ],
                grade: [
                    { validator: checkGrade }
                ],
            },
            tableData: [],
            modelType: 0, // 0 新增 1 编辑
            total: 100, // 当前的总条数
            pageData: {
                page: 1,
                limit: 10
            },
            userForm: {
            }
        };
    },
    methods: {
        //提交用户表单
        submit() {
            let validateFieldList = [];
            if (this.modelType === 0) {
                this.$refs.form.validateField(["sid","sname","cid","cname"],(valid) => {
                    //console.log(valid,'valid');
                    //console.log(this.form,'form');
                    if (!valid) {
                        // 后续对表单数据的处理
                        validateFieldList.push(valid);
                        console.log(validateFieldList,'valid');
                        if (
                            validateFieldList.length == 4 &&
                            validateFieldList.every((item) => item === "")
                        ) {
                            Insert_sc(this.form).then(() => {
                                // 重新获取列表接口
                                this.$message.success("添加成功");
                                this.getList();
                            }).catch(() => {
                                this.$message.error("添加失败");
                            })
                            this.handleClose();
                        }
                    }
                })
            }
            else {
                this.$refs.form.validateField(["grade"],(valid) => {
                    // console.log(valid,'valid');
                    //console.log(this.form,'form');
                    if (!valid) {
                        // 后续对表单数据的处理
                        validateFieldList.push(valid);
                        if (
                            validateFieldList.length == 1 &&
                            validateFieldList.every((item) => item === "")
                        ) {
                            Update_sc(this.form).then(() => {
                                // 重新获取列表接口
                                this.$message.success("编辑成功");
                                this.getList();
                            }).catch(() => {
                                this.$message.error("编辑失败");
                            })
                            this.handleClose();
                        }
                    }
                })
            }
            //console.log(this.form,'form');
            // 关闭弹窗
        },
        // 弹窗关闭的时候
        handleClose() {
            this.$refs.form.resetFields();
            this.dialogVisible = false;
        },
        cancel() {
            this.handleClose();
        },
        handleEdit(row) {
            this.modelType = 1;
            this.dialogVisible = true;
            this.status_form = true;
            // 注意需要对当前行数据进行深拷贝
            //console.log(row,"row");
            this.form = JSON.parse(JSON.stringify(row));
            //console.log(this.form,"form");

        },
        handleDelete(row) {
            this.$confirm('此操作将永久删除该词条, 是否继续?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                closeOnClickModal: false,
            }).then(() => {
                Delete_sc({ sid: row.sid,cid: row.cid }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getList();
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleAdd() {
            if (this.loginUser.usertype == "管理员") {
                this.modelType = 0;
                this.dialogVisible = true;
                this.status_form = false;
            }
            else if (this.loginUser.usertype == "学生") {
                this.$message.warning("您当前身份为学生,无权进行此操作!");
            }
        },
        getList() {
            // 获取列表数据
            if (this.loginUser.usertype == "管理员") {
                Query_sc(this.pageData).then(({ data }) => {
                    //console.log(data,"data");
                    this.tableData = data;
                    //console.log(this.tableData,"tabledata");
                })
            }
            else if (this.loginUser.usertype == "学生") {
                Querysc_s({
                    sid: this.loginUser.sno,
                    page: this.pageData.page,
                    limit: this.pageData.limit
                }).then(({ data }) => {
                    this.tableData = data;
                })
            }
        },
        //选择页码的回调函数
        handlePage(val) {
            //console.log(val,'val');
            this.pageData.page = val;
            this.getList();
        },
        // 列表查询
        onSubmit() {
            if (this.userForm.cname == null)
                this.$message.warning("请输入名字再进行查询!");
            else {
                Query_sc_cname(this.userForm).then(({ data }) => {
                    this.tableData = data;
                    this.userForm.cname = null;
                })
            }
        }
    },
    mounted() {
        this.getList();
        if (this.loginUser.usertype == "学生") {
            this.status_delbtn = true;
            this.status_edtbtn = true;
        }
    },
    computed: mapState({
        loginUser: state => state.tab.loginUser,
    })
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

    .common-table {
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