const {app, mongoose} = require('./reax/bootstrap'),
  controllers = require('./controllers')

mongoose.connect("mongodb://localhost:27017/preax")
app.listen(3000)

app.get('/', controllers.Home)

