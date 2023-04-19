import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { write, read } from "./fs/fs.js";
dotenv.config();

const bot = new TelegramBot(process.env.token, { polling: true });
let users = read("user.json");

bot.onText(/start/, (msg) => {
  console.log(msg);

  bot.sendMessage(
    msg.chat.id,
    `Assalomu alaykum ${msg.chat.first_name} botga xush kelibsiz!😎`,
    {
      reply_markup: JSON.stringify({
        keyboard: [
          [
            {
              text: "Operatsion Sistemalar 🖥",
            },
            {
              text: "Arxiv Paroli 🪩",
            },
          ],
          [
            {
              text: "Statistika 📊",
            },
          ],
        ],
        resize_keyboard: true,
      }),
    }
  );
  let { id, first_name, username } = msg.chat;
  let user = users.find((e) => e.id === id);
  if (user) return;
  users.push({
    id,
    first_name,
    username,
  });
  write("user.json", users);
});

bot.on("message", (msg) => {
  const id = msg.chat.id;
  if (msg.text === "Statistika 📊") {
    bot.sendMessage(id, "Statistika ma'lumoti 📊");
    bot.sendMessage(id, `Foydalanuvchilar soni: ${users.length} 👦`);
  }
  if (msg.text === "Arxiv Paroli 🪩") {
    bot.sendPhoto(id, "./tramp.jpg", {
      caption: `
             <strong> Obuna bub quyamiz 😊 </strong>
            `,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Batafsil 🌐",
              url: "https://instagram.com/sardorcode_",
            },
          ],
        ],
      },
    });
  }
  if (msg.text === "Operatsion Sistemalar 🖥") {
    bot.sendMessage(id, `Operatsion Sistemalar ro'yxati 🖥 `, {
      reply_markup: JSON.stringify({
        keyboard: [
          [
            {
              text: "Windows",
            },
          ],
          [
            {
              text: "Linux",
            },
            {
              text: "MacOS",
            },
          ],
        ],
        resize_keyboard: true,
      }),
    });
  }
  if (msg.text === "Windows") {
    bot.sendDocument(id, "./server.js", {
      caption: "Windows  11",
    });
  }
  if (msg.text === "Linux") {
    bot.sendDocument(id, "./fs/fs.js", {
      caption: "Linux 20",
    });
  }
  if (msg.text === "MacOS") {
    bot.sendDocument(id, "./Db/user.json", {
      caption: "MacBook ishlatasmi 😂",
    });
  }
});
console.log(true);
