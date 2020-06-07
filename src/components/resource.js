function Resource(src, type) {
  this.src = src;
  Object.defineProperty(this, 'src', {
    writable: false,
    configurable: false,
  });

  this.type = type;
  Object.defineProperty(this, 'type', {
    writable: false,
    configurable: false,
  });
}

export { Resource };
