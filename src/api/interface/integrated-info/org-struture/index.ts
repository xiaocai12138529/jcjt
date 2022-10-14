// 组织架构
import service from "@/api";

// 获取组织架构
export const getOrganization = () => service.get({ url: "/api/SystemMan/Organization/getOrganization" });
// 获取部门中的成员
export const getMember = (id: number) =>
  service.post({ url: `/api/SystemMan/Organization/OrganizationPeoplelist`, params: { departmentid: id } });
// 修改部门职责
export const updateDepDuty = (id: number, params: any) =>
  service.post({ url: `/api/SystemMan/Department/EnditDepartment/${id}`, params });
// 修改人员职责
export const editPersonDuty = (id: number, params: any) =>
  service.post({ url: `/api/SystemMan/People/EnditPelepleRSGX/${id}`, params });
