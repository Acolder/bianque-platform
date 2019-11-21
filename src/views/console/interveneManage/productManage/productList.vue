<template>
  <div>
    <el-form :inline="true" :model="searchForm" size="small" ref="searchForm" label-width="80px">
      <el-form-item label="商品ID" prop="pro_id">
        <el-input v-model="searchForm.pro_id" placeholder="商品ID" clearable></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="pro_name">
        <el-input v-model="searchForm.pro_name" placeholder="商品名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="pro_category">
        <el-input v-model="searchForm.pro_category" placeholder="商品分类" clearable></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="pro_describe">
        <el-input v-model="searchForm.pro_describe" placeholder="商品描述" clearable></el-input>
      </el-form-item>
      <el-form-item label="生产厂商" prop="pro_factory">
        <el-input v-model="searchForm.pro_factory" placeholder="生产厂商" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="医生分类" prop="pro_category">
        <el-select v-model="searchForm.pro_category" placeholder="请选择医生分类">
          <el-option v-for="item in doctorCategory" :key="item.pro_category" :label="item.categoryName" :value="item.pro_category" clearable></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="default" @click="clean" icon="el-icon-delete">清 除</el-button>
        <el-button type="primary" @click="queryList" icon="el-icon-search">查 询</el-button>
      </el-form-item>
    </el-form>
    <div class="toolbar-wrapper">
      <el-button-group>
        <el-button type="default" size="small" icon="el-icon-plus" @click="add">新增</el-button>
        <el-button type="default" size="small" icon="el-icon-delete" @click="batchDelete">批量删除</el-button>
        <el-button type="default" size="small" icon="el-icon-refresh" @click="refreshList">刷新</el-button>
      </el-button-group>
    </div>
    <div class="table-wrapper">
      <v-table ref="data_table" column-width-drag :multiple-sort="false" @sort-change="sortChange" mul :row-height=50 :is-horizontal-resize="true" style="width:100%"
      :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff" @on-custom-comp="customCompFunc" :select-all="selectALL"
      :select-change="selectChange" :select-group-change="selectGroupChange"></v-table>
    </div>
    <div class="pagin-wrapper">
      <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="total" :page-size="searchForm.pageSize" :page-index="searchForm.pageIndex"
      :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']">
      </v-pagination>
    </div>
    <!-- 查看商品详情 -->
    <el-dialog title="商品详情" :visible.sync="detailShow" :modal-append-to-body="false" width="800px" center>
      <el-form ref="detailData" id="addNews">
        <el-row class="common">
          <el-col :span="12"><div class="bg-purple"><span class="strong">商品ID：</span><i class="title">{{detailData.pro_id}}</i></div></el-col>
          <el-col :span="12"><div class="bg-purple"><span class="strong">商品名称：</span>{{detailData.pro_name}}</div></el-col>
        </el-row>
        <el-row class="common">
          <el-col :span="12"><div class="bg-purple"><span class="strong">商品分类：</span><i class="title">{{detailData.pro_category}}</i></div></el-col>
          <el-col :span="12"><div class="bg-purple"><span class="strong">商品图片：</span>
            <img :src="detailData.pro_pic" alt="" class="pic">
          </div></el-col>
        </el-row>
        <el-row class="common">
          <el-col :span="12"><div class="bg-purple"><span class="strong">商品价格：</span><i class="title">{{detailData.pro_price}}</i></div></el-col>
          <el-col :span="12"><div class="bg-purple"><span class="strong">商品规格：</span>{{detailData.pro_size}}</div></el-col>
        </el-row>
        <el-row class="common">
          <el-col :span="12"><div class="bg-purple"><span class="strong">商品销量：</span><i class="title">{{detailData.pro_sale}}</i></div></el-col>
          <el-col :span="12"><div class="bg-purple"><span class="strong">商品厂商：</span>{{detailData.pro_factory}}</div></el-col>
        </el-row>
        <el-row class="common">
          <el-col :span="12"><div class="bg-purple"><span class="strong">商品排序：</span><i class="title">{{detailData.pro_sort}}</i></div></el-col>
          <el-col :span="12"><div class="bg-purple"><span class="strong">商品SKU：</span>{{detailData.pro_sku}}</div></el-col>
        </el-row>
        <el-row class="common">
          <el-col :span="24"><div class="bg-purple"><span class="strong">商品描述：</span><i class="title spms">{{detailData.pro_describe}}</i></div></el-col>
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
      selection: [],
      tableData: [],
      searchForm: {
        pro_id: '',
        pro_name: '',
        pro_describe: '',
        pro_factory: '',
        pro_sku: '',
        pro_category: '',
        pageIndex: 1,
        pageSize: 10,
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
          field: 'custome', title: '编号', width: 30, titleAlign: 'center', columnAlign: 'center',
          formatter: function (rowData, rowIndex, pagingIndex, field) {
            let index = (_self.searchForm.pageIndex - 1) * _self.searchForm.pageSize + rowIndex + 1;
            return index <= 3 ? '<span style="color:red;font-weight: bold;">' + index + '</span>' : index;
          }, isFrozen: true, isResize: true
        },
        { field: 'pro_id', title: '商品ID', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'pro_name', title: '商品名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'pro_pic', title: '商品图片', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'pro_category', title: '商品分类', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'pro_describe', title: '商品描述', width: 180, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'pro_size', title: '标准规格', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'pro_price', title: '商品市场价', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'pro_sku', title: '商品sku', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'pro_factory', title: '生产厂商', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'pro_sale', title: '销量', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'pro_sort', title: '排序', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'operation', title: '操作', width: 220, titleAlign: 'center', columnAlign: 'center', componentName: 'table-operation-products', isResize: true }
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
        if (item.field === 'pro_pic') {
          let defaultImg = 'https://uploads.kangmei.com.cn/Files/20180627/fwkomaog.xzb.jpg';
          item.formatter = function (rowData, rowIndex, pagingIndex, field) {
            let value = rowData[field];
            if (value) {
              let pic =  value.split(',');
              return `<a href="javascript:previewImg('${pic[0]}');"><img src="${pic[0]}" alt="" width="40px" height="40px" style="margin-top:5px;" /></a>`;
            } else {
              return `<a href="javascript:previewImg('${defaultImg}');"><img src="${defaultImg}" alt="" width="40px" height="40px" style="margin-top:5px;" /></a>`;
            }
          };
        }
        if (item.field === 'pro_price') {
          item.formatter = function (rowData, rowIndex, pagingIndex, field) {
            let value = rowData[field];
            if (value) {
              return '<span style="color: red">' + value + '</span>';
            } else {
              return '-';
            }
          };
        }
        if (item.field === 'pro_sale') {
          item.formatter = function (rowData, rowIndex, pagingIndex, field) {
            let value = rowData[field];
            let str = value.toString();
            if (str) {
              return value;
            } else {
              return '-';
            }
          };
        }
      }
      return columns;
    },
  },
  methods: {
    // 自定义弹窗
    previewImg(url) {
      this.$alert(`<img src="${url}" alt=''/>`, '', {
        dangerouslyUseHTMLString: true,
        distinguishCancelAndClose: false,
        customClass: 'reviewImg',
        showConfirmButton: false,
        closeOnPressEscape: true,
        closeOnClickModal: true
      });
    },
    // 新增
    add() {
      let maxNum;
      if (this.tableData.length !== 0) {
        let NumSort = this.tableData.map(function(item, index, data) {
          return item.pro_sort;
        });
        maxNum = NumSort[0];
      } else {
        maxNum = 1;
      }
      this.$router.push(`/interveneManage/productManage/addProduct?maxNum=` + maxNum);
    },
    clean() {
      this.searchForm.pro_id = '';
      this.searchForm.pro_name = '';
      this.searchForm.pro_describe = '';
      this.searchForm.pro_factory = '';
      this.searchForm.pro_category = '';
      this.queryList();
    },
    queryList() {
      this.searchForm.pageIndex = 1;
      this.getTable();
    },
    // 刷新
    refreshList() {
      this.queryList();
    },
    // 批量删除
    batchDelete() {
      if (this.selection.length > 0) {
        this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let idList = [];
          for (let item of this.selection) {
            idList.push(item.id.toString());
          }
          this.remove(idList);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$alert('请选择删除的内容', '提示', {
          confirmButtonText: '确定',
        });
      }
    },
    // 列表操作
    customCompFunc(params) {
      if (params.type === 'remove') {  // 删除
        this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.remove([params.rowData.id.toString()]);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else if (params.type === 'view') {
        this.detailShow = true;
        this.detailData = params.rowData;
      } else if (params.type === 'edit') {
        this.$router.push(`/interveneManage/productManage/editProduct?id=` + params.rowData.id);
      }
    },
    // 删除
    remove(id) {
      // console.log(id);
      let param =  id;
      ajax.post(`/api/intervene/DeleteProductByIDs`, param).then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.$message({
            type: 'success',
            message: res.data.message,
          });
          this.refreshList();
        }
      });
    },
    sortChange(params) {
      // console.log(params);
      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          let name = 'orderBy' + this.titleCase(key);
          this.$delete(this.queryData, name);
          let value = params[key];
          if (value) {
            this.$set(this.queryData, name, value);
          }
        }
      }
      this.seach();
    },
    // 列表数据
    getTable() {
      let param = this.searchForm;
      ajax.post(`/api/intervene/GetProductPageList`, param).then(res => {
        // console.log(res);
        if (res.status === 200 & res.data.code === 0) {
          this.tableData = res.data.data.rdetails;
          this.total = res.data.data.rcount;
        }
      });
    },
    // 分页
    pageChange(pageIndex) {
      this.searchForm.pageIndex = pageIndex;
      this.getTable();
    },
    pageSizeChange(pageSize) {
      this.searchForm.pageIndex = 1;
      this.searchForm.pageSize = pageSize;
      this.getTable();
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
    window.previewImg = this.previewImg;
    this.getTable();
  }
};
</script>

<style lang="less" scoped>
#addNews{
  padding: 0 50px 30px;
}
.bg-purple{
  line-height: 35px;
}
.pic{
  width: 50px;
  height: 50px;
}
.common {
  /deep/ [class*=el-col-] {
    text-align: left;
  }
  /deep/ .el-col-12 {
    text-align: left;
  }
  /deep/ .el-col-24 {
    text-align: left;
  }
  .spms{
    word-wrap:break-word;
  }
}
</style>
