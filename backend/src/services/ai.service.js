const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: ` ...your existing instruction here... `
});

async function generateContent(prompt) {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
}

module.exports = generateContent;
