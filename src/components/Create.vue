<template>
    <div class="create">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="身份" prop="Identity">
                <el-select v-model="ruleForm.Identity" placeholder="请选择身份">
                    <el-option label="乘客" value="passenger"></el-option>
                    <el-option label="司机" value="driver"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出行时间段" required>
                <el-col :span="6">
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                                        style="width: 100%;" :picker-options="pickerOptions"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="3">-</el-col>
                <el-col :span="6">
                    <el-form-item prop="date2">
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2"
                                        style="width: 100%;"></el-time-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="3">-</el-col>
                <el-col :span="6">
                    <el-form-item prop="date3">
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date3"
                                        style="width: 100%;" :picker-options="pickerTime"></el-time-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="起止地点" required>
                <el-col :span="11">
                    <el-form-item prop="start">
                        <el-input placeholder="填写出发地" v-model="ruleForm.start" style="width: 100%;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-form-item prop="end">
                        <el-input placeholder="填写到达地" v-model="ruleForm.end" style="width: 100%;"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="备注" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "create",
        data() {
            return {
                ruleForm: {
                    title: '',
                    phone: '',
                    Identity: '',
                    date1: '',
                    date2: '',
                    date3: '',
                    start: '',
                    end: '',
                    desc: ''
                },
                rules: {
                    title: [
                        {required: true, message: '请输入出行地点', trigger: 'blur'},
                        {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入电话号码', trigger: 'blur'},
                        {min: 8, max: 11, message: '请输入正确规范电话号码', trigger: 'blur'}
                    ],
                    Identity: [
                        {required: true, message: '请选择个人身份', trigger: 'change'}
                    ],
                    date1: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    date2: [
                        {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    date3: [
                        {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    start: [
                        {required: true, message: '请输入出行地点', trigger: 'blur'},
                    ],
                    end: [
                        {required: true, message: '请输入到达地点', trigger: 'blur'},
                    ],
                    desc: [
                        {required: true, message: '请填写备注', trigger: 'blur'}
                    ]
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                },
                pickerTime: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                },
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let Blogs = this.$AV.Object.extend('Blogs');
                        let blogs = new Blogs();
                        let currentUser = this.$AV.User.current();
                        blogs.save({
                            title: this.ruleForm.title,
                            phone: this.ruleForm.phone,
                            Identity: this.ruleForm.Identity,
                            date1: this.ruleForm.date1,
                            date2: this.ruleForm.date2,
                            date3: this.ruleForm.date3,
                            start:this.ruleForm.start,
                            end:this.ruleForm.end,
                            desc: this.ruleForm.desc,
                            user: currentUser,
                            userId: currentUser.toJSON().objectId,
                        }).then(() => {
                            this.$notify({
                                title: '成功',
                                message: '发帖成功 ヾ(๑╹◡╹)ﾉ"',
                                type: 'success',
                                offset: 100
                            });
                            this.$router.push({
                                name: 'Index',
                                page: 1
                            });
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .create {
    }

    .line {
        text-align: center;
    }
</style>