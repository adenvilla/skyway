/* Small UI strings shared across languages (form status + toasts) */
(() => {
  const D = window.SKYWAY_I18N || (window.SKYWAY_I18N = {});
  const add = (lang, obj) => Object.assign(D[lang] || (D[lang] = {}), obj);
  add("en", {
    "toast.lanecalc": "Origin applied to the calculator.",
    "form.err": "Please fill in your name, phone and message.",
    "form.ok": "Opening WhatsApp with your enquiry — send it and we'll reply today."
  });
  add("zh", {
    "toast.lanecalc": "已将起运地应用到计算器。",
    "form.err": "请填写姓名、电话和留言。",
    "form.ok": "正在打开 WhatsApp 并填入您的询价——发送后我们当天回复。"
  });
  add("tr", {
    "toast.lanecalc": "Çıkış noktası hesaplayıcıya uygulandı.",
    "form.err": "Lütfen adınızı, telefonunuzu ve mesajınızı yazın.",
    "form.ok": "Talebiniz WhatsApp'ta açılıyor — gönderin, bugün yanıtlayalım."
  });
  add("ar", {
    "toast.lanecalc": "تم تطبيق مصدر الشحن على الحاسبة.",
    "form.err": "يرجى إدخال الاسم والهاتف والرسالة.",
    "form.ok": "جارٍ فتح واتساب مع استفسارك — أرسله وسنرد اليوم."
  });
  add("so", {
    "toast.lanecalc": "Halka laga soo rarayo waa lagu daray xisaabiyaha.",
    "form.err": "Fadlan buuxi magaca, telefoonka iyo fariinta.",
    "form.ok": "WhatsApp waa furmayaa codsigaaga — dir, maanta waan ku jawaabnaa."
  });
})();
