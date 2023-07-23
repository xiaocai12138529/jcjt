// 判断是否是空对象
export function isEmptyObj(obj) {
  for (const key in obj) {
    return false;
  }
  return true;
}

// 一个或多个数字
export const inNumberStr = (val) => {
  return /^\d+$/.test(val);
};

// 是否是里程格式
export const isMileageFormat = (str) => {
  const reg = /^K(\d+)\+(\d{1,3})(.\d+)?$/g;
  return reg.test(str);
};
export const norepeat = (arr, str) => {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i][str] === arr[j][str]) {
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr
};
export function findParentIds(dataSource, nodeId) {
  const parentIds = []; // 用于存储所有父节点ID的数组

  // 定义一个递归函数，用于遍历整棵树并查找子节点的所有父节点
  function traverse(node, nodeId) {
    if (node.id === nodeId) { // 如果当前节点的ID等于子节点的ID，则表示已经找到了子节点，可以开始向上查找父节点
      return true; // 返回true表示已经找到了子节点
    }

    if (node.childrens) { // 如果当前节点有子节点，则继续遍历子节点
      for (const childNode of node.childrens) {
        if (traverse(childNode, nodeId)) { // 如果在子节点中找到了子节点的父节点，则将当前节点的ID添加到父节点ID数组中，并返回true表示已经找到了子节点
          parentIds.push(node.id);
          return true;
        }
      }
    }

    return false; // 如果当前节点不是子节点的父节点，则返回false
  }

  // 从根节点开始遍历整棵树，并调用递归函数查找子节点的所有父节点
  for (const node of dataSource) {
    if (traverse(node, nodeId)) { // 如果在当前节点的子树中找到了子节点的父节点，则直接退出循环
      break;
    }
  }

  return parentIds; // 返回所有父节点ID的数组
}

// 表格时间数据处理
export function dateDelT(item) {
  // 利用js对象特性处理
  for (const key in item) {
    if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}T/.test(item[key])) {
      item[key] = item[key].split("T")[0];
    }
  }
}

// 递归查找路径
export function optionUrl(item, bmlist) {
  let result = []
  let traverse = (curKey, path, data) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i]
      const key = Object.keys(node)[1]
      console.log(node, Object.keys(node));
      const value = node[key]
      let p = JSON.parse(JSON.stringify(path))
      if (value == curKey) {
        path.push(value)
        result = path
      } else {
        p.push(value)
        traverse(curKey, p, node['childrens'])
      }
    }

  }
  traverse(item, [], bmlist)
  return result
}