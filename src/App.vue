<template>
    <div id="app">
        <Header></Header>
        <div class="wrapper">
wode tian
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
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        height: 100%;
    }

    #app {
        display: flex;
        flex-direction: column;
        min-width: 800px;
    }

    .wrapper {
        flex-grow: 1;
    }
</style>
