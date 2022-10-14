import service from "@/api";

export const uploadFile = (file: File | File[], type: string, otherData?: Record<string, any>): Promise<any> => {
  const formData = new FormData();
  if (Array.isArray(file)) {
    file.forEach((item) => {
      formData.append("file", item);
    });
  } else {
    formData.append("file", file);
  }
  // 其他数据
  if (otherData) {
    for (const key in otherData) {
      formData.append(key, otherData[key]);
    }
  }
  return service.post({ url: "/api/IntegratedInfo/InergrateInfoFile/UpFileDynamicInfoPicture?TypeName=" + type, data: formData });
};
