<template>
  <div class="tab-container">
    <div class="filter-container">
      <el-input :placeholder="$t('repair.model')" v-model="listQuery.productType" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button v-permission="[11]" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>
    <div class="app-container">
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        height="535"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        <el-table-column :label="$t('repair.SerialNumber')" prop="id" align="center" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.itemName')" prop="name" min-width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.model')" align="center" prop="productType" min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.productType }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.price2')" prop="price" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.Description2')" prop="description" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.createTime')" prop="createTime" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column v-permission="[12, 13]" :label="$t('table.actions')" align="center" min-width="100" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button v-permission="[12]" type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table2.edit') }}</el-button>
            <el-button v-permission="[13]" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('repair.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pagenum" :limit.sync="listQuery.pagesize" @pagination="getList" />
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :title="$t('repair.itemModification')" width="30%" center lock-scroll>
      <el-form :model="categoriesform" style="width: 400px; margin:0 auto;">
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.price2')">
          <el-input v-model="categoriesform.price"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('repair.cancel') }}</el-button>
        <el-button type="primary" @click="updateData">{{ $t('repair.ok') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="addproject" :title="$t('repair.Additem')" width="50%" center lock-scroll >
      <el-form :model="form" style="width: 400px; margin-left:50px;">
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.model')">
          <el-select v-model="form.producttype" placeholder="please choose">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item"
              :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.itemName2')">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.price2')">
          <el-input v-model="form.price"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.KPIScore')">
          <el-input v-model="form.mark"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.Description3')">
          <el-input v-model="form.desc"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addproject = false">{{ $t('repair.cancel') }}</el-button>
        <el-button type="primary" @click="createData">{{ $t('repair.ok') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { repairprojectList, editrepairproject, deleterepairproject, producttype, addrepairproject } from '../../api/repair'
import waves from '@/directive/waves' // Waves directive
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Sample',
  components: { Pagination },
  directives: { waves, permission },
  data() {
    return {
      categoriesform: {
        price: '',
        itemid: ''
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pagenum: 1,
        pagesize: 10,
        productType: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      options: [],
      form: {
        producttype: '',
        name: '',
        price: '',
        desc: '',
        mark: ''
      },
      formLabelWidth: '120px',
      dialogVisible: false,
      addproject: false,
      centerDialogVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    checkPermission,
    // 列表渲染
    getList() {
      this.listLoading = true
      repairprojectList(this.listQuery).then(response => {
        this.list = response.data.data.content.list
        this.total = response.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 列表搜索
    handleFilter() {
      this.listQuery.pagenum = 1
      this.getList()
    },
    // 维修项目删除
    handleDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleterepairproject(row.id).then(res => {
          if (res.data.ret === 200) {
            this.getList()
          }
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 维修项目添加
    getproducts() {
      producttype().then(res => {
        this.options = res.data.data.content
      })
    },
    handleCreate() {
      this.getproducts()
      this.addproject = true
    },
    createData() {
      addrepairproject(this.form).then(res => {
        this.getList()
        this.addproject = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    // 维修项目修改
    handleUpdate(row) {
      this.categoriesform = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
    },
    updateData() {
      const tempData = Object.assign({}, this.categoriesform)
      const itemid = tempData.id
      editrepairproject(this.categoriesform.price, itemid).then(res => {
        if (res.data.ret === 200) {
          this.getList()
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .tab-container{
    margin: 30px;
  }
  .app-container{
    padding: 0px;
  }
  .tap-container1{
    margin-left: 20px;
  }
  .filter-container{
    margin-left: 20px;
  }
  .el-tabs__header is-top{
    padding-left: 20px;
  }
</style>
