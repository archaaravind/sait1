/**
 * SAIT — Students Association of Information Technology
 * Division of Information Technology, School of Engineering, CUSAT
 * Master Frontend Controller & Interactive Engine
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. MOCK DATA REPOSITORY (Easily customizable & structured)
     ========================================================================== */

  const SAIT_DATA = {
    // Association & Council Members
    people: [
      {
        id: 'p1',
        name: 'Arjun K. Nair',
        role: 'President',
        team: 'Executive',
        department: 'B.Tech IT (Semester 6)',
        bio: 'Leading student operations, institutional collaborations, and the SAIT core team. Passionate about distributed systems & open-source software.',
        social: { linkedin: '#', github: '#', email: 'arjun.sait@cusat.ac.in' }
      },
      {
        id: 'p2',
        name: 'Ananya Lakshmi',
        role: 'Vice President',
        team: 'Executive',
        department: 'B.Tech IT (Semester 6)',
        bio: 'Directing academic workshops, internal student councils, and technical bootcamps. Specializes in Cloud Architecture & DevOps.',
        social: { linkedin: '#', github: '#', email: 'ananya.sait@cusat.ac.in' }
      },
      {
        id: 'p3',
        name: 'Devadathan M.',
        role: 'General Secretary',
        team: 'Executive',
        department: 'B.Tech IT (Semester 6)',
        bio: 'Managing event operations, inter-department coordination, and official university communications for SAIT.',
        social: { linkedin: '#', github: '#', email: 'devadathan.sait@cusat.ac.in' }
      },
      {
        id: 'p4',
        name: 'Fathima Noor',
        role: 'Joint Secretary',
        team: 'Executive',
        department: 'B.Tech IT (Semester 4)',
        bio: 'Coordinating junior batch engagement, hackathon registration pipelines, and female representation in STEM initiatives.',
        social: { linkedin: '#', github: '#', email: 'fathima.sait@cusat.ac.in' }
      },
      {
        id: 'p5',
        name: 'Rithwik Menon',
        role: 'Treasurer',
        team: 'Executive',
        department: 'B.Tech IT (Semester 6)',
        bio: 'Managing annual association budget, sponsorships, hackathon prize funding, and vendor logistics.',
        social: { linkedin: '#', github: '#', email: 'rithwik.sait@cusat.ac.in' }
      },
      {
        id: 'p6',
        name: 'Siddharth R.',
        role: 'Tech Team Lead',
        team: 'Tech',
        department: 'B.Tech IT (Semester 6)',
        bio: 'Full-stack developer and systems enthusiast. Architecting the SAIT web platform and automated grading pipelines.',
        social: { linkedin: '#', github: '#', email: 'siddharth.sait@cusat.ac.in' }
      },
      {
        id: 'p7',
        name: 'Meera Krishnan',
        role: 'Frontend & UI Lead',
        team: 'Tech',
        department: 'B.Tech IT (Semester 4)',
        bio: 'Crafting responsive user interfaces, accessible design systems, and design tokens for SAIT digital applications.',
        social: { linkedin: '#', github: '#', email: 'meera.sait@cusat.ac.in' }
      },
      {
        id: 'p8',
        name: 'Ashwin Pillai',
        role: 'Competitive Coding Lead',
        team: 'Tech',
        department: 'B.Tech IT (Semester 6)',
        bio: 'Candidate Master on Codeforces and ACM-ICPC regionalist. Conducting weekly DSA problem-solving jams for IT students.',
        social: { linkedin: '#', github: '#', email: 'ashwin.sait@cusat.ac.in' }
      },
      {
        id: 'p9',
        name: 'Rohit Sankar',
        role: 'Media & Design Lead',
        team: 'Media',
        department: 'B.Tech IT (Semester 6)',
        bio: 'Leading graphic design, motion posters, brand identity, and video production for all flagship SAIT events.',
        social: { linkedin: '#', github: '#', email: 'rohit.media@cusat.ac.in' }
      },
      {
        id: 'p10',
        name: 'Sandra George',
        role: 'Visual Designer',
        team: 'Media',
        department: 'B.Tech IT (Semester 4)',
        bio: 'Designing high-converting event collaterals, digital banners, social assets, and symposium merchandise.',
        social: { linkedin: '#', github: '#', email: 'sandra.media@cusat.ac.in' }
      },
      {
        id: 'p11',
        name: 'Nithin V.',
        role: 'Events Operations Lead',
        team: 'Events',
        department: 'B.Tech IT (Semester 6)',
        bio: 'Chief organizer for national hackathons, logistics coordinator, and venue liaison for SOE auditoriums and lab complexes.',
        social: { linkedin: '#', github: '#', email: 'nithin.events@cusat.ac.in' }
      },
      {
        id: 'p12',
        name: 'Sneha Paul',
        role: 'Workshops Coordinator',
        team: 'Events',
        department: 'B.Tech IT (Semester 4)',
        bio: 'Curating tech bootcamp schedules, speaker invites, and hands-on laboratory requirements for technical seminars.',
        social: { linkedin: '#', github: '#', email: 'sneha.events@cusat.ac.in' }
      },
      {
        id: 'p13',
        name: 'Vignesh S.',
        role: 'PR & Outreach Head',
        team: 'PR',
        department: 'B.Tech IT (Semester 6)',
        bio: 'Liaising with corporate sponsors, external tech organizations, and student communities across South India.',
        social: { linkedin: '#', github: '#', email: 'vignesh.pr@cusat.ac.in' }
      },
      {
        id: 'p14',
        name: 'Anjali Verma',
        role: 'Chief Editor & Content Lead',
        team: 'Content',
        department: 'B.Tech IT (Semester 6)',
        bio: 'Directing the official SAIT newsletter, technical blog articles, press releases, and symposium documentation.',
        social: { linkedin: '#', github: '#', email: 'anjali.content@cusat.ac.in' }
      }
    ],

    // Events Discovery List
    events: [
      {
        id: 'infinitus-26',
        title: "INFINITUS '26: National Tech Summit & 24h Hackathon",
        category: 'Technical',
        date: 'Nov 14–15, 2026',
        time: '09:00 AM (24 Hours)',
        venue: 'SOE Seminar Complex & IT Laboratories',
        description: 'Flagship national event of SAIT SOE CUSAT. Features a 24-hour non-stop hackathon with tracks in AI/ML, Web3, and Cyber Defense, plus industry keynote speakers and ₹1,00,000+ prize pool.',
        status: 'Open',
        featured: true
      },
      {
        id: 'ai-bootcamp',
        title: 'Deep Learning & PyTorch Hands-On Bootcamp',
        category: 'Workshop',
        date: 'Oct 8, 2026',
        time: '02:00 PM – 05:30 PM',
        venue: 'Advanced IT Computing Lab (Lab 2)',
        description: 'Learn tensor operations, neural network architectures, and build an end-to-end vision model using PyTorch with guidance from AI researchers.',
        status: 'Open',
        featured: false
      },
      {
        id: 'devsprint-jam',
        title: 'DevSprint: 12-Hour Open-Source Code Jam',
        category: 'Competition',
        date: 'Oct 22, 2026',
        time: '08:30 AM – 08:30 PM',
        venue: 'IT Software Systems Lab',
        description: 'Contribute to designated open-source GitHub repositories, solve real-world bugs, and compete for top contributor honors and swag.',
        status: 'Open',
        featured: false
      },
      {
        id: 'cloud-devops-masterclass',
        title: 'Cloud Architecture & Kubernetes Deployment',
        category: 'Workshop',
        date: 'Nov 02, 2026',
        time: '10:00 AM – 01:00 PM',
        venue: 'SOE Virtual Seminar Hall (Hybrid)',
        description: 'Step-by-step masterclass covering containerization with Docker, microservices orchestration, and production deployments on AWS/GCP.',
        status: 'Open',
        featured: false
      },
      {
        id: 'ctf-cyber-sentinel',
        title: 'Cyber Sentinel: Intra-College CTF Challenge',
        category: 'Technical',
        date: 'Nov 28, 2026',
        time: '01:30 PM – 05:30 PM',
        venue: 'IT Cyber Security Lab',
        description: 'Test your reverse-engineering, cryptography, web exploitation, and forensic analysis capabilities in a Jeopardy-style CTF challenge.',
        status: 'Upcoming',
        featured: false
      },
      {
        id: 'web3-smart-contracts',
        title: 'Decentralized Systems & Smart Contract Security',
        category: 'Technical',
        date: 'Dec 05, 2026',
        time: '02:00 PM – 04:30 PM',
        venue: 'IT Seminar Room',
        description: 'Explore consensus algorithms, write secure Solidity smart contracts, and analyze real-world decentralized protocol vulnerability vectors.',
        status: 'Upcoming',
        featured: false
      },
      {
        id: 'it-cultural-fiesta',
        title: 'ByteFest: Department Cultural & Gaming Night',
        category: 'Cultural',
        date: 'Dec 18, 2026',
        time: '04:00 PM – 08:00 PM',
        venue: 'SOE Open Air Amphitheatre',
        description: 'Annual cultural reunion featuring student musical performances, LAN gaming tournaments (Valorant & FIFA), and informal interactive stages.',
        status: 'Upcoming',
        featured: false
      },
      {
        id: 'school-tech-outreach',
        title: 'CodeForward: Rural School STEM Outreach',
        category: 'Community',
        date: 'Jan 10, 2027',
        time: '09:00 AM – 03:00 PM',
        venue: 'Government HSS Kalamassery',
        description: 'SAIT student volunteers introduce foundational Python programming, algorithmic thinking, and robotics to high school students.',
        status: 'Upcoming',
        featured: false
      }
    ],

    // Past Events Archive
    pastEvents: [
      { title: 'Infinitus 2025: National Tech Symposium', date: 'November 2025', participants: '520+ Attendees' },
      { title: 'Full-Stack Web3 & AI Hackathon', date: 'September 2025', participants: '84 Teams' },
      { title: 'Flutter Mobile App Development Sprint', date: 'March 2025', participants: '140 Students' },
      { title: 'Linux Kernel & Systems Programming Workshop', date: 'January 2025', participants: '95 Students' },
      { title: 'CodeVanguard 2024 ICPC Style Contest', date: 'October 2024', participants: '110 Coders' },
      { title: 'Google Summer of Code Mentorship Clinic', date: 'February 2024', participants: '75 Attendees' }
    ],

    // Alumni Profiles
    alumni: [
      {
        name: 'Rohit Varma',
        gradYear: '2017',
        role: 'Senior Staff Software Engineer',
        company: 'Google Cloud, Bengaluru',
        achievement: 'Architecting distributed compute infrastructure for Google Cloud Platform. Ex-SAIT President.',
        contribution: 'Regular keynote speaker, mentor for CUSAT ICPC finalists, and sponsor for Infinitus hackathon prizes.'
      },
      {
        name: 'Nandana Suresh',
        gradYear: '2019',
        role: 'Lead AI/ML Research Engineer',
        company: 'Microsoft AI Research',
        achievement: 'Published papers at NeurIPS and CVPR on multimodal neural representations. University Rank Holder.',
        contribution: 'Conducts annual research roadmap sessions and provides master’s thesis mentorship to IT seniors.'
      },
      {
        name: 'Gautham Krishna',
        gradYear: '2020',
        role: 'Co-Founder & CTO',
        company: 'Novacore Technologies (Y-Combinator W23)',
        achievement: 'Raised $4.5M seed round for autonomous AI developer tooling. Built first product prototype at SOE IT lab.',
        contribution: 'Actively recruits SOE IT interns, conducts startup ideation workshops, and mentors student founders.'
      },
      {
        name: 'Priya Chandran',
        gradYear: '2018',
        role: 'Cloud Security Architect',
        company: 'Cisco Systems, San Jose',
        achievement: 'Specializes in zero-trust network infrastructure and enterprise Kubernetes defense.',
        contribution: 'Mentors women in engineering through SAIT outreach sessions and offers resume reviews.'
      },
      {
        name: 'Arun Madhavan',
        gradYear: '2021',
        role: 'Senior Site Reliability Engineer',
        company: 'Amazon Web Services (AWS)',
        achievement: 'Leading high-availability database cluster resiliency across Asia-Pacific data center regions.',
        contribution: 'Runs DevOps training workshops and provides free AWS practice voucher access to student club.'
      },
      {
        name: 'Sneha Nair',
        gradYear: '2022',
        role: 'Senior Product Designer',
        company: 'Razorpay, Bengaluru',
        achievement: 'Redesigned core merchant payment checkout flows touching millions of daily transactions.',
        contribution: 'Mentors SAIT Media and Design team students on design systems and portfolio curation.'
      }
    ],

    // Hall of Fame / Achievements
    achievements: [
      {
        id: 'ach-1',
        year: '2025',
        title: 'National 1st Prize — Smart India Hackathon',
        category: 'Hackathon',
        team: 'Team NeuroShield (Arjun K., Siddharth R., Meera K.)',
        event: 'Ministry of Education, Government of India',
        desc: 'Developed an automated deepfake detection and neural forensics pipeline for broadcast media, securing ₹1,00,000 cash prize.'
      },
      {
        id: 'ach-2',
        year: '2025',
        title: 'Top 20 Regional Finalists — ACM-ICPC Amritapuri',
        category: 'Technical',
        team: 'Team RecursionKings (Ashwin P., Rohit M., Vivek K.)',
        event: 'International Collegiate Programming Contest',
        desc: 'Ranked in the top 20 among 400+ premier collegiate coding teams across India at the Amritapuri regional contest.'
      },
      {
        id: 'ach-3',
        year: '2025',
        title: 'Best Research Paper Award — IEEE CUBE',
        category: 'Publications',
        team: 'Dr. Preetha S. & Nandita Menon (B.Tech IT 2025)',
        event: 'IEEE International Conference on Cloud & Edge Computing',
        desc: 'Authored landmark paper on "Privacy-Preserving Federated Learning on Edge IoT Nodes", awarded best technical contribution.'
      },
      {
        id: 'ach-4',
        year: '2024',
        title: 'Champions — Kerala State Cyber CTF',
        category: 'Hackathon',
        team: 'Team ByteForce SOE',
        event: 'Kerala Police CyberDome Tech Challenge',
        desc: 'Clinched the championship trophy by capturing all 24 flags in web exploitation, binary reversing, and memory forensics.'
      },
      {
        id: 'ach-5',
        year: '2024',
        title: 'Global Rank 42 — TCS CodeVita Season 12',
        category: 'Technical',
        team: 'Ashwin Pillai (Individual)',
        event: 'TCS Global Programming Contest',
        desc: 'Achieved an international rank of 42 out of over 100,000 global participants, bagging a direct R&D offer.'
      },
      {
        id: 'ach-6',
        year: '2024',
        title: 'University First Rank & Gold Medal',
        category: 'Academic',
        team: 'Divya R. (Batch of 2024)',
        event: 'CUSAT B.Tech IT Degree Convocation',
        desc: 'Graduated with a cumulative GPA of 9.86, awarded the University Chancellor Gold Medal for Academic Excellence.'
      }
    ],

    // Default Seed Activities for Student Activity Logger
    seedActivities: [
      {
        id: 'act-101',
        title: 'Smart India Hackathon 2025 Grand Finale',
        date: '2025-12-20',
        category: 'Competition',
        role: 'Winner',
        proof: 'https://cusat.ac.in/certificates/sih2025_winner.pdf',
        desc: 'Secured First Prize in AI & Forensic Security Track at New Delhi nodal center. Built an automated neural verification pipeline.',
        status: 'Verified',
        timestamp: '2025-12-22T10:30:00Z'
      },
      {
        id: 'act-102',
        title: 'AWS Cloud Practitioner Certification Workshop',
        date: '2026-01-14',
        category: 'Workshop',
        role: 'Participant',
        proof: 'https://aws.amazon.com/verification/CP-98124',
        desc: 'Completed 16 hours of hands-on cloud labs covering IAM, VPC networking, EC2 compute, and S3 storage configurations.',
        status: 'Verified',
        timestamp: '2026-01-16T14:15:00Z'
      },
      {
        id: 'act-103',
        title: 'Infinitus 2026 Website & Portal Development',
        date: '2026-02-10',
        category: 'Leadership',
        role: 'Organizer',
        proof: 'https://github.com/sait-cusat/infinitus-2026',
        desc: 'Served as Technical Lead for building the official symposium web portal and live registration tracking dashboard.',
        status: 'Verified',
        timestamp: '2026-02-11T09:00:00Z'
      },
      {
        id: 'act-104',
        title: 'Publication: Federated Learning on Resource-Constrained Devices',
        date: '2026-02-28',
        category: 'Publication',
        role: 'Speaker',
        proof: 'https://doi.org/10.1109/CUBE.2026.1042',
        desc: 'Co-authored a research paper presented at the IEEE Student Technical Symposium on distributed edge ML models.',
        status: 'Verified',
        timestamp: '2026-03-01T11:45:00Z'
      },
      {
        id: 'act-105',
        title: 'CodeForces Round #940 Div 2 Participation',
        date: '2026-03-12',
        category: 'Technical',
        role: 'Participant',
        proof: 'https://codeforces.com/submissions/arjun_it',
        desc: 'Solved 4 algorithmic problems in 2 hours, reaching Specialist rating (1480).',
        status: 'Verified',
        timestamp: '2026-03-13T16:20:00Z'
      },
      {
        id: 'act-106',
        title: 'Kalamassery High School Coding Outreach Volunteer',
        date: '2026-03-15',
        category: 'Volunteering',
        role: 'Volunteer',
        proof: 'https://cusat.ac.in/sait/outreach-cert-104.pdf',
        desc: 'Conducted 6 hours of Scratch and Python logic tutorials for grade 9 students as part of SAIT social outreach.',
        status: 'Verified',
        timestamp: '2026-03-16T18:00:00Z'
      },
      {
        id: 'act-107',
        title: 'Kaggle Global LLM Prompt Engineering Challenge',
        date: '2026-03-18',
        category: 'Competition',
        role: 'Participant',
        proof: 'https://kaggle.com/c/prompt-eng/leaderboard',
        desc: 'Participated in competitive prompt alignment challenge, achieving top 15% rank.',
        status: 'Verified',
        timestamp: '2026-03-19T08:30:00Z'
      },
      {
        id: 'act-108',
        title: 'Docker & Kubernetes Microservices Hack-Lab',
        date: '2026-03-20',
        category: 'Technical',
        role: 'Participant',
        proof: 'https://github.com/arjun-cusat/k8s-cluster-lab',
        desc: 'Configured a 3-node localized Kubernetes cluster with Traefik ingress controller and automated deployment manifests.',
        status: 'Pending',
        timestamp: '2026-03-20T12:00:00Z'
      }
    ],

    // Announcements Notice Board
    announcements: [
      {
        id: 'ann-1',
        title: 'INFINITUS 2026: Team Registration Portal Officially Open',
        category: 'Important',
        priority: 'High',
        date: 'March 18, 2026',
        body: 'Registrations are now open for Infinitus 2026 24-hour National Hackathon and technical paper symposium. Teams can register up to 4 members. Early bird registrations receive free symposium kits.',
        read: false
      },
      {
        id: 'ann-2',
        title: 'B.Tech IT Semester 6 & 8 End-Semester Lab Exam Schedule',
        category: 'Academic',
        priority: 'High',
        date: 'March 15, 2026',
        body: 'The Division of Information Technology has published the final timetable for Cloud Computing Lab, Network Security Lab, and Project Phase-1 evaluations. Please verify your lab batches.',
        read: false
      },
      {
        id: 'ann-3',
        title: 'TCS Digital & Cisco Systems Campus Recruitment Drive Briefing',
        category: 'Event',
        priority: 'Medium',
        date: 'March 12, 2026',
        body: 'Mandatory pre-placement orientation session will be held at SOE Seminar Complex on Friday at 3:30 PM for all registered Semester 6 IT students.',
        read: false
      },
      {
        id: 'ann-4',
        title: 'Deadline: Submit Student Activity Logger Verification for Semester Credits',
        category: 'Deadline',
        priority: 'High',
        date: 'March 10, 2026',
        body: 'All technical club participations, hackathons, and certifications must be submitted via the SAIT Activity Logger portal by March 31, 2026, for faculty accreditation.',
        read: true
      },
      {
        id: 'ann-5',
        title: 'SAIT Open-Source Incubator: Call for Summer Project Proposals',
        category: 'General',
        priority: 'Low',
        date: 'March 05, 2026',
        body: 'Got an innovative engineering idea? Apply for SAIT lab server compute access, faculty mentoring, and cloud credits under the 2026 Student Incubation Fund.',
        read: true
      }
    ],

    // Student Resource Hub
    resources: [
      {
        id: 'res-1',
        title: 'B.Tech Information Technology Complete Curriculum & Syllabus (S1-S8)',
        category: 'Academic',
        format: 'pdf',
        size: '3.4 MB',
        downloads: '1.2k',
        link: '#'
      },
      {
        id: 'res-2',
        title: 'Cloud Computing & Distributed Systems Laboratory Manual (2026 Edition)',
        category: 'Lab',
        format: 'pdf',
        size: '4.8 MB',
        downloads: '850',
        link: '#'
      },
      {
        id: 'res-3',
        title: 'SOE CUSAT End-Semester Previous Years Question Bank (2018–2025)',
        category: 'Academic',
        format: 'zip',
        size: '18.2 MB',
        downloads: '2.4k',
        link: '#'
      },
      {
        id: 'res-4',
        title: 'Formal Bonafide & Activity Grace Mark Recommendation Application Form',
        category: 'Forms',
        format: 'pdf',
        size: '420 KB',
        downloads: '620',
        link: '#'
      },
      {
        id: 'res-5',
        title: 'Comprehensive Data Structures & Algorithms Pattern Cheat Sheet',
        category: 'Tools',
        format: 'pdf',
        size: '2.1 MB',
        downloads: '3.1k',
        link: '#'
      },
      {
        id: 'res-6',
        title: 'Modern Software Engineering LaTeX Resume & Portfolio Template',
        category: 'Tools',
        format: 'zip',
        size: '1.5 MB',
        downloads: '1.8k',
        link: '#'
      }
    ]
  };

  /* ==========================================================================
     2. GLOBAL STATE & LOCAL STORAGE SYNC
     ========================================================================== */

  const STATE = {
    theme: localStorage.getItem('sait_theme') || document.documentElement.getAttribute('data-theme') || 'light',
    registeredEvents: JSON.parse(localStorage.getItem('sait_registered_events') || '["infinitus-26", "ai-bootcamp"]'),
    activities: [],
    announcements: [],
    currentPeopleFilter: 'all',
    currentEventCategory: 'all',
    currentEventSearch: '',
    currentAchievementFilter: 'all',
    currentResourceCategory: 'all',
    currentResourceSearch: '',
    currentActivityStatusFilter: 'all',
    currentActivitySearch: ''
  };

  // Initialize Activities from LocalStorage or seed data
  function initStorage() {
    const savedActivities = localStorage.getItem('sait_activities_log');
    if (savedActivities) {
      try {
        STATE.activities = JSON.parse(savedActivities);
      } catch (e) {
        STATE.activities = [...SAIT_DATA.seedActivities];
      }
    } else {
      STATE.activities = [...SAIT_DATA.seedActivities];
      saveActivities();
    }

    // Initialize announcements read states
    const readAnnouncements = JSON.parse(localStorage.getItem('sait_read_announcements') || '[]');
    STATE.announcements = SAIT_DATA.announcements.map(ann => ({
      ...ann,
      read: readAnnouncements.includes(ann.id) || ann.read
    }));
  }

  function saveActivities() {
    localStorage.setItem('sait_activities_log', JSON.stringify(STATE.activities));
  }

  function saveReadAnnouncements() {
    const readIds = STATE.announcements.filter(a => a.read).map(a => a.id);
    localStorage.setItem('sait_read_announcements', JSON.stringify(readIds));
  }

  function saveRegisteredEvents() {
    localStorage.setItem('sait_registered_events', JSON.stringify(STATE.registeredEvents));
  }

  /* ==========================================================================
     3. UI NOTIFICATION (TOAST) MANAGER
     ========================================================================== */

  const ToastManager = {
    container: null,

    init() {
      this.container = document.getElementById('toastContainer');
    },

    show(message, type = 'info', title = null) {
      if (!this.container) return;

      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;

      const iconMap = {
        success: 'fa-circle-check',
        info: 'fa-circle-info',
        warning: 'fa-triangle-exclamation',
        error: 'fa-circle-xmark'
      };

      const defaultTitleMap = {
        success: 'Success',
        info: 'Notice',
        warning: 'Alert',
        error: 'Error'
      };

      const icon = iconMap[type] || 'fa-bell';
      const toastTitle = title || defaultTitleMap[type] || 'Notification';

      toast.innerHTML = `
        <i class="fa-solid ${icon} toast-icon"></i>
        <div class="toast-content">
          <div class="toast-title">${toastTitle}</div>
          <div class="toast-message">${message}</div>
        </div>
        <button type="button" class="toast-close" aria-label="Close notification">
          <i class="fa-solid fa-xmark"></i>
        </button>
      `;

      const closeBtn = toast.querySelector('.toast-close');
      const dismiss = () => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 250);
      };

      closeBtn.addEventListener('click', dismiss);

      // Auto dismiss after 4 seconds
      const timer = setTimeout(dismiss, 4000);
      toast.addEventListener('mouseenter', () => clearTimeout(timer));

      this.container.appendChild(toast);
    }
  };

  /* ==========================================================================
     4. THEME CONTROLLER (Dark / Light with LocalStorage)
     ========================================================================== */

  const ThemeController = {
    init() {
      this.applyTheme(STATE.theme);

      const toggleBtn = document.getElementById('themeToggleBtn');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          STATE.theme = STATE.theme === 'dark' ? 'light' : 'dark';
          localStorage.setItem('sait_theme', STATE.theme);
          this.applyTheme(STATE.theme);
          ToastManager.show(`Switched to ${STATE.theme === 'dark' ? 'Deep Navy Night' : 'Ivory & Navy'} Mode`, 'info');
        });
      }
    },

    applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  };

  /* ==========================================================================
     5. NAVIGATION & SCROLL PROGRESS CONTROLLER
     ========================================================================== */

  const NavController = {
    init() {
      const header = document.getElementById('siteHeader');
      const progressBar = document.getElementById('scrollProgressBar');
      const backToTopBtn = document.getElementById('backToTopBtn');
      const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
      const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

      // Scroll Progress Bar & Sticky Header
      window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / (scrollHeight || 1)) * 100;

        if (progressBar) {
          progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
        }

        if (header) {
          if (scrollTop > 40) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        }

        if (backToTopBtn) {
          if (scrollTop > 450) {
            backToTopBtn.classList.add('visible');
          } else {
            backToTopBtn.classList.remove('visible');
          }
        }
      }, { passive: true });

      // Back to Top Button Click
      if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }

      // Mobile Drawer Menu
      const mobileToggle = document.getElementById('mobileMenuToggle');
      const mobileDrawer = document.getElementById('mobileNavDrawer');
      const closeDrawerBtn = document.getElementById('closeMobileDrawerBtn');
      const backdrop = document.getElementById('mobileNavBackdrop');

      const toggleDrawer = (open) => {
        if (!mobileDrawer) return;
        if (open) {
          mobileDrawer.classList.add('open');
          backdrop.classList.add('open');
          mobileToggle.setAttribute('aria-expanded', 'true');
        } else {
          mobileDrawer.classList.remove('open');
          backdrop.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      };

      if (mobileToggle) mobileToggle.addEventListener('click', () => toggleDrawer(true));
      if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => toggleDrawer(false));
      if (backdrop) backdrop.addEventListener('click', () => toggleDrawer(false));

      // Close drawer on link click
      mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => toggleDrawer(false));
      });

      // Active Section Spy with IntersectionObserver
      const sections = document.querySelectorAll('section[id]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
            mobileNavLinks.forEach(link => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, { rootMargin: '-20% 0px -60% 0px' });

      sections.forEach(sec => observer.observe(sec));
    }
  };

  /* ==========================================================================
     6. COUNTDOWN TIMER (Flagship Event)
     ========================================================================== */

  const CountdownController = {
    init() {
      const daysEl = document.getElementById('cdDays');
      const hoursEl = document.getElementById('cdHours');
      const minsEl = document.getElementById('cdMinutes');
      const secsEl = document.getElementById('cdSeconds');

      if (!daysEl) return;

      // Target Date: November 14, 2026 09:00:00 IST
      const targetDate = new Date('2026-11-14T09:00:00+05:30').getTime();

      const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
          daysEl.textContent = '00';
          hoursEl.textContent = '00';
          minsEl.textContent = '00';
          secsEl.textContent = '00';
          return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minsEl.textContent = String(minutes).padStart(2, '0');
        secsEl.textContent = String(seconds).padStart(2, '0');
      };

      updateCountdown();
      setInterval(updateCountdown, 1000);
    }
  };

  /* ==========================================================================
     7. ANIMATED NUMBER COUNTERS
     ========================================================================== */

  const CounterController = {
    init() {
      const counters = document.querySelectorAll('[data-target]');
      if (!counters.length) return;

      const animateCounter = (el) => {
        const target = parseFloat(el.getAttribute('data-target'));
        const isDecimal = el.getAttribute('data-decimal') === '1';
        const duration = 1600;
        const start = 0;
        const startTime = performance.now();

        const step = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          // Ease-out expo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = start + (target - start) * easeProgress;

          el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = isDecimal ? target.toFixed(1) : target;
          }
        };

        requestAnimationFrame(step);
      };

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      counters.forEach(c => observer.observe(c));
    }
  };

  /* ==========================================================================
     8. PEOPLE & TEAMS DIRECTORY CONTROLLER
     ========================================================================== */

  const PeopleController = {
    init() {
      this.render();
      this.bindFilters();
    },

    bindFilters() {
      const pillsContainer = document.getElementById('peopleFilterPills');
      if (!pillsContainer) return;

      const pills = pillsContainer.querySelectorAll('.filter-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          pills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          STATE.currentPeopleFilter = pill.getAttribute('data-filter');
          this.render();
        });
      });
    },

    render() {
      const grid = document.getElementById('peopleGridContainer');
      if (!grid) return;

      const filter = STATE.currentPeopleFilter;
      const filtered = filter === 'all'
        ? SAIT_DATA.people
        : SAIT_DATA.people.filter(p => p.team.toLowerCase() === filter.toLowerCase());

      if (!filtered.length) {
        grid.innerHTML = `<div class="search-empty-state"><p>No team members found for this category.</p></div>`;
        return;
      }

      grid.innerHTML = filtered.map(person => `
        <div class="glass-card person-card">
          <div class="person-card-header">
            <div class="person-avatar">
              <i class="fa-solid fa-user-tie"></i>
            </div>
            <div class="person-meta">
              <h4 class="person-name">${person.name}</h4>
              <div class="person-role">${person.role}</div>
              <span class="person-team-tag">${person.department}</span>
            </div>
          </div>
          <p class="person-bio">${person.bio}</p>
          <div class="person-socials">
            <a href="${person.social.linkedin}" class="social-icon-btn" title="LinkedIn" aria-label="LinkedIn profile of ${person.name}"><i class="fa-brands fa-linkedin"></i></a>
            <a href="${person.social.github}" class="social-icon-btn" title="GitHub" aria-label="GitHub profile of ${person.name}"><i class="fa-brands fa-github"></i></a>
            <a href="mailto:${person.social.email}" class="social-icon-btn" title="Email" aria-label="Email ${person.name}"><i class="fa-solid fa-envelope"></i></a>
          </div>
        </div>
      `).join('');
    }
  };

  /* ==========================================================================
     9. EVENTS DISCOVERY & REGISTRATION CONTROLLER
     ========================================================================== */

  const EventsController = {
    init() {
      this.renderEvents();
      this.renderPastEvents();
      this.bindCategoryFilters();
      this.bindSearchInput();
      this.bindRegistrationModal();
      this.bindPastEventsToggle();
    },

    bindCategoryFilters() {
      const pillsContainer = document.getElementById('eventCategoryPills');
      if (!pillsContainer) return;

      const pills = pillsContainer.querySelectorAll('.filter-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          pills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          STATE.currentEventCategory = pill.getAttribute('data-category');
          this.renderEvents();
        });
      });
    },

    bindSearchInput() {
      const searchInput = document.getElementById('eventSearchInput');
      if (!searchInput) return;

      searchInput.addEventListener('input', (e) => {
        STATE.currentEventSearch = e.target.value.toLowerCase().trim();
        this.renderEvents();
      });
    },

    bindPastEventsToggle() {
      const toggleBtn = document.getElementById('togglePastEventsBtn');
      const grid = document.getElementById('pastEventsGrid');
      const icon = document.getElementById('pastEventsIcon');
      const btnText = document.getElementById('pastEventsBtnText');

      if (!toggleBtn || !grid) return;

      toggleBtn.addEventListener('click', () => {
        const isCollapsed = grid.classList.contains('collapse');
        if (isCollapsed) {
          grid.classList.remove('collapse');
          icon.className = 'fa-solid fa-chevron-up';
          btnText.textContent = 'Hide Past Events';
        } else {
          grid.classList.add('collapse');
          icon.className = 'fa-solid fa-chevron-down';
          btnText.textContent = 'View Past Events';
        }
      });
    },

    renderEvents() {
      const grid = document.getElementById('eventsGridContainer');
      if (!grid) return;

      const category = STATE.currentEventCategory;
      const query = STATE.currentEventSearch;

      const filtered = SAIT_DATA.events.filter(ev => {
        const matchesCategory = category === 'all' || ev.category.toLowerCase() === category.toLowerCase();
        const matchesQuery = !query ||
          ev.title.toLowerCase().includes(query) ||
          ev.description.toLowerCase().includes(query) ||
          ev.venue.toLowerCase().includes(query);
        return matchesCategory && matchesQuery;
      });

      if (!filtered.length) {
        grid.innerHTML = `
          <div class="search-empty-state" style="grid-column: 1 / -1;">
            <i class="fa-solid fa-calendar-xmark"></i>
            <p>No events found matching your filter criteria.</p>
          </div>
        `;
        return;
      }

      grid.innerHTML = filtered.map(ev => {
        const isRegistered = STATE.registeredEvents.includes(ev.id);
        const regButton = isRegistered
          ? `<button type="button" class="btn btn-secondary btn-sm" disabled><i class="fa-solid fa-check"></i> Registered</button>`
          : `<button type="button" class="btn btn-primary btn-sm" onclick="window.saitEvents.openRegistrationModal('${ev.id}')"><i class="fa-solid fa-ticket"></i> Register</button>`;

        return `
          <div class="glass-card event-card">
            <div class="event-card-top">
              <span class="badge-pill badge-primary">${ev.category}</span>
              <span class="event-date-chip">${ev.date}</span>
            </div>
            <h4 class="event-card-title">${ev.title}</h4>
            <p class="event-card-desc">${ev.description}</p>
            <div class="event-card-meta">
              <span><i class="fa-solid fa-clock"></i> ${ev.time}</span>
              <span><i class="fa-solid fa-location-dot"></i> ${ev.venue}</span>
            </div>
            <div class="event-card-footer">
              <span class="status-indicator-badge">
                <span class="status-indicator ${ev.status === 'Open' ? 'online' : ''}"></span>
                <span style="font-size: 0.78rem; font-weight: 600; color: var(--text-muted);">${ev.status}</span>
              </span>
              ${regButton}
            </div>
          </div>
        `;
      }).join('');
    },

    renderPastEvents() {
      const grid = document.getElementById('pastEventsGrid');
      if (!grid) return;

      grid.innerHTML = SAIT_DATA.pastEvents.map(pe => `
        <div class="past-event-item">
          <h5>${pe.title}</h5>
          <span><i class="fa-solid fa-calendar-days"></i> ${pe.date} &bull; ${pe.participants}</span>
        </div>
      `).join('');
    },

    openRegistrationModal(eventId) {
      const ev = SAIT_DATA.events.find(e => e.id === eventId);
      if (!ev) return;

      const overlay = document.getElementById('eventModalOverlay');
      const titleEl = document.getElementById('eventModalTitle');
      const catEl = document.getElementById('eventModalCategory');
      const metaEl = document.getElementById('eventModalMeta');
      const idInput = document.getElementById('regEventId');

      if (!overlay) return;

      titleEl.textContent = ev.title;
      catEl.textContent = ev.category;
      idInput.value = ev.id;

      metaEl.innerHTML = `
        <div class="event-card-meta" style="margin-bottom: 1rem; border: none; padding: 0;">
          <span><i class="fa-solid fa-calendar-day"></i> ${ev.date}</span>
          <span><i class="fa-solid fa-clock"></i> ${ev.time}</span>
          <span><i class="fa-solid fa-location-dot"></i> ${ev.venue}</span>
        </div>
      `;

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    },

    bindRegistrationModal() {
      const overlay = document.getElementById('eventModalOverlay');
      const closeBtn = document.getElementById('closeEventModalBtn');
      const form = document.getElementById('eventRegistrationForm');

      if (!overlay || !form) return;

      const closeModal = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      };

      closeBtn.addEventListener('click', closeModal);
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('regStudentName').value.trim();
        const regNo = document.getElementById('regStudentNo').value.trim();
        const email = document.getElementById('regStudentEmail').value.trim();
        const eventId = document.getElementById('regEventId').value;

        // Basic Validation
        let valid = true;

        if (!name) {
          document.getElementById('regNameError').classList.add('visible');
          valid = false;
        } else {
          document.getElementById('regNameError').classList.remove('visible');
        }

        if (!regNo) {
          document.getElementById('regNoError').classList.add('visible');
          valid = false;
        } else {
          document.getElementById('regNoError').classList.remove('visible');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          document.getElementById('regEmailError').classList.add('visible');
          valid = false;
        } else {
          document.getElementById('regEmailError').classList.remove('visible');
        }

        if (!valid) return;

        // Register event in state
        if (!STATE.registeredEvents.includes(eventId)) {
          STATE.registeredEvents.push(eventId);
          saveRegisteredEvents();
        }

        const ev = SAIT_DATA.events.find(e => e.id === eventId);
        ToastManager.show(`Registered successfully for ${ev ? ev.title : 'the event'}! Confirmation sent to ${email}`, 'success', 'Registration Confirmed');

        form.reset();
        closeModal();
        this.renderEvents();
        StudentPortalController.update();
      });
    }
  };

  /* ==========================================================================
     10. ALUMNI DIRECTORY CONTROLLER
     ========================================================================== */

  const AlumniController = {
    init() {
      const grid = document.getElementById('alumniGridContainer');
      if (!grid) return;

      grid.innerHTML = SAIT_DATA.alumni.map(alumnus => `
        <div class="glass-card alumni-card">
          <div class="alumni-header">
            <div class="alumni-avatar-mini">
              <i class="fa-solid fa-graduation-cap"></i>
            </div>
            <div class="alumni-title">
              <h4>${alumnus.name}</h4>
              <span>Class of ${alumnus.gradYear} &bull; B.Tech IT</span>
            </div>
          </div>
          <div class="alumni-role">${alumnus.role} &bull; ${alumnus.company}</div>
          <p class="alumni-contrib"><strong>Career Highlight:</strong> ${alumnus.achievement}</p>
          <p class="alumni-contrib" style="font-size: 0.82rem; color: var(--text-muted);">
            <i class="fa-solid fa-handshake text-primary"></i> <strong>SAIT Impact:</strong> ${alumnus.contribution}
          </p>
        </div>
      `).join('');
    }
  };

  /* ==========================================================================
     11. ACHIEVEMENTS / HALL OF FAME CONTROLLER
     ========================================================================== */

  const AchievementsController = {
    init() {
      this.render();
      this.bindFilters();
    },

    bindFilters() {
      const pillsContainer = document.getElementById('achievementFilterPills');
      if (!pillsContainer) return;

      const pills = pillsContainer.querySelectorAll('.filter-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          pills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          STATE.currentAchievementFilter = pill.getAttribute('data-filter');
          this.render();
        });
      });
    },

    render() {
      const grid = document.getElementById('achievementsGridContainer');
      if (!grid) return;

      const filter = STATE.currentAchievementFilter;
      const filtered = filter === 'all'
        ? SAIT_DATA.achievements
        : SAIT_DATA.achievements.filter(a => a.category.toLowerCase() === filter.toLowerCase());

      if (!filtered.length) {
        grid.innerHTML = `<div class="search-empty-state"><p>No accolades found in this category.</p></div>`;
        return;
      }

      grid.innerHTML = filtered.map(item => `
        <div class="glass-card achievement-card">
          <div class="achievement-header">
            <div class="achievement-trophy">
              <i class="fa-solid fa-trophy"></i>
            </div>
            <span class="achievement-year">${item.year}</span>
          </div>
          <span class="badge-pill badge-primary" style="align-self: flex-start; margin-bottom: 0.5rem;">${item.category}</span>
          <h4 class="achievement-title">${item.title}</h4>
          <div class="achievement-event"><i class="fa-solid fa-building-columns"></i> ${item.event}</div>
          <div class="achievement-team"><i class="fa-solid fa-users"></i> ${item.team}</div>
          <p class="achievement-desc">${item.desc}</p>
        </div>
      `).join('');
    }
  };

  /* ==========================================================================
     12. STUDENT ACTIVITY LOGGER CONTROLLER (FLAGSHIP FEATURE)
     ========================================================================== */

  const ActivityLoggerController = {
    init() {
      this.renderDashboardStats();
      this.renderActivityHistory();
      this.bindForm();
      this.bindFilters();
      this.bindDetailsModal();
    },

    renderDashboardStats() {
      const totalEl = document.getElementById('statTotalActivities');
      const verifiedEl = document.getElementById('statVerifiedActivities');
      const pendingEl = document.getElementById('statPendingActivities');
      const rejectedEl = document.getElementById('statRejectedActivities');
      const progressTextEl = document.getElementById('tierProgressText');
      const progressBarFillEl = document.getElementById('tierProgressBarFill');

      if (!totalEl) return;

      const total = STATE.activities.length;
      const verified = STATE.activities.filter(a => a.status === 'Verified').length;
      const pending = STATE.activities.filter(a => a.status === 'Pending').length;
      const rejected = STATE.activities.filter(a => a.status === 'Rejected').length;

      totalEl.textContent = total;
      verifiedEl.textContent = verified;
      pendingEl.textContent = pending;
      rejectedEl.textContent = rejected;

      // Tier Calculation
      const targetNextTier = 10;
      const percentage = Math.min(Math.round((verified / targetNextTier) * 100), 100);

      if (progressTextEl) {
        progressTextEl.textContent = `${verified} / ${targetNextTier} Activities Completed`;
      }
      if (progressBarFillEl) {
        progressBarFillEl.style.width = `${percentage}%`;
      }

      // Unlock badges if verified milestones met
      const badgeCommunity = document.getElementById('badgeCommunity');
      const badgeAchiever = document.getElementById('badgeAchiever');

      if (badgeCommunity && verified >= 8) {
        badgeCommunity.classList.add('unlocked');
        badgeCommunity.innerHTML = `<div class="badge-icon"><i class="fa-solid fa-users-gear"></i></div><span class="badge-name">Community Pillar</span>`;
      }
      if (badgeAchiever && verified >= 10) {
        badgeAchiever.classList.add('unlocked');
        badgeAchiever.innerHTML = `<div class="badge-icon"><i class="fa-solid fa-crown text-warning"></i></div><span class="badge-name">Master Achiever</span>`;
      }
    },

    bindFilters() {
      const statusFilter = document.getElementById('activityStatusFilter');
      const searchInput = document.getElementById('activitySearchInput');

      if (statusFilter) {
        statusFilter.addEventListener('change', (e) => {
          STATE.currentActivityStatusFilter = e.target.value;
          this.renderActivityHistory();
        });
      }

      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          STATE.currentActivitySearch = e.target.value.toLowerCase().trim();
          this.renderActivityHistory();
        });
      }
    },

    renderActivityHistory() {
      const listContainer = document.getElementById('activityHistoryList');
      if (!listContainer) return;

      const status = STATE.currentActivityStatusFilter;
      const query = STATE.currentActivitySearch;

      const filtered = STATE.activities.filter(act => {
        const matchesStatus = status === 'all' || act.status === status;
        const matchesQuery = !query ||
          act.title.toLowerCase().includes(query) ||
          act.category.toLowerCase().includes(query) ||
          act.role.toLowerCase().includes(query);
        return matchesStatus && matchesQuery;
      });

      if (!filtered.length) {
        listContainer.innerHTML = `
          <div class="search-empty-state">
            <i class="fa-solid fa-clipboard-list"></i>
            <p>No matching activities logged.</p>
          </div>
        `;
        return;
      }

      listContainer.innerHTML = filtered.map(act => {
        const statusClass = `status-${act.status.toLowerCase()}`;
        return `
          <div class="activity-item">
            <div class="activity-item-info">
              <div class="activity-item-top">
                <span class="status-badge ${statusClass}">${act.status}</span>
                <span class="badge-pill badge-outline" style="font-size: 0.72rem;">${act.category}</span>
                <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">${act.date}</span>
              </div>
              <h5 class="activity-item-title">${act.title}</h5>
              <div class="activity-item-meta">
                <span><i class="fa-solid fa-user-tag"></i> Role: ${act.role}</span>
                <span><i class="fa-solid fa-link"></i> <a href="${act.proof}" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary);">Proof Document</a></span>
              </div>
            </div>
            <button type="button" class="btn btn-outline btn-sm" onclick="window.saitActivity.viewDetails('${act.id}')">
              <span>Details</span>
            </button>
          </div>
        `;
      }).join('');
    },

    bindForm() {
      const form = document.getElementById('activitySubmissionForm');
      if (!form) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('actEventName');
        const dateInput = document.getElementById('actDate');
        const catInput = document.getElementById('actCategory');
        const roleInput = document.getElementById('actRole');
        const proofInput = document.getElementById('actProof');
        const descInput = document.getElementById('actDesc');

        let valid = true;

        if (!nameInput.value.trim()) {
          document.getElementById('actEventNameError').classList.add('visible');
          valid = false;
        } else {
          document.getElementById('actEventNameError').classList.remove('visible');
        }

        if (!dateInput.value) {
          document.getElementById('actDateError').classList.add('visible');
          valid = false;
        } else {
          document.getElementById('actDateError').classList.remove('visible');
        }

        if (!catInput.value) {
          document.getElementById('actCategoryError').classList.add('visible');
          valid = false;
        } else {
          document.getElementById('actCategoryError').classList.remove('visible');
        }

        if (!roleInput.value) {
          document.getElementById('actRoleError').classList.add('visible');
          valid = false;
        } else {
          document.getElementById('actRoleError').classList.remove('visible');
        }

        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
        if (!proofInput.value.trim() || !urlPattern.test(proofInput.value.trim())) {
          document.getElementById('actProofError').classList.add('visible');
          valid = false;
        } else {
          document.getElementById('actProofError').classList.remove('visible');
        }

        if (!descInput.value.trim() || descInput.value.trim().length < 15) {
          document.getElementById('actDescError').classList.add('visible');
          valid = false;
        } else {
          document.getElementById('actDescError').classList.remove('visible');
        }

        if (!valid) return;

        // Create new dynamic activity object
        const newActivity = {
          id: 'act-' + Date.now(),
          title: nameInput.value.trim(),
          date: dateInput.value,
          category: catInput.value,
          role: roleInput.value,
          proof: proofInput.value.trim(),
          desc: descInput.value.trim(),
          status: 'Pending',
          timestamp: new Date().toISOString()
        };

        // Insert at beginning of activities list
        STATE.activities.unshift(newActivity);
        saveActivities();

        // Update UI
        this.renderDashboardStats();
        this.renderActivityHistory();
        StudentPortalController.update();

        ToastManager.show(
          `Activity "${newActivity.title}" logged successfully! Faculty coordinator notified for verification.`,
          'success',
          'Activity Logged'
        );

        form.reset();
      });
    },

    viewDetails(actId) {
      const act = STATE.activities.find(a => a.id === actId);
      if (!act) return;

      const overlay = document.getElementById('activityModalOverlay');
      const titleEl = document.getElementById('actDetailTitle');
      const badgeEl = document.getElementById('actDetailStatusBadge');
      const bodyEl = document.getElementById('activityModalBody');

      if (!overlay) return;

      titleEl.textContent = act.title;
      badgeEl.textContent = act.status;
      badgeEl.className = `badge-pill status-${act.status.toLowerCase()}`;

      bodyEl.innerHTML = `
        <div class="activity-detail-content">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
            <div>
              <strong style="display:block; font-size: 0.8rem; color: var(--text-muted);">Category</strong>
              <span>${act.category}</span>
            </div>
            <div>
              <strong style="display:block; font-size: 0.8rem; color: var(--text-muted);">Role</strong>
              <span>${act.role}</span>
            </div>
            <div>
              <strong style="display:block; font-size: 0.8rem; color: var(--text-muted);">Date of Participation</strong>
              <span>${act.date}</span>
            </div>
            <div>
              <strong style="display:block; font-size: 0.8rem; color: var(--text-muted);">Verification Status</strong>
              <span style="font-weight: 700;">${act.status}</span>
            </div>
          </div>
          
          <div style="margin-bottom: 1.25rem;">
            <strong style="display:block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.3rem;">Description & Outcomes</strong>
            <p style="font-size: 0.92rem; line-height: 1.6; color: var(--text-secondary); background: var(--bg-surface-elevated); padding: 0.85rem; border-radius: var(--radius-sm);">${act.desc}</p>
          </div>

          <div>
            <strong style="display:block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.3rem;">Verified Proof Evidence</strong>
            <a href="${act.proof}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Evidence Link
            </a>
          </div>
        </div>
      `;

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    },

    bindDetailsModal() {
      const overlay = document.getElementById('activityModalOverlay');
      const closeBtn = document.getElementById('closeActivityModalBtn');

      if (!overlay) return;

      const closeModal = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      };

      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
      });
    }
  };

  /* ==========================================================================
     13. ANNOUNCEMENTS & NOTICE BOARD CONTROLLER
     ========================================================================== */

  const AnnouncementsController = {
    currentCategory: 'all',
    searchTerm: '',
    sortOrder: 'latest',

    init() {
      this.render();
      this.bindCategoryFilters();
      this.bindSearch();
      this.bindSort();
      this.bindMarkAllRead();
    },

    bindCategoryFilters() {
      const pillsContainer = document.getElementById('announcementFilterPills');
      if (!pillsContainer) return;

      const pills = pillsContainer.querySelectorAll('.filter-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          pills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.currentCategory = pill.getAttribute('data-category') || 'all';
          this.render();
        });
      });
    },

    bindSearch() {
      const searchInput = document.getElementById('announcementSearchInput');
      if (!searchInput) return;

      searchInput.addEventListener('input', () => {
        this.searchTerm = searchInput.value.trim().toLowerCase();
        this.render();
      });
    },

    bindSort() {
      const sortSelect = document.getElementById('announcementSortSelect');
      if (!sortSelect) return;

      sortSelect.addEventListener('change', () => {
        this.sortOrder = sortSelect.value;
        this.render();
      });
    },

    bindMarkAllRead() {
      const markAllBtn = document.getElementById('markAllReadBtn');
      if (!markAllBtn) return;

      markAllBtn.addEventListener('click', () => {
        STATE.announcements.forEach(a => a.read = true);
        saveReadAnnouncements();
        this.render();
        ToastManager.show('All announcements marked as read.', 'info');
      });
    },

    toggleRead(annId) {
      const ann = STATE.announcements.find(a => a.id === annId);
      if (!ann) return;

      ann.read = !ann.read;
      saveReadAnnouncements();
      this.render();
    },

    render() {
      const grid = document.getElementById('announcementsGridContainer');
      const unreadBadge = document.getElementById('unreadAnnouncementsCount');

      if (!grid) return;

      const unreadCount = STATE.announcements.filter(a => !a.read).length;
      if (unreadBadge) {
        unreadBadge.innerHTML = `<i class="fa-solid fa-bell"></i> <span>${unreadCount} Unread</span>`;
      }

      let filtered = this.currentCategory === 'all'
        ? [...STATE.announcements]
        : STATE.announcements.filter(a => a.category.toLowerCase() === this.currentCategory.toLowerCase());

      if (this.searchTerm) {
        filtered = filtered.filter(ann => [ann.title, ann.body, ann.category]
          .some(value => value.toLowerCase().includes(this.searchTerm)));
      }

      const priorityRank = { High: 0, Medium: 1, Low: 2 };
      filtered.sort((first, second) => {
        if (this.sortOrder === 'priority') {
          return priorityRank[first.priority] - priorityRank[second.priority];
        }

        const firstDate = Date.parse(first.date);
        const secondDate = Date.parse(second.date);
        return this.sortOrder === 'oldest' ? firstDate - secondDate : secondDate - firstDate;
      });

      if (!filtered.length) {
        grid.innerHTML = `
          <div class="announcement-empty-state">
            <i class="fa-regular fa-folder-open" aria-hidden="true"></i>
            <strong>No announcements found</strong>
            <p>Try another category or search term.</p>
          </div>`;
        return;
      }

      grid.innerHTML = filtered.map(ann => `
        <article class="glass-card notice-card ${ann.read ? 'read' : 'unread'} ${ann.priority === 'High' ? 'is-important' : ''}">
          <div class="notice-top">
            <div class="notice-labels">
              <span class="notice-category">${ann.category}</span>
              ${ann.priority === 'High' ? '<span class="notice-important"><span aria-hidden="true">&#9679;</span> Important</span>' : ''}
            </div>
            <span class="notice-date">${ann.date}</span>
          </div>
          <h4 class="notice-title">${ann.title}</h4>
          <p class="notice-body">${ann.body}</p>
          <div class="notice-footer">
            <span class="notice-priority">Priority: <strong>${ann.priority}</strong></span>
            <button type="button" class="notice-read-toggle" onclick="window.saitAnnouncements.toggleRead('${ann.id}')">
              <i class="fa-solid ${ann.read ? 'fa-envelope' : 'fa-envelope-open'}"></i>
              <span>${ann.read ? 'Mark as Unread' : 'Mark as Read'}</span>
            </button>
          </div>
        </article>
      `).join('');
    }
  };

  /* ==========================================================================
     14. STUDENT RESOURCE HUB CONTROLLER
     ========================================================================== */

  const ResourcesController = {
    init() {
      this.render();
      this.bindCategoryFilters();
      this.bindSearch();
    },

    bindCategoryFilters() {
      const pillsContainer = document.getElementById('resourceCategoryPills');
      if (!pillsContainer) return;

      const pills = pillsContainer.querySelectorAll('.filter-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          pills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          STATE.currentResourceCategory = pill.getAttribute('data-category');
          this.render();
        });
      });
    },

    bindSearch() {
      const searchInput = document.getElementById('resourceSearchInput');
      if (!searchInput) return;

      searchInput.addEventListener('input', (e) => {
        STATE.currentResourceSearch = e.target.value.toLowerCase().trim();
        this.render();
      });
    },

    render() {
      const grid = document.getElementById('resourcesGridContainer');
      if (!grid) return;

      const category = STATE.currentResourceCategory;
      const query = STATE.currentResourceSearch;

      const filtered = SAIT_DATA.resources.filter(res => {
        const matchesCategory = category === 'all' || res.category.toLowerCase() === category.toLowerCase();
        const matchesQuery = !query || res.title.toLowerCase().includes(query);
        return matchesCategory && matchesQuery;
      });

      if (!filtered.length) {
        grid.innerHTML = `<div class="search-empty-state"><p>No academic resources found.</p></div>`;
        return;
      }

      grid.innerHTML = filtered.map(res => {
        const iconClass = res.format === 'pdf' ? 'fa-file-pdf' : res.format === 'zip' ? 'fa-file-zipper' : 'fa-file-lines';
        return `
          <div class="glass-card resource-item-card">
            <div class="resource-format-icon ${res.format}">
              <i class="fa-solid ${iconClass}"></i>
            </div>
            <div class="resource-info">
              <span class="resource-category">${res.category}</span>
              <h5 class="resource-title">${res.title}</h5>
              <div class="resource-meta">
                <span>${res.format.toUpperCase()} &bull; ${res.size} &bull; ${res.downloads} downloads</span>
              </div>
              <button type="button" class="btn btn-outline btn-sm" onclick="window.saitUI.downloadResource('${res.title}')">
                <i class="fa-solid fa-download"></i> Download Resource
              </button>
            </div>
          </div>
        `;
      }).join('');
    }
  };

  /* ==========================================================================
     15. GLOBAL SEARCH CONTROLLER (Ctrl + K)
     ========================================================================== */

  const GlobalSearchController = {
    overlay: null,
    input: null,
    resultsContainer: null,

    init() {
      this.overlay = document.getElementById('searchModalOverlay');
      this.input = document.getElementById('globalSearchInput');
      this.resultsContainer = document.getElementById('globalSearchResults');

      const triggerBtn = document.getElementById('searchTriggerBtn');
      const closeBtn = document.getElementById('closeSearchModalBtn');

      if (!this.overlay) return;

      // Keyboard Shortcut (Ctrl+K or Cmd+K)
      window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          this.open();
        }
        if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
          this.close();
        }
      });

      if (triggerBtn) triggerBtn.addEventListener('click', () => this.open());
      if (closeBtn) closeBtn.addEventListener('click', () => this.close());
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.close();
      });

      if (this.input) {
        this.input.addEventListener('input', (e) => this.handleSearch(e.target.value.trim()));
      }
    },

    open() {
      this.overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => this.input && this.input.focus(), 50);
    },

    close() {
      this.overlay.classList.remove('active');
      document.body.style.overflow = '';
      if (this.input) this.input.value = '';
      this.resetResults();
    },

    resetResults() {
      if (this.resultsContainer) {
        this.resultsContainer.innerHTML = `
          <div class="search-empty-state">
            <i class="fa-solid fa-terminal"></i>
            <p>Type keywords to search across events, people, announcements, achievements, and resources.</p>
          </div>
        `;
      }
    },

    setPrefix(prefix) {
      if (!this.input) return;
      this.input.value = prefix + ' ';
      this.input.focus();
      this.handleSearch(this.input.value);
    },

    handleSearch(query) {
      if (!this.resultsContainer) return;
      if (!query) {
        this.resetResults();
        return;
      }

      let targetCategory = null;
      let cleanQuery = query.toLowerCase();

      if (cleanQuery.startsWith('event:')) {
        targetCategory = 'event';
        cleanQuery = cleanQuery.replace('event:', '').trim();
      } else if (cleanQuery.startsWith('people:')) {
        targetCategory = 'people';
        cleanQuery = cleanQuery.replace('people:', '').trim();
      } else if (cleanQuery.startsWith('notice:')) {
        targetCategory = 'notice';
        cleanQuery = cleanQuery.replace('notice:', '').trim();
      } else if (cleanQuery.startsWith('resource:')) {
        targetCategory = 'resource';
        cleanQuery = cleanQuery.replace('resource:', '').trim();
      }

      const results = [];

      // Search Events
      if (!targetCategory || targetCategory === 'event') {
        SAIT_DATA.events.forEach(ev => {
          if (ev.title.toLowerCase().includes(cleanQuery) || ev.description.toLowerCase().includes(cleanQuery)) {
            results.push({
              title: ev.title,
              category: 'Event &bull; ' + ev.category,
              icon: 'fa-calendar-days',
              hash: '#events'
            });
          }
        });
      }

      // Search People
      if (!targetCategory || targetCategory === 'people') {
        SAIT_DATA.people.forEach(p => {
          if (p.name.toLowerCase().includes(cleanQuery) || p.role.toLowerCase().includes(cleanQuery) || p.bio.toLowerCase().includes(cleanQuery)) {
            results.push({
              title: `${p.name} (${p.role})`,
              category: 'Team &bull; ' + p.team,
              icon: 'fa-user',
              hash: '#people'
            });
          }
        });
      }

      // Search Achievements
      if (!targetCategory) {
        SAIT_DATA.achievements.forEach(ach => {
          if (ach.title.toLowerCase().includes(cleanQuery) || ach.desc.toLowerCase().includes(cleanQuery)) {
            results.push({
              title: ach.title,
              category: 'Hall of Fame &bull; ' + ach.year,
              icon: 'fa-trophy',
              hash: '#achievements'
            });
          }
        });
      }

      // Search Announcements
      if (!targetCategory || targetCategory === 'notice') {
        STATE.announcements.forEach(ann => {
          if (ann.title.toLowerCase().includes(cleanQuery) || ann.body.toLowerCase().includes(cleanQuery)) {
            results.push({
              title: ann.title,
              category: 'Announcement &bull; ' + ann.category,
              icon: 'fa-bullhorn',
              hash: '#announcements'
            });
          }
        });
      }

      // Search Resources
      if (!targetCategory || targetCategory === 'resource') {
        SAIT_DATA.resources.forEach(res => {
          if (res.title.toLowerCase().includes(cleanQuery)) {
            results.push({
              title: res.title,
              category: 'Resource &bull; ' + res.category,
              icon: 'fa-file-lines',
              hash: '#resources'
            });
          }
        });
      }

      if (!results.length) {
        this.resultsContainer.innerHTML = `
          <div class="search-empty-state">
            <i class="fa-solid fa-magnifying-glass"></i>
            <p>No matches found for &ldquo;${query}&rdquo;.</p>
          </div>
        `;
        return;
      }

      this.resultsContainer.innerHTML = results.map(r => `
        <div class="search-result-item" onclick="window.saitSearch.navigateTo('${r.hash}')">
          <div class="sri-left">
            <i class="fa-solid ${r.icon} sri-icon"></i>
            <div>
              <div class="sri-title">${r.title}</div>
              <div class="sri-category">${r.category}</div>
            </div>
          </div>
          <i class="fa-solid fa-arrow-right" style="color: var(--text-muted); font-size: 0.85rem;"></i>
        </div>
      `).join('');
    },

    navigateTo(hash) {
      this.close();
      window.location.hash = hash;
    }
  };

  /* ==========================================================================
     16. STUDENT PORTAL QUICK DASHBOARD CONTROLLER
     ========================================================================== */

  const StudentPortalController = {
    init() {
      const portalBtn = document.getElementById('studentPortalBtn');
      const mobilePortalBtn = document.getElementById('mobilePortalBtn');
      const overlay = document.getElementById('portalModalOverlay');
      const closeBtn = document.getElementById('closePortalModalBtn');

      if (!overlay) return;

      const openPortal = () => {
        this.update();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      };

      const closePortal = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      };

      if (portalBtn) portalBtn.addEventListener('click', openPortal);
      if (mobilePortalBtn) mobilePortalBtn.addEventListener('click', openPortal);
      if (closeBtn) closeBtn.addEventListener('click', closePortal);
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePortal();
      });

      this.update();
    },

    update() {
      const verifiedEl = document.getElementById('portalVerifiedCount');
      const regEventsEl = document.getElementById('portalRegisteredEventsCount');
      const eventsListEl = document.getElementById('portalEventsList');

      const verifiedCount = STATE.activities.filter(a => a.status === 'Verified').length;
      if (verifiedEl) verifiedEl.textContent = verifiedCount;
      if (regEventsEl) regEventsEl.textContent = STATE.registeredEvents.length;

      if (eventsListEl) {
        if (!STATE.registeredEvents.length) {
          eventsListEl.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-muted);">No upcoming events registered.</p>`;
        } else {
          eventsListEl.innerHTML = STATE.registeredEvents.map(id => {
            const ev = SAIT_DATA.events.find(e => e.id === id);
            return `
              <div class="portal-event-item">
                <span><strong>${ev ? ev.title : id}</strong></span>
                <span class="badge-pill badge-primary">${ev ? ev.date : 'Upcoming'}</span>
              </div>
            `;
          }).join('');
        }
      }
    }
  };

  /* ==========================================================================
     17. CONTACT FORM CONTROLLER
     ========================================================================== */

  const ContactController = {
    init() {
      const form = document.getElementById('contactInquiryForm');
      if (!form) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName');
        const email = document.getElementById('contactEmail');
        const subject = document.getElementById('contactSubject');
        const message = document.getElementById('contactMessage');

        let valid = true;

        if (!name.value.trim()) {
          document.getElementById('contactNameError').classList.add('visible');
          valid = false;
        } else {
          document.getElementById('contactNameError').classList.remove('visible');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
          document.getElementById('contactEmailError').classList.add('visible');
          valid = false;
        } else {
          document.getElementById('contactEmailError').classList.remove('visible');
        }

        if (!subject.value.trim()) {
          document.getElementById('contactSubjectError').classList.add('visible');
          valid = false;
        } else {
          document.getElementById('contactSubjectError').classList.remove('visible');
        }

        if (!message.value.trim() || message.value.trim().length < 20) {
          document.getElementById('contactMessageError').classList.add('visible');
          valid = false;
        } else {
          document.getElementById('contactMessageError').classList.remove('visible');
        }

        if (!valid) return;

        ToastManager.show(
          `Thank you, ${name.value.trim()}! Your inquiry has been sent to the SAIT Student Council coordinators.`,
          'success',
          'Inquiry Submitted'
        );

        form.reset();
      });
    }
  };

  /* ==========================================================================
     18. GLOBAL UI UTILITIES & WINDOW ATTACHMENTS
     ========================================================================== */

  window.saitUI = {
    showToast(message, type = 'info') {
      ToastManager.show(message, type);
    },
    closeModals() {
      document.querySelectorAll('.modal-overlay').forEach(modal => modal.classList.remove('active'));
      document.body.style.overflow = '';
    },
    downloadResource(name) {
      ToastManager.show(`Downloading "${name}" from CUSAT IT Repository...`, 'info', 'Resource Download');
    },
    handleNewsletter(form) {
      ToastManager.show('Thank you! You have subscribed to official SAIT tech newsletters.', 'success', 'Subscribed');
      form.reset();
    }
  };

  window.saitEvents = {
    openRegistrationModal: (id) => EventsController.openRegistrationModal(id)
  };

  window.saitActivity = {
    viewDetails: (id) => ActivityLoggerController.viewDetails(id)
  };

  window.saitAnnouncements = {
    toggleRead: (id) => AnnouncementsController.toggleRead(id)
  };

  window.saitSearch = {
    open: () => GlobalSearchController.open(),
    close: () => GlobalSearchController.close(),
    setPrefix: (p) => GlobalSearchController.setPrefix(p),
    navigateTo: (h) => GlobalSearchController.navigateTo(h)
  };

  /* ==========================================================================
     19. APPLICATION INITIALIZATION
     ========================================================================== */

  document.addEventListener('DOMContentLoaded', () => {
    initStorage();
    ToastManager.init();
    ThemeController.init();
    NavController.init();
    CountdownController.init();
    CounterController.init();
    PeopleController.init();
    EventsController.init();
    AlumniController.init();
    AchievementsController.init();
    ActivityLoggerController.init();
    AnnouncementsController.init();
    ResourcesController.init();
    GlobalSearchController.init();
    StudentPortalController.init();
    ContactController.init();

    // Welcome Toast
    setTimeout(() => {
      ToastManager.show('Welcome to SAIT — Students Association of Information Technology (SOE CUSAT).', 'info', 'Official Redesign');
    }, 800);
  });

})();
