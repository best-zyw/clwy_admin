<template>
    <el-aside width="200px">
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title"><router-link to="/"> <span>首页</span> </router-link></span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-s-goods"></i>
                    <span>新闻管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1" @click="article"><i class="el-icon-location"></i><span slot="title">新闻</span></el-menu-item>
                    <el-menu-item index="1-2" @click="articleCategories"><i class="el-icon-location"></i><span slot="title">新闻分类</span></el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-sell"></i>
                    <span>课程中心</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1" @click="courses"><i class="el-icon-location"></i><span slot="title">课程</span></el-menu-item>
                    <el-menu-item index="1-2" @click="courseCategories"><i class="el-icon-location"></i><span slot="title">课程分类</span></el-menu-item>
                     <el-menu-item index="1-3" @click="chapters"><i class="el-icon-location"></i><span slot="title">章节</span></el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span @click="users">用户管理</span>
                </template>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-s-tools"></i>
                    <span>图表</span>
                </template>
                                <el-menu-item-group>
                    <el-menu-item index="1-1" @click="Echarts"><i class="el-icon-location"></i><span slot="title">用户表</span></el-menu-item>
                    <el-menu-item index="1-2" @click="articleCategories"><i class="el-icon-location"></i><span slot="title">新闻分类</span></el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
    export default {
        name: "broadside",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
              handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            handleOpen(){

            },
            handleClose(){

            },
           article(){
               this.$router.push({name:"Articles"})
           },
           articleCategories(){
               this.$router.push({name:"articleCategories"})
           },
           courseCategories(){
                this.$router.push({name:"courseCategories"})
           },
           courses(){
                this.$router.push({name:"courses"})
           },
           chapters(){
                this.$router.push({name:"chapters"})
           },
           users(){
               this.$router.push({name:"users"})
           },
           Echarts(){
               this.$router.push({name:'Echarts'})
           }
        }

    }
</script>

<style>
.el-submenu__title{
    background: rgb(84, 92, 100);
}
</style>