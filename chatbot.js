// ============================================
// CHATBOT TỰ ĐỘNG PHÒNG KHÁM TRĨ HẢI PHÒNG
// ============================================

class MedicalChatbot {
  constructor() {
    this.messages = [];
    this.conversationId = Date.now();
    this.loadMessages();
    this.setupEventListeners();
    this.initChatbot();
  }

  // Cơ sở dữ liệu câu hỏi và trả lời
  getResponses() {
    return {
      // Thông tin chung
      'địa chỉ|ở đâu|địa điểm': 'Phòng khám chúng tôi nằm tại: **Số 83 Lũng Đông, Hải An, Hải Phòng**. Bạn có thể dễ dàng tìm thấy chúng tôi trên Google Maps hoặc gọi hotline để được hướng dẫn chi tiết.',
      'giờ mở cửa|mở cửa lúc mấy|thời gian làm việc': 'Giờ làm việc của chúng tôi:\n📅 **Thứ 2 - Thứ 6:** 17:00 - 20:00\n📅 **Thứ 7 - Chủ nhật:** 08:00 - 20:00\n\nBạn có thể đặt lịch khám trước qua Zalo hoặc Messenger để tránh chờ đợi.',
      'hotline|điện thoại|liên hệ': 'Hotline của chúng tôi: **0816.556.68**\n\nBạn cũng có thể:\n💬 Chat Zalo: zalo.me/0908966895\n💬 Messenger: m.me/PKTriHaiPhong',
      
      // Về bệnh trĩ
      'bệnh trĩ là gì|trĩ là gì': 'Bệnh trĩ là tình trạng viêm, sưng hoặc chảy máu của các mạch máu ở vùng hậu môn. Bệnh này rất phổ biến nhưng có thể điều trị hiệu quả. Hãy liên hệ với bác sĩ để được tư vấn chi tiết.',
      'triệu chứng trĩ|dấu hiệu trĩ': 'Các triệu chứng thường gặp:\n🔴 Chảy máu khi đi vệ sinh\n🔴 Ngứa, khó chịu vùng hậu môn\n🔴 Đau hoặc cảm giác khó chịu\n🔴 Sưng hoặc cảm giác có khối\n\nNếu bạn gặp các triệu chứng này, hãy đặt lịch khám ngay!',
      'trĩ nội|trĩ ngoại': 'Có 2 loại trĩ chính:\n\n**Trĩ nội:** Nằm bên trong, thường không đau nhưng dễ chảy máu\n**Trĩ ngoại:** Nằm bên ngoài, thường gây đau và ngứa\n\nBác sĩ sẽ xác định loại trĩ của bạn và đề xuất phương pháp điều trị phù hợp.',
      
      // Về phương pháp điều trị
      'phương pháp điều trị|cách chữa trĩ|chữa trĩ': 'Chúng tôi áp dụng các công nghệ hiện đại:\n\n🔹 **Tiêm triệt mạch:** An toàn, ít xâm lấn, hiệu quả ngay\n🔹 **Sóng cao tần RFA:** Không dùng dao kéo, ít chảy máu, phục hồi nhanh\n🔹 **Laser:** Chính xác, giảm thiểu đau đớn, ngăn ngừa tái phát\n\nHãy đặt lịch khám để bác sĩ tư vấn phương pháp tốt nhất cho bạn.',
      'rfa|sóng cao tần': 'Sóng cao tần RFA là công nghệ tiên tiến:\n✅ Không dùng dao kéo\n✅ Ít chảy máu\n✅ Phục hồi cực nhanh\n✅ Bệnh nhân có thể về ngay trong ngày\n✅ Hiệu quả cao, ít tái phát\n\nĐây là phương pháp được nhiều bệnh nhân lựa chọn.',
      'laser|đốt laser': 'Phương pháp Laser:\n✅ Sử dụng tia laser chính xác\n✅ Loại bỏ búi trĩ hiệu quả\n✅ Giảm thiểu đau đớn\n✅ Ngăn ngừa tái phát\n✅ Thời gian hồi phục nhanh\n\nBác sĩ sẽ đánh giá tình trạng của bạn để quyết định có nên dùng phương pháp này không.',
      'tiêm triệt mạch': 'Phương pháp tiêm triệt mạch:\n✅ Xơ hóa mạch máu nuôi búi trĩ\n✅ An toàn, ít xâm lấn\n✅ Hiệu quả ngay sau khi thực hiện\n✅ Không cần nằm viện\n✅ Bệnh nhân có thể hoạt động bình thường\n\nĐây là lựa chọn tốt cho những trường hợp nhẹ đến trung bình.',
      
      // Chi phí
      'giá|chi phí|bao nhiêu tiền': 'Chi phí điều trị tùy thuộc vào:\n💰 Mức độ bệnh\n💰 Phương pháp điều trị\n💰 Số lần khám\n\nChúng tôi cam kết chi phí **minh bạch, hợp lý** và sẽ tư vấn kỹ lưỡng trước khi thực hiện. Hãy liên hệ để được báo giá chi tiết!',
      
      // Về bác sĩ
      'bác sĩ|bs nguyễn hải bình': 'Bác sĩ CKI **Nguyễn Hải Bình** (Phó Trưởng Khoa Ngoại TH):\n🏥 Nhiều năm kinh nghiệm\n🏥 Chuyên gia hàng đầu trong điều trị bệnh lý hậu môn trực tràng\n🏥 Tay nghề cao, tận tâm với bệnh nhân\n\nBác sĩ sẽ tư vấn và điều trị tận tình cho bạn.',
      
      // Đặt lịch
      'đặt lịch|booking|hẹn khám': 'Bạn có thể đặt lịch khám qua:\n\n📱 **Zalo:** zalo.me/0908966895\n📱 **Messenger:** m.me/PKTriHaiPhong\n📱 **Hotline:** 0816.556.68\n\nHoặc điền form đặt lịch trên website và chúng tôi sẽ liên hệ lại trong vòng 24 giờ.',
      
      // Chăm sóc sau điều trị
      'sau điều trị|chăm sóc|hồi phục': 'Sau điều trị, bạn cần:\n✅ Tuân theo hướng dẫn của bác sĩ\n✅ Ăn uống lành mạnh, nhiều chất xơ\n✅ Uống đủ nước\n✅ Tránh ngồi lâu\n✅ Vệ sinh vùng hậu môn sạch sẽ\n✅ Tái khám theo lịch hẹn\n\nBác sĩ sẽ hướng dẫn chi tiết khi bạn khám.',
      
      // Mặc định
      'cảm ơn|thanks|ok|được': 'Rất vui được giúp bạn! 😊 Nếu có thắc mắc gì khác, hãy hỏi tôi nhé.',
      'xin chào|hello|hi': 'Xin chào! 👋 Tôi là trợ lý ảo của Phòng Khám Ngoại Khoa 15. Tôi sẵn sàng trả lời các câu hỏi về bệnh trĩ, dịch vụ, và cách đặt lịch khám. Bạn cần tư vấn gì?',
    };
  }

