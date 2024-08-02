import OpenAI from "openai";

const client = new OpenAI();

async function main() {
  const chatCompletion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    tools: [
      {
        type: "function",
        function: {
          name: "interpreter",
          description:
            "Execute python code in a Jupyter notebook cell and return any result, stdout, stderr, display_data, and error.",
          parameters: {
            type: "object",
            properties: {
              code: {
                type: "string",
                description: "The python code to execute in a single cell.",
              },
              version: {
                type: "string",
                description: "The version of the python to use.",
              }
            },
            required: ["code"],
          },
        },
      },
    ],
    messages: [
      { role: "system", content: "Use function calls to help the user." },
      {
        role: "user",
        content:
          "Use data from following CSV content. Country,Average Height (cm)\nNetherlands,156\nDenmark,158\nNorway,160.\n\nQuery: Which country has the highest average height?",
      },
    ],
  });

  console.log(JSON.stringify(chatCompletion.choices[0].message.tool_calls));
}

main();
