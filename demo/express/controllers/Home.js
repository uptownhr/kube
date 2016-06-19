const express = require('express'),
  router = express.Router()

router.get('/', (req,res) => {
  let state = {
    name: 'Kube'
  }

  res.kube.render(state)
})

module.exports = router