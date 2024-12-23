require('dotenv').config();
const { Kafka } = require("kafkajs");

const kafka = new Kafka({/*
  //clientId: "my-kafka-producer",
  //brokers: [process.env.KAFKA_BROKERS],
  brokers: ['172.19.0.4:9092'],
    //["localhost:9092"],
    retry: {
      retries: 10, // Daha fazla deneme sayısı*/
      clientId: 'my-app',
  brokers: ['172.19.0.4:9092'],
  connectionTimeout: 30000, // Timeout süresi 30 saniye
  retry: {
    retries: 10, // Yeniden deneme sayısı
    factor: 2, // Yeniden denemede bekleme süresi faktörü
    minTimeout: 3000, // Minimum timeout
    maxTimeout: 30000 // Maksimum timeout
    },
});

const producer = kafka.producer();


/*async function startServer() {
  try {
    await producer.connect();
    console.log('Kafka connection successful');
  } catch (error) {
    console.error('Kafka connection failed:', error);
    // Kafka bağlantısı hatalı olsa bile, backend çalışmaya devam etsin
  }
}*/

async function sendMessage(topic, message) {
  await producer.connect();
  await producer.send({
    topic: topic,
    messages: [{ value: message }],
  });
}

//startServer();

module.exports = {
  sendMessage,
};
