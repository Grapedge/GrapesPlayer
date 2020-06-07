function throttle(fn, gapTime = 100) {
  let now = Date.now();
  return function () {
    if (Date.now() - now >= gapTime) {
      fn.apply(this, arguments);
      now = Date.now();
    }
  };
}

function RateMenu(player, rateBtn) {
  // 私有变量
  const rates = [0.5, 0.75, 1, 1.5, 2];
  const menu = document.createElement('ul');

  // 私有方法
  // 创建速率菜单
  function createRateMenu() {
    menu.className = 'rate-menu rate-menu-hide';
    for (const r of rates) {
      const li = document.createElement('li');
      li.innerText = r.toFixed(2) + '倍速';
      li.addEventListener('click', () => setRate(r));
      menu.appendChild(li);
    }
    rateBtn.parentElement.appendChild(menu);
    rateBtn.addEventListener('click', () => {
      menu.classList.toggle('rate-menu-hide');
    });
  }

  function setRate(rate) {
    // 设置视频播放倍速
    player.setRate(rate);
    // 隐藏菜单
    menu.classList.add('rate-menu-hide');
  }

  createRateMenu();
}

function ProgressBar(progressBar, onChange) {
  // 进度条
  this.setProgressValue = function (value) {
    progressBar.firstElementChild.style = `width: ${value}%`;
  };
  let isDrag = false; // 是否正在拖拽进度条
  this.isDrag = false;
  Object.defineProperty(this, 'isDrag', {
    get: function () {
      return isDrag;
    },
  });
  function onStartChangeProgress() {
    isDrag = true;
  }
  function onDragProgress(event) {
    if (isDrag) {
      const progress = (
        (100 * event.clientX) /
        progressBar.offsetWidth
      ).toFixed(2);
      this.setProgressValue(progress);
    }
  }
  this.onChange = onChange;
  function onChangeProgress(event) {
    if (isDrag) {
      isDrag = false;
      const progress = event.clientX / progressBar.offsetWidth;
      this.onChange && this.onChange(progress);
      this.setProgressValue((progress * 100).toFixed(2));
    }
  }
  progressBar.addEventListener(
    'mousedown',
    onStartChangeProgress.bind(this)
  );
  document.addEventListener(
    'mousemove',
    throttle(onDragProgress.bind(this), 50)
  );
  document.addEventListener('mouseup', onChangeProgress.bind(this));
}
/**
 * @param {Player} player
 * @param {HTMLButtonElement} playBtn
 * @param {HTMLButtonElement} fastForwardBtn
 * @param {HTMLButtonElement} rewindBtn
 * @param {HTMLButtonElement} rateBtn
 * @param {HTMLDivElement} time
 * @param {HTMLDivElement} progressBar
 */
function ControlBar(
  player,
  playBtn,
  fastForwardBtn,
  rewindBtn,
  rateBtn,
  time,
  progressBar
) {
  // 构造函数
  // 创建倍速菜单
  const rateMenu = new RateMenu(player, rateBtn);
  /**
   * 设置控制按钮状态
   * @param {String} status [play/pause]
   */
  function setPlayButtonStatus(status) {
    playBtn.innerHTML = status === 'play' ? '&#xe7bd;' : '&#xe624;';
  }

  // 播放状态改变
  player.onStatusChange = function (status) {
    setPlayButtonStatus(status);
  };

  // 设置点击按钮的状态
  playBtn.addEventListener('click', player.toggle);

  // 设置播放时间
  let updateTimer;
  this.startUpdate = function () {
    if (!updateTimer) {
      updateTimer = setInterval(() => {
        const curTime = Math.floor(player.getCurTime()) || 0;
        const duration = Math.floor(player.getDuration()) || 0;
        const cmin = Math.floor(curTime / 60);
        const chour = Math.floor(cmin / 60);
        const csec = curTime % 60;
        const dmin = Math.floor(duration / 60);
        const dhour = Math.floor(dmin / 60);
        const dsec = duration % 60;
        time.innerText = `${chour < 10 ? '0' : ''}${chour}:${
          cmin < 10 ? '0' : ''
        }${cmin}:${csec < 10 ? '0' : ''}${csec}/${
          dhour < 10 ? '0' : ''
        }${dhour}:${dmin < 10 ? '0' : ''}${dmin}:${
          dsec < 10 ? '0' : ''
        }${dsec}`;
        // 设置进度条
        if (!progress.isDrag)
          progress.setProgressValue(
            ((curTime / duration) * 100).toFixed(2)
          );
      }, 1000);
    }
  };

  this.stopUpdate = function () {
    clearInterval(this.updateTimer);
  };
  // 快进快退
  function fastForward() {
    player.setCurTime(player.getCurTime() + 5);
  }

  function rewind() {
    player.setCurTime(player.getCurTime() - 5);
  }

  fastForwardBtn.addEventListener('click', fastForward);
  rewindBtn.addEventListener('click', rewind);

  // 进度条
  const progress = new ProgressBar(progressBar);
  progress.onChange = function (p) {
    player.setCurTime(player.getDuration() * p);
  };
}
export { ControlBar };


