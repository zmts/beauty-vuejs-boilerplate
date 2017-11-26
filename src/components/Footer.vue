<template>
    <div class="footer">
        <div class="wrapper">
            Best portal © 2010 - {{ currentYear }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Footer',
        data () {
            return {
                currentYear: new Date().getFullYear()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .footer{
        text-align: center;
        background-color: #ccc;
        padding: 40px 0;
        position: absolute;
        width: 100%;
        bottom: -95px;
    }
</style>
