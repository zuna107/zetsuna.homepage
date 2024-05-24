// pages/api/send-message.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { env } from '../../../src/env';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, message }: { name: string, message: string } = req.body;


    try {
      const content = `**Name:** ${name}\n**Message:** ${message}\n<@948093919835590666>`;
      await axios.post(env.DISCORD_WEBHOOK_URL, { content });

      res.status(200).send({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, error: 'Failed to send message' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
