import express from "express";
const router = express.Router();
import User from "../models/users.js";

const app = express();
app.use(express.json());

router.get("/todos", async (request, response) => {
  const users = await User.findAll();

  response.status(200).json(users);
});

router.post("/todos", async (request, response) => {
  const { content, description } = request.body;
  console.log(description);
  const newUser = User.build({
    content: content,
    description: description,
  });

  try {
    await newUser.save();

    response.status(201).json(newUser);
  } catch (error) {
    response.json(error);
  }
});

router.get("/todo/:id", async (request, response) => {
  const User = await User.findOne({
    where: {
      id: request.params.id,
    },
  });

  response.status(200).json(User);
});

router.patch("/todo/:id", async (request, response) => {
  const user = await user.findOne({
    where: {
      id: request.params.id,
    },
  });

  const { is_complete } = request.body;

  await user.set({
    is_complete,
  });

  await user.save();

  response.status(200).json(user);
});

router.put("/todo/:id", async (request, response) => {
  const user = await User.findOne({
    where: {
      id: request.params.id,
    },
  });

  const { is_complete, content, description } = request.body;

  await user.set({
    is_complete: is_complete,
    content: content,
    description: description,
  });

  await user.save();

  response.status(200).json(user);
});

router.delete("/todo/:id", async (request, response) => {
  const user = await User.findOne({
    where: {
      id: request.params.id,
    },
  });

  await user.destroy();

  response.status(204).json({});
});

export default router;
