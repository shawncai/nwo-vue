<template>
  <div class="tab-container">
    <div class="filter-container">
      <el-input :placeholder="$t('employee.personName')" v-model="listQuery.employeename" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
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
        <el-table-column :label="$t('employee.employeeId')" prop="ranking" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.ranking }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('employee.personName')" prop="employeeName" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.employeeName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('employee.store')" prop="repositoryName" min-width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('employee.rolename')" align="center" prop="roleName" min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.roleName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('employee.kpiGrade')" prop="kpiGrade" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.kpiGrade }}</span>
          </template>
        </el-table-column>
        <el-table-column v-permission="[49]" :label="$t('table.actions')" align="center" min-width="100" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button v-permission="[49]" type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('client.seen') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pagenum" :limit.sync="listQuery.pagesize" @pagination="getList" />
    </div>
    <el-dialog
      :visible.sync="centerDialogVisible"
      :model="detail"
      :title="$t('employee.performancedetail')"
      width="80%"
      center
      top="-10px"
    >
      <panel-group :sale-t="detail.saleNum" :maintain-t="detail.maintainNum" :cengfa-t="detail.cengfa"/>
      <code>{{ $t('employee.trendofperformance') }}</code>
      <el-row>
        <el-col :span="24">
          <div class="chart-wrapper">
            <line-chart :chart-data="lineChartData" :time-frequency="dateList"/>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">{{ $t('employee.cancel') }}</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">{{ $t('employee.ok') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { addcategories, deletecategories, editcategories } from '@/api/goods'
import { getstatByToken } from '@/api/login'
import { kpigradelist, getcountkpibymonth, empkpibymonth } from '@/api/employee'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import waves from '@/directive/waves' // Waves directive
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'EmployeePerformance',
  components: { Pagination, PanelGroup, LineChart },
  directives: { waves, permission },
  data() {
    return {
      categoriesform: {
        categoryCode: '',
        categoryName: '',
        createrId: 1,
        id: ''
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pagenum: 1,
        pagesize: 10,
        employeename: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      options: [],
      formLabelWidth: '120px',
      dialogImageUrl: '',
      dialogVisible: false,
      textMap: {
        update: '修改分类',
        create: '新增分类'
      },
      centerDialogVisible: false,
      detail: {
        saleNum: '',
        maintainNum: '',
        cengfa: ''
      },
      dateList: [],
      timesList: [],
      lineChartData: []
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
      kpigradelist(this.listQuery).then(response => {
        this.list = response.data.data.content.list
        this.total = response.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      getstatByToken(this.$store.getters.token).then(res => {
        console.log(res.data.data.content)
        if (res.data.data.content !== true) {
          this.$alert('该账号在其他设备登录', '登出', {
            confirmButtonText: '确定',
            callback: action => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            }
          })
        }
      })
    },
    // 列表搜索
    handleFilter() {
      this.listLoading = true
      this.listQuery.pagenum = 1
      kpigradelist(this.listQuery).then(res => {
        this.list = res.data.data.content.list
        this.total = res.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })
    },
    // 列表删除
    handleDelete(row) {
      console.log(row)
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletecategories(row).then(res => {
          console.log(res)
          this.getList()
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
    restform() {
      this.categoriesform = {
        categoryCode: '',
        categoryName: '',
        createrId: '',
        id: ''
      }
    },
    // 商品分类添加
    handleCreate() {
      this.restform()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    createData() {
      this.categoriesform.createrId = this.$store.getters.userId
      addcategories(this.categoriesform).then(() => {
        this.getList()
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    // 列表修改
    handleUpdate(row) {
      this.centerDialogVisible = true
      getcountkpibymonth(row.employeeId).then(res => {
        this.detail.saleNum = res.data.data.content.totalScore
        this.detail.maintainNum = res.data.data.content.goodScore
        this.detail.cengfa = res.data.data.content.lessScore
      })
      empkpibymonth(row.employeeId).then(res => {
        this.dateList = res.data.data.dateList
        this.lineChartData = res.data.data.gradeList
      })
    },
    updateData() {
      console.log(this.categoriesform)
      const tempData = Object.assign({}, this.categoriesform)
      editcategories(tempData).then(() => {
        this.getList()
        this.centerDialogVisible = false
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
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
