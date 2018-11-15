<template>
    <div class="register">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                 class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
                <el-input v-model.number="ruleForm2.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="profession">
                <el-input v-model="ruleForm2.profession"></el-input>
            </el-form-item>
            <el-form-item label="年级" prop="grade">
                <el-input v-model="ruleForm2.grade"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-select v-model="ruleForm2.gender" placeholder="请选择性别">
                    <el-option label="男" value="man"></el-option>
                    <el-option label="女" value="woman"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系方式" prop="phoneNumber">
                <el-input v-model="ruleForm2.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="QQ" prop="qq">
                <el-input v-model="ruleForm2.qq"></el-input>
            </el-form-item>
            <el-form-item label="个性签名">
                <el-input type="textarea" v-model="ruleForm2.signature"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    const reg = /^\d+/;
    export default {
        name: "Register",
        data() {
            var checkName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                } else if (reg.test(value)) {
                    return callback(new Error('用户名不能以数字开头'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (value.length < 6 || value.length > 16) {
                    callback(new Error('密码长度6~16个字符'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                message: '',
                ruleForm2: {
                    name: '',
                    pass: '',
                    checkPass: '',
                    gender: '',
                    profession: '',
                    grade: '',
                    phoneNumber: '',
                    qq: '',
                    signature: ''
                },
                rules2: {
                    name: [
                        {validator: checkName, trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            ...mapActions(['register']),
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.register({
                            username: this.ruleForm2.name,
                            password: this.ruleForm2.pass,
                            gender: this.ruleForm2.gender,
                            profession: this.ruleForm2.profession,
                            grade: this.ruleForm2.grade,
                            phoneNumber: this.ruleForm2.phoneNumber,
                            qq: this.ruleForm2.qq,
                            signature: this.ruleForm2.signature
                        })
                            .then(res => {
                                this.$notify({
                                    type: 'success',
                                    title: '成功',
                                    message: '登录成功 ٩(๑❛ᴗ❛๑)۶',
                                    offset: 100
                                });
                                this.$router.push('/');
                            }, err => {
                                this.$message.error('该用户名已被注册');
                            });
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

<style lang="scss" scoped>
    .register {
        height: 100%;
        padding: 10px;
        background: hsla(0, 0%, 100%, .7);
        border-radius: 4px;
        .demo-ruleForm{
            width: 500px;
        }
    }
</style>