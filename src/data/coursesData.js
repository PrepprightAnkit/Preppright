export const courseDetails = {
  "java-programming": {
    id: "java-programming",
    title: "Java Programming Mastery",
    subtitle: "Architect high-performance systems and master backend engineering with Java.",
    description: "Our Java Programming course is a deep-dive into the world of enterprise-grade software development. You will go from basic syntax to building complex distributed systems using Java's robust ecosystem. We focus on object-oriented design principles, efficient memory management, and modern framework integration.",
    rating: "4.9/5",
    duration: "3 Months",
    price: "₹3,000",
    projects_count: "4",
    placement_assist: "100%",
    students_enrolled: "15,420+",
    prerequisites: ["Basic understanding of programming logic", "A laptop with at least 8GB RAM", "Dedication to learn and practice daily"],
    tools_learned: ["IntelliJ IDEA", "Maven", "JUnit", "Spring Boot", "MySQL", "Git"],
    image_url: "/images/courses/abc/java.png",
    career_outcomes: ["Java Developer", "Backend Engineer", "System Architect", "Full Stack Developer"],
    syllabus: [
      { 
        title: "Module 1: Java Foundations & OOPs", 
        description: "Introduction to JVM, JDK, and JRE. Mastering Classes, Objects, Inheritance, Polymorphism, and Abstraction. Deep dive into Memory Management.",
        lessons: ["JVM Architecture", "Data Types & Operators", "Access Modifiers", "Inheritance & Interfaces"]
      },
      { 
        title: "Module 2: Advanced Data Handling", 
        description: "Collection Framework (List, Set, Map), Generics, Exception Handling, and Lambda Expressions. Introduction to Streams API.",
        lessons: ["Collection Hierarchy", "Stream API", "Lambda Expressions", "Custom Exceptions"]
      },
      { 
        title: "Module 3: Concurrency & File Systems", 
        description: "Multithreading, Synchronization, Executor Service, and Java I/O. Building high-concurrency applications.",
        lessons: ["Thread Lifecycle", "Locking Mechanisms", "File Reading/Writing", "Serialisation"]
      },
      { 
        title: "Module 4: JDBC & Spring Framework Basics", 
        description: "Connecting to databases using JDBC. Introduction to Spring Boot, Dependency Injection, and building RESTful APIs.",
        lessons: ["JDBC Drivers", "SQL Integration", "Spring Boot CLI", "Building REST APIs"]
      }
    ],
    projects: [
      { 
        title: "Enterprise Banking Engine", 
        description: "Build a secure, multithreaded banking engine capable of processing 1000+ transactions per second with full audit logging.",
        tech: ["Java", "Multithreading", "MySQL"]
      },
      { 
        title: "E-Commerce Inventory Manager", 
        description: "A robust inventory system with real-time stock tracking, automated alerts, and detailed sales reporting.",
        tech: ["Java FX", "JDBC", "PostgreSQL"]
      },
      { 
        title: "Social Media Backend API", 
        description: "Design and implement a scalable backend for a social media app including user auth, posting, and follow systems.",
        tech: ["Spring Boot", "JPA", "Git"]
      }
    ],
    instructors: [
      { name: "Dr. Arvind Subramaniam", role: "Former Senior Architect at Oracle", bio: "With 20 years in Java development, Dr. Arvind has authored 3 books on JVM internals." },
      { name: "Megha Kulkarni", role: "Software Lead @ Google", bio: "Megha is an expert in distributed systems and high-scale Java applications." }
    ]
  },
  "full-stack-web-development": {
    id: "full-stack-web-development",
    title: "Full Stack Web Development",
    subtitle: "Master the MERN stack and build production-ready applications.",
    description: "This comprehensive program covers the entire web development lifecycle. From crafting beautiful responsive frontends to architecting robust server-side logic and managing scalable databases. You will build and deploy real-world applications using modern best practices.",
    rating: "4.8/5",
    duration: "6 Months",
    price: "₹5,000",
    projects_count: "6",
    placement_assist: "100%",
    students_enrolled: "22,150+",
    prerequisites: ["Familiarity with computer basics", "Basic logical thinking", "Willingness to code for 4+ hours daily"],
    tools_learned: ["VS Code", "Node.js", "React", "MongoDB", "Express", "Docker", "AWS"],
    image_url: "/images/courses/abc/fullstack .png",
    career_outcomes: ["Full Stack Developer", "Frontend Developer", "Backend Developer", "MERN Developer"],
    syllabus: [
      { 
        title: "Phase 1: Frontend Excellence", 
        description: "Advanced HTML5, CSS3 (Sass/Tailwind), and Modern JavaScript (ES6+). State management with React and Redux.",
        lessons: ["Semantic HTML", "Flexbox/Grid", "ES6 Modules", "React Hooks"]
      },
      { 
        title: "Phase 2: Backend Architecture", 
        description: "Server-side programming with Node.js and Express. Building secure RESTful APIs and real-time communication with Socket.io.",
        lessons: ["Node.js Event Loop", "Express Middleware", "JWT Auth", "WebSocket"]
      },
      { 
        title: "Phase 3: Database & Cloud", 
        description: "NoSQL with MongoDB and SQL with PostgreSQL. Deploying to AWS and Vercel. CI/CD pipelines.",
        lessons: ["Schema Design", "Aggregation Pipeline", "Dockerization", "CI/CD Setup"]
      }
    ],
    projects: [
      { 
        title: "SaaS Product Dashboard", 
        description: "A complex analytics dashboard with real-time data visualization, user roles, and subscription management.",
        tech: ["React", "Recharts", "Node.js"]
      },
      { 
        title: "Real-time Collaboration Tool", 
        description: "A Trello-like board with real-time updates across multiple users using WebSockets.",
        tech: ["MERN Stack", "Socket.io", "Redux"]
      }
    ],
    instructors: [
      { 
        name: "Farhat Bhat", 
        role: "Software Development Engineer-2 @ Sony India", 
        bio: "Expert in scalable web architectures and modern frontend frameworks with extensive experience at Sony.",
        linkedin: "https://www.linkedin.com/in/farhathbhat/",
        image_url: "/images/Mentor_images/FARAH.png"
      }
    ]
  },
  "financial-management": {
    id: "financial-management",
    title: "Financial Management & Analysis",
    subtitle: "Master corporate finance, investment analysis, and professional financial modeling.",
    description: "Our Financial Management program is a comprehensive journey into the world of corporate finance and investment banking. You will learn to dissect financial statements, build complex valuation models from scratch, and master the tools used by top financial institutions globally. We focus on real-world case studies and data-driven decision making.",
    rating: "4.9/5",
    duration: "3 Months",
    price: "₹3,000",
    projects_count: "3",
    placement_assist: "100%",
    students_enrolled: "8,240+",
    prerequisites: ["Basic understanding of mathematics", "Familiarity with Microsoft Excel", "Interest in finance and markets"],
    tools_learned: ["Microsoft Excel", "SAP FICO", "QuickBooks", "Power BI", "Tableau"],
    image_url: "/images/courses/abc/Financial.png",
    career_outcomes: ["Financial Analyst", "Investment Banker", "Risk Manager", "Corporate Controller"],
    syllabus: [
      { 
        title: "Module 1: Accounting Foundations", 
        description: "Understanding the three core financial statements. Mastering journal entries, ledger posting, and trial balances.",
        lessons: ["Financial Statement Analysis", "Double Entry Bookkeeping", "Cash Flow Management", "Ratio Analysis"]
      },
      { 
        title: "Module 2: Advanced Excel for Finance", 
        description: "Mastering complex formulas, pivot tables, and macros specifically for financial modeling and data visualization.",
        lessons: ["VLOOKUP & Index Match", "Pivot Tables & Slicers", "Macro Recording", "Financial Functions"]
      },
      { 
        title: "Module 3: Valuation & Modeling", 
        description: "Building Discounted Cash Flow (DCF) models, Comparable Company Analysis, and Precedent Transactions.",
        lessons: ["DCF Modeling", "WACC Calculation", "Sensitivity Analysis", "LBO Basics"]
      },
      { 
        title: "Module 4: ERP & Taxation", 
        description: "Practical training on Tally Prime and SAP FICO. Understanding GST, Income Tax, and corporate compliance.",
        lessons: ["Tally ERP 9/Prime", "GST Filing", "Corporate Tax Planning", "Internal Auditing"]
      }
    ],
    projects: [
      { 
        title: "Global Tech Valuation", 
        description: "Perform a full valuation of a major tech company using DCF and relative valuation methods.",
        tech: ["Excel", "Financial Modeling"]
      },
      { 
        title: "E-Commerce Audit System", 
        description: "Design an internal control and audit workflow for a high-volume e-commerce startup.",
        tech: ["Tally Prime", "Taxation"]
      }
    ],
    instructors: [
      { name: "CA Rajesh Khanna", role: "Former VP Finance at Deloitte", bio: "Rajesh is a seasoned Chartered Accountant with 15+ years of experience in auditing and corporate finance." },
      { name: "Ananya Sharma", role: "Senior Financial Analyst @ Goldman Sachs", bio: "Ananya specializes in equity research and investment banking workflows." }
    ]
  },
  "data-science-roadmap": {
    id: "data-science-roadmap",
    title: "Placement-Oriented Programming & Data Science",
    subtitle: "From data wrangling to predictive modeling and AI deployment.",
    description: "The Data Science Roadmap is your complete guide to becoming a data-driven professional. Master Python, SQL, and the full suite of machine learning algorithms. You will work on real-world datasets from healthcare, finance, and retail to build predictive models that solve complex business problems.",
    rating: "4.8/5",
    duration: "4 Months",
    price: "₹4,000",
    projects_count: "5",
    placement_assist: "100%",
    students_enrolled: "12,800+",
    prerequisites: ["Basic Python knowledge", "Understanding of statistics", "Problem-solving mindset"],
    tools_learned: ["Python", "Pandas", "NumPy", "Scikit-Learn", "SQL", "Tableau", "Jupyter"],
    image_url: "/images/courses/abc/datascience.png",
    career_outcomes: ["Data Scientist", "Data Analyst", "ML Engineer", "Business Intelligence Developer"],
    syllabus: [
      { 
        title: "Phase 1: Data Foundations", 
        description: "Mastering Python for data analysis, SQL for database querying, and Exploratory Data Analysis (EDA).",
        lessons: ["Python for Data Science", "Advanced SQL", "Pandas & NumPy", "Data Visualization"]
      },
      { 
        title: "Phase 2: Machine Learning", 
        description: "Deep dive into supervised and unsupervised learning. Regression, Classification, and Clustering algorithms.",
        lessons: ["Linear Regression", "Decision Trees", "Random Forest", "K-Means Clustering"]
      }
    ],
    projects: [
      { title: "Netflix Recommendation Engine", description: "Build a movie recommendation system using collaborative filtering.", tech: ["Python", "Scikit-Learn"] },
      { title: "Stock Price Predictor", description: "Use time-series analysis to predict stock prices for the next quarter.", tech: ["Python", "Pandas"] }
    ],
    instructors: [
      { 
        name: "Uttam Grade", 
        role: "Data Analytics Manager @ EY | Gen AI Expert", 
        bio: "Specialist in large-scale data analytics and Generative AI implementations at EY.",
        linkedin: "https://www.linkedin.com/in/uttamgrade/",
        image_url: "/images/Mentor_images/UTTAM.png"
      }
    ]
  },
  "python-mastery": {
    id: "python-mastery",
    title: "Python Mastery",
    subtitle: "The ultimate guide to Python, from basic scripting to advanced web backends.",
    description: "Master Python, the world's most popular programming language. This course covers everything from basic syntax and data structures to advanced topics like web scraping, automation, and backend development with Django/Flask.",
    rating: "4.8/5",
    duration: "3 Months",
    price: "₹3,000",
    projects_count: "10",
    placement_assist: "100%",
    students_enrolled: "18,900+",
    prerequisites: ["No prior experience needed", "A curious mind", "Willingness to experiment"],
    tools_learned: ["Python", "React", "SQL", "MongoDB", "Express"],
    image_url: "/images/courses/abc/pythonmystry.png",
    career_outcomes: ["Python Developer", "Automation Engineer", "Backend Developer", "Scripting Expert"],
    syllabus: [
      { 
        title: "Module 1: Python Core", 
        description: "Variables, Loops, Functions, and Object Oriented Programming.",
        lessons: ["Basic Syntax", "Control Flow", "OOPS in Python", "Error Handling"]
      },
      { 
        title: "Module 2: Real World Apps", 
        description: "Web scraping, API integration, and automation scripts.",
        lessons: ["BeautifulSoup", "Requests API", "Selenium", "File Automation"]
      }
    ],
    projects: [
      { title: "Auto-Email Scraper", description: "A script that scrapes websites for contact info and sends personalized emails.", tech: ["Python", "Selenium"] }
    ],
    instructors: [
      { name: "Amit Verma", role: "Full Stack Lead", bio: "Amit has built over 50 production-level Python applications for global clients." }
    ]
  },
  "ai-ml-python": {
    id: "ai-ml-python",
    title: "AI & Machine Learning with Python",
    subtitle: "Build the future with deep learning and neural networks.",
    description: "Step into the future of technology. This advanced course takes you beyond basic ML into the world of Deep Learning, Neural Networks, and Natural Language Processing. You will use industry-standard frameworks like TensorFlow and PyTorch to build intelligent systems.",
    rating: "4.8/5",
    duration: "4 Months",
    price: "₹6,000",
    projects_count: "4",
    placement_assist: "100%",
    students_enrolled: "9,500+",
    prerequisites: ["Strong Python foundation", "Intermediate Mathematics", "Basic Data Science knowledge"],
    tools_learned: ["TensorFlow", "PyTorch", "Keras", "OpenCV", "Hugging Face", "Cuda"],
    image_url: "/images/courses/ai_ml.png",
    career_outcomes: ["AI Engineer", "Deep Learning Researcher", "NLP Scientist", "Computer Vision Specialist"],
    syllabus: [
      { 
        title: "Phase 1: Deep Learning Foundations", 
        description: "Neural Network architecture, Backpropagation, and Optimizer functions.",
        lessons: ["Neural Networks", "TensorFlow Basics", "Activation Functions", "Gradient Descent"]
      },
      { 
        title: "Phase 2: Computer Vision & NLP", 
        description: "Image recognition with CNNs and Text processing with RNNs and Transformers.",
        lessons: ["CNNs", "RNNs & LSTMs", "BERT & Transformers", "Object Detection"]
      }
    ],
    projects: [
      { title: "Self-Driving Car Simulation", description: "Use computer vision to detect lanes and obstacles in real-time.", tech: ["PyTorch", "OpenCV"] }
    ],
    instructors: [
      { 
        name: "Uttam Grade", 
        role: "Gen AI & ML Expert @ EY", 
        bio: "Leading AI/ML initiatives and specialized in advanced predictive modeling.",
        linkedin: "https://www.linkedin.com/in/uttamgrade/",
        image_url: "/images/Mentor_images/UTTAM.png"
      }
    ]
  },
  "digital-marketing": {
    id: "digital-marketing",
    title: "Digital Marketing Mastery",
    subtitle: "Master SEO, SEM, Social Media, and Data-Driven Growth Marketing.",
    description: "In the digital age, marketing is about data, psychology, and creativity. This course teaches you how to build a brand from scratch, drive high-quality traffic, and convert visitors into loyal customers using industry-standard tools and strategies used by global agencies.",
    rating: "4.8/5",
    duration: "3 Months",
    price: "₹3,000",
    projects_count: "4",
    placement_assist: "100%",
    students_enrolled: "10,500+",
    prerequisites: ["Basic internet knowledge", "Creative mindset", "Passion for storytelling"],
    tools_learned: ["Google Analytics", "SEMrush", "Meta Ads Manager", "Canva", "Mailchimp", "WordPress"],
    image_url: "/images/courses/abc/digitalmarkerting.png",
    career_outcomes: ["Digital Marketing Manager", "SEO Specialist", "Social Media Strategist", "Content Marketer"],
    syllabus: [
      { title: "Module 1: SEO & SEM", description: "Mastering search engine algorithms and paid search strategies.", lessons: ["Keyword Research", "On-Page SEO", "Google Ads", "Competitor Analysis"] },
      { title: "Module 2: Social Media & Content", description: "Building community and driving engagement on major platforms.", lessons: ["Content Strategy", "Meta Ads", "Influencer Marketing", "Copywriting"] }
    ],
    projects: [{ title: "Viral Brand Launch", description: "Create and execute a full digital marketing strategy for a new startup.", tech: ["Meta Ads", "Canva"] }],
    instructors: [
      { 
        name: "T.Raja Stephenson", 
        role: "Digital Marketing Lead @ Adobe & T-Mobile", 
        bio: "Seasoned marketing strategist with experience driving growth for global giants like Adobe and T-Mobile.",
        linkedin: "https://www.linkedin.com/in/titturaja/",
        image_url: "/images/Mentor_images/titturaj.png"
      }
    ]
  },
  "hr-management": {
    id: "hr-management",
    title: "Human Resource Management",
    subtitle: "Become a strategic HR leader in the modern corporate world.",
    description: "HR is the backbone of every successful organization. This course covers the full spectrum of HR functions, from talent acquisition and payroll management to organizational behavior and employee relations, ensuring you are ready for a leadership role.",
    rating: "4.7/5",
    duration: "3 Months",
    price: "₹3,000",
    projects_count: "3",
    placement_assist: "100%",
    students_enrolled: "6,800+",
    prerequisites: ["Communication skills", "Interest in people management", "Basic computer literacy"],
    tools_learned: ["Darwinbox", "ZOHO People", "GreytHR", "LinkedIn Recruiter", "Microsoft Teams"],
    image_url: "/images/courses/abc/HR.png",
    career_outcomes: ["HR Manager", "Talent Acquisition Specialist", "Payroll Executive", "Employee Relations Lead"],
    syllabus: [
      { title: "Module 1: Recruitment & Selection", description: "Modern techniques for sourcing and hiring top talent.", lessons: ["Job Analysis", "Interviewing Skills", "Offer Negotiation", "Onboarding"] }
    ],
    projects: [{ title: "Employee Wellness Portal", description: "Design an end-to-end HR policy and wellness program for a 500+ employee company.", tech: ["ZOHO People"] }],
    instructors: [
      { 
        name: "Phant lli", 
        role: "HR Lead @ Amazon", 
        bio: "Expert in global talent acquisition and organizational behavior at Amazon.",
        linkedin: "http://www.linkedin.com/in/phanindra-alampally-06565317a/"
      }
    ]
  },
  "cybersecurity-fundamentals": {
    id: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    subtitle: "Protect digital assets and master the art of ethical hacking.",
    description: "Learn to defend against cyber threats and build secure digital environments. This course takes you from networking basics to advanced penetration testing and security auditing, preparing you for the high-demand field of cybersecurity.",
    rating: "4.8/5",
    duration: "3 Months",
    price: "₹4,000",
    projects_count: "5",
    placement_assist: "100%",
    students_enrolled: "7,200+",
    prerequisites: ["Basic networking knowledge", "Understanding of OS (Windows/Linux)", "Ethical mindset"],
    tools_learned: [],
    image_url: "/images/courses/abc/cybersecurity.png",
    career_outcomes: ["Security Analyst", "Ethical Hacker", "Security Consultant", "Network Administrator"],
    syllabus: [
      { title: "Module 1: Network Security", description: "Securing network infrastructure and monitoring traffic.", lessons: ["TCP/IP Security", "Firewalls & VPNs", "IDS/IPS", "Wireless Security"] }
    ],
    projects: [{ title: "Vulnerability Audit", description: "Conduct a full security audit of a web application and report vulnerabilities.", tech: ["Burp Suite", "Nmap"] }],
    instructors: [
      { 
        name: "C Vaishnavucv", 
        role: "Cyber Security Expert @ Cyber Cell", 
        bio: "Specialist in digital forensics and defensive security at the official Cyber Cell.",
        linkedin: "https://www.linkedin.com/in/vaishnavucv/",
        image_url: "/images/Mentor_images/Vaishnavu.png"
      }
    ]
  },
  "cloud-computing": {
    id: "cloud-computing",
    title: "Cloud Computing Mastery",
    subtitle: "Architect and manage scalable infrastructure on AWS, Azure, and Google Cloud.",
    description: "Cloud is the foundation of modern software. Master the architectural principles of the cloud and learn to deploy, scale, and manage applications with 99.9% availability using top cloud providers.",
    rating: "4.8/5",
    duration: "2 Months",
    price: "₹5,000",
    projects_count: "4",
    placement_assist: "100%",
    students_enrolled: "5,500+",
    prerequisites: ["Basic Linux commands", "Understanding of web servers", "Networking basics"],
    tools_learned: [],
    image_url: "/images/courses/abc/cloudcomputing.png",
    career_outcomes: ["Cloud Architect", "DevOps Engineer", "Cloud Administrator", "Infrastructure Engineer"],
    syllabus: [
      { title: "Module 1: AWS Core Services", description: "Mastering EC2, S3, RDS, and Lambda.", lessons: ["Compute (EC2)", "Storage (S3)", "VPC Networking", "IAM Roles"] }
    ],
    projects: [{ title: "Auto-Scaling Web App", description: "Deploy a high-availability web application with load balancing and auto-scaling.", tech: ["AWS", "Terraform"] }],
    instructors: [{ name: "Vikram Reddy", role: "Principal Cloud Engineer @ AWS", bio: "Vikram helps enterprises migrate their legacy systems to modern cloud architectures." }]
  },
  "iot": {
    id: "iot",
    title: "Internet of Things (IoT)",
    subtitle: "Build the world of connected devices and smart systems.",
    description: "Connect the physical world to the digital realm. Learn to build smart home systems, industrial monitoring tools, and wearable tech using hardware like Arduino and Raspberry Pi with cloud integration.",
    rating: "4.5/5",
    duration: "2 Months",
    price: "₹3,000",
    projects_count: "3",
    placement_assist: "100%",
    students_enrolled: "4,200+",
    prerequisites: ["Basic electronics knowledge", "Familiarity with C/C++", "Hardware interest"],
    tools_learned: [],
    image_url: "/images/courses/electronics_iot.png",
    career_outcomes: ["IoT Developer", "Embedded Engineer", "Smart Home Architect", "Firmware Engineer"],
    syllabus: [
      { title: "Module 1: Sensors & Actuators", description: "Interfacing hardware with the real world.", lessons: ["Analog vs Digital", "I2C & SPI Protocol", "Sensor Calibration", "Motor Control"] }
    ],
    projects: [{ title: "Smart Agriculture System", description: "A connected system that monitors soil moisture and automates irrigation.", tech: ["Arduino", "MQTT"] }],
    instructors: [
      { 
        name: "Garima Mittal", 
        role: "Product Manager @ TCS | IoT Expert", 
        bio: "Leading IoT product initiatives at TCS with deep expertise in connected devices.",
        linkedin: "https://www.linkedin.com/in/garima-mittal-mie-ceng-india-4a722b77/",
        image_url: "/images/Mentor_images/GARIMA.png"
      }
    ]
  },
  "embedded-systems": {
    id: "embedded-systems",
    title: "Embedded Systems & Robotics",
    subtitle: "Programming the hardware that powers the modern world.",
    description: "From medical devices to automotive controllers, embedded systems are everywhere. Learn low-level programming, real-time operating systems, and hardware design to build the next generation of intelligent machines.",
    rating: "4.5/5",
    duration: "2 Months",
    price: "₹4,000",
    projects_count: "4",
    placement_assist: "100%",
    students_enrolled: "3,800+",
    prerequisites: ["Strong C programming", "Microprocessor basics", "Electronics foundations"],
    tools_learned: [],
    image_url: "/images/courses/embedded_systems.png",
    career_outcomes: ["Embedded C Developer", "Robotics Engineer", "Firmware Architect", "Hardware Design Engineer"],
    syllabus: [
      { title: "Module 1: Microcontroller Architecture", description: "Deep dive into ARM Cortex-M series.", lessons: ["Register Level Programming", "Interrupts & Timers", "DMA Control", "Low Power Modes"] }
    ],
    projects: [{ title: "Autonomous Line Follower", description: "Build a robot that navigates complex paths using PID control and IR sensors.", tech: ["Embedded C", "STM32"] }],
    instructors: [{ name: "Dr. Sandeep Singh", role: "Robotics Researcher", bio: "Dr. Singh specializes in autonomous systems and real-time control logic." }]
  },
  "hybrid-ev": {
    id: "hybrid-ev",
    title: "Hybrid & Electric Vehicles",
    subtitle: "Master HEV technology and build a successful career in electric vehicle engineering.",
    description: "The automotive industry is undergoing a massive shift towards electrification. This program provides deep technical expertise in EV powertrains, Battery Management Systems (BMS), and power electronics. You will learn to design and simulate EV components using industry-standard tools, preparing you for roles in India's leading automotive companies.",
    rating: "4.9/5",
    duration: "4 Months",
    price: "₹6,000",
    projects_count: "4",
    placement_assist: "100%",
    students_enrolled: "4,500+",
    prerequisites: ["Mechanical or Electrical Engineering background", "Basic understanding of thermodynamics", "Interest in sustainable technology"],
    tools_learned: ["MATLAB", "Simulink", "Ansys", "SolidWorks", "BMS Algorithms"],
    image_url: "/images/courses/abc/hybried.png",
    career_outcomes: ["EV Design Engineer", "BMS Specialist", "Powertrain Architect", "Automotive Systems Engineer"],
    syllabus: [
      { 
        title: "Module 1: EV Foundations & Powertrains", 
        description: "Introduction to EV/HEV architecture, energy flow, and efficiency calculations.",
        lessons: ["History of Electrification", "Series vs Parallel Hybrids", "Energy Density Analysis", "Torque & Power Curves"]
      },
      { 
        title: "Module 2: Battery Management Systems (BMS)", 
        description: "Mastering Lithium-ion technology, State of Charge (SoC) estimation, and thermal management.",
        lessons: ["Cell Chemistry", "BMS Architecture", "Passive & Active Balancing", "Thermal Runaway Prevention"]
      },
      { 
        title: "Module 3: Motor Control & Power Electronics", 
        description: "Deep dive into BLDC, PMSM motors, and high-voltage inverter design.",
        lessons: ["DC-DC Converters", "Regenerative Braking", "PWM Control", "Motor Drive Systems"]
      },
      { 
        title: "Module 4: EV Simulation & Testing", 
        description: "Hands-on simulation of electric drivetrains using MATLAB/Simulink.",
        lessons: ["Drive Cycle Simulation", "Hardware-in-the-Loop (HiL)", "Standard Safety Protocols", "Regulatory Compliance"]
      }
    ],
    projects: [
      { title: "Virtual EV Drivetrain Build", description: "Design and simulate a full electric powertrain for a commuter car.", tech: ["MATLAB", "Simulink"] },
      { title: "Advanced BMS Logic", description: "Develop an algorithm for accurate State of Health (SoH) prediction.", tech: ["Python", "BMS Simulator"] }
    ],
    instructors: [
      { name: "Pankaj Deshmukh", role: "Senior EV Engineer @ Tata Motors", bio: "Pankaj was part of the core team that designed India's first mass-market electric SUV." },
      { name: "Dr. Smita Rao", role: "Battery Researcher @ IIT Madras", bio: "Expert in solid-state batteries and next-gen energy storage systems." }
    ]
  },
  "autocad": {
    id: "autocad",
    title: "AutoCAD Training Program",
    subtitle: "Master AutoCAD and build a successful career in design and drafting.",
    description: "AutoCAD is the foundation of modern engineering design. This course takes you from basic 2D sketching to advanced 3D modeling and photorealistic rendering. Whether you are in Civil, Mechanical, or Architecture, mastering AutoCAD is your first step towards professional design excellence.",
    rating: "4.7/5",
    duration: "2 Months",
    price: "₹4,000",
    projects_count: "5",
    placement_assist: "100%",
    students_enrolled: "8,200+",
    prerequisites: ["Basic computer literacy", "Understanding of technical drawings", "Attention to detail"],
    tools_learned: ["AutoCAD 2024", "Autodesk Fusion", "DraftSight", "Revit Basics"],
    image_url: "/images/courses/abc/AutoCAD.png",
    career_outcomes: ["CAD Designer", "Draftsman", "Design Engineer", "Architectural Consultant"],
    syllabus: [
      { 
        title: "Module 1: 2D Drafting Masterclass", 
        description: "Precision drawing, layer management, and technical annotation.",
        lessons: ["Coordinate Systems", "Dynamic Blocks", "Dimensioning Standards", "XRefs & Layouts"]
      },
      { 
        title: "Module 2: Advanced 3D Modeling", 
        description: "Creating complex surfaces, solids, and meshes.",
        lessons: ["Extrude & Revolve", "Boolean Operations", "Sweep & Loft", "Mesh Editing"]
      },
      { 
        title: "Module 3: Visualization & Rendering", 
        description: "Applying materials, lighting, and generating realistic renders.",
        lessons: ["Material Browser", "Sun & Sky Simulation", "Camera Setup", "High-res Rendering"]
      },
      { 
        title: "Module 4: Industry-Specific Workflows", 
        description: "Customizing AutoCAD for Civil, Mechanical, and Electrical projects.",
        lessons: ["Parametric Constraints", "Sheet Set Manager", "LISP Routine Basics", "Data Extraction"]
      }
    ],
    projects: [
      { title: "Smart City Infrastructure Plan", description: "Design a comprehensive layout for a modern residential community.", tech: ["AutoCAD 2D"] },
      { title: "Mechanical Engine Component", description: "Create a detailed 3D model with technical specifications for manufacturing.", tech: ["AutoCAD 3D"] }
    ],
    instructors: [
      { 
        name: "Garima Mittal", 
        role: "CAD Specialist @ Autodesk Certified", 
        bio: "Garima has trained over 1000+ professionals in industrial design workflows.",
        image_url: "/images/Mentor_images/GARIMA.png"
      },
      { name: "Rohan Joshi", role: "Lead Architect", bio: "Rohan specializes in large-scale urban design and technical drafting." }
    ]
  },
  "drone-engineering": {
    id: "drone-engineering",
    title: "Drone Engineering & Aviation",
    subtitle: "Master the design, assembly, and flight dynamics of UAVs.",
    description: "Step into the rapidly growing field of Unmanned Aerial Vehicles (UAVs). This course covers drone mechanics, flight controllers, autonomous navigation, and the regulatory landscape of aviation.",
    rating: "4.8/5",
    duration: "3 Months",
    price: "₹6,000",
    projects_count: "3",
    placement_assist: "100%",
    students_enrolled: "1,200+",
    prerequisites: ["Basic physics and electronics", "Interest in aviation", "Basic programming logic"],
    tools_learned: ["Betaflight", "ArduPilot", "Mission Planner", "Fusion 360"],
    image_url: "/images/courses/electronics_iot.png",
    career_outcomes: ["Drone Engineer", "UAV Pilot", "Flight Systems Developer", "Maintenance Technician"],
    syllabus: [
      { title: "Module 1: UAV Fundamentals", description: "Understanding aerodynamics and drone components.", lessons: ["Lift & Drag", "Propulsion Systems", "Flight Controllers", "Telemetry Systems"] }
    ],
    projects: [{ title: "F450 Quadcopter Build", description: "Design, assemble, and tune a custom F450 drone from scratch.", tech: ["Betaflight", "ArduPilot"] }],
    instructors: [
      { 
        name: "Apurva Donde", 
        role: "Drone Expert @ Drona Aviation", 
        bio: "Specialist in UAV design and flight dynamics with extensive experience in the drone industry.",
        linkedin: "http://www.linkedin.com/in/apurvadonde/"
      }
    ]
  },
  "metaverse": {
    id: "metaverse",
    title: "Metaverse / AR / VR Development",
    subtitle: "Building immersive digital worlds and augmented experiences.",
    description: "Learn to build the future of the internet. This course focuses on XR (Extended Reality) development, mastering Unity/Unreal Engine, and creating interactive experiences for the Metaverse.",
    rating: "4.9/5",
    duration: "4 Months",
    price: "₹7,000",
    projects_count: "4",
    placement_assist: "100%",
    students_enrolled: "1,500+",
    prerequisites: ["Basic C# or C++ knowledge", "Interest in 3D design", "Gaming or XR passion"],
    tools_learned: ["Unity 3D", "Unreal Engine 5", "Oculus SDK", "Blender"],
    image_url: "/images/courses/web_development.png",
    career_outcomes: ["XR Developer", "Unity Engineer", "Metaverse Architect", "AR Designer"],
    syllabus: [
      { title: "Module 1: 3D Interaction", description: "Mastering the physics of virtual spaces.", lessons: ["Spatial Audio", "Haptic Feedback", "Locomotion Systems", "Shader Graph"] }
    ],
    projects: [{ title: "VR Training Simulator", description: "Build a fully immersive industrial training simulator for VR headsets.", tech: ["Unity 3D", "Oculus SDK"] }],
    instructors: [
      { 
        name: "Burhanuddin Limdiwala", 
        role: "Metaverse Architect @ InfinityX", 
        bio: "Expert in building virtual worlds and XR experiences at InfinityX.",
        linkedin: "http://www.linkedin.com/in/burhanuddin-limdiwala-b05665177/"
      }
    ]
  }
};

