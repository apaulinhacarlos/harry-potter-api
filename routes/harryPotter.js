const express = require("express");
const personagens = require("../data/personagens");

const router = express;

router.get("/", async (req, res) => {
  res.status(200).json(personagens);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const personagemEncontrado = personagens.filter((item) => item.id === Number(id));
  if (!personagemEncontrado) {
    return res.status(404).json({ message: "Personagem não encontrado" });
  }
  return res.status(200).json(personagemEncontrado);
});

router.post("/", async (req, res) => {
  const data = req.body;
  const novoPersonagem = { ...data, id: personagens.length + 1 };
  personagens.push(novoPersonagem);
  return res.status(201).json(novoPersonagem);
});

router.put(":id", async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const index = personagens.findIndex((item) => item.id === id);
  const idAtual = personagens[index].id;
  const personagem = { ...data, id: idAtual };
  personagens[index] = personagem;
  return res.status(200).json(personagem);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const semPersonagemDeletado = personagens.filter((item) => item.id !== Number(id));
  await saveFile(semPersonagemDeletado);
  return res.status(204).send();
});

module.exports = router;
