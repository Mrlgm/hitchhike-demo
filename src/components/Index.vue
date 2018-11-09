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
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                blogList: [],
                total: 0
            }
        },
        created() {
        },
        mounted() {
            this.getBlog()
        },
        methods: {
            getBlog(page) {
                //this.page = page;
                let list = []
                let query = new this.$AV.Query('Blogs');
                query.include('user');
                query.descending('createdAt');//从最新的开始返回
                query.find().then((blogs) => {
                    blogs.forEach((blog, index) => {
                        list.push({...blog});
                    });
                })
                this.blogList = list
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