<template>
    <div id="app">
        <Header></Header>
        <div class="wrapper">
            <router-view></router-view>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from './components/Header'
    import Footer from './components/Footer'

    export default {
        name: 'app',
        components: {
            Header,
            Footer
        },
        mounted() {

        }
    }
</script>

<style>
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    html,body{
        height: 100%;
    }

    #app {
        display: flex;
        flex-direction: column;
        min-width: 800px;
        height: 100%;
    }

    .wrapper {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
</style>
