<template>
  <div id="archives_box">
    <el-form :inline="true" :model="healthData" size="small">
    <el-form-item label="企业ID">
        <el-input v-model="healthData.organization_id" placeholder="请输入企业ID" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户ID">
        <el-input v-model="healthData.userid" placeholder="请输入用户ID" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="healthData.nickname" placeholder="请输入用户昵称" clearable></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          v-model="healthData.startime"
          align="right"
          type="datetime"
          placeholder="选择日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions1">
        </el-date-picker>
      </el-form-item>
      <el-form-item >
        <el-date-picker
          v-model="healthData.endtime"
          align="right"
          type="datetime"
          placeholder="选择日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions1">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="cleanSearch" icon="el-icon-delete">清 除</el-button>
        <el-button type="primary" @click="queryList" icon="el-icon-search">查 询</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <v-table ref="data_table" column-width-drag :is-horizontal-resize="true" style="width:100%" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff"
    @on-custom-comp="customCompFunc" :select-all="selectALL" :select-change="selectChange" :select-group-change="selectGroupChange"></v-table>
    <div class="pagin-wrapper">
      <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="total" :page-size="healthData.pageSize" :page-index="healthData.pageIndex" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']">
      </v-pagination>
    </div>
    <!-- 查看健康干预详情 -->
    <el-dialog title="健康干预详情" :visible.sync="detailShow" :modal-append-to-body="false" width="800px" center>
      <el-form ref="detailData" id="addNews">
        <p class="p-title">用户信息</p>
        <el-row class="common">
          <el-col :span="12"><div class="bg-purple"><span class="strong">用户ID：</span><i class="title">{{detailData.id}}</i></div></el-col>
          <el-col :span="12"><div class="bg-purple"><span class="strong">用户昵称：</span>{{detailData.nickname}}</div></el-col>
        </el-row>
        <p class="p-title">档案信息</p>
        <el-row class="common">
          <el-col :span="12"><div class="bg-purple"><span class="strong">性别：</span><i class="title">{{detailData.gender}}</i></div></el-col>
          <el-col :span="12"><div class="bg-purple"><span class="strong">身高：</span>{{detailData.height}}</div></el-col>
        </el-row>
        <el-row class="common">
          <el-col :span="12"><div class="bg-purple"><span class="strong">年龄：</span><i class="title">{{detailData.age}}</i></div></el-col>
          <el-col :span="12"><div class="bg-purple"><span class="strong">体重：</span>{{detailData.weight}}</div></el-col>
        </el-row>
        <p class="p-title">基础指标</p>
        <el-row class="common">
          <el-col :span="12"><div class="bg-purple"><span class="strong">BMI：</span><i class="title">{{detailData.bmi}}</i></div></el-col>
          <el-col :span="12"><div class="bg-purple"><span class="strong">心率：</span>{{detailData.heart_rate}}</div></el-col>
        </el-row>
        <el-row class="common">
          <el-col :span="12"><div class="bg-purple"><span class="strong">血糖：</span><i class="title">{{detailData.blood_sugar}}</i></div></el-col>
          <el-col :span="12"><div class="bg-purple"><span class="strong">血压：</span>{{detailData.blood_pressure}}</div></el-col>
        </el-row>
        <el-row class="common">
          <el-col :span="12"><div class="bg-purple"><span class="strong">体温：</span><i class="title">{{detailData.temperature}}</i></div></el-col>
        </el-row>
        <p class="p-title">体质问卷</p>
        <el-row class="common">
          <el-col :span="12"><div class="bg-purple"><span class="strong">体质结果：</span><i class="title">{{detailData.constitution}}</i></div></el-col>
        </el-row>
      </el-form>
    </el-dialog>
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
        organization_id: '', // 企业ID
        userid: '', // 用户ID
        nickname: '',
        startime: '',
        endtime: '',
        pageIndex: 1,
        pageSize: 10,
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      detailShow: false,
      detailData: '',
    };
  },
  computed: {
    columns() {
      let _self = this;
      let columns = [
        { width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isFrozen: true },
        {
          field: 'custome', title: '序号', width: 20, titleAlign: 'center', columnAlign: 'center',
          formatter: function (rowData, rowIndex, pagingIndex, field) {
            let index = (_self.healthData.pageIndex - 1) * _self.healthData.pageSize + rowIndex + 1;
            return index <= 3 ? '<span style="color:red;font-weight: bold;">' + index + '</span>' : index;
          }, isFrozen: true, isResize: true
        },
        { field: 'organization_id', title: '企业ID', width: 170, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'userid', title: '用户ID', width: 90, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'nickname', title: '用户昵称', width: 110, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'gender', title: '性别', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'age', title: '年龄', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'height', title: '身高', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'weight', title: '体重', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'heart_rate', title: '心率', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'temperature', title: '体温', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'blood_pressure', title: '血压', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        // { field: 'score', title: '健康评分', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'create_time', title: '注册时间', width: 140, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'operation', title: '操作', width: 330, titleAlign: 'center', columnAlign: 'center', componentName: 'table-operation-archivesList', isResize: true }
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
        if (item.field === 'gender') {
          item.formatter = function (rowData, rowIndex, pagingIndex, field) {
            let value = rowData[field];
            if (value === 0) {
              return '女';
            } else if (value === 1) {
              return '男';
            } else {
              return '未输入性别';
            }
          };
        }
      }
      return columns;
    },
  },
  methods: {
    // 清空查询
    cleanSearch() {
      this.healthData.organization_id = '';
      this.healthData.userid = '';
      this.healthData.nickname = '';
      this.healthData.startime = '';
      this.healthData.endtime = '';
      this.queryList();
    },
    // 查询
    queryList() {
      this.healthData.pageIndex = 1;
      this.getTableData();
    },
    // table operaion
    customCompFunc(params) {
      if (params.type === 'remove') {  // 删除
        this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(params.rowData);
          this.remove(params.rowData.id.toString());
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else if (params.type === 'details') {  // 详情
        // console.log(params.rowData);
        this.details(params.rowData.id);
      } else if (params.type === 'look_zb') {  // 查看指标
        console.log(params.rowData);
        this.$router.push(`/archivesManage/lookArchives?id=` + params.rowData.id);
      }
    },
    remove(data) {
      // console.log(data);
      ajax.get(`/api/admin/DelUserHealthyListInfoByid/` + data).then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.$message({
            type: 'success',
            message: res.data.message,
          });
          this.getTableData();
        }
      });
    },
    // 列表详情
    details(id) {
      if (id) {
        ajax.get(`/api/admin/GetUserHealthyListInfoByid/` + id).then(res => {
          if (res.status === 200 && res.data.code === 0) {
            this.detailShow = true;
            this.detailData = res.data.data;
            if (this.detailData.gender === 1) {
              this.detailData.gender = '男';
            } else if (this.detailData.gender === 0) {
              this.detailData.gender = '女';
            } else {
              this.detailData.gender = '用户暂未输入性别';
            }
          }
        });
      } else {
        return false;
      }
    },
    // 获取列表信息
    getTableData() {
      let _self = this;
      let param = _self.healthData;
      ajax.post(`/api/admin/GetUserHealthyListInfo`, param).then(res => {
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
.p-title{
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}
.bg-purple{
  line-height: 30px;
}
.common{
  margin-left: 70px;
}
</style>
