import type { Dict } from "./types";

const it: Dict = {
  nav: {
    home: "Home",
    channels: "Canali",
    guide: "Installazione",
    blog: "Guide",
    faq: "FAQ",
    contact: "Contatti",
    cta: "Vedi i piani",
    menu: "Apri il menu",
    language: "Lingua",
  },
  footer: {
    tagline:
      "IPTV Headend è un servizio IPTV per TV in diretta, film e serie in HD e 4K — pronto in pochi minuti sui dispositivi che hai già.",
    explore: "Esplora",
    help: "Assistenza",
    legal: "Note legali",
    terms: "Termini e condizioni",
    privacy: "Privacy",
    refund: "Rimborsi",
    rights: "Tutti i diritti riservati.",
    disclaimer:
      "Tutti i nomi di prodotti e app citati appartengono ai rispettivi proprietari e sono usati solo per indicare la compatibilità. IPTV Headend non è affiliato ad alcun produttore, sviluppatore o emittente.",
  },
  common: {
    seePlans: "Vedi i piani",
    setupGuide: "Guida all'installazione",
    readMore: "Leggi l'articolo",
    readGuide: "Leggi la guida",
    contactUs: "Contatta l'assistenza",
    whatsapp: "Scrivici su WhatsApp",
    minRead: "min di lettura",
    updated: "Aggiornato il",
    backToBlog: "Torna alle guide",
    home: "Home",
    relatedTitle: "Continua a leggere",
    tocTitle: "In questa pagina",
    faqShort: "Risposte rapide",
  },
  home: {
    meta: {
      title: "IPTV Italia | Il miglior IPTV in 4K da 13,67 € – IPTV Headend",
      description:
        "Abbonamenti IPTV per l'Italia: canali in diretta, film e serie in HD e 4K su Smart TV, Fire TV Stick, smartphone e PC. Installazione in pochi minuti, assistenza reale, nessun vincolo.",
    },
    hero: {
      eyebrow: "IPTV Italia · Abbonamenti 2026",
      title: "Il miglior IPTV per TV in diretta, film e serie",
      titleAccent: "in 4K, su ogni schermo.",
      lead:
        "IPTV Headend è l'**IPTV Italia** che funziona e basta: migliaia di canali in diretta, un enorme catalogo on demand e streaming fluido in **4K** su Smart TV, chiavetta, smartphone o computer. Scegli il piano, ricevi i dati di accesso e inizia a guardare.",
      ctaPrimary: "Vedi piani e prezzi",
      ctaSecondary: "Come si installa",
      chips: ["4K & Full HD", "Con ogni app IPTV", "-15% con bonifico o crypto", "Assistenza vera"],
      imageAlt: "Amici che esultano davanti a un grande televisore con sport in diretta",
      floatA: "In diretta",
      floatB: "Pronto in pochi minuti",
    },
    stats: [
      { value: "47K+", label: "Canali in diretta" },
      { value: "180K+", label: "Film e serie" },
      { value: "4K UHD", label: "Qualità d'immagine" },
      { value: "9+", label: "Tipi di dispositivo" },
    ],
    intro: {
      kicker: "Cos'è l'IPTV?",
      title: "La TV via Internet, senza parabola né decoder",
      paragraphs: [
        "**IPTV** significa Internet Protocol Television: i canali arrivano attraverso la tua connessione Internet invece che via satellite o antenna. Un'app su TV, chiavetta, telefono o computer riceve lo streaming — così la tua TV ti segue ovunque.",
        "Non serve nuovo hardware: installa un player IPTV come IPTV Smarters Pro o TiviMate, inserisci i dati che ti inviamo (login Xtream Codes o link M3U) e guarda. Per scegliere bene, leggi [Il miglior IPTV in Italia](/blog/miglior-iptv-italia).",
        "Canali italiani, europei o internazionali: un solo abbonamento per tutti i tuoi schermi.",
      ],
    },
    features: {
      kicker: "Perché IPTV Headend",
      title: "Tutto ciò che ti aspetti dalle IPTV migliori",
      lead:
        "Confrontare le **IPTV migliori** è difficile, perché promettono tutte le stesse cose. Ecco cosa ottieni davvero con IPTV Headend.",
      items: [
        {
          icon: "tv",
          title: "Un'enorme offerta live",
          text: "News, sport, intrattenimento, bambini e musica da Italia, Europa e mondo, con guida TV (EPG).",
        },
        {
          icon: "film",
          title: "Film e serie on demand",
          text: "Un grande catalogo diviso per genere, aggiornato regolarmente.",
        },
        {
          icon: "bolt",
          title: "Streaming 4K stabile",
          text: "Server bilanciati per le serate affollate e i grandi eventi live. Premium aggiunge server anti-buffering e più canali 4K.",
        },
        {
          icon: "cogs",
          title: "Funziona con ogni player",
          text: "IPTV Smarters Pro, TiviMate, Smarters Player Lite, Kodi, VLC o MAG: accesso Xtream Codes e lista M3U inclusi.",
        },
        {
          icon: "headset",
          title: "Assistenza che risponde",
          text: "Bloccato nell'installazione? Scrivici su WhatsApp o via e-mail: una persona vera ti guida, di solito entro 1–2 ore.",
        },
        {
          icon: "shield-alt",
          title: "Prezzi chiari",
          text: "Nessun vincolo né costi nascosti. 1, 3, 6 o 12 mesi — e il 15% di sconto con bonifico o crypto.",
        },
      ],
    },
    categories: {
      kicker: "Canali",
      title: "C'è qualcosa per tutta la famiglia",
      lead: "Il tuo abbonamento è organizzato in categorie chiare. Panoramica completa nella pagina [canali](/channels).",
      items: [
        { key: "sport", title: "Sport", text: "Calcio, basket, tennis, motori, sport da combattimento e altro — in diretta." },
        { key: "movie", title: "Film", text: "Canali cinema e un ricco catalogo on demand di ogni genere." },
        { key: "news", title: "Informazione", text: "Notizie 24 ore su 24, economia e attualità da Italia, Europa e mondo." },
        { key: "kids", title: "Bambini e famiglia", text: "Cartoni, programmi educativi e intrattenimento per famiglie, con PIN parentale." },
        { key: "entertainment", title: "Intrattenimento", text: "Reality, fiction, varietà e comicità." },
        { key: "music", title: "Musica", text: "Hit, concerti e canali tematici." },
      ],
      cta: "Vedi tutte le categorie",
    },
    sports: {
      kicker: "Sport live",
      title: "Ogni partita, senza buffering",
      lead:
        "È con lo sport che si riconosce il **miglior IPTV**. I nostri server sono ottimizzati per la diretta: gol, canestri e ultimi giri arrivano fluidi in HD e **4K**.",
      points: [
        { title: "Tutte le grandi competizioni", text: "Calcio, basket, tennis, rugby, motori, sport da combattimento ed eventi pay-per-view." },
        { title: "Feed nazionali e internazionali", text: "Segui l'azione in Italia e in tutta Europa, in più lingue." },
        { title: "Pensato per il live", text: "Bassa latenza e capacità prioritaria con Premium quando tutti si collegano insieme." },
      ],
      chips: ["Calcio", "Basket", "Tennis", "Rugby", "Motori", "MMA & boxe", "Eventi PPV"],
      imageAlt: "Sport in diretta su IPTV",
      badge: "Live",
    },
    vod: {
      kicker: "Film e serie",
      title: "Un catalogo che cresce sempre",
      lead:
        "Oltre ai canali live, il tuo abbonamento include un grande catalogo on demand. Sfoglia per genere, riprendi da dove avevi lasciato e guarda fino in 4K.",
      points: [
        "Nuovi titoli aggiunti regolarmente",
        "Ordinati per genere, anno e lingua",
        "Audio italiano e sottotitoli su molti titoli",
        "Riprendi la visione su più dispositivi (dipende dal player)",
      ],
      pillA: "Consigliati",
      pillB: "180K+ titoli",
    },
    devices: {
      kicker: "Dispositivi e app",
      title: "Guarda sugli schermi che hai già",
      lead: "Se il dispositivo installa app, funziona con IPTV Headend. Segui la nostra [guida all'installazione](/guide).",
      labels: ["Smart TV", "Chiavetta streaming", "Box Android TV", "Smartphone", "Tablet", "Portatile", "PC fisso", "Console", "Proiettore"],
      appsTitle: "Il player IPTV che preferisci",
      appsNote: "Tutte queste app funzionano con i nostri dati di accesso. Per iniziare, leggi [come abbonarsi all'IPTV](/blog/come-abbonarsi-iptv).",
      apps: ["IPTV Smarters Pro", "TiviMate", "Smarters Player Lite", "Kodi", "VLC", "Box MAG / portale"],
    },
    steps: {
      kicker: "Come funziona",
      title: "Dall'ordine alla visione in tre passi",
      items: [
        { title: "Scegli il piano", text: "Standard o Premium per 1, 3, 6 o 12 mesi. Più è lungo, meno costa al mese." },
        { title: "Conferma l'ordine", text: "Nome, e-mail, bonifico o crypto: 15% di sconto automatico. Ti inviamo le istruzioni di pagamento." },
        { title: "Inizia a guardare", text: "Confermato il pagamento, ricevi i dati per e-mail. Inseriscili nella tua app con la [guida](/guide)." },
      ],
    },
    pricing: {
      kicker: "Prezzi",
      title: "Abbonamenti IPTV",
      lead:
        "**IPTV abbonarsi** non è mai stato così semplice. Tutti i piani includono live, film, serie, tutti i dispositivi e assistenza — Premium aggiunge più 4K e server anti-buffering.",
      standard: "Standard",
      premium: "Premium",
      popular: "Il più scelto",
      monthLabel: "1 Mese",
      monthsLabel: "{n} Mesi",
      premiumSuffix: "Premium",
      periods: ["/mese", "/3 mesi", "/6 mesi", "/anno"],
      perMonth: "Solo {price}/mese",
      order: "Ordina ora",
      standardFeatures: [
        "20K+ canali live in HD",
        "120K+ film e serie",
        "Guida TV (EPG)",
        "Tutti i dispositivi",
        "Assistenza WhatsApp & e-mail",
        "Contenuti per adulti opzionali (disattivati)",
      ],
      premiumFeatures: [
        "47K+ canali con 4K/UHD",
        "180K+ film e serie",
        "Server premium anti-buffering",
        "Priorità per lo sport live",
        "Copertura Italia, UE, US/UK",
        "Contenuti per adulti opzionali (disattivati)",
      ],
      payTitle: "Paga come preferisci — e risparmia il 15%",
      payText:
        "Accettiamo **bonifico bancario** e **criptovalute**, entrambi con **15% di sconto** automatico. Dopo l'ordine ricevi via e-mail tutto il necessario per pagare.",
      payMethods: ["Bonifico", "Crypto", "Pagamento sicuro"],
      delivery: "I dati di accesso arrivano dopo la conferma del pagamento — di solito entro 1–3 ore.",
    },
    compare: {
      kicker: "Confronto",
      title: "Servizio IPTV vs liste gratis",
      lead:
        "Molti cercano **liste IPTV funzionanti gratis**. Sembrano allettanti, ma ecco il confronto onesto. Approfondisci in [Liste IPTV funzionanti](/blog/liste-iptv-funzionanti).",
      cols: ["", "IPTV Headend", "Lista gratis"],
      rows: [
        ["Stabilità", "Server monitorati ogni giorno", "Link che smettono di funzionare"],
        ["Guida TV (EPG)", "Inclusa", "Quasi mai"],
        ["4K / UHD", "Sì, con Premium", "Raramente"],
        ["Film e serie", "Grande catalogo", "Pochi o nessuno"],
        ["Aiuto in caso di problemi", "Assistenza WhatsApp & e-mail", "Nessuno"],
        ["Sicurezza", "Fornitore noto, termini chiari", "Fonti sconosciute"],
      ],
    },
    faq: {
      kicker: "FAQ",
      title: "Domande sull'IPTV",
      lead: "Le domande più frequenti. Non trovi la tua? Vai alle [FAQ complete](/faq).",
      more: "Tutte le domande",
    },
    blog: {
      kicker: "Guide",
      title: "L'IPTV spiegata semplice",
      lead: "Guide pratiche per scegliere, installare e ottenere la migliore immagine.",
      all: "Tutti gli articoli",
    },
    cta: {
      title: "Pronto a tagliare il cavo?",
      text: "Scegli il piano oggi e inizia a guardare. Hai domande prima? Siamo qui.",
      primary: "Scegli il piano",
      secondary: "Parla con l'assistenza",
    },
  },
  faqPage: {
    meta: {
      title: "FAQ IPTV: abbonamenti, installazione, pagamenti | IPTV Headend",
      description:
        "Tutte le risposte su IPTV Italia: cos'è, quale app usare, Smart TV, velocità Internet, 4K, pagamenti, rimborsi e legalità.",
    },
    kicker: "Centro assistenza",
    title: "Domande frequenti",
    lead: "Tutto su IPTV Headend, dalla scelta del piano alla migliore immagine. Ancora dubbi? [Contattaci](/contact).",
    groups: [
      {
        title: "Per iniziare",
        items: [
          {
            q: "Cos'è un abbonamento IPTV?",
            a: "Un abbonamento IPTV ti dà accesso a canali in diretta e a un catalogo on demand via Internet. Installi un'app IPTV, inserisci i dati di accesso e guardi sul dispositivo che preferisci.",
          },
          {
            q: "Cosa mi serve?",
            a: "Una connessione stabile, un dispositivo compatibile (Smart TV, chiavetta, box Android, smartphone, tablet o PC) e un'app come IPTV Smarters Pro o TiviMate. La [guida](/guide) spiega ogni dispositivo.",
          },
          {
            q: "Quando ricevo i dati di accesso?",
            a: "Username, password, URL del server e link M3U arrivano via e-mail dopo la conferma del pagamento, di solito entro 1–3 ore. Controlla anche lo spam.",
          },
          {
            q: "Posso provare prima di acquistare?",
            a: "Scrivici su WhatsApp: su richiesta può essere disponibile un breve accesso di prova per verificare la qualità sul tuo dispositivo.",
          },
          {
            q: "Su quanti dispositivi posso guardare?",
            a: "Un abbonamento vale per una connessione alla volta. Puoi installarlo su più dispositivi, ma solo uno deve trasmettere contemporaneamente.",
          },
        ],
      },
      {
        title: "App e dispositivi",
        items: [
          {
            q: "Qual è la migliore app IPTV?",
            a: "IPTV Smarters Pro (gratuita, disponibile quasi ovunque) e TiviMate (ideale su Android TV e Fire TV Stick) sono le più apprezzate. Funzionano anche Kodi, VLC e i box MAG.",
          },
          {
            q: "Funziona sulla mia Smart TV?",
            a: "Sì. La maggior parte delle Smart TV Samsung, LG e Android TV installa un player IPTV dal proprio store. Vedi la [guida](/guide#smart-tv).",
          },
          {
            q: "Posso guardare sul telefono?",
            a: "Certo. Installa un player IPTV su Android o iOS, accedi e guarda in Wi-Fi o con i dati mobili.",
          },
          {
            q: "Che differenza c'è tra M3U e Xtream Codes?",
            a: "Danno accesso agli stessi canali. L'M3U è un unico link; Xtream Codes (URL, utente, password) carica anche guida TV e catalogo in modo più ordinato. Li forniamo entrambi.",
          },
        ],
      },
      {
        title: "Qualità",
        items: [
          {
            q: "Che velocità di Internet serve?",
            a: "Circa 10 Mbps per SD, 20 Mbps per Full HD e 30 Mbps o più per il 4K. La stabilità conta più della velocità: usa cavo Ethernet o Wi-Fi a 5 GHz.",
          },
          {
            q: "Il 4K è incluso?",
            a: "Sì, i piani Premium includono 47K+ canali con ampia scelta in 4K/UHD. Servono uno schermo 4K, un player compatibile e circa 30 Mbps stabili.",
          },
          {
            q: "Perché l'immagine si blocca?",
            a: "Spesso dipende dal Wi-Fi o dalla rete di casa. Riavvia modem e dispositivo, usa il cavo, svuota la cache dell'app. Se continua, [contattaci](/contact).",
          },
          {
            q: "Serve una VPN?",
            a: "No, non è necessaria. Se ne usi una per la privacy, scegli un server veloce e vicino.",
          },
        ],
      },
      {
        title: "Piani, pagamenti e legalità",
        items: [
          {
            q: "Quanto costano gli abbonamenti IPTV?",
            a: "Da 13,67 € per 1 mese; il piano Standard di 12 mesi costa circa 4,13 € al mese. Premium da 23,12 €. Con bonifico o crypto: 15% di sconto in più. [Vedi i piani](/#pricing).",
          },
          {
            q: "Quali metodi di pagamento accettate?",
            a: "Bonifico bancario e criptovalute, con il 15% di sconto. Il pagamento con carta arriverà presto.",
          },
          {
            q: "C'è un vincolo o rinnovo automatico?",
            a: "No. Paghi una volta per il periodo scelto. Nulla viene addebitato automaticamente.",
          },
          {
            q: "Posso avere un rimborso?",
            a: "Sì, entro 7 giorni dall'acquisto se l'abbonamento non è stato usato. Leggi la [politica di rimborso](/RefundPolicy).",
          },
          {
            q: "L'IPTV è legale in Italia?",
            a: "L'IPTV come tecnologia è legale ed è usata anche dagli operatori per le loro offerte TV. La legalità di un servizio dipende dai diritti sui contenuti e dalla normativa applicabile. Ne parliamo in [Liste IPTV funzionanti](/blog/liste-iptv-funzionanti).",
          },
        ],
      },
    ],
    stillTitle: "Hai un'altra domanda?",
    stillText: "La nostra assistenza risponde su WhatsApp e via e-mail, di solito entro 1–2 ore.",
  },
  channels: {
    meta: {
      title: "Canali IPTV: sport, film, news, bambini | IPTV Headend",
      description:
        "Scopri i canali IPTV Headend: sport, film, informazione, bambini, intrattenimento e musica in HD e 4K, con guida TV e catalogo on demand.",
    },
    kicker: "Canali",
    title: "Categorie di canali IPTV",
    lead:
      "Una panoramica di cosa include il tuo abbonamento **IPTV in Italia**. Il numero esatto dipende dal piano: 20K+ canali con Standard, 47K+ con Premium e più 4K.",
    items: [
      { key: "sport", title: "Canali sport", text: "Calcio, basket, tennis, rugby, motori, sport da combattimento ed eventi PPV da tutto il mondo, con zapping veloce.", alt: "Palloni che rappresentano i canali sport" },
      { key: "movie", title: "Canali cinema", text: "Canali di film 24 ore su 24 e un enorme catalogo on demand: azione, commedia, drammatico, thriller, famiglia e classici.", alt: "Popcorn e pellicola per i canali cinema" },
      { key: "news", title: "Canali informazione", text: "Notizie, economia e attualità da Italia, Europa e mondo.", alt: "Giornale e mappamondo per i canali news" },
      { key: "kids", title: "Canali bambini", text: "Cartoni, programmi educativi e intrattenimento per famiglie. Le categorie per adulti si bloccano con un PIN.", alt: "Bambini per i canali bambini" },
      { key: "entertainment", title: "Intrattenimento", text: "Reality, varietà, fiction, comicità e documentari — più le serie del momento on demand.", alt: "Ciak per l'intrattenimento" },
      { key: "music", title: "Canali musica", text: "Hit, concerti e canali tematici dal pop al rock.", alt: "Note musicali per i canali musica" },
    ],
    epgTitle: "Guida TV, replay e altro",
    epgText:
      "Ogni piano include la guida elettronica dei programmi (EPG): il player mostra cosa va in onda ora e dopo. Molti canali offrono anche il replay.\n\nL'offerta viene aggiornata regolarmente e l'app ricarica la lista in automatico. Serve aiuto? Leggi la [guida](/guide) o [scrivici](/contact).",
    ctaTitle: "Sblocca tutti i canali",
    ctaText: "Scegli Standard o Premium e inizia a guardare appena confermato il pagamento.",
  },
  guide: {
    meta: {
      title: "Installare l'IPTV: Fire TV Stick, Smart TV, Android, iPhone, PC | IPTV Headend",
      description:
        "Guida passo passo per installare l'IPTV su Fire TV Stick, Smart TV Samsung e LG, Android, iPhone, Windows, Mac, box MAG e Kodi.",
    },
    kicker: "Guida all'installazione",
    title: "Installa l'IPTV su qualsiasi dispositivo",
    lead: "Scegli il dispositivo e segui i passaggi. Di solito bastano meno di dieci minuti, con i dati della tua e-mail di benvenuto.",
    beforeTitle: "Prima di iniziare",
    before: [
      "La tua **e-mail di benvenuto** con username, password, URL del server e link M3U",
      "Una connessione stabile — idealmente **20 Mbps+** (30 Mbps+ per il 4K)",
      "Un'**app IPTV** (consigliamo IPTV Smarters Pro o TiviMate)",
    ],
    jump: "Vai al tuo dispositivo",
    devices: [
      {
        id: "firestick",
        title: "Fire TV Stick & Fire TV",
        intro: "I dispositivi Fire TV installano la maggior parte dei player IPTV con l'app gratuita Downloader.",
        steps: [
          "Dalla home apri **Cerca**, digita **Downloader** e installa l'app.",
          "Vai su **Impostazioni › La mia Fire TV › Opzioni sviluppatore › Installa app sconosciute** e attiva **Downloader**. (Se il menu non c'è, apri **Informazioni** e clicca 7 volte sul nome del dispositivo.)",
          "Apri Downloader e inserisci l'indirizzo di download del player dal sito ufficiale dello sviluppatore. Se vuoi, ti mandiamo il link su WhatsApp.",
          "Installa il player, aprilo e scegli **Login with Xtream Codes API** (in TiviMate **Aggiungi playlist › Xtream Codes**).",
          "Inserisci **username**, **password** e **URL del server**, poi attendi il caricamento.",
        ],
      },
      {
        id: "android",
        title: "Android: smartphone, tablet, box",
        intro: "Su Android installi IPTV Smarters Pro o TiviMate direttamente dal Play Store.",
        steps: [
          "Apri il **Google Play Store** e cerca **IPTV Smarters Pro** (o **TiviMate** su Android TV).",
          "Installa e apri l'app, poi accetta i termini.",
          "Scegli **Login with Xtream Codes API**.",
          "Inserisci un nome, **username**, **password** e **URL del server**, poi tocca **Add user**.",
          "Dopo il caricamento scegli Live TV, Film o Serie.",
        ],
      },
      {
        id: "ios",
        title: "iPhone, iPad & Apple TV",
        intro: "Sui dispositivi Apple usa un player dell'App Store come Smarters Player Lite.",
        steps: [
          "Apri l'**App Store** e cerca **Smarters Player Lite**.",
          "Installa l'app e scegli **Login with Xtream Codes API**.",
          "Inserisci **username**, **password** e **URL del server**.",
          "Tocca **Add user** e attendi il caricamento dei canali.",
        ],
      },
      {
        id: "smart-tv",
        title: "Smart TV Samsung & LG",
        intro: "Le TV Samsung (Tizen) e LG (webOS) installano un player IPTV dal proprio store.",
        steps: [
          "Premi **Home** e apri lo store (**Apps** su Samsung, **LG Content Store** su LG).",
          "Cerca un player IPTV come **IPTV Smarters Pro** e installalo.",
          "Aprilo e scegli **Login with Xtream Codes API**.",
          "Inserisci i dati di accesso e l'URL del server, poi conferma.",
          "Se l'app mostra un indirizzo MAC o un ID dispositivo, inviacelo per l'attivazione.",
        ],
      },
      {
        id: "pc",
        title: "Windows & Mac",
        intro: "Sul computer puoi usare un player IPTV oppure aprire il link M3U in VLC.",
        steps: [
          "Scarica IPTV Smarters Pro per Windows o macOS dal sito ufficiale dello sviluppatore.",
          "Apri l'app, scegli **Login with Xtream Codes API** e inserisci i dati.",
          "Con VLC: **Media › Apri flusso di rete** e incolla il **link M3U**.",
        ],
      },
      {
        id: "mag",
        title: "Box MAG",
        intro: "I box MAG si collegano tramite un URL portale associato all'indirizzo MAC.",
        steps: [
          "Inviaci l'**indirizzo MAC** riportato sul retro del box (inizia con 00:1A:79).",
          "Apri **Settings › System settings › Servers › Portals**.",
          "Inserisci un nome in **Portal 1 name** e incolla l'**URL del portale** in **Portal 1 URL**.",
          "Salva con **OK** e riavvia il box.",
        ],
      },
      {
        id: "kodi",
        title: "Kodi",
        intro: "Kodi riproduce l'IPTV con l'add-on ufficiale PVR IPTV Simple Client.",
        steps: [
          "Apri Kodi e vai su **TV › Accedi al browser add-on**.",
          "Seleziona **PVR IPTV Simple Client**, poi **Installa** e **Configura**.",
          "In **Generale** scegli **Percorso remoto (indirizzo Internet)** e incolla il **link M3U**.",
          "Facoltativo: in **Impostazioni EPG** incolla il link della guida.",
          "Conferma e riavvia Kodi: i canali compaiono in **TV**.",
        ],
      },
    ],
    playersTitle: "Quale player IPTV scegliere?",
    playersLead: "Funzionano tutti con IPTV Headend. Per orientarti leggi [Il miglior IPTV in Italia](/blog/miglior-iptv-italia).",
    players: [
      { name: "IPTV Smarters Pro", text: "Gratuito, semplice e disponibile quasi ovunque: il miglior punto di partenza." },
      { name: "TiviMate", text: "Il preferito su Android TV e Fire TV Stick grazie alla guida in stile TV. Alcune funzioni sono a pagamento presso lo sviluppatore." },
      { name: "Smarters Player Lite", text: "L'opzione semplice per iPhone, iPad e Apple TV." },
      { name: "Kodi", text: "Media center open source con l'add-on PVR IPTV Simple Client." },
      { name: "VLC", text: "Per provare velocemente la lista M3U sul computer." },
      { name: "Box MAG / portale", text: "Decoder classici con URL portale e indirizzo MAC." },
    ],
    tipsTitle: "Consigli per un'immagine fluida",
    tips: [
      "Usa un **cavo Ethernet** o il **Wi-Fi a 5 GHz**.",
      "Riavvia modem e dispositivo una volta a settimana.",
      "Svuota la cache del player se i canali sono lenti.",
      "Sotto i 30 Mbps scegli **HD** invece del **4K**.",
      "Tieni aggiornata l'app.",
    ],
    helpTitle: "Serve una mano?",
    helpText: "Inviaci il modello del dispositivo e uno screenshot dell'errore: ti guidiamo su WhatsApp o via e-mail.",
  },
  contact: {
    meta: {
      title: "Contatti IPTV Headend | Assistenza IPTV su WhatsApp & e-mail",
      description:
        "Domande su piani, installazione o abbonamento IPTV? Contatta l'assistenza IPTV Headend su WhatsApp o via e-mail — risposta di solito in 1–2 ore.",
    },
    kicker: "Contatti",
    title: "Siamo qui per aiutarti",
    lead: "Domande su un piano, aiuto con l'installazione o un problema di streaming? Scrivici: risponde una persona vera, di solito entro **1–2 ore**.",
    form: {
      title: "Inviaci un messaggio",
      name: "Il tuo nome",
      email: "Indirizzo e-mail",
      message: "Come possiamo aiutarti?",
      namePh: "Mario Rossi",
      emailPh: "tu@esempio.it",
      messagePh: "Indica dispositivo, piano e domanda…",
      send: "Invia messaggio",
      sending: "Invio…",
      success: "Grazie! Il messaggio è stato inviato — rispondiamo entro 1–2 ore. Controlla anche lo spam.",
      error: "Spiacenti, invio non riuscito. Riprova o scrivici su WhatsApp.",
    },
    whatsappTitle: "Il modo più veloce: WhatsApp",
    whatsappText: "Chatta con l'assistenza per l'installazione, i piani o un controllo rapido della linea.",
    emailTitle: "E-mail",
    emailText: "Preferisci l'e-mail? Scrivi a",
    panels: [
      { title: "Guide all'installazione", text: "Istruzioni passo passo per ogni dispositivo nella [guida](/guide)." },
      { title: "FAQ", text: "Risposte rapide su app, pagamenti e buffering nelle [FAQ](/faq)." },
    ],
  },
  blogIndex: {
    meta: {
      title: "Guide IPTV: miglior IPTV, liste funzionanti, abbonamenti | IPTV Headend",
      description: "Qual è il miglior IPTV in Italia, cosa sapere sulle liste IPTV funzionanti e come abbonarsi: le nostre guide pratiche.",
    },
    kicker: "Guide",
    title: "Guide e consigli IPTV",
    lead: "Articoli chiari e onesti per scegliere un servizio IPTV, installare il player e migliorare l'immagine.",
  },
  legal: {
    terms: {
      meta: { title: "Termini e condizioni | IPTV Headend", description: "Le condizioni d'uso del sito e del servizio IPTV Headend." },
      title: "Termini e condizioni",
      intro: "Leggi attentamente questi termini prima di usare il sito o il servizio. Effettuando un ordine li accetti.",
      sections: [
        { h: "Chi siamo", p: ["\"IPTV Headend\", \"noi\" indicano il gestore del sito. \"Tu\" è chi usa il sito o acquista un abbonamento. \"Servizio\" indica il sito e ogni abbonamento fornito."] },
        {
          h: "Il tuo abbonamento",
          p: [
            "L'abbonamento consente a una persona l'accesso per il periodo acquistato, con una connessione alla volta salvo diversa indicazione. I dati di accesso sono personali e non possono essere condivisi o rivenduti.",
            "Sei responsabile di avere dispositivo, app e connessione compatibili e di usare il servizio nel rispetto della legge del tuo Paese.",
          ],
        },
        { h: "Ordini e pagamenti", p: ["Prezzi in euro. Bonifico e crypto hanno automaticamente il 15% di sconto. L'abbonamento inizia dopo la conferma del pagamento e l'invio dei dati."] },
        { h: "Link esterni", p: ["Il sito può rimandare a siti o app di terzi che non controlliamo e di cui non siamo responsabili."] },
        { h: "Sospensione e cessazione", p: ["Possiamo sospendere o interrompere l'accesso senza preavviso in caso di violazione, ad esempio condivisione dei dati di accesso."] },
        { h: "Limitazione di responsabilità", p: ["Nei limiti di legge, non rispondiamo di danni indiretti derivanti dall'uso del servizio, fornito \"così com'è\" e \"secondo disponibilità\". L'offerta dei canali può cambiare."] },
        { h: "Modifiche", p: ["Possiamo aggiornare questi termini. Vale sempre la versione pubblicata su questa pagina."] },
        { h: "Contatti", p: ["Domande? [Contattaci](/contact)."] },
      ],
    },
    privacy: {
      meta: { title: "Privacy | IPTV Headend", description: "Come IPTV Headend raccoglie, usa e protegge i dati personali." },
      title: "Informativa sulla privacy",
      intro: "Questa informativa spiega quali dati raccogliamo, perché e quali sono i tuoi diritti.",
      sections: [
        {
          h: "Dati raccolti",
          p: [
            "Con un ordine o un contatto: nome, e-mail, Paese, piano scelto, metodo di pagamento e contenuto dei messaggi.",
            "Come la maggior parte dei siti, riceviamo anche dati tecnici: indirizzo IP, browser, pagine visitate e orari.",
          ],
        },
        { h: "Utilizzo", p: ["Per gestire gli ordini, inviare i dati di accesso, fornire assistenza, prevenire frodi e migliorare il sito. Possiamo contattarti via e-mail, WhatsApp o telefono riguardo al tuo ordine."] },
        { h: "Cookie", p: ["Usiamo cookie necessari al funzionamento del sito e alla misurazione del suo utilizzo."] },
        { h: "Condivisione", p: ["Non vendiamo i tuoi dati. Li condividiamo solo con fornitori tecnici (es. invio e-mail) o se richiesto dalla legge."] },
        { h: "Sicurezza e conservazione", p: ["Proteggiamo i dati con misure ragionevoli, senza garanzia assoluta, e li conserviamo solo per il tempo necessario."] },
        { h: "I tuoi diritti", p: ["In base al GDPR puoi chiedere accesso, rettifica, cancellazione o opporti al trattamento. [Contattaci](/contact)."] },
      ],
    },
    refund: {
      meta: { title: "Politica di rimborso | IPTV Headend", description: "Politica di rimborso IPTV Headend: requisiti, richiesta e tempi." },
      title: "Politica di rimborso",
      intro: "Vogliamo che tu sia soddisfatto. Se qualcosa non va, ecco come funzionano i rimborsi.",
      sections: [
        { h: "Requisiti", p: ["Puoi chiedere un rimborso entro 7 giorni dall'acquisto, se l'abbonamento non è stato utilizzato. Gli acquisti effettuati durante promozioni a tempo limitato non sono rimborsabili."] },
        { h: "Come richiederlo", p: ["Contatta l'assistenza su WhatsApp o tramite il [modulo](/contact) con il riferimento dell'ordine e una breve spiegazione. Rispondiamo entro 7 giorni lavorativi."] },
        { h: "Elaborazione", p: ["Una volta approvato, il rimborso viene inviato al metodo di pagamento originale entro 2 giorni. La banca può impiegare qualche giorno in più."] },
        { h: "Rimborsi in ritardo", p: ["Verifica prima con la banca o il wallet, poi contattaci."] },
        { h: "Casi particolari", p: ["Se la tua situazione è diversa, parliamone: cercheremo una soluzione equa."] },
        { h: "Modifiche", p: ["Questa politica può cambiare; le modifiche valgono dalla pubblicazione."] },
      ],
    },
  },
  notFound: {
    title: "Questa pagina è in pausa pubblicitaria",
    text: "Non abbiamo trovato la pagina che cercavi. Potrebbe essere stata spostata.",
    cta: "Torna alla home",
  },
};

export default it;
