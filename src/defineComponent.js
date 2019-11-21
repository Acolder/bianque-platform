import Vue from 'vue';
// 自定义列组件
// 控制台-用户档案管理
Vue.component('table-operation-archivesList', {
  template: `<span class="table-operation-btns">
        <el-button type="primary" size="mini" plain icon="el-icon-view" @click.stop.prevent="look_zb(rowData,index)">查看指标</el-button>
        <el-button type="primary" size="mini" plain icon="el-icon-search" @click.stop.prevent="details(rowData,index)">健康干预详情</el-button>
        <el-button type="primary" size="mini" plain icon="el-icon-delete" @click.stop.prevent="remove(rowData,index)">删除</el-button>
        </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    look_zb() {

      let params = {
        type: 'look_zb',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    details() {

      let params = {
        type: 'details',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    remove() {

      let params = {
        type: 'remove',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
  }
});
// 控制台-干预内容管理
Vue.component('table-operation-interveneList', {
  template: `<span class="table-operation-btns">
        <el-button type="primary" size="mini" plain icon="el-icon-search" @click.stop.prevent="lookDetail(rowData,index)">查看详情</el-button>
        <el-button type="primary" size="mini" plain icon="el-icon-edit" @click.stop.prevent="edit(rowData,index)">修改内容</el-button>
        </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    lookDetail() {

      let params = {
        type: 'detail',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    edit() {

      let params = {
        type: 'edit',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    }
  }
});
// 控制台-增值服务-门店管理
Vue.component('table-operation-incrementList', {
  template: `<span class="table-operation-btns">
        <el-button type="primary" size="mini" plain icon="el-icon-edit" @click.stop.prevent="remarks(rowData,index)">编辑门店信息</el-button>
        <el-button type="primary" size="mini" plain icon="el-icon-setting" @click.stop.prevent="remarks(rowData,index)">管理理疗方案</el-button>
        <el-button type="primary" size="mini" plain icon="el-icon-search" @click.stop.prevent="remarks(rowData,index)">查看</el-button>
        <el-button type="primary" size="mini" plain icon="el-icon-delete" @click.stop.prevent="handle(rowData,index)">删除</el-button>
        </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    comparison() {

      let params = {
        type: 'comparison',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    }
  }
});
// 控制台-增值服务-体质指标结果（选择）
Vue.component('outNewList', {
  template: `<span class="table-operation-btns">
        <el-button type="primary" size="mini" plain icon="el-icon-success" @click.stop.prevent="querySelect(rowData,index)">确定选择</el-button>
        </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    querySelect() {
      let params = {
        type: 'querySelect',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    }
  }
});
// 控制台-干预内容-资讯列表
Vue.component('table-operation-newsList', {
  template: `<span class="table-operation-btns">
        <el-button type="primary" size="mini" plain icon="el-icon-edit" @click.stop.prevent="update(rowData,index)">修改</el-button>
        <el-button type="primary" size="mini" plain icon="el-icon-sort-up" @click.stop.prevent="Audit(rowData,index)">上架</el-button>
        <el-button type="primary" size="mini" plain icon="el-icon-sort-down" @click.stop.prevent="down(rowData,index)">下架</el-button>
        <el-button type="primary" size="mini" plain icon="el-icon-search" @click.stop.prevent="seeDetail(rowData,index)">查看详情</el-button>
        <el-button type="primary" size="mini" plain icon="el-icon-delete" @click.stop.prevent="deleteRow(rowData,index)">删除</el-button>
        </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    update() {
      let params = {
        type: 'edit',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    Audit() {
      let params = {
        type: 'audit',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    down() {
      let params = {
        type: 'down',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    deleteRow() {
      let params = {
        type: 'delete',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    seeDetail() {
      let params = {
        type: 'seeDetail',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    }
  }
});
// 药品管理列表操作
Vue.component('table-operation-products', {
  template: `<span class="table-operation-btns">
          <el-button type="primary" size="mini" plain icon="el-icon-edit" @click.stop.prevent="edit(rowData,index)">修改</el-button>
          <el-button type="primary" size="mini" plain icon="el-icon-search" @click.stop.prevent="viewRow(rowData,index)">预览</el-button>
          <el-button type="primary" size="mini" plain icon="el-icon-delete" @click.stop.prevent="remove(rowData,index)">删除</el-button>
        </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    edit() {

      let params = {
        type: 'edit',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    remove() {

      let params = {
        type: 'remove',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    viewRow() {

      let params = {
        type: 'view',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
  }
});
// 理疗门店
Vue.component('table-operation-storeList', {
  template: `<span class="table-operation-btns">
        <el-button type="primary" size="mini" plain icon="el-icon-edit" @click.stop.prevent="edit(rowData,index)">编辑门店</el-button>
        <el-button type="primary" size="mini" plain icon="el-icon-setting" @click.stop.prevent="manage(rowData,index)">管理理疗套餐</el-button>
        <el-button type="primary" size="mini" plain icon="el-icon-search" @click.stop.prevent="seeDetail(rowData,index)">查看详情</el-button>
        <el-button type="primary" size="mini" plain icon="el-icon-delete" @click.stop.prevent="remove(rowData,index)">删除</el-button>
        </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    edit() {
      let params = {
        type: 'edit',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    manage() {
      let params = {
        type: 'manage',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    seeDetail() {
      let params = {
        type: 'seeDetail',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    remove() {
      let params = {
        type: 'remove',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
  }
});
// 编辑、删除
Vue.component('editAndremove', {
  template: `<span class="table-operation-btns">
        <el-button type="primary" size="mini" plain icon="el-icon-edit" @click.stop.prevent="edit(rowData,index)">编辑</el-button>
        <el-button type="primary" size="mini" plain icon="el-icon-delete" @click.stop.prevent="remove(rowData,index)">删除</el-button>
        </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    edit() {
      let params = {
        type: 'edit',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    remove() {
      let params = {
        type: 'remove',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
  }
});


// 开放平台申请管理-申请用户管理
Vue.component('table-operations-applayUserManage', {
  template: `<span class="table-operation-btns">
            <el-button type="primary" size="mini" plain icon="el-icon-plus" @click.stop.prevent="addRemarks(rowData,index)">添加备注</el-button>
            <el-button type="primary" size="mini" plain icon="el-icon-check" @click.stop.prevent="checkPass(rowData,index)">审核通过</el-button>
            <el-button type="primary" size="mini" plain icon="el-icon-close" @click.stop.prevent="checkReject(rowData,index)">审核不通过</el-button>
      </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    addRemarks() {

      let params = {
        type: 'addRemarks',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    checkPass() {

      let params = {
        type: 'checkPass',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    checkReject() {

      let params = {
        type: 'checkReject',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
  }
});
// 编辑、删除、上移
Vue.component('table-operations-editAndremove', {
  template: `<span class="table-operation-btns">
      <el-button type="primary" size="mini" plain icon="el-icon-edit" @click.stop.prevent="editDes(rowData,index)">编辑</el-button>
      <el-button type="primary" size="mini" plain icon="el-icon-delete" @click.stop.prevent="deleteRow(rowData,index)">删除</el-button>
      <el-button type="primary" size="mini" plain icon="el-icon-sort-up" @click.stop.prevent="sortUp(rowData,index)">上移</el-button>
      </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    editDes() {

      let params = {
        type: 'edit',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    deleteRow() {

      let params = {
        type: 'remove',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    sortUp() {

      let params = {
        type: 'sortUp',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    }
  }
});
// 资讯新增/编辑 推荐商品列表操作
Vue.component('newsinfo-product-operations', {
  template: `<span class="table-operation-btns">
      <el-button type="primary" size="mini" plain icon="el-icon-delete" @click.stop.prevent="deleteRow(rowData,index)">删除</el-button>
      <el-button type="primary" size="mini" plain icon="el-icon-edit" @click.stop.prevent="replaceRow(rowData,index)">更改商品图片</el-button>
      </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    deleteRow() {

      let params = {
        type: 'delete',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    replaceRow() {

      let params = {
        type: 'seePic',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    }
  }
});
// 确认选择
Vue.component('table-operations-qrxz', {
  template: `<span class="table-operation-btns">
      <el-button type="primary" size="mini" plain icon="el-icon-check" @click.stop.prevent="trueChoice(rowData,index)">确认选择</el-button>
      </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    trueChoice() {

      let params = {
        type: 'true',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
  }
});
// 删除
Vue.component('table-operations-sc', {
  template: `<span class="table-operation-btns">
      <el-button type="primary" size="mini" plain icon="el-icon-delete" @click.stop.prevent="remove(rowData,index)">删除</el-button>
      </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    remove() {

      let params = {
        type: 'remove',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
  }
});
// 编辑商品描述、删除
Vue.component('table-operations-proDescriptionis', {
  template: `<span class="table-operation-btns">
      <el-button type="primary" size="mini" plain icon="el-icon-edit" @click.stop.prevent="editDes(rowData,index)">编辑文案</el-button>
      <el-button type="primary" size="mini" plain icon="el-icon-delete" @click.stop.prevent="deleteRow(rowData,index)">删除</el-button>
      </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    editDes() {

      let params = {
        type: 'editDes',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    deleteRow() {

      let params = {
        type: 'delete',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
  }
});
