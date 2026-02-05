const fastify = require('fastify')({ logger: true });

fastify.get('/api/fastify/hello', async (request, reply) => {
  return { message: 'Hello from Fastify!' };
});

const start = async () => {
  try {
    const port = 8081;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Fastify server listening on ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
