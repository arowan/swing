var Network = function (host) {
    this.socket = io.connect(host);
};