import service from "@/api";

// 考勤填报 日历数据
export const getCalendarData = (date: string) =>
  service.post({ url: "/api/IntegratedInfo/WorkInfo/WorkInfoMonthCountTJ", params: { Monthstr: date } });
// 考勤填报 表单
export const getReportForm = (params: any) =>
  service.post({ url: "/api/IntegratedInfo/WorkInfo/WorkInfolist", params });
// 保存填报数据
export const saveReportData = (data: any) => service.post({ url: "/api/IntegratedInfo/WorkInfo/EnditDWorkInfo", data });
// 考勤统计列表
export const getStatistics = (date: string) =>
  service.post({ url: "/api/IntegratedInfo/WorkInfo/WorkInfoMonthPeopleTJ", params: { Monthstr: date } });
// 考勤查询数据
export const getQueryList = (params: any) =>
  service.post({ url: "/api/IntegratedInfo/WorkInfo/PeopleWorkListQuery", params });
// 考勤的部门列表
export const getDepList = () => service.get({ url: "/api/SystemMan/Department/getXMBDepartment" });
// 获取考勤状态列表
export const getAttendanceTypeList = () => service.post({ url: "/api/IntegratedInfo/WorkInfo/WorkInftypelist" });
// 添加考勤人员
export const addAttendancePelple = (ids: string) =>
  service.post({ url: `/api/IntegratedInfo/WorkInfo/AddDPelpleToWorkInfo/`, params: { ids } });
// 删除考勤人员
export const delAttendancePelple = (ids: string) =>
  service.delete({ url: `/api/IntegratedInfo/WorkInfo/DeletePelpleToWorkInfo/`, params: { ids } });
// 考勤所有人员查询
export const getQueryListPelpleAll = (params: any) =>
  service.post({ url: "/api/IntegratedInfo/WorkInfo/WorkInfoPeoplelist", params });
// 下载考勤表格
export const downloadExportData = (params: any) =>
  service.post({ url: "/api/IntegratedInfo/WorkInfo/PostExportData", params });

// 新增
export const AddWorkLog = (data: any) => service.post({ url: "/api/IntegratedInfo/WorkLog/Add", data });
// 删除
export const DeleteWorkLog = (id: any) => service.delete({ url: `/api/IntegratedInfo/WorkLog/Delete/${id}` });
// 修改--领导修改

export const Update_Leader = (data: any) => service.post({ url: "/api/IntegratedInfo/WorkLog/Update_Leader", data });
//修改---自己修改
export const UpdateWorkLog = (data: any) => service.post({ url: "/api/IntegratedInfo/WorkLog/Update", data });
//下载---自己修改
export const ExportExcel_MyLog = (params: any) =>
  service.post({ url: "/api/IntegratedInfo/WorkLog/ExportExcel_MyLog", params });
//下载---自己修改
export const ExportExcel_WorkLog = (params: any) =>
  service.post({ url: "/api/IntegratedInfo/WorkLog/ExportExcel_WorkLog", params });

export const GetPaperByPageWorkLog = (params: any) =>
  service.get({ url: "/api/IntegratedInfo/WorkLog/GetPaperByPage", params });
// 查询
export const GetPaperByPage_Leader = (params: any) =>
  service.get({ url: "/api/IntegratedInfo/WorkLog/GetPaperByPage_Leader", params });
// 工作统计---专题项目
export const GetStatic_Project = (params: any) =>
  service.get({ url: "/api/IntegratedInfo/WorkLog/GetStatic_Project", params });
// 工作统计---人员
export const GetStatic_People = (params: any) =>
  service.get({ url: "/api/IntegratedInfo/WorkLog/GetStatic_People", params });
// 工作统计---人员
export const GetDetailInfo = (id: any) => service.get({ url: `/api/IntegratedInfo/WorkLog/GetDetailInfo/${id}` });
// 工作统计---人员----详细信息
export const GetStatic_People_DetailList = (params: any) =>
  service.get({
    url: `/api/IntegratedInfo/WorkLog/GetStatic_People_DetailList`,
    params
  });
// 工作统计---人员----详细信息
export const GetListByLoginUser = () =>
  service.get({
    url: `/api/IntegratedInfo/WorkLogProjecct/GetListByLoginUser`
  });
