import { Router } from "express";
import userRoute from "./users.mjs";
import productsRoute from "./products.mjs";

const router = Router();

router.use(userRoute);
router.use(productsRoute);

router.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  res.cookie("hello", "world", {
    maxAge: 60000 * 60,
    signed: true,
  }); /* 60,000 == 1 minute */
  res.status(201).send({ msg: "Hello" });
});

export default router;
