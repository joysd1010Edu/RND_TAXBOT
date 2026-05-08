import {
  FaArrowUp,
  FaBolt,
  FaUsers,
  FaDollarSign,
  FaClock,
  FaChartLine,
} from "react-icons/fa";

export const complianceReportData: Record<string, any> = {
  "1": {
    header: {
      projectTitle:
        "Advanced AI-Powered E-Commerce Platform with Real-Time Personalization",
      companyName: "InnovaTech Solutions Inc.",
      complianceScore: 98,
      reportDate: "December 9, 2025",
      projectPeriod: "January 15, 2024 - December 15, 2024",
      investigator: "Dr. Sarah Johnson",
      industry: "E-Commerce / Artificial Intelligence",
      totalBudget: 850000,
      teamSize: 12,
      status: "Completed",
    },
    executiveSummary: {
      projectTitle:
        "Advanced AI-Powered E-Commerce Platform with Real-Time Personalization",
      companyName: "InnovaTech Solutions Inc.",
      projectPeriod: "January 15, 2024 to December 15, 2024",
      complianceScore: 98,
      summaryText:
        "This comprehensive R&D compliance report presents a detailed analysis of the Advanced AI-Powered E-Commerce Platform with Real-Time Personalization, conducted by InnovaTech Solutions Inc. over a 12-month period from January 15, 2024 to December 15, 2024.",
      complianceText:
        "The project demonstrates an exceptional overall compliance score of 98%, indicating outstanding alignment with R&D tax credit requirements and qualifying criteria. This project represents significant technical advancement in the field of AI-powered e-commerce platforms, with novel approaches to recommendation systems, distributed architecture, and real-time personalization.",
      keyHighlights: [
        {
          label: "4 Core R&D Activities",
          value: "with scores ranging from 96% to 99%",
        },
        {
          label: "4 Supporting Activities",
          value: "with scores ranging from 96% to 100%",
        },
        {
          label: "2 Patent Applications Filed",
          value: "for novel innovations",
        },
        { label: "10,200 R&D Hours", value: "invested by qualified personnel" },
        {
          label: "$680,000 Qualifying R&D Expenditure",
          value: "properly documented",
        },
      ],
      businessMetrics: [
        {
          icon: <FaArrowUp />,
          value: "32%",
          label: "Improvement in CTR",
          color: "bg-green-600",
        },
        {
          icon: <FaBolt />,
          value: "87ms",
          label: "P95 Latency Achieved",
          color: "bg-blue-600",
        },
        {
          icon: <FaUsers />,
          value: "12M",
          label: "Concurrent Users",
          color: "bg-purple-600",
        },
      ],
    },
    complianceScore: {
      categories: [
        { name: "Core R&D Activities", score: 98, color: "#10b981" },
        { name: "Supporting Activities", score: 96, color: "#f97316" },
        { name: "Documentation Quality", score: 100, color: "#3b82f6" },
        { name: "Evidence & Validation", score: 98, color: "#06b6d4" },
        { name: "Innovation Metrics", score: 97, color: "#8b5cf6" },
        { name: "Technical Advancement", score: 99, color: "#ec4899" },
      ],
    },
    innovationMetrics: {
      metrics: [
        { subject: "Novel Algorithms", value: 95, fullMark: 100 },
        { subject: "Technical Complexity", value: 92, fullMark: 100 },
        { subject: "Industry Advancement", value: 88, fullMark: 100 },
        { subject: "Scalability Innovation", value: 94, fullMark: 100 },
        { subject: "Security Protocols", value: 90, fullMark: 100 },
        { subject: "Performance Optimization", value: 93, fullMark: 100 },
      ],
    },
    progressCharts: {
      progressData: [
        { month: "Jan 24", activitiesCompleted: 45, complianceScore: 67 },
        { month: "Feb 24", activitiesCompleted: 58, complianceScore: 72 },
        { month: "Mar 24", activitiesCompleted: 68, complianceScore: 78 },
        { month: "Apr 24", activitiesCompleted: 75, complianceScore: 82 },
        { month: "May 24", activitiesCompleted: 82, complianceScore: 86 },
        { month: "Jun 24", activitiesCompleted: 88, complianceScore: 89 },
        { month: "Jul 24", activitiesCompleted: 92, complianceScore: 92 },
        { month: "Aug 24", activitiesCompleted: 95, complianceScore: 94 },
        { month: "Sep 24", activitiesCompleted: 97, complianceScore: 96 },
        { month: "Oct 24", activitiesCompleted: 99, complianceScore: 97 },
        { month: "Nov 24", activitiesCompleted: 100, complianceScore: 98 },
        { month: "Dec 24", activitiesCompleted: 100, complianceScore: 98 },
      ],
      resourceData: [
        { month: "Jan 24", budgetUtilization: 62, rndHours: 650 },
        { month: "Feb 24", budgetUtilization: 65, rndHours: 720 },
        { month: "Mar 24", budgetUtilization: 68, rndHours: 780 },
        { month: "Apr 24", budgetUtilization: 72, rndHours: 850 },
        { month: "May 24", budgetUtilization: 78, rndHours: 920 },
        { month: "Jun 24", budgetUtilization: 82, rndHours: 980 },
        { month: "Jul 24", budgetUtilization: 85, rndHours: 1050 },
        { month: "Aug 24", budgetUtilization: 88, rndHours: 1100 },
        { month: "Sep 24", budgetUtilization: 90, rndHours: 1150 },
        { month: "Oct 24", budgetUtilization: 92, rndHours: 1200 },
        { month: "Nov 24", budgetUtilization: 95, rndHours: 1300 },
        { month: "Dec 24", budgetUtilization: 98, rndHours: 1400 },
      ],
    },
    financialAnalysis: {
      budgetCards: [
        {
          icon: <FaDollarSign />,
          value: "$850,000",
          label: "Total Budget",
          color: "bg-blue-600",
        },
        {
          icon: <FaDollarSign />,
          value: "$680,000",
          label: "R&D Qualifying",
          color: "bg-green-600",
        },
        {
          icon: <FaClock />,
          value: "10,200",
          label: "R&D Hours",
          color: "bg-orange-600",
        },
        {
          icon: <FaChartLine />,
          value: "80%",
          label: "R&D Percentage",
          color: "bg-purple-600",
        },
      ],
      costCategories: [
        {
          category: "Personnel Costs",
          rndAmount: 420000,
          nonRndAmount: 80000,
          total: 500000,
          rndPercentage: 84,
        },
        {
          category: "Software & Tools",
          rndAmount: 95000,
          nonRndAmount: 25000,
          total: 120000,
          rndPercentage: 79,
        },
        {
          category: "Cloud Infrastructure",
          rndAmount: 85000,
          nonRndAmount: 35000,
          total: 120000,
          rndPercentage: 71,
        },
        {
          category: "Research Materials",
          rndAmount: 45000,
          nonRndAmount: 5000,
          total: 50000,
          rndPercentage: 90,
        },
        {
          category: "Testing & QA",
          rndAmount: 35000,
          nonRndAmount: 25000,
          total: 60000,
          rndPercentage: 58,
        },
      ],
      chartData: [
        {
          name: "Personnel Costs",
          rndExpenditure: 420000,
          nonRndExpenditure: 80000,
        },
        {
          name: "Software & Tools",
          rndExpenditure: 95000,
          nonRndExpenditure: 25000,
        },
        {
          name: "Cloud Infrastructure",
          rndExpenditure: 85000,
          nonRndExpenditure: 35000,
        },
        {
          name: "Research Materials",
          rndExpenditure: 45000,
          nonRndExpenditure: 5000,
        },
        {
          name: "Testing & QA",
          rndExpenditure: 35000,
          nonRndExpenditure: 25000,
        },
      ],
    },
    teamComposition: {
      introText:
        "The R&D team consisted of 12 highly qualified professionals with expertise in artificial intelligence, distributed systems, software engineering, and data science. Total R&D hours: 10,200 hours",
      teamMembers: [
        {
          name: "Dr. Sarah Johnson",
          role: "Principal Investigator / Project Lead",
          degree: "PhD Computer Science",
          specializations: ["AI/ML", "System Architecture"],
          hours: 1850,
        },
        {
          name: "Michael Chen",
          role: "Senior AI/ML Engineer",
          degree: "MSc Artificial Intelligence",
          specializations: ["Deep Learning", "NLP"],
          hours: 1920,
        },
        {
          name: "Emily Rodriguez",
          role: "Lead Backend Developer",
          degree: "BSc Software Engineering",
          specializations: ["Distributed Systems", "Microservices"],
          hours: 1880,
        },
        {
          name: "James Wilson",
          role: "Research Scientist",
          degree: "PhD Machine Learning",
          specializations: ["Recommendation Systems", "Data Science"],
          hours: 1750,
        },
        {
          name: "Lisa Park",
          role: "Senior Full-Stack Developer",
          degree: "BSc Computer Science",
          specializations: ["React", "Node.js", "Real-time Systems"],
          hours: 1650,
        },
        {
          name: "David Kumar",
          role: "DevOps Engineer",
          degree: "BSc Information Technology",
          specializations: ["Cloud Architecture", "CI/CD"],
          hours: 920,
        },
        {
          name: "Anna Kowalski",
          role: "Data Engineer",
          degree: "MSc Data Science",
          specializations: ["Big Data", "ETL Pipelines"],
          hours: 1580,
        },
        {
          name: "Robert Taylor",
          role: "Security Researcher",
          degree: "MSc Cybersecurity",
          specializations: ["Cybersecurity", "Encryption"],
          hours: 1450,
        },
        {
          name: "Maria Garcia",
          role: "UX Research Lead",
          degree: "MSc HCI",
          specializations: ["User Research", "A/B Testing"],
          hours: 980,
        },
        {
          name: "Tom Anderson",
          role: "Performance Engineer",
          degree: "BSc Computer Engineering",
          specializations: ["Optimization", "Caching"],
          hours: 850,
        },
        {
          name: "Sophie Martin",
          role: "QA Automation Engineer",
          degree: "BSc Software Testing",
          specializations: ["Test Automation", "Quality Assurance"],
          hours: 720,
        },
        {
          name: "Chris Lee",
          role: "Technical Writer",
          degree: "BA Technical Writing",
          specializations: ["Documentation", "Technical Communication"],
          hours: 650,
        },
      ],
      totalMembers: 12,
      advancedDegrees: 5,
      totalHours: 10200,
      rndFocusRate: 85,
    },
    coreActivities: [
      {
        id: "ca1",
        activityNumber: 1,
        totalActivities: 4,
        title: "Novel AI Recommendation Algorithm Development",
        status: "APPROVED",
        duration: "4 months",
        budget: "$185,000",
        complianceScore: 99,
        description:
          "Development of a proprietary hybrid recommendation system combining collaborative filtering, content-based filtering, and deep learning techniques with real-time contextual awareness.",
        researchObjectives: [
          {
            text: "Create novel algorithm surpassing existing industry benchmarks by 25%",
          },
          {
            text: "Implement real-time personalization with sub-100ms latency",
          },
          { text: "Achieve 40% improvement in user engagement metrics" },
          { text: "Handle 100M+ daily recommendations with 99.99% uptime" },
        ],
        technicalChallenges: [
          {
            text: "Uncertainty in balancing cold-start problem with real-time performance requirements",
          },
          {
            text: "Novel approach to feature engineering for contextual data (time, location, device, weather)",
          },
          { text: "Unproven scalability of hybrid model at enterprise scale" },
          {
            text: "Technical risk in maintaining accuracy while optimizing for latency",
          },
        ],
        researchApproach: [
          {
            text: "Systematic literature review of 150+ academic papers and patents",
          },
          {
            text: "Hypothesis-driven experimentation with 37 different algorithm variations",
          },
          {
            text: "Controlled A/B testing framework with statistical significance validation",
          },
          { text: "Iterative refinement based on empirical performance data" },
        ],
        innovations: [
          {
            text: "Proprietary attention mechanism for temporal sequence modeling",
          },
          {
            text: "Novel tensor factorization approach reducing dimensionality by 60%",
          },
          {
            text: "Custom loss function optimizing for both accuracy and diversity",
          },
          {
            text: "Real-time feature extraction pipeline processing 50K events/second",
          },
        ],
        outcomes: [
          {
            text: "Achieved 32% improvement in click-through rate vs baseline",
          },
          { text: "Reduced cold-start conversion time from 14 days to 3 days" },
          { text: "Patent application filed for novel hybrid architecture" },
          { text: "Published research paper accepted at major ML conference" },
        ],
        complianceFindings:
          "Exceptional R&D qualification. Clear technical uncertainty, systematic experimentation, and measurable advancement beyond industry practice.",
        complianceRecommendations:
          "Exemplary documentation. Continue this standard for future projects.",
        documents: [
          { id: "d1", name: "algorithm-design-specifications.pdf" },
          { id: "d2", name: "experimental-results-data.xlsx" },
          { id: "d3", name: "patent-application-draft.pdf" },
          { id: "d4", name: "research-paper-preprint.pdf" },
          { id: "d5", name: "performance-benchmarks.pdf" },
          { id: "d6", name: "code-repository-documentation.pdf" },
        ],
      },
      {
        id: "ca2",
        activityNumber: 2,
        totalActivities: 4,
        title: "Real-Time Distributed Processing Architecture",
        status: "APPROVED",
        duration: "5 months",
        budget: "$215,000",
        complianceScore: 98,
        description:
          "Design and implementation of a novel distributed event-driven architecture capable of processing millions of concurrent user interactions with guaranteed consistency and sub-second latency.",
        researchObjectives: [
          {
            text: "Design fault-tolerant system handling 10M concurrent users",
          },
          { text: "Achieve 99.99% availability with automatic failover" },
          { text: "Maintain ACID properties across distributed transactions" },
          { text: "Process events with p95 latency under 200ms" },
        ],
        technicalChallenges: [
          {
            text: "Uncertainty in achieving strong consistency without sacrificing performance",
          },
          {
            text: "Novel approach to distributed caching with invalidation guarantees",
          },
          {
            text: "Unproven scalability of event sourcing pattern at this scale",
          },
          { text: "Technical risk in cross-region data synchronization" },
        ],
        researchApproach: [
          {
            text: "Comparative analysis of 12 distributed database technologies",
          },
          {
            text: "Load testing simulations with synthetic traffic up to 15M users",
          },
          { text: "Chaos engineering experiments to validate fault tolerance" },
          {
            text: "Performance profiling and bottleneck identification studies",
          },
        ],
        innovations: [
          {
            text: "Custom consensus protocol optimized for e-commerce workloads",
          },
          {
            text: "Novel sharding strategy reducing cross-shard transactions by 85%",
          },
          {
            text: "Predictive cache warming algorithm based on user behavior patterns",
          },
          {
            text: "Zero-downtime deployment system with gradual rollout capability",
          },
        ],
        outcomes: [
          { text: "Successfully scaled to 12M concurrent users in production" },
          { text: "Achieved 99.995% uptime over 6-month monitoring period" },
          { text: "Reduced infrastructure costs by 40% through optimization" },
          { text: "Open-sourced framework gaining 2.5K GitHub stars" },
        ],
        complianceFindings:
          "Outstanding technical advancement. Novel architectural patterns with proven scalability improvements.",
        complianceRecommendations:
          "Perfect example of qualifying R&D activity with clear innovation and uncertainty resolution.",
        documents: [
          { id: "d1", name: "architecture-diagrams.pdf" },
          { id: "d2", name: "load-testing-reports.pdf" },
          { id: "d3", name: "chaos-engineering-results.pdf" },
          { id: "d4", name: "performance-analysis.xlsx" },
          { id: "d5", name: "framework-documentation.pdf" },
          { id: "d6", name: "open-source-repository-stats.pdf" },
        ],
      },
      {
        id: "ca3",
        activityNumber: 3,
        totalActivities: 4,
        title: "Advanced Machine Learning Model Training Pipeline",
        status: "APPROVED",
        duration: "3 months",
        budget: "$145,000",
        complianceScore: 97,
        description:
          "Development of an automated ML pipeline incorporating hyperparameter optimization, model versioning, and continuous training with data drift detection.",
        researchObjectives: [
          {
            text: "Automate model retraining with 90% reduction in manual effort",
          },
          { text: "Implement drift detection with 95% accuracy" },
          { text: "Reduce model training time from 72 hours to 8 hours" },
          { text: "Enable experimentation with 50+ models simultaneously" },
        ],
        technicalChallenges: [
          { text: "Uncertainty in detecting subtle data drift in production" },
          { text: "Novel approach to distributed hyperparameter search" },
          { text: "Unproven effectiveness of automated feature selection" },
          { text: "Technical risk in maintaining model reproducibility" },
        ],
        researchApproach: [
          {
            text: "Evaluation of 8 AutoML frameworks and custom implementations",
          },
          { text: "Statistical analysis of drift detection methodologies" },
          {
            text: "Benchmarking distributed training across various configurations",
          },
          { text: "Version control experiments for model artifacts" },
        ],
        innovations: [
          {
            text: "Custom Bayesian optimization algorithm for hyperparameter tuning",
          },
          {
            text: "Novel ensemble approach combining statistical and ML-based drift detection",
          },
          {
            text: "Distributed training coordinator reducing training time by 85%",
          },
          {
            text: "Git-based model versioning system with automatic lineage tracking",
          },
        ],
        outcomes: [
          { text: "Reduced model iteration time from weeks to days" },
          { text: "Detected 100% of significant drift events in validation" },
          { text: "Enabled 3x increase in experimentation velocity" },
          {
            text: "Improved model accuracy by 12% through better optimization",
          },
        ],
        complianceFindings:
          "Excellent R&D activity demonstrating systematic innovation in MLOps practices.",
        complianceRecommendations:
          "Strong qualifying activity with clear technical advancement.",
        documents: [
          { id: "d1", name: "pipeline-architecture.pdf" },
          { id: "d2", name: "drift-detection-validation.xlsx" },
          { id: "d3", name: "training-performance-metrics.pdf" },
          { id: "d4", name: "hyperparameter-optimization-results.pdf" },
          { id: "d5", name: "model-versioning-specification.pdf" },
        ],
      },
      {
        id: "ca4",
        activityNumber: 4,
        totalActivities: 4,
        title: "Intelligent Caching & Prediction System",
        status: "APPROVED",
        duration: "3 months",
        budget: "$135,000",
        complianceScore: 96,
        description:
          "Research and development of a predictive caching system using machine learning to anticipate user behavior and pre-load personalized content.",
        researchObjectives: [
          { text: "Achieve 85% cache hit rate for personalized content" },
          { text: "Reduce page load times by 60%" },
          { text: "Predict user intent with 78% accuracy" },
          { text: "Minimize cache storage costs by 35%" },
        ],
        technicalChallenges: [
          {
            text: "Uncertainty in predicting diverse user behaviors accurately",
          },
          { text: "Novel approach to balancing cache size vs hit rate" },
          { text: "Unproven effectiveness of ML-based prefetching" },
          { text: "Technical risk in cache invalidation timing" },
        ],
        researchApproach: [
          { text: "Analysis of 500M+ user session patterns" },
          { text: "Comparative study of 6 prediction algorithms" },
          { text: "Cache simulation with historical data" },
          { text: "Cost-benefit optimization modeling" },
        ],
        innovations: [
          { text: "Custom LSTM model for user journey prediction" },
          { text: "Novel cache replacement policy using predicted value" },
          { text: "Adaptive TTL algorithm based on content volatility" },
          { text: "Probabilistic prefetching with cost constraints" },
        ],
        outcomes: [
          { text: "Achieved 87% cache hit rate exceeding target" },
          { text: "Reduced average page load from 2.8s to 1.1s" },
          { text: "Decreased CDN bandwidth costs by 42%" },
          { text: "Improved user satisfaction scores by 28%" },
        ],
        complianceFindings:
          "Strong R&D qualification with clear innovation in caching strategies.",
        complianceRecommendations:
          "Well-documented qualifying activity with measurable outcomes.",
        documents: [
          { id: "d1", name: "user-behavior-analysis.pdf" },
          { id: "d2", name: "prediction-model-evaluation.xlsx" },
          { id: "d3", name: "cache-performance-reports.pdf" },
          { id: "d4", name: "cost-savings-analysis.pdf" },
        ],
      },
    ],
    supportingActivities: {
      introduction:
        "Supporting activities directly enable and facilitate the core R&D work. These activities have a clear nexus to the resolution of technical uncertainties and advancement of technological capabilities.",
      activities: [
        {
          id: "sa1",
          title: "Comprehensive Testing & Quality Assurance Framework",
          duration: "6 months",
          budget: "$95,000",
          status: "approved",
          complianceScore: 98,
          description:
            "Development of automated testing infrastructure supporting R&D activities including unit, integration, performance, and chaos testing frameworks.",
          keyActivities: [
            { text: "Created 2,500+ automated test cases for R&D components" },
            {
              text: "Implemented continuous testing pipeline with 15-minute feedback",
            },
            { text: "Designed performance regression detection system" },
            {
              text: "Established chaos engineering protocols for resilience testing",
            },
          ],
          rndNexus:
            "Essential for validating R&D hypotheses and ensuring experimental code quality. Enabled rapid iteration cycles.",
          complianceFinding:
            "Directly supports core R&D activities with clear nexus to technical uncertainty resolution.",
        },
        {
          id: "sa2",
          title: "Project Budget & Resource Allocation Management",
          duration: "12 months",
          budget: "$75,000",
          status: "approved",
          complianceScore: 97,
          description:
            "Detailed tracking and allocation of R&D vs non-R&D expenditures with time-tracking, cost allocation, and compliance documentation.",
          keyActivities: [
            { text: "Weekly time tracking across all 15 team members" },
            { text: "Monthly budget reconciliation and R&D cost segregation" },
            { text: "Quarterly financial reporting to stakeholders" },
            { text: "Continuous compliance documentation updates" },
          ],
          rndNexus:
            "Necessary for accurate R&D claim preparation and financial compliance.",
          complianceFinding:
            "Appropriate supporting activity with clear R&D nexus.",
        },
        {
          id: "sa3",
          title: "Technical Documentation & Knowledge Management",
          duration: "12 months",
          budget: "$85,000",
          status: "approved",
          complianceScore: 100,
          description:
            "Systematic documentation of R&D processes, experimental findings, technical specifications, and knowledge transfer materials.",
          keyActivities: [
            { text: "Maintained 500+ pages of technical documentation" },
            { text: "Documented 37 algorithm experiments with results" },
            {
              text: "Created architectural decision records (ADRs) for all major decisions",
            },
            {
              text: "Produced 12 technical whitepapers and research summaries",
            },
          ],
          rndNexus:
            "Critical for R&D continuity, knowledge preservation, and compliance evidence.",
          complianceFinding:
            "Exemplary documentation standards supporting R&D claim.",
        },
        {
          id: "sa4",
          title: "Security Research & Implementation",
          duration: "4 months",
          budget: "$105,000",
          status: "approved",
          complianceScore: 96,
          description:
            "Research and implementation of advanced security measures supporting R&D infrastructure and protecting proprietary algorithms.",
          keyActivities: [
            { text: "Implemented end-to-end encryption for sensitive data" },
            {
              text: "Developed custom authentication system with biometric support",
            },
            { text: "Conducted security audits and penetration testing" },
            {
              text: "Established compliance with SOC2 and ISO 27001 standards",
            },
          ],
          rndNexus:
            "Protects R&D intellectual property and ensures secure experimentation environment.",
          complianceFinding:
            "Qualifying supporting activity with direct R&D nexus.",
        },
      ],
    },
    technologyStack: {
      categories: [
        {
          id: "ts1",
          name: "AI/ML Frameworks",
          technologies:
            "TensorFlow 2.x, PyTorch, Scikit-learn, XGBoost, Custom algorithms",
          purpose: "Machine learning model development and training",
          innovation: "Custom hybrid framework combining multiple approaches",
        },
        {
          id: "ts2",
          name: "Backend Systems",
          technologies: "Node.js, Python, Go, GraphQL, gRPC",
          purpose: "High-performance API and microservices",
          innovation: "Novel event-driven architecture",
        },
        {
          id: "ts3",
          name: "Distributed Systems",
          technologies:
            "Apache Kafka, Redis, PostgreSQL, MongoDB, Elasticsearch",
          purpose: "Real-time data processing and storage",
          innovation: "Custom consensus and sharding protocols",
        },
        {
          id: "ts4",
          name: "Cloud Infrastructure",
          technologies: "AWS (EC2, S3, Lambda, SageMaker), Kubernetes, Docker",
          purpose: "Scalable deployment and orchestration",
          innovation: "Auto-scaling ML training infrastructure",
        },
        {
          id: "ts5",
          name: "Frontend",
          technologies: "React, Next.js, TypeScript, WebSocket",
          purpose: "Real-time user interface",
          innovation: "Predictive UI rendering",
        },
      ],
      architectureDiagramNote:
        "Detailed architectural diagrams and technical specifications available in supporting documentation.",
    },
    projectMilestones: {
      milestones: [
        {
          id: "m1",
          phase: "Phase 1: Research & Planning",
          startDate: "Jan - Feb 2024",
          budget: "$125,000",
          complianceScore: "95%",
          deliverables: [
            "Technical feasibility study completed",
            "R&D team assembled and trained",
            "Architecture design finalized",
            "Initial algorithm prototypes developed",
          ],
        },
        {
          id: "m2",
          phase: "Phase 2: Core Development",
          startDate: "Mar - Jun 2024",
          budget: "$285,000",
          complianceScore: "97%",
          deliverables: [
            "Recommendation algorithm implemented",
            "Distributed architecture deployed",
            "ML training pipeline operational",
            "Initial testing completed",
          ],
        },
        {
          id: "m3",
          phase: "Phase 3: Optimization & Scaling",
          startDate: "Jul - Sep 2024",
          budget: "$180,000",
          complianceScore: "98%",
          deliverables: [
            "Performance optimization completed",
            "Caching system implemented",
            "Security measures enhanced",
            "Load testing passed",
          ],
        },
        {
          id: "m4",
          phase: "Phase 4: Validation & Documentation",
          startDate: "Oct - Dec 2024",
          budget: "$90,000",
          complianceScore: "100%",
          deliverables: [
            "Production deployment successful",
            "Patent applications filed",
            "Comprehensive documentation completed",
            "R&D report finalized",
          ],
        },
      ],
    },
    riskAssessment: {
      introduction:
        "Comprehensive risk assessment was conducted throughout the R&D project lifecycle. All identified risks have been successfully mitigated or resolved through systematic planning and proactive management.",
      risks: [
        {
          id: "r1",
          title: "Technical Scalability Limitations",
          probability: "Low",
          impact: "High",
          mitigation: "Extensive load testing and gradual rollout strategy",
          status: "Mitigated",
        },
        {
          id: "r2",
          title: "Algorithm Accuracy Below Targets",
          probability: "Medium",
          impact: "Medium",
          mitigation: "Multiple algorithm variations and fallback mechanisms",
          status: "Resolved",
        },
        {
          id: "r3",
          title: "Data Privacy Compliance Issues",
          probability: "Low",
          impact: "Critical",
          mitigation:
            "Legal review, GDPR compliance audit, privacy-by-design approach",
          status: "Mitigated",
        },
        {
          id: "r4",
          title: "Infrastructure Cost Overruns",
          probability: "Low",
          impact: "Medium",
          mitigation:
            "Cost optimization research and cloud resource monitoring",
          status: "Controlled",
        },
      ],
      qualityMetrics: [
        {
          id: "qm1",
          name: "Test Coverage",
          target: "85%",
          achieved: "92%",
          status: "Exceeded",
        },
        {
          id: "qm2",
          name: "Code Quality Score",
          target: "8.0/10",
          achieved: "9.2/10",
          status: "Exceeded",
        },
        {
          id: "qm3",
          name: "Documentation Completeness",
          target: "90%",
          achieved: "100%",
          status: "Exceeded",
        },
        {
          id: "qm4",
          name: "Technical Debt Ratio",
          target: "<5%",
          achieved: "3.2%",
          status: "Met",
        },
        {
          id: "qm5",
          name: "Security Vulnerabilities",
          target: "0 Critical",
          achieved: "0 Critical",
          status: "Met",
        },
        {
          id: "qm6",
          name: "Performance Benchmarks",
          target: "100ms p95",
          achieved: "87ms p95",
          status: "Exceeded",
        },
      ],
    },
    intellectualProperty: {

        introduction:
        "The R&D project has resulted in the generation of significant intellectual property (IP) assets that enhance the company's competitive advantage and technological leadership.",
      items: [
        {
          id: "ip1",
          type: "Patent Application",
          status: "Filed",
          title: "Hybrid Recommendation System with Contextual Awareness",
          reference: "US-2024-789456",
          date: "May 15, 2024",
        },
        {
          id: "ip2",
          type: "Trade Secret",
          status: "Protected",
          title: "Proprietary Algorithm Parameters & Feature Weights",
          reference: "TS-2024-001",
          date: "June 30, 2024",
        },
        {
          id: "ip3",
          type: "Patent Application",
          status: "Filed",
          title: "Distributed Event Processing with Predictive Caching",
          reference: "US-2024-892134",
          date: "August 10, 2024",
        },
        {
          id: "ip4",
          type: "Open Source",
          status: "Published",
          title: "ML Training Pipeline Framework",
          reference: "GitHub/ml-pipeline",
          date: "July 20, 2024",
        },
      ],
      statistics: [
        { value: "2", label: "Patents Filed" },
        { value: "1", label: "Trade Secret" },
        { value: "1", label: "Open Source" },
        { value: "2.5K", label: "GitHub Stars" },
      ],
    },
    conclusion: {
      overallScore: 98,
      projectTitle:
        "Advanced AI-Powered E-Commerce Platform with Real-Time Personalization",
      summaryText:
        "This project represents an exemplary R&D initiative demonstrating outstanding technical innovation, systematic scientific approach, and exceptional alignment with R&D tax credit requirements. The project successfully resolved significant technical uncertainties through hypothesis-driven experimentation and generated valuable intellectual property.",
      keyFindings: [
        { id: 1,
          title: "Technical Innovation",
          description:
            "Outstanding novel approaches in AI recommendation systems achieving 32% improvement in click-through rates with sub-100ms latency.",
        },
        { id: 2,
          title: "Scientific Method",
          description:
            "Exemplary systematic experimentation with 37+ algorithm variations, rigorous A/B testing, and statistical validation.",
        },
        { id: 3,
          title: "Documentation Quality",
          description:
            "Exceptional documentation standards with comprehensive technical specifications and experimental logs.",
        },
        { id: 4,
          title: "IP Generation",
          description:
            "Substantial IP creation with 2 patent applications filed and multiple proprietary innovations protected.",
        },
      ],
      recommendations: [
        {
          title: "Maintain Documentation Standards",
          description:
            "Continue exceptional documentation practices for all future R&D initiatives to support claims and facilitate knowledge transfer.",
        },
        {
          title: "Expand Patent Portfolio",
          description:
            "Consider additional patent applications for caching strategies and ML pipeline innovations.",
        },
        {
          title: "Publish Research Papers",
          description:
            "Novel distributed architecture merits publication in academic venues to establish thought leadership.",
        },
      ],
      complianceStatement:
        "This project FULLY QUALIFIES for R&D tax credits. All four criteria for qualifying R&D activities are clearly met: technological in nature, elimination of uncertainty, process of experimentation, and technological advancement.",
      reportDetails: {
        reportId: "RD-2024-789456",
        auditDate: "December 18, 2024",
        auditor: "Dr. Jennifer Martinez, PhD",
        status: "Approved",
      },
    },
    appendices: {
      contactInfo: {
        investigator: {
          name: "Dr. Sarah Johnson",
          title: "Principal Investigator & Chief Technology Officer",
          email: "sarah.johnson@innovatech.com",
          phone: "+1 (555) 123-4567",
        },
        company: {
          name: "InnovaTech Solutions Inc.",
          address: "1234 Innovation Drive, Silicon Valley, CA 94025",
          website: "www.innovatech.com",
          email: "rd@innovatech.com",
          industry: "Technology & Software Development",
        },
      },
      documentationIndex: [
        {
          id: "doc1",
          title: "Technical Specifications",
          description:
            "Complete algorithm design and architecture documentation",
          pages: 156,
        },
        {
          id: "doc2",
          title: "Experimental Results",
          description: "A/B test results and statistical analysis",
          pages: 89,
        },
        {
          id: "doc3",
          title: "Patent Applications",
          description: "Filed patent documentation and claims",
          pages: 124,
        },
        {
          id: "doc4",
          title: "Performance Analysis",
          description: "Load testing and scalability validation reports",
          pages: 73,
        },
        {
          id: "doc5",
          title: "ML Pipeline Documentation",
          description: "Training procedures and model versioning",
          pages: 92,
        },
        {
          id: "doc6",
          title: "Financial Records",
          description: "R&D budget allocation and time tracking",
          pages: 67,
        },
      ],
      glossary: [
        {
          term: "Collaborative Filtering",
          definition:
            "Recommendation technique based on user behavior patterns and preferences",
        },
        {
          term: "Consensus Protocol",
          definition:
            "Algorithm ensuring distributed system agreement on shared state",
        },
        {
          term: "Latency",
          definition: "Time delay between user action and system response",
        },
        {
          term: "A/B Testing",
          definition:
            "Experimental method comparing two variants to determine performance",
        },
        {
          term: "Sharding",
          definition: "Database partitioning strategy for horizontal scaling",
        },
        {
          term: "Cold Start",
          definition:
            "Challenge of making recommendations for new users with limited data",
        },
      ],
      footer: {
        reportId: "RD-2024-789456",
        version: "1.0",
        generatedDate: "December 18, 2024",
        confidentiality: "Confidential - R&D Tax Credit Documentation",
        systemName: "InnovaTech R&D Reporting System",
        platform: "R&D Tax Compliance Platform",
        confidential: "Confidential - R&D Tax Credit Documentation",
      },
    },
  },
};
