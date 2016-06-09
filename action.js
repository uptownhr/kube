const express = require('express'),
  router = express.Router()

router.get('/', (req,res) => {
  let state = {
    name: 'Testing SSR state'
  }
  res.reax.render(state)
})

module.exports = router