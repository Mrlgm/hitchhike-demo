<template>
    <div class="index">

        <section v-for="blog in blogList">
            <figure>
                <img :src="blog.attributes.user.attributes.avatar" title="" alt="头像" width="60" height="60">
                <figcaption>{{blog.attributes.user.attributes.username}}</figcaption>
            </figure>
            <router-link :to="{name:'Detail',params:{blogId:blog.id}}">
                <div class="desc">
                    <div class="title">
                        <h2> {{blog.attributes.title}} </h2>
                        <span class="identity">{{blog.attributes.Identity | formatIdentity}}</span>
                        <span class="time">{{blog.attributes.date1 | getTime}}去</span>
                    </div>
                    <p>{{blog.attributes.desc}}</p>
                </div>
            </router-link>
        </section>
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
        name: "index",
        data() {
            return {
                blogList: [],
                total: 0,
                page:1
            }
        },
        created() {
        },
        mounted() {
            this.page = this.$route.query.page-0 || 1;
            this.getTotal();
            this.blogList=this.getBlog(this.page);
        },
        methods: {
            getTotal(){
                let query = new this.$AV.Query('Blogs');
                query.count().then(count => {
                    this.total = count;
                });
            },
            getBlog(page) {
                this.page = page;
                let list = []
                let query = new this.$AV.Query('Blogs');
                query.include('user');
                query.descending('createdAt');//从最新的开始返回
                query.limit(6);// 每页 6 条结果
                query.skip((page-1)*6);
                query.find().then((blogs) => {
                    blogs.forEach((blog, index) => {
                        list.push({...blog});
                    });
                })
                return list
            },
            changePage(newPage){
                //this.getBlog(newPage);
                //this.$router.push({name:'Index',query:{page:newPage}});
                this.blogList = this.getBlog(newPage)
            },
            getDriver() {
                let query = new this.$AV.Query('Blogs');
                query.include('user');
                query.descending('createdAt');//从最新的开始返回
                query.find().then((blogs) => {
                    blogs.forEach((blog, index) => {
                        this.blogList.push({...blog});
                    });
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .index {
        padding: 10px;
        section {
            display: flex;
            background-color: #fff;
            padding: 10px;
            margin: 10px;
            width: 600px;
            transition: all .5s;
            border-radius: 4px;
            figure {
                img {
                    margin: 10px;
                }
                figcaption {
                    text-align: center;
                }
            }

            .desc {
                .title {
                    display: flex;
                    h2 {
                        display: flex;
                        align-items: center;
                    }
                    .identity {
                        font-size: 13px;
                        display: flex;
                        align-items: center;
                        padding: 5px;
                        margin: 5px;
                        background-color: #288052;
                        color: #fff;
                        border-radius: 4px;
                    }
                    .time {
                        font-size: 12px;
                        color: #999999;
                        display: flex;
                        align-items: center;
                    }
                }

                p {
                    margin-top: 30px;
                    padding-left: 10px;
                }
            }
            &:hover {
                box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.75);
            }
        }
        height: 100%;
    }
</style>