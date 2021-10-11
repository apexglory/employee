<template>
  <div class="index">
    <el-row :gutter="20">
      <el-col :xs="24" :md="12">
        <div class="calendar">123</div>
      </el-col>
      <el-col :xs="24" :md="12">
        <div class="tabs-container">
          <div class="tabs-title">
            {{ currentSite }}
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="总体标签" name="1" class="main-info">
              <div>水质达标率：{{ mainInfo.waterPassPercent }}</div>
              <div>水质综合排名：{{ mainInfo.waterRank }}</div>
              <div>水质标签：{{ mainInfo.waterTag }}</div>
              <div>水质优良率：{{ mainInfo.waterGradePercent }}</div>
              <div>水质类别：{{ mainInfo.waterType }}</div>
            </el-tab-pane>
            <el-tab-pane label="COD" name="2" class="indicator-detail">今日无COD告警</el-tab-pane>
            <el-tab-pane label="总磷" name="3" class="indicator-detail">今日无COD告警</el-tab-pane>
            <el-tab-pane label="氨氮" name="4" class="indicator-detail">今日无COD告警</el-tab-pane>
            <el-tab-pane label="溶解氧" name="5" class="indicator-detail">今日无COD告警</el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-table />
    </el-row>
    <el-row>
      <blueYellowLineChart :chart-data="indicatorChangeData" />
    </el-row>
    <el-row :gutter="20" type="flex">
      <el-col :xs="24" :md="12">
        <blueYellowLineChart :chart-data="indicatorChangeData" />
      </el-col>
      <el-col :xs="24" :md="12">
        <div class="site-alert">
          本周中央居住区站点水质指标无告警，站点周围水质状况较好
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import blueYellowLineChart from './blueYellowLineChart'
export default {
  name: 'MyPage',
  components: {
    blueYellowLineChart
  },
  data() {
    return {
      activeTab: '1',
      currentSite: '中央居住区',
      mainInfo: {
        waterPassPercent: '100%',
        waterRank: '1',
        waterTag: '良',
        waterGradePercent: '100%',
        waterType: 'III类'
      },
      indicatorChangeData: {
        legends: ['COD含量'],
        xAxis: ['2019-04-30 00:00', '2019-04-30 04:00', '2019-04-30 08:00', '2019-04-30 12:00'],
        data: [10, 9, 18, 12]
      }
    }
  },
  mounted() {
    console.log(this.$el)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
    .index {
      padding: 20px;
      .tabs-container{
        .tabs-title{
          font-size: 2rem;
        }
        .main-info{
          display: flex;
          flex-wrap: wrap;
          div{
            width: 50%;
            padding-bottom: 20px;
          }
        }
        .indicator-detail{
          min-height: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .site-alert{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .el-row{
        padding-bottom: 20px;
      }
    }
</style>
npm
