import { PlayList } from './components/play_list';
import { ControlBar } from './components/control_bar';
import { Player } from './components/player';
import './index.scss';

console.log('欢迎使用Grapes播放器');

const video = document.getElementById('video');
const player = new Player(video);
// 播放列表
const listBtnNode = document.querySelector('.list-btn');
const playListNode = document.querySelector('.play-list');
const playList = new PlayList(player, listBtnNode, playListNode);

// 控制栏
const playBtn = document.querySelector('.play-btn');
const rewindBtn = document.querySelector('.rewind-btn');
const fastForwardBtn = document.querySelector('.forward-btn');
const rateBtn = document.querySelector('.rate-btn');
const time = document.querySelector('.time');
const progressBar = document.querySelector('.progress-bar');
const controlBar = new ControlBar(
  player,
  playBtn,
  fastForwardBtn,
  rewindBtn,
  rateBtn,
  time,
  progressBar
);

controlBar.startUpdate();