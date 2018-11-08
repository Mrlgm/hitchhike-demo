<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
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
        <el-form-item label="出行时间" required>
            <el-col :span="11">
                <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                                    style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-form-item prop="date2">
                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2"
                                    style="width: 100%;"></el-time-picker>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="起止地点" prop="desc">
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
                    name: '',
                    phone:'',
                    Identity: '',
                    date1: '',
                    date2: '',
                    desc: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入出行地点', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
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
                    desc: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
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
    .el-col-2{
        text-align: center;
    }
</style>