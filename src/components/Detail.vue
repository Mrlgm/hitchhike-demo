<template>
    <div class="detail">
        <div class="user">
            <img :src="user.avatar" alt="头像">
            <div class="name">
                <h3>{{blog.title}}</h3>
                <p><span>{{user.username}}</span>发表于{{blog.createdAt | formatDate}}</p>
            </div>
        </div>
        <div>
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="起止地址">
                </el-table-column>
            </el-table>
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
                tableData: [{
                    date: '',
                    phone: '',
                    address: ''
                }]
            }
        },
        beforeMount() {
            this.getBlogDetail();
            console.log(this.blog)
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
                    console.log(res)
                    let data = res.toJSON();
                    console.log(data)
                    this.blog = data;
                    this.tableData[0].date = this.getTime(data.date2)
                    this.tableData[0].phone = data.phone
                    this.tableData[0].address = data.desc
                    this.user = data.user;
                });
            },
            getTime(time) {
                let date = new Date(time)
                let year = date.getFullYear();  // 获取完整的年份(4位,1970)
                let month = date.getMonth()+1;  // 获取月份(0-11,0代表1月,用的时候记得加上1)
                let day = date.getDate();  // 获取日(1-31)

                let hour = date.getHours();  // 获取小时数(0-23)
                let min = date.getMinutes();
                return year + '-' + month + '-' + day + ' ' + hour + ':' + min
            }
        }

    }
</script>

<style lang="scss" scoped>
    .detail {
        height: 100%;
        min-width: 600px;

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
    }

</style>