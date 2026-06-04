import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const buffer = Buffer.concat(chunks);

  const blob = await put(`photo-${Date.now()}.jpg`, buffer, {
    access: 'public'
  });

  return res.status(200).json({
    url: blob.url
  });
}