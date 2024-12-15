import express from 'express'
import { signUpValidationSchema } from '../../../utils/validations';
import bcrypt from 'bcrypt'
import { ZodError } from 'zod';
import { User } from '../../../models/user';

const authRouter = express.Router()

authRouter.post("/signup", async (req, res) => {
  try {
    signUpValidationSchema.parse(req.body);
    const { firstName, lastName, emaiId, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      emaiId: emaiId,
      password: hash,
    });
    await user.save();
    res.send("Signed up success fully");
  } catch (err) {
    if (err instanceof ZodError) {
      const error = err.flatten();
      res.status(404).send(JSON.stringify(error));
    } else {
      console.log(err);
      res.status(500).send("some thing went wrong");
    }
  }
});


authRouter.post("/login", async (req, res) => {
  try {
    const { emaiId, password } = req.body;
    const user = await User.findOne({ emaiId: emaiId });
    console.log("user is ", user);
    if (!user) {
      throw new Error("Email or password not found");
    }

    const isPasswordMatched = await user.validatePassword(password)
    if (!isPasswordMatched) throw new Error("Email or password not found");

    const token = await user.getJWT();
    console.log("tokemn generated ", token);
    res.cookie("token", token, { httpOnly: true });
    res.send("Loggged in successfully");
  } catch (err) {
    console.log(err);
    if (err && err) {
      res.status(400).send(err.toString());
    } else {
      res.status(500).send("Something went wrong");
    }
  }
});

authRouter.post("/logout",(req,res)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now())
  })
  res.send("Logged out successfully")
})



export default authRouter;