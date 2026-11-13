/* Chip labels — five languages */
(() => {
  const D = window.SKYWAY_I18N || (window.SKYWAY_I18N = {});
  const add = (l, o) => Object.assign(D[l] || (D[l] = {}), o);

  const sets = {
    en: { air:"Air", sea:"Sea", clear:"Clearing", truck:"Trucking", wh:"Storage", china:"China", uk:"U.K.", dubai:"Dubai", turkey:"Turkey", usa:"U.S.A.", door:"Door to door", ke:"Kenya", cn:"China", ae:"U.A.E.", tr:"Türkiye" },
    zh: { air:"空运", sea:"海运", clear:"清关", truck:"陆运", wh:"仓储", china:"中国", uk:"英国", dubai:"迪拜", turkey:"土耳其", usa:"美国", door:"门到门", ke:"肯尼亚", cn:"中国", ae:"阿联酋", tr:"土耳其" },
    tr: { air:"Hava", sea:"Deniz", clear:"Gümrükleme", truck:"Kara", wh:"Depolama", china:"Çin", uk:"İngiltere", dubai:"Dubai", turkey:"Türkiye", usa:"ABD", door:"Kapıdan kapıya", ke:"Kenya", cn:"Çin", ae:"B.A.E.", tr:"Türkiye" },
    ar: { air:"جو", sea:"بحر", clear:"تخليص", truck:"بري", wh:"تخزين", china:"الصين", uk:"بريطانيا", dubai:"دبي", turkey:"تركيا", usa:"أمريكا", door:"باب إلى باب", ke:"كينيا", cn:"الصين", ae:"الإمارات", tr:"تركيا" },
    so: { air:"Hawada", sea:"Badda", clear:"Dhoofin", truck:"Dhulka", wh:"Bakhaar", china:"Shiinaha", uk:"Ingiriiska", dubai:"Dubai", turkey:"Turkiga", usa:"Maraykanka", door:"Albaab ilaa albaab", ke:"Kenya", cn:"Shiinaha", ae:"Imaaraadka", tr:"Turkiga" }
  };
  for (const [l, set] of Object.entries(sets)) {
    const out = {};
    for (const [k, v] of Object.entries(set)) out["chips." + k] = v;
    add(l, out);
  }
})();
