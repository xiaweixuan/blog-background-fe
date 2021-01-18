export const sleep = async (ms) =>
  new Promise((res) => {
    setTimeout(() => {
      res('');
    }, ms);
  });
  
export function getList({ byId, allIds }) {
  return allIds.map((id) => byId[id]).filter((item) => item);
}

export function getOptions({ byId, allIds }) {
  return allIds
    .map((id) => {
      const item = byId[id];
      return item && { value: id, label: item.name };
    })
    .filter((item) => item);
}