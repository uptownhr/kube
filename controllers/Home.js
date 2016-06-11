const express = require('express'),
  router = express.Router()

router.get('/', (req,res) => {
  let state = {
    name: 'Testing SSR state'
  }
  res.kube.render(state)
})

module.exports = router