  // Tìm câu trả lời phù hợp
  findAnswer(userMessage) {
    const message = userMessage.toLowerCase().trim();
    const responses = this.getResponses();

    for (const [keywords, answer] of Object.entries(responses)) {
      const keywordList = keywords.split('|');
      if (keywordList.some(keyword => message.includes(keyword))) {
        return answer;
      }
    }

    // Nếu không tìm thấy, trả lời mặc định
    return 'Cảm ơn bạn đã hỏi! 😊 Tôi chưa có thông tin chi tiết về câu hỏi này. Bạn vui lòng liên hệ trực tiếp với chúng tôi:\n\n📱 **Hotline:** 0816.556.68\n💬 **Zalo:** zalo.me/0908966895\n💬 **Messenger:** m.me/PKTriHaiPhong\n\nBác sĩ sẽ tư vấn chi tiết cho bạn!';
  }

  // Khởi tạo chatbot UI
  initChatbot() {
    const chatbotHTML = `
      <div id="chatbot-widget" class="chatbot-widget">
        <div class="chatbot-header">
          <h3>💬 Bác sĩ Tư Vấn AI</h3>
          <button id="chatbot-close" class="chatbot-close">✕</button>
        </div>
        <div id="chatbot-messages" class="chatbot-messages"></div>
        <div class="chatbot-input-area">
          <input 
            type="text" 
            id="chatbot-input" 
            placeholder="Nhập câu hỏi của bạn..." 
            autocomplete="off"
          >
          <button id="chatbot-send" class="chatbot-send">Gửi</button>
        </div>
      </div>
      <button id="chatbot-toggle" class="chatbot-toggle">
        Hỏi Bác Sĩ AI
      </button>
    `;

    // Tạo container
    const container = document.querySelector('.coze-chatbot-container');
    if (container) {
      container.innerHTML = chatbotHTML;
      this.setupEventListeners();
      this.displayWelcomeMessage();
    }
  }

  // Thiết lập sự kiện
  setupEventListeners() {
    const toggleBtn = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('chatbot-close');
    const sendBtn = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleChatbot());
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeChatbot());
    }
    if (sendBtn) {
      sendBtn.addEventListener('click', () => this.sendMessage());
    }
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.sendMessage();
      });
    }
  }

  // Hiển thị tin nhắn chào mừng
  displayWelcomeMessage() {
    const messagesDiv = document.getElementById('chatbot-messages');
    if (messagesDiv) {
      messagesDiv.innerHTML = `
        <div class="chatbot-message bot-message">
          <p>Xin chào! 👋 Tôi là trợ lý ảo của <strong>Phòng Khám Ngoại Khoa 15</strong>.</p>
          <p>Tôi sẵn sàng trả lời các câu hỏi về:</p>
          <ul>
            <li>💊 Bệnh trĩ và triệu chứng</li>
            <li>🏥 Phương pháp điều trị hiện đại</li>
            <li>📍 Địa chỉ, giờ mở cửa</li>
            <li>📅 Cách đặt lịch khám</li>
          </ul>
          <p>Bạn có câu hỏi gì không? 😊</p>
        </div>
      `;
    }
  }

  // Gửi tin nhắn
  sendMessage() {
    const input = document.getElementById('chatbot-input');
    const userMessage = input.value.trim();

    if (!userMessage) return;

    // Hiển thị tin nhắn của người dùng
    this.displayMessage(userMessage, 'user');
    input.value = '';

    // Lưu tin nhắn
    this.messages.push({
      type: 'user',
      text: userMessage,
      timestamp: new Date().toLocaleString('vi-VN')
    });

    // Tìm câu trả lời
    const botResponse = this.findAnswer(userMessage);
    
    // Hiển thị câu trả lời sau 500ms (để tạo cảm giác tự nhiên)
    setTimeout(() => {
      this.displayMessage(botResponse, 'bot');
      this.messages.push({
        type: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleString('vi-VN')
      });

      // Lưu vào localStorage
      this.saveMessages();

      // Gửi email thông báo
      this.notifyAdmin(userMessage);
    }, 500);
  }

  // Hiển thị tin nhắn
  displayMessage(text, sender) {
    const messagesDiv = document.getElementById('chatbot-messages');
    if (!messagesDiv) return;

    const messageEl = document.createElement('div');
    messageEl.className = `chatbot-message ${sender}-message`;
    
    // Chuyển markdown đơn giản thành HTML
    let htmlText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    
    messageEl.innerHTML = `<p>${htmlText}</p>`;
    messagesDiv.appendChild(messageEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  // Bật/tắt chatbot
  toggleChatbot() {
    const widget = document.getElementById('chatbot-widget');
    const toggle = document.getElementById('chatbot-toggle');
    
    if (widget) {
      widget.classList.toggle('active');
      toggle.classList.toggle('active');
    }
  }

  // Đóng chatbot
  closeChatbot() {
    const widget = document.getElementById('chatbot-widget');
    const toggle = document.getElementById('chatbot-toggle');
    
    if (widget) {
      widget.classList.remove('active');
      toggle.classList.remove('active');
    }
  }

  // Lưu tin nhắn vào localStorage
  saveMessages() {
    localStorage.setItem(`chatbot_${this.conversationId}`, JSON.stringify(this.messages));
    localStorage.setItem('chatbot_conversations', JSON.stringify([
      ...JSON.parse(localStorage.getItem('chatbot_conversations') || '[]'),
      {
        id: this.conversationId,
        timestamp: new Date().toLocaleString('vi-VN'),
        messageCount: this.messages.length
      }
    ]));
  }

  // Tải tin nhắn từ localStorage
  loadMessages() {
    const saved = localStorage.getItem(`chatbot_${this.conversationId}`);
    if (saved) {
      this.messages = JSON.parse(saved);
    }
  }

  // Gửi email thông báo cho admin
  notifyAdmin(userMessage) {
    // Sử dụng FormSubmit.co hoặc dịch vụ email miễn phí khác
    const formData = new FormData();
    formData.append('email', 'NGUYENVANPHONG1583@GMAIL.COM');
    formData.append('subject', '🔔 Tin nhắn mới từ Chatbot - Phòng Khám Trĩ');
    formData.append('message', `
Khách hàng vừa gửi tin nhắn:

📝 Nội dung: ${userMessage}

⏰ Thời gian: ${new Date().toLocaleString('vi-VN')}

---
Đây là thông báo tự động từ chatbot phòng khám.
    `);

    // Gửi qua FormSubmit.co (dịch vụ miễn phí)
    fetch('https://formspree.io/f/xyzqwert', {
      method: 'POST',
      body: formData
    }).catch(err => console.log('Email service:', err));

    // Hoặc dùng webhook nếu có
    this.sendToWebhook(userMessage);
  }

  // Gửi qua webhook (nếu có)
  sendToWebhook(userMessage) {
    // Bạn có thể thay đổi URL này thành webhook của bạn
    const webhookUrl = 'https://webhook.site/your-webhook-id'; // Thay đổi URL này
    
    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        timestamp: new Date().toLocaleString('vi-VN'),
        conversationId: this.conversationId
      })
    }).catch(err => console.log('Webhook:', err));
  }
}

// Khởi tạo chatbot khi trang tải xong
document.addEventListener('DOMContentLoaded', () => {
  new MedicalChatbot();
});
