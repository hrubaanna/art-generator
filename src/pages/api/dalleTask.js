import { Dalle } from "dalle-node"

export default async function handler(req, res) {
    const dalle = new Dalle(process.env.DALLE_TOKEN);
    const task = await dalle.getTask(req.query.q);
    res.status(200).json({ result: task })
}