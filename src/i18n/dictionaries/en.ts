// src/i18n/dictionaries/en.ts
import type { Dictionary } from "./id";

export const en: Dictionary = {
  metadata: {
    homeTitle: "Adryan — Full Stack Developer",
    homeDescription:
      "Portfolio of Adryan, Full Stack Developer & UI/UX Designer. Building fast, accessible, and delightful web apps.",
    aboutTitle: "About",
    aboutDescription:
      "About Adryan — Full Stack Developer & UI/UX Designer focused on detail and user experience.",
    projectsTitle: "Projects",
    projectsDescription:
      "Adryan's projects — Full Stack Developer. Web, mobile, and internal systems.",
    notFoundTitle: "Page not found",
    notFoundDescription:
      "The page you're looking for has moved or never existed.",
    imageToolsTitle: "Image Tools",
    imageToolsDescription:
      "Compress, convert, and turn images into PDF directly in the browser.",
    base64Title: "Base64 Encoder/Decoder",
    base64Description:
      "Encode or decode text to Base64 quickly, directly in the browser.",
    passwordGeneratorTitle: "Password Generator",
    passwordGeneratorDescription:
      "Generate strong, random passwords directly in the browser.",
    qrGeneratorTitle: "QR Generator",
    qrGeneratorDescription:
      "Create custom QR codes with colors and download them as PNG.",
    pdfMergeTitle: "PDF Merge",
    pdfMergeDescription:
      "Merge multiple PDF files into one directly in the browser.",
    idPhotoTitle: "ID Photo Maker",
    idPhotoDescription:
      "Crop, resize, and remove backgrounds for ID photos directly in the browser.",
    bmiCalculatorTitle: "BMI Calculator",
    bmiCalculatorDescription:
      "Calculate Body Mass Index (BMI) directly in the browser.",
  },

  nav: {
    home: "Home",
    about: "About",
    work: "Work",
    tools: "Tools",
    cv: "CV",
    downloadCv: "Download CV",
  },

  common: {
    available: "Available for freelance",
    viewWork: "View Work",
    downloadCv: "Download CV",
    viewLive: "View Live",
    details: "Details",
    localProject: "Local project",
    backToProjects: "Back to projects",
    backToHome: "Back to Home",
    openGithub: "Open GitHub",
    techStack: "Tech Stack",
    findMe: "Find me",
    proficiency: "Proficiency",
    original: "Original:",
    result: "Result:",
    from: "from",
    savedPercent: "save {percent}%",
    characters: "characters",
    openProject: "Open {title}",
    status: {
      live: "Live",
      local: "Local",
    },
    categories: {
      fullStack: "Full Stack",
      frontend: "Frontend",
      backend: "Backend",
      mobile: "Mobile",
    },
    notFoundTitle: "Page not found",
    notFoundDesc:
      "The page you're looking for has moved or never existed.",
    backHome: "Back to Home",
    clear: "Clear",
    copy: "Copy",
    copied: "Copied",
    swapDirection: "Swap Direction",
    downloadResult: "Download Result",
    downloadPdf: "Download PDF",
    downloadPng: "Download PNG",
  },

  hero: {
    greeting: "full stack developer,",
    tagline: "building thoughtful digital products.",
    description:
      "I'm Adryan, building fast, accessible, and delightful web apps.",
    typingTexts: [
      "Full Stack Developer",
      "Frontend Specialist",
      "UI/UX Enthusiast",
    ],
  },

  sections: {
    skillsEyebrow: "Capabilities",
    skillsTitle: "Core Skills",
    projectsEyebrow: "Portfolio Showcase",
    projectsTitle: "Selected projects",
    projectsDesc:
      "A collection of projects I built from scratch — from research and design to implementation. Every project has its own story and challenges.",
    filterAll: "All",
    emptyCategory: "No projects in this category yet.",
    moreOnGithub: "See more on GitHub",
    moreOnGithubDesc:
      "Many more experiments & projects are on my GitHub.",
    ctaTitle: "Let's build something together.",
    ctaDesc:
      "Have an interesting project or want to collaborate? I'm always open to discussion.",
    getInTouch: "Get in touch",
    seeProjects: "See projects",
    statProjects: "Projects Completed",
    statExperience: "Years Experience",
    statClients: "Happy Clients",
    statDedication: "Dedication",
  },

  about: {
    badge: "About",
    heading:
      "Hi, I'm Adryan — a developer who cares about detail & user experience.",
    p1: "I'm a Full Stack Developer with experience building end-to-end web applications — from UI/UX design in Figma, frontend implementation with Next.js & React, to backend with Laravel and relational databases.",
    p2: "I believe a good digital product isn't just about features, but also about clarity, speed, and accessibility. Every line of code and every pixel should have a reason.",
    p3: "Outside of coding, I love exploring design systems, reading tech blogs, and experimenting with smooth web animations.",
    seeProjects: "See my projects",
    downloadCv: "Download CV",
    techStackTitle: "Tech Stack",
    techStackDesc: "Tools & technologies I use daily.",
    journeyTitle: "Journey",
    journeyDesc: "A short journey through my web development world.",
    focusTitle: "Focus",
    focus1: "Frontend Architecture",
    focus2: "Design Systems",
    focus3: "Performance & Accessibility",
    focus4: "Product Thinking",
    connectTitle: "Connect",
    timeline: [
      {
        year: "2023",
        title: "Started learning web development",
        desc: "HTML, basic CSS, JS, and PHP.",
      },
      {
        year: "2024",
        title: "Full stack Laravel",
        desc: "Built a school PPDB platform & literacy platform.",
      },
      {
        year: "2025",
        title: "Expanded to Next.js & Flutter",
        desc: "Focused on the React ecosystem, TypeScript, and mobile development.",
      },
      {
        year: "2026",
        title: "Freelance & collaboration",
        desc: "Worked on company profile projects & internal systems.",
      },
    ],
  },

  tools: {
    badge: "Tools",
    items: {
      imageTools: {
        label: "Image Tools",
        description: "Compress, convert, or turn images into PDF.",
      },
      qrGenerator: {
        label: "QR Generator",
        description:
          "Create custom QR codes with colors and download them as PNG.",
      },
      passwordGenerator: {
        label: "Password Generator",
        description: "Generate strong, random passwords.",
      },
      idPhoto: {
        label: "ID Photo Maker",
        description: "Create 2×3, 3×4, 4×6 cm ID photos.",
      },
      pdfMerge: {
        label: "PDF Merge",
        description: "Merge multiple PDFs into one.",
      },
      base64: {
        label: "Base64 Encoder/Decoder",
        description: "Encode or decode text to Base64 quickly.",
      },
      bmiCalculator: {
        label: "BMI Calculator",
        description: "Calculate ideal body weight based on height and weight.",
      },
    },
    imageTools: {
      title: "Image Tools",
      description:
        "Compress, convert, or turn images into PDF. Everything runs in your browser — images are not sent to a server.",
      tabs: {
        compress: "Compress",
        convert: "Convert Format",
        pdf: "To PDF",
      },
      compress: {
        title: "Compress Image",
        description:
          "Reduce file size by lowering quality and/or resolution.",
        action: "Compress",
        processing: "Processing...",
        resultLabel: "Result:",
        saved: "save {percent}%",
        download: "Download Result",
        error: "Failed to compress image.",
      },
      convert: {
        title: "Convert Image Format",
        description:
          "Convert images to modern formats like WebP or AVIF.",
        action: "Convert to {format}",
        processing: "Processing...",
        resultLabel: "Result:",
        download: "Download Result",
        error: "Failed to convert image.",
      },
      pdf: {
        title: "Convert to PDF",
        description:
          "Turn images into PDF files. Supports PNG, JPEG, and other formats (converted automatically).",
        action: "Convert to PDF",
        processing: "Processing...",
        resultLabel: "Result:",
        download: "Download PDF",
        error: "Failed to convert to PDF.",
      },
    },
    base64: {
      title: "Base64 Encoder / Decoder",
      description:
        "Encode or decode text to Base64. Everything runs in the browser — data is not sent to a server.",
      invalidInput: "Input is not valid for this mode.",
      textLabel: "Original Text",
      encodedLabel: "Base64",
      placeholderText: "Hello world!",
      placeholderEncoded: "SGVsbG8gd29ybGQh",
      encode: "Encode",
      decode: "Decode",
    },
    passwordGenerator: {
      title: "Password Generator",
      description:
        "Generate strong, random passwords. Everything runs in the browser — passwords are not sent to a server.",
      generate: "Generate",
      strengthLabel: "Strength",
      strength: {
        veryStrong: "Very strong",
        strong: "Strong",
        medium: "Medium",
        weak: "Weak",
      },
      lengthLabel: "Password Length",
      lowercase: "Lowercase (a-z)",
      uppercase: "Uppercase (A-Z)",
      numbers: "Numbers (0-9)",
      symbols: "Symbols (!@#$...)",
      noneSelected: "Select at least one character type.",
    },
    qrGenerator: {
      title: "QR Code Generator",
      description:
        "Create custom QR codes. Everything runs in the browser — data is not sent to a server.",
      contentLabel: "Content / URL",
      placeholder: "https://example.com",
      qrColorLabel: "QR Color",
      backgroundColorLabel: "Background Color",
      sizeLabel: "Size ({size}px)",
      download: "Download PNG",
    },
    pdfMerge: {
      title: "Merge PDF",
      description:
        "Merge multiple PDF files into one. Everything runs in your browser — files are not sent to a server.",
      addFiles: "Add PDF Files",
      addFilesHint: "Choose or drop multiple PDF files (max 10 files, 50 MB).",
      selectedFiles: "Selected files ({count})",
      merge: "Merge PDFs",
      merging: "Merging...",
      error:
        "Failed to merge PDFs. Make sure all files are valid and not locked.",
      needMore: "Select at least 2 PDF files to merge.",
      pdfOnly: "Only PDF files are supported.",
      tooManyFiles: "Maximum 10 PDF files.",
      totalTooLarge: "Total size must be under 50 MB.",
    },
    idPhoto: {
      title: "ID Photo Maker",
      description:
        "Create official 2×3, 3×4, or 4×6 cm ID photos. Everything runs locally in your browser — photos are not sent to a server.",
      upload: "Upload photo",
      uploadHint:
        "Choose or drop JPG/PNG/WebP (max 10 MB). Plain backgrounds work best for background removal.",
      presetLabel: "ID photo size",
      backgroundLabel: "Background",
      white: "White",
      red: "Red",
      blue: "Blue",
      transparent: "Transparent",
      zoomLabel: "Zoom",
      removeBg: "Remove background automatically",
      removeBgHint:
        "Only background areas connected to the edges are removed. For best results, pick the background color with the eyedropper.",
      thresholdLabel: "Sensitivity",
      pickColor: "Pick background color",
      picking: "Click the background…",
      picked: "Picked",
      clearPicked: "Clear picked color",
      pickColorHint:
        "The eyedropper helps when red/white backgrounds are confused with the subject, e.g. white hijab on a red background.",
      dragHint: "Drag the photo to position it, use zoom to enlarge.",
      download: "Download ID Photo",
      errorImage: "Failed to load image. Try another file.",
      tooLarge: "File size must be under 10 MB.",
      imageOnly: "Only image files are supported.",
      outputHint:
        "Downloads are 300 DPI. Use automatic background removal if you want to change the background.",
    },
    bmiCalculator: {
      title: "BMI Calculator",
      description:
        "Calculate Body Mass Index (BMI) to assess if your weight is ideal. Everything runs in the browser — data is not sent to a server.",
      weightLabel: "Weight (kg)",
      heightLabel: "Height (cm)",
      ageLabel: "Age (optional)",
      genderLabel: "Gender",
      male: "Male",
      female: "Female",
      calculate: "Calculate BMI",
      reset: "Reset",
      resultLabel: "BMI Result",
      categoryLabel: "Category",
      underweight: "Underweight",
      normal: "Normal",
      overweight: "Overweight",
      obese: "Obese",
      enterValues: "Enter weight and height to start calculating.",
      invalidValues: "Please enter valid values for weight and height.",
    },
  },

  footer: {
    builtWith: "Made with attention to detail.",
    downloadCvPdf: "Download CV (PDF)",
  },

  aria: {
    toggleMenu: "Toggle menu",
    toggleTheme: "Toggle theme",
    setLocale: "Switch language to {language}",
    openChat: "Open chat",
    closeChat: "Close chat",
    sendMessage: "Send message",
    copyPassword: "Copy password",
    moveFileUp: "Move file up",
    moveFileDown: "Move file down",
    removeFile: "Remove file",
  },

  chat: {
    title: "AI Assistant",
    online: "Online",
    placeholder: "Type a message...",
    welcome: "Hi! 👋 I'm Adryan's AI Assistant. How can I help you?",
    error: "Sorry, something went wrong. Please try again later.",
    promptRequired: "Prompt is required.",
    promptEmpty: "Message cannot be empty.",
    promptTooLong: "Message is too long (max {max} characters).",
    unknownError: "Sorry, something went wrong on the server. Please try again.",
  },

  projects: {
    overviewTitle: "Overview",
    problem: "Problem",
    role: "Role",
    challenge: "Challenge",
    outcome: "Outcome",
  },
};
