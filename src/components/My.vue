<template>
    <div class="my">
        <div class="user">
            <img :src="user.avatar" alt="">
            <div class="name">{{user.username}} 的帖子</div>
        </div>
        <div class="decs" v-for="blog in blogList">
            <div class="content">
                <div class="date">
                    <p>{{blog.createdAt | day}}日</p>
                    <p>{{blog.createdAt | month}}月</p>
                    <p>{{blog.createdAt | year}}年</p>
                </div>
                <div>
                    <h2>{{blog.title}}</h2>
                    <div>{{blog.desc}}</div>
                </div>
            </div>
            <div>
                <el-button type="primary" icon="el-icon-edit"  @click="$router.push({name:'Edit',params:{blogId:blog.id}})">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteBlog(blog.id)">删除</el-button>
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
    import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
                blogList: [],
                page: 1,
                total: 0
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        created() {
            this.page = this.$route.query.page - 0 || 1;
            this.blogList = this.getUserBlog(this.page);
            console.log(this.blogList)
        },
        methods: {
            getUserBlog(page) {
                let query = new this.$AV.Query('Blogs');
                query.descending('createdAt');
                query.equalTo('userId', this.user.objectId);
                query.count().then(count => {
                    this.total = count;
                });
                query.limit(10); // 每页返回 10 条结果
                query.skip((page - 1) * 10);
                let list = [];
                query.find().then(blogs => {

                    blogs.forEach((blog, index) => {
                        list.push({
                            id: blog.id,
                            title: blog.attributes.title,
                            desc: blog.attributes.desc,
                            createdAt: blog.createdAt,
                            updatedAt: blog.updatedAt,
                        });
                    })
                });
                return list
            },
            changePage(page) {
                this.getUserBlog(page);
            },
            deleteBlog(blogId) {
                this.$confirm('此操作将永久删除该帖, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var blog = this.$AV.Object.createWithoutData('Blogs', blogId);
                    blog.destroy().then(success => {
                        this.$notify({
                            title: '成功',
                            message: '删除成功 ヾ(✿ﾟ▽ﾟ)ノ',
                            type: 'success',
                            offset: 100
                        });
                        this.blogList = this.getUserBlog(1);
                    }, err => {
                        this.$notify.error({
                            title: '错误',
                            message: '操作失败，请稍后重试 ╮(╯﹏╰）╭',
                            offset: 100
                        });
                    });
                })
            },
        },
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