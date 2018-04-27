const fastify = require('fastify')()

// fastify.get('/anu', require('./controllers/anu')) // Doesn't work
fastify.get('/hyperapp', require('./controllers/hyperapp'))
fastify.get('/hyperons', require('./controllers/hyperons'))
fastify.get('/inferno', require('./controllers/inferno'))
fastify.get('/nerv', require('./controllers/nerv'))
fastify.get('/preact', require('./controllers/preact'))
// fastify.get('/qreact', require('./controllers/qreact')) // Doesn't work
fastify.get('/rax', require('./controllers/rax'))
fastify.get('/react', require('./controllers/react'))
fastify.get('/vdo', require('./controllers/vdo'))

fastify.listen(3000, '127.0.0.1', (err) => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
