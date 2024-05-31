import express from "express";
import { validationResult, matchedData } from "express-validator";
import { checkSchema } from "express-validator";
import { createValidationSchema } from "./utils/validationSchemas.mjs";

const app = express();

app.use(express.json());

const loggingMiddleware = (req, res, next) => {
  console.log(`Finished Logging...`);
  next();
};

app.use(loggingMiddleware);

const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  req.findUserIndex = findUserIndex;
  next();
};

app.get(
  "/",
  (req, res, next) => {
    console.log(`Base URL`);
    next();
  },
  (req, res) => {
    res.status(201).send({ msg: "Hello" });
  }
);

const port = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: "anson", displayName: "Anson" },
  { id: 2, username: "nina", displayName: "Nina" },
  { id: 3, username: "mike", displayName: "Mike" },
  { id: 4, username: "julia", displayName: "Julia" },
  { id: 5, username: "ethan", displayName: "Ethan" },
  { id: 6, username: "claire", displayName: "Claire" },
  { id: 7, username: "kevin", displayName: "Kevin" },
  { id: 8, username: "hannah", displayName: "Hannah" },
  { id: 9, username: "diana", displayName: "Diana" },
  { id: 10, username: "paula", displayName: "Paula" },
  { id: 11, username: "steve", displayName: "Steve" },
  { id: 12, username: "fiona", displayName: "Fiona" },
  { id: 13, username: "brad", displayName: "Brad" },
  { id: 14, username: "ursula", displayName: "Ursula" },
  { id: 15, username: "george", displayName: "George" },
  { id: 16, username: "oliver", displayName: "Oliver" },
  { id: 17, username: "ian", displayName: "Ian" },
  { id: 18, username: "rachel", displayName: "Rachel" },
  { id: 19, username: "quentin", displayName: "Quentin" },
  { id: 20, username: "tina", displayName: "Tina" },
  { id: 21, username: "linda", displayName: "Linda" },
];

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

/* REQUEST QUERY PARAMS */
app.get("/api/users", checkSchema(createValidationSchema), (req, res) => {
  const result = validationResult(req);

  /* If the result has errors */
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const data = matchedData(req);

  const { filter, value } = data;
  if (filter && value)
    return res.send(mockUsers.filter((user) => user[filter].includes(value)));
  res.send(mockUsers);
});

/* POST REQUEST */
app.post("/api/users", checkSchema(createValidationSchema), (req, res) => {
  const result = validationResult(req);

  /* If the result has errors */
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  /* Instead of getting the data from body req, use matchedData */
  const data = matchedData(req);

  const newUser = {
    id: mockUsers[mockUsers.length - 1].id + 1,
    ...data,
  };
  mockUsers.push(newUser);
  res.status(201).send(newUser);
});

/* REQUEST ROUTE PARAMS */
app.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;

  const findUser = mockUsers[findUserIndex];
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

app.get("/api/products", (req, res) => {
  res.send([{ id: 123, name: "chicken breast", price: 12.99 }]);
});

app.put(
  "/api/users/:id",
  resolveIndexByUserId,
  checkSchema(createValidationSchema),
  (req, res) => {
    const result = validationResult(req);

    /* If the result has errors */
    if (!result.isEmpty())
      return res.status(400).send({ errors: result.array() });

    const { body, findUserIndex } = req;
    mockUsers[findUserIndex] = {
      id: mockUsers[findUserIndex].id,
      ...body,
    };
    return res.sendStatus(200);
  }
);

app.patch("/api/users/:id", checkSchema(createValidationSchema), (req, res) => {
  const result = validationResult(req);

  /* If the result has errors */
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.sendStatus(200);
});

app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  mockUsers.splice(findUserIndex, 1);
  return res.sendStatus(200);
});
