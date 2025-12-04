(function () {
  const currentScript = document.currentScript;
  const POSITION = currentScript?.getAttribute("data-position") || "right";
  const WELCOME = currentScript?.getAttribute("data-welcome") || "Hello! How can I help you today?";

  const style = document.createElement("style");
  style.innerHTML = `
    #chat-widget-button {
      position: fixed;
      bottom: 20px;
      ${POSITION}: 20px;
      width: 60px;
      height: 60px;
      background: #0084ff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 26px;
      cursor: pointer;
      z-index: 999999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    #chat-widget-window {
      position: fixed;
      bottom: 90px;
      ${POSITION}: 20px;
      width: 350px;
      height: 500px;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.15);
      display: none;
      flex-direction: column;
      z-index: 999999;
      overflow: hidden;
      border: 1px solid #e9e9e9;
      font-family: Arial, sans-serif;
    }
    #chat-header {
      background: #0084ff;
      color: white;
      padding: 14px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    #chat-close { background: transparent; border: none; color: white; font-size: 18px; cursor: pointer; }
    #chat-messages { flex: 1; padding: 12px; overflow-y: auto; background:#fafafa; display:flex; flex-direction:column; gap:8px; }
    .msg { padding:10px 12px; border-radius:12px; max-width:80%; }
    .bot { background:#f1f1f1; align-self:flex-start; }
    .user { background:#0084ff; color:white; align-self:flex-end; }
    #chat-input-area { padding:10px; border-top:1px solid #eee; display:flex; gap:10px; background:#fff; }
    #chat-input { flex:1; padding:8px; border:1px solid #ccc; border-radius:8px; }
    #chat-send { background:#0084ff; color:white; padding:8px 12px; border:none; border-radius:8px; cursor:pointer; }
  `;
  document.head.appendChild(style);

  const button = document.createElement("div");
  button.id = "chat-widget-button";
  button.innerHTML = "💬";
  document.body.appendChild(button);

  const win = document.createElement("div");
  win.id = "chat-widget-window";
  win.innerHTML = `
    <div id="chat-header">
      Chat Support
      <button id="chat-close">✕</button>
    </div>
    <div id="chat-messages">
      <div class="msg bot">${WELCOME}</div>
    </div>
    <div id="chat-input-area">
      <input id="chat-input" placeholder="Type a message..." />
      <button id="chat-send">Send</button>
    </div>
  `;
  document.body.appendChild(win);

  button.onclick = () => win.style.display = win.style.display === "flex" ? "none" : "flex";
  win.querySelector("#chat-close").onclick = () => win.style.display = "none";

  const messages = win.querySelector("#chat-messages");
  const input = win.querySelector("#chat-input");
  const sendBtn = win.querySelector("#chat-send");

  function addMsg(text, sender) {
    const div = document.createElement("div");
    div.classList.add("msg", sender);
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  sendBtn.onclick = () => {
    const msg = input.value.trim();
    if (!msg) return;
    addMsg(msg, "user");
    input.value = "";
    setTimeout(() => addMsg("This is a static demo response.", "bot"), 500);
  };
})();
