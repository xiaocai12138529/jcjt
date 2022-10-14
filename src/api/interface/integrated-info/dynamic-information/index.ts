// 动态信息
import service from "@/api";

// 首页列表
export const getList = () => service.post({ url: "/api/IntegratedInfo/DynamicInfo/DynamicInfoList" });

// 动态列表
export const getDynamicList = (params: any) =>
  service.post({ url: "/api/IntegratedInfo/DynamicInfo/DynamicInfotypeList", params });
// 删除动态列表中的数据
export const delDyanmicInfoById = (id: number) =>
  service.delete({ url: `/api/IntegratedInfo/DynamicInfo/DeleteDynamicInfo/${id}` });
// 批量删除动态列表中的数据
export const batchDelDynamicInfoByIds = (ids: string) =>
  service.delete({ url: "/api/IntegratedInfo/DynamicInfo/DeleteDynamicInfotypelist", params: { ids } });

// 发表文章
export const postArticle = (data: any) => service.post({ url: "/api/IntegratedInfo/DynamicInfo/AddDynamicInfo", data });
// 获取文章详情
export const getAriticleDetail = (id: number) =>
  service.post({ url: `/api/IntegratedInfo/DynamicInfo/DynamicInfotypeone/${id}` });
// 修改文章
export const editArticle = (data: any) =>
  service.post({ url: "/api/IntegratedInfo/DynamicInfo/EnditDynamicInfo", data });
  
// 文档预览
export const previewFile = (fileid: any) =>
  service.get({ url: "/api/IntegratedInfo/DynamicInfo/previewFile", params : {fileid} }); 