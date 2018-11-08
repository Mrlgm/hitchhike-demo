<template>
    <div class="detail">
        <div class="user">
            <img src="../assets/user_imgs/1.png" alt="头像">
            <div class="name">
                <h3>地点名字</h3>
                <p><span>ggg</span>发表于不知道多少天前</p>
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
                tableData: [{
                    date: '2016-05-02',
                    phone: '18888888888',
                    address: '上海市普陀区金沙江路 1518 弄'
                }]
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