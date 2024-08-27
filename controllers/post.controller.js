import vine, { errors } from "@vinejs/vine";
import { postSchema } from "../validations/postValidation.js";
import prisma from "../config/db.js";
import "dotenv/config";
export default class PostController {
  static post = async (req, res) => {
    try {
      const body = req.body;
      const validator = vine.compile(postSchema);
      const payload = await validator.validate(body);
      const { title, description } = payload;

      const post = await prisma.post.create({
        data: {
          title,
          description,
          image: req.file
            ? `${process.env.BASE_URL}/uploads/${req.file.filename}`
            : null,
          userId: req.user.id,
        },
      });
      res.status(201).json(post);
    } catch (error) {
      console.log("The error is", error);
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: error.messages });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Something went wrong.Please try again.",
        });
      }
    }
  };

  static get = async (req, res) => {
    try {
      const posts = await prisma.post.findMany();
      res.json(posts);
    } catch (error) {
      console.log("The error is", error);
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: error.messages });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Something went wrong.Please try again." || error.message,
        });
      }
    }
  };
  static getByUser = async (req, res) => {
    try {
      const userId = req.user.id;
      console.log("userID +++++++", userId);

      const posts = await prisma.post.findMany({
        where: {
          userId: userId,
        },
      });
      res.json(posts);
    } catch (error) {
      console.log("The error is", error);
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: error.messages });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Something went wrong.Please try again." || error.message,
        });
      }
    }
  };
  static delete = async (req, res) => {
    const { id } = req.params;
    try {

      await prisma.post.delete({ where: { id } });
      res.status(200).send({
        message: "The post has been deleted !",
      });
    } catch (error) {
      console.log("The error is", error);
    
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: error.messages });
      }else if(error.meta){
        
        return res.status(400).json({ errors: error.meta.cause });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Something went wrong.Please try again." || error.message,
        });
      }
    }
  };
  static update = async (req, res) => {
    const { id } = req.params;
    try {
      const body = req.body;
      const validator = vine.compile(postSchema);
      const payload = await validator.validate(body);
      const { title, description } = payload;
      const data = {
        title,
        description,
        updatedAt: new Date(),
      };
      if (req.file) {
        data.image = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
      }
      const post = await prisma.post.update({
        where: { id },
        data,
      });
      res.json(post);
    } catch (error) {
      console.log("The error is", error);
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: error.messages });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Something went wrong.Please try again." || error.message,
        });
      }
    }
  };
}
