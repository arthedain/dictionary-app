export default () => ({
  urls: [
    `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
  ],
  queue: process.env.RABBITMQ_AUTH_QUEUE_NAME,
});
