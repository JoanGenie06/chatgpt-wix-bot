// /api/chat.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Missing message' });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.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}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const reply = data.choices?.[0]?.message?.content || '無法取得回應';
    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({ error: error.message || 'Server error' });
  }
}
