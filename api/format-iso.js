import { DateTime } from "luxon";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { date, time } = req.body;

  if (!date || !time) {
    return res.status(400).json({ error: "Missing date or time in request body" });
  }

  try {
    const malaysiaTime = DateTime.fromFormat(`${date} ${time}`, "yyyy-MM-dd HH:mm", {
      zone: "Asia/Kuala_Lumpur"
    });

    if (!malaysiaTime.isValid) {
      return res.status(400).json({ error: "Invalid input format" });
    }

    const utcTime = malaysiaTime.toUTC();

    return res.status(200).json({ iso_string: utcTime.toISO() });

  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
