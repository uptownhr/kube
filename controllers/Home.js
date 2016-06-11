const express = require('express'),
  router = express.Router()

router.get('/', (req,res) => {
  let state = {
    name: 'Testing SSR state'
  }
  console.log('rendering at home')
  res.kube.render(state)
})

module.exports = router