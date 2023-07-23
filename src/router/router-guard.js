import storage from "@/utils/storage";

export default function (router) {
  router.beforeEach(async (to) => {
    if (to.path == "/index" && to.redirectedFrom && to.redirectedFrom.path == "/") {
      localStorage.clear()
      return "/login";
    } else {
      if (to.path != "/login") {
        const token = storage.getStorage("_token");
        if (to.path == "/") {
          localStorage.clear()
          return "/login";
        } else {
          if (token) {
            return true;
          } else {
            localStorage.clear()
            return "/login";
          }
        }

      } else {
        localStorage.clear()
        return true;
      }
    }
  });
}