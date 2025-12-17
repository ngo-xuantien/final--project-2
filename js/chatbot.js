// ============================
// MOMO CHATBOT (AUTO-INJECT UI)
// ============================

// Commit: Bộ dữ liệu các câu trả lời thường gặp của MoMo Bot
const momoAnswers = [
  {
    q: ["mở cửa", "giờ mở", "giờ bán", "mấy giờ mở"],
    a: "Dạ quán mở cửa từ 8:00 đến 22:00 mỗi ngày luôn đó ạ! 🤗",
  },
  {
    q: ["địa chỉ", "ở đâu", "đường nào"],
    a: "Quán Trà Sữa MoMo ở 65 Nguyễn Biểu, P1, Q5, TP.HCM đóa nè 💗",
  },
  {
    q: ["ship", "giao hàng", "delivery"],
    a: "Dạ MoMo có giao hàng qua GrabFood, Baemin và ShopeeFood luôn nha! 🚀",
  },
  {
    q: ["trà đào", "đào"],
    a: "Trà Đào MoMo giá 55.000đ nè, best-seller lun á 🍑",
  },
  {
    q: ["topping", "thêm topping", "trân châu"],
    a: "Topping hot của MoMo là trân châu đen 12k nha bé ơi! 🖤",
  },
  {
    q: ["combo", "khuyến mãi", "ưu đãi"],
    a: "Hôm nay MoMo có Combo Couple: mua 2 ly tặng 1 topping đóa 😍",
  },
  {
    q: ["ngon nhất", "best", "signature"],
    a: "Ly ngon nhất nhà MoMo là Trà Sữa MoMo Signature luôn á! 🧋✨",
  },
  {
    q: ["bao lâu", "mất bao lâu", "giao trong bao lâu"],
    a: "Thường MoMo giao trong khoảng 20–30 phút nếu bạn ở gần quận 5 nha 🚚",
  },
  {
    q: ["admin", "quản lý", "sửa menu"],
    a: "Nếu bạn là admin, vào trang admin-products.html để thêm/sửa/xóa sản phẩm, và admin-orders.html để xem/trạng thái đơn nhen 👩‍💻",
  },
];

// Commit: Danh sách câu hỏi gợi ý hiển thị dạng nút cho khách bấm nhanh
const faqSuggestions = [
  "Quán mở cửa lúc mấy giờ?",
  "Quán ở đâu vậy?",
  "Có ship không?",
  "Trà đào giá bao nhiêu?",
  "Topping nào ngon nhất?",
  "Hôm nay có khuyến mãi gì?",
  "Món nào best-seller?",
];

// Commit: Biến global để biết user có bật voice hay không
let voiceEnabled = false;

// Commit: Hàm chuẩn hóa text: về chữ thường, bỏ dấu, bỏ ký tự lạ
function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, "");
}

// Commit: Hàm AI đơn giản — tìm câu trả lời theo từ khóa
function momoAI(question) {
  const q = normalize(question);

  for (const item of momoAnswers) {
    for (const keyword of item.q) {
      if (q.includes(normalize(keyword))) {
        return item.a;
      }
    }
  }

  return "Dạ câu này MoMo chưa hiểu lắm á 🥺 bạn hỏi cách khác giúp MoMo nha!";
}

