
// This is a simulated version of the Python ML model functionality

interface CategoryMapping {
  [key: number]: string;
}

// Replicating the category mapping from the Python code and extending it
const categoryMapping: CategoryMapping = {
  // Original categories
  15: "Java Developer",
  23: "Testing",
  8: "DevOps Engineer",
  20: "Python Developer",
  24: "Web Designing",
  12: "HR",
  13: "Hadoop",
  3: "Blockchain",
  10: "ETL Developer",
  18: "Operations Manager",
  6: "Data Science",
  22: "Sales",
  16: "Mechanical Engineer",
  1: "Arts",
  7: "Database",
  11: "Electrical Engineering",
  14: "Health and fitness",
  19: "PMO",
  4: "Business Analyst",
  9: "DotNet Developer",
  2: "Automation Testing",
  17: "Network Security Engineer",
  21: "SAP Developer",
  5: "Civil Engineer",
  0: "Advocate",
  
  // Additional categories
  25: "Frontend Developer",
  26: "Backend Developer",
  27: "Full Stack Developer",
  28: "UI/UX Designer",
  29: "Product Manager",
  30: "Data Analyst",
  31: "Cloud Engineer",
  32: "Mobile Developer",
  33: "Game Developer",
  34: "QA Engineer",
  35: "Technical Writer",
  36: "Cybersecurity Specialist",
  37: "AI Engineer",
  38: "Machine Learning Engineer",
  39: "Systems Administrator",
  40: "Scrum Master",
  41: "DevOps Manager",
  42: "Content Strategist",
  43: "SEO Specialist",
  44: "Digital Marketer",
  45: "Financial Analyst"
};

// Simplified version of the Python clean_resume function
const cleanResume = (resumeText: string): string => {
  if (!resumeText) return "";
  
  try {
    let cleanText = resumeText.replace(/https?:\/\/\S+\s*/g, ' ');
    cleanText = cleanText.replace(/RT|cc/g, ' ');
    cleanText = cleanText.replace(/#\S+/g, '');
    cleanText = cleanText.replace(/@\S+/g, '  ');
    cleanText = cleanText.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, ' ');
    cleanText = cleanText.replace(/[^\x00-\x7F]/g, ' ');
    cleanText = cleanText.replace(/\s+/g, ' ');
    return cleanText.trim();
  } catch (error) {
    console.error("Error cleaning resume:", error);
    return resumeText; // Return original text if cleaning fails
  }
};

