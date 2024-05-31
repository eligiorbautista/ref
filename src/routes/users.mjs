import { Router } from "express";
import { validationResult, matchedData } from "express-validator";
import { checkSchema } from "express-validator";

import { createValidationSchema } from "../utils/validationSchemas.mjs";
import { resolveIndexByUserId } from "../utils/middleware.mjs";
import { mockUsers } from "../utils/constants.mjs";

const router = Router();
/* REQUEST QUERY PARAMS */
router.get("/api/users", checkSchema(createValidationSchema), (req, res) => {
  const result = validationResult(req);

  /* If the result has errors */
  //   if (!result.isEmpty())
  //     return res.status(400).send({ errors: result.array() });

  const data = matchedData(req);

  const { filter, value } = data;
  if (filter && value)
    return res.send(mockUsers.filter((user) => user[filter].includes(value)));
  res.send(mockUsers);
});

/* POST REQUEST */
router.post("/api/users", checkSchema(createValidationSchema), (req, res) => {
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
router.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;

  const findUser = mockUsers[findUserIndex];
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

router.put(
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

router.patch(
  "/api/users/:id",
  checkSchema(createValidationSchema),
  (req, res) => {
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
  }
);

router.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  mockUsers.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

export default router;
