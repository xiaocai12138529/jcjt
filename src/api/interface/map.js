import service from "@/api/index";
const baseURL = process.env.VUE_APP_MAP_URL

export const GetAllList_ProjectLineLc = (params) => service.get({ url: baseURL + "/Api/GISMan/ProjectMap/GetAllList_ProjectLineLc", params });
export const GetAllList_ProjectLine = (params) => service.get({ url: baseURL + "/Api/GISMan/ProjectMap/GetAllList_ProjectLine", params });
export const GetAllList_LineLc = (params) => service.get({ url: baseURL + "/Api/GISMan/ProjectMap/GetAllList_LineLc", params });

// qici
export const GetAllLis_DataGroup = (params) => service.get({ url: baseURL + "/Api/GISMan/LineYhMap/GetAllLis_DataGroup", params });
export const GetAllLis_Falling = (params) => service.get({ url: baseURL + "/Api/GISMan/LineYhMap/GetAllLis_Falling", params });
export const GetAllLis_Distance = (params) => service.get({ url: baseURL + "/Api/GISMan/LineYhMap/GetAllLis_Distance", params });
export const GetAllLis_TQIManValue_Static = (params) => service.get({ url: baseURL + "/Api/GISMan/LineYhMap/GetAllLis_TQIManValue_Static", params });