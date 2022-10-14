import service from "@/api";

//获取首页讲堂信息
export const getclassList = () =>
  service.post({ url: "/api/IntegratedInfo/ClassRoom/ClassRoomInfoList" });

//获取所有信息类型
export const getDynamicList = (params: any) =>
  service.post({ url: "/api/IntegratedInfo/ClassRoom/ClassRoomInfoTypeList", params });

// 发布讲堂规章制度或者标准规范信息
export const postClassInfo = (data: any) => service.post({ url: "/api/IntegratedInfo/ClassRoom/AddClassRoomInfo", data });

//修改讲堂信息
export const editClassInfo = (data: any) =>
  service.post({ url: "/api/IntegratedInfo/ClassRoom/EditClassRoomInfo", data });

//删除讲堂信息
export const delClassInfoById = (id: number) =>
  service.delete({ url: `/api/IntegratedInfo/ClassRoom/DeleteClassRoomInfo/${id}` });

//批量删除讲堂信息
export const batchDelClassInfoByIds = (ids: string) =>
  service.delete({ url: "/api/IntegratedInfo/ClassRoom/DeleteClassRoomInfoTypeList", params: { ids } });
///////////////////////////////////////
//规章制度上传文件的接口
export const UploadFiles = (data: any) =>
  service.post({ url: "/api/IntegratedInfo/ClassRoom/UpFileClassRoomFile", data });

// 根据id 查询
export const getByIdQuery = (id: any) =>
  service.post({ url: `/api/IntegratedInfo/ClassRoom/ClassRoomInfotypeone/${id}`});
  
// 文档预览
export const previewFile = (fileid: any) =>
  service.get({ url: "/api/IntegratedInfo/DynamicInfo/previewFile", params : {fileid} }); 

// 根据类型获取列表
export const getByTyidQuery = (params: any) =>
  service.get({ url: "/api/IntegratedInfo/ClassRoom/GetClassRoomInfoListByType", params }); 
  
// 附件下载
export const downAllFile = (params: any) =>
  service.post({ url: "/api/IntegratedInfo/ClassRoom/DownAllFileClassRootFiles", params }); 