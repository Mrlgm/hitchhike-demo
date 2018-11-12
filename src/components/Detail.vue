<template>
    <div class="detail">
        <div class="user">
            <img :src="user.avatar" alt="头像">
            <div class="name">
                <h3>{{blog.title}}</h3>
                <div>
                    <router-link :to="{name:'user',params:{userId:user.objectId}}">
                        <span>{{user.username}}</span>
                    </router-link>

                    <span>发表于{{blog.createdAt | formatDate}}</span>
                </div>
            </div>
        </div>
        <div class="table">
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="发车时间段"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="start"
                        label="出发">
                </el-table-column>
                <el-table-column
                        prop="end"
                        label="到达">
                </el-table-column>
            </el-table>
        </div>
        <div class="desc">
            备注：{{desc}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "detail",
        data() {
            return {
                blog: '',
                user: '',
                desc: '',
                tableData: [{
                    date: '',
                    phone: '',
                    start: '',
                    end: ''
                }]
            }
        },
        beforeMount() {
            this.getBlogDetail();

        },
        watch: {
            '$route'(to, from) {
                this.getBlogDetail()
            }
        },
        methods: {
            getBlogDetail() {
                let query = new this.$AV.Query('Blogs');
                query.include('user');
                query.get(this.$route.params.blogId).then(res => {
                    let data = res.toJSON();
                    this.blog = data;
                    this.tableData[0].date = this.getDay(data.date1) + this.getTime(data.date2) + '--' + this.getTime(data.date3)
                    this.tableData[0].phone = data.phone
                    this.tableData[0].start = data.start
                    this.tableData[0].end = data.end
                    this.desc = data.desc
                    this.user = data.user;
                });
            },
            getTime(time) {
                let date = new Date(time)
                let year = date.getFullYear();  // 获取完整的年份(4位,1970)
                let month = date.getMonth() + 1;  // 获取月份(0-11,0代表1月,用的时候记得加上1)
                let day = date.getDate();  // 获取日(1-31)

                let hour = date.getHours();  // 获取小时数(0-23)
                let min = date.getMinutes();
                return hour + ':' + min
            },
            getDay(time) {
                let date = new Date(time)
                let year = date.getFullYear();  // 获取完整的年份(4位,1970)
                let month = date.getMonth() + 1;  // 获取月份(0-11,0代表1月,用的时候记得加上1)
                let day = date.getDate();  // 获取日(1-31)
                return year + '-' + month + '-' + day
            }
        }

    }
</script>

<style lang="scss" scoped>
    .detail {
        height: 100%;
        min-width: 700px;

        .user {
            display: flex;
            background-color: #fff;
            > img {
                margin: 10px;
            }
            > .name {
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
        }
        .table {
            border-bottom-right-radius: 4px;
            border-bottom-left-radius: 4px;
        }
        .desc {
            background-color: #fff;
            padding: 10px;
            font-size: 14px;
            color: #999;
            height: 100px;
        }
    }

</style>