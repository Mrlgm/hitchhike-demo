<template>
    <div class="header">
        <el-menu :default-active="$route.path" mode="horizontal" router>
            <el-menu-item index="/">首页</el-menu-item>

            <el-menu-item class="right" index="/register" v-if="!isLogin">注册</el-menu-item>
            <el-menu-item class="right" index="/login" v-if="!isLogin">登陆</el-menu-item>
            <el-menu-item class="right" index="/create" v-if="isLogin"> 发帖</el-menu-item>

            <el-submenu class="right" index="/my" v-if="isLogin">
                <template slot="title">
                    {{user.username}}
                </template>
                <el-menu-item index="/my?page=1">我的帖子</el-menu-item>
                <el-menu-item index="1" @click="logout">注销</el-menu-item>
            </el-submenu>
            <img class="img right" v-if="isLogin" :src="user.avatar" alt="">
        </el-menu>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        data() {
            return {};
        },
        computed: {
            ...mapGetters(['isLogin', 'user'])
        },
        created() {
            this.checkLogin()
        },
        methods: {
            ...mapActions(['checkLogin', 'logout'])
        }

    }
</script>

<style lang="scss" scoped>
    .header {
        height: auto;
        .right {
            float: right;
        }
        .img {
            height: 45px;
            width: 45px;
            margin-top: 8px;
            outline: none;
        }
    }
</style>