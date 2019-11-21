<template>
  <div id="viscera">
    <el-form ref="visceraData" :model="visceraForm" :rules="rules" label-width="100px">
      <!-- 症状结果 -->
      <el-row>
        <el-col :span="24">
          <!-- 体质结果 -->
          <el-form-item v-if="this.visceraForm.type == 1" label="体质结果" prop="name" class="source">
            <el-input style="width:40%;" v-model.trim="visceraForm.name" display="inline-block"
            onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" clearable placeholder="请输入体质结果"></el-input>
          </el-form-item>
          <!-- BMI范围 -->
          <el-form-item v-if="this.visceraForm.type == 3" label="BMI范围" prop="range_min" class="source" style="display:inline-block">
            <el-input v-model.trim="visceraForm.range_min" display="inline-block" class="range" clearable placeholder="最小值(最多保留两位小数)"></el-input>
          </el-form-item>
            <span v-if="this.visceraForm.type == 3">至</span>
          <el-form-item v-if="this.visceraForm.type == 3" prop="range_max" class="source" label-width="0px" style="display:inline-block">
            <el-input v-model.trim="visceraForm.range_max" display="inline-block" class="range" clearable placeholder="最大值(最多保留两位小数)"></el-input>
          </el-form-item>
          <!-- 血压范围 -->
          <el-form-item v-if="this.visceraForm.type == 4" label="血压范围" prop="range_min" class="source" style="display:inline-block">
            <el-input v-model.trim="visceraForm.range_min" display="inline-block" class="range" clearable placeholder="最小值(最多保留两位小数)"></el-input>
          </el-form-item>
            <span v-if="this.visceraForm.type == 4">至</span>
          <el-form-item v-if="this.visceraForm.type == 4" prop="range_max" class="source" label-width="0px" style="display:inline-block">
            <el-input v-model.trim="visceraForm.range_max" display="inline-block" class="range" clearable placeholder="最大值(最多保留两位小数)"></el-input>
          </el-form-item>
          <!-- 血糖范围 -->
          <el-form-item v-if="this.visceraForm.type == 5" label="血糖范围" prop="range_min" class="source" style="display:inline-block">
            <el-input v-model.trim="visceraForm.range_min" display="inline-block" class="range" clearable placeholder="最小值(最多保留两位小数)"></el-input>
          </el-form-item>
            <span v-if="this.visceraForm.type == 5">至</span>
          <el-form-item v-if="this.visceraForm.type == 5" prop="range_max" class="source" label-width="0px" style="display:inline-block">
            <el-input v-model.trim="visceraForm.range_max" display="inline-block"  class="range" clearable placeholder="最大值(最多保留两位小数)"></el-input>
          </el-form-item>
          <!-- DNA评估结果 -->
          <el-form-item v-if="this.visceraForm.type == 7" label="疾病名称" prop="name" class="source">
            <el-input style="width:40%;" v-model.trim="visceraForm.name" display="inline-block"
            onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" clearable placeholder="请输入疾病名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="this.visceraForm.type == 7">
        <el-col :span="24">
          <!-- type = 7 DNA平均风险值 -->
          <el-form-item label="平均风险值" prop="range_max" class="source">
            <el-input style="width:40%;" v-model.trim="visceraForm.range_max" display="inline-block"
            onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" clearable placeholder="请输入平均风险值"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 表现症状 -->
      <el-row v-if="this.visceraForm.type === 1">
        <el-col :span="24">
          <el-form-item label="表现症状" prop="symptom" style="width:80%">
            <textarea id="symptom" v-model="visceraForm.symptom" style="display:none;"></textarea>
            <ueditor :id="'symptom_ueditor'" ref="symptom_ueditor"></ueditor>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-else-if="this.visceraForm.type === 7">
        <el-col :span="24">
          <el-form-item label="评估结果" prop="symptom" style="width:80%">
            <textarea id="symptom" v-model="visceraForm.symptom" style="display:none;"></textarea>
            <ueditor :id="'symptom_ueditor'" ref="symptom_ueditor"></ueditor>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="24">
          <el-form-item label="等级说明" prop="symptom" style="width:80%" >
            <textarea id="symptom" v-model="visceraForm.symptom" style="display:none;"></textarea>
            <ueditor :id="'symptom_ueditor'" ref="symptom_ueditor"></ueditor>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 生活建议 -->
      <el-row>
        <el-col :span="24" >
          <el-form-item label="生活建议" prop="suggestion" style="width:80%">
            <textarea id="symptom" v-model="visceraForm.suggestion" style="display:none;"></textarea>
            <ueditor :id="'suggestion_ueditor'" ref="suggestion_ueditor"></ueditor>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 中医调理 -->
      <el-row>
        <el-col :span="24" >
          <el-form-item label="中医调理" style="height:28px;"></el-form-item>
        </el-col><br/>
      </el-row>
      <!-- 中成药调理 -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="" style="width:80%;"><span class="commonCss">中成药调理</span>
          <!-- <span readonly style="color:red">添加商品，请选择药店来源</span><br/> -->
            <div id="RecommendWrapper">
              <div class="Recommend">
                <el-button-group>
                  <el-button type="default" size="small" @click="addProduct" icon="el-icon-plus" style="margin-bottom: 10px;">添加商品</el-button>
                  <el-button type="default" size="small" @click="cleanpro" icon="el-icon-delete" style="margin-left: 15px;">清空商品列表</el-button>
                </el-button-group>
                <v-table ref="prodata_table" column-width-drag :is-horizontal-resize="true" style="width:100%" :columns="productColunms" @on-custom-comp="customCompFuncProduct"
                :table-data="productData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
              </div>
              <el-dialog title="请选择需要推荐的商品" :visible.sync="productShow" :modal-append-to-body="false" width="80%" center>
                <iframe :src="ProductsUrl" frameborder="0" style="width:100%;height:600px;"></iframe>
              </el-dialog>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 中医方剂 -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="" style="width:80%;"><span class="commonCss">中医方剂</span><br/>
            <div id="RecommendWrapper">
              <div class="Recommend">
                <el-button-group>
                  <el-button type="default" size="small" @click="addprescription" icon="el-icon-plus" style="margin-bottom: 10px;">添加方剂</el-button>
                </el-button-group>
                <v-table ref="prodata_table" column-width-drag :is-horizontal-resize="true" style="width:100%" :columns="prescriptionColumns" @on-custom-comp="customCompFuncPrescription"
                :table-data="prescriptionData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 中医理疗 -->
      <!-- <el-row>
        <el-col :span="24">
          <el-form-item label="" style="width:80%;"><span class="commonCss">中医理疗</span><br/>
            <div id="RecommendWrapper">
              <div class="Recommend">
                <el-button-group>
                  <el-button type="default" size="small" @click="addprescription" icon="el-icon-plus" style="margin-bottom: 10px;">添加方剂</el-button>
                </el-button-group>
                <v-table ref="prodata_table" column-width-drag :is-horizontal-resize="true" style="width:100%" :columns="prescriptionColumns" @on-custom-comp="customCompFuncPrescription"
                :table-data="prescriptionData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row> -->
      <!-- 药膳饮食 -->
      <el-row>
        <el-col :span="24" >
          <el-form-item label="药膳饮食" style="height:28px;"></el-form-item>
        </el-col><br/>
      </el-row>
      <!-- 汤品 -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="" style="width:80%;"><span class="commonCss">汤品</span>
          <!-- <span readonly style="color:red">添加汤品，请选择药店来源为汤品的药店</span><br/> -->
            <div id="soupWrap">
              <div class="Recommend">
                <el-button-group>
                  <el-button type="default" size="small" @click="addinformation" icon="el-icon-plus" style="margin-bottom: 10px;">添加汤品</el-button>
                  <el-button type="default" size="small" @click="cleanSoup" icon="el-icon-delete" style="margin-left: 15px;">清空汤品列表</el-button>
                </el-button-group>
                <v-table ref="subdata_table" column-width-drag :is-horizontal-resize="true" style="width:100%" :columns="productColunms" @on-custom-comp="customCompFuncProduct"
                :table-data="soupTableData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
              </div>
              <el-dialog title="请选择需要推荐的汤品" :visible.sync="soupShow" :modal-append-to-body="false" width="80%" center>
                <iframe :src="ProductsUrl" frameborder="0" style="width:100%;height:600px;"></iframe>
              </el-dialog>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 滋补品 -->
      <el-row>
        <el-col :span="24">
          <el-form-item label='' style="width:80%;">
            <span class="commonCss">滋补品</span>
            <!-- <span readonly style="color:red">添加商品，请选择药店来源</span><br/> -->
            <div id="RecommendWrapper">
              <div class="Recommend">
                <el-button-group>
                  <el-button type="default" size="small" @click="addKangmei" icon="el-icon-plus" style="margin-bottom: 10px;">添加商品</el-button>
                  <el-button type="default" size="small" @click="cleanKangmei" icon="el-icon-delete" style="margin-left: 15px;">清空商品列表</el-button>
                </el-button-group>
                <v-table ref="prodata_table" column-width-drag :is-horizontal-resize="true" style="width:100%" :columns="productColunms" @on-custom-comp="customCompFuncProduct"
                :table-data="kangmeiData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
              </div>
              <el-dialog title="请选择需要推荐的滋补商品" :visible.sync="kangmeiShow" :modal-append-to-body="false" width="80%" center>
                <iframe :src="ProductsUrl" frameborder="0" style="width:100%;height:600px;"></iframe>
              </el-dialog>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 饮食建议 -->
      <!-- <div class="diet">
        <span class="commonCss Suggest dietSuggest">饮食建议</span><br/>
        <table width="1228" border=1 cellspacing="0" align="center" class="tableList">
          <tr style="background-color:#f6f8f8">
            <td class="tdCommom" style="width:100px;">所属宜忌</td>
            <td class="tdCommom tdSuggest">建议</td>
            <td class="tdCommom tdSuggest">食材</td>
            <td class="tdCommom" style="width:300px;">操作</td>
          </tr>
          <tr>
            <td class="tdCommom" style="width:100px;">宜</td>
            <td class="tdSuggest">{{fitSuggest}}</td>
            <td class="tdCommom tdSuggest">{{foodFit}}</td>
            <td class="tdCommom" style="width:300px;">
              <el-button type="primary" plain size="small" icon="el-icon-edit" @click="editSuggest(1)">编辑</el-button>
              <el-button type="primary" plain size="small" icon="el-icon-plus" @click="foodManage(1)" >食材管理</el-button>
            </td>
          </tr>
          <tr>
            <td class="tdCommom" style="width:100px;">忌</td>
            <td>
              <p class="tdSuggest">{{notfitSuggest}}</p>
            </td>
            <td class="tdCommom tdSuggest">{{foodNotFit}}</td>
            <td class="tdCommom" style="width:300px;">
              <el-button type="primary" plain size="small" icon="el-icon-edit" @click="editSuggest(0)" >编辑</el-button>
              <el-button type="primary" plain size="small" icon="el-icon-plus" @click="foodManage(0)" >食材管理</el-button>
            </td>
          </tr>
        </table>
      </div> -->
      <!-- 养生资讯 -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="养生资讯" style="width:80%;"><span readonly style="color:red"></span><br/>
            <div id="RecommendWrapper">
              <div class="Recommend">
                <el-button-group>
                  <el-button type="default" size="small" @click="addHealth" icon="el-icon-plus" style="margin-bottom: 10px;">添加资讯</el-button>
                  <el-button type="default" size="small" @click="cleanHealth" icon="el-icon-delete" style="margin-left: 15px;">清空列表</el-button>
                </el-button-group>
                <v-table ref="prodata_table" column-width-drag :is-horizontal-resize="true" style="width:100%" :columns="newsColumns" @on-custom-comp="customCompFuncNews"
                :table-data="healthData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
              </div>
              <el-dialog title="请选择需要资讯" :visible.sync="healthShow" :modal-append-to-body="false" width="80%" center>
                <iframe :src="NewListURL" frameborder="0" style="width:100%;height:600px;"></iframe>
              </el-dialog>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 运动保健 -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="运动保健" style="width:80%;"><span readonly style="color:red"></span><br/>
            <div id="RecommendWrapper">
              <div class="Recommend">
                <el-button-group>
                  <el-button type="default" size="small" @click="addMotion" icon="el-icon-plus" style="margin-bottom: 10px;">添加资讯</el-button>
                  <el-button type="default" size="small" @click="cleanMotion" icon="el-icon-delete" style="margin-left: 15px;">清空列表</el-button>
                </el-button-group>
                <v-table ref="prodata_table" column-width-drag :is-horizontal-resize="true" style="width:100%" :columns="newsColumns" @on-custom-comp="customCompFuncNews"
                :table-data="motionData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
              </div>
              <el-dialog title="请选择需要资讯" :visible.sync="motionShow" :modal-append-to-body="false" width="80%" center>
                <iframe :src="NewListURL" frameborder="0" style="width:100%;height:600px;"></iframe>
              </el-dialog>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 重置、保存 -->
      <el-row>
        <el-form-item class="footer">
          <el-button @click="resetForm" icon="el-icon-circle-close-outline" size="small">重置</el-button>
          <el-button @click="submitForm" type="primary" icon="el-icon-check" size="small">保存</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!--  编辑商品描述  -->
    <el-dialog title="商品描述" :visible.sync="proDes" :modal-append-to-body="false" :append-to-body="true" width="45%" center>
      <el-form :model="productDes" size="small" label-width="80px">
        <el-form-item label="商品名:" prop="name" class="source" style="width:30%;">
            <el-input v-model="productDes.name" readonly></el-input>
          </el-form-item>
        <el-form-item label="商品描述:" prop="productDes">
            <el-input type="textarea" :rows="5" v-model="productDes.description" style="width:60%"></el-input>
          </el-form-item>
        <el-form-item class="form-button-wrapper editDes">
          <el-button type="default" @click="cleanDes" icon="el-icon-circle-close">重置</el-button>
          <el-button type="primary" @click="saveDescription" icon="el-icon-search">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 中医方剂 -->
    <el-dialog :title="prescriptionTitle" :visible.sync="prescriptionShow"  @close="closePrescription" :modal-append-to-body="false" :append-to-body="true"
     width="600px" top="12vh" center>
      <el-form :model="prescriptionForm" size="small" :rules="prescriptionRules" ref="prescription_data" label-width="80px">
        <el-form-item label="中医方剂" style="height:28px;"></el-form-item>
        <el-form-item label="名称:" style="width:70%;" class="source" prop='name'>
          <el-input v-model.trim="prescriptionForm.name" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')"
          placeholder="请输入推荐方剂名称" clearable></el-input><br/>
        </el-form-item>
        <el-form-item label="剂量:" prop="prescription">
          <el-input type="textarea" :rows="3" v-model.trim="prescriptionForm.prescription" ></el-input>
        </el-form-item>
        <el-form-item label="功效:" prop="effect">
          <el-input type="textarea" :rows="3" v-model.trim="prescriptionForm.effect"></el-input>
        </el-form-item>
        <el-form-item class="form-button-wrapper editDes suggest">
          <el-button type="default" @click="closePrescription" icon="el-icon-circle-close">取消</el-button>
          <el-button type="primary" @click="savePrescrition(way)" icon="el-icon-search">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 中医理疗 -->
    <!-- <el-dialog title="中医理疗" :visible.sync="chinaDoctorShow" :close-on-click-modal="false" :modal-append-to-body="false" top='12vh' width="75%" center>
      <iframe name="iframe" :src="chinaDoctorUrl" frameborder="0" style="width:100%;height:600px;" id="rightiframe"></iframe>
    </el-dialog> -->
  </div>
