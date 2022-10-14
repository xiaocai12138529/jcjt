// 将数组数据转化成树形结构
const tranListToTreeData = (list: any[], rootValue: any) => {
  const arr: any[] = [];
  list.forEach((item) => {
    if (item.PARENTID === rootValue) {
      // 找到之后 就要去找 item 下面有没有子节点
      const children = tranListToTreeData(list, item.ID);
      if (children.length) {
        // 如果children的长度大于0 说明找到了子节点
        item.children = children;
      }
      arr.push(item); // 将内容加入到数组中
    }
  });
  return arr;
};
export default tranListToTreeData;
