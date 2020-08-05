export default (stack) => {
  try {
    return stack.split('\n').map((line) => ({
      path: (line.match(/^( *at )(.*)/) || [])[2],
      url: (line.match(/(http:\/\/.*?):\d+:\d+/) || [])[1],
      fileName: (line.match(/.+[\\/(](.*?\.\w+)/) || [])[1],
      lineNumber: (line.split(':').slice(-2, -1) || [])[0],
      columnNumber: (line.split(':').slice(-1)[0].match(/\d+/) || [])[0],
    })).filter(frame => frame.path);
  } catch (e) {
    return [];
  }
};