// Commit: Hàm dùng Web Speech API để đọc to câu trả lời bằng giọng nói
function speak(text) {
  if (!voiceEnabled || !("speechSynthesis" in window)) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "vi-VN";
  utter.rate = 1;
  utter.pitch = 1.1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

// Commit: Tạo element tin nhắn bot (kèm avatar)
function createBotMessage(text) {
  const wrapper = document.createElement("div");
  wrapper.className = "bot-msg msg-with-avatar";

  const avatar = document.createElement("div");
  avatar.className = "bot-avatar-small";
  avatar.innerText = "🧋";

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  bubble.innerText = text;

  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  return wrapper;
}

// Commit: Tạo element tin nhắn user (bubble align phải)
function createUserMessage(text) {
  const wrapper = document.createElement("div");
  wrapper.className = "user-msg";

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  bubble.innerText = text;

  wrapper.appendChild(bubble);
  return wrapper;
}

// Commit: Render các nút gợi ý FAQ vào container
function renderFAQButtons(container, onClick) {
  container.innerHTML = "";
  faqSuggestions.forEach((question) => {
    const btn = document.createElement("button");
    btn.className = "faq-btn";
    btn.type = "button";
    btn.innerText = question;
    btn.addEventListener("click", () => onClick(question));
    container.appendChild(btn);
  });
}

// NEW: Nếu trang chỉ có <div id="chat-window">...</div> thì auto-inject full UI
function ensureChatbotMarkup(chatWin) {
  if (!chatWin) return;
  // Nếu đã có header/body/input thì thôi
  if (
    chatWin.querySelector("#chat-header") &&
    chatWin.querySelector("#chat-body") &&
    chatWin.querySelector("#chat-input")
  ) {
    return;
  }

  chatWin.innerHTML = `
    <div id="chat-header">
      <div class="chat-header-left">
        <div class="bot-avatar">🧋</div>
        <div>
          <div class="bot-name">MoMo Bot</div>
          <div class="bot-sub">bé MoMo online nè 🤗</div>
        </div>
      </div>
      <button id="voice-toggle" type="button">🔈</button>
    </div>

    <div id="chat-body">
      <div class="bot-msg msg-with-avatar">
        <div class="bot-avatar-small">🧋</div>
        <div class="msg-bubble">Dạ bé MoMo chàooo ~ Bạn muốn hỏi gì hong nè? 💗</div>
      </div>

      <div id="faq-suggestions"></div>

      <div id="typing-indicator" class="typing" style="display:none">
        MoMo đang gõ trả lời cho bạn ...
        <span class="dot"></span><span class="dot"></span><span class="dot"></span>
      </div>
    </div>

    <div id="chat-input-box">
      <input id="chat-input" placeholder="Nhắn gì đó với bé MoMo nè..." />
      <button id="chat-send" type="button">Gửi</button>
    </div>
  `;
}

// Commit: Khi DOM sẵn sàng, gắn các event cho chatbot
document.addEventListener("DOMContentLoaded", () => {
  const chatBtn = document.getElementById("chatbot-btn");
  const chatWin = document.getElementById("chat-window");

  if (!chatBtn || !chatWin) return;

  ensureChatbotMarkup(chatWin);

  const input = document.getElementById("chat-input");
  const body = document.getElementById("chat-body");
  const sendBtn = document.getElementById("chat-send");
  const typing = document.getElementById("typing-indicator");
  const faqContainer = document.getElementById("faq-suggestions");
  const voiceToggle = document.getElementById("voice-toggle");

  if (!input || !body || !sendBtn || !faqContainer || !voiceToggle) return;

  // Render sẵn các nút FAQ khi tải trang
  renderFAQButtons(faqContainer, handleUserQuestion);

  // Toggle mở/đóng cửa sổ chat
  chatBtn.addEventListener("click", () => {
    const isOpen = chatWin.classList.contains("open");
    chatWin.classList.toggle("open", !isOpen);
    if (!isOpen) input.focus();
  });

  // Thêm message element vào body chat
  function addMessageElement(element) {
    body.appendChild(element);
    body.scrollTop = body.scrollHeight;
  }

  function showTyping() {
    if (typing) typing.style.display = "flex";
  }

  function hideTyping() {
    if (typing) typing.style.display = "none";
  }

  function handleUserQuestion(text) {
    const trimmed = String(text || "").trim();
    if (!trimmed) return;

    addMessageElement(createUserMessage(trimmed));
    showTyping();

    setTimeout(() => {
      const answer = momoAI(trimmed);
      hideTyping();
      addMessageElement(createBotMessage(answer));
      speak(answer);
    }, 400);
  }

  function sendMessage() {
    const txt = input.value;
    input.value = "";
    handleUserQuestion(txt);
  }

  sendBtn.addEventListener("click", sendMessage);

  // Enter để gửi
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  // Bật/tắt voice
  voiceToggle.addEventListener("click", () => {
    voiceEnabled = !voiceEnabled;
    voiceToggle.textContent = voiceEnabled ? "🔊" : "🔈";
  });
});
