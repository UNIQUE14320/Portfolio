import { jsPDF } from 'jspdf';

export const generateResumePdf = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm
  let y = 12;

  // Primary Color: Dark Blue #1E3A8A / #2563EB
  const darkBlue = [30, 58, 138] as const; // RGB for headers
  const textDark = [15, 23, 42] as const;   // RGB for main text
  const textMuted = [71, 85, 105] as const; // RGB for secondary text

  // --- HEADER SECTION ---
  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...darkBlue);
  doc.text('SHUBHAM GAWADE', pageWidth / 2, y, { align: 'center' });
  y += 6;

  // Subtitle
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  doc.text('Software Developer | Full-Stack Development | AI-Driven Applications', pageWidth / 2, y, { align: 'center' });
  y += 4.5;

  // Contact Info Line 1
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...textMuted);
  doc.text('Pune, Maharashtra, India   |   9960388027   |   gawadeshubham859@gmail.com', pageWidth / 2, y, { align: 'center' });
  y += 4.2;

  // Links Line 2
  doc.setFontSize(8);
  doc.setTextColor(37, 99, 235); // Blue link
  doc.text('linkedin.com/in/shubhamgawade39   |   github.com/UNIQUE14320   |   unique14320.github.io/Portfolio   |   leetcode.com/u/unique14320', pageWidth / 2, y, { align: 'center' });
  y += 5;

  // Top Divider Rule
  doc.setDrawColor(30, 58, 138);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  // --- HELPER FOR SECTION HEADERS ---
  const renderSectionHeader = (title: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...darkBlue);
    doc.text(title, margin, y);
    y += 1.5;
    
    doc.setDrawColor(203, 213, 225); // Slate 300
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4.5;
  };

  // --- 1. SUMMARY ---
  renderSectionHeader('SUMMARY');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...textDark);
  
  const summaryText = "BBA (Computer Application) graduate with a CGPA of 7.48, and 83rd percentile score in MAH MCA CET, and an All India Rank of 7160 in NIMCET. Skilled in Python, Java, SQL, HTML, CSS, JavaScript, React, and Node.js, with hands-on experience in full-stack development and building AI-driven applications. Eager to contribute to real-world software projects while continuing to grow as a developer.";
  
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 3.8 + 4;

  // --- 2. EDUCATION ---
  renderSectionHeader('EDUCATION');
  
  const eduItems = [
    {
      title: 'Bachelor of Business Administration (Computer Application)',
      subtitle: 'Savitribai Phule Pune University, Pune',
      period: '2023 - 2025',
      score: 'CGPA: 7.48'
    },
    {
      title: 'Higher Secondary Certificate (HSC)',
      subtitle: 'Maharashtra State Board',
      period: '2020 - 2022',
      score: 'Percentage: 72%'
    },
    {
      title: 'Secondary School Certificate (SSC)',
      subtitle: 'Maharashtra State Board',
      period: '2019 - 2020',
      score: 'Percentage: 77%'
    }
  ];

  eduItems.forEach((edu) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...textDark);
    doc.text(edu.title, margin, y);

    const titleWidth = doc.getTextWidth(edu.title);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(...textMuted);
    
    // Add " — Subtitle | Period"
    const subText = ` — ${edu.subtitle} | ${edu.period}`;
    doc.text(subText, margin + titleWidth, y);

    y += 3.8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text(edu.score, margin, y);
    y += 4.5;
  });

  y += 1;

  // --- 3. TECHNICAL SKILLS ---
  renderSectionHeader('TECHNICAL SKILLS');

  const skillsList = [
    { label: 'Programming Languages', items: 'Core Java, Advanced Java, Python, C, C++' },
    { label: 'Web Technologies', items: 'HTML, CSS, JavaScript, React.js, Node.js, JSP, Servlet, Hibernate' },
    { label: 'Databases', items: 'MySQL, MongoDB, DBMS, RDBMS' },
    { label: 'Concepts', items: 'Object-Oriented Programming, Data Structures & Algorithms' },
    { label: 'Tools', items: 'Git, GitHub, VS Code, PyCharm' }
  ];

  skillsList.forEach((sk) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...textDark);
    doc.text(`•  ${sk.label}: `, margin, y);

    const labelWidth = doc.getTextWidth(`•  ${sk.label}: `);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textDark);
    doc.text(sk.items, margin + labelWidth, y);
    y += 4.0;
  });

  y += 2;

  // --- 4. PROJECTS ---
  renderSectionHeader('PROJECTS');

  // Project 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...textDark);
  doc.text('Personal AI Voice Assistant (Ryuk)', margin, y);
  const p1Width = doc.getTextWidth('Personal AI Voice Assistant (Ryuk)');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkBlue);
  doc.text(' — AI-Driven Application', margin + p1Width, y);
  y += 4.0;

  const p1Bullets = [
    'Tech Stack: Python, OpenAI API, OpenAI Whisper, pyttsx3, SQLite',
    'Built a voice-controlled AI assistant that listens, understands natural language, reasons using an LLM, and performs real-world actions on command - a self-built, customizable alternative to Alexa/Siri.',
    'Sole developer: integrated speech recognition, LLM reasoning, and text-to-speech; implemented function-calling for task execution and SQLite-based memory for context retention.',
    'Role: Designed the assistant\'s architecture end-to-end, wrote the Whisper-based speech pipeline, and connected it to an LLM for reasoning and response generation. Built the function-calling layer so the assistant could trigger real actions, and set up SQLite storage to retain conversation context across sessions.'
  ];

  p1Bullets.forEach((bullet, idx) => {
    doc.setFont('helvetica', idx === 0 ? 'bold' : 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...textDark);

    const bulletSymbol = '• ';
    const bulletLines = doc.splitTextToSize(bullet, contentWidth - 4);
    
    doc.text(bulletSymbol, margin, y);
    doc.text(bulletLines, margin + 3.5, y);
    y += bulletLines.length * 3.6 + 0.8;
  });

  y += 2.5;

  // Project 2
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...textDark);
  doc.text('Hospital Management System', margin, y);
  const p2Width = doc.getTextWidth('Hospital Management System');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkBlue);
  doc.text(' — Full-Stack Development', margin + p2Width, y);
  y += 4.0;

  const p2Bullets = [
    'Tech Stack: Java, JSP, Servlet, Hibernate, MySQL',
    'Developed a web-based system to streamline hospital operations, including patient registration, doctor management, appointment scheduling, billing, and user authentication, using Hibernate ORM for secure, efficient data storage.',
    'Built responsive JSP pages and Servlet-based business logic; implemented CRUD operations, secure login authentication, and billing modules.',
    'Role: Built the JSP front-end pages and wrote the Servlet-based business logic connecting them to the database. Implemented CRUD operations with Hibernate ORM, handled login authentication, and developed the billing module end-to-end.'
  ];

  p2Bullets.forEach((bullet, idx) => {
    doc.setFont('helvetica', idx === 0 ? 'bold' : 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...textDark);

    const bulletSymbol = '• ';
    const bulletLines = doc.splitTextToSize(bullet, contentWidth - 4);
    
    doc.text(bulletSymbol, margin, y);
    doc.text(bulletLines, margin + 3.5, y);
    y += bulletLines.length * 3.6 + 0.8;
  });

  y += 2.5;

  // --- 5. CERTIFICATIONS ---
  renderSectionHeader('CERTIFICATIONS');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...textDark);
  doc.text('All certification documents can be viewed here: ', margin, y);

  const certPrefixWidth = doc.getTextWidth('All certification documents can be viewed here: ');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(37, 99, 235); // Link blue
  doc.text('Certifications Folder (Google Drive)', margin + certPrefixWidth, y);

  // Save PDF
  doc.save('Shubham_Gawade_Resume.pdf');
};
