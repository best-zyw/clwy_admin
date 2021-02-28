<template>
<div>
  <div id="main" style="width:1000px; height: 400px"></div>
  <div id="nums" style="width:1000px; height: 400px"></div>
</div>
</template>
<script>
import * as echarts from "echarts";
export default {
  mounted() {
 this.axios.get(`/admin/echarts`).then((res) => {
      console.log(res);
        var chartDom = document.getElementById("main");
         var chartDom2 = document.getElementById("nums");
    var myChart = echarts.init(chartDom);
     var myChart2 = echarts.init(chartDom2);
    var option;
    var option2;
      option = {
      xAxis: {
        type: "category",
        data: res.data.data.dates,
      },
      yAxis: {
        type: "value",
      },
      legend: {
        data: ["用户"],
      },
      series: [
        {
          name: "用户",
          data:res.data.data.nums,
          color: "#c23531",
          type: "bar",
          emphasis: {
            itemStyle: {
              // 高亮时点的颜色。
              color: "blue",
            },
            label: {
              show: true,
              // 高亮时标签的文字。
              formatter: res.data.data.nums,
            },
          },
        },
      ],
    };   
    option2 = {
    xAxis: {
        type: 'category',
        data: res.data.data.dates,
    },
    yAxis: {
        type: 'value'
    },
      legend: {
        data: ["课程"],
      },
    series: [{
        name:"课程",
        data:res.data.data.nums2,
        type: 'line',
            emphasis: {
            itemStyle: {
              // 高亮时点的颜色。
              color: "blue",
            },
            label: {
              show: true,
              // 高亮时标签的文字。
              formatter: res.data.data.nums2,
            },
          },
    }]
}; 
    option && myChart.setOption(option);
     option && myChart2.setOption(option2);
    });
  },
};
</script>