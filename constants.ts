
export const MAIN_MENU_OPTIONS = [
  'Company Details',
  'Eligibility Criteria',
  'Interview Preparation',
  'Placement Cell Contact Details'
];

export const COMPANY_OPTIONS = [
  'TCS',
  'Infosys',
  'Wipro',
  'Accenture',
  'Microsoft',
  'Google',
  'Amazon',
  'HCLTech'
];

export const INTERVIEW_PREP_OPTIONS = [
  'Aptitude Preparation',
  'Technical Preparation',
  'HR Interview Preparation',
  'Resume Preparation'
];

export const ELIGIBILITY_CRITERIA = `
Minimum CGPA requirement: 6.5 and above
Backlog policy: No active backlogs at the time of recruitment
Eligible branches: CSE, IT, ECE, EEE, Mechanical, Civil
Graduation year criteria: Final year students only
Note: Eligibility varies by company. Always check the specific job description for updates.
`;

export const PLACEMENT_CELL_CONTACT = `
Placement Officer Name: Dr Anilkumar E N
Email Address: cgpu@lbsitw.com
Contact Number: 9495838477
Office Location: 2nd floor near seminar hall
Note: Details may differ across institutions.
`;

export const PREP_TIPS: Record<string, string> = {
  'Aptitude Preparation': `
Preparation tips: Practice daily logic and quantitative problems. Focus on time management.
Sample questions: Profit and loss, speed and distance, logical deductions, data interpretation.
Recommended practice areas: Quantitative aptitude, logical reasoning, verbal ability.
`,
  'Technical Preparation': `
Preparation tips: Master at least one programming language. Understand core CS fundamentals.
Sample questions: Explain polymorphism. Write code for reversing a linked list. What is a primary key?
Recommended practice areas: Data structures, algorithms, DBMS, operating systems.
`,
  'HR Interview Preparation': `
Preparation tips: Research the company thoroughly. Be honest and maintain positive body language.
Sample questions: Tell me about yourself. Why do you want to join this company? Where do you see yourself in five years?
Recommended practice areas: Communication skills, behavioral traits, personal strengths and weaknesses.
`,
  'Resume Preparation': `
Preparation tips: Keep it to one page. Use professional fonts. Highlight your projects and skills.
Sample questions: What was your specific role in this group project? Can you explain this technical skill mentioned?
Recommended practice areas: Project summaries, technical stack listing, internship achievements.
`
};
