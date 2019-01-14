import request from '@/utils/request'

// 维修列表
export function repairList(query) {
  var params = new URLSearchParams()
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('stat', query.stat) // 你要传给后台的参数值 key/value
  params.append('expectrepositoryid', query.expectrepositoryid) // 你要传给后台的参数值 key/value
  params.append('username', query.username) // 你要传给后台的参数值 key/value
  params.append('begintime', query.begintime) // 你要传给后台的参数值 key/value
  params.append('endtime', query.endtime) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  params.append('regionid', query.regionid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/service/getservicelistbycondition',
    method: 'post',
    data: params
  })
}

// 维修详情
export function repairDetail(serviceid) {
  var params = new URLSearchParams()
  params.append('serviceid', serviceid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/service/getservicedetail',
    method: 'post',
    data: params
  })
}

//  取消已分配的订单重新分配给员工
export function serviceretoemp(serviceid) {
  var params = new URLSearchParams()
  params.append('serviceid', serviceid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/service/serviceretoemp',
    method: 'post',
    data: params
  })
}

//  取消已分配的订单重新分配给员工
export function endservicebackground(serviceid) {
  var params = new URLSearchParams()
  params.append('serviceid', serviceid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/service/endservicebackground',
    method: 'post',
    data: params
  })
}

// 维修单重新分配门店
export function retoreposervice(serviceid, repositoryid) {
  var params = new URLSearchParams()
  params.append('serviceid', serviceid) // 你要传给后台的参数值 key/value
  params.append('repositoryid', repositoryid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/service/retoreposervice',
    method: 'post',
    data: params
  })
}

// 维修追踪
export function getserviceschedule(serviceid) {
  var params = new URLSearchParams()
  params.append('serviceid', serviceid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/serviceposition/getserviceschedule',
    method: 'post',
    data: params
  })
}

// 分派维修订单
export function repairtoemp(serviceorderid, handlerid) {
  var params = new URLSearchParams()
  params.append('serviceorderid', serviceorderid) // 你要传给后台的参数值 key/value
  params.append('handlerid', handlerid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/service/serviceordertoemp',
    method: 'post',
    data: params
  })
}

// 车辆型号
export function producttype(query) {
  return request({
    url: 'pss/product/getproducttype',
    method: 'post',
    params: query
  })
}

// 门店列表
export function repositorylist(query) {
  return request({
    url: 'pss/repository/getrepositorylist',
    method: 'post',
    params: query
  })
}

// 新增维修订单
export function newservice(query) {
  var params = new URLSearchParams()
  params.append('components', query.components) // 你要传给后台的参数值 key/value
  params.append('detail', query.detail) // 你要传给后台的参数值 key/value
  params.append('producttype', query.producttype) // 你要传给后台的参数值 key/value
  params.append('username', query.username) // 你要传给后台的参数值 key/value
  params.append('address', query.address) // 你要传给后台的参数值 key/value
  params.append('person', query.person) // 你要传给后台的参数值 key/value
  params.append('phone', query.phone) // 你要传给后台的参数值 key/value
  params.append('servicexpecttime', query.servicexpecttime) // 你要传给后台的参数值 key/value
  params.append('repositoryid', query.repositoryid) // 你要传给后台的参数值 key/value
  params.append('cityid', query.cityid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/service/newservice',
    method: 'post',
    data: params
  })
}

// 维修项目列表
export function repairprojectList(query) {
  var params = new URLSearchParams()
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  params.append('producttype', query.productType) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/service/listserviceitem',
    method: 'post',
    data: params
  })
}

// 维修项目修改
export function editrepairproject(price, itemid) {
  var params = new URLSearchParams()
  params.append('price', price) // 你要传给后台的参数值 key/value
  params.append('itemid', itemid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/service/updateserviceitem',
    method: 'post',
    data: params
  })
}

// 维修项目删除
export function deleterepairproject(itemid) {
  var params = new URLSearchParams()
  params.append('itemid', itemid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/service/deleteserviceitem',
    method: 'post',
    data: params
  })
}

// 添加维修项目
export function addrepairproject(query) {
  var params = new URLSearchParams()
  params.append('producttype', query.producttype) // 你要传给后台的参数值 key/value
  params.append('name', query.name) // 你要传给后台的参数值 key/value
  params.append('price', query.price) // 你要传给后台的参数值 key/value
  params.append('desc', query.desc) // 你要传给后台的参数值 key/value
  params.append('mark', query.mark) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/service/addserviceitem',
    method: 'post',
    data: params
  })
}

// 维修项目搜索
export function searchrepairproject(query) {
  var params = new URLSearchParams()
  params.append('producttype', query.productType) // 你要传给后台的参数值 key/value
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/service/listserviceitem',
    method: 'post',
    data: params
  })
}

