import service from "@/api";
import type { IEditEventParams, ISummaryModify } from "./types";

// 获取大事迹类型列表
export const getEventStageList = () => service.post({ url: "/api/IntegratedInfo/ProjectSummary/ProPhaseList" });
// 大事迹列表
export const getEventList = (stageId: number) => {
  return service.post({
    url: "/api/IntegratedInfo/ProjectSummary/ProjectDeedsList",
    params: { prophaseid: stageId }
  });
};

// 添加一条大事迹
export const addEvent = (data: any) =>
  service.post({ url: "/api/IntegratedInfo/ProjectSummary/AddProjectDeeds", data });
// 修改大事迹
export const updateEvent = (data: any) =>
  service.post({ url: "/api/IntegratedInfo/ProjectSummary/EnditProjectDeeds", data });

// 删除一条大事迹
export const delEventById = (id: number) => {
  return service.delete({ url: `/api/IntegratedInfo/ProjectSummary/DeleteProjectDeeds/${id}` });
};

// 项目概况列表
export const getSummaryList = () => service.post({ url: "/api/IntegratedInfo/ProjectSummary/ProjectSummaryList" });
// 编辑概况信息
export const editSummaryInfo = (data: ISummaryModify) =>
  service.post({ url: "/api/IntegratedInfo/ProjectSummary/EnditProjectSummary", data });
