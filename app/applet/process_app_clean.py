#!/usr/bin/env python3
import re
import sys

def main():
    with open("app.original.js", "r", encoding="utf-8") as f:
        lines = f.readlines()

    output = []
    
    for i, line in enumerate(lines):
        line_num = i + 1
        
        # Check if line contains Arabic
        if not re.search(r'[\u0600-\u06FF]', line):
            output.append(line)
            continue
            
        l = line
        
        # 1. Tier conditions with Arabic
        l = l.replace('|| tier === "سيادي"', '')
        l = l.replace('|| tier === "نخبة"', '')
        l = l.replace('|| AppState.user.tier === "نخبة"', '')
        l = l.replace('|| AppState.user?.tier === "نخبة"', '')
        
        # 2. Settings light/dark theme label
        l = l.replace('(lang === "ar" ? "الفاتح الإمبراطوري" : "Imperial Light")', '"Imperial Light"')
        l = l.replace('(lang === "ar" ? "الداكن الملكي (الافتراضي)" : "Obsidian Dark")', '"Obsidian Dark"')
        
        # 3. Sound toast
        l = re.sub(r':\s*"تم تشغيل المؤثرات الصوتية الساعاتية"', ': "Sound effects enabled"', l)
        l = re.sub(r':\s*"تم كتم المؤثرات الصوتية الساعاتية"', ': "Sound effects muted"', l)
        
        # 4. Gyroscope toast
        l = re.sub(r':\s*"تم تفعيل استجابة الجايروسكوب ثلاثية الأبعاد"', ': "3D Gyroscope motion enabled"', l)
        l = re.sub(r':\s*"تم تعطيل استجابة الجايروسكوب \(الوضع الثابت\)"', ': "3D Gyroscope motion disabled (Fixed mode)"', l)
        
        # 5. Section titles & collection
        l = l.replace('lang === "ar" ? "خزينة المقتنيات النادرة" : "MY LUXURY COLLECTION"', '"MY LUXURY COLLECTION"')
        
        # 6. Rarity labels fallback
        l = re.sub(r'\(window\.currentLang === "ar" \? "[^"]+" : "([^"]+)"\)', r'"\1"', l)
        
        # 7. Tier info labels (611-645)
        l = re.sub(r'isAr \? "[^"]+" : "([^"]+)"', r'"\1"', l)
        l = l.replace('isAr ? "عضو سيادي" : (tier || "Sovereign Member")', 'tier || "Sovereign Member"')
        l = l.replace('isAr ? "سيادي" : (tier ? tier.replace(/^SOVEREIGN\\s+/i, "") : "")', 'tier ? tier.replace(/^SOVEREIGN\\s+/i, "") : ""')
        l = l.replace('isAr ? "رتبة عضو سيادي" : (tier ? `${tier} Tier` : "Sovereign Tier")', 'tier ? `${tier} Tier` : "Sovereign Tier"')
        l = l.replace('isAr ? "عضوية سيادية" : (tier || "Sovereign Member")', 'tier || "Sovereign Member"')
        
        # 8. Metal & weight properties in collectibles
        l = re.sub(r'metalAr:\s*"[^"]*",', 'metalAr: "",', l)
        l = re.sub(r'weightAr:\s*"[^"]*",', 'weightAr: "",', l)
        
        # 9. Circles properties
        l = re.sub(r'arName:\s*"[^"]*",', 'arName: "",', l)
        l = re.sub(r'badgeAr:\s*"[^"]*",', 'badgeAr: "",', l)
        
        # 10. Boutique acquire / balance errors
        l = re.sub(r'\?\s*`هذه التحفة مخصصة حصرياً لأصحاب \${tierName} فأعلى\.`', '? `This masterpiece is exclusively reserved for ${tierName} and above.`', l)
        l = re.sub(r'\?\s*`رصيدك الحالي \(\$\${this\.balance\.toLocaleString\(\)}\) لا يكفي لاقتناء هذه التحفة \(\$\${item\.price\.toLocaleString\(\)}\)\.`', '? `Your balance ($${this.balance.toLocaleString()}) is insufficient for this artifact ($${item.price.toLocaleString()}).`', l)
        
        # 11. Tier text helper
        l = l.replace('tierText = "مؤسس المجلس السيادي • FOUNDER";', 'tierText = "COUNCIL FOUNDER • FOUNDER";')
        l = l.replace('tierText = "حاكم سيادي تنفيذي • SOVEREIGN EXARCH";', 'tierText = "SOVEREIGN EXARCH";')
        l = l.replace('tierText = "أركون سيادي أول • SOVEREIGN ARCHON";', 'tierText = "SOVEREIGN ARCHON";')
        l = l.replace('tierText = "تيتان رأس المال • CAPITAL TITAN";', 'tierText = "CAPITAL TITAN";')
        l = l.replace('tierText = "عضو سيادي معتمد • SOVEREIGN MEMBER";', 'tierText = "SOVEREIGN MEMBER";')
        
        # 12. Seat texts
        l = l.replace('seatText = "المقر الدبلوماسي • جنيف (Geneva)";', 'seatText = "Diplomatic Seat • Geneva";')
        l = l.replace('seatText = "المقر المصرفي • زيورخ (Zurich)";', 'seatText = "Banking Seat • Zurich";')
        l = l.replace('seatText = "الملاذ السيادي • موناكو (Monaco)";', 'seatText = "Sovereign Haven • Monaco";')
        l = l.replace('seatText = "حي النخبة المالي • لندن (London)";', 'seatText = "Financial District • London";')
        l = l.replace('seatText = "برج السيادة • دبي (Dubai)";', 'seatText = "Sovereign Tower • Dubai";')
        l = l.replace('seatText = "حي الفخامة التراثي • باريس (Paris)";', 'seatText = "Heritage District • Paris";')
        
        # 13. Charter & badges in member modal
        l = l.replace('charterEl.textContent = isAr ? "ميثاق سيادي مُعتمد" : "Sovereign Charter";', 'charterEl.textContent = "Sovereign Charter";')
        l = l.replace('? "السيادة ليست مجرد مكانة، بل هي معيار الوجود والريادة."', '? "Sovereignty is not mere status; it is the benchmark of existence."')
        l = l.replace('? ["👑 تاج المؤسس الذهبي", "💍 خاتم العرش الزيورخي", "⚜️ وسام السيادة الأول"]', '? ["👑 Founder\'s Gold Crown", "💍 Zurich Throne Ring", "⚜️ Sovereign Order of Merit"]')
        l = l.replace('? ["👑 إكليل السيادة المطلقة", "💍 خاتم الوفاق السويسري", "⚜️ وسام المعمار الرقمي"]', '? ["👑 Crown of Absolute Sovereignty", "💍 Swiss Concord Ring", "⚜️ Digital Architect Order"]')
        l = l.replace('? ["👑 تاج موناكو السيادي", "💎 قلادة الزمرد الملكية", "💍 خاتم السلالة"]', '? ["👑 Sovereign Monaco Crown", "💎 Royal Emerald Necklace", "💍 Dynasty Signet"]')
        l = l.replace('? ["⚡ صولجان رأس المال", "💍 خاتم تيتان لندن", "⚜️ وسام السيولة العابرة"]', '? ["⚡ Scepter of Capital", "💍 London Titan Ring", "⚜️ Sovereign Liquidity Order"]')
        l = l.replace('? ["👑 تاج السيادة المعتمد", "💍 خاتم الوفاق والمصادقة", "⚜️ وسام النخبة الدبلوماسي"]', '? ["👑 Sovereign Accredited Crown", "💍 Ring of Concord", "⚜️ Diplomatic Elite Order"]')
        
        # 14. Action feedback in member modal
        l = l.replace('const title = isAr ? "نخب الامتياز السيادي" : "Prestige Toast Conferred";', 'const title = "Prestige Toast Conferred";')
        l = re.sub(r'\?\s*`تم تقديم نخب الامتياز بنجاح إلى \${memberName}`', '? `Prestige toast successfully conferred upon ${memberName}`', l)
        l = l.replace('const title = isAr ? "المراسلات الثنائية" : "Private Channel";', 'const title = "Private Channel";')
        l = l.replace('? "قريبًا • المراسلات الثنائية المشفرة قيد الاعتماد الدبلوماسي"', '? "Coming Soon • Encrypted bilateral correspondence under diplomatic review"')
        l = l.replace('const title = isAr ? "الدائرة السيادية" : "Sovereign Circle";', 'const title = "Sovereign Circle";')
        l = l.replace('? "قريبًا • توسيع الدوائر بانتظار اعتماد المجلس"', '? "Coming Soon • Circle expansion pending Council ratification"')
        
        # 15. Elite dispatch motto fallback
        l = l.replace('quote: isDispatchAr ? (elite?.mottoAr || elite?.motto || "الانضباط، والحصرية، والسيادة المطلقة.") : (elite?.motto || "Discipline, exclusivity, and absolute sovereignty.")', 'quote: elite?.motto || "Discipline, exclusivity, and absolute sovereignty."')
        l = l.replace('quoteAr: elite?.mottoAr || "الانضباط، والحصرية، والسيادة المطلقة.",', 'quoteAr: "",')
        l = l.replace('AppState.user.quote !== "الانضباط. النفوذ. الحرية.")', 'AppState.user.quote !== "Discipline. Influence. Freedom.")')
        
        # 16. Boutique buttons & details
        l = l.replace('window.t("boutique.free") || (isAr ? "مجاني" : "Free")', 'window.t("boutique.free") || "Free"')
        l = l.replace('window.t("boutique.affordability") || (isAr ? "مدى القدرة على الشراء" : "Purchasing Power")', 'window.t("boutique.affordability") || "Purchasing Power"')
        l = l.replace('window.t("boutique.includedFree") || (isAr ? "مشمول مجاناً" : "Included Free")', 'window.t("boutique.includedFree") || "Included Free"')
        l = l.replace('window.t("boutique.owned") || "مملوك"', 'window.t("boutique.owned") || "Owned"')
        l = l.replace('window.t("boutique.acquire") || (isAr ? "امتلك" : "Acquire")', 'window.t("boutique.acquire") || "Acquire"')
        l = l.replace('RARITY_LABEL[item.rarity]() : "نادر"', 'RARITY_LABEL[item.rarity]() : "Rare"')
        l = l.replace('window.t("boutique.allCollSub") || (isAr ? "المقتنيات والتحف السيادية المعتمدة مرتبة تصاعدياً" : "Curated sovereign artifacts ordered by distinction")', 'window.t("boutique.allCollSub") || "Curated sovereign artifacts ordered by distinction"')
        l = l.replace('isAr ? "لم تقتنِ أي قطعة بعد" : "No Owned Collectibles Yet"', '"No Owned Collectibles Yet"')
        l = l.replace('window.t("boutique.noItems") || (isAr ? "لا توجد مقتنيات" : "No Collectibles")', 'window.t("boutique.noItems") || "No Collectibles"')
        l = l.replace('isAr ? "تفضل باستعراض المقتنيات المتاحة في الصالون للاقتناء والضم لخزانتك الخاصة." : "Browse the available pieces in the Sovereign Boutique to acquire and archive in your private vault."', '"Browse the available pieces in the Sovereign Boutique to acquire and archive in your private vault."')
        l = l.replace('window.t("boutique.noFilterMatch") || (isAr ? "لا توجد عناصر مطابقة للتصفية الحالية" : "No items match the current filter.")', 'window.t("boutique.noFilterMatch") || "No items match the current filter."')
        l = l.replace('✦ ${isAr ? "استعراض جميع المقتنيات" : "View All Collectibles"}', '✦ View All Collectibles')
        l = l.replace('window.t("boutique.freeActivated") || "مفعل ومثبت"', 'window.t("boutique.freeActivated") || "Installed & Active"')
        l = l.replace('window.t("misc.widgetInstalledToast") || "تم تثبيت ودجت الهوية السيادية بنجاح على الشاشة الرئيسية!"', 'window.t("misc.widgetInstalledToast") || "Sovereign Identity widget installed successfully!"')
        l = l.replace('window.t("boutique.id_widget_status") || "تثبيت الودجت"', 'window.t("boutique.id_widget_status") || "Install Widget"')
        
        # 17. Sharing & copy link
        l = l.replace('String(msg).includes("نسخ")', 'false')
        l = l.replace('title: isAr ? "THE 1% CLUB — العضوية السيادية" : "THE 1% CLUB — Sovereign Membership",', 'title: "THE 1% CLUB — Sovereign Membership",')
        l = re.sub(r'\?\s*`عضوية موثقة ومعتمدة في THE 1% CLUB • #\${memberId}`', '? `Verified sovereign membership in THE 1% CLUB • #${memberId}`', l)
        l = l.replace('window.t("coming_soon") || (window.currentLang === "ar" ? "قريباً" : "Coming Soon")', 'window.t("coming_soon") || "Coming Soon"')
        
        # 18. Member dossier tier & charter
        l = l.replace('tierText = "فئة السيادة المطلقة";', 'tierText = "Sovereign Tier";')
        l = l.replace('tierText = "فئة النخبة المعتمدة";', 'tierText = "Elite Tier";')
        l = l.replace('tierText = "عضو معتمد بالمجلس";', 'tierText = "Accredited Member";')
        l = l.replace('const city = isAr ? (member.city || member.cityAr || "المقر الدبلوماسي • جنيف") : (member.cityEn || member.city || "Geneva • Switzerland");', 'const city = member.cityEn || member.city || "Geneva • Switzerland";')
        l = l.replace('rankLabel.textContent = window.t ? window.t("memberDossier.standingTier", isAr ? "ar" : "en") : (isAr ? "الرتبة السيادية" : "Sovereign Standing");', 'rankLabel.textContent = window.t ? window.t("memberDossier.standingTier") : "Sovereign Standing";')
        l = l.replace('statusStat.textContent = isAr ? (member.isOnline !== false ? "نشط • معتمد" : "سجل موثق") : (member.isOnline !== false ? "Active" : "Verified");', 'statusStat.textContent = member.isOnline !== false ? "Active" : "Verified";')
        l = l.replace('regTitle.textContent = window.t ? window.t("memberDossier.registryTitle", isAr ? "ar" : "en") : (isAr ? "بيانات السجل السيادي المعتمد" : "Certified Sovereign Registry");', 'regTitle.textContent = window.t ? window.t("memberDossier.registryTitle") : "Certified Sovereign Registry";')
        l = l.replace('charterLabelEl.textContent = window.t ? window.t("memberDossier.charterLabel", isAr ? "ar" : "en") : (isAr ? "ميثاق العضوية" : "Membership Charter");', 'charterLabelEl.textContent = window.t ? window.t("memberDossier.charterLabel") : "Membership Charter";')
        l = l.replace('? (rawTier === "Sovereign" ? "ميثاق سيادي أول • غير قابل للإلغاء" : "ميثاق النخبة المعتمد • دائم")', '? (rawTier === "Sovereign" ? "Primary Sovereign Charter • Irrevocable" : "Accredited Elite Charter • Permanent")')
        l = l.replace('accessEl.textContent = isAr ? "وصول كامل للصالونات الخاصة والمفاوضات" : "Unrestricted Access to Private Lounges";', 'accessEl.textContent = "Unrestricted Access to Private Lounges";')
        l = l.replace('openContextPage("page-member", memberName || (isAr ? "ملف العضو السيادي" : "Member Dossier"), "club");', 'openContextPage("page-member", memberName || "Member Dossier", "club");')
        l = l.replace('sectionName.textContent = isAr ? "النادي" : "Club";', 'sectionName.textContent = "Club";')
        l = l.replace('window.t ? window.t("profile.comingSoon") : "قريبًا"', 'window.t ? window.t("profile.comingSoon") : "Coming Soon"')
        l = l.replace('const safeText = comingSoonText || (isAr ? "قريبًا" : "Coming Soon");', 'const safeText = comingSoonText || "Coming Soon";')
        l = l.replace('showPremiumToast(isAr ? "إشعار" : "Notice", safeText);', 'showPremiumToast("Notice", safeText);')
        l = l.replace('isAr ? "رصيد" : "credits"', '"credits"')
        
        # 19. Elite members array
        l = re.sub(r'nameAr:\s*"[^"]*",', 'nameAr: "",', l)
        l = re.sub(r'mottoAr:\s*"[^"]*",', 'mottoAr: "",', l)
        
        # 20. Elite chat keywords in Arabic
        if any(w in l for w in ['lower.includes("مساعدة")', 'lower.includes("دعم")', 'lower.includes("قوانين")',
                                'lower.includes("حد هنا")', 'lower.includes("مين موجود")', 'lower.includes("مساء الخير")',
                                'lower.includes("سلام")', 'lower.includes("مرحبا")', 'lower.includes("أهلا")',
                                'lower.includes("استثمار")', 'lower.includes("سوق")', 'lower.includes("أعمال")',
                                'lower.includes("صفق")', 'lower.includes("عقار")',
                                'lower.includes("مقتنيات")', 'lower.includes("ساعة")', 'lower.includes("قطعة")',
                                'lower.includes("فخامة")', 'lower.includes("بوتيك")']):
            # Replace line with empty comment to preserve line count
            output.append('    // [Keyword check]\n')
            continue
            
        # 21. Club greetings / titles
        l = l.replace('lang === "ar" ? "أهلًا بك في " : "Welcome to "', '"Welcome to "')
        l = l.replace('lang === "ar" ? "عرض المزيد من الغرف" : "View more rooms"', '"View more rooms"')
        
        # 22. Markets & hubs
        l = l.replace('catAr: "معادن"', 'catAr: "METALS"')
        l = l.replace('nameAr: "الذهب"', 'nameAr: "Gold Spot"')
        l = l.replace('nameAr: "الفضة"', 'nameAr: "Silver Spot"')
        l = l.replace('nameAr: "البلاتين"', 'nameAr: "Platinum Spot"')
        l = l.replace('nameAr: "البلاديوم"', 'nameAr: "Palladium Spot"')
        l = l.replace('catAr: "طاقة"', 'catAr: "ENERGY"')
        l = l.replace('nameAr: "نفط برنت"', 'nameAr: "Brent Crude"')
        l = l.replace('nameAr: "الخام الأمريكي"', 'nameAr: "WTI Crude"')
        l = l.replace('catAr: "مؤشرات"', 'catAr: "INDICES"')
        l = l.replace('nameAr: "داو جونز"', 'nameAr: "Dow Jones"')
        l = l.replace('catAr: "عملات"', 'catAr: "FX"')
        l = l.replace('symAr: "يورو/دولار"', 'symAr: "EUR/USD"')
        l = l.replace('symAr: "استرليني/دولار"', 'symAr: "GBP/USD"')
        l = l.replace('symAr: "دولار/فرنك"', 'symAr: "USD/CHF"')
        l = l.replace('catAr: "مراكز"', 'catAr: "HUBS"')
        l = l.replace('nameAr: "زيورخ ZURICH"', 'nameAr: "ZURICH"')
        l = l.replace('nameAr: "لندن LONDON"', 'nameAr: "LONDON"')
        l = l.replace('nameAr: "الرياض RIYADH"', 'nameAr: "RIYADH"')
        l = l.replace('nameAr: "نيويورك NY"', 'nameAr: "NEW YORK"')
        
        l = l.replace('item.catAr || benchmark.catAr || "معادن"', 'item.cat || benchmark.cat || "METALS"')
        l = l.replace('priceDisplay = isAr ? "غير متوفر" : "Unavailable";', 'priceDisplay = "Unavailable";')
        l = l.replace('(isAr ? "غير متوفر" : "UNAVAILABLE")', '"UNAVAILABLE"')
        l = l.replace('? (isAr ? "مباشر" : "LIVE")', '? "LIVE"')
        l = l.replace(': (isDelayed ? (isAr ? "متأخر" : "DELAYED") : (isAr ? "مغلق" : "STALE"));', ': (isDelayed ? "DELAYED" : "STALE");')
        l = l.replace('const priceDisplay = isAr ? "غير متوفر" : "Unavailable";', 'const priceDisplay = "Unavailable";')
        l = l.replace('const statusTxt = isAr ? "غير متوفر" : "UNAVAILABLE";', 'const statusTxt = "UNAVAILABLE";')
        l = l.replace('const hCatText = isAr ? (hub.catAr || "مراكز") : (hub.catEn || "HUBS");', 'const hCatText = hub.catEn || "HUBS";')
        
        # 23. Show more / Show less buttons
        l = l.replace('window.currentLang === "en" ? "Show Less" : "عرض أقل"', '"Show Less"')
        l = l.replace('window.currentLang === "en" ? "Show More" : "عرض المزيد"', '"Show More"')
        l = l.replace('isExpanded ? (window.currentLang === "en" ? "Show Less" : "عرض أقل") : (window.currentLang === "en" ? "Show More" : "عرض المزيد")', 'isExpanded ? "Show Less" : "Show More"')
        
        # 24. Club dispatches & accolades
        l = l.replace('window.t("club.sealedDecree") || "وثيقة مختومة"', 'window.t("club.sealedDecree") || "Sealed Decree"')
        l = l.replace('window.t("club.whisperBadge") || "همس سيادي مشفر وخاص"', 'window.t("club.whisperBadge") || "Encrypted Sovereign Whisper"')
        l = l.replace('window.t("club.discretionSecured") || "سرية مشددة"', 'window.t("club.discretionSecured") || "Discretion Secured"')
        l = l.replace('window.t("club.endorseDesc") || "ختم التأييد السيادي"', 'window.t("club.endorseDesc") || "Sovereign Endorsement Seal"')
        l = l.replace('window.t("club.endorse") || "تأييد"', 'window.t("club.endorse") || "Endorse"')
        l = l.replace('window.t("club.honorDesc") || "خاتم الوفاق والمصادقة"', 'window.t("club.honorDesc") || "Ring of Concord & Honor"')
        l = l.replace('window.t("club.honor") || "وفاق"', 'window.t("club.honor") || "Concord"')
        l = l.replace('window.t("club.toastDesc") || "نخب الامتياز والريادة"', 'window.t("club.toastDesc") || "Prestige Toast of Excellence"')
        l = l.replace('window.t("club.toast") || "نخب"', 'window.t("club.toast") || "Toast"')
        l = l.replace('window.t("club.whisperPlaceholder") || "صياغة برقية سيادية مشفرة ومحمية…"', 'window.t("club.whisperPlaceholder") || "Draft an encrypted sovereign dispatch…"')
        l = l.replace('window.t("club.typeMessage") || "اكتب رسالة للنادي…"', 'window.t("club.typeMessage") || "Type a message to the Club…"')
        
        # 25. Boutique modal details
        l = l.replace(': (isAr ? "إرث سيادي" : "SOVEREIGN RELIC");', ': "SOVEREIGN RELIC";')
        l = l.replace('statusText.textContent = isAr ? "مملوك" : "OWNED";', 'statusText.textContent = "OWNED";')
        l = l.replace('if (alloyEl) alloyEl.textContent = isAr ? (item.metalAr || item.metal || "ذهب خالص وأوبسيديان") : (item.metal || item.metalAr || "Solid Gold & Obsidian");', 'if (alloyEl) alloyEl.textContent = item.metal || "Solid Gold & Obsidian";')
        l = l.replace('if (weightEl) weightEl.textContent = isAr ? (item.weightAr || item.weight || "معيار سيادي خاص") : (item.weight || item.weightAr || "Sovereign Standard Gauge");', 'if (weightEl) weightEl.textContent = item.weight || "Sovereign Standard Gauge";')
        l = l.replace('tierLabelEl.textContent = isAr ? "حالة الحيازة" : "Custody Status";', 'tierLabelEl.textContent = "Custody Status";')
        l = l.replace('? `<span class="spec-owned-tag" style="color: #1b7a36; font-weight: 700;">✓ مقتناة في الخزينة</span>`', '? `<span class="spec-owned-tag" style="color: #1b7a36; font-weight: 700;">✓ Archived in Vault</span>`')
        l = l.replace('tierLabelEl.textContent = isAr ? "أهلية الاقتناء" : "Acquisition Eligibility";', 'tierLabelEl.textContent = "Acquisition Eligibility";')
        l = l.replace('let shortTier = "عضو سيادي";', 'let shortTier = "Sovereign Member";')
        l = l.replace('if (/LUMINARY/i.test(rawTier)) shortTier = "رتبة الوجاهة";', 'if (/LUMINARY/i.test(rawTier)) shortTier = "Luminary Tier";')
        l = l.replace('else if (/EXARCH/i.test(rawTier)) shortTier = "الحاكم التنفيذي";', 'else if (/EXARCH/i.test(rawTier)) shortTier = "Exarch Tier";')
        l = l.replace('? `<span style="color: #1b7a36; font-weight: 700;">✓ مؤهل • ${shortTier}</span>`', '? `<span style="color: #1b7a36; font-weight: 700;">✓ Eligible • ${shortTier}</span>`')
        l = l.replace(': `<span style="color: #b91c1c; font-weight: 700;">🔒 يتطلب • ${shortTier}</span>`;', ': `<span style="color: #b91c1c; font-weight: 700;">🔒 Requires • ${shortTier}</span>`;')
        l = l.replace('window.t("boutique.includedFree") || (isAr ? "مشمول مجاناً" : "Included Free")', 'window.t("boutique.includedFree") || "Included Free"')
        l = l.replace('item.lore ? window.t(item.lore) : (window.t("dynamic.loreDefault") || (isAr ? "تحفة ملكية مسبوكة يدوياً من الذهب الخالص والأوبسيديان، معتمدة ومسجلة رسمياً بالأرشيف الإمبراطوري بقرار من المجلس التأسيسي الأعلى." : "Handcrafted royal masterpiece forged in solid gold and obsidian, certified in the imperial archives."))', 'item.lore ? window.t(item.lore) : (window.t("dynamic.loreDefault") || "Handcrafted royal masterpiece forged in solid gold and obsidian, certified in the imperial archives.")')
        l = l.replace('setBtnText(isAr ? "تحفة سيادية مقتناة ومحفوظة بالخزينة" : "Acquired & Preserved in Vault");', 'setBtnText("Acquired & Preserved in Vault");')
        l = l.replace('const shortReq = tierInfo ? tierInfo.short : "عضو سيادي";', 'const shortReq = tierInfo ? tierInfo.short : "Sovereign Member";')
        l = l.replace('setBtnText(isAr ? `يتطلب رتبة (${shortReq})` : `Requires ${item.requiredTier}`);', 'setBtnText(`Requires ${item.requiredTier}`);')
        l = re.sub(r'\?\s*`هذه التحفة مخصصة حصرياً لأصحاب \${toastReq} فأعلى\.`', '? `This artifact is reserved for ${toastReq} and above.`', l)
        l = re.sub(r'\?\s*`رصيد غير كافٍ — إيداع <bdi dir="ltr">\$\${fmtP}</bdi>`', '? `Insufficient Balance — Deposit <bdi dir="ltr">$${fmtP}</bdi>`', l)
        l = re.sub(r'\?\s*`اقتناء التحفة السيادية • <bdi dir="ltr" style="font-variant-numeric: tabular-nums;">\$\${fmtP}</bdi>`', '? `Acquire Sovereign Artifact • <bdi dir="ltr" style="font-variant-numeric: tabular-nums;">$${fmtP}</bdi>`', l)
        l = l.replace('window.t("boutique.owned") || "مملوك"', 'window.t("boutique.owned") || "Owned"')
        
        # 26. Profile & Concierge toast
        l = l.replace('window.t("profile.profileSavedToast") || (window.currentLang === "ar" ? "تم حفظ وتحديث الملف الشخصي بنجاح" : "Profile updated successfully")', 'window.t("profile.profileSavedToast") || "Profile updated successfully"')
        l = l.replace('window.t("profile.accountSavedToast") || (window.currentLang === "ar" ? "تم حفظ وتحديث بيانات الحساب بنجاح" : "Account credentials updated successfully")', 'window.t("profile.accountSavedToast") || "Account credentials updated successfully"')
        l = l.replace('window.t("misc.conciergeSuccess") || "تم إرسال طلب الكونسيرج بنجاح. سيتواصل معك المساعد الخاص قريباً."', 'window.t("misc.conciergeSuccess") || "Concierge request dispatched successfully. Your sovereign attaché will respond shortly."')
        l = l.replace('const title = window.currentLang === "ar" ? "اعتماد العضوية السيادية" : "SOVEREIGN CREDENTIAL VERIFIED";', 'const title = "SOVEREIGN CREDENTIAL VERIFIED";')
        l = re.sub(r'\?\s*`العضوية موثقة ومعتمدة برقم #\${AppState\.user\.id}`', '? `Membership verified and certified under #${AppState.user.id}`', l)
        l = re.sub(r'\?\s*`تم إيداع \$\${amount\.toLocaleString\(\)} في رصيدك السيادي بنجاح!`', '? `Successfully deposited $${amount.toLocaleString()} into your sovereign balance!`', l)
        l = l.replace('? "لقد استنفدت رصيد رسائلك اليومي. يرجى اختيار باقة للمتابعة."', '? "You have exhausted your daily message allowance. Please select a credit reserve to proceed."')
        l = re.sub(r'\?\s*`تم شحن \${credits} رسالة بنجاح!`', '? `Successfully credited ${credits} dispatches!`', l)
        l = l.replace('hrrStatusBadge.textContent = window.t ? window.t("honors.officialStatusBadge", window.currentLang) : (window.currentLang === "ar" ? "✦ معتمد رسمياً" : "✦ OFFICIALLY ACCREDITED");', 'hrrStatusBadge.textContent = window.t ? window.t("honors.officialStatusBadge") : "✦ OFFICIALLY ACCREDITED";')
        
        # 27. Museum & conservatory in profile
        l = l.replace('isAr ? "مُقَلَّد بالهوية" : "EQUIPPED ON IDENTITY"', '"EQUIPPED ON IDENTITY"')
        l = l.replace('isAr ? "محفوظ بالخزانة" : "SAFELY IN VAULT"', '"SAFELY IN VAULT"')
        l = l.replace('window.t("profile.solidGoldAlloy") || (isAr ? "Au 999.9 ذهب خالص ٢٤ قيراط" : "Au 999.9 Solid Gold (24K)")', 'window.t("profile.solidGoldAlloy") || "Au 999.9 Solid Gold (24K)"')
        l = l.replace('window.t("profile.obsidianTitaniumAlloy") || (isAr ? "تيتانيوم أسود وأوبسيديان بركاني" : "Black Titanium & Obsidian")', 'window.t("profile.obsidianTitaniumAlloy") || "Black Titanium & Obsidian"')
        l = l.replace('window.t("profile.stMoritzFoundry") || (isAr ? "دار الصك الإمبراطورية • سانت موريتز" : "St. Moritz Master Foundry")', 'window.t("profile.stMoritzFoundry") || "St. Moritz Master Foundry"')
        l = l.replace('window.t("profile.genevaGuild") || (isAr ? "نقابة الصياغة الملكية • جنيف" : "Geneva Guild of Royal Horology")', 'window.t("profile.genevaGuild") || "Geneva Guild of Royal Horology"')
        l = l.replace('rarityEl.textContent = isAr ? "طراز سيادي فريد (SOVEREIGN)" : "SOVEREIGN APEX";', 'rarityEl.textContent = "SOVEREIGN APEX";')
        l = l.replace('loreEl.textContent = item.lore ? window.t(item.lore) : (window.t("dynamic.loreDefault") || (isAr ? "تحفة ملكية مسبوكة يدوياً من الذهب السيادي الخالص، معتمدة ومسجلة رسمياً بالأرشيف الإمبراطوري بقرار من المجلس التأسيسي الأعلى." : "Handcrafted sovereign artifact forged from solid 24k gold and obsidian, officially verified in the royal archives."));', 'loreEl.textContent = item.lore ? window.t(item.lore) : (window.t("dynamic.loreDefault") || "Handcrafted sovereign artifact forged from solid 24k gold and obsidian, officially verified in the royal archives.");')
        l = l.replace('window.t("profile.museumCopied") || (document.documentElement.lang === "ar" ? "تم نسخ رقم التوثيق السيادي بنجاح" : "Provenance ID copied to clipboard")', 'window.t("profile.museumCopied") || "Provenance ID copied to clipboard"')
        l = l.replace('countPill.textContent = isAr ? `${itemCount} معروضات متحفية معتمدة` : `${itemCount} Museum Exhibits`;', 'countPill.textContent = `${itemCount} Museum Exhibits`;')
        l = l.replace('const emptyTitle = window.t("profile.museumEmptyTitle") || (isAr ? "الرواق السيادي في انتظار أولى مقتنياتك الفاخرة" : "The Sovereign Conservatory Awaits Your First Exhibit");', 'const emptyTitle = window.t("profile.museumEmptyTitle") || "The Sovereign Conservatory Awaits Your First Exhibit";')
        l = l.replace('const emptyText = window.t("profile.museumEmptyDesc") || (isAr ? "تفضل باقتناء أول أثر سيادي موثق من البوتيك ليُعرض في رواقك الخاص مصحوباً ببراءة ملكية معتمدة." : "Acquire your first rare sovereign artifact from the Boutique to be archived with an immutable patent of provenance.");', 'const emptyText = window.t("profile.museumEmptyDesc") || "Acquire your first rare sovereign artifact from the Boutique to be archived with an immutable patent of provenance.";')
        l = l.replace('const btnText = window.t("explore_boutique") || (isAr ? "زيارة البوتيك السيادي ✦" : "Visit Sovereign Boutique ✦");', 'const btnText = window.t("explore_boutique") || "Visit Sovereign Boutique ✦";')
        l = l.replace("const metalText = (isAr && item.metalAr) ? item.metalAr : (item.metal || (isAr ? 'Au 999.9 ذهب خالص' : 'Au 999.9 Solid Gold'));", "const metalText = item.metal || 'Au 999.9 Solid Gold';")
        l = l.replace("<span>${isEquipped ? (isAr ? 'مُقَلَّد' : 'EQUIPPED') : (isAr ? 'محفوظ' : 'VAULTED')}</span>", "<span>${isEquipped ? 'EQUIPPED' : 'VAULTED'}</span>")
        l = l.replace("const inspectLabel = window.t(\"profile.inspectHint\") || (isAr ? 'فحص الشهادة' : 'Inspect Certificate');", "const inspectLabel = window.t(\"profile.inspectHint\") || 'Inspect Certificate';")
        l = l.replace("title=\"${isAr ? 'انقر لفحص براءة التوثيق والملكية السيادية' : 'Tap to inspect sovereign patent'}\">", "title=\"Tap to inspect sovereign patent\">")
        l = l.replace("<div class=\"museum-accession-num\">${isAr ? 'معروضة ' + (itemIndex < 10 ? '٠' + itemIndex : itemIndex) : 'EXHIBIT ' + (itemIndex < 10 ? '0' + itemIndex : itemIndex)}</div>", "<div class=\"museum-accession-num\">${'EXHIBIT ' + (itemIndex < 10 ? '0' + itemIndex : itemIndex)}</div>")
        
        # 28. Circles & Domains
        l = l.replace('// 2.5 SOVEREIGN CIRCLES & DOMAINS (الدوائر والمجالات السيادية)', '// 2.5 SOVEREIGN CIRCLES & DOMAINS')
        l = l.replace('const statusText = isAr ? "معتمد" : "ACCREDITED";', 'const statusText = "ACCREDITED";')
        l = l.replace(': (isAr ? "المجال السيادي" : "Sovereign Domain");', ': "Sovereign Domain";')
        l = l.replace('sealDot.innerHTML = `<span>${isAr ? "موثّق بالسجل" : "VERIFIED"}</span><span class="pcc-seal-star">✦</span>`;', 'sealDot.innerHTML = `<span>VERIFIED</span><span class="pcc-seal-star">✦</span>`;')
        l = l.replace('showNavToast(isAr ? "يجب الإبقاء على مجال سيادي واحد على الأقل" : "Please keep at least one circle");', 'showNavToast("Please keep at least one circle");')
        l = l.replace('showNavToast(isAr ? "الحد الأقصى هو ٥ مجالات سيادية معتمدة" : "Maximum 5 accredited circles allowed");', 'showNavToast("Maximum 5 accredited circles allowed");')
        
        # 29. Oath and deed modal
        l = l.replace('? "صك معتمد وموثق سيادياً"', '? "Deed Certified & Verified Sovereign"')
        l = l.replace('? "❖ صك السيادة معتمد وغير قابل للتحوير • الأرشيف السيادي ❖"', '? "❖ Sovereign Deed Accredited & Immutable • Sovereign Archives ❖"')
        l = l.replace('? "تم تجديد وتوثيق القَسَم في الأرشيف"', '? "Oath Reaffirmed & Recorded in Archives"')
        l = l.replace('? "❖ جرى توثيق وتجديد ميثاق السيادة في السجل الدائم ❖"', '? "❖ Sovereign Charter Ratified & Recorded in Permanent Registry ❖"')
        
        # 30. Leaderboard mock members quotes & cities
        l = re.sub(r'city:\s*"دبي، الإمارات",', 'city: "Dubai, UAE",', l)
        l = re.sub(r'city:\s*"جنيف، سويسرا",', 'city: "Geneva, Switzerland",', l)
        l = re.sub(r'city:\s*"لندن، المملكة المتحدة",', 'city: "London, UK",', l)
        l = re.sub(r'city:\s*"نيويورك، الولايات المتحدة",', 'city: "New York, USA",', l)
        l = re.sub(r'city:\s*"باريس، فرنسا",', 'city: "Paris, France",', l)
        l = re.sub(r'city:\s*"موناكو، فرنسا",', 'city: "Monaco",', l)
        l = re.sub(r'city:\s*"زيورخ، سويسرا",', 'city: "Zurich, Switzerland",', l)
        l = re.sub(r'city:\s*"ميلانو، إيطاليا",', 'city: "Milan, Italy",', l)
        l = re.sub(r'city:\s*"مدريد، إسبانيا",', 'city: "Madrid, Spain",', l)
        
        l = re.sub(r'quote:\s*"[^"]*[\u0600-\u06FF][^"]*",', 'quote: "Discipline, prestige, and sovereign discretion.",', l)
        l = re.sub(r'quoteAr:\s*"[^"]*[\u0600-\u06FF][^"]*",', 'quoteAr: "",', l)
        
        # 31. Leaderboard UI titles & headers
        l = l.replace('<h2 class="sl-honor-title">${isAr ? "لوحة الشرف السيادية" : "SOVEREIGN ROLL OF HONOR"}</h2>', '<h2 class="sl-honor-title">SOVEREIGN ROLL OF HONOR</h2>')
        l = l.replace('<div class="sl-audit-badge" title="${isAr ? "سجل مدقق وموثق" : "Audited and verified registry"}">', '<div class="sl-audit-badge" title="Audited and verified registry">')
        l = l.replace('<span>${isAr ? "مدقق" : "AUDITED"}</span>', '<span>AUDITED</span>')
        l = l.replace('<p class="sl-honor-subtitle">${isAr ? "الرابطة العالمية لرواد السيادة المالية" : "Global League of Sovereign Titans"}</p>', '<p class="sl-honor-subtitle">Global League of Sovereign Titans</p>')
        l = l.replace('${isAr ? "سجل مراتب النخبة" : "SOVEREIGN LEDGER"}', 'SOVEREIGN LEDGER')
        l = l.replace('${isAr ? `${ledgerMembers.length} أعضاء مصنفين` : `${ledgerMembers.length} Ranked Members`}', '${ledgerMembers.length} Ranked Members')
        l = l.replace('if (member.tier === "Sovereign") tierText = "سيادة";', 'if (member.tier === "Sovereign") tierText = "Sovereign";')
        l = l.replace('else if (member.tier === "Elite") tierText = "نخبة";', 'else if (member.tier === "Elite") tierText = "Elite";')
        l = l.replace('else tierText = "معتمد";', 'else tierText = "Member";')
        l = l.replace('<span class="sl-registry-order-prefix">${isAr ? "رتبة" : "Nº"}</span>', '<span class="sl-registry-order-prefix">Nº</span>')
        l = l.replace('<span class="sl-wealth-label sl-registry-label">${isAr ? "تخصيص" : "ALLOCATION"}</span>', '<span class="sl-wealth-label sl-registry-label">ALLOCATION</span>')
        l = l.replace('<div class="sl-card-chevron sl-registry-sigil" aria-hidden="true" title="${isAr ? \'عرض السجل\' : \'Inspect Record\'}">', '<div class="sl-card-chevron sl-registry-sigil" aria-hidden="true" title="Inspect Record">')
        l = l.replace('<div class="sl-self-card" onclick="goToPage(\'profile\')" title="${isAr ? \'الانتقال إلى ملفك التعريفي\' : \'Open your profile dossier\'}">', '<div class="sl-self-card" onclick="goToPage(\'profile\')" title="Open your profile dossier">')
        l = l.replace('<span class="sl-self-title">${isAr ? "ترتيبك في المجلس: المرتبة <bdi>#11</bdi>" : "Council Standing: Rank <bdi>#11</bdi>"}</span>', '<span class="sl-self-title">Council Standing: Rank <bdi>#11</bdi></span>')
        l = l.replace('${isAr ? "أنت تتقدم على <bdi>99.8%</bdi> من نخبة العالم • استمر في المداولات" : "Surpassing 99.8% of global elite • Maintain sovereign status"}', 'Surpassing 99.8% of global elite • Maintain sovereign status')
        l = l.replace('<span>${isAr ? "عرض ملفك" : "View Dossier"}</span>', '<span>View Dossier</span>')
        
        # 32. Auth modal text fallbacks
        l = l.replace('window.t("auth.registerTitle") || (window.currentLang === "ar" ? "إنشاء حساب سيادي" : "Create Sovereign Account")', 'window.t("auth.registerTitle") || "Create Sovereign Account"')
        l = l.replace('window.t("auth.registerDesc") || (window.currentLang === "ar" ? "انضم إلى نخبة الأعضاء وأنشئ هويتك السيادية الموثقة" : "Join the accredited sovereign registry and initiate your digital identity.")', 'window.t("auth.registerDesc") || "Join the accredited sovereign registry and initiate your digital identity."')
        l = l.replace('window.t("auth.registerSubmit") || (window.currentLang === "ar" ? "إنشاء حساب والانضمام" : "Create Account & Accredit")', 'window.t("auth.registerSubmit") || "Create Account & Accredit"')
        l = l.replace('window.t("auth.registerGoogle") || (window.currentLang === "ar" ? "التسجيل باستخدام Google" : "Sign Up with Google")', 'window.t("auth.registerGoogle") || "Sign Up with Google"')
        l = l.replace('window.t("auth.haveAccountPrompt") || (window.currentLang === "ar" ? "لديك حساب بالفعل؟" : "Already have an accredited seat?")', 'window.t("auth.haveAccountPrompt") || "Already have an accredited seat?"')
        l = l.replace('window.t("auth.loginLink") || (window.currentLang === "ar" ? "تسجيل الدخول" : "Sign In");', 'window.t("auth.loginLink") || "Sign In";')
        l = l.replace('window.t("auth.loginTitle") || (window.currentLang === "ar" ? "تسجيل الدخول" : "Sign In");', 'window.t("auth.loginTitle") || "Sign In";')
        l = l.replace('window.t("auth.loginDesc") || (window.currentLang === "ar" ? "بوابة الدخول الحصرية لأعضاء النادي السيادي" : "Exclusive portal for accredited sovereign council members.")', 'window.t("auth.loginDesc") || "Exclusive portal for accredited sovereign council members."')
        l = l.replace('window.t("auth.loginSubmit") || (window.currentLang === "ar" ? "تسجيل الدخول" : "Sign In");', 'window.t("auth.loginSubmit") || "Sign In";')
        l = l.replace('window.t("auth.continueGoogle") || (window.currentLang === "ar" ? "المتابعة باستخدام Google" : "Continue with Google")', 'window.t("auth.continueGoogle") || "Continue with Google"')
        l = l.replace('window.t("auth.noAccountPrompt") || (window.currentLang === "ar" ? "ليس لديك حساب؟" : "Don\'t have an account?")', 'window.t("auth.noAccountPrompt") || "Don\'t have an account?"')
        l = l.replace('window.t("auth.createAccountLink") || (window.currentLang === "ar" ? "إنشاء حساب جديد" : "Create New Sovereign Seat");', 'window.t("auth.createAccountLink") || "Create New Sovereign Seat";')
        l = re.sub(r'\?\s*`تم إرسال تعليمات استعادة كلمة المرور إلى \${email} بنجاح`', '? `Password reset instructions sent to ${email} successfully`', l)
        
        output.append(l)

    with open("app.clean.js", "w", encoding="utf-8") as f:
        f.writelines(output)

    print(f"Written app.clean.js with {len(output)} lines.")

if __name__ == "__main__":
    main()
