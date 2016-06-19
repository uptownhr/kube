module.exports = function ({renderString, bundlePath, stylePath }) {
  return `
<html>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
<link rel="stylesheet" href="${stylePath}">
<body>
<div id='root'>${renderString}</div>
<script src="${bundlePath}"></script>
</body>
</html>`
}