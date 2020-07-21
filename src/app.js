const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [{ id: "uuid", title: 'Desafio Node.js', url: 'http://github.com/...', techs: ["Node.js", "..."], likes: 0 }];

app.get("/repositories", (request, response) => {
  
  if (repositories.length < 1){
    return response.status(400).json({error: 'Respository not found'})
  }
  return response.json(repositories);

 
});

app.post("/repositories", (request, response) => {
  const {title, url, techs}= request.body
  const repository = {id: uuid(), title, url, techs, likes:0};
  repositories.push(repository);
  
    return response.status(200).json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs}= request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if (repositoryIndex < 0){
   return response.status(400).json({error: 'Respository not found'})
  };

  repositories[repositoryIndex]={...repositories[repositoryIndex], title, url, techs}

    return response.json(repositoryIndex)
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if (repositoryIndex < 0){
   return response.status(400).json({error: 'Respository not found'})
  };

  repositories.splice(repositoryIndex,1); 

  return response.status(204).json()

});

app.post("/repositories/:id/like", (request, response) => { 
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if (repositoryIndex < 0){
   return response.status(400).json({error: 'Respository not found'})
  };

  repositories[repositoryIndex] = {...repositories[repositoryIndex], likes: (repositories[repositoryIndex]).likes+1 }

  return response.json(repositoryIndex)
});

module.exports = app;
