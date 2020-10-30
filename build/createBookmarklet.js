const fs = require('fs');
const path = require('path');

/**
 * Create an html page with a portable bookmarklet to activate f-twelve from anywhere
 */

const css = fs.readFileSync(path.join(__dirname, '..', 'dist', 'f-twelve.css'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, '..', 'dist', 'f-twelve.js'), 'utf8');

const bookmarkletJavaScript = `
var style=document.createElement('style');
style.setAttribute('type', 'text/css');
if ('textContent' in style) {
  style.textContent='${css}';
} else {
  style.styleSheet.cssText='${css}';
}
document.getElementsByTagName('head')[0].appendChild(style);
${js.split('\n')[0]}
fTwelve.show();`
  .replace(/\n/g, '')
  .replace(/"/g, '&quot;');

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <title>F-Twelve Bookmarklet</title>
    <link rel="shortcut icon" href="../icon/F-Twelve 48.png"/>
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,maximum-scale=2">
    <link rel="stylesheet" type="text/css" media="screen" href="https://engineering.cerner.com/f-twelve/assets/css/style.css">
</head>
<body>
    <center>
        <p>Add the following bookmarklet to your favorites to use F12 on any website</p>
        <a href="javascript:${bookmarkletJavaScript}">
            F-Twelve
        </a>
    </center>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '..', 'dist', 'bookmarklet.html'), html);
