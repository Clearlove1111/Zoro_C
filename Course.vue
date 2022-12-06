<template>
    <div class="manage">
        <el-dialog title="提示" :visible.sync="dialogVisible" width=" 40%" :before-close="handleClose">
            <!-- 用户的表单信息 -->
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="课程号" prop="cid">
                    <el-input :disabled="status_form" placeholder="请输入课程号" v-model="form.cid"></el-input>
                </el-form-item>
                <el-form-item label="课程名" prop="cname">
                    <el-input placeholder="请输入课程名" v-model="form.cname"></el-input>
                </el-form-item>
                <el-form-item label="课程学分" prop="credit">
                    <el-input placeholder="请输入课程学分" v-model="form.credit"></el-input>
                </el-form-item>
                <el-form-item label="开设专业" prop="cdept">
                    <el-select v-model="form.cdept" placeholder="请选择">
                        <el-option label="计科" :value="'计科'"></el-option>
                        <el-option label="管理" :value="'管理'"></el-option>
                        <el-option label="文学" :value="'文学'"></el-option>
                        <el-option label="数学" :value="'数学'"></el-option>
                        <el-option label="物理" :value="'物理'"></el-option>
                        <el-option label="生物" :value="'生物'"></el-option>
                        <el-option label="马哲" :value="'马哲'"></el-option>
                        <el-option label="历史" :value="'历史'"></el-option>
                        <el-option label="音乐" :value="'音乐'"></el-option>
                    </el-select>
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
                <el-table-column prop="cid" label="课程号">
                </el-table-column>
                <el-table-column prop="cname" label="课程名">
                </el-table-column>
                <el-table-column prop="credit" label="课程学分">
                </el-table-column>
                <el-table-column prop="cdept" label="开设专业">
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleSlt(scope.row)" :style="status_sltbtn">选课
                        </el-button>
                        <el-button type="primary" size="mini" @click="handleEdit(scope.row)" :style="status_edtbtn">编辑
                        </el-button>
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
import { Query_cname,Query_course,Add_course,Edit_course,Del_course,Insert_sc } from '../api'
import { mapState } from 'vuex';
export default {
    data() {
        return {
            dialogVisible: false,
            status_delbtn: false,
            status_form: false,
            status_sltbtn: {
                display: 'none'
            },
            status_edtbtn: {
                display: 'none'
            },
            form: {
                cid: '',
                cname: '',
                credit: '',
                cdept: '',
            },
            rules: {
                cid: [
                    { required: true,message: '请输入课程号' }
                ],
                cname: [
                    { required: true,message: '请输入课程名' }
                ],
                credit: [
                    { required: true,message: '请输入课程学分' }
                ],
                cdept: [
                    { required: true,message: '请选择开设专业' }
                ]
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
            this.$refs.form.validate((valid) => {
                // console.log(valid,'valid');
                //console.log(this.form,'form');
                if (valid) {
                    // 后续对表单数据的处理
                    if (this.modelType === 0) {
                        Add_course(this.form).then(() => {
                            // 重新获取列表接口
                            this.$message.success("添加成功");
                            this.getList();
                        }).catch(() => {
                            this.$message.error("添加失败");
                        })
                    } else {
                        Edit_course(this.form).then(() => {
                            // 重新获取列表接口
                            this.$message.success("编辑成功");
                            this.getList();
                        }).catch(() => {
                            this.$message.error("编辑失败");
                        })
                    }
                    //console.log(this.form,'form');
                    // 关闭弹窗
                    this.handleClose();
                }
            })
        },
        // 弹窗关闭的时候
        handleClose() {
            this.$refs.form.resetFields();
            this.dialogVisible = false;
        },
        cancel() {
            this.handleClose();
        },
        handleSlt(row) {
            this.$confirm(`<p>是否选择该课程, 请仔细核对信息!</p>
                           <p>课程名: ${row.cname}</p>
                           <p>开设专业: ${row.cdept}</p>`,'提示',{
                dangerouslyUseHTMLString: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                closeOnClickModal: false,
            }).then(() => {
                this.form = JSON.parse(JSON.stringify(row));
                //console.log(this.loginUser);
                Insert_sc({
                    sid: this.loginUser.sno,
                    sname: this.loginUser.name,
                    cid: row.cid,
                    cname: row.cname,
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '选课成功!'
                    });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消选课'
                });
            })
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
                Del_course({ cid: row.cid }).then(() => {
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

            Query_course(this.pageData).then(({ data }) => {
                //console.log(data,"data");
                this.tableData = data;
                //console.log(this.tableData,"tabledata");
            })
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
                Query_cname(this.userForm).then(({ data }) => {
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
            this.status_sltbtn.display = 'all';
        }
        else if (this.loginUser.usertype == "管理员") {
            this.status_edtbtn.display = 'all';
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