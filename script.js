const envelope = document.getElementById("envelope");
const envelopeScreen = document.getElementById("envelopeScreen");
const weddingMusic = document.getElementById("weddingMusic");
let opened = false;

function openEnvelope() {
  if (opened) return;
  opened = true;
  
  // 1. تشغيل الصوت فوراً أثناء الحدث المباشر للضغط (يتجاوز حظر المتصفح)
  if (weddingMusic) {
    weddingMusic.play().then(() => {
      console.log("تم تشغيل الصوت بنجاح");
    }).catch(error => {
      console.log("تنبيه: المتصفح منع التشغيل التلقائي:", error);
    });
  }

  // 2. تطبيق حركة فتح الظرف
  envelope.classList.add("open");

  // 3. إخفاء شاشة الظرف بعد انتهاء الانيميشن (بعد 1.2 ثانية)
  setTimeout(() => {
    envelopeScreen.classList.add("hide");
  }, 1250);
}

function toggleMusic() {
  const musicBtn = document.getElementById("musicBtn");
  if (weddingMusic.paused) {
    weddingMusic.play();
    musicBtn.innerText = "🔊 كتم الصوت";
  } else {
    weddingMusic.pause();
    musicBtn.innerText = "🔇 تشغيل الصوت";
  }
}

envelope.addEventListener("click", openEnvelope);
envelope.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openEnvelope();
  }
});

const target = new Date("2026-09-30T20:00:00+03:00");
const countdown = document.getElementById("countdown");

function update() {
  let d = target - new Date();
  if (d <= 0) {
    countdown.innerHTML = '<div class="unit"><b>♥</b><small>أهلاً وسهلاً بكم</small></div>';
    return;
  }
  const days = Math.floor(d / 86400000); d %= 86400000;
  const hours = Math.floor(d / 3600000); d %= 3600000;
  const mins = Math.floor(d / 60000); d %= 60000;
  const secs = Math.floor(d / 1000);
  countdown.innerHTML =
   `<div class="unit"><b>${days}</b><small>يوم</small></div>
    <div class="unit"><b>${String(hours).padStart(2, "0")}</b><small>ساعة</small></div>
    <div class="unit"><b>${String(mins).padStart(2, "0")}</b><small>دقيقة</small></div>
    <div class="unit"><b>${String(secs).padStart(2, "0")}</b><small>ثانية</small></div>`;
}
update();
setInterval(update, 1000);

function shareInvite() {
  const text = "💍 دعوة زفاف مصطفى أحمد أمين و س\nالأربعاء 30 سبتمبر 2026\n📍 قاعة دايموند – دار المهندسين بحلوان";
  if (navigator.share) {
    navigator.share({ title: "دعوة زفاف", text: text });
  } else {
    navigator.clipboard?.writeText(text).then(() => alert("تم نسخ بيانات الدعوة"));
  }
}

function addCalendar() {
  const start = "20260930T170000Z", end = "20260930T210000Z";
  const url = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent("حفل زفاف مصطفى أحمد أمين و س") +
    "&dates=" + start + "/" + end +
    "&details=" + encodeURIComponent("دعوة زفاف") +
    "&location=" + encodeURIComponent("قاعة دايموند – دار المهندسين بحلوان");
  window.open(url, "_blank");
}
