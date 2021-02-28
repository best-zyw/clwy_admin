<template>
  <div id="app">
  	<el-container>
			<el-header>

			<header1 ></header1>
			</el-header>

			<el-container>
				<broadside />

				<el-main>
					<router-view/>
				</el-main>
			</el-container>


		</el-container>
  </div>
</template>

<script>

	import header1 from "./components/header";
	import broadside from "./components/broadside";
    export default {
    	components:{header1,broadside},
    }
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
	html,body,#app{
		height: 100%;
		margin: 0;
	}
  	.el-container{
		height: 100%;
	}
#app{
.el-header{
  padding: 0;
}
.el-menu--horizontal>.el-submenu {
    float: right;
}
.el-aside{
  background-color: rgb(84, 92, 100);
}
.el-menu-item.is-active {
    background-color: rgb(84, 92, 100);
}
.el-submenu__title * {
    color: white;
}
.el-menu-item * {
    color: white;
}
.el-menu-item-group{
    background-color: rgb(84, 92, 100);
}
.el-submenu__title:hover {
    background-color: black;
}
.el-menu-item:hover {
    background-color: black;
}
}
</style>