// 项目所有员工
export function stafflist(repositoryid, regionid) {
  var params = new URLSearchParams()
  params.append('repositoryid', repositoryid) // 你要传给后台的参数值 key/value
  params.append('regionid', regionid) // 你要传给后台的参数值 key/value
  params.append('pagesize', 1000) // 你要传给后台的参数值 key/value
  params.append('pagenum', 1) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/repository/getremplist',
    method: 'post',
    data: params
  })
}

// 线下任务列表
export function gettaskofflinelist(query) {
  var params = new URLSearchParams()
  params.append('result', query.result) // 你要传给后台的参数值 key/value
  params.append('code', query.code) // 你要传给后台的参数值 key/value
  params.append('employeeid', query.employeeid) // 你要传给后台的参数值 key/value
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/taskoffline/gettaskofflinelist',
    method: 'post',
    data: params
  })
}

// 线下任务删除
export function deletetaskoffline(query) {
  var params = new URLSearchParams()
  params.append('taskid', query.id) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/taskoffline/deletetaskoffline',
    method: 'post',
    data: params
  })
}

// 添加线下任务
export function addtaskoffline(query) {
  var params = new URLSearchParams()
  params.append('taskname', query.taskname) // 你要传给后台的参数值 key/value
  params.append('taskaddress', query.taskaddress) // 你要传给后台的参数值 key/value
  params.append('taskcontent', query.taskcontent) // 你要传给后台的参数值 key/value
  params.append('createid', query.createid) // 你要传给后台的参数值 key/value
  params.append('employeeid', query.employeeid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/taskoffline/addtaskoffline',
    method: 'post',
    data: params
  })
}

// 线下任务搜索
export function searchtaskofflinelist(query) {
  var params = new URLSearchParams()
  params.append('employeeid', query.employeeid) // 你要传给后台的参数值 key/value
  params.append('result', query.result) // 你要传给后台的参数值 key/value
  params.append('code', query.code) // 你要传给后台的参数值 key/value
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/taskoffline/gettaskofflinelist',
    method: 'post',
    data: params
  })
}

// 延误统计列表
export function delaycount(query) {
  var params = new URLSearchParams()
  params.append('regionid', query.regionid) // 你要传给后台的参数值 key/value
  params.append('repositoryid', query.repositoryid) // 你要传给后台的参数值 key/value
  params.append('code', query.code) // 你要传给后台的参数值 key/value
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/serviceorderdelay/delaycount',
    method: 'post',
    data: params
  })
}

// 延误统计搜索
export function searchdelaycount(query) {
  var params = new URLSearchParams()
  params.append('begintime', query.begintime) // 你要传给后台的参数值 key/value
  params.append('endtime', query.endtime) // 你要传给后台的参数值 key/value
  params.append('code', query.code) // 你要传给后台的参数值 key/value
  params.append('pagenum', query.pagenum) // 你要传给后台的参数值 key/value
  params.append('pagesize', query.pagesize) // 你要传给后台的参数值 key/value
  params.append('regionid', query.regionid) // 你要传给后台的参数值 key/value
  params.append('repositoryid', query.repositoryid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/serviceorderdelay/delaycount',
    method: 'post',
    data: params
  })
}

// 问题部位列表
export function searchproblemobject(query) {
  return request({
    url: '/pss/admin/fault/search',
    method: 'post',
    params: query
  })
}

// 添加问题部位
export function addfaultcomponent(query) {
  var params = new URLSearchParams()
  params.append('faultname', query.faultname) // 你要传给后台的参数值 key/value
  params.append('level', query.level) // 你要传给后台的参数值 key/value
  params.append('parentid', query.parentid) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/fault/addfaultcomponent',
    method: 'post',
    data: params
  })
}

// 自检管理列表
export function selfChecklist(query) {
  return request({
    url: '/pss/admin/selfchecking/search',
    method: 'post',
    params: query
  })
}

// 添加自检部位
export function addselfchecking(query) {
  var params = new URLSearchParams()
  params.append('name', query.name) // 你要传给后台的参数值 key/value
  params.append('level', query.level) // 你要传给后台的参数值 key/value
  params.append('parentid', query.parentid) // 你要传给后台的参数值 key/value
  params.append('content', query.content) // 你要传给后台的参数值 key/value
  params.append('employeeguide', query.employeeguide) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/selfchecking/addselfchecking',
    method: 'post',
    data: params
  })
}

// 删除自检部位
export function deleteselfchecking(query) {
  var params = new URLSearchParams()
  params.append('id', query.id) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/selfchecking/deleteselfchecking',
    method: 'post',
    data: params
  })
}

// 删除未分配的维修单
export function deleteservice(query) {
  var params = new URLSearchParams()
  params.append('serviceid', query.id) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/service/deleteservice',
    method: 'post',
    data: params
  })
}

// 问题部位删除
export function deletefaultcomponent(query) {
  var params = new URLSearchParams()
  params.append('id', query.id) // 你要传给后台的参数值 key/value
  return request({
    url: '/pss/admin/fault/deletefaultcomponent',
    method: 'post',
    data: params
  })
}
