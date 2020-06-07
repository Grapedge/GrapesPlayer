function History() {
  const history = JSON.parse(localStorage.getItem('history') || '[]');
  this.getHistory = function () {
    return history;
  };

  this.addHistory = function (res) {
    history.unshift(res);
    localStorage.setItem('history', JSON.stringify(history));
  };
}

export { History };
