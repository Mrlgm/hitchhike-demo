<template>
    <div class="index">
        <div class="curtain" v-if="!isLogin">
            <p>共享速度生活</p>
            <h1>小居居电驴</h1>
            <p>我们致力于为您提供校园内的电动车共享业务</p>
            <p>同时，我们也欢迎您加入我们，一起为校园出行助力</p>
            <el-button class="curtain-btn" @click="toLogin" type="warning">即刻开始</el-button>
        </div>
        <div v-if="isLogin">
            <div class="btn">
                <el-button @click="getIdentity('driver')">我是乘客</el-button>
                <el-button @click="getIdentity('passenger')">我是司机</el-button>
            </div>
            <section v-for="blog in blogList">
                <figure>
                    <img :src="blog.avatar" title="" alt="头像" width="60" height="60">
                    <figcaption>{{blog.username}}</figcaption>
                </figure>
                <router-link :to="{name:'Detail',params:{blogId:blog.id}}">
                    <div class="desc">
                        <div class="title">
                            <h2> {{blog.title}} </h2>
                            <span class="identity">{{blog.identity | formatIdentity}}</span>
                            <span class="time">{{blog.date | getTime}}去</span>
                        </div>
                        <p>{{blog.start}} -- {{blog.end}}</p>
                    </div>
                </router-link>
            </section>
            <div class="pag">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="total"
                        :current-page="page"
                        :page-size="6"
                        @current-change="changePage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "index",
        data() {
            return {
                blogList: [],
                total: 0,
                page: 1,
                idString: ''
            }
        },
        computed: {
            ...mapGetters(['isLogin', 'user']),

        },
        created() {
            this.checkLogin()
        },
        mounted() {
            this.page = this.$route.query.page - 0 || 1;
            this.blogList = this.getBlog(this.page);
        },
        methods: {
            ...mapActions(['checkLogin', 'logout']),
            getBlog(page) {
                this.page = page;
                let list = []
                let query = new this.$AV.Query('Blogs');
                query.count().then(count => {
                    this.total = count;
                });
                query.include('user');
                query.descending('createdAt');//从最新的开始返回
                query.limit(6);// 每页 6 条结果
                query.skip((page - 1) * 6);
                query.find().then((blogs) => {
                    blogs.forEach((blog, index) => {
                        list.push({
                            avatar: blog.attributes.user.attributes.avatar,
                            username: blog.attributes.user.attributes.username,
                            id: blog.id,
                            title: blog.attributes.title,
                            identity: blog.attributes.Identity,
                            date: blog.attributes.date1,
                            start: blog.attributes.start,
                            end: blog.attributes.end,
                            desc: blog.attributes.desc
                        });
                    });
                })
                return list
            },
            changePage(newPage) {
                //this.getBlog(newPage);
                //this.$router.push({name:'Index',query:{page:newPage}});
                if(this.idString){
                    this.getIdentity(this.idString,newPage)
                }else{
                    this.blogList = this.getBlog(newPage)
                }

            },
            getIdentity(val,page) {
                this.idString = val
                let query = new this.$AV.Query('Blogs');
                query.include('user');
                query.descending('createdAt');//从最新的开始返回
                query.equalTo('Identity', val);
                query.limit(6);// 每页 6 条结果
                query.skip((page - 1) * 6);
                query.count().then(count => {
                    this.total = count;
                });
                let list = []
                query.find().then(function (blogs) {
                    blogs.forEach((blog, index) => {
                        list.push({
                            avatar: blog.attributes.user.attributes.avatar,
                            username: blog.attributes.user.attributes.username,
                            id: blog.id,
                            title: blog.attributes.title,
                            identity: blog.attributes.Identity,
                            date: blog.attributes.date1,
                            start: blog.attributes.start,
                            end: blog.attributes.end,
                            desc: blog.attributes.desc
                        });
                    });
                }, function (error) {
                });
                this.blogList = list
            },
            toLogin() {
                this.$router.push({path: '/login'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .index {
        padding: 10px;
        .curtain {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
            p {
                font-size: 8px;
                line-height: 20px;
            }
            h1 {
                font-size: 40px;
                margin: 10px 0;
            }
            .curtain-btn {
                margin-top: 30px;
            }
        }
        .btn {
            text-align: center;
            padding: 10px;

        }
        section {
            display: flex;
            background: hsla(0, 0%, 100%, .7);
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
        .pag {
            text-align: center;
        }
    }
</style>