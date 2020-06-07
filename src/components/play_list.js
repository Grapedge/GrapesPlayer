import { History } from './history';
import { List, ListItem } from './list';
import { Resource } from './resource';
/**
 * 用于打开视频文件，记录播放列表
 * @param {Player} player
 * @param {HTMLButtonElement} listBtn
 * @param {HTMLDivElement} playList
 */
function PlayList(player, listBtn, playList) {
  listBtn.addEventListener('click', togglePlayList);

  // 播放列表展示状态
  function togglePlayList() {
    playList.classList.toggle('play-list-hide');
  }

  // 创建播放列表
  const list = new List(playList);
  // 历史记录管理
  const playHistory = new History();
  const openFileItemKey = list.appendItem(
    new ListItem('打开', '打开一个视频或音频文件', openFile)
  );
  // 将历史播放插入列表
  function addHistoryToList(res) {
    const title = res.src.substring(res.src.lastIndexOf('\\') + 1);
    const desc = res.src;
    const onClick = () => {
      // 播放视频
      playVideo(res);
      togglePlayList();
    };
    list.insertItemAfter(
      openFileItemKey,
      new ListItem(title, desc, onClick)
    );
  }

  // 初始化将历史置入播放列表
  playHistory
    .getHistory()
    .reverse()
    .forEach((res) => addHistoryToList(res));

  // 打开文件
  function openFile() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = (event) => {
      const file = event.target.files[0];
      const res = new Resource(file.path, file.type);
      // 播放视频
      playVideo(res);
      // 添加到历史记录
      playHistory.addHistory(res);
      // 插入历史到DOM
      addHistoryToList(res);
    };
    input.accept = 'audio/*, video/*';
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
    input = null;
    togglePlayList();
  }

  function playVideo(res) {
    // 播放视频
    player.setSource(res);
    player.play();
  }
}

export { PlayList };
