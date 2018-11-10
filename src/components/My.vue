<template>
    <div class="my">
        <div class="user">
            <img src="../assets/user_imgs/1.png" alt="">
            <div class="name">是谁的 帖子呀</div>
        </div>
        <div class="decs">
            <div class="content">
                <div class="date">
                    <p>6日</p>
                    <p>9月</p>
                    <p>2018年</p>
                </div>
                <div>
                    <h2>标题内容</h2>
                    <div>我们去哪里</div>
                </div>
            </div>
            <div>
                <el-button type="primary" icon="el-icon-edit">搜索</el-button>
                <el-button type="danger" icon="el-icon-delete">搜索</el-button>
            </div>
        </div>
        <div class="pag">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "My",

    }
</script>

<style lang="scss" scoped>
    .my {
        height: 100%;
        width: 600px;
        .user {
            display: flex;
            background-color: #fff;
            img {
                padding: 10px;
            }
            .name {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .decs {

            background-color: #fff;
            margin-top: 10px;
            padding: 10px;
            .content {
                display: flex;
                .date {
                    p {
                        text-align: center;
                        color: #999;
                    }
                    margin-right: 10px;
                }
            }

        }
        .pag {
            border-top: 1px solid #ddd;
            background-color: #fff;
            text-align: center;
        }
    }
</style>