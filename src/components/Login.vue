<template>
    <div class="login">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                 class="demo-ruleForm" label-position="top">
            <el-form-item label="用户名" prop="name">
                <el-input v-model.number="ruleForm2.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'Login',
        data() {
            var checkName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
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
                    callback();
                }
            };
            return {
                message: '',
                ruleForm2: {
                    name: '',
                    pass: ''
                },
                rules2: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    name: [
                        {validator: checkName, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            ...mapActions(['login']),
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.login({
                            username: this.ruleForm2.name,
                            password: this.ruleForm2.pass
                        }).then(() => {
                            this.$notify({
                                type: 'success',
                                title: '成功',
                                message: '登录成功 ٩(๑❛ᴗ❛๑)۶',
                                offset: 100
                            });
                            this.$router.push({path: '/'})
                        }, err => {
                            if (err.code === 211) {
                                this.message = '该用户不存在';
                            } else {
                                this.message = '用户名与密码不匹配';
                            }
                            this.$message({
                                showClose: true,
                                message: this.message,
                                type: 'error'
                            });
                        })
                    } else {
                        console.log('error submit!!')
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
    .login {
        min-width: 500px;
    }
</style>