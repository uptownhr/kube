module.exports = function ({renderString, bundlePath, stylePath, stateString }) {
  return `
<html>
<head>
  <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
  <link rel="stylesheet" href="${stylePath}">
</head>
<body>
  <div id='root'>${renderString}</div>
  <script>
    window.__INITIAL_STATE = ${stateString}
  </script>
  <script src="${bundlePath}"></script>
</body>
</html>`
}