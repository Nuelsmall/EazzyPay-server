class UtilService {
  static generateReference() {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString();
    const uniqueReference = timestamp + random;
    return "TR" + uniqueReference;
  }
}

module.exports = UtilService;