</template>

<script>
// import $ from 'jquery';
import ajax from '@/utils/ajax';
import { mapGetters } from 'vuex';
import ueditor from '@/components/ueditor/editor';
export default {
  data() {
    // 价格
    let validateNumber = (rule, value, callback) => {
      if (value) {
        const reg = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确格式的数值'));
        }
      } else {
        return callback(new Error('请输入正确格式的数值'));
      }
    };
    return {
      Body_symptom: null,
      suggest_symptom: null,
      visceraForm: {
        type: Number(this.$route.query.type), // 类型
        name: '',  // 名称
        range_min: null,
        range_max: null,
        symptom: '',  // 表现症状
        suggestion: '',  // 生活建议
        product: [],  // 商品（中成药调理）
        prescriptions: [], // 中医方剂
        // physiotherapy: [],  // 中医理疗
        soup: [],     // 汤品
        life: [],     // 康美人生
        ingredients: [
        //   {  // 饮食建议
        //   ingredients_type: '',  // 食材类型 0：忌 1：宜
        //   ingredients_type_name: '',  // 宜 或者 忌
        //   ingredients_introduce: '', // 适宜文字描述
        //   ingredients_name: '',
        //   items: []
        // },
        // {
        //   ingredients_type: '',  // 食材类型 0：忌 1：宜
        //   ingredients_type_name: '',  // 宜 或者 忌
        //   ingredients_introduce: '', // 适宜文字描述
        //   ingredients_name: '',
        //   items: []
        // }
        ],
        read: [],     // 养生
        motion: [],   // 运动
      },
      foodFit: '',  // 宜
      foodNotFit: '',  // 忌
      fitSuggest: '',  // 宜建议
      notfitSuggest: '',  // 忌建议
      screenInfo: {
        PageIndex: 1,
        PageSize: 10,
      },
      rules: {
        name: [{ required: true, message: '请输入脏腑结果', trigger: 'blur' }],
        symptom: [{ required: true, message: '请输入表现症状', trigger: 'blur' }],
        suggestion: [{ required: true, message: '请输入生活建议', trigger: 'blur' }],
        range_min: [
          { required: true, validator: validateNumber, trigger: 'blur' },
        ],
        range_max: [
          { required: true, validator: validateNumber, trigger: 'blur' },
        ],
      },
      // 中医调理
      productData: [],    //  商品(中成药)
      productShow: false,
      prescriptionTitle: '',
      prescriptionData: [],  // 中医方剂
      prescriptionShow: false,
      prescriptionForm: {
        name: '',
        prescription: '',
        effect: '',
      },
      prescriptionRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        prescription: [{ required: true, message: '请输入剂量', trigger: 'blur' }],
        effect: [{ required: true, message: '请输入功效', trigger: 'blur' }],
      },
      chinaDoctorShow: false,
      medicineData: [],   //  中医调理
      // 药膳饮食
      // chinaDoctorUrl: `${process.env.WEB_HOST}/instrumentTesting/Viscera/programme`,  // 中医调理
      soupTableData: [],  // 汤品
      soupShow: false,
      kangmeiData: [],    // 康美人生
      kangmeiShow: false,
      healthData: [],     // 养生
      healthShow: false,
      motionData: [],     // 运动
      motionShow: false,
      ProductsUrl: `${process.env.WEB_HOST}/interveneManage/productOne`,  // 商品
      NewListURL: `${process.env.WEB_HOST}/interveneManage/newsManage/newsComponent`,  // 资讯
      productDes: {
        name: '',
        description: ''
      },
      proDes: false,
      productType: '',
      rowData: '',
      rowIndex: '',
      query: '',
      tip: '',  // 中医理疗
      way: '',  // 中医方剂
      getMedicineData: {  // 编辑中医理疗传值
        type: '',
        data: {}
      }
    };
  },
  components: {
    'ueditor': ueditor,
  },
  props: {
    add: Boolean
  },
  computed: {
    // 商品
    productColunms() {
      let columns = [
        { field: 'product_name', title: '商品名', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'product_pic', title: '商品图片', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true },
        { field: 'product_introduce', title: '商品功效', width: 250, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'product_price', title: '价格', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true },
        { field: 'description', title: '商品推荐文案', width: 200, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'operation', title: '操作', width: 260, titleAlign: 'center', columnAlign: 'center', componentName: 'table-operations-proDescriptionis', isResize: true }
      ];
      for (let i = 0; i < columns.length; i++) {
        let item = columns[i];
        if (i < 1) {
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
        if (item.field === 'product_pic') {
          let defaultImg = 'https://uploads.kangmei.com.cn/Files/20180627/fwkomaog.xzb.jpg';
          item.formatter = function (rowData, rowIndex, pagingIndex, field) {
            let value = rowData[field];
            if (value) {
              return `<a href="javascript:previewImg('${value}');"><img src="${value}" alt="" width="40px" height="40px" style="margin-top:5px;" /></a>`;
            } else {
              return `<a href="javascript:previewImg('${defaultImg}');"><img src="${defaultImg}" alt="" width="40px" height="40px" style="margin-top:5px;" /></a>`;
            }
          };
        }
        if (item.field === 'product_price') {
          item.formatter = function (rowData, rowIndex, pagingIndex, field) {
            let value = rowData[field];
            if (value) {
              return '<span style="color: red">' + value + '</span>';
            } else {
              return '-';
            }
          };
        }
      }
      return columns;
    },
    // 中医方剂
    prescriptionColumns() {
      let _self = this;
      let columns = [
        {
          field: 'custome', title: '序号', width: 20, titleAlign: 'center', columnAlign: 'center',
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            let index = (_self.screenInfo.PageIndex - 1) * 10 + rowIndex + 1;
            return index <= 3 ? '<span style="color:red;font-weight: bold;">' + index + '</span>' : index;
          },
          isFrozen: true,
          isResize: true
        },
        { field: 'name', title: '方剂名称', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true },
        { field: 'prescription', title: '剂量', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'effect', title: '功效', width: 300, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'option', title: '操作', width: 180, titleAlign: 'center', columnAlign: 'center', componentName: 'table-operations-editAndremove', isResize: true },
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
    // 资讯
    newsColumns() {
      let columns = [
        { field: 'product_id', title: '资讯ID', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'product_name', title: '资讯标题', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true, overflowTitle: true },
        { field: 'product_pic', title: '资讯图片', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true },
        { field: 'operation', title: '操作', width: 230, titleAlign: 'center', columnAlign: 'center', componentName: 'table-operations-sc', isResize: true }
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
        if (item.field === 'product_pic') {
          let defaultImg = 'https://uploads.kangmei.com.cn/Files/20180627/fwkomaog.xzb.jpg';
          item.formatter = function (rowData, rowIndex, pagingIndex, field) {
            let value = rowData[field];
            if (value) {
              return `<a href="javascript:previewImg('${value}');"><img src="${value}" alt="" width="40px" height="40px" style="margin-top:5px;" /></a>`;
            } else {
              return `<a href="javascript:previewImg('${defaultImg}');"><img src="${defaultImg}" alt="" width="40px" height="40px" style="margin-top:5px;" /></a>`;
            }
          };
        }
      }
      return columns;
    },
    ...mapGetters([
      'visitedViews',
    ]),
  },
  methods: {
    previewImg(url) { // 自定义弹窗
      this.$alert(`<img src="${url}" alt=''/>`, '', {
        dangerouslyUseHTMLString: true,
        distinguishCancelAndClose: false,
        customClass: 'reviewImg',
        showConfirmButton: false,
        closeOnPressEscape: true,
        closeOnClickModal: true
      });
    },
    // 添加商品（中成药）
    addProduct() {
      this.productShow = true;
      this.productType = 1;
      // this.$set(this.rowData, 'type', 2);
    },
    // 删除商品列表
    cleanpro() {
      if (this.productData.length !== 0) {
        this.$confirm('此操作将执行清空推荐商品列表数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.productData = [];
          this.visceraForm.product = [];
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message({
          type: 'info',
          message: '列表无数据'
        });
      }
    },
    // 添加方剂
    addprescription() {
      this.prescriptionTitle = '添加方剂';
      this.prescriptionShow = true;
      this.way = 1;
    },
    // 关闭中医方剂
    closePrescription() {
      this.prescriptionShow = false;
      this.prescriptionForm = {
        name: '',
        prescription: '',
        effect: '',
      };
    },
    // 保存中医方剂
    savePrescrition(item) {
      let _self = this;
      let temData = JSON.stringify(_self.prescriptionForm);
      _self.$refs['prescription_data'].validate((valid) => {
        if (valid) {
          let data = JSON.parse(temData);
          if (item === 1) {
            _self.prescriptionData.push(data);
            _self.visceraForm.prescriptions = _self.prescriptionData;
            _self.closePrescription();
          } else {
            let editData = this.query;
            _self.prescriptionData[editData.index] = this.prescriptionForm;
            _self.prescriptionData.splice(editData.index, 1, _self.prescriptionData[editData.index]);
            _self.prescriptionShow = false;
          }
        }
        else {
          _self.$alert('请将带 * 的填写完整。', '提示', {
            type: 'error'
          });
          return false;
        }
      });
    },
    // 方剂
    customCompFuncPrescription(params) {
      let _self = this;
      if (params.type === 'remove') {  // 删除
        this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.prescriptionData.splice(params.index, 1);
          this.visceraForm.prescriptions = this.prescriptionData;
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
      else if (params.type === 'edit') {
        this.way = 2;
        this.prescriptionShow = true;
        this.prescriptionTitle = '编辑方剂';
        let temData = JSON.stringify(params.rowData);
        this.prescriptionForm = JSON.parse(temData);
        this.query = {
          index: params.index,
        };
      }
      else if (params.type === 'sortUp') {
        _self.$confirm('此操作将上移该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (params.index > 0) {
            let temp = _self.prescriptionData[params.index - 1];
            _self.$set(_self.prescriptionData, params.index - 1, _self.prescriptionData[params.index]);
            _self.$set(_self.prescriptionData, params.index, temp);
            _self.$message({
              type: 'success',
              message: '上移成功'
            });
          } else {
            this.$message({
              type: 'warning',
              message: '该数据已在第一'
            });
          }
        }).catch(() => {
          _self.$message({
            type: 'info',
            message: '已取消上移'
          });
        });
      }
    },
    // 添加汤品
    addinformation() {
      this.soupShow = true;
      this.productType = 2;
      // this.$set(this.rowData, 'type', 1);
    },
    // 删除汤品列表
    cleanSoup() {
      if (this.soupTableData.length !== 0) {
        this.$confirm('此操作将执行清空推荐汤品列表数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.soupTableData = [];
          this.visceraForm.soup = [];
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message({
          type: 'info',
          message: '列表无数据'
        });
      }
    },
    // 添加康美商品
    addKangmei() {
      this.kangmeiShow = true;
      this.productType = 3;
      // this.$set(this.rowData, 'type', 3);
    },
    // 删除康美列表
    cleanKangmei() {
      if (this.kangmeiData.length !== 0) {
        this.$confirm('此操作将执行清空推荐滋补商品列表数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.kangmeiData = [];
          this.visceraForm.life = [];
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message({
          type: 'info',
          message: '列表无数据'
        });
      }
    },
    // 汤品、商品
    customCompFuncProduct(params) {
      let _self = this;
      if (params.type === 'delete') {  // 删除
        this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // console.log(params.rowData);
          if (params.rowData.type === 2) {
            this.productData.splice(params.index, 1);
            this.visceraForm.product = this.productData;
          } else if (params.rowData.type === 1) {
            this.soupTableData.splice(params.index, 1);
            this.visceraForm.soup = this.soupTableData;
          } else if (params.rowData.type === 3) {
            this.kangmeiData.splice(params.index, 1);
            this.visceraForm.life = this.kangmeiData;
          }
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
      else if (params.type === 'editDes') {
        this.rowIndex = params.index;
        this.proDes = true;
        this.productDes.name = params.rowData.product_name;
        if (params.rowData.description) {
          this.productDes.description = params.rowData.description;
        }
        this.rowData = params.rowData;
        // console.log(params.rowData);
        // console.log(this.rowIndex);
      }
      else if (params.type === 'sortUp') {
        _self.$confirm('此操作将上移该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (params.rowData.type === 1) {
            if (params.index > 0) {
              let temp = _self.soupTableData[params.index - 1];
              _self.$set(_self.soupTableData, params.index - 1, _self.soupTableData[params.index]);
              _self.$set(_self.soupTableData, params.index, temp);
              _self.$message({
                type: 'success',
                message: '上移成功'
              });
            } else {
              this.$message({
                type: 'warning',
                message: '该数据已在第一'
              });
            }
          }
          else if (params.rowData.type === 2) {
            if (params.index > 0) {
              let temp = _self.productData[params.index - 1];
              _self.$set(_self.productData, params.index - 1, _self.productData[params.index]);
              _self.$set(_self.productData, params.index, temp);
              _self.$message({
                type: 'success',
                message: '上移成功'
              });
            } else {
              this.$message({
                type: 'warning',
                message: '该数据已在第一'
              });
            }
          }
          else if (params.rowData.type === 3) {
            if (params.index > 0) {
              let temp = _self.kangmeiData[params.index - 1];
              _self.$set(_self.kangmeiData, params.index - 1, _self.kangmeiData[params.index]);
              _self.$set(_self.kangmeiData, params.index, temp);
              _self.$message({
                type: 'success',
                message: '上移成功'
              });
            } else {
              _self.$message({
                type: 'warning',
                message: '该数据已在第一'
              });
            }
          }
        }).catch(() => {
          _self.$message({
            type: 'info',
            message: '已取消上移'
          });
        });
      }
    },
    // 关闭编辑描述
    cleanDes() {
      this.productDes.description = '';
    },
    // 编辑商品描述
    saveDescription() {
      let _self = this;
      if (this.rowData.type === 2) {
        _self.productData[this.rowIndex].description = this.productDes.description;
      } else if (this.rowData.type === 1) {
        this.soupTableData[this.rowIndex].description = this.productDes.description;
      } else if (this.rowData.type === 3) {
        this.kangmeiData[this.rowIndex].description = this.productDes.description;
      }
      // this.productType = '';
      this.productDes.description = '';
      this.proDes = false;
    },
    // 添加养生资讯
    addHealth() {
      this.healthShow = true;
      this.productType = 4;
    },
    // 删除养生资讯
    cleanHealth() {
      if (this.healthData.length !== 0) {
        this.$confirm('此操作将执行清空列表数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.healthData = [];
          this.visceraForm.read = [];
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message({
          type: 'info',
          message: '列表无数据'
        });
      }
    },
    // 添加运动保健
    addMotion() {
      this.motionShow = true;
      this.productType = 5;
    },
    // 删除保健资讯
    cleanMotion() {
      if (this.motionData.length !== 0) {
        this.$confirm('此操作将执行清空列表数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.motionData = [];
          this.visceraForm.motion = [];
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message({
          type: 'info',
          message: '列表无数据'
        });
      }
    },
    // 养生、运动
    customCompFuncNews(params) {
      let _self = this;
      if (params.type === 'remove') {  // 删除
        this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (params.rowData.type === 7) {
            this.healthData.splice(params.index, 1);
            this.visceraForm.read = this.healthData;
          } else if (params.rowData.type === 5) {
            this.motionData.splice(params.index, 1);
            this.visceraForm.motion = this.motionData;
          }
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
      else if (params.type === 'sortUp') {
        _self.$confirm('此操作将上移该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (params.rowData.type === 7) {
            if (params.index > 0) {
              let temp = _self.healthData[params.index - 1];
              _self.$set(_self.healthData, params.index - 1, _self.healthData[params.index]);
              _self.$set(_self.healthData, params.index, temp);
              _self.$message({
                type: 'success',
                message: '上移成功'
              });
            } else {
              this.$message({
                type: 'warning',
                message: '该数据已在第一'
              });
            }
          } else if (params.rowData.type === 5) {
            if (params.index > 0) {
              let temp = _self.motionData[params.index - 1];
              _self.$set(_self.motionData, params.index - 1, _self.motionData[params.index]);
              _self.$set(_self.motionData, params.index, temp);
              _self.$message({
                type: 'success',
                message: '上移成功'
              });
            } else {
              _self.$message({
                type: 'warning',
                message: '该数据已在第一'
              });
            }
          }
        }).catch(() => {
          _self.$message({
            type: 'info',
            message: '已取消上移'
          });
        });
      }
    },
    // 重置
    resetForm() {
      this.visceraForm.name = '';
      this.Body_symptom.setContent('');
      this.visceraForm.symptom = '';
      this.suggest_symptom.setContent('');
      this.visceraForm.suggestion = '';
      this.visceraForm.product = [];
      this.productData = [];
      this.visceraForm.soup = [];
      this.soupTableData = [];
      this.visceraForm.life = [];
      this.kangmeiData = [];
      this.visceraForm.prescription = [];
      this.prescriptionData = [];
      this.visceraForm.read = [];
      this.healthData = [];
      this.visceraForm.motion = [];
      this.motionData = [];
    },
    // 获取详情
    getVisceraData() {
      ajax.get(`/api/jinmu/GetContentDescribeInfoByID/` + this.$route.query.id).then((res) => {
        console.log(res);
        if (res.status === 200 & res.data.code === 0) {
          this.visceraForm = res.data.data;
          if (res.data.data.product) {
            this.productData = res.data.data.product;
          }
          if (res.data.data.soup) {
            this.soupTableData = res.data.data.soup;
          }
          if (res.data.data.life) {
            this.kangmeiData = res.data.data.life;
          }
          if (res.data.data.read) {
            this.healthData = res.data.data.read;
          }
          if (res.data.data.motion) {
            this.motionData = res.data.data.motion;
          }
          if (this.visceraForm.symptom) {
            this.Body_symptom.setContent(this.visceraForm.symptom);
          }
          if (this.visceraForm.suggestion) {
            this.suggest_symptom.setContent(this.visceraForm.suggestion);
          }
          this.medicineData = res.data.data.physiotherapy;
          this.prescriptionData = res.data.data.prescriptions;
        }
      });
    },
    // 提交
    submitForm() {
      let _self = this;
      let symptomDetail = _self.Body_symptom.getContent();
      _self.visceraForm.symptom = symptomDetail;
      _self.visceraForm.suggestion = _self.suggest_symptom.getContent();
      _self.$refs['visceraData'].validate((valid) => {
        if (valid) {
          if (_self.visceraForm.type === 3 || _self.visceraForm.type === 4 || _self.visceraForm.type === 5) {
            if (Number(this.visceraForm.range_min) > Number(this.visceraForm.range_max)) {
              _self.$message({
                type: 'warning',
                message: '最大值不能小于最小值'
              });
            } else {
              if (_self.visceraForm.range_min && _self.visceraForm.range_max && _self.visceraForm.range_min !== _self.visceraForm.range_max) {
                _self.visceraForm.name = this.visceraForm.range_min + ' - ' + this.visceraForm.range_max;
                _self.commit();
              }
            }
          } else if (_self.visceraForm.type === 7) {
            _self.visceraForm.range_min = _self.visceraForm.range_max;
            _self.commit();
          } else if (_self.visceraForm.type === 1) {
            _self.visceraForm.range_max = _self.visceraForm.range_min = 0;
            _self.commit();
          }
        }
        else {
          // _self.$alert('请将带 * 的填写完整。', '提示', {
          //   type: 'error'
          // });
          return false;
        }
      });
    },
    commit() {
      let _self = this;
      let param = _self.visceraForm;
      let url;
      if (_self.add) {
        url = `/api/jinmu/AddContentDescribe`;
      } else {
        url = `/api/jinmu/UpdateContentDescribe`;
      }
      let config = {
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      };
      ajax.post(url, param, config).then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          _self.$message({
            message: res.data.message,
            type: 'success'
          });
          // 关闭当前也并跳转列表页
          let currentName = _self.$route.name;
          let currentTab = _self.visitedViews.find((x) => x.name === currentName);
          _self.$store.dispatch('delVisitedViews', currentTab).then((res) => {
            let query = _self.$route.query;
            query.from = _self.$route.name;
            if (query.id) {
              delete query.id;
            }
            let pathUrl;
            if (_self.visceraForm.type === 1) {
              pathUrl = '/interveneManage/bodyInterveneList';
            } else if (_self.visceraForm.type === 3) {
              pathUrl = '/interveneManage/BMIInterveneList';
            } else if (_self.visceraForm.type === 4) {
              pathUrl = '/interveneManage/pressureInterveneList';
            } else if (_self.visceraForm.type === 5) {
              pathUrl = '/interveneManage/sugarInterveneList';
            } else if (_self.visceraForm.type === 7) {
              pathUrl = '/interveneManage/DNAInterveneList';
            }
            _self.$router.push({
              path: pathUrl,
              // query: query
            });
          });
        } else {
          return false;
        }
      });
    },
    // 选择推荐商品
    oneProduct(data) {
      // console.log(data);
      let _self = this;
      let newsId = _self.productData.map(function (item, index, data) {
        return item.product_id;
      });
      let noSoupID = _self.soupTableData.map(function(item, index, data) {
        return item.product_id;
      });
      let kangmeiID = _self.kangmeiData.map(function(item, index, data) {
        return item.product_id;
      });
      // console.log(newsId);
      let newsShare = {
        product_id: data.pro_id,
        product_name: data.pro_name,
        product_pic: data.pro_pic,
        product_price: data.pro_price,
        product_introduce: data.pro_describe,
        getByself: '',
        getFast: '',
        getCommon: '1',
        transnational: '',
        description: '',
        product_type: '',
        type: '',
      };
      // console.log(_self.productType);
      if (_self.productType === 1) {
        if (newsId.indexOf(data.id) === -1) {
          _self.$set(newsShare, 'type', 2);
          _self.productData.push(newsShare);
          _self.visceraForm.product = _self.productData;
          _self.productShow = false;
        } else {
          _self.$message({
            message: '该商品已存在列表，请重新选择',
            type: 'warning'
          });
        }
      } else if (_self.productType === 2) {
        if (noSoupID.indexOf(data.id) === -1) {
          _self.$set(newsShare, 'type', 1);
          _self.soupTableData.push(newsShare);
          _self.visceraForm.soup = _self.soupTableData;
          _self.soupShow = false;
        } else {
          _self.$message({
            message: '该商品已存在列表，请重新选择',
            type: 'warning'
          });
        }
      } else if (_self.productType === 3) {
        if (kangmeiID.indexOf(data.id) === -1) {
          _self.$set(newsShare, 'type', 3);
          _self.kangmeiData.push(newsShare);
          _self.visceraForm.life = _self.kangmeiData;
          _self.kangmeiShow = false;
        } else {
          _self.$message({
            message: '该商品已存在列表，请重新选择',
            type: 'warning'
          });
        }
      }
    },
    // 资讯
    oneNews(data) {
      let _self = this;
      let newsInfo = {
        product_id: data.id,
        product_name: data.title,
        description: '1',
        product_pic: data.mainimage
      };
      let healthArr = _self.healthData.map(function(item, index, data) {
        return Number(item.product_id);
      });
      let motionArr = _self.motionData.map(function(item, index, data) {
        return Number(item.product_id);
      });
      if (data.statusflag === 2) {
        if (_self.productType === 4) {
          if (healthArr.indexOf(data.id) === -1) {
            _self.healthData.push(newsInfo);
            _self.visceraForm.read = _self.healthData;
            _self.healthShow = false;
            _self.$set(newsInfo, 'type', 7);
          } else {
            _self.$message({
              message: '该资讯已列表中存在，请选择其他资讯',
              type: 'warning'
            });
          }
        } else if (_self.productType === 5) {
          if (motionArr.indexOf(data.id) === -1) {
            _self.motionData.push(newsInfo);
            _self.visceraForm.motion = _self.motionData;
            _self.motionShow = false;
            _self.$set(newsInfo, 'type', 5);
          } else {
            _self.$message({
              message: '该资讯已列表中存在，请选择其他资讯',
              type: 'warning'
            });
          }
        }
      } else {
        _self.$message({
          type: 'warning',
          message: '请选择“核审通过”的资讯'
        });
      }
    },
  },
  created() {
    window.previewImg = this.previewImg;
    window.oneProduct = this.oneProduct;
    window.oneNews = this.oneNews;
    // window.selectFoodList = this.selectFoodList;
    // window.selectNewList = this.selectNewList;
    if (this.add === false) {
      this.getVisceraData();
    }
  },
  mounted() {
    this.Body_symptom = this.$refs.symptom_ueditor;
    this.suggest_symptom = this.$refs.suggestion_ueditor;
  }
};
</script>

<style lang="less" scoped>
.form-button-wrapper {
  text-align: center;
  margin: 30px 0 50px -80px;
}
.footer{
  text-align: center;
  margin:0 0 80px -100px;
}
.commonCss {
  margin-right: 14px;
}
.diet{
  margin-left: 100px;
  .Suggest{
    display: inline-block;
    height: 40px;
    line-height: 30px;
  }
  .tableList{
    // margin: 0 0 0 20px;
    .headPhoto{
      width: 150px;
      text-align: center;
    }
    tr{
      td,th{
        height: 40px;
        line-height: 25px;
        padding: 0 20px;
        border: 1px solid rgba(221, 221, 221, 1);
        text-align: left;
      }
      .tdCommom{
        text-align: center;
        width: 180px;
      }
      .tdSuggest{
        width: 363.5px;
        // text-overflow: ellipsis;
        white-space: wrap;
        // overflow: hidden;
      }
    }
  }
}
.DNA_uedit {
  /deep/ .edui-state-checked{
    display: block;
  }
}
</style>