// Keywords for each job category to simulate ML prediction
const categoryKeywords: { [key: number]: string[] } = {
  15: ["java", "spring", "hibernate", "maven", "junit", "servlets", "tomcat"],
  23: ["testing", "junit", "selenium", "qa", "quality", "test cases", "automation"],
  8: ["devops", "jenkins", "docker", "kubernetes", "aws", "ci/cd", "ansible"],
  20: ["python", "django", "flask", "pandas", "numpy", "scikit", "tensorflow"],
  24: ["web", "html", "css", "javascript", "ux", "ui", "responsive"],
  12: ["hr", "human resources", "recruiting", "talent", "benefits", "onboarding", "employee"],
  13: ["hadoop", "big data", "spark", "hive", "mapreduce", "hdfs", "yarn"],
  3: ["blockchain", "cryptocurrency", "ethereum", "smart contracts", "solidity", "bitcoin", "distributed ledger"],
  10: ["etl", "data warehouse", "informatica", "talend", "ssis", "extract", "transform"],
  18: ["operations", "management", "team lead", "process improvement", "kpi", "metrics", "efficiency"],
  6: ["data science", "machine learning", "statistics", "analytics", "algorithms", "prediction", "modeling"],
  22: ["sales", "customer", "business development", "account", "revenue", "negotiation", "crm"],
  16: ["mechanical", "engineering", "cad", "solidworks", "thermodynamics", "manufacturing", "automotive"],
  1: ["arts", "creative", "design", "portfolio", "illustration", "artistic", "studio"],
  7: ["database", "sql", "oracle", "mysql", "mongodb", "dba", "postgres"],
  11: ["electrical", "engineering", "circuits", "power", "electronics", "embedded", "microcontroller"],
  14: ["health", "fitness", "wellness", "nutrition", "exercise", "trainer", "therapy"],
  19: ["pmo", "project management", "pmp", "agile", "scrum", "jira", "program"],
  4: ["business analyst", "requirements", "stakeholder", "documentation", "analysis", "user stories", "process"],
  9: ["dotnet", ".net", "c#", "asp.net", "visual studio", "entity framework", "linq"],
  2: ["automation", "testing", "scripts", "test cases", "quality", "ci/cd", "regression"],
  17: ["network", "security", "firewall", "vpn", "encryption", "cyber", "threats"],
  21: ["sap", "erp", "abap", "hana", "modules", "implementation", "configuration"],
  5: ["civil", "engineering", "structural", "construction", "autocad", "building", "infrastructure"],
  0: ["advocate", "legal", "law", "attorney", "litigation", "counsel", "paralegal"],
  
  // Additional categories keywords
  25: ["frontend", "react", "vue", "angular", "javascript", "typescript", "html", "css", "responsive"],
  26: ["backend", "api", "server", "node", "express", "django", "spring", "php", "laravel"],
  27: ["fullstack", "full stack", "frontend", "backend", "mern", "mean", "lamp", "web development", "api"],
  28: ["ui", "ux", "design", "sketch", "figma", "adobe xd", "wireframe", "prototype", "user interface"],
  29: ["product", "roadmap", "strategy", "agile", "scrum", "backlog", "user story", "sprint", "stakeholder"],
  30: ["data analysis", "data visualization", "sql", "excel", "tableau", "power bi", "reporting", "metrics", "insights"],
  31: ["cloud", "aws", "azure", "gcp", "infrastructure", "serverless", "lambda", "iaas", "paas"],
  32: ["mobile", "ios", "android", "flutter", "react native", "swift", "kotlin", "app development", "mobile ui"],
  33: ["game", "unity", "unreal", "c\\+\\+", "3d", "animation", "physics", "game design", "level design"],
  34: ["qa", "testing", "test automation", "selenium", "cypress", "jest", "test case", "bug tracking", "quality"],
  35: ["technical writing", "documentation", "knowledge base", "user guide", "api documentation", "content", "markdown"],
  36: ["cybersecurity", "security", "penetration testing", "vulnerability", "firewall", "encryption", "compliance", "audit"],
  37: ["ai", "artificial intelligence", "neural networks", "nlp", "computer vision", "chatbot", "cognitive", "opencv"],
  38: ["machine learning", "ml", "deep learning", "tensorflow", "pytorch", "scikit-learn", "regression", "classification"],
  39: ["systems", "administration", "network", "windows", "linux", "unix", "server", "troubleshooting", "infrastructure"],
  40: ["scrum", "agile", "sprint", "retrospective", "kanban", "backlog", "facilitation", "team", "ceremonies"],
  41: ["devops", "manager", "team lead", "ci/cd", "release", "build", "deployment", "pipeline", "strategy"],
  42: ["content", "strategy", "editorial", "content planning", "audience", "messaging", "branding", "storytelling"],
  43: ["seo", "search engine", "keywords", "ranking", "backlinks", "sem", "google analytics", "organic traffic"],
  44: ["digital marketing", "social media", "campaigns", "advertising", "ppc", "cpc", "conversion", "analytics"],
  45: ["financial", "analysis", "modeling", "forecasting", "valuation", "accounting", "budgeting", "investment"]
};

// Simulate ML model prediction based on keyword matching
const predictCategory = (cleanedText: string): { id: number; confidence: number } => {
  if (!cleanedText) {
    console.warn("Empty text provided for prediction");
    return { id: 20, confidence: 65 }; // Default to Python Developer if empty
  }
  
  const text = cleanedText.toLowerCase();
  const scores: { [key: number]: number } = {};
  
  // Calculate score for each category based on keyword matches
  Object.entries(categoryKeywords).forEach(([categoryId, keywords]) => {
    const id = parseInt(categoryId);
    scores[id] = 0;
    
    keywords.forEach(keyword => {
      try {
        // Escape special characters in the keyword for regex pattern
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'gi');
        const matches = (text.match(regex) || []).length;
        scores[id] += matches;
      } catch (error) {
        console.error(`Error with keyword "${keyword}":`, error);
      }
    });
  });
  
  // Find category with highest score
  let maxScore = 0;
  let predictedId = 20; // Default to Python Developer if no matches
  
  Object.entries(scores).forEach(([categoryId, score]) => {
    if (score > maxScore) {
      maxScore = score;
      predictedId = parseInt(categoryId);
    }
  });
  
  // If no good matches, randomize a bit
  if (maxScore === 0) {
    const categoryIds = Object.keys(categoryMapping).map(id => parseInt(id));
    predictedId = categoryIds[Math.floor(Math.random() * categoryIds.length)];
    maxScore = 1;
  }
  
  // Calculate a confidence percentage (max 95%)
  const confidence = Math.min(95, Math.max(65, (maxScore / 5) * 100));
  
  return { id: predictedId, confidence };
};

// Main function to analyze resume
export const analyzeResume = (resumeText: string) => {
  console.log("Resume analysis started with text length:", resumeText?.length || 0);
  
  try {
    const cleanedResume = cleanResume(resumeText || "");
    console.log("Cleaned resume text length:", cleanedResume.length);
    
    const prediction = predictCategory(cleanedResume);
    console.log("Prediction result:", prediction);
    
    return {
      category: categoryMapping[prediction.id] || "Unknown",
      id: prediction.id,
      confidence: prediction.confidence,
    };
  } catch (error) {
    console.error("Error in resume analysis:", error);
    // Return a default result if analysis fails
    return {
      category: "Unknown",
      id: -1,
      confidence: 65,
    };
  }
};
