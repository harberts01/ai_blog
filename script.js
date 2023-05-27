// chatGPT API KEY *** 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 ***

//selecting HTML elements
let blogPosts = document.querySelector(".blogPosts");
let blogTitle = document.querySelector(".blogTitle");
let mainPost = document.querySelector('.mainPost');

//array that holds conversation to use in context for blog topic question
function writeAiBlog() {
  let conversation = [
    { role: "system", content: "You are a helpful assistant." },
  ];

  const sendQuestionToChatGPT = async (question) => {
    const endpoint = "https://api.openai.com/v1/chat/completions";
    const apiKey = "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";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    conversation.push({ role: "user", content: question });

    const body = JSON.stringify({
      model: "gpt-3.5-turbo", // Model name
      messages: conversation,
    });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body,
      });

      const data = await response.json();

      // Extract the assistant's reply from the response
      const reply = data.choices[0].message.content;
      console.log("Assistant:", reply);

      conversation.push({ role: "assistant", content: reply });
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
    }
  };

  //conversation flow
  sendQuestionToChatGPT(
    "Choose 1 niche blog topic without expanding on the reasoning"
  );
  
  
  setTimeout(() => {
    let topic = conversation.pop();
    blogTitle.innerHTML = `${topic.content}`
    sendQuestionToChatGPT(`Write a blog post about ${topic.content}`);
  }, 2000);
  console.log(conversation);

  setTimeout(() => {
    let blog = conversation.pop();
    mainPost.innerHTML = `${blog.content}`
  }, 25000);

  
}

writeAiBlog();


