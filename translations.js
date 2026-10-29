// THE 1% CLUB — SOVEREIGN ENGLISH LEXICON
try {
  ['lang', 'language', 'appLang', 'app_lang', 'club_lang', 'sovereign_lang', 'i18nextLng', 'one_percent_lang'].forEach(k => {
    localStorage.removeItem(k);
    sessionStorage.removeItem(k);
  });
} catch (e) {}
if (typeof document !== 'undefined' && document.documentElement) {
  document.documentElement.setAttribute('lang', 'en');
  document.documentElement.setAttribute('dir', 'ltr');
}
window.currentLang = 'en';

window.I18N = {
  coming_soon: {
    en: "Coming Soon",
  },
  profile_account_actions_title: {
    en: "Account Actions",
  },
  profile_settings_title: {
    en: "Settings & Concierge",
  },
  menu_account_title: {
    en: "Account Information",
  },
  menu_account_desc: {
    en: "Name, email, phone, password",
  },
  menu_collection_title: {
    en: "My Collection",
  },
  menu_collection_desc: {
    en: "Your purchased items & active assets",
  },
  menu_concierge_title: {
    en: "Concierge & Support",
  },
  menu_concierge_desc: {
    en: "FAQs and direct assistance",
  },
  menu_friends_title: {
    en: "Add Member",
  },
  menu_membership_title: {
    en: "Sovereign Membership",
  },
  menu_membership_desc: {
    en: "Plan details, renewal, benefits",
  },
  menu_settings_title: {
    en: "System Settings",
  },
  menu_settings_desc: {
    en: "Dark mode, audio chimes, haptics & cache",
  },

  leave_blank: {
    en: "Leave blank to keep current",
  },
  explore_boutique: {
    en: "Explore Boutique",
  },
  common: {
    close: {
      en: "Close",
    },
    closeDecree: {
      en: "Close Decree",
    },
  },
  nav: {
    membership: {
      en: "Membership",
    },
    club: {
      en: "Club",
    },
    profile: {
      en: "Profile",
    },
    boutique: {
      en: "Boutique",
    },
  },
  membership: {
    idMetrics: {
      en: "Identity Metrics",
    },
    wealthIndex: {
      en: "Wealth Index",
    },
    wealthTooltipTitle: {
      en: "Sovereign Wealth Index",
    },
    wealthTooltipDesc: {
      en: "Calculated from a standard base of 60%, scaling up gradually based on the total economic value of acquired boutique collectibles.",
    },
    wealthTooltipFormula: {
      en: "Base (60%) + Economic Value",
    },
    privileges: {
      en: "Privileges",
    },
    privilegesTooltipTitle: {
      en: "Sovereign Privileges Index",
    },
    privilegesTooltipDesc: {
      en: "Calculated from a standard base of 60%, expanding based on rarity, standing tier, and prestige of acquired sovereign collectibles.",
    },
    privilegesTooltipFormula: {
      en: "Base (60%) + Rarity & Standing",
    },
    shareMembership: {
      en: "Share Membership",
    },
    copyLink: {
      en: "Copy Sovereign Link",
    },
    memberSince: {
      en: "Member Since",
    },
    activeStatus: {
      en: "Active",
    },
    statusLabel: {
      en: "Status",
    },
    level: {
      en: "Membership Level",
    },
    quote: {
      en: "\"Not every summit is meant for everyone.\"",
    },
    exportingToast: {
      en: "Exporting ultra-high-definition Master Card…",
    },
    shareSuccessToast: {
      en: "✓ Master Card shared successfully",
    },
    saveSuccessToast: {
      en: "✓ Master Card saved as high-res PNG",
    },
    shareFailToast: {
      en: "Unable to share Master Card",
    },
  },
  club: {
    roomsNav: {
      en: "Sovereign Club Chambers & Salons",
    },
    nextRooms: {
      en: "View more rooms",
    },
    prevRooms: {
      en: "Previous rooms",
    },
    lounge: {
      en: "Sovereign Lounge",
    },
    wealth: {
      en: "Wealth & Capital",
    },
    business: {
      en: "Business Deals",
    },
    lifestyle: {
      en: "Travel & Leisure",
    },
    ideas: {
      en: "Innovation",
    },
    tech: {
      en: "Tech & AI",
    },
    leaderboard: {
      en: "Sovereign Board",
    },
    leaderboardTitle: {
      en: "Sovereign Roll of Honor",
    },
    leaderboardSub: {
      en: "Global League of Sovereign Titans",
    },
    leaderboardPodium: {
      en: "Sovereign Triumvirate",
    },
    leaderboardAllTitans: {
      en: "All Titans",
    },
    leaderboardSovereignTier: {
      en: "Sovereign Tier",
    },
    leaderboardEliteTier: {
      en: "Elite Tier",
    },
    leaderboardLedger: {
      en: "Sovereign Ledger",
    },
    leaderboardYourRank: {
      en: "Your Standing: Rank #11",
    },
    leaderboardViewProfile: {
      en: "View Dossier",
    },
    welcomePrefix: {
      en: "Welcome to ",
    },
    welcomeTitle: {
      en: "Welcome to Sovereign Lounge",
    },
    welcomeSub: {
      en: "A private circle. A higher standard.",
    },
    wealthSub: {
      en: "High-conviction allocations and sovereign asset governance.",
    },
    businessSub: {
      en: "Strategic alliances and bespoke ventures among business titans.",
    },
    lifestyleSub: {
      en: "Private aviation, nautical charters, and discreet sanctuaries.",
    },
    ideasSub: {
      en: "Intellectual theses and pioneering forward concepts.",
    },
    techSub: {
      en: "Air-gapped compute, private AI, and frontier technology.",
    },
    chamberSecureProtocol: {
      en: "Sovereign Encrypted • Confidential Session",
    },
    activeSessionPulse: {
      en: "Active Trading Sessions",
    },
    tickerMetals: {
      en: "METALS",
    },
    tickerEnergy: {
      en: "ENERGY",
    },
    tickerIndices: {
      en: "INDICES",
    },
    tickerFx: {
      en: "FX",
    },
    tickerHubs: {
      en: "HUBS",
    },
    tickerUnavailable: {
      en: "Unavailable",
    },
    tickerDelayed: {
      en: "DELAYED",
    },
    tickerLive: {
      en: "LIVE",
    },
    tickerStale: {
      en: "STALE",
    },
    endorse: {
      en: "Endorse",
    },
    honor: {
      en: "Accord",
    },
    toast: {
      en: "Toast",
    },
    endorseDesc: {
      en: "Sovereign wax endorsement stamp",
    },
    honorDesc: {
      en: "Signet ring accord of honor",
    },
    toastDesc: {
      en: "Prestige toast of honor",
    },
    miniDossier: {
      authLabel: {
        en: "SOVEREIGN MEMBER DOSSIER",
      },
      wealthLabel: {
        en: "Wealth Index",
      },
      privLabel: {
        en: "Sovereign Privilege",
      },
      standingLabel: {
        en: "Charter Standing",
      },
      regaliaTitle: {
        en: "Equipped Sovereign Regalia & Seals:",
      },
      toastBtn: {
        en: "Offer Sovereign Toast",
      },
      toastSent: {
        en: "Prestige toast conferred successfully to",
      },
      privateChatBtn: {
        en: "Private Channel",
      },
      privateChatMsg: {
        en: "Encrypted bilateral channels in diplomatic accreditation",
      },
      addMemberBtn: {
        en: "Add to Circle",
      },
      addMemberMsg: {
        en: "Circle expansions pending council clearance",
      },
      fullProfileBtn: {
        en: "Inspect Complete Archives & Credentials →",
      },
    },
    yourDispatch: {
      en: "Your Sovereign Dispatch",
    },
    goldenInkSeal: {
      en: "Official Sovereign Seal",
    },
    messagesLeft: {
      en: "Remaining messages today",
    },
    ledgerAllocationTitle: {
      en: "Dispatch Allocation",
    },
    requestAllocation: {
      en: "Request Allocation",
    },
    whisperToggle: {
      en: "Encrypted Dispatch",
    },
    whisperBadge: {
      en: "CONFIDENTIAL DISPATCH",
    },
    discretionSecured: {
      en: "DISCRETION SECURED",
    },
    whisperPlaceholder: {
      en: "Confidential dispatch...",
    },
    whisperActiveNotice: {
      en: "Sovereign Whisper Active • End-to-End Chamber Seal",
    },
    sealedDecree: {
      en: "Sealed Decree",
    },
    credit: {
      en: "Credit",
    },
    typeMessage: {
      en: "Dispatch message...",
    },
    send: {
      en: "Send",
    },
    buyCredits: {
      en: "Buy Message Credits",
    },
    choosePackage: {
      en: "Choose the right package",
    },
    msgs10: {
      en: "10 Messages",
    },
    msgs25: {
      en: "25 Messages",
    },
    msgs50: {
      en: "50 Messages",
    },
    cancel: {
      en: "Cancel",
    },
    insufficientBalance: {
      en: "Insufficient balance",
    },
    insufficientBalanceDesc: {
      en: "Your current balance is insufficient to complete this transaction.",
    },
    isDrafting: {
      en: "is drafting a sovereign decree",
    },
    popular: {
      en: "Most Popular",
    },
    dismissWelcome: {
      en: "Dismiss Welcome",
    },
    buyCreditsTip: {
      en: "Request additional message allocation",
    },
    whisperTip: {
      en: "Enable encrypted cipher dispatch",
    },
    sendTip: {
      en: "Seal & dispatch via sovereign channels",
    },
  },
  profile: {
    stealthMoniker: {
      en: "SOVEREIGN SHADOW • 001",
    },
    editProfileTitle: {
      en: "EDIT PROFILE",
    },
    accountInfoTitle: {
      en: "ACCOUNT INFORMATION",
    },
    saveProfile: {
      en: "SAVE PROFILE",
    },
    saveAccount: {
      en: "SAVE ACCOUNT INFORMATION",
    },
    profileSavedToast: {
      en: "Profile updated successfully",
    },
    accountSavedToast: {
      en: "Account credentials saved successfully",
    },
    accountDesc: {
      en: "Official account credentials and private contact information for sovereign members.",
    },
    leaveBlankPlaceholder: {
      en: "Leave blank to keep current",
    },
    memberIdLabel: {
      en: "MEMBERSHIP IDENTIFIER",
    },
    memberStatusLabel: {
      en: "MEMBERSHIP STATUS",
    },
    verifiedActive: {
      en: "SOVEREIGN · VERIFIED",
    },
    memberCredentials: {
      en: "MEMBER CREDENTIALS",
    },
    changePortrait: {
      en: "CHANGE PORTRAIT",
    },
    publicIdentity: {
      en: "PUBLIC IDENTITY",
    },
    securityContact: {
      en: "SECURITY & CONTACT",
    },
    saveCredentials: {
      en: "SAVE CREDENTIALS",
    },
    editIdentity: {
      en: "EDIT IDENTITY",
    },
    selectPortrait: {
      en: "SELECT PORTRAIT",
    },
    vaultTitle: {
      en: "PRIVATE SOVEREIGN VAULT",
    },
    heroSovereignTier: {
      en: "SOVEREIGN MEMBER",
    },
    heroEliteTier: {
      en: "ELITE MEMBER",
    },
    heroCertifiedDossier: {
      en: "OFFICIAL SEAL",
    },
    addMemberBtn: {
      en: "Add Member",
    },
    messageBtn: {
      en: "Private Dispatch",
    },
    messageSoon: {
      en: "Private Dispatch — Coming Soon",
    },
    shareDossierBtn: {
      en: "Share Dossier",
    },
    dossierLinkCopied: {
      en: "Official Sovereign Dossier Link Copied",
    },
    wealthTopPercent: {
      en: "TOP 0.1% WEALTH",
    },
    unlimitedPrivileges: {
      en: "Full Sovereign Access",
    },
    locationLabel: {
      en: "LOCATION",
    },
    locationPlaceholder: {
      en: "e.g. MONACO / ALEXANDRIA / DUBAI",
    },
    microSecurityRibbon: {
      en: "SOVEREIGN ARCHIVE SPECIFICATION · CALIBRE 1% · PROTOCOL VERIFIED",
    },
    hallmarkTooltip: {
      en: "Sovereign Crown Insignia · AU 999.9 Fine Gold",
    },
    statusStanding: {
      en: "SOVEREIGN STANDING",
    },
    editDossierBtn: {
      en: "Edit Dossier",
    },
    editBtnTxt: {
      en: "Edit",
    },
    emptyVault: {
      en: "Your vault is empty. Acquire your first asset from the Boutique.",
    },
    compTierLabel: {
      en: "TIER",
    },
    compVaultLabel: {
      en: "ASSETS",
    },
    compHonorsLabel: {
      en: "HONORS",
    },
    compRegistryLabel: {
      en: "REGISTRY",
    },
    compRegistryVal: {
      en: "EST. 2024",
    },
    compTierSovereign: {
      en: "SOVEREIGN",
    },
    compTierElite: {
      en: "ELITE",
    },
    horoSubdialTier: {
      en: "Apex Calibre",
    },
    horoSubdialVault: {
      en: "Vault Chrono",
    },
    horoSubdialHonors: {
      en: "Honors Quad",
    },
    horoSubdialRegistry: {
      en: "Genesis Dial",
    },
    itemsCollected: {
      en: "ITEMS COLLECTED",
    },
    connections: {
      en: "CONNECTIONS",
    },
    sinceDate: {
      en: "Aug 2026",
    },
    historySectionTitle: {
      en: "MEMBERSHIP CHRONICLE & GENESIS",
    },
    historySectionSub: {
      en: "Official Certified Archive of Induction",
    },
    authenticatedSeal: {
      en: "AUTHENTICATED ARCHIVE",
    },
    inductionDateLabel: {
      en: "DATE OF INDUCTION",
    },
    inductionDateValue: {
      en: "18 AUGUST 2026",
    },
    inductionTimeProtocol: {
      en: "Genesis Induction Protocol I • 04:12 UTC",
    },
    registryNumberLabel: {
      en: "SOVEREIGN REGISTRY NO.",
    },
    recordStatusLabel: {
      en: "RECORD STATUS",
    },
    recordStatusValue: {
      en: "Permanently Sealed",
    },
    inductionTierLabel: {
      en: "INDUCTION TIER",
    },
    inductionTierValue: {
      en: "Sovereign Member",
    },
    tenureLabel: {
      en: "SENIORITY & TENURE",
    },
    tenureValue: {
      en: "Genesis Cycle • Founder Class",
    },
    timelineTitle: {
      en: "HISTORICAL PROVENANCE",
    },
    event1Title: {
      en: "Genesis Admission Ratified",
    },
    event1Desc: {
      en: "Sovereign Master Card minted and induction sealed by the Founding Council.",
    },
    event2Title: {
      en: "Credential Hallmarking & Vault Allocation",
    },
    event2Desc: {
      en: "Biometric key bound; Sovereign Boutique balance credit assigned.",
    },
    event3Title: {
      en: "Active Sovereign Standing",
    },
    event3Desc: {
      en: "Full access granted to closed lounges, private councils, and boutique acquisitions.",
    },
    archiveHallmark: {
      en: "THE 1% CLUB • ARCHIVAL REGISTRY OF SOVEREIGN SOULS • GENESIS CLASS",
    },
    deedSealText: {
      en: "SIGILLUM SOVEREIGN • ARCHIVE SECURE",
    },
    deedAuthenticityLabel: {
      en: "DEED OF SOVEREIGN INDUCTION",
    },
    verifyDeedBtn: {
      en: "VERIFY OFFICIAL SEAL",
    },
    deedVerifiedToast: {
      en: "Sovereign Deed verified against immutable Club Ledger.",
    },
    oathSectionTitle: {
      en: "SOVEREIGN OATH & DECREE",
    },
    oathSectionBadge: {
      en: "DIPLOMATIC IMMUNITY • LEVEL I",
    },
    oathMotto: {
      en: "PRIVATE WEALTH. PRIVATE SOCIETY.",
    },
    oathPreamble: {
      en: "By virtue of induction into THE 1% CLUB, the Sovereign Member enters into this immutable pact of silence, honor, and sovereign fraternity.",
    },
    oathPillar1Title: {
      en: "I. LEX SILENTII — ABSOLUTE DISCRETION",
    },
    oathPillar1Desc: {
      en: "All deliberations, councils, and acquisitions behind sealed club portals remain inviolable and forever confidential.",
    },
    oathPillar2Title: {
      en: "II. PACTUM DIGNITATIS — SOVEREIGN FELLOWSHIP",
    },
    oathPillar2Desc: {
      en: "Upholding supreme decorum, recognizing peer sovereign dignity, and preserving the rarefied stature of the Club above all.",
    },
    oathPillar3Title: {
      en: "III. SANCTITAS GAZAE — VAULT INTEGRITY",
    },
    oathPillar3Desc: {
      en: "Preserving the cryptographic authenticity of vaulted heirlooms and honoring the sovereign heritage of personal prestige.",
    },
    oathSignetTitle: {
      en: "RATIFIED VIA SOVEREIGN SIGNET",
    },
    oathSignetReaffirm: {
      en: "REAFFIRM OATH",
    },
    oathReaffirmedToast: {
      en: "The Sovereign Oath of Discretion has been solemnly reaffirmed in the Club Archives.",
    },
    reliquaryTitle: {
      en: "THE IMPERIAL MUSEUM OF SOVEREIGN ARTIFACTS",
    },
    reliquarySub: {
      en: "Royal Conservatory · Curated Provenance Archives",
    },
    reliquaryCountLabel: {
      en: "Artifacts",
    },
    reliquaryStatusSecured: {
      en: "CONSERVATORY INTEGRITY: 100% SECURED ✦",
    },
    certTitle: {
      en: "OFFICIAL PATENT OF SOVEREIGN PROVENANCE",
    },
    certSubTitle: {
      en: "IMPERIAL CURATORIAL ARCHIVES · GENEVA & ST. MORITZ",
    },
    certSvgInscription: {
      en: "✦ IMMUTABLE SOVEREIGN PATENT OF PROVENANCE • GENEVA & ST. MORITZ ✦",
    },
    museumExhibitLabel: {
      en: "EXHIBIT №",
    },
    museumInspectBtn: {
      en: "Inspect Sovereign Patent",
    },
    museumClosePatent: {
      en: "Seal & Close Patent ✦",
    },
    museumCopySerial: {
      en: "Copy Provenance ID",
    },
    museumCopied: {
      en: "Provenance ID Copied",
    },
    museumEmptyTitle: {
      en: "The Sovereign Conservatory Awaits Your First Exhibit",
    },
    museumEmptyDesc: {
      en: "Acquire your first rare sovereign artifact from the Boutique to be archived with an immutable patent of provenance.",
    },
    alloyLabel: {
      en: "Alloy & Material",
    },
    foundryLabel: {
      en: "Atelier & Foundry",
    },
    rarityLabel: {
      en: "Sovereign Tier",
    },
    valueLabel: {
      en: "Estimated Value",
    },
    equippedBadge: {
      en: "EQUIPPED ON IDENTITY",
    },
    vaultedBadge: {
      en: "SAFELY IN VAULT",
    },
    equipAction: {
      en: "Equip to Master Card",
    },
    unequipAction: {
      en: "Return to Sovereign Vault",
    },
    inspectHint: {
      en: "Inspect Certificate",
    },
    solidGoldAlloy: {
      en: "Au 999.9 Solid Gold",
    },
    obsidianTitaniumAlloy: {
      en: "Black Titanium & Obsidian",
    },
    stMoritzFoundry: {
      en: "St. Moritz Master Foundry",
    },
    genevaGuild: {
      en: "Geneva Guild of Horology",
    },
    location: {
      en: "Location",
    },
    commaSeparated: {
      en: "Comma separated",
    },
    editProfile: {
      en: "Edit Profile",
    },
    name: {
      en: "Name",
    },
    username: {
      en: "Username",
    },
    bio: {
      en: "Bio",
    },
    interests: {
      en: "Interests",
    },
    displayName: {
      en: "DISPLAY NAME",
    },
    namePlaceholder: {
      en: "Enter your display name",
    },
    quoteLabel: {
      en: "PROFILE QUOTE",
    },
    quoteText: {
      en: "Discipline. Network. Freedom.",
    },
    quotePlaceholder: {
      en: "Enter your quote",
    },
    quotePreset1: {
      en: "Discipline. Network. Freedom.",
    },
    quotePreset2: {
      en: "Silence is the ultimate luxury.",
    },
    quotePreset3: {
      en: "True wealth is private.",
    },
    quotePreset4: {
      en: "Aut vincere aut mori.",
    },
    avatarLabel: {
      en: "AVATAR URL (OR UPLOAD)",
    },
    upload: {
      en: "UPLOAD",
    },
    saveChanges: {
      en: "SAVE CHANGES",
    },
    circlesTitle: {
      en: "SOVEREIGN CIRCLES & DOMAINS",
    },
    circlesSub: {
      en: "Accredited spheres of interest & influence",
    },
    circlesBadge: {
      en: "ACCREDITED ✦",
    },
    circlesEditBtn: {
      en: "Curate Circles",
    },
    circleAccreditedTitle: {
      en: "SOVEREIGN ACCREDITATION ✦",
    },
    circleAccreditedToast: {
      en: "Officially authenticated & recorded in The 1% Club Sovereign Ledger.",
    },
    circlesEditNotice: {
      en: "Coming Soon • Sovereign Circles curation pending diplomatic clearance",
    },
    circlesModalTitle: {
      en: "ACCREDITED SOVEREIGN CIRCLES",
    },
    circlesModalDesc: {
      en: "Select up to 5 domains that reflect your sovereign prestige, investments, and private society passions.",
    },
    circle_pe_venture: {
      en: "Private Equity & Venture",
    },
    circle_badge_pe_venture: {
      en: "ALPHA • VENTURE",
    },
    circle_haute_horlogerie: {
      en: "Haute Horlogerie & Rarities",
    },
    circle_badge_haute_horlogerie: {
      en: "HOROLOGY • RARITY",
    },
    circle_sovereign_ai: {
      en: "Sovereign AI & Deep Tech",
    },
    circle_badge_sovereign_ai: {
      en: "DEEP TECH • AI",
    },
    circle_aviation_yachts: {
      en: "Private Aviation & Superyachts",
    },
    circle_badge_aviation_yachts: {
      en: "FLEET • AERONAUTICS",
    },
    circle_prime_estates: {
      en: "Prime Architectural Estates",
    },
    circle_badge_prime_estates: {
      en: "ESTATE • ASSETS",
    },
    circle_fine_art: {
      en: "High Art & Historic Curations",
    },
    circle_badge_fine_art: {
      en: "FINE ART • CURATION",
    },
    circle_macro_strategy: {
      en: "Global Macro & Sovereign Strategy",
    },
    circle_badge_macro_strategy: {
      en: "SOVEREIGN MACRO",
    },
    circle_royal_equestrian: {
      en: "Thoroughbred & Purebred Equine",
    },
    circle_badge_royal_equestrian: {
      en: "EQUINE • ROYAL",
    },
    infoTitle: {
      en: "Member Info",
    },
    messageBtn: {
      en: "Message",
    },
    addFriendBtn: {
      en: "Add Friend",
    },
    accountBalance: {
      en: "Account Balance",
    },
    addBalance: {
      en: "Add Balance",
    },
    myCollection: {
      en: "My Collection",
    },
    viewAll: {
      en: "View All",
    },
    comingSoon: {
      en: "Coming soon",
    },
    profileUpdated: {
      en: "Profile Updated",
    },
    email: {
      en: "EMAIL ADDRESS",
    },
    phone: {
      en: "PHONE NUMBER",
    },
    password: {
      en: "NEW PASSWORD",
    },
    updateAccount: {
      en: "UPDATE ACCOUNT",
    },
    editMedallionTip: {
      en: "Click to edit photo and credentials",
    },
    circlesEditTitle: {
      en: "Curate Sovereign Circles",
    },
    copySerialTip: {
      en: "Click to copy authentication serial",
    },
    certCouncilSeal: {
      en: "Irrevocable Authenticated Sovereign Record • Supreme Council",
    },
    beneficiaryLabel: {
      en: "SOVEREIGN BENEFICIARY",
    },
  },
  boutique: {
    id_widget_title: {
      en: "Identity Widget — Master Card",
    },
    id_widget_status: {
      en: "Included — Active",
    },
    allColl: {
      en: "All Collectibles",
    },
    allCollSub: {
      en: "Curated Sovereign Collectibles in Ascending Valuation",
    },
    ownedColl: {
      en: "Owned Collectibles",
    },
    available: {
      en: "Available",
    },
    all: {
      en: "All",
    },
    stars: {
      en: "Stars",
    },
    crowns: {
      en: "Crowns",
    },
    auras: {
      en: "Auras",
    },
    jewelry: {
      en: "Jewelry",
    },
    rare: {
      en: "Rare Artifacts",
    },
    widgets: {
      en: "Widgets",
    },
    crownsSub: {
      en: "Certified Imperial Crowns & Diadems",
    },
    jewelrySub: {
      en: "Signet Rings & Personal Sovereign Seals",
    },
    aurasSub: {
      en: "Radiant Auras for Sovereign Presence",
    },
    starsSub: {
      en: "Sovereign Insignia & Medals of Merit",
    },
    rareSub: {
      en: "Certified Rare Artifacts & Masterpieces",
    },
    artifactsSub: {
      en: "Certified Rare Artifacts & Masterpieces",
    },
    widgetsSub: {
      en: "Sovereign Identity Widget for Your Device Screen",
    },
    rarity1: {
      en: "Exceptional",
    },
    rarity2: {
      en: "Masterpiece",
    },
    rarity3: {
      en: "Sovereign Relic",
    },
    rarity4: {
      en: "Apex Singular",
    },
    curatorialTitle: {
      en: "Private Curatorial Chamber",
    },
    metalAlloy: {
      en: "Alloy & Material",
    },
    sovereignWeight: {
      en: "Sovereign Weight",
    },
    requiredStanding: {
      en: "Required Standing",
    },
    tierQualified: {
      en: "Eligible Standing ✓",
    },
    tierLocked: {
      en: "Requires {0}",
    },
    tierRestrictedToast: {
      en: "This artifact is reserved for {0} standing and above.",
    },
    equipAction: {
      en: "Equip to Master Card",
    },
    unequipAction: {
      en: "Unequip from Identity",
    },
    valuation: {
      en: "Valuation",
    },
    provenance: {
      en: "Historical Provenance",
    },
    acquireAction: {
      en: "Acquire Artifact",
    },
    equip: {
      en: "Equip",
    },
    unequip: {
      en: "Unequip",
    },
    ownedCheck: {
      en: "Owned ✓",
    },
    equippedCheck: {
      en: "Equipped ✓",
    },
    owned: {
      en: "Owned",
    },
    acquire: {
      en: "Acquire",
    },
    noItems: {
      en: "No Collectibles",
    },
    noFilterMatch: {
      en: "No items match the current filter.",
    },
    close: {
      en: "Close",
    },
    widgetIdentity: {
      en: "Widget — Core Identity Card",
    },
    freeActivated: {
      en: "Free — Activated",
    },
    purchaseSuccess: {
      en: "Purchase Successful",
    },
    depositBalance: {
      en: "Deposit Balance",
    },
    depositTitle: {
      en: "Sovereign Balance Deposit",
    },
    depositDesc: {
      en: "Select a private liquidity package to expand your acquisitions",
    },
    deposit10k: {
      en: "Sovereign Tier — $10,000",
    },
    deposit25k: {
      en: "Platinum Tier — $25,000",
    },
    deposit50k: {
      en: "Apex Titan Tier — $50,000",
    },
    txSuccess: {
      en: "Transaction Successful",
    },
    paymentApplied: {
      en: "Payment applied. Your new balance:",
    },
    free: {
      en: "Free",
    },
    includedFree: {
      en: "Included Free",
    },
    affordability: {
      en: "Purchasing Power",
    },
    bheTitle: {
      en: "THE PRIVATE COLLECTION · SOVEREIGN SALON",
    },
    curatorialEyebrow: {
      en: "THE PRIVATE COLLECTION · SOVEREIGN SALON",
    },
  },
  honors: {
    officialStatusBadge: {
      en: "✦ Officially Authenticated",
    },
    locked: {
      en: "LOCKED",
    },
    earned: {
      en: "EARNED",
    },
    unlocked: {
      en: "HONORS UNLOCKED",
    },
    tierProgress: {
      en: "TIER PROGRESS",
    },
    remaining: {
      en: "${0} REMAINING",
    },
    desc_initiate: {
      en: "Boutique threshold: $5,000 cumulative spend.",
    },
    desc_connoisseur: {
      en: "Boutique threshold: $25,000 cumulative spend.",
    },
    desc_high_sovereign: {
      en: "Boutique threshold: $50,000 cumulative spend.",
    },
    desc_apex_titan: {
      en: "Boutique threshold: $100,000 cumulative spend.",
    },
    initiate: {
      en: "THE INITIATE",
    },
    connoisseur: {
      en: "THE CONNOISSEUR",
    },
    high_sovereign: {
      en: "HIGH SOVEREIGN",
    },
    apex_titan: {
      en: "THE APEX TITAN",
    },
    title_initiate: {
      en: "FIRST STEP",
    },
    title_connoisseur: {
      en: "COLLECTOR",
    },
    title_high_sovereign: {
      en: "ELITE STATUS",
    },
    title_apex_titan: {
      en: "MAXIMUM PRESTIGE",
    },
    heraldicRegistryTitle: {
      en: "SOVEREIGN HERALDIC HONORS & ORDERS",
    },
    chancellerySub: {
      en: "CHANCELLERIE DES ORDRES • CITATIONS OF PRESTIGE",
    },
    ribbonRackLabel: {
      en: "DIPLOMATIC SERVICE RIBBON RACK",
    },
    chancelleryDecree: {
      en: "PATENT OF SOVEREIGN CONFERRAL",
    },
    conferralStatus: {
      en: "CONFERRAL STATUS",
    },
    conferralCriteria: {
      en: "REQUIRED BENCHMARK",
    },
    bestowed: {
      en: "BESTOWED & CONFERRED ✦",
    },
    pendingConferral: {
      en: "PENDING BENCHMARK",
    },
    inspectCitation: {
      en: "TAP TO INSPECT PATENT DECREE",
    },
    ord_initiate: {
      en: "ORD. I • THE ORDER OF THE INITIATE",
    },
    ord_connoisseur: {
      en: "ORD. II • THE ORDER OF THE CONNOISSEUR",
    },
    ord_high_sovereign: {
      en: "ORD. III • THE HIGH SOVEREIGN COLLAR",
    },
    ord_apex_titan: {
      en: "ORD. IV • THE APEX TITAN GRAND STAR",
    },
    chancelleryCitation_initiate: {
      en: "“By virtue of the Sovereign Charter, this Cross of Initiation is bestowed upon the Member for establishing their premier accredited acquisition in the Private Boutique.”",
    },
    chancelleryCitation_connoisseur: {
      en: "“Conferred in solemn recognition of exquisite discernment and the curation of three Sovereign Antiquities within the private reliquaries.”",
    },
    chancelleryCitation_high_sovereign: {
      en: "“The High Sovereign Collar is conferred upon leaders whose profound patronage and cumulative treasury commitments surpass the elevated hallmark of fifty thousand units.”",
    },
    chancelleryCitation_apex_titan: {
      en: "“The Supreme Star of the Apex Titan represents the pinnacle of sovereign distinction, reserved exclusively for the vanguard whose legendary standing commands timeless honor.”",
    },
  },
  settings: {
    resetDefaults: {
      en: "Reset to Defaults",
    },
    resetSuccessToast: {
      en: "App preferences reset to sovereign defaults",
    },
    logout: {
      en: "Logout",
    },
    logoutConfirmTitle: {
      en: "Confirm Logout",
    },
    logoutConfirmDesc: {
      en: "Are you sure you want to terminate your session?",
    },
    cancel: {
      en: "Cancel",
    },
    theme_title: {
      en: "Theme Mode",
    },
    theme_dark: {
      en: "Obsidian Dark",
    },
    theme_light: {
      en: "Imperial Light",
    },
    title: {
      en: "Settings",
    },
    language: {
      en: "Language",
    },
    interfaceLang: {
      en: "Interface language",
    },
    notif: {
      en: "Private Notifications",
    },
    notifDesc: {
      en: "Exclusive club alerts",
    },
    haptic: {
      en: "Tactile Haptics",
    },
    hapticDesc: {
      en: "Micro-haptic impulse feedback",
    },
    soundscape: {
      en: "Horological Soundscape",
    },
    soundscapeDesc: {
      en: "Mechanical clicks, chimes & repeater tones",
    },
    soundMutedToast: {
      en: "Horological soundscape muted",
    },
    soundUnmutedToast: {
      en: "Horological soundscape unmuted",
    },
    soundToggleMute: {
      en: "Mute Soundscape",
    },
    soundToggleUnmute: {
      en: "Unmute Soundscape",
    },
    gyroscope_title: {
      en: "Gyroscope 3D Tilt",
    },
    gyroscope_desc: {
      en: "Physical tilt response for cards & glass plaques",
    },
    gyroscope_enabled: {
      en: "Gyroscope 3D tilt activated",
    },
    gyroscope_disabled: {
      en: "Gyroscope 3D tilt disabled",
    },
    stealth: {
      en: "Stealth Mode",
    },
    stealthDesc: {
      en: "Hide public ID online",
    },
    privacyMenu: {
      en: "Notifications, privacy",
    },
    stealthActiveToast: {
      en: "Stealth Mode Activated — Public identity masked",
    },
    stealthDisabledToast: {
      en: "Stealth Mode Deactivated — Public identity visible",
    },
    notifActiveToast: {
      en: "VIP Notifications enabled",
    },
    notifDisabledToast: {
      en: "VIP Notifications muted",
    },
  },
  misc: {
    discipline: {
      en: "DISCIPLINE",
    },
    network: {
      en: "NETWORK",
    },
    freedom: {
      en: "FREEDOM",
    },
    supportTitle: {
      en: "CONCIERGE & SUPPORT",
    },
    linkCopied: {
      en: "Link Copied to Clipboard",
    },
    changesSaved: {
      en: "Changes saved successfully",
    },
    sovereign: {
      en: "Sovereign",
    },
    elite: {
      en: "Elite",
    },
    member: {
      en: "Member",
    },
    rarity1: {
      en: "Exceptional",
    },
    rarity2: {
      en: "Masterpiece",
    },
    rarity3: {
      en: "Sovereign Relic",
    },
    rarity4: {
      en: "Apex Singular",
    },
    supportDesc: {
      en: "Welcome to the Sovereign Concierge. Our private desk is available 24/7 for members.",
    },
    contactSupport: {
      en: "CONTACT CONCIERGE",
    },
    conciergeSuccess: {
      en: "Concierge request submitted. A private agent will contact you shortly.",
    },
    widgetInstalledToast: {
      en: "Sovereign Identity Widget installed to your device home screen.",
    },
    faq: {
      en: "FREQUENTLY ASKED QUESTIONS",
    },
    faq1q: {
      en: "How are milestones earned?",
    },
    faq1a: {
      en: "Milestones unlock automatically based on your cumulative Boutique acquisitions and profile authentication.",
    },
    faq2q: {
      en: "Can I change my Sovereign ID?",
    },
    faq2a: {
      en: "Your Sovereign ID is permanently linked to your genesis record and cannot be altered.",
    },
    prestige: {
      en: "PRESTIGE & HONORS",
    },
  },
  dynamic: {
    sovereign: {
      en: "SOVEREIGN",
    },
    free: {
      en: "Free",
    },
    affordability: {
      en: "Purchasing Power",
    },
    equippedAuto: {
      en: "✨ Automatically Equipped",
    },
    dropToClose: {
      en: "Drop to close",
    },
    noEquipped: {
      en: "No items equipped",
    },
    addFriendSoon: {
      en: "Add Friend — Coming Soon",
    },
    wealth: {
      en: "Wealth",
    },
    connections: {
      en: "Connections",
    },
    week1: {
      en: "Week 1",
    },
    week2: {
      en: "Week 2",
    },
    week3: {
      en: "Week 3",
    },
    current: {
      en: "Current",
    },
    msgsLeft: {
      en: "Remaining messages today: ",
    },
    equipIdentity: {
      en: "Equip Identity",
    },
    buy: {
      en: "Buy",
    },
    loreDefault: {
      en: "A piece crafted with rare skill, pulsing with a history of power and sovereignty. Whoever possesses it writes their own legacy.",
    },
    loreCrown: {
      en: "A sovereign crown symbolizing the pinnacle. Crafted to be a distinctive mark for those who lead and do not follow.",
    },
    loreAura: {
      en: "A rare aura radiating hidden power. Gives your presence in the club a weight that cannot be ignored.",
    },
    loreRing: {
      en: "A ring carved with ultimate precision from precious metals. Bears the 1% seal and represents absolute loyalty to success.",
    },
    lorePendant: {
      en: "A unique pendant passed down by elites. Symbolizes exclusivity and wealth that is felt, not just seen.",
    },
    loreArtifact: {
      en: "A legendary artifact possessed only by the few. Whoever acquires it inscribes their legacy in the club's records forever.",
    },
    loreStar: {
      en: "A shining star of privilege highlighting your status among members. Irrefutable proof of your superiority and achievements.",
    },
    chatHelp1: {
      en: "Welcome {0}. The concierge desk is at your disposal, how may I assist you?",
    },
    chatHelp2: {
      en: "We are here to ensure a hassle-free sovereign experience. Please state your request.",
    },
    chatGreet1: {
      en: "Good evening {0}. We are here monitoring market updates and latest developments.",
    },
    chatGreet2: {
      en: "Welcome to the Lounge. We are currently discussing some closed investment opportunities.",
    },
    chatGreet3: {
      en: "Greetings. We are here, go ahead {0}.",
    },
    chatInvest1: {
      en: "Dubai's real estate market offers excellent sovereign opportunities right now.",
    },
    chatInvest2: {
      en: "Markets are witnessing unprecedented movements. Focus should be on hard assets.",
    },
    chatInvest3: {
      en: "We are currently studying a new hedge fund. I'd be glad to discuss details with you later {0}.",
    },
    chatBoutique1: {
      en: "Rare watches and art pieces represent the true safe haven for assets.",
    },
    chatBoutique2: {
      en: "The boutique showcases sovereign pieces worth attention. Don't miss the opportunity {0}.",
    },
    chatBoutique3: {
      en: "Absolute rarity is what determines the true value of any piece.",
    },
    chatDefault1: {
      en: "An interesting perspective {0}. We agree with this direction.",
    },
    chatDefault2: {
      en: "Certainly. Calculated decisions are what distinguish the members of this club.",
    },
    chatDefault3: {
      en: "I completely agree with you. Quality and authenticity always prove themselves over time.",
    },
  },
  items: {
    activeMember: {
      en: "Active club member",
    },
    designTech: {
      en: "Design · Technology",
    },
    dubai: {
      en: "Dubai, UAE",
    },
    // --- CROWNS ---
    crown1: {
      en: "Imperial Obsidian Crown",
    },
    crown1_lore: {
      en: "Forged in darkened titanium with hand-burnished 24k gold acanthus leaves and set with a raw Brazilian onyx cabochon at the brow. A symbol of impenetrable authority.",
    },
    crown2: {
      en: "Diadem of the Sovereign Sol",
    },
    crown2_lore: {
      en: "Engine-turned radial fluting crafted from antique gold alloys. Captures the sovereign dawn over private estates, set with micro-pavé diamonds along the interior rim.",
    },
    crown3: {
      en: "Apex St. Moritz Coronet",
    },
    crown3_lore: {
      en: "Haute joaillerie frosted platinum coronet with architectural spires. Commissioned for Alpine summits and closed winter galas of the Founding Circle.",
    },
    crown4: {
      en: "Celestial Zenith Imperial Crown",
    },
    crown4_lore: {
      en: "The paramount imperial artifact of THE 1% CLUB. Double sovereign arches carved in 24k gold, bearing the Sovereign Eagle crest and cabochon Colombian emeralds.",
    },

    // --- RINGS & SIGNETS ---
    ring1: {
      en: "Sovereign Monogram Signet",
    },
    ring1_lore: {
      en: "A heavyweight octagonal signet ring in solid 18k yellow gold. The face is hand-engraved with the 1% Sovereign Monogram and mirror-beveled flanks.",
    },
    ring2: {
      en: "Black Onyx Intaglio Signet",
    },
    ring2_lore: {
      en: "Cushion-cut Brazilian black onyx intaglio framed by a fluted champagne gold bezel. Bears the covert seal used to authenticate private sovereign contracts.",
    },
    ring3: {
      en: "Falcon Emerald Sovereign Signet",
    },
    ring3_lore: {
      en: "Deep forest octagonal emerald-cut gem held by sovereign gold claws, flanked by hand-chiseled heraldic falcon wings with realistic depth.",
    },
    ring4: {
      en: "Apex Chrono Horology Band",
    },
    ring4_lore: {
      en: "Horology-grade knurled 18k rose gold ring with a polished obsidian core and micro-engraved Roman numerals. Inspired by grand complication bezels.",
    },

    // --- AURAS ---
    aura1: {
      en: "Champagne Radial Halo",
    },
    aura1_lore: {
      en: "A subtle concentric micro-etched gold halo with radiating tick lines and warm specular backlight, projecting quiet prestige around the portrait.",
    },
    aura2: {
      en: "Guilloché Solar Corona",
    },
    aura2_lore: {
      en: "Engine-turned interlocking concentric guilloché wave emanating like fine watch dial craftsmanship, ringed by a polished golden perimeter.",
    },
    aura3: {
      en: "Obsidian Eclipse Crest",
    },
    aura3_lore: {
      en: "Deep obsidian shadow core framed by razor-sharp gold edge refraction. Gives your sovereign card an imposing presence of impenetrable wealth.",
    },
    aura4: {
      en: "Celestial Apex Radiance",
    },
    aura4_lore: {
      en: "Dual-ring sovereign gold corona infused with clusters of golden stardust and slow breathing luminescence. The highest visual distinction of the Club.",
    },

    // --- STARS ---
    star1: {
      en: "Order of the Sovereign Star",
    },
    star1_lore: {
      en: "An 8-pointed multi-beveled faceted 24k gold star with polished specular facets and central 1% diamond seal. The foundational insignia of merit.",
    },
    star2: {
      en: "Grand Cross Medallion Star",
    },
    star2_lore: {
      en: "A 12-pointed heraldic star with an engraved sunburst and polished gold central orb, layered over frosted silver rays with sovereign hallmarks.",
    },
    star3: {
      en: "Constellation of the One",
    },
    star3_lore: {
      en: "Geometric pierced gold star with hand-finished chamfered edges, brushed face, and a central royal sapphire cabochon accent.",
    },
    star4: {
      en: "Zenith Diamond Star",
    },
    star4_lore: {
      en: "Multi-faceted diamond-cut platinum star with champagne gold rim and radiant specular sparkles, reserved strictly for executive leaders.",
    },

    // --- RARE ARTIFACTS & RELICS ---
    art1: {
      en: "Haute Horlogerie Pocket Relic",
    },
    art1_lore: {
      en: "Openwork sovereign tourbillon movement with engraved gold bridges, blued Breguet hands, guilloché chapter ring, and heavy ribbed onion crown.",
    },
    art2: {
      en: "The Sovereign Gold Seal",
    },
    art2_lore: {
      en: "Heavyweight desktop seal cast in solid brass and obsidian with the 1% crest engraved in reverse on the base. Destined to stamp immutable decrees.",
    },
    art3: {
      en: "Imperial Falcon Medallion",
    },
    art3_lore: {
      en: "Solid 24k gold medallion featuring the sovereign falcon with outstretched wings, suspended from a woven silk ribbon with a fluted gold clasp.",
    },
    art4: {
      en: "Sovereign Scepter",
    },
    art4_lore: {
      en: "Solid obsidian shaft with 24k chiseled gold capitulum and natural sapphire apex. The definitive symbol of supreme authority inside THE 1% CLUB.",
    },

    // --- WIDGET ---
    wid1: {
      en: "Sovereign Master Card Widget",
    },
    wid1_lore: {
      en: "The Master Card adapted into an authentic mobile widget with obsidian surface, guilloché engraving, and physical gold bezel.",
    },

    // Legacy backwards compatibility aliases
    rare1: {
      en: "Haute Horlogerie Pocket Relic",
    },
    rare2: {
      en: "The Sovereign Gold Seal",
    },
    rare3: {
      en: "Imperial Falcon Medallion",
    },
    rare4: {
      en: "Sovereign Scepter",
    },
    widget1: {
      en: "Sovereign Master Card Widget",
    },
    widget2: {
      en: "Master Card Widget",
    },
  },
  memberDossier: {
    councilBadge: {
      en: "Sovereign Council • Roll of Honor",
    },
    closeTip: {
      en: "Close dossier & return to honor roll",
    },
    standingTier: {
      en: "Sovereign Standing",
    },
    registryTitle: {
      en: "Certified Sovereign Registry Records",
    },
    charterLabel: {
      en: "Membership Charter",
    },
    charterValue: {
      en: "Special Sovereign Charter • Perpetual",
    },
    inaugurationDateLabel: {
      en: "Induction Date",
    },
    inaugurationDateValue: {
      en: "EST. 2024 • Founding Member",
    },
    verificationProtocol: {
      en: "Verification Protocol",
    },
    chamberAccess: {
      en: "Council Access Standing",
    },
    chamberAccessValue: {
      en: "Unrestricted Access to Private Salons",
    },
    honorsTitle: {
      en: "Insignia & Sovereign Honors Regalia",
    },
    crownArtifact: {
      en: "Sovereign Crown",
    },
    ringArtifact: {
      en: "Gold Signet",
    },
    medalArtifact: {
      en: "Medal of Honor",
    },
    sealArtifact: {
      en: "Sovereign Seal",
    },
  },
  auth: {
    loginTab: {
      en: "Sign In",
    },
    registerTab: {
      en: "Create Account",
    },
    loginTitle: {
      en: "Sign In",
    },
    loginDesc: {
      en: "Exclusive access portal for Sovereign Club members",
    },
    registerTitle: {
      en: "Create Sovereign Account",
    },
    registerDesc: {
      en: "Join the elite circle and establish your sovereign identity",
    },
    continueGoogle: {
      en: "Continue with Google",
    },
    registerGoogle: {
      en: "Sign Up with Google",
    },
    orEmail: {
      en: "Or via email",
    },
    emailLabel: {
      en: "Email Address",
    },
    passwordLabel: {
      en: "Password",
    },
    forgotPassword: {
      en: "Forgot password?",
    },
    loginSubmit: {
      en: "Sign In",
    },
    registerSubmit: {
      en: "Create Account & Join",
    },
    noAccountPrompt: {
      en: "Don't have an account?",
    },
    haveAccountPrompt: {
      en: "Already have an account?",
    },
    createAccountLink: {
      en: "Create New Account",
    },
    loginLink: {
      en: "Sign In",
    },
    footerTag: {
      en: "❖ Encrypted Sovereign Verification • The 1% Club",
    },
    recoveryTitle: {
      en: "Password Recovery",
    },
    recoveryDesc: {
      en: "Enter your registered email and we will send a password reset link immediately.",
    },
    sendRecoveryLink: {
      en: "Send Recovery Link",
    },
    recoverySentSuccess: {
      en: "Password recovery instructions sent to your email successfully.",
    },
  },
};

// Sovereign Translation Helpers (English-Only LTR)
function getNestedValue(obj, path) {
  if (!obj || !path) return null;
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

window.t = function (key, lang = 'en') {
  if (!key) return '';
  let item = getNestedValue(window.I18N, key);
  if (!item && typeof key === 'string' && key.startsWith('items.')) {
    item = getNestedValue(window.I18N, key.replace(/^items\./, ''));
  }
  if (item) {
    if (typeof item === 'string') return item;
    if (item.en) return item.en;
  }
  return key;
};

window.getTranslation = window.t;

window.setLanguage = function (lang) {
  window.currentLang = 'en';
  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.setAttribute('lang', 'en');
    document.documentElement.setAttribute('dir', 'ltr');
  }
};

window.applyTranslations = function () {
  if (typeof document === 'undefined') return;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const translated = window.t(key, 'en');
    if (translated && translated !== key) {
      if (el.children.length === 0) {
        el.textContent = translated;
      }
    }
  });
};
