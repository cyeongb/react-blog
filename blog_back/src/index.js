// 이 파일에서만 no-global-assign  ESlint 옵션을 비활성화 한다.

/* eslint-disable no-global-assign*/
require = require('esm')(module /*  ,options*/);
module.exports = require('./main.js');
