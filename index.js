import express from "express"
import "dotenv/config"
import authRoutes from "./routes/auth.route.js"
import postRoutes from "./routes/post.route.js"
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const port = process.env.PORT ||3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/api/auth',authRoutes)
app.use('/api/post',postRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});  
