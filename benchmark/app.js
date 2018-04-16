const fastify = require('fastify')()

fastify.get('/hyperapp', require('./controllers/hyperapp'))
fastify.get('/hyperons', require('./controllers/hyperons'))
fastify.get('/inferno', require('./controllers/inferno'))
fastify.get('/nerv', require('./controllers/nerv'))
fastify.get('/preact', require('./controllers/preact'))
fastify.get('/rax', require('./controllers/rax'))
fastify.get('/react', require('./controllers/react'))

fastify.listen(3000, '127.0.0.1', (err) => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
