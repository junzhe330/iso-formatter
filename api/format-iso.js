export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { date, time } = req.body;

  if (!date || !time) {
    return res.status(400).json({ error: 'Missing date or time in request body' });
  }

  const iso = `${date}T${time}:00+08:00`;

  return res.status(200).json({ iso_string: iso });
}
