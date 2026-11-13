/* Keys added in the polish pass — all five languages */
(() => {
  const D = window.SKYWAY_I18N || (window.SKYWAY_I18N = {});
  const add = (l, o) => Object.assign(D[l] || (D[l] = {}), o);

  add("en", {
    "hero.est":"Est. 2014","hero.scroll":"Scroll",
    "p.calc.h1":"A number before you commit.",
    "track.contact":"Phone or email for the reply","track.btn":"Request status",
    "track.hint":"We reply within one working day. For cargo already at the port, call the office — it is faster.",
    "track.sendwa":"Send on WhatsApp","track.needboth":"Add your reference and a phone number or email so we can reply.",
    "track.sent":"Request ready — opening WhatsApp. You can also call the office.",
    "track.doc1":"Air waybill or bill of lading — issued when your cargo is booked onto a flight or sailing.",
    "track.doc2":"Entry number — issued when we lodge your customs entry at Mombasa or JKIA.",
    "track.doc3":"Delivery note — signed at your door, with photos if you ask for them.",
    "form.sendwa":"Send it on WhatsApp",
    "form.sendmail":"Prefer email? Write to us instead",
    "form.ok":"Opening WhatsApp with your enquiry — send it and we'll reply today.",
    "track.note":""
  });

  add("zh", {
    "hero.est":"成立于 2014 年","hero.scroll":"向下滚动",
    "p.calc.h1":"发货之前先有数字。",
    "track.contact":"用于回复的电话或邮箱","track.btn":"申请查询状态",
    "track.hint":"我们在一个工作日内回复。货物已到港时请直接致电办公室，更快。",
    "track.sendwa":"通过 WhatsApp 发送","track.needboth":"请填写单号，以及用于回复的电话或邮箱。",
    "track.sent":"已准备好——正在打开 WhatsApp。您也可以致电办公室。",
    "track.doc1":"空运单或提单——货物订上航班或船期后签发。",
    "track.doc2":"报关单号——我们在蒙巴萨或 JKIA 提交报关后签发。",
    "track.doc3":"送货单——在您门口签收，可应要求提供照片。",
    "form.sendwa":"通过 WhatsApp 发送",
    "form.sendmail":"更想用邮件？写信给我们",
    "form.ok":"正在打开 WhatsApp 并填入您的询价——发送后我们当天回复。",
    "track.note":""
  });

  add("tr", {
    "hero.est":"Kuruluş 2014","hero.scroll":"Kaydır",
    "p.calc.h1":"Taahhütten önce bir rakam.",
    "track.contact":"Yanıt için telefon veya e-posta","track.btn":"Durum iste",
    "track.hint":"Bir iş günü içinde yanıt veriyoruz. Kargo limandaysa ofisi arayın — daha hızlıdır.",
    "track.sendwa":"WhatsApp ile gönder","track.needboth":"Referansı ve yanıt için telefon veya e-posta ekleyin.",
    "track.sent":"Talep hazır — WhatsApp açılıyor. Ofisi de arayabilirsiniz.",
    "track.doc1":"Hava konşimentosu veya konşimento — kargo uçuşa veya sefere yüklendiğinde düzenlenir.",
    "track.doc2":"Beyanname numarası — Mombasa veya JKIA'da gümrük beyannameniz verildiğinde düzenlenir.",
    "track.doc3":"Teslim notu — kapınızda imzalanır, isterseniz fotoğraflarla.",
    "form.sendwa":"WhatsApp ile gönderin",
    "form.sendmail":"E-postayı mı tercih edersiniz? Bize yazın",
    "form.ok":"Talebiniz WhatsApp'ta açılıyor — gönderin, bugün yanıtlayalım.",
    "track.note":""
  });

  add("ar", {
    "hero.est":"تأسست 2014","hero.scroll":"مرّر",
    "p.calc.h1":"رقم قبل أن تلتزم.",
    "track.contact":"هاتف أو بريد للرد","track.btn":"اطلب الحالة",
    "track.hint":"نرد خلال يوم عمل واحد. إن كانت البضاعة في الميناء فاتصل بالمكتب — أسرع.",
    "track.sendwa":"أرسل على واتساب","track.needboth":"أضف الرقم المرجعي وهاتفًا أو بريدًا لنتمكن من الرد.",
    "track.sent":"الطلب جاهز — جارٍ فتح واتساب. يمكنك أيضًا الاتصال بالمكتب.",
    "track.doc1":"بوليصة الشحن الجوي أو البحري — تُصدر عند حجز بضاعتك على رحلة أو إبحار.",
    "track.doc2":"رقم البيان الجمركي — يُصدر عند تقديم بيانك في مومباسا أو JKIA.",
    "track.doc3":"مذكرة التسليم — تُوقَّع عند بابك، مع صور إن طلبت.",
    "form.sendwa":"أرسله على واتساب",
    "form.sendmail":"تفضل البريد؟ راسلنا بدلًا من ذلك",
    "form.ok":"جارٍ فتح واتساب مع استفسارك — أرسله وسنرد اليوم.",
    "track.note":""
  });

  add("so", {
    "hero.est":"La aasaasay 2014","hero.scroll":"Hoos u dhaadhac",
    "p.calc.h1":"Lambar ka hor ballanqaad.",
    "track.contact":"Telefoon ama iimayl jawaabta","track.btn":"Codso xaaladda",
    "track.hint":"Waxaan ku jawaabnaa hal maalin shaqo. Haddii xamuulku dekedda joogo wac xafiiska — way dhaqso badan tahay.",
    "track.sendwa":"Ku dir WhatsApp","track.needboth":"Ku dar lambarka tixraaca iyo telefoon ama iimayl.",
    "track.sent":"Codsiga waa diyaar — WhatsApp waa furmayaa. Xafiiskana waad wici kartaa.",
    "track.doc1":"Warqadda xamuulka hawada ama badda — la bixiyo marka xamuulkaaga la qorsheeyo duulimaad ama safar.",
    "track.doc2":"Lambarka warqadda canshuurta — la bixiyo marka warqaddaada Mombasa ama JKIA laga gudbiyo.",
    "track.doc3":"Warqadda gaarsiinta — albaabkaaga lagu saxeexo, sawirro haddii aad codsato.",
    "form.sendwa":"Ku dir WhatsApp",
    "form.sendmail":"Iimayl ma doorbidaysaa? Nala soo xiriir",
    "form.ok":"WhatsApp waa furmayaa codsigaaga — dir, maanta waan ku jawaabnaa.",
    "track.note":""
  });
})();
