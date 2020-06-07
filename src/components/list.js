/**
 *
 * @param {Element} listRoot 用于挂载节
 */
function List(listRoot) {
  const list = [];
  let _key = 0;

  /**
   * 创建列表项
   * @param {ListItem} item
   */
  function createItem(listItem) {
    const { title, desc, onClick } = listItem;
    const content = `<div>${title}</div><div class="desc">${desc}</div>`;
    const li = document.createElement('div');
    li.className = 'list-item';
    li.innerHTML = content;
    li.onclick = onClick;
    const key = _key++;
    const item = { key, li };
    list.push(item);
    return item;
  }

  this.getItem = function (key) {
    for (let x of list) {
      if (x.key === key) return x;
    }
    return null;
  };

  this.appendItem = function (listItem) {
    const { li, key } = createItem(listItem);
    listRoot.appendChild(li);
    return key;
  };

  this.removeItem = function (key) {
    listRoot.removeChild(getItem(key));
  };

  this.insertItemBefore = function (key, listItem) {
    const ref = this.getItem(key);
    const item = createItem(listItem);
    listRoot.insertBefore(item.li, ref.li);
    return item.key;
  };

  this.insertItemAfter = function (key, listItem) {
    const ref = this.getItem(key);
    const item = createItem(listItem);
    listRoot.insertBefore(
      item.li,
      ref === null ? null : ref.li.nextSibling
    );
    return item.key;
  };
}

function ListItem(title, desc, onClick) {
  this.title = title;
  this.desc = desc;
  this.onClick = onClick || (() => {});
}

export { List, ListItem };
