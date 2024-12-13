const { createClient } = require("redis");
const logger = require("../utils/logger"); // Logger modülünü import ettik

async function redisCon() {
  try {
  const client = createClient({
    host: 'redis', // Docker'da Redis servisi
    port: 6379
    //url: "redis://redis:6379"
    /*process.env.REDIS_URL,*/
  });

  client.on("connect", () => {
    logger.info("Connected to Redis");
  });

  //Redis'e bağlan
  await client.connect();

  console.log("Redise bağlandık");
  return client;

} catch(error){
  //client.on("error", (error) => {
    logger.error("Redis connection error", { error: error.message });
    process.exit(1); // Redis bağlantısı başarısızsa uygulama durdurulacak
};
  
}

module.exports = { redisCon };
