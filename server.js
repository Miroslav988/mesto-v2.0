const next = require("next");
const app = next({ dev: process.env.NODE_ENV !== "production" });

app.prepare().then(() => {
  const server = app.getRequestHandler();
  server.listen(3000, () => {
    console.log("Сервер запущен на порте 3000");
  });
});
