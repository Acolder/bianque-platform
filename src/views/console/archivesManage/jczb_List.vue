<template>
  <div id="archives_box">
    <!-- 列表 -->
    <v-table ref="data_table" column-width-drag :is-horizontal-resize="true" style="width:100%" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff"
    :select-all="selectALL" :select-change="selectChange" :select-group-change="selectGroupChange"></v-table>
    <div class="pagin-wrapper">
      <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="total" :page-size="healthData.pageSize" :page-index="healthData.pageIndex" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']">
      </v-pagination>
    </div>
  </div>
</template>

<script>
import ajax from '@/utils/ajax';
export default {
  data() {
    return {
      total: 0,
      tableData: [],
      healthData: {
        km_userid: this.$route.query.id,
        pageIndex: 1,
        pageSize: 10,
      },
    };
  },
  computed: {
    columns() {
      let _self = this;
      let columns = [
        { width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isFrozen: true },
        {
          field: 'custome', title: '序号', width: 30, titleAlign: 'center', columnAlign: 'center',
          formatter: function (rowData, rowIndex, pagingIndex, field) {
            let index = (_self.healthData.pageIndex - 1) * _self.healthData.pageSize + rowIndex + 1;
            return index <= 3 ? '<span style="color:red;font-weight: bold;">' + index + '</span>' : index;
          }, isFrozen: true, isResize: true
        },
        { field: 'km_userid', title: '用户id', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'blood_sugar', title: '血糖', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'heart_rate', title: '心率', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'temperature', title: '体温', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'blood_pressure', title: '血压', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'create_time', title: '创建时间', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
      ];
      for (let i = 0; i < columns.length; i++) {
        let item = columns[i];
        if (i < 2) {
          continue;
        }
        item.formatter = function (rowData, rowIndex, pagingIndex, field) {
          let value = rowData[field];
          if (value) {
            return value;
          } else {
            return '-';
          }
        };
      }
      return columns;
    },
  },
  methods: {
    getTableData() {
      let _self = this;
      let param = _self.healthData;
      ajax.get(`/api/admin/GetUserQuotaLogInfoByid/` + param.km_userid + '/' + param.pageIndex + '/' + param.pageSize).then(res => {
      // ajax.post(`/api/admin/GetUserHealthyListInfo`, param).then(res => {
        console.log(res);
        if (res.status === 200 && res.data.code === 0) {
          _self.tableData = res.data.data;
          _self.total = res.data.recordscount;
        }
      });
    },
    // 分页
    pageChange(pageIndex) {
      this.healthData.pageIndex = pageIndex;
      this.getTableData();
    },
    pageSizeChange(pageSize) {
      this.healthData.pageIndex = 1;
      this.healthData.pageSize = pageSize;
      this.getTableData();
    },
    selectALL(selection) {
      this.selection = selection;
    },
    selectChange(selection, rowData) {
      this.selection = selection;
    },
    selectGroupChange(selection) {
      this.selection = selection;
    },
  },
  created() {
    this.getTableData();
  }
};
</script>

<style lang="less" scoped>

</style>
