var model = window.parent.model;
var apiKey = window.parent.apikey;
var context = window.parent.context;
var chatTitle = window.parent.chatTitle;
var maxTokens = window.parent.maxTokens;

var historyMessages = [];

async function ChatAICompletion(message, $systemMessageOutput) {
  // Build messages array
  var submitBody = {
    model: model,
    messages: [...historyMessages],
    stream: true
  };

  let userMessage = { role: "user", content: message };
  submitBody.messages[submitBody.messages.length] = userMessage;

  // Send to OpenAI API for analysis
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(submitBody)
  });

  if (!response.ok || !response.body) {
    console.error("Failed to fetch stream");
    return;
  }
  
  // if success then include on history;
  historyMessages[historyMessages.length] = userMessage;
  
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  
  let systemMessage = "";
  
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });

    // OpenAI streams responses as JSON lines (SSE)
    const lines = chunk.split("\n").filter(line => line.trim() !== "");

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const json = line.replace("data: ", "").trim();

        if (json === "[DONE]") {          
          console.log("Streaming complete.");
          
          historyMessages[historyMessages.length] = { role: "assistant", content: systemMessage };
          scrollToSubmit();
          return;
        }

        try {
          const parsed = JSON.parse(json);
          systemMessage += parsed.choices[0]?.delta?.content || "";
          writeChatMessage($systemMessage, systemMessage); // Print token by token
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    }
  }
}

var converter = new showdown.Converter();

function writeChatMessage($systemMessage, messageText)
{
  $systemMessage.html(converter.makeHtml(messageText));
  if (messageText.length % 15 == 0)
    scrollToSubmit();
}

function applyLayoutChanges()
{
  var chatTitleEl = document.getElementsByClassName("chat-title")[0];
  chatTitleEl.innerText = chatTitle;
  
  var body = document.getElementsByTagName("body")[0];
  body.style.backgroundColor = "white";
}

function init()
{
  applyLayoutChanges()
  
  historyMessages = [];
  historyMessages[historyMessages.length] = { role: "system", content: context };
}

document.addEventListener("DOMContentLoaded", function () {
  init();
  
  var chatMessages = null;
  $('.chat-ai .chat-input').focus();

  $(document).on('click', '.chat-ai .chat-button-container .chat-submit', function (e) {
      e.preventDefault();

      let $chatAi = $(".chat-ai");
      let $chatMessages = $chatAi.find('.chat-ai-messages');
      let $chatInput = $chatAi.find('.chat-input');
      let $chatSubmit = $chatAi.find('.chat-submit');

      let userMessage = $chatInput.val();
      if (!userMessage)
          return;

      $chatInput.val("");

      $chatMessages.append("<div class='user-message'><p>" + userMessage + "</p></div>");

      $systemMessage = $("<p>Processing...</p>");
      $chatMessages.append("<i class='bi bi-robot'></i>");
      $chatMessages.append($("<div class='system-message'></div>").append($systemMessage));
      scrollToSubmit();
      
      ChatAICompletion(userMessage, $systemMessage);
  });

  $(document).on('keypress', '.chat-ai .chat-input', function (e) {
    if (e.which == 13)
      $('.chat-ai .chat-button-container .chat-submit').click();
  });
});

function scrollToSubmit() {
    $('.chat-ai').animate({
        scrollTop: $('.chat-ai')[0].scrollHeight
    }, 50);
}