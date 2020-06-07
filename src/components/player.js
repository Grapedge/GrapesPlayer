/**
 * @param {*} video
 */
function AbstractPlayer(video) {
  throw new SyntaxError('抽象类AbstractPlayer不可以被实例化');
}

AbstractPlayer.prototype.play = function () {};
AbstractPlayer.prototype.pause = function () {};
AbstractPlayer.prototype.getCurTime = function () {};
AbstractPlayer.prototype.setCurTime = function (time) {};
AbstractPlayer.prototype.getDuration = function () {};
AbstractPlayer.prototype.setRate = function (rate) {};
AbstractPlayer.prototype.getRate = function () {};
AbstractPlayer.prototype.setSource = function (res) {};

/**
 * 播放器类
 * @param {HTMLVideoElement} video
 * @param {Function} onStatusChange
 */
function Player(video) {
  // 公开方法
  // 播放视频/音频
  this.play = function () {
    video.play();
  };
  // 暂停视频/音频
  this.pause = function () {
    video.pause();
  };
  // 切换播放/暂停状态
  this.toggle = function () {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }.bind(this);

  // 获得当前播放时间
  this.getCurTime = function () {
    return video.currentTime;
  };
  // 设置当前播放时间
  this.setCurTime = function (time) {
    video.currentTime = time;
  };
  // 获得视频总时长
  this.getDuration = function () {
    return video.duration;
  };
  // 获得视频的播放速率
  this.getRate = function () {
    return video.playbackRate;
  };
  // 设置视频的播放速率
  this.setRate = function (rate) {
    video.playbackRate = rate;
  };
  // 设置当前播放源
  this.setSource = function (res) {
    // 移除错误提示
    if (video.parentElement.contains(error))
      video.parentElement.removeChild(error);
    // 移除图片预览
    if (video.parentElement.contains(preview))
      video.parentElement.removeChild(preview);
    if (!video.canPlayType(res.type)) {
      // 无法播放此类型的视频
      video.parentElement.appendChild(error);
      return;
    }
    video.src = res.src;
    if (res.type.substr(0, 5) === 'audio') {
      // 音频文件使用随机插画
      preview.src = `images/pic/${Math.floor(Math.random() * 4) + 1}.jpg`;
      video.parentElement.appendChild(preview);
    }
  };

  this.onStatusChange = () => {};
  let onStatusChange;
  Object.defineProperty(this, 'onStatusChange', {
    get: function () {
      return onStatusChange;
    },
    set: function (value) {
      if (typeof value === 'function') {
        onStatusChange = value;
      } else {
        console.log(value, 'is not a function');
      }
    },
  });
  // Player事件
  function onPlay() {
    typeof onStatusChange === 'function' && onStatusChange('play', 0);
  }

  function onPause() {
    typeof onStatusChange === 'function' && onStatusChange('pause', 1);
  }

  this.onEnd = () => {};
  let onEnd;
  Object.defineProperty(this, 'onEnd', {
    get: function () {
      return onEnd;
    },
    set: function (value) {
      if (typeof value === 'function') {
        onEnd = value;
      } else {
        console.log(value, 'is not a function');
      }
    },
  });

  function onPlayEnd() {
    typeof onEnd === 'function' && onEnd();
  }
  // 是否正在播放
  this.isPlaying = false;
  Object.defineProperty(this, 'isPlaying', {
    get: function () {
      return !video.paused;
    },
  });

  // 构造函数区域
  video.addEventListener('play', onPlay);
  video.addEventListener('pause', onPause);
  video.addEventListener('ended', onPlayEnd);
  // 创建错误提示
  const error = document.createElement('div');
  error.className = 'error';
  error.innerText = '暂时无法播放此视频~';
  // 创建随机显示插画
  const preview = document.createElement('img');
  preview.className = 'player-pic';
}

// Player类实现了AbstractPlayer类
Player.prototype = Object.create(AbstractPlayer.prototype);
Player.prototype.constructor = Player;

export { Player };
