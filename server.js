const express = require("express");
const nunjucks = require("nunjucks");

const server = express();
const videos = require("./data");

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
});

server.get("/", (request, response) => {
  return response.render("portfolio", { itens: videos });
});
server.get("/about", (request, response) => {
  const about = {
    avatar_url:
      "https://avatars2.githubusercontent.com/u/31030647?s=460&u=3b11bf3d8cae5af0fb50a4f8d78d76fb5374fdbf&v=4",
    name: "Leonardo Lavigne",
    role: "Estudante de Análise e Desenvolvimento de Sistemas",
    description: "",
    social_links: [
      { name: "Github", url: "https://github.com/devleolavigne" },
      { name: "Twitter", url: "https://twitter.com/LeoLavigneRJ" },
      { name: "Linkedin", url: "https://www.linkedin.com/in/leonardolavigne/" }
    ]
  };
  return response.render("about", { about });
});
server.get("/video", (request, response) => {
  const id = request.query.id;
  const video = videos.find(video => {
    return video.id == id;
  });
  if (!video) {
    response.send("Vídeo não encontrado!");
  }
  return response.render("video", { item: video });
});
server.use((request, response) => {
  response.status(404).render("not-found");
});

server.listen(3333);
