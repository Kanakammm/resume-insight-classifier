
// This is a simulated version of the Python ML model functionality

interface CategoryMapping {
  [key: number]: string;
}

// Replicating the category mapping from the Python code
const categoryMapping: CategoryMapping = {
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
};

// Simplified version of the Python clean_resume function
const cleanResume = (resumeText: string): string => {
  let cleanText = resumeText.replace(/https?:\/\/\S+\s*/g, ' ');
  cleanText = cleanText.replace(/RT|cc/g, ' ');
  cleanText = cleanText.replace(/#\S+/g, '');
  cleanText = cleanText.replace(/@\S+/g, '  ');
  cleanText = cleanText.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, ' ');
  cleanText = cleanText.replace(/[^\x00-\x7F]/g, ' ');
  cleanText = cleanText.replace(/\s+/g, ' ');
  return cleanText.trim();
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
};

// Simulate ML model prediction based on keyword matching
const predictCategory = (cleanedText: string): { id: number; confidence: number } => {
  const text = cleanedText.toLowerCase();
  const scores: { [key: number]: number } = {};
  
  // Calculate score for each category based on keyword matches
  Object.entries(categoryKeywords).forEach(([categoryId, keywords]) => {
    const id = parseInt(categoryId);
    scores[id] = 0;
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = (text.match(regex) || []).length;
      scores[id] += matches;
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
    predictedId = Object.keys(categoryMapping)[Math.floor(Math.random() * Object.keys(categoryMapping).length)] as unknown as number;
    maxScore = 1;
  }
  
  // Calculate a confidence percentage (max 95%)
  const totalKeywords = Object.values(categoryKeywords).flat().length;
  const confidence = Math.min(95, Math.max(65, (maxScore / 10) * 100));
  
  return { id: predictedId, confidence };
};

// Main function to analyze resume
export const analyzeResume = (resumeText: string) => {
  const cleanedResume = cleanResume(resumeText);
  const prediction = predictCategory(cleanedResume);
  
  return {
    category: categoryMapping[prediction.id],
    id: prediction.id,
    confidence: prediction.confidence,
  };
};
