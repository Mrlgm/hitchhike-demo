<template>
    <div class="user">
        <div class="msg" v-if="user">
            <img :src="user.avatar" alt="">
            <div class="name">
                <span>{{user.username}}</span>
                <span>此账号创建于{{user.createdAt|getTime}}</span>
            </div>
        </div>
        <div class="decs" v-for="blog in blogList">
            <div class="date">
                <p>{{blog.updatedAt | day}}日</p>
                <p>{{blog.updatedAt | month}}月</p>
                <p>{{blog.updatedAt | year}}年</p>
            </div>
            <router-link class="link" :to="{name:'Detail',params:{blogId:blog.id}}">
                <div>
                    <h2>{{blog.title}}</h2>
                    <div>{{blog.desc}}</div>
                </div>
            </router-link>

        </div>
        <div class="pag">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :current-page="page"
                    @current-change="changePage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                blogList: [],
                user: null,
                page: 1,
                total: 0
            }
        },
        mounted() {
            this.page = this.$route.query.page-0 || 1;
            this.getUserBlog(this.page);
        },
        methods: {
            getUserBlog(page) {
                var query = new this.$AV.Query('Blogs');
                query.descending('createdAt');
                query.include('user');
                query.equalTo('userId', this.$route.params.userId);
                query.count().then(count => {
                    this.total = count;
                });
                query.limit(10); // 每页返回 10 条结果
                query.skip((page - 1) * 10);
                query.find().then(blogs => {
                    console.log(blogs)
                    this.blogList=[]
                    blogs.forEach((blog, index) => {
                        this.blogList.push({
                            id: blog.id,
                            title: blog.attributes.title,
                            desc: blog.attributes.desc,
                            createdAt: blog.createdAt,
                            updatedAt: blog.updatedAt,
                        });
                    });
                    this.user = {
                        id: blogs[0].attributes.userId,
                        username: blogs[0].attributes.user.attributes.username,
                        avatar: blogs[0].attributes.user.attributes.avatar,
                        createdAt:blogs[0].attributes.user.createdAt,
                    };
                    this.$router.push({
                        name: 'user',
                        query: {
                            page
                        }
                    });
                })
            },
            changePage(page) {
                this.getUserBlog(page);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .user {
        height: 100%;
        width: 600px;
        .msg {
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
            display: flex;
            background-color: #fff;
            margin-top: 10px;
            padding: 10px;
            .date {
                p {
                    text-align: center;
                    color: #999;
                }
                margin-right: 10px;
            }
            .link{
                flex-grow: 1;
            }
        }
        .pag {
            border-top: 1px solid #ddd;
            background-color: #fff;
            text-align: center;
        }
    }
</style>