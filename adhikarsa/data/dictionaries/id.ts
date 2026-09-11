import type { Dictionary } from "./en";

/**
 * ============================================================================
 * KAMUS BAHASA INDONESIA
 * ----------------------------------------------------------------------------
 * Typed as `Dictionary`, so a key that is missing, renamed or misspelled fails
 * the build rather than silently rendering an empty string in production.
 *
 * The register is deliberately formal Indonesian — the audience is hospital
 * directors, boards and institutional partners, not consumers. Established
 * loanwords stay in English where translating them would read as unnatural to
 * a technical reader ("computer vision", "cloud", "on-premise", "enterprise").
 *
 * Headline `lines` are re-authored, not translated line-for-line: Indonesian
 * runs longer, and each entry has to remain a single line at every breakpoint
 * for the masked reveal to work.
 * ==========================================================================
 */
export const id: Dictionary = {
  meta: {
    siteName: "Adhikarsa Mahatama Teknologi",
    home: {
      title: "Adhikarsa Mahatama Teknologi | Teknologi Kesehatan & Otomasi",
      description:
        "PT Adhikarsa Mahatama Teknologi mengembangkan teknologi kesehatan, otomasi rumah sakit, kecerdasan buatan, integrasi sistem, dan solusi digital khusus untuk institusi modern.",
    },
    company: {
      title: "Perusahaan",
      description:
        "PT Adhikarsa Mahatama Teknologi — siapa kami, bagaimana kami memandang rekayasa, dan profil resmi perusahaan.",
    },
    solutions: {
      title: "Solusi",
      description:
        "Otomasi rumah sakit, integrasi sistem, kecerdasan buatan, pengembangan perangkat lunak khusus, intelijensi operasional, serta riset dan pengembangan.",
    },
    technology: {
      title: "Teknologi",
      description:
        "Bagaimana Adhikarsa menghubungkan sistem rumah sakit menjadi satu ekosistem cerdas, dan arsitektur tiga lapis di baliknya.",
    },
    innovation: {
      title: "Inovasi",
      description:
        "Riset dan pengembangan di Adhikarsa: kecerdasan buatan, computer vision, otomasi, data kesehatan, infrastruktur cerdas, dan interaksi manusia–komputer.",
    },
    contact: {
      title: "Kontak",
      description:
        "Bermitra dengan Adhikarsa untuk menjajaki otomasi, AI, integrasi sistem, dan pengembangan teknologi khusus bagi organisasi Anda.",
    },
  },

  nav: {
    home: "Beranda",
    company: "Perusahaan",
    solutions: "Solusi",
    technology: "Teknologi",
    innovation: "Inovasi",
    contact: "Kontak",
    primaryCta: "Hubungi Kami",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    skipToContent: "Lewati ke konten",
    homeAria: "Adhikarsa — beranda",
  },

  theme: {
    toLight: "Beralih ke tema terang",
    toDark: "Beralih ke tema gelap",
  },

  language: {
    label: "Bahasa",
    switchTo: "Ganti bahasa",
  },

  actions: {
    exploreSolutions: "Jelajahi Solusi Kami",
    companyProfile: "Profil Perusahaan",
    startConversation: "Mulai Percakapan",
    readMore: "Selengkapnya",
    backHome: "Kembali ke beranda",
    viewSolutions: "Lihat semua solusi",
    viewTechnology: "Lihat teknologinya",
    viewCompany: "Tentang perusahaan",
  },

  home: {
    hero: {
      eyebrow: "Teknologi Kesehatan • Otomasi • AI",
      lines: ["Merekayasa sistem cerdas", "untuk layanan kesehatan", "modern."],
      capabilities: [
        "Pengembangan Teknologi",
        "Otomasi Rumah Sakit",
        "Kecerdasan Buatan",
        "Integrasi Sistem",
      ],
    },
    intro: {
      eyebrow: "Tentang Adhikarsa",
      lines: ["Teknologi harus membuat", "institusi kompleks", "bekerja lebih cerdas."],
      body: [
        "PT Adhikarsa Mahatama Teknologi adalah perusahaan teknologi yang berfokus mengembangkan sistem digital terintegrasi, otomasi, dan solusi cerdas untuk institusi modern.",
        "Pendekatan kami memadukan rekayasa perangkat lunak, integrasi sistem, otomasi, dan kecerdasan buatan untuk menyelesaikan tantangan operasional yang kompleks.",
      ],
    },
    pillars: {
      items: [
        {
          n: "01",
          title: "Kecerdasan",
          copy: "Teknologi yang mengubah informasi menjadi keputusan yang lebih baik.",
        },
        {
          n: "02",
          title: "Integrasi",
          copy: "Menyatukan sistem yang terpisah menjadi satu ekosistem.",
        },
        {
          n: "03",
          title: "Otomasi",
          copy: "Mengubah proses berulang menjadi alur kerja digital yang efisien.",
        },
      ],
    },
    directory: {
      eyebrow: "Jelajahi",
      lines: ["Empat pintu masuk", "ke perusahaan."],
      items: [
        {
          key: "company",
          label: "Perusahaan",
          copy: "Siapa kami, bagaimana kami membangun, dan profil resmi perusahaan.",
        },
        {
          key: "solutions",
          label: "Solusi",
          copy: "Enam disiplin, dari otomasi rumah sakit hingga riset dan pengembangan.",
        },
        {
          key: "technology",
          label: "Teknologi",
          copy: "Bagaimana rumah sakit menjadi satu ekosistem terhubung, lapis demi lapis.",
        },
        {
          key: "innovation",
          label: "Inovasi",
          copy: "Jalur riset yang membentuk apa yang kami bangun berikutnya.",
        },
      ],
    },
  },

  company: {
    hero: {
      eyebrow: "Perusahaan",
      lines: ["Perusahaan teknologi", "yang dibangun untuk", "institusi kompleks."],
      body: "Siapa kami, bagaimana kami memandang rekayasa, dan profil resmi perusahaan.",
    },
    approach: {
      eyebrow: "Pendekatan Kami",
      lines: ["Dibangun untuk lingkungan", "tempat teknologi berarti."],
      blocks: [
        {
          n: "01",
          title: "Keandalan",
          copy: "Teknologi yang dirancang untuk kelangsungan operasional dan perilaku sistem yang dapat diandalkan.",
        },
        {
          n: "02",
          title: "Interoperabilitas",
          copy: "Sistem yang dirancang untuk bekerja dengan infrastruktur dan teknologi institusi yang sudah ada.",
        },
        {
          n: "03",
          title: "Adaptabilitas",
          copy: "Solusi yang dibangun mengikuti alur kerja nyata dan kebutuhan organisasi yang terus berkembang.",
        },
        {
          n: "04",
          title: "Rekayasa Jangka Panjang",
          copy: "Kami memperlakukan teknologi sebagai infrastruktur yang harus terus memberi nilai seiring organisasi bertumbuh.",
        },
      ],
    },
    statement: {
      first: ["Kami tidak membangun", "teknologi demi teknologi."],
      second: ["Kami membangunnya agar", "sistem yang kompleks", "bekerja lebih baik."],
    },
    profile: {
      eyebrow: "Profil Perusahaan",
      lines: ["Informasi", "perusahaan."],
      toBeProvided: "Akan dilengkapi",
      fields: {
        company: "Perusahaan",
        industry: "Industri",
        coreFocus: "Fokus Utama",
        headquarters: "Kantor Pusat",
        email: "Email",
        contactPerson: "Narahubung",
      },
      values: {
        industry: "Teknologi & Solusi Digital",
        coreFocus: [
          "Teknologi Kesehatan",
          "Otomasi",
          "Kecerdasan Buatan",
          "Pengembangan Perangkat Lunak",
          "Integrasi Sistem",
        ],
      },
    },
  },

  solutions: {
    hero: {
      eyebrow: "Kapabilitas Kami",
      lines: ["Teknologi yang dibangun", "dari kebutuhan nyata."],
      body: "Enam disiplin, masing-masing dapat diterapkan sendiri dan lebih kuat bila dipadukan. Lapisan penghubung di antaranya adalah produknya.",
    },
    capabilities: [
      {
        n: "01",
        title: "Otomasi Rumah Sakit",
        copy: "Merancang alur kerja cerdas yang mengurangi proses berulang dan memperbaiki koordinasi operasional.",
      },
      {
        n: "02",
        title: "Integrasi Sistem",
        copy: "Menghubungkan sistem rumah sakit, aplikasi, basis data, perangkat, dan infrastruktur digital.",
      },
      {
        n: "03",
        title: "Kecerdasan Buatan",
        copy: "Mengembangkan perangkat berbasis AI untuk mendukung analisis, otomasi, penentuan prioritas, dan pengambilan keputusan institusional.",
      },
      {
        n: "04",
        title: "Pengembangan Perangkat Lunak Khusus",
        copy: "Membangun perangkat lunak enterprise sesuai kebutuhan dan alur kerja spesifik sebuah organisasi.",
      },
      {
        n: "05",
        title: "Data & Intelijensi Operasional",
        copy: "Mengubah informasi operasional menjadi wawasan bermakna melalui analitik dan visualisasi terintegrasi.",
      },
      {
        n: "06",
        title: "Riset & Pengembangan",
        copy: "Menjajaki teknologi baru dan mengembangkan solusi untuk tantangan institusi di masa depan.",
      },
    ],
    automation: {
      eyebrow: "Otomasi Proses",
      lines: ["Alur kerja kompleks.", "Disederhanakan teknologi."],
      body: "Kami merancang otomasi mengikuti proses operasional yang sudah berjalan, membantu institusi mengurangi pekerjaan manual tanpa kehilangan visibilitas dan kendali.",
      exampleLabel: "Contoh — perjalanan pasien",
      phases: ["Masukan", "Sistem", "Otomasi", "Intelijensi", "Tindakan"],
      steps: [
        { label: "Pendaftaran Pasien", phase: "Masukan" },
        { label: "Verifikasi", phase: "Sistem" },
        { label: "Perutean Departemen", phase: "Otomasi" },
        { label: "Proses Klinis", phase: "Otomasi" },
        { label: "Layanan Penunjang", phase: "Otomasi" },
        { label: "Administrasi", phase: "Sistem" },
        { label: "Analitik", phase: "Intelijensi" },
      ],
    },
    engineering: {
      eyebrow: "Rekayasa",
      lines: ["Dari gagasan", "menjadi infrastruktur."],
      phases: [
        {
          n: "01",
          title: "Memahami",
          copy: "Memahami kebutuhan operasional dan tantangan institusi.",
        },
        {
          n: "02",
          title: "Merancang",
          copy: "Menerjemahkan alur kerja menjadi arsitektur sistem yang skalabel.",
        },
        {
          n: "03",
          title: "Membangun",
          copy: "Membangun perangkat lunak, integrasi, otomasi, dan sistem cerdas yang andal.",
        },
        {
          n: "04",
          title: "Mengintegrasikan",
          copy: "Menghubungkan teknologi dengan infrastruktur yang sudah ada.",
        },
        {
          n: "05",
          title: "Mengembangkan",
          copy: "Terus menyempurnakan sistem seiring kebutuhan institusi berkembang.",
        },
      ],
    },
  },

  technology: {
    hero: {
      eyebrow: "Teknologi Kesehatan",
      lines: ["Menghubungkan rumah sakit", "menjadi satu ekosistem", "yang cerdas."],
      body: "Rumah sakit modern bergantung pada banyak sistem klinis, operasional, administratif, dan finansial. Adhikarsa mengembangkan teknologi yang membantu sistem-sistem ini saling berkomunikasi dan beroperasi sebagai lingkungan digital yang lebih terhubung.",
    },
    ecosystem: {
      coreTitle: "RUMAH SAKIT CERDAS",
      coreSubtitle: "Lapisan intelijensi Adhikarsa",
      nodes: [
        "Sistem Klinis",
        "Layanan Pasien",
        "Laboratorium",
        "Radiologi",
        "Farmasi",
        "Operasional",
        "Keuangan",
        "Manajemen",
        "Infrastruktur",
      ],
      stages: [
        "Sistem berdiri sendiri",
        "Koneksi terbentuk",
        "Data mengalir",
        "Lapisan intelijensi aktif",
        "Satu ekosistem terhubung",
      ],
    },
    architecture: {
      eyebrow: "Arsitektur Teknologi",
      lines: ["Dirancang untuk terhubung.", "Dibangun untuk berkembang."],
      body: "Tiga lapisan yang sengaja dapat dipisah. Arahkan ke salah satunya untuk menelusuri apa yang terhubung.",
      layers: [
        {
          name: "Pengalaman",
          desc: "Yang benar-benar digunakan orang di dalam institusi.",
          items: ["Dasbor Manajemen", "Aplikasi Klinis", "Sistem Operasional"],
        },
        {
          name: "Intelijensi",
          desc: "Tempat logika proses dan penalaran berada.",
          items: ["Mesin Otomasi", "Sistem AI", "Analitik", "Mesin Aturan"],
        },
        {
          name: "Infrastruktur",
          desc: "Sistem dan data yang sudah ada.",
          items: ["API", "Basis Data", "Sistem Rumah Sakit", "IoT", "Cloud", "On-Premise"],
        },
      ],
      highlightAria: "lapisan — sorot koneksi",
    },
    board: {
      coreLabel: "Inti",
      coreSubtitle: "Lapisan Intelijensi",
      systems: [
        "Sistem Informasi Rumah Sakit",
        "Rekam Medis Elektronik",
        "Laboratorium",
        "Radiologi",
        "Farmasi",
        "Operasional",
        "Keuangan",
        "Infrastruktur IoT",
      ],
    },
  },

  innovation: {
    hero: {
      eyebrow: "Inovasi",
      lines: ["Menjajaki apa", "yang akan datang."],
      body: "Inisiatif riset dan pengembangan kami menjajaki teknologi yang dapat meningkatkan otomasi, intelijensi, dan kolaborasi manusia–teknologi di lingkungan kesehatan dan enterprise.",
    },
    trackLabel: "Jalur riset",
    themes: [
      {
        label: "Kecerdasan Buatan",
        detail:
          "Model yang dibatasi pada keputusan institusional — pemeringkatan, prakiraan, dan menampilkan hal yang perlu dilihat tim berikutnya.",
      },
      {
        label: "Computer Vision",
        detail:
          "Persepsi terapan untuk konteks operasional: pelacakan aset, okupansi, dan pemantauan lingkungan.",
      },
      {
        label: "Otomasi",
        detail:
          "Mesin proses yang membawa status antar departemen, sehingga sebuah langkah tidak pernah dimulai dari formulir kosong.",
      },
      {
        label: "Data Kesehatan",
        detail:
          "Interoperabilitas, rekonsiliasi skema, dan tata kelola untuk data yang tidak pernah dirancang untuk disatukan.",
      },
      {
        label: "Infrastruktur Cerdas",
        detail:
          "Bangunan dan perangkat diperlakukan sebagai sistem yang dapat dialamatkan, dipantau dan dikoordinasikan bersama perangkat lunak.",
      },
      {
        label: "Interaksi Manusia–Komputer",
        detail:
          "Antarmuka untuk lingkungan bertekanan tinggi, tempat kejelasan saat beban tinggi lebih penting daripada kepadatan.",
      },
    ],
  },

  contact: {
    eyebrow: "Kontak",
    lines: ["Mari bangun sistem", "cerdas bersama."],
    body: "Bermitra dengan Adhikarsa untuk menjajaki otomasi, AI, integrasi sistem, dan pengembangan teknologi khusus bagi organisasi Anda.",
    noAddressNote: "Detail kontak tercantum pada profil perusahaan.",
    detailsHeading: "Cara menghubungi kami",
    detailsBody:
      "Kami bekerja bersama rumah sakit, organisasi kesehatan, dan institusi yang sedang menjajaki otomasi, AI, integrasi sistem, atau pengembangan teknologi khusus.",
    form: {
      eyebrow: "Mulai percakapan",
      heading: ["Ceritakan masalah", "yang ingin diselesaikan."],
      intro:
        "Semakin spesifik masalahnya, semakin berguna balasan pertama kami. Beberapa baris sudah cukup.",
      fields: {
        name: { label: "Nama", placeholder: "Nama lengkap Anda" },
        email: { label: "Email kerja", placeholder: "nama@organisasi.id" },
        organisation: { label: "Organisasi", placeholder: "Rumah sakit, institusi, atau perusahaan" },
        topic: { label: "Mengenai apa?", placeholder: "Pilih topik" },
        message: {
          label: "Apa yang ingin Anda selesaikan?",
          placeholder:
            "Alur kerja, sistem, atau keputusan yang ingin diperbaiki \u2014 dan apa yang membuatnya sulit saat ini.",
        },
      },
      topics: [
        { value: "healthcare", label: "Teknologi kesehatan" },
        { value: "automation", label: "Otomasi rumah sakit" },
        { value: "ai", label: "Kecerdasan buatan" },
        { value: "integration", label: "Integrasi sistem" },
        { value: "custom", label: "Pengembangan perangkat lunak khusus" },
        { value: "research", label: "Kolaborasi riset" },
        { value: "other", label: "Lainnya" },
      ],
      optional: "opsional",
      submit: "Kirim pesan",
      submitting: "Mengirim\u2026",
      errors: {
        name: "Mohon isi nama Anda.",
        email: "Mohon masukkan alamat email yang valid.",
        organisation: "Mohon sebutkan organisasi Anda.",
        topic: "Mohon pilih topik.",
        message: "Mohon jelaskan masalahnya sedikit lebih rinci.",
      },
      handoff: {
        heading: "Pesan Anda sudah siap.",
        topicLabel: "Topik",
        body: "Kami belum bisa mengirimkannya otomatis dari sini. Pilih cara mengirimnya \u2014 semua yang Anda tulis sudah terisi.",
        whatsapp: "Kirim lewat WhatsApp",
        email: "Kirim lewat email",
        back: "Kembali ke formulir",
      },
      success: {
        heading: "Pesan terkirim.",
        body: "Terima kasih. Kami membaca setiap pesan dan akan membalas ke alamat yang Anda tulis.",
        again: "Kirim pesan lain",
      },
      direct: {
        heading: "Atau hubungi langsung",
        emailLabel: "Email",
        phoneLabel: "Narahubung",
        addressLabel: "Kantor",
      },
      privacy:
        "Data yang Anda kirim hanya kami gunakan untuk membalas Anda. Tidak dibagikan kepada pihak lain.",
    },
  },

  footer: {
    tagline: "Teknologi untuk institusi yang cerdas.",
    navHeading: "Navigasi",
    capabilitiesHeading: "Kapabilitas",
    capabilities: [
      "Teknologi Kesehatan",
      "Otomasi",
      "Kecerdasan Buatan",
      "Pengembangan Perangkat Lunak",
    ],
    rights: "Seluruh hak cipta dilindungi.",
    privacy: "Privasi",
    terms: "Ketentuan",
  },

  legal: {
    draftNotice: "Draf kerja — menunggu tinjauan penasihat hukum",
    lastReviewed: "Terakhir ditinjau",
    privacy: {
      title: "Privasi",
      intro:
        "Bagaimana PT Adhikarsa Mahatama Teknologi menangani informasi yang dikumpulkan melalui situs web ini dan melalui kerja sama institusional.",
      sections: [
        {
          heading: "Cakupan",
          body: "Pernyataan ini hanya mencakup situs web publik. Penanganan data di dalam sistem yang telah diterapkan diatur oleh perjanjian dengan institusi yang mengoperasikannya, serta oleh kebijakan institusi tersebut.",
        },
        {
          heading: "Informasi yang kami kumpulkan",
          body: "Situs ini tidak menjalankan analitik, iklan, atau pelacakan pihak ketiga, dan tidak memasang cookie. Preferensi bahasa dan tema Anda disimpan di peramban Anda sendiri dan tidak pernah meninggalkan perangkat Anda. Jika Anda menghubungi kami melalui email, kami menyimpan korespondensi tersebut untuk keperluan menjawabnya.",
        },
        {
          heading: "Kerja sama institusional",
          body: "Bila Adhikarsa memproses data atas nama sebuah institusi, institusi tersebut tetap menjadi pengendali data. Ketentuan akses, retensi, dan tata kelola ditetapkan pada tiap kerja sama.",
        },
        {
          heading: "Kontak",
          body: "Pertanyaan mengenai pernyataan ini dapat diarahkan ke alamat yang tercantum pada profil perusahaan.",
        },
      ],
    },
    terms: {
      title: "Ketentuan",
      intro: "Ketentuan yang mengatur penggunaan situs web ini.",
      sections: [
        {
          heading: "Tujuan situs ini",
          body: "Situs web ini menjelaskan kapabilitas dan pendekatan rekayasa PT Adhikarsa Mahatama Teknologi. Sifatnya informatif dan bukan merupakan penawaran, jaminan, atau komitmen untuk menghadirkan sistem tertentu.",
        },
        {
          heading: "Antarmuka ilustratif",
          body: "Antarmuka, dasbor, metrik, dan diagram yang ditampilkan pada situs ini adalah rancangan konseptual. Semuanya bukan tangkapan layar dari sistem yang telah diterapkan dan tidak mewakili rumah sakit, institusi, atau kumpulan data mana pun.",
        },
        {
          heading: "Kekayaan intelektual",
          body: "Konten, desain, dan kode situs ini adalah milik PT Adhikarsa Mahatama Teknologi kecuali dinyatakan lain.",
        },
        {
          heading: "Perubahan",
          body: "Ketentuan ini dapat diperbarui. Penggunaan situs selanjutnya mengikuti versi yang dipublikasikan di sini.",
        },
      ],
    },
  },

  notFound: {
    eyebrow: "Kesalahan 404",
    heading: "Tidak ada rute ke sumber daya itu.",
    body: "Halaman yang Anda minta bukan bagian dari sistem ini.",
  },
};
