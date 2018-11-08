<template>
    <div class="header">
        <el-menu :default-active="$route.path" mode="horizontal" router>
            <el-menu-item index="/">首页</el-menu-item>

            <el-menu-item class="right" index="/register" v-if="isLogin">注册</el-menu-item>
            <el-menu-item class="right" index="/login" v-if="isLogin">登陆</el-menu-item>
            <el-menu-item class="right" index="/create" v-if="!isLogin"> 发帖</el-menu-item>
            <el-submenu class="right"  index="/my" v-if="!isLogin">
                <template slot="title">ggg</template>
                <el-menu-item index="/my?page=1">我的帖子</el-menu-item>
                <el-menu-item index="1" >注销</el-menu-item>
            </el-submenu>


        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isLogin: true
            };
        },
        methods: {

        }

    }
</script>

<style lang="scss" scoped>
    .header {
        height: auto;
        .right {
            float: right;
        }
    }
</style>