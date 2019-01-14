import request from '@/utils/request'

// 员工列表
export function employeelist(query) {
  return request({
    url: '/pss/repository/getremplist',
    method: 'post',
    params: query
  })
}

// 员工列表
export function searchemployeelist(query) {
  var params = new URLSearchParams()
  params.append('repositoryid', query.repositoryid) // 你要传给后台的参数值 key/value
  params.append('personname', query.personname) // 你要传给后台的参数值 key/value
  params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  params.append('regionid', query.regionid) // 你要传给后台的参数值 key/value
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/repository/getremplist',
    method: 'post',
    data: params
  })
}

// 所有门店列表
export function allstore(repositoryid, regionid) {
  var params = new URLSearchParams()
  params.append('regionid', regionid) // 你要传给后台的参数值 key/value
  params.append('repositoryid', repositoryid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/repository/getrepositorybyreid',
    method: 'post',
    data: params
  })
}

// 所有区域列表
export function allarea(repositoryid, regionid) {
  var params = new URLSearchParams()
  params.append('regionid', regionid) // 你要传给后台的参数值 key/value
  params.append('repositoryid', repositoryid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/region/getregionlistbyreid',
    method: 'post',
    data: params
  })
}

// 员工列表
export function editemployee(query) {
  var params = new URLSearchParams()
  params.append('userid', query.id) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/user/getemployeeinformation',
    method: 'post',
    data: params
  })
}

// 员工列表
export function editarea(query) {
  return request({
    url: '/pss/region/detaillist',
    method: 'post',
    params: query
  })
}

// 根据区域获取门店列表
export function getrepositorylist(regionid) {
  var params = new URLSearchParams()
  params.append('regionid', regionid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/repository/getrepositorylist',
    method: 'post',
    data: params
  })
}

// 获取角色列表
export function getrolelist(query) {
  return request({
    url: '/pss/role/getrolelist',
    method: 'post',
    params: query
  })
}

// 修改角色
export function updateemprepository(query) {
  var params = new URLSearchParams()
  params.append('employeeid', query.id) // 你要传给后台的参数值 key/value
  params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  params.append('roleid', query.roleId) // 你要传给后台的参数值 key/value
  params.append('newrepositoryid', query.repositoryId) // 你要传给后台的参数值 key/value
  params.append('regionid', query.regionId) // 你要传给后台的参数值 key/value
  params.append('password', query.password) // 你要传给后台的参数值 key/value
  params.append('personname', query.personName) // 你要传给后台的参数值 key/value
  params.append('birthday', query.birthday) // 你要传给后台的参数值 key/value
  params.append('email', query.email) // 你要传给后台的参数值 key/value
  params.append('phone', query.phoneNumber) // 你要传给后台的参数值 key/value
  params.append('gender', query.gender) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/repository/updateemprepository',
    method: 'post',
    data: params
  })
}

// 根据id获取门店列表
export function getrepositorybyid(repositoryid) {
  var params = new URLSearchParams()
  params.append('repositoryid', repositoryid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/repository/getrepositorybyid',
    method: 'post',
    data: params
  })
}

// 根据id获取门店列表
export function addemp(query) {
  var params = new URLSearchParams()
  params.append('username', query.username) // 你要传给后台的参数值 key/value
  params.append('passwd', query.passwd) // 你要传给后台的参数值 key/value
  params.append('email', query.email) // 你要传给后台的参数值 key/value
  params.append('phone', query.phone) // 你要传给后台的参数值 key/value
  params.append('gender', query.gender) // 你要传给后台的参数值 key/value
  params.append('repositoryid', query.repositoryid) // 你要传给后台的参数值 key/value
  params.append('roleid', query.roleid) // 你要传给后台的参数值 key/value
  params.append('birthday', query.birthday) // 你要传给后台的参数值 key/value
  params.append('personname', query.personname) // 你要传给后台的参数值 key/value
  params.append('regionid', query.regionid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/user/register',
    method: 'post',
    data: params
  })
}

// 获取员工绩效列表
export function kpigradelist(query) {
  var params = new URLSearchParams()
  params.append('employeename', query.employeename) // 你要传给后台的参数值 key/value
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/kpi/kpigradelist',
    method: 'post',
    params: query
  })
}

// 根据员工id获取员工分数
export function getcountkpibymonth(query) {
  var params = new URLSearchParams()
  params.append('employeeid', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/kpi/getcountkpibymonth',
    method: 'post',
    data: params
  })
}

// 根据员工id获取绩效得分趋势
export function empkpibymonth(query) {
  var params = new URLSearchParams()
  params.append('employeeid', query) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/kpi/empkpibymonth',
    method: 'post',
    data: params
  })
}

// 获取绩效规则
export function kpiruleslist(query) {
  return request({
    url: '/pss/admin/kpi/kpiruleslist',
    method: 'post',
    params: query
  })
}

// 修改绩效规则
export function updaterules(kpirulesid, mark) {
  var params = new URLSearchParams()
  params.append('kpirulesid', kpirulesid) // 你要传给后台的参数值 key/value
  params.append('mark', mark) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/kpi/updaterules',
    method: 'post',
    data: params
  })
}

// 删除绩效规则
export function deleterules(kpirulesid) {
  var params = new URLSearchParams()
  params.append('kpirulesid', kpirulesid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/kpi/deleterules',
    method: 'post',
    data: params
  })
}

// 员工轨迹中详细数据
export function gettasklistbyday(userid, date) {
  var params = new URLSearchParams()
  params.append('userid', userid) // 你要传给后台的参数值 key/value
  params.append('date', date) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/position/gettasklistbyday',
    method: 'post',
    data: params
  })
}
