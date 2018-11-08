<template>
    <div class="index">
        <section>
            <figure>
                <img src="../assets/user_imgs/1.png" title="" alt="头像" width="60" height="60">
                <figcaption>我叫啥</figcaption>
            </figure>
            <div class="desc">
                <h2> 一起去西藏呀
                    <span class="time">什么时候去呀</span>
                </h2>
                <p>起止地点</p>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style lang="scss" scoped>
    .index {
        padding: 10px;
        > section {
            display: flex;
            background-color: #fff;
            padding: 10px;
            margin: 10px;
            width: 600px;
            figure {
                img {
                    margin: 10px;
                }
                figcaption {
                    text-align: center;
                }
            }
            .desc {
                .time {
                    font-size: 12px;
                    color: #999999;
                }
                p{
                    margin-top: 30px;
                    padding-left: 10px;
                }
            }
        }
        height: 100%;
    }
</style>