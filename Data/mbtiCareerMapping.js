/**
 * MBTI Career Mapping — All 16 Personality Types
 *
 * Maps each MBTI type to:
 *   - Recommended academic streams
 *   - Career paths (with description, qualifications, salary range)
 *   - Aptitude alignment (strong skills + skills to develop + subjects)
 *   - Inspiring role models
 *   - Concrete action steps
 *
 * Source: OPENMCQ Career & Psychometric Documentation 2026 (Section 4)
 */

const mbtiCareerMapping = {
  INTJ: {
    streams: {
      primary: "Science & Engineering",
      secondary: ["Commerce", "Technology"],
      explanation: "Your strategic thinking and analytical mind make you ideal for fields that require long-term planning and complex problem-solving. Science and Engineering let you design systems and solve real-world challenges."
    },
    careerPaths: [
      {
        title: "Research Scientist",
        description: "Conduct cutting-edge research in physics, biology, or chemistry to push the boundaries of human knowledge.",
        qualifications: "B.Sc/M.Sc in relevant science + PhD preferred",
        salaryRange: "₹8L – ₹25L per annum",
        icon: "microscope"
      },
      {
        title: "Software Architect",
        description: "Design the overall structure of complex software systems, making high-level decisions about technology and design patterns.",
        qualifications: "B.Tech/B.E in Computer Science + 5-8 years experience",
        salaryRange: "₹20L – ₹60L per annum",
        icon: "code"
      },
      {
        title: "Strategic Consultant",
        description: "Help organizations solve critical business problems through data-driven analysis and strategic thinking.",
        qualifications: "MBA from top institute or relevant domain expertise",
        salaryRange: "₹15L – ₹50L per annum",
        icon: "strategy"
      },
      {
        title: "Investment Banker",
        description: "Advise companies on mergers, acquisitions, and capital raising through complex financial analysis.",
        qualifications: "MBA Finance / CA / CFA certification",
        salaryRange: "₹12L – ₹80L per annum",
        icon: "finance"
      },
      {
        title: "Data Scientist",
        description: "Extract insights from large datasets using statistical analysis, machine learning, and visualization.",
        qualifications: "B.Tech/M.Sc in CS/Statistics + ML skills",
        salaryRange: "₹10L – ₹40L per annum",
        icon: "chart"
      },
      {
        title: "Aerospace Engineer",
        description: "Design aircraft, spacecraft, and defense systems using advanced engineering principles.",
        qualifications: "B.Tech/M.Tech in Aerospace Engineering",
        salaryRange: "₹8L – ₹30L per annum",
        icon: "rocket"
      }
    ],
    aptitudeAlignment: {
      strongSkills: ["Strategic thinking", "Long-term planning", "Analytical reasoning", "Independent research"],
      skillsToDevelop: ["Teamwork and collaboration", "Emotional intelligence", "Patience with less driven individuals"],
      recommendedSubjects: ["Mathematics", "Physics", "Computer Science", "Economics"]
    },
    roleModels: [
      { name: "Elon Musk", type: "INTJ", achievement: "CEO of Tesla & SpaceX, revolutionizing electric vehicles and space exploration" },
      { name: "Isaac Newton", type: "INTJ", achievement: "Discovered the laws of gravity and motion, transforming physics forever" },
      { name: "Michelle Obama", type: "INTJ", achievement: "Former US First Lady, lawyer, and author who championed education and health initiatives" }
    ],
    actionSteps: [
      "Focus on building strong foundations in Mathematics and Science — these are your power subjects",
      "Start competitive exam preparation early (JEE/NEET/SAT) if interested in engineering or medicine",
      "Build side projects in coding, robotics, or research to strengthen your portfolio",
      "Explore online courses on Coursera or MIT OpenCourseWare in your areas of interest",
      "Join science clubs, hackathons, or olympiads to test your skills competitively"
    ]
  },

  INTP: {
    streams: {
      primary: "Science & Technology",
      secondary: ["Mathematics", "Research"],
      explanation: "Your love for theory, patterns, and logical analysis makes science and technology a natural fit. You thrive in environments where you can explore ideas deeply."
    },
    careerPaths: [
      {
        title: "Data Scientist",
        description: "Analyze complex datasets to find patterns, build predictive models, and drive data-informed decisions.",
        qualifications: "B.Tech/M.Sc in CS, Statistics, or Mathematics",
        salaryRange: "₹10L – ₹40L per annum",
        icon: "chart"
      },
      {
        title: "Mathematician",
        description: "Solve abstract mathematical problems and develop new theories with applications in finance, tech, and science.",
        qualifications: "M.Sc/PhD in Mathematics",
        salaryRange: "₹6L – ₹25L per annum",
        icon: "calculator"
      },
      {
        title: "AI Researcher",
        description: "Push the boundaries of artificial intelligence by developing new algorithms and models.",
        qualifications: "M.Tech/PhD in AI/ML/Computer Science",
        salaryRange: "₹15L – ₹60L per annum",
        icon: "brain"
      },
      {
        title: "Systems Engineer",
        description: "Design, integrate, and manage complex systems across technology and engineering domains.",
        qualifications: "B.Tech in CS/Electronics + systems expertise",
        salaryRange: "₹8L – ₹30L per annum",
        icon: "settings"
      },
      {
        title: "Philosopher / Academic",
        description: "Explore fundamental questions about existence, knowledge, and logic through teaching and research.",
        qualifications: "MA/PhD in Philosophy or related field",
        salaryRange: "₹5L – ₹20L per annum",
        icon: "book"
      },
      {
        title: "Cybersecurity Analyst",
        description: "Protect organizations from cyber threats by analyzing vulnerabilities and designing security systems.",
        qualifications: "B.Tech CS + security certifications (CEH, CISSP)",
        salaryRange: "₹8L – ₹35L per annum",
        icon: "shield"
      }
    ],
    aptitudeAlignment: {
      strongSkills: ["Abstract thinking", "Logical analysis", "Pattern recognition", "Theoretical modeling"],
      skillsToDevelop: ["Communication skills", "Project completion", "Practical implementation"],
      recommendedSubjects: ["Mathematics", "Computer Science", "Physics", "Logic"]
    },
    roleModels: [
      { name: "Albert Einstein", type: "INTP", achievement: "Developed the theory of relativity, fundamentally changing our understanding of space and time" },
      { name: "Bill Gates", type: "INTP", achievement: "Co-founded Microsoft and became a leading philanthropist in global health and education" },
      { name: "Marie Curie", type: "INTP", achievement: "First woman to win a Nobel Prize, pioneered research on radioactivity" }
    ],
    actionSteps: [
      "Dive deep into programming languages like Python or R — they align perfectly with your analytical mind",
      "Participate in Math Olympiads, science fairs, or coding competitions",
      "Explore research opportunities through INSPIRE or KVPY scholarship programs",
      "Build personal projects (apps, theories, models) to showcase your curiosity",
      "Consider JEE Advanced, GRE, or GATE for top research universities"
    ]
  },

  ENTJ: {
    streams: {
      primary: "Commerce & Management",
      secondary: ["Law", "Engineering"],
      explanation: "Your natural leadership, decisiveness, and strategic vision make you a born leader. Commerce, management, and law are fields where you can drive results and lead teams."
    },
    careerPaths: [
      {
        title: "CEO / Entrepreneur",
        description: "Build and lead organizations from the ground up, making strategic decisions that shape industries.",
        qualifications: "MBA or strong domain expertise + leadership experience",
        salaryRange: "₹20L – ₹1Cr+ per annum",
        icon: "building"
      },
      {
        title: "Corporate Lawyer",
        description: "Advise businesses on legal matters, negotiate deals, and handle complex corporate litigation.",
        qualifications: "LLB/LLM from top law school (CLAT/LSAT)",
        salaryRange: "₹10L – ₹50L per annum",
        icon: "gavel"
      },
      {
        title: "Management Consultant",
        description: "Help organizations improve their performance through strategic analysis and operational optimization.",
        qualifications: "MBA from premier institute + consulting experience",
        salaryRange: "₹15L – ₹60L per annum",
        icon: "strategy"
      },
      {
        title: "Financial Analyst",
        description: "Evaluate investment opportunities, analyze market trends, and guide financial decision-making.",
        qualifications: "B.Com/MBA Finance / CFA / CA",
        salaryRange: "₹8L – ₹35L per annum",
        icon: "finance"
      },
      {
        title: "Product Manager",
        description: "Own the vision and strategy for products, bridging technology and business to deliver user value.",
        qualifications: "B.Tech/MBA + product experience",
        salaryRange: "₹15L – ₹50L per annum",
        icon: "product"
      },
      {
        title: "Political Leader / IAS Officer",
        description: "Shape public policy and governance through leadership in government and civil services.",
        qualifications: "UPSC Civil Services / Political Science background",
        salaryRange: "₹10L – ₹25L per annum (+ influence)",
        icon: "government"
      }
    ],
    aptitudeAlignment: {
      strongSkills: ["Leadership", "Strategic planning", "Decision-making", "Public speaking"],
      skillsToDevelop: ["Patience", "Empathy", "Listening to differing viewpoints"],
      recommendedSubjects: ["Business Studies", "Economics", "Political Science", "Mathematics"]
    },
    roleModels: [
      { name: "Steve Jobs", type: "ENTJ", achievement: "Co-founded Apple and revolutionized personal computing, smartphones, and digital media" },
      { name: "Margaret Thatcher", type: "ENTJ", achievement: "First female Prime Minister of the UK, known as the 'Iron Lady' for her strong leadership" },
      { name: "Napoleon Bonaparte", type: "ENTJ", achievement: "Military genius and Emperor who reformed French law, education, and governance" }
    ],
    actionSteps: [
      "Start building leadership experience through student council, clubs, or volunteer organizations",
      "Prepare for CAT/GMAT if targeting top MBA programs, or CLAT for law",
      "Read business case studies and biographies of leaders you admire",
      "Start a small venture or side project to understand entrepreneurship firsthand",
      "Focus on building communication and negotiation skills through debate clubs"
    ]
  },

  ENTP: {
    streams: {
      primary: "Commerce & Entrepreneurship",
      secondary: ["Science", "Arts & Media"],
      explanation: "Your quick thinking, love for debate, and ability to see possibilities everywhere make you a natural innovator. Fields that reward creative problem-solving and persuasion are your playground."
    },
    careerPaths: [
      {
        title: "Entrepreneur",
        description: "Launch and grow your own ventures, disrupting industries with innovative ideas and bold execution.",
        qualifications: "Any degree + entrepreneurial mindset and hustle",
        salaryRange: "Variable — ₹5L to ₹1Cr+ per annum",
        icon: "rocket"
      },
      {
        title: "Product Manager",
        description: "Define product strategy, understand user needs, and coordinate cross-functional teams to build great products.",
        qualifications: "B.Tech/MBA + analytical and communication skills",
        salaryRange: "₹15L – ₹50L per annum",
        icon: "product"
      },
      {
        title: "Political Scientist",
        description: "Analyze political systems, public policy, and power dynamics through research and commentary.",
        qualifications: "MA/PhD in Political Science",
        salaryRange: "₹6L – ₹20L per annum",
        icon: "government"
      },
      {
        title: "Journalist / Media Professional",
        description: "Investigate and report stories that inform the public, working across print, digital, and broadcast media.",
        qualifications: "Degree in Journalism/Mass Communication",
        salaryRange: "₹5L – ₹25L per annum",
        icon: "newspaper"
      },
      {
        title: "Marketing Strategist",
        description: "Develop creative marketing campaigns and brand strategies that capture attention and drive growth.",
        qualifications: "MBA Marketing / Digital marketing certifications",
        salaryRange: "₹8L – ₹35L per annum",
        icon: "megaphone"
      },
      {
        title: "Venture Capitalist",
        description: "Evaluate and invest in promising startups, combining business acumen with an eye for innovation.",
        qualifications: "MBA / Finance background + startup experience",
        salaryRange: "₹15L – ₹1Cr+ per annum",
        icon: "finance"
      }
    ],
    aptitudeAlignment: {
      strongSkills: ["Creative thinking", "Debate and persuasion", "Quick adaptation", "Spotting opportunities"],
      skillsToDevelop: ["Follow-through on projects", "Attention to detail", "Sensitivity in communication"],
      recommendedSubjects: ["Economics", "English", "Business Studies", "Psychology"]
    },
    roleModels: [
      { name: "Mark Twain", type: "ENTP", achievement: "One of America's greatest writers, known for sharp wit and social commentary" },
      { name: "Thomas Edison", type: "ENTP", achievement: "Invented the light bulb, phonograph, and motion picture camera — held 1,093 patents" },
      { name: "Socrates", type: "ENTP", achievement: "Founded Western philosophy through relentless questioning and the Socratic method" }
    ],
    actionSteps: [
      "Start a blog, YouTube channel, or podcast to sharpen your communication and idea-sharing skills",
      "Join debate clubs and Model UN to practice persuasion and public speaking",
      "Experiment with small business ideas or freelance projects to learn entrepreneurship",
      "Explore courses in design thinking, startup management, or digital marketing",
      "Build a diverse reading habit — mix business, science, philosophy, and current affairs"
    ]
  },

  INFJ: {
    streams: {
      primary: "Arts & Social Sciences",
      secondary: ["Medicine", "Psychology"],
      explanation: "Your deep empathy, vision for a better world, and exceptional communication skills make you suited for fields where you can make a meaningful impact on people's lives."
    },
    careerPaths: [
      {
        title: "Psychologist / Counselor",
        description: "Help individuals navigate mental health challenges, relationships, and personal growth through therapy and guidance.",
        qualifications: "MA/M.Phil in Psychology + RCI license",
        salaryRange: "₹6L – ₹25L per annum",
        icon: "brain"
      },
      {
        title: "Social Worker",
        description: "Advocate for vulnerable populations, design community programs, and drive social change.",
        qualifications: "MSW (Master of Social Work)",
        salaryRange: "₹4L – ₹15L per annum",
        icon: "heart"
      },
      {
        title: "Author / Writer",
        description: "Express ideas and stories through books, articles, and creative writing that inspire and educate.",
        qualifications: "Strong writing portfolio + degree in literature/journalism",
        salaryRange: "₹3L – ₹30L per annum",
        icon: "pen"
      },
      {
        title: "Doctor (Psychiatry)",
        description: "Diagnose and treat mental health conditions, combining medical expertise with deep human understanding.",
        qualifications: "MBBS + MD Psychiatry (NEET required)",
        salaryRange: "₹12L – ₹40L per annum",
        icon: "stethoscope"
      },
      {
        title: "UX Designer",
        description: "Design intuitive digital experiences by deeply understanding user needs and behavior patterns.",
        qualifications: "Degree in Design/HCI + UX portfolio",
        salaryRange: "₹8L – ₹30L per annum",
        icon: "design"
      },
      {
        title: "Non-Profit Director",
        description: "Lead organizations focused on social impact, managing teams and resources for maximum community benefit.",
        qualifications: "MBA/MSW + non-profit experience",
        salaryRange: "₹8L – ₹25L per annum",
        icon: "globe"
      }
    ],
    aptitudeAlignment: {
      strongSkills: ["Empathy", "Written communication", "Strategic vision", "Understanding people's motivations"],
      skillsToDevelop: ["Setting boundaries", "Practical decision-making", "Self-care and avoiding burnout"],
      recommendedSubjects: ["Psychology", "English Literature", "Sociology", "Biology"]
    },
    roleModels: [
      { name: "Martin Luther King Jr.", type: "INFJ", achievement: "Led the American civil rights movement through nonviolent resistance and powerful oratory" },
      { name: "Nelson Mandela", type: "INFJ", achievement: "Ended apartheid in South Africa and became the country's first Black president" },
      { name: "Lady Gaga", type: "INFJ", achievement: "Grammy-winning artist and mental health advocate who champions self-expression" }
    ],
    actionSteps: [
      "Start journaling or blogging to develop your exceptional writing skills",
      "Volunteer with NGOs or community organizations to gain real-world social impact experience",
      "If interested in medicine, begin NEET preparation; for psychology, explore BA Psychology programs",
      "Take online courses in UX design, counseling, or creative writing on platforms like Coursera",
      "Read widely about social issues, psychology, and philosophy to deepen your worldview"
    ]
  },

  INFP: {
    streams: {
      primary: "Arts & Humanities",
      secondary: ["Literature", "Design"],
      explanation: "Your creativity, strong values, and desire for authentic self-expression make arts and humanities your natural home. You thrive when you can bring meaning and beauty to the world."
    },
    careerPaths: [
      {
        title: "Author / Poet",
        description: "Create literary works that touch hearts, provoke thought, and capture the human experience.",
        qualifications: "Strong writing portfolio + degree in literature/creative writing",
        salaryRange: "₹3L – ₹25L per annum",
        icon: "pen"
      },
      {
        title: "Counselor / Therapist",
        description: "Guide individuals through personal challenges using empathy, active listening, and therapeutic techniques.",
        qualifications: "MA/M.Phil in Psychology or Counseling",
        salaryRange: "₹5L – ₹20L per annum",
        icon: "heart"
      },
      {
        title: "Filmmaker / Documentarian",
        description: "Tell compelling visual stories that educate, entertain, and inspire audiences worldwide.",
        qualifications: "Degree in Film/Media Studies + portfolio",
        salaryRange: "₹4L – ₹30L per annum",
        icon: "camera"
      },
      {
        title: "Graphic Designer",
        description: "Create visual concepts using design software to communicate ideas that inspire and captivate.",
        qualifications: "Degree in Design/Fine Arts + design portfolio",
        salaryRange: "₹4L – ₹20L per annum",
        icon: "palette"
      },
      {
        title: "Music Therapist",
        description: "Use music interventions to address emotional, cognitive, and social needs of clients.",
        qualifications: "Degree in Music + certification in music therapy",
        salaryRange: "₹4L – ₹15L per annum",
        icon: "music"
      },
      {
        title: "Content Writer / Journalist",
        description: "Craft engaging written content for digital platforms, publications, and brands.",
        qualifications: "Degree in Journalism/English + writing samples",
        salaryRange: "₹4L – ₹18L per annum",
        icon: "newspaper"
      }
    ],
    aptitudeAlignment: {
      strongSkills: ["Creative expression", "Empathy", "Imagination", "Deep listening"],
      skillsToDevelop: ["Practical decision-making", "Assertiveness", "Handling criticism constructively"],
      recommendedSubjects: ["English Literature", "Fine Arts", "Psychology", "Music"]
    },
    roleModels: [
      { name: "William Shakespeare", type: "INFP", achievement: "The greatest playwright in the English language, exploring the full spectrum of human emotion" },
      { name: "J.R.R. Tolkien", type: "INFP", achievement: "Created the rich fantasy world of Middle-earth in The Lord of the Rings" },
      { name: "Princess Diana", type: "INFP", achievement: "Beloved royal who used her platform to champion humanitarian causes worldwide" }
    ],
    actionSteps: [
      "Build a creative portfolio — start writing, designing, or creating art regularly",
      "Explore BA programs in English, Fine Arts, Psychology, or Film Studies",
      "Join writing workshops, art exhibitions, or open mic events to share your work",
      "Use platforms like Behance, Medium, or Wattpad to showcase your creativity online",
      "Connect with mentors in your field of interest through community events or online forums"
    ]
  },

  ENFJ: {
    streams: {
      primary: "Humanities & Education",
      secondary: ["Commerce", "Social Sciences"],
      explanation: "Your charisma, empathy, and natural ability to inspire others make you a born teacher and leader. Fields that involve guiding, mentoring, and uplifting people are where you shine."
    },
    careerPaths: [
      {
        title: "Teacher / Professor",
        description: "Educate and inspire the next generation through engaging teaching and mentorship.",
        qualifications: "B.Ed/MA in relevant subject + NET/SET for higher education",
        salaryRange: "₹5L – ₹20L per annum",
        icon: "school"
      },
      {
        title: "HR Manager",
        description: "Manage talent acquisition, employee development, and organizational culture.",
        qualifications: "MBA HR / MA in HRM",
        salaryRange: "₹8L – ₹30L per annum",
        icon: "people"
      },
      {
        title: "Public Relations Manager",
        description: "Shape and maintain the public image of organizations through strategic communication.",
        qualifications: "Degree in Mass Communication/PR + experience",
        salaryRange: "₹6L – ₹25L per annum",
        icon: "megaphone"
      },
      {
        title: "Social Entrepreneur",
        description: "Build organizations that solve social problems while sustaining themselves financially.",
        qualifications: "MBA/MSW + passion for social impact",
        salaryRange: "₹6L – ₹30L per annum",
        icon: "globe"
      },
      {
        title: "Life Coach",
        description: "Help individuals set and achieve personal and professional goals through structured coaching.",
        qualifications: "Coaching certification (ICF) + psychology background",
        salaryRange: "₹5L – ₹25L per annum",
        icon: "star"
      },
      {
        title: "Diplomat / Foreign Service Officer",
        description: "Represent your country in international relations, negotiations, and cultural exchange.",
        qualifications: "UPSC Civil Services / MA in International Relations",
        salaryRange: "₹10L – ₹25L per annum",
        icon: "government"
      }
    ],
    aptitudeAlignment: {
      strongSkills: ["Inspiring others", "Communication", "Teambuilding", "Conflict resolution"],
      skillsToDevelop: ["Setting personal boundaries", "Accepting imperfection in others", "Self-care"],
      recommendedSubjects: ["Psychology", "Sociology", "English", "Political Science"]
    },
    roleModels: [
      { name: "Barack Obama", type: "ENFJ", achievement: "44th President of the United States, known for his inspiring leadership and oratory" },
      { name: "Oprah Winfrey", type: "ENFJ", achievement: "Media mogul and philanthropist who became one of the world's most influential voices" },
      { name: "Malala Yousafzai", type: "ENFJ", achievement: "Youngest Nobel Prize laureate, championing girls' education worldwide" }
    ],
    actionSteps: [
      "Take on leadership roles in school — student council, event organizing, or community service",
      "Explore BA programs in Psychology, Sociology, or English with a focus on education or social work",
      "Develop public speaking skills through debate clubs, TED-style talks, or toastmasters",
      "Volunteer as a tutor or mentor to younger students to build teaching experience",
      "Consider competitive exams like UPSC, NET, or CAT depending on your career direction"
    ]
  },

  ENFP: {
    streams: {
      primary: "Arts & Media",
      secondary: ["Marketing", "Social Sciences"],
      explanation: "Your enthusiasm, creativity, and people skills make you a natural in creative and social fields. You thrive where you can explore ideas, connect with people, and bring energy to everything you do."
    },
    careerPaths: [
      {
        title: "Actor / Performer",
        description: "Bring stories to life on stage, screen, or digital platforms through the art of performance.",
        qualifications: "Degree in Performing Arts/Theatre + portfolio",
        salaryRange: "₹3L – ₹50L+ per annum",
        icon: "theatre"
      },
      {
        title: "Journalist / Media Professional",
        description: "Tell stories that matter through investigative reporting, broadcasting, or digital media.",
        qualifications: "Degree in Journalism/Mass Communication",
        salaryRange: "₹5L – ₹25L per annum",
        icon: "newspaper"
      },
      {
        title: "Marketing Manager",
        description: "Create and execute marketing strategies that build brands and engage audiences.",
        qualifications: "MBA Marketing / Digital marketing expertise",
        salaryRange: "₹8L – ₹35L per annum",
        icon: "megaphone"
      },
      {
        title: "Life Coach",
        description: "Inspire and guide individuals to unlock their full potential through coaching and motivation.",
        qualifications: "ICF coaching certification + psychology background",
        salaryRange: "₹5L – ₹25L per annum",
        icon: "star"
      },
      {
        title: "Travel Blogger / Content Creator",
        description: "Create engaging content about travel, culture, and lifestyle for digital audiences.",
        qualifications: "Content creation skills + social media expertise",
        salaryRange: "₹3L – ₹30L per annum",
        icon: "globe"
      },
      {
        title: "Event Manager",
        description: "Plan and execute memorable events, from corporate conferences to cultural festivals.",
        qualifications: "Degree in Event Management/Hospitality",
        salaryRange: "₹5L – ₹20L per annum",
        icon: "calendar"
      }
    ],
    aptitudeAlignment: {
      strongSkills: ["Creativity", "Enthusiasm", "People connection", "Brainstorming"],
      skillsToDevelop: ["Focus and follow-through", "Organization", "Time management"],
      recommendedSubjects: ["English", "Psychology", "Media Studies", "Business Studies"]
    },
    roleModels: [
      { name: "Robin Williams", type: "ENFP", achievement: "Beloved actor and comedian known for his incredible improvisation and emotional depth" },
      { name: "Walt Disney", type: "ENFP", achievement: "Created the world's most famous entertainment empire through boundless imagination" },
      { name: "Robert Downey Jr.", type: "ENFP", achievement: "Iconic actor who brought Iron Man to life and inspired millions with his comeback story" }
    ],
    actionSteps: [
      "Start creating content on social media, YouTube, or a blog on topics you love",
      "Join theatre, drama, or improv groups to explore your performance instincts",
      "Explore BA programs in Media, Communications, English, or Psychology",
      "Attend workshops in digital marketing, content creation, or event management",
      "Network actively — attend meetups, conferences, and creative communities"
    ]
  },

  ISTJ: {
    streams: {
      primary: "Science & Law",
      secondary: ["Commerce", "Civil Services"],
      explanation: "Your reliability, attention to detail, and respect for systems make you ideal for structured fields that value precision and integrity."
    },
    careerPaths: [
      {
        title: "Accountant / CA",
        description: "Manage financial records, auditing, and tax compliance for organizations with exacting precision.",
        qualifications: "B.Com + CA/CMA certification",
        salaryRange: "₹6L – ₹25L per annum",
        icon: "calculator"
      },
      {
        title: "Judge / Legal Professional",
        description: "Uphold justice and interpret the law in courts or legal institutions.",
        qualifications: "LLB + judicial service exam",
        salaryRange: "₹8L – ₹30L per annum",
        icon: "gavel"
      },
      {
        title: "Database Administrator",
        description: "Maintain, secure, and optimize database systems that power organizations.",
        qualifications: "B.Tech CS + certifications (Oracle, SQL Server)",
        salaryRange: "₹6L – ₹25L per annum",
        icon: "database"
      },
      {
        title: "Quality Analyst",
        description: "Ensure products and services meet defined standards through systematic testing and evaluation.",
        qualifications: "B.Tech/B.Sc + quality certifications (Six Sigma)",
        salaryRange: "₹5L – ₹20L per annum",
        icon: "checkmark"
      },
      {
        title: "Military Officer",
        description: "Lead and serve in the armed forces, maintaining discipline and national security.",
        qualifications: "NDA/CDS exam + training at military academy",
        salaryRange: "₹8L – ₹20L per annum (+ benefits)",
        icon: "shield"
      },
      {
        title: "Civil Servant (IAS/IPS)",
        description: "Manage governance, public policy, and administration at national and state levels.",
        qualifications: "Any degree + UPSC Civil Services exam",
        salaryRange: "₹10L – ₹25L per annum (+ influence)",
        icon: "government"
      }
    ],
    aptitudeAlignment: {
      strongSkills: ["Attention to detail", "Organization", "Reliability", "Systematic thinking"],
      skillsToDevelop: ["Flexibility and adaptability", "Creative problem-solving", "Openness to change"],
      recommendedSubjects: ["Accountancy", "Mathematics", "Law", "Computer Science"]
    },
    roleModels: [
      { name: "George Washington", type: "ISTJ", achievement: "First President of the United States, led the nation through its founding years with steady leadership" },
      { name: "Queen Elizabeth II", type: "ISTJ", achievement: "Longest-reigning British monarch, known for her unwavering sense of duty" },
      { name: "Warren Buffett", type: "ISTJ", achievement: "World's most successful investor, known for disciplined, long-term value investing" }
    ],
    actionSteps: [
      "Build strong foundations in Accounting, Mathematics, and Legal Studies",
      "If interested in CA/CMA, begin foundation course preparation early",
      "For law, prepare for CLAT/AILET entrance exams; for civil services, start UPSC prep",
      "Develop organizational skills through project management tools and planning",
      "Gain practical experience through internships in law firms, CA offices, or government bodies"
    ]
  },

  ISFJ: {
    streams: {
      primary: "Medicine & Education",
      secondary: ["Social Work", "Healthcare"],
      explanation: "Your warmth, loyalty, and desire to support others make medicine, education, and social work natural fits. You thrive in roles where you can directly improve people's lives."
    },
    careerPaths: [
      {
        title: "Nurse / Healthcare Professional",
        description: "Provide compassionate patient care, health education, and clinical support in healthcare settings.",
        qualifications: "B.Sc Nursing / GNM diploma",
        salaryRange: "₹4L – ₹15L per annum",
        icon: "stethoscope"
      },
      {
        title: "Teacher",
        description: "Educate and nurture students through engaging lessons and personal mentorship.",
        qualifications: "B.Ed + subject degree (BA/B.Sc)",
        salaryRange: "₹4L – ₹15L per annum",
        icon: "school"
      },
      {
        title: "Librarian",
        description: "Curate knowledge, manage information resources, and help others discover the joy of learning.",
        qualifications: "M.Lib (Master of Library Science)",
        salaryRange: "₹3L – ₹12L per annum",
        icon: "book"
      },
      {
        title: "Social Worker",
        description: "Support vulnerable communities through counseling, advocacy, and community program management.",
        qualifications: "MSW (Master of Social Work)",
        salaryRange: "₹4L – ₹15L per annum",
        icon: "heart"
      },
      {
        title: "Healthcare Administrator",
        description: "Manage operations, staffing, and logistics in hospitals and healthcare institutions.",
        qualifications: "MHA / MBA Healthcare Management",
        salaryRange: "₹6L – ₹20L per annum",
        icon: "hospital"
      },
      {
        title: "Dietitian / Nutritionist",
        description: "Help individuals improve health through personalized nutrition plans and dietary counseling.",
        qualifications: "B.Sc/M.Sc in Nutrition + certification",
        salaryRange: "₹4L – ₹15L per annum",
        icon: "nutrition"
      }
    ],
    aptitudeAlignment: {
      strongSkills: ["Caregiving", "Reliability", "Patience", "Attention to individual needs"],
      skillsToDevelop: ["Assertiveness", "Self-advocacy", "Embracing change"],
      recommendedSubjects: ["Biology", "Psychology", "Home Science", "Sociology"]
    },
    roleModels: [
      { name: "Mother Teresa", type: "ISFJ", achievement: "Nobel Peace Prize winner who dedicated her life to serving the poorest of the poor" },
      { name: "Kate Middleton", type: "ISFJ", achievement: "Princess of Wales, using her platform to champion early childhood development" },
      { name: "Beyoncé", type: "ISFJ", achievement: "Global music icon who combines artistry with philanthropy and community empowerment" }
    ],
    actionSteps: [
      "If interested in medicine/nursing, prepare for NEET or nursing entrance exams",
      "Volunteer in hospitals, old-age homes, or community centers to build caregiving experience",
      "For education, explore B.Ed programs and consider teaching internships",
      "Build empathy-driven skills through counseling workshops or first-aid courses",
      "Explore scholarships for healthcare and social work programs"
    ]
  },

  ESTJ: {
    streams: {
      primary: "Commerce & Management",
      secondary: ["Law", "Administration"],
      explanation: "Your organizational skills, directness, and leadership ability make you ideal for structured management and administrative roles. You bring order and efficiency everywhere you go."
    },
    careerPaths: [
      {
        title: "Operations Manager",
        description: "Oversee daily operations, optimize processes, and ensure smooth organizational functioning.",
        qualifications: "MBA Operations / B.Com + management experience",
        salaryRange: "₹8L – ₹30L per annum",
        icon: "settings"
      },
      {
        title: "Business Administrator",
        description: "Manage business functions including finance, HR, and strategy to drive organizational growth.",
        qualifications: "BBA/MBA from recognized institute",
        salaryRange: "₹6L – ₹25L per annum",
        icon: "building"
      },
      {
        title: "Police Officer / IPS",
        description: "Maintain law and order, investigate crimes, and serve the public through law enforcement.",
        qualifications: "Any degree + UPSC/State PSC exam",
        salaryRange: "₹8L – ₹20L per annum (+ benefits)",
        icon: "shield"
      },
      {
        title: "Judge / Magistrate",
        description: "Preside over legal proceedings and deliver judgments based on law and evidence.",
        qualifications: "LLB + judicial service examination",
        salaryRange: "₹10L – ₹30L per annum",
        icon: "gavel"
      },
      {
        title: "Project Manager",
        description: "Plan, execute, and close projects on time and within budget across any industry.",
        qualifications: "Any degree + PMP/Prince2 certification",
        salaryRange: "₹10L – ₹35L per annum",
        icon: "calendar"
      },
      {
        title: "Bank Manager",
        description: "Lead branch operations, manage teams, and ensure banking services meet customer needs.",
        qualifications: "B.Com/MBA + banking exam (IBPS PO/SBI PO)",
        salaryRange: "₹6L – ₹20L per annum",
        icon: "finance"
      }
    ],
    aptitudeAlignment: {
      strongSkills: ["Organization", "Leadership", "Efficiency", "Rule enforcement"],
      skillsToDevelop: ["Flexibility", "Emotional sensitivity", "Creative thinking"],
      recommendedSubjects: ["Business Studies", "Accountancy", "Law", "Economics"]
    },
    roleModels: [
      { name: "Sonia Sotomayor", type: "ESTJ", achievement: "First Latina Supreme Court Justice in the United States" },
      { name: "Frank Sinatra", type: "ESTJ", achievement: "Legendary entertainer who defined an era of American music and film" },
      { name: "Judge Judy", type: "ESTJ", achievement: "America's most famous TV judge, known for her no-nonsense approach to justice" }
    ],
    actionSteps: [
      "Focus on Commerce subjects — Accountancy, Business Studies, Economics",
      "Prepare for banking exams (IBPS/SBI) or management entrance (CAT/XAT) based on career choice",
      "Build leadership experience through NCC, scouts/guides, or organizing school events",
      "For law enforcement, maintain physical fitness and prepare for UPSC/State PSC exams",
      "Learn project management tools and methodologies through online courses"
    ]
  },

  ESFJ: {
    streams: {
      primary: "Education & Healthcare",
      secondary: ["HR", "Hospitality"],
      explanation: "Your warmth, social awareness, and desire to help others make education, healthcare, and people-centric roles your sweet spot. You thrive when you can build strong communities."
    },
    careerPaths: [
      {
        title: "Teacher / Educator",
        description: "Create supportive learning environments and help students discover their potential.",
        qualifications: "B.Ed + subject degree",
        salaryRange: "₹4L – ₹15L per annum",
        icon: "school"
      },
      {
        title: "Nurse / Healthcare Worker",
        description: "Provide compassionate patient care and health education in clinical settings.",
        qualifications: "B.Sc Nursing / GNM",
        salaryRange: "₹4L – ₹15L per annum",
        icon: "stethoscope"
      },
      {
        title: "Event Planner",
        description: "Organize memorable events — from weddings to corporate conferences — with attention to every detail.",
        qualifications: "Degree in Event Management/Hospitality",
        salaryRange: "₹4L – ₹18L per annum",
        icon: "calendar"
      },
      {
        title: "HR Manager",
        description: "Foster positive workplace culture, manage recruitment, and support employee development.",
        qualifications: "MBA HR / MA in HRM",
        salaryRange: "₹8L – ₹30L per annum",
        icon: "people"
      },
      {
        title: "Public Relations Officer",
        description: "Build and maintain positive public image for organizations through strategic communication.",
        qualifications: "Degree in Mass Communication/PR",
        salaryRange: "₹5L – ₹22L per annum",
        icon: "megaphone"
      },
      {
        title: "Customer Success Manager",
        description: "Ensure clients achieve their goals with your product or service through proactive support.",
        qualifications: "Any degree + strong interpersonal skills",
        salaryRange: "₹6L – ₹20L per annum",
        icon: "star"
      }
    ],
    aptitudeAlignment: {
      strongSkills: ["Social awareness", "Team coordination", "Empathy", "Service orientation"],
      skillsToDevelop: ["Handling criticism", "Independent decision-making", "Embracing change"],
      recommendedSubjects: ["Psychology", "Home Science", "English", "Business Studies"]
    },
    roleModels: [
      { name: "Taylor Swift", type: "ESFJ", achievement: "One of the best-selling music artists of all time, known for connecting deeply with fans" },
      { name: "Jennifer Garner", type: "ESFJ", achievement: "Acclaimed actress and activist championing children's education and health" },
      { name: "Bill Clinton", type: "ESFJ", achievement: "42nd US President known for charismatic leadership and global humanitarian work" }
    ],
    actionSteps: [
      "Volunteer as a tutor, community organizer, or event helper to build your people skills",
      "Explore B.Ed, B.Sc Nursing, or BHM (Hotel Management) programs based on interest",
      "Join clubs focused on community service, cultural events, or peer counseling",
      "Develop digital skills for modern HR/PR roles through online certifications",
      "Practice conflict resolution and leadership through group activities"
    ]
  },

  ISTP: {
    streams: {
      primary: "Engineering & Technology",
      secondary: ["Forensics", "Sports Science"],
      explanation: "Your hands-on approach, calm under pressure, and love for understanding how things work make engineering and technology perfect for you. You excel when you can build, fix, and experiment."
    },
    careerPaths: [
      {
        title: "Mechanical Engineer",
        description: "Design, build, and maintain mechanical systems from engines to robotics.",
        qualifications: "B.Tech/B.E in Mechanical Engineering (JEE)",
        salaryRange: "₹5L – ₹25L per annum",
        icon: "settings"
      },
      {
        title: "Forensic Scientist",
        description: "Use scientific methods to analyze evidence and solve crimes in collaboration with law enforcement.",
        qualifications: "M.Sc Forensic Science + lab experience",
        salaryRange: "₹5L – ₹20L per annum",
        icon: "microscope"
      },
      {
        title: "Pilot",
        description: "Fly commercial or military aircraft, combining technical skill with cool-headed decision-making.",
        qualifications: "CPL (Commercial Pilot License) + flying hours",
        salaryRange: "₹15L – ₹50L per annum",
        icon: "plane"
      },
      {
        title: "Data Analyst",
        description: "Analyze data to find actionable insights, using tools and visualizations to inform decisions.",
        qualifications: "B.Tech/B.Sc + data analytics certifications",
        salaryRange: "₹5L – ₹20L per annum",
        icon: "chart"
      },
      {
        title: "Software Developer",
        description: "Build software applications and systems through practical coding and problem-solving.",
        qualifications: "B.Tech CS / BCA + programming skills",
        salaryRange: "₹5L – ₹30L per annum",
        icon: "code"
      },
      {
        title: "Automobile Engineer",
        description: "Design and develop vehicles and automotive systems, combining mechanics with innovation.",
        qualifications: "B.Tech in Automobile/Mechanical Engineering",
        salaryRange: "₹5L – ₹22L per annum",
        icon: "car"
      }
    ],
    aptitudeAlignment: {
      strongSkills: ["Hands-on problem-solving", "Logical analysis", "Calm under pressure", "Mechanical aptitude"],
      skillsToDevelop: ["Emotional expression", "Long-term planning", "Teamwork"],
      recommendedSubjects: ["Physics", "Mathematics", "Computer Science", "Workshop/Practical subjects"]
    },
    roleModels: [
      { name: "Michael Jordan", type: "ISTP", achievement: "Considered the greatest basketball player of all time, known for his competitive drive" },
      { name: "Bear Grylls", type: "ISTP", achievement: "Adventurer and survival expert who became a global TV personality" },
      { name: "Clint Eastwood", type: "ISTP", achievement: "Legendary actor and filmmaker known for his cool, understated style" }
    ],
    actionSteps: [
      "Get hands-on with electronics, coding, or mechanical projects — build something!",
      "Prepare for JEE Mains/Advanced if targeting top engineering colleges",
      "Explore coding languages like C++, Python, or JavaScript through practical projects",
      "Join robotics clubs, maker spaces, or auto workshops to build practical skills",
      "Consider NDA for a military career or flying school for aviation"
    ]
  },

  ISFP: {
    streams: {
      primary: "Arts & Design",
      secondary: ["Healthcare", "Culinary Arts"],
      explanation: "Your artistic sensitivity, desire for freedom, and appreciation of beauty make creative and design fields your natural calling. You express yourself best through actions and aesthetic creation."
    },
    careerPaths: [
      {
        title: "Fashion Designer",
        description: "Create clothing and accessories that blend artistic vision with wearable design.",
        qualifications: "Degree in Fashion Design (NIFT/NID entrance)",
        salaryRange: "₹4L – ₹25L per annum",
        icon: "palette"
      },
      {
        title: "Artist / Illustrator",
        description: "Create visual art through painting, digital illustration, or mixed media.",
        qualifications: "BFA (Bachelor of Fine Arts) + portfolio",
        salaryRange: "₹3L – ₹20L per annum",
        icon: "palette"
      },
      {
        title: "Veterinarian",
        description: "Care for animals through medical treatment, surgery, and preventive health programs.",
        qualifications: "BVSc (Bachelor of Veterinary Science) via NEET",
        salaryRange: "₹5L – ₹18L per annum",
        icon: "paw"
      },
      {
        title: "Chef",
        description: "Create culinary experiences by designing menus, cooking innovative dishes, and running kitchens.",
        qualifications: "Diploma/Degree in Culinary Arts (IHM)",
        salaryRange: "₹4L – ₹20L per annum",
        icon: "chef"
      },
      {
        title: "Physical Therapist",
        description: "Help patients recover mobility and manage pain through therapeutic exercises and treatments.",
        qualifications: "BPT (Bachelor of Physiotherapy)",
        salaryRange: "₹4L – ₹18L per annum",
        icon: "heart"
      },
      {
        title: "Interior Designer",
        description: "Transform spaces into beautiful, functional environments through creative design solutions.",
        qualifications: "Degree in Interior Design (NID/CEPT entrance)",
        salaryRange: "₹4L – ₹20L per annum",
        icon: "design"
      }
    ],
    aptitudeAlignment: {
      strongSkills: ["Aesthetic sense", "Hands-on creativity", "Sensitivity to environment", "Adaptability"],
      skillsToDevelop: ["Planning ahead", "Verbal communication", "Assertiveness"],
      recommendedSubjects: ["Fine Arts", "Biology", "Home Science", "Design"]
    },
    roleModels: [
      { name: "Bob Dylan", type: "ISFP", achievement: "Nobel Prize-winning musician who revolutionized songwriting and American music" },
      { name: "Frida Kahlo", type: "ISFP", achievement: "Iconic Mexican artist known for deeply personal, emotionally powerful paintings" },
      { name: "Michael Jackson", type: "ISFP", achievement: "The King of Pop — the most awarded individual music artist in history" }
    ],
    actionSteps: [
      "Build a strong art/design portfolio — start creating and documenting your work now",
      "Prepare for NIFT/NID entrance if interested in fashion or design; NEET for veterinary science",
      "Explore online courses in graphic design, illustration, or digital art (Skillshare, Domestika)",
      "Visit art galleries, attend design workshops, and seek inspiration from diverse creative sources",
      "Consider culinary schools (IHM) or physiotherapy programs based on your interests"
    ]
  },

  ESTP: {
    streams: {
      primary: "Commerce & Sports",
      secondary: ["Entrepreneurship", "Law Enforcement"],
      explanation: "Your boldness, energy, and love for action make high-paced, results-driven fields your ideal environment. You thrive in roles where you can think on your feet and make things happen."
    },
    careerPaths: [
      {
        title: "Sales Manager",
        description: "Lead sales teams, close deals, and drive revenue growth through persuasion and strategy.",
        qualifications: "BBA/MBA Marketing + sales experience",
        salaryRange: "₹6L – ₹30L per annum",
        icon: "megaphone"
      },
      {
        title: "Stock Trader / Financial Analyst",
        description: "Analyze markets, make trading decisions, and manage financial portfolios in fast-paced environments.",
        qualifications: "B.Com/MBA Finance + certifications (CFA/NCFM)",
        salaryRange: "₹8L – ₹50L+ per annum",
        icon: "finance"
      },
      {
        title: "Professional Athlete",
        description: "Compete at the highest level in your sport, combining physical skill with competitive drive.",
        qualifications: "Sports training + national/international competition experience",
        salaryRange: "Variable — ₹3L to ₹10Cr+ per annum",
        icon: "trophy"
      },
      {
        title: "Entrepreneur",
        description: "Build your own business from scratch, taking calculated risks and leading by example.",
        qualifications: "Any background + business acumen and drive",
        salaryRange: "Variable — unlimited potential",
        icon: "rocket"
      },
      {
        title: "Real Estate Agent",
        description: "Buy, sell, and negotiate property deals, using your people skills and market knowledge.",
        qualifications: "Any degree + RERA registration + negotiation skills",
        salaryRange: "₹5L – ₹30L+ per annum",
        icon: "building"
      },
      {
        title: "Emergency Medical Technician",
        description: "Provide critical pre-hospital emergency care, thriving under pressure in life-saving situations.",
        qualifications: "EMT/Paramedic certification",
        salaryRange: "₹3L – ₹12L per annum",
        icon: "stethoscope"
      }
    ],
    aptitudeAlignment: {
      strongSkills: ["Quick decision-making", "Risk assessment", "Persuasion", "Physical coordination"],
      skillsToDevelop: ["Long-term planning", "Emotional sensitivity", "Patience"],
      recommendedSubjects: ["Business Studies", "Physical Education", "Economics", "Mathematics"]
    },
    roleModels: [
      { name: "Ernest Hemingway", type: "ESTP", achievement: "Nobel Prize-winning author known for adventurous life and crisp, powerful prose" },
      { name: "Madonna", type: "ESTP", achievement: "Queen of Pop who continually reinvented herself across a four-decade career" },
      { name: "Donald Trump", type: "ESTP", achievement: "Real estate mogul turned 45th President of the United States" }
    ],
    actionSteps: [
      "Channel your energy into competitive sports, entrepreneurship challenges, or debate",
      "Explore BBA, B.Com, or Sports Science programs based on your primary interest",
      "Start small business ventures or freelance projects to learn real-world business skills",
      "Build financial literacy — learn about stock markets, investing, and personal finance early",
      "Develop discipline and long-term thinking through structured goal-setting"
    ]
  },

  ESFP: {
    streams: {
      primary: "Arts & Media",
      secondary: ["Tourism", "Hospitality"],
      explanation: "Your spontaneity, social energy, and love for entertaining make performing arts, media, and hospitality your natural stage. You bring joy and excitement to every room you enter."
    },
    careerPaths: [
      {
        title: "Performer / Entertainer",
        description: "Entertain audiences through acting, comedy, music, or dance on stage and screen.",
        qualifications: "Training in performing arts + performance portfolio",
        salaryRange: "₹3L – ₹50L+ per annum",
        icon: "theatre"
      },
      {
        title: "Event Manager",
        description: "Plan and execute engaging events — from music festivals to corporate galas.",
        qualifications: "Degree in Event Management/Hospitality",
        salaryRange: "₹4L – ₹20L per annum",
        icon: "calendar"
      },
      {
        title: "Tour Guide / Travel Consultant",
        description: "Create unforgettable travel experiences, sharing culture and history with travelers worldwide.",
        qualifications: "Degree in Tourism + language skills + regional knowledge",
        salaryRange: "₹3L – ₹15L per annum",
        icon: "globe"
      },
      {
        title: "Social Media Influencer",
        description: "Build an engaged audience and create content that entertains, educates, and inspires.",
        qualifications: "Content creation skills + social media expertise",
        salaryRange: "₹2L – ₹50L+ per annum",
        icon: "camera"
      },
      {
        title: "Chef / Culinary Artist",
        description: "Create memorable dining experiences through innovative cooking and food presentation.",
        qualifications: "Diploma/Degree from IHM or culinary school",
        salaryRange: "₹4L – ₹20L per annum",
        icon: "chef"
      },
      {
        title: "Fitness Trainer",
        description: "Help people achieve their health and fitness goals through personalized training programs.",
        qualifications: "Fitness certification (ACE/ACSM) + sports background",
        salaryRange: "₹3L – ₹15L per annum",
        icon: "trophy"
      }
    ],
    aptitudeAlignment: {
      strongSkills: ["Social energy", "Performance", "Adaptability", "Hands-on creativity"],
      skillsToDevelop: ["Long-term focus", "Financial planning", "Handling criticism"],
      recommendedSubjects: ["Physical Education", "Fine Arts", "Media Studies", "Home Science"]
    },
    roleModels: [
      { name: "Marilyn Monroe", type: "ESFP", achievement: "Iconic actress, model, and cultural phenomenon who defined Hollywood glamour" },
      { name: "Elton John", type: "ESFP", achievement: "Legendary musician with 300M+ records sold, known for his flamboyant performances" },
      { name: "Jamie Oliver", type: "ESFP", achievement: "Celebrity chef who revolutionized school lunch programs and made cooking accessible" }
    ],
    actionSteps: [
      "Start performing — join dance troupes, music bands, theatre groups, or comedy open mics",
      "Build a social media presence showcasing your personality and talents",
      "Explore BHM (Hotel Management), Performing Arts, or Mass Communication programs",
      "Attend workshops in event management, food styling, or fitness training",
      "Travel and explore different cultures to broaden your perspective and fuel creativity"
    ]
  }
};

export default mbtiCareerMapping;
