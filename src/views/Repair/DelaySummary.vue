<template>
  <div class="tab-container">
    <div class="filter-container">
      <el-input :placeholder="$t('repair.Ordernumber')" v-model="listQuery.code" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <div class="filter-item">
        <el-date-picker
          v-model="twotime"
          type="daterange"
          range-separator="-"
          unlink-panels
          start-placeholder="start"
          end-placeholder="end"
          value-format="yyyy-MM-dd HH:mm"/>
      </div>
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
        <el-table-column :label="$t('repair.Ordernumber')" prop="code" align="center" width="200px">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.CustomerName2')" prop="personName" min-width="130px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.personName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.Customerphone')" align="center" prop="phoneNumber" min-width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.phoneNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.AllocationTimeDifference')" prop="assignTimeDiff" width="200px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.assignTimeDiff }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.branchDelayTime')" prop="delayTimeDiff" width="180px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.delayTimeDiff }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.stat')" prop="stat" width="120px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.stat | result }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pagenum" :limit.sync="listQuery.pagesize" @pagination="getList" />
    </div>
    <el-dialog :visible.sync="addproject" title="新增任务" width="50%" center lock-scroll >
      <el-form :model="form" style="width: 400px; margin-left:50px;">
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.taskname')">
          <el-input v-model="form.taskname"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.taskaddress')">
          <el-input v-model="form.taskaddress"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.dispatch_staff')">
          <el-select v-model="form.employeeid" placeholder="请选择">
            <el-option v-for="item in staffnamelist" :key="item.id" :label="item.personName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.taskcontent')">
          <el-input v-model="form.taskcontent"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addproject = false">取 消</el-button>
        <el-button type="primary" @click="createData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { editrepairproject, stafflist, delaycount, deletetaskoffline, addtaskoffline, searchdelaycount } from '../../api/repair'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const calendarTypeOptions = [
  { key: '1', display_name: '完成' },
  { key: '2', display_name: '未完成' }
]
export default {
  name: 'Sample',
  components: { Pagination },
  directives: { waves },
  filters: {
    result: function(val) {
      if (val === 1) {
        return '待分配'
      } else if (val === 2) {
        return '已安排'
      } else if (val === 3) {
        return '待检修'
      } else if (val === 4) {
        return '维修中'
      } else if (val === 5) {
        return '检修完成'
      } else if (val === 6) {
        return '评价完成'
      } else if (val === 7) {
        return '取消'
      }
    }
  },
  data() {
    return {
      categoriesform: {
        price: '',
        itemid: ''
      },
      staffnamelist: [],
      calendarTypeOptions,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pagenum: 1,
        pagesize: 10,
        begintime: '',
        endtime: '',
        code: '',
        regionid: '',
        repositoryid: ''
      },
      twotime: [],
      dialogFormVisible: false,
      dialogStatus: '',
      options: [],
      form: {
        taskname: '',
        taskaddress: '',
        taskcontent: '',
        createid: '',
        employeeid: ''
      },
      formLabelWidth: '120px',
      dialogVisible: false,
      addproject: false,
      centerDialogVisible: false
    }
  },
  created() {
    this.getList()
    this.getAllStaff()
  },
  methods: {
    // 列表渲染
    getList() {
      this.listLoading = true
      this.listQuery.regionid = this.$store.getters.regionid
      this.listQuery.repositoryid = this.$store.getters.repositoryid
      delaycount(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data.data.content.list
        this.total = response.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    getAllStaff() {
      stafflist().then(res => {
        this.staffnamelist = res.data.data.content.list
      })
    },
    // 列表搜索
    handleFilter() {
      this.listLoading = true
      if (this.twotime === null) {
        this.listQuery.begintime = ''
        this.listQuery.endtime = ''
        this.listQuery.regionid = this.$store.getters.regionid
        this.listQuery.repositoryid = this.$store.getters.repositoryid
        searchdelaycount(this.listQuery).then(res => {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 100)
        })
      } else {
        this.listQuery.begintime = this.twotime[0]
        this.listQuery.endtime = this.twotime[1]
        this.listQuery.regionid = this.$store.getters.regionid
        this.listQuery.repositoryid = this.$store.getters.repositoryid
        searchdelaycount(this.listQuery).then(res => {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 100)
        })
      }
    },
    // 维修项目删除
    handleDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row)
        deletetaskoffline(row).then(res => {
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
    handleCreate() {
      this.addproject = true
    },
    createData() {
      this.form.createid = this.$store.getters.userId
      addtaskoffline(this.form).then(res => {
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
