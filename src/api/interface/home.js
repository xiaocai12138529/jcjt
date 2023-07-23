const baseURL = process.env.VUE_APP_TRACK_URL
import service from "@/api/index";
export const Static_TrackInspet = () => service.get({ url: baseURL + "/Api/JcjdMan/XzjlMainPage/Static_TrackInspet" });
export const Static_DeviationMan = () => service.get({ url: baseURL + "/Api/JcjdMan/XzjlMainPage/Static_DeviationMan" });
export const Static_DataGroup = () => service.get({ url: baseURL + "/Api/JcjdMan/XzjlMainPage/Static_DataGroup" });
export const Static_ProjectNews = () => service.get({ url: baseURL + "/Api/JcjdMan/XzjlMainPage/Static_ProjectNews" });