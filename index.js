import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("ok");
});

app.post("/webhook", (req, res) => {
    console.log("INCOMING WEBHOOK:");
    console.log(JSON.stringify(req.body, null, 2));

    res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// WhatsApp webhook verification
app.get("/webhook", (req, res) => {
    const verifyToken = process.env.VERIFY_TOKEN;

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === verifyToken) {
        console.log("Webhook verified");
        return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
});
