module.exports = function ({renderString, bundlePath, stylePath, stateString }) {
  return `
<html>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
<link rel="stylesheet" href="${stylePath}">
<body>
<div id='root'>${renderString}</div>
<script>
window.__INITIAL_STATE = ${stateString}
</script>
<script src="${bundlePath}"></script>
</body>
</html>`
}