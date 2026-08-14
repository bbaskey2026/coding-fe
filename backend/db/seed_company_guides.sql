-- Seed company guides data
INSERT INTO company_guides (id, company_name, logo_url, difficulty, exam_pattern, question_types, common_questions, article_content)
VALUES 
(
  1,
  'TCS (Tata Consultancy Services)',
  '/assets/companies/tcs.png',
  'Easy to Medium',
  '{
    "examName": "TCS NQT (National Qualifier Test)",
    "durationMinutes": 166,
    "sections": [
      { "name": "Numerical Ability", "questions": 26, "time": 40 },
      { "name": "Verbal Ability", "questions": 24, "time": 30 },
      { "name": "Reasoning Ability", "questions": 30, "time": 50 },
      { "name": "Coding (2 Questions)", "questions": 2, "time": 46 }
    ],
    "negativeMarking": false,
    "calculatorAllowed": "On-screen virtual calculator only",
    "passingCriteria": "Sectional cutoffs apply in each section",
    "mode": "Online (Remote Proctored or Test Center)",
    "frequency": "Multiple times a year (check TCS NextStep portal)"
  }'::jsonb,
  ARRAY['Numerical Ability', 'Verbal Ability', 'Reasoning', 'Arrays', 'Strings', 'Command Line Programming'],
  '[
    { "title": "Two Sum", "problemId": 1 },
    { "title": "Reverse String", "problemId": 3 }
  ]'::jsonb,
  '# TCS NQT Complete Preparation Guide (2024–25)

Tata Consultancy Services (TCS) is one of India''s largest IT employers, hiring **30,000–40,000 freshers annually** through the **TCS National Qualifier Test (NQT)**. The NQT score is valid for 2 years and can be used to apply to multiple TCS roles. This guide covers everything from exam structure to final interview rounds.

---

## 🏢 About TCS & Why It Matters

TCS operates in 55+ countries and serves clients across BFSI, retail, healthcare, and manufacturing verticals. For freshers, TCS offers two major tracks:

- **Ninja (Trainee):** Package ₹3.36 LPA — General IT services track
- **Digital (Prime):** Package ₹7 LPA — Focused on cloud, data, and emerging tech
- **Platinum:** Package ₹9.5 LPA+ — Elite R&D and product engineering roles

Your NQT score directly determines which track you qualify for. Scoring above 80th percentile typically opens Digital/Prime eligibility.

---

## 📋 Complete Hiring Process

### Round 1 — TCS NQT Online Test
The NQT is the primary filter. It is conducted on the **TCS iON platform** and is divided into a **Foundation section** (compulsory for all) and an **Advanced Coding section** (for Digital/Prime aspirants).

### Round 2 — Technical Interview (TR)
A 30–45 minute interview focused on:
- Core Computer Science fundamentals (OOPs, DBMS, OS, Networks)
- 1–2 live coding problems (Easy to Medium difficulty)
- Project discussion from your resume
- Questions on languages you''ve mentioned (Java/Python/C++)

### Round 3 — Managerial Round (MR)
Not always conducted for Ninja track, but common for Digital roles:
- Situational questions ("How would you handle a project deadline conflict?")
- Team collaboration scenarios
- Basic system design thinking

### Round 4 — HR Interview
- Willingness to relocate (TCS has offices in 20+ Indian cities)
- Bond agreement understanding (TCS has a 2-year bond for freshers)
- Salary negotiation is generally not applicable at fresher level

---

## 📊 Detailed Exam Pattern Breakdown

| Section | Questions | Time | Key Topics |
|---|---|---|---|
| Numerical Ability | 26 | 40 mins | Percentages, Profit & Loss, Time & Work, Probability, Permutations |
| Verbal Ability | 24 | 30 mins | Reading Comprehension, Fill in the Blanks, Sentence Correction, Vocabulary |
| Reasoning Ability | 30 | 50 mins | Logical Deduction, Blood Relations, Coding-Decoding, Series |
| Coding Section | 2 | 46 mins | Data Structures, Algorithms, Math Logic |

**Important Rules:**
- No negative marking across all sections
- Sectional time limits are strictly enforced (cannot borrow time across sections)
- Virtual calculator available for Numerical section only
- Supported languages: C, C++, Java, Python, Perl

---

## 💻 Coding Section — Deep Dive

The coding section is the most decisive part for Digital track selection. Questions are auto-evaluated based on test cases.

### Question 1 (Easy — ~15 minutes)
Typically involves:
- String manipulation (reverse, palindrome, anagram check)
- Basic array operations (sum, max/min, frequency count)
- Simple mathematical logic (factorial, Fibonacci, GCD/LCM, prime check)
- Pattern printing using nested loops

**Example problems seen in past papers:**
- "Find the second largest element in an array without sorting"
- "Check if a given number is an Armstrong number"
- "Count vowels and consonants in a string"
- "Print all prime numbers up to N using Sieve of Eratosthenes"

### Question 2 (Medium — ~30 minutes)
Involves intermediate algorithmic thinking:
- Matrix operations (transpose, spiral traversal, rotation)
- Hashing (find duplicates, first non-repeating character)
- Sorting-based logic (merge intervals, sort by frequency)
- Basic Dynamic Programming (coin change, climbing stairs)
- Two-pointer techniques

**Example problems seen in past papers:**
- "Find the maximum sum subarray (Kadane''s Algorithm)"
- "Check if two strings are rotations of each other"
- "Find all pairs in array with given sum using hashing"
- "Implement a basic stack using arrays"

---

## 📚 Section-Wise Preparation Strategy

### Numerical Ability
Focus areas with weightage:
- **Arithmetic (40%):** Percentages, Profit & Loss, Simple & Compound Interest, Ratio & Proportion
- **Algebra (20%):** Linear equations, Age problems, Mixture & Alligation
- **Number Theory (20%):** HCF, LCM, Divisibility rules, Remainder theorem
- **Probability & Permutation (20%):** Basic P&C, Dice problems, Card-based probability

**Recommended resources:**
- R.S. Aggarwal — Quantitative Aptitude (Chapters 1–20 are sufficient)
- IndiaBIX numerical practice sets (attempt 15–20 questions daily)
- TCS NQT mock tests on PrepInsta and TCSiON portal

### Verbal Ability
- Read editorials from The Hindu or Economic Times daily (builds comprehension speed)
- Practice 2 Reading Comprehension passages daily (each ~400–600 words)
- Memorize 10 new vocabulary words daily (GRE word lists work well)
- Focus on grammar: Subject-Verb agreement, Tense consistency, Prepositions

### Reasoning Ability
High-weightage topics:
- **Syllogisms:** Practice Venn diagram approach for quick elimination
- **Number & Letter Series:** Identify arithmetic/geometric progression patterns
- **Coding-Decoding:** Letter shift patterns and symbol substitution
- **Blood Relations:** Draw family tree diagrams for complex chains
- **Arrangements:** Linear and circular seating with constraints

### Coding Preparation
- Complete **at least 50–70 LeetCode Easy problems** before the exam
- Practice on TCS CodeVita archives for style familiarity
- Know standard library functions: `sort()`, `Collections`, `HashMap`, `StringBuilder`
- Understand time complexity basics — O(n), O(n log n), O(n²) — TCS does not require optimization but clean logic matters

---

## 🎯 Technical Interview Preparation

### OOPs Concepts (Very Frequently Asked)
Be ready to explain with real-world examples:
- **Encapsulation:** Bundling data and methods (e.g., a bank account class)
- **Inheritance:** Parent-child class relationships (e.g., Animal → Dog)
- **Polymorphism:** Method overloading vs overriding differences
- **Abstraction:** Abstract classes vs interfaces — when to use which

### DBMS Topics
- Write basic to intermediate SQL queries (JOINs, GROUP BY, HAVING, subqueries)
- Explain normalization: 1NF, 2NF, 3NF with examples
- ACID properties of transactions
- Difference between clustered and non-clustered indexes

### Operating Systems
- Process scheduling algorithms: FCFS, SJF, Round Robin
- Deadlock: conditions, prevention, detection
- Virtual memory and paging concepts
- Difference between process and thread

### Most Common TR Interview Questions
1. "Explain your final year project in 2 minutes"
2. "What is the difference between stack and heap memory?"
3. "Write a program to reverse a linked list"
4. "Explain the concept of normalization with an example"
5. "What is polymorphism? Give a real-life example"
6. "What are the four pillars of OOPs?"
7. "Explain what happens when you type a URL in a browser"

---

## 📅 30-Day Study Plan

| Week | Focus Area |
|---|---|
| Week 1 | Numerical Ability fundamentals + 20 LeetCode Easy problems |
| Week 2 | Verbal Ability + Reasoning + 20 more coding problems |
| Week 3 | Full mock tests (2 per day) + OOPs & DBMS revision |
| Week 4 | Weak area revision + 3 full-length NQT mock tests + HR prep |

---

## ⚠️ Common Mistakes to Avoid

1. **Ignoring sectional cutoffs** — Many students clear overall but fail one section
2. **Not practicing on a virtual calculator** — The on-screen calculator is slower than physical ones
3. **Spending too much time on one coding question** — If stuck, submit partial solution and move on
4. **Not reading the problem statement carefully** — Edge cases like empty arrays, negative numbers, and zero values are common traps
5. **Skipping the verbal section** — Many engineers underestimate this and fail to clear the sectional cutoff

---

## 💡 Insider Tips from Past Candidates

- The NQT adaptive algorithm may adjust question difficulty based on your responses in real-time for certain sections
- TCS NQT scores are shared with partner companies like TCS BPS, TCS iON — clearing NQT opens multiple doors
- For Digital track, aim to solve both coding questions fully with all test cases passing
- During TR, if you don''t know an answer, honestly say "I haven''t studied this in depth, but based on my understanding..." — panelists appreciate honesty over bluffing
- TCS has a **2-year bond of ₹50,000** for Ninja hires — understand this before signing

---

## 🔗 Useful Resources

- **TCS NextStep Portal:** nextstep.tcs.com (official registration)
- **TCS CodeVita Archives:** Previous year coding problems
- **PrepInsta TCS NQT Section:** Topic-wise practice questions
- **GeeksforGeeks TCS Interview Experiences:** Real candidate stories
- **LeetCode:** Practice Easy and Medium problems under "Top Interview Questions"
'
),
(
  2,
  'Infosys',
  '/assets/companies/infosys.png',
  'Medium',
  '{
    "examName": "Infosys Certified Suite (SP & DSE Exams)",
    "durationMinutes": 180,
    "sections": [
      { "name": "Hands-on Coding (3 Questions)", "questions": 3, "time": 180 }
    ],
    "negativeMarking": false,
    "passingCriteria": "Minimum 1 question fully solved recommended",
    "mode": "Online Proctored via HirePro / Infosys Platform",
    "tracks": ["Specialist Programmer (SP) - ₹9.5 LPA", "Digital Specialist Engineer (DSE) - ₹6.5 LPA", "Systems Engineer (SE) - ₹3.6 LPA"],
    "frequency": "Quarterly — check InfyTQ and Infosys Careers portal"
  }'::jsonb,
  ARRAY['Dynamic Programming', 'Graphs', 'Greedy', 'Trees', 'Backtracking'],
  '[
    { "title": "Valid Parentheses", "problemId": 2 },
    { "title": "Container With Most Water", "problemId": 5 }
  ]'::jsonb,
  '# Infosys Complete Hiring Guide (2024–25)

Infosys, India''s second-largest IT services company, is known for its **structured and merit-based** fresher hiring. With annual revenues exceeding $18 billion and a workforce of 300,000+, Infosys offers multiple entry-level tracks with significantly different compensation and career trajectories. This guide covers all tracks, the assessment structure, and a proven preparation roadmap.

---

## 🏢 Infosys Hiring Tracks — Know the Difference

| Track | Role | Package | Eligibility | Focus |
|---|---|---|---|---|
| Systems Engineer (SE) | Junior Developer | ₹3.6 LPA | 60%+ throughout, any branch | Basic coding, aptitude |
| Digital Specialist Engineer (DSE) | Mid-level Developer | ₹6.5 LPA | 65%+, CS/IT preferred | Intermediate DSA |
| Specialist Programmer (SP) | Senior Developer | ₹9.5 LPA | Top coders, competitive programmers | Advanced DSA + System Design |
| Power Programmer (PP) | Research/Product | ₹11 LPA+ | Exceptional candidates via referral/hackathon | Algorithms, research aptitude |

---

## 📋 Complete Hiring Process

### Phase 1 — InfyTQ Certification (for SE track)
For the Systems Engineer track, Infosys often requires candidates to complete **InfyTQ certification** (a free online learning platform by Infosys). Courses cover Python, Java, DBMS, and Agile. Certification is free and acts as a pre-qualification filter.

### Phase 2 — Online Coding Assessment
The core hiring filter. The assessment platform is typically **HirePro** or Infosys''s proprietary platform. The test is:
- **3 coding questions**
- **180 minutes total** (you manage your own time across questions)
- All questions are evaluated on automated test cases

### Phase 3 — Technical Interview
A 45–60 minute deep-dive interview:
- Discussion of your submitted code (be ready to explain your approach)
- 1–2 new coding problems solved live on a shared screen or whiteboard
- Questions on Data Structures, DBMS, OOPs, and Operating Systems
- Project walkthrough and technology questions

### Phase 4 — HR Interview
- Standard behavior and communication assessment
- Document verification
- Location preference discussion
- Bond and joining formalities

---

## 📊 Coding Assessment — Detailed Breakdown

The 3 questions are structured by difficulty with different scoring weights:

### Question 1 — Easy (50 Marks, ~30–40 minutes recommended)
**Topics:**
- Array manipulation (prefix sums, frequency arrays, sliding window basics)
- String operations (anagram, palindrome, character frequency)
- Basic greedy logic (minimum coins, activity selection)
- Simple mathematical problems (LCM, prime factorization, number properties)

**Example problems:**
- "Find the minimum number of jumps to reach the end of an array"
- "Check if a string can be rearranged to form a palindrome"
- "Find the equilibrium index of an array"
- "Count number of subarrays with given sum"

### Question 2 — Medium (75 Marks, ~50–60 minutes recommended)
**Topics:**
- Tree traversals (inorder, preorder, level-order) and properties
- Backtracking (permutations, combinations, N-queens, subset sum)
- Dynamic Programming (0/1 Knapsack, Longest Common Subsequence, coin change)
- Stack/Queue applications (balanced parentheses, next greater element, sliding window max)

**Example problems:**
- "Find the longest palindromic substring"
- "Print all permutations of a string"
- "Find the height of a binary tree and check if it''s balanced"
- "Solve the 0/1 Knapsack problem for given weights and values"

### Question 3 — Hard (100 Marks, ~60–70 minutes recommended)
**Topics:**
- Graph algorithms: BFS, DFS, Dijkstra''s shortest path, Floyd-Warshall, Topological Sort
- Advanced DP: Matrix chain multiplication, edit distance, DP on trees
- Segment trees or Binary Indexed Trees (Fenwick Trees)
- Advanced string algorithms: KMP, Z-algorithm, Trie operations

**Example problems:**
- "Find the shortest path between all pairs in a weighted graph"
- "Find the minimum cost to connect all cities (Minimum Spanning Tree)"
- "Given a grid, find the number of islands using Union-Find"
- "Implement a Trie and support insert, search, and startsWith operations"

---

## 💡 Partial Scoring — A Critical Strategy

Unlike TCS, **Infosys awards partial marks** based on how many test cases your solution passes. This means:

- A brute-force O(n³) solution that passes 6/10 test cases earns 60% marks on that question
- Always submit something — even a partially working solution
- Optimize only after your basic solution works

**Smart time management:**
1. Read all 3 problems first (5 minutes)
2. Solve Q1 completely — aim for 100% test cases (35 minutes)
3. Attempt Q2 — solve at least 60–70% of test cases (55 minutes)
4. Spend remaining time on Q3 — even a brute-force partial solution helps (85 minutes)

---

## 📚 Topic-Wise Preparation Roadmap

### Core Data Structures (Must Know)
**Arrays & Strings:**
- Two-pointer technique (pair sum, trapping rainwater, container with most water)
- Sliding window (maximum sum subarray of size K, longest substring without repeat)
- Prefix sum arrays for range query optimizations

**Linked Lists:**
- Reversal (iterative and recursive)
- Cycle detection (Floyd''s algorithm)
- Merge two sorted linked lists
- Find the middle element

**Stacks & Queues:**
- Implement stack using queues and vice versa
- Next greater/smaller element using monotonic stack
- Evaluate postfix expressions
- Sliding window maximum using deque

**Trees:**
- All traversals (DFS: inorder, preorder, postorder; BFS: level-order)
- Lowest Common Ancestor
- Diameter of binary tree
- Check balanced, symmetric, and identical trees
- Binary Search Tree operations and validation

**Graphs:**
- BFS and DFS traversal
- Shortest path: Dijkstra (weighted), BFS (unweighted)
- Cycle detection in directed and undirected graphs
- Topological sort (Kahn''s algorithm + DFS approach)
- Connected components and Union-Find

### Algorithms
**Dynamic Programming (High Priority for Infosys):**
- Fibonacci variations and memoization introduction
- 0/1 Knapsack and unbounded Knapsack
- Longest Common Subsequence and Longest Common Substring
- Longest Increasing Subsequence (O(n log n) approach)
- Matrix Chain Multiplication
- Coin Change (min coins and number of ways)
- Edit Distance (Levenshtein Distance)
- DP on grids (unique paths, minimum path sum)

**Backtracking:**
- Generate all subsets and permutations
- N-Queens problem
- Sudoku solver
- Word search on grid
- Combination sum variations

**Greedy:**
- Activity selection / interval scheduling
- Huffman encoding concept
- Fractional Knapsack
- Job sequencing with deadlines

---

## 🎯 Technical Interview Preparation

### Frequently Asked Coding Questions in TR
1. "Write a function to detect a cycle in a linked list"
2. "Explain your approach to the Q2 solution you submitted — can you optimize it?"
3. "Implement BFS/DFS on a given graph and trace through it"
4. "What is memoization vs tabulation? When would you use each?"
5. "Write SQL query to find the second highest salary in a table"
6. "Explain what a transaction is in DBMS and what ACID properties mean"

### OOPs Deep Dive (Infosys TR Focuses Heavily Here)
- **Inheritance vs Composition** — "Why prefer composition over inheritance?"
- **Abstract class vs Interface** — with code examples
- **Method overloading vs overriding** — runtime vs compile-time polymorphism
- **Design patterns mentioned:** Singleton, Factory, Observer (know at least Singleton implementation)

### DBMS Must-Know Topics
- Write JOINs: INNER, LEFT, RIGHT, FULL OUTER with examples
- Explain indexing and why it speeds up queries
- Normalization forms with examples (up to BCNF)
- Transaction isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable
- Write complex SQL: window functions, CTEs (Common Table Expressions)

---

## 📅 60-Day Preparation Plan

| Days | Focus |
|---|---|
| Days 1–10 | Arrays, Strings, Hashing — 3 problems/day on LeetCode |
| Days 11–20 | Stacks, Queues, Linked Lists — 3 problems/day |
| Days 11–20 | Stacks, Queues, Linked Lists — 3 problems/day |
| Days 21–30 | Trees and Binary Search Trees — 3 problems/day |
| Days 31–40 | Graphs: BFS, DFS, Shortest Path — 3 problems/day |
| Days 41–50 | Dynamic Programming — 2 problems/day (quality over quantity) |
| Days 51–55 | Backtracking and Greedy |
| Days 56–60 | Full mock assessments + Technical interview prep (OOPs, DBMS, OS) |

---

## 🔢 LeetCode Problem List (Infosys-Relevant)

**Easy (Warm-up):**
- Two Sum, Valid Parentheses, Merge Sorted Array, Best Time to Buy Stock, Climbing Stairs

**Medium (Core focus):**
- Longest Substring Without Repeating Characters, 3Sum, Coin Change, Word Break, Number of Islands, Course Schedule, Binary Tree Level Order Traversal, Kth Largest Element

**Hard (SP/PP track):**
- Edit Distance, Regular Expression Matching, Minimum Window Substring, Trapping Rain Water (O(n) approach), Serialize and Deserialize Binary Tree

---

## ⚠️ Common Mistakes to Avoid

1. **Not handling edge cases:** Empty arrays, single-element inputs, negative numbers, and overflow conditions
2. **Writing unreadable code:** Infosys TR panelists review your submitted code — use meaningful variable names
3. **Only knowing theory:** Be able to code everything you claim to know on the spot
4. **Ignoring partial scoring:** Many candidates skip Q3 entirely — even a 40% solution on Q3 can be the difference
5. **Not practicing SQL:** At least 30% of TRs include SQL queries — practice on HackerRank SQL section

---

## 💡 Tips from Past Infosys Candidates

- The coding platform supports most popular languages: Java, Python 3, C, C++, Scala, Go
- Python is recommended for SP candidates due to fast prototyping — but know the time limits (Python is often 3x slower)
- Infosys TR rounds are generally fair — panelists are mostly from Infosys Education & Research (IER) unit
- If you''ve completed **InfyTQ Python/Java certifications**, mention them — it positively influences SE track selection
- After clearing assessment, results typically arrive within 2–3 weeks via email

---

## 🔗 Useful Resources

- **InfyTQ Platform:** infytq.infosys.com (free courses and certifications)
- **Infosys Careers:** infosys.com/careers (official job portal)
- **HackerRank Infosys Practice:** infosys-specific practice sets
- **GeeksforGeeks:** Company-specific Infosys interview experiences
- **LeetCode:** Focus on Medium and Hard tagged Graph and DP problems
'
),
(
  3,
  'Wipro',
  '/assets/companies/wipro.png',
  'Easy',
  '{
    "examName": "Wipro Elite NTH (National Talent Hunt)",
    "durationMinutes": 128,
    "sections": [
      { "name": "Quantitative Aptitude", "questions": 16, "time": 16 },
      { "name": "Logical Ability", "questions": 14, "time": 14 },
      { "name": "Verbal Ability", "questions": 22, "time": 18 },
      { "name": "Write-up (Essay)", "questions": 1, "time": 20 },
      { "name": "Coding (2 Questions)", "questions": 2, "time": 60 }
    ],
    "negativeMarking": false,
    "tracks": ["Project Engineer - ₹3.5 LPA", "Wipro Elite - ₹6.5 LPA", "Wipro Turbo - ₹10 LPA"],
    "mode": "Online Proctored via AMCAT/Wipro Platform",
    "passingCriteria": "Sectional cutoffs + overall cutoff both apply"
  }'::jsonb,
  ARRAY['Aptitude', 'Essay Writing', 'Basic Loops', 'Searching', 'Sorting'],
  '[
    { "title": "Binary Search", "problemId": 4 },
    { "title": "Reverse String", "problemId": 3 }
  ]'::jsonb,
  '# Wipro Elite NTH Complete Preparation Guide (2024–25)

Wipro Limited, a global IT, consulting, and business process services company with revenues exceeding $11 billion, recruits freshers through the **Wipro Elite National Talent Hunt (NTH)**. The exam is considered one of the more beginner-friendly assessments in the IT industry, but careful preparation is still essential to clear sectional cutoffs and land the higher-paying Elite or Turbo tracks.

---

## 🏢 Wipro Hiring Tracks — Understand Your Target

| Track | Role | Package | Selection Criteria |
|---|---|---|---|
| Project Engineer | Junior Engineer | ₹3.5 LPA | Standard NTH performance |
| Wipro Elite | Software Engineer | ₹6.5 LPA | Strong coding + aptitude scores |
| Wipro Turbo | Senior Engineer | ₹10 LPA | Top coders, competitive programmers |

The track you land depends on your overall NTH performance, especially the coding section. Elite and Turbo tracks require significantly better coding performance than Project Engineer.

---

## 📋 Complete Hiring Process

### Round 1 — Wipro Elite NTH Online Assessment
The primary screening test conducted via the **AMCAT platform** or Wipro''s proprietary assessment system. Includes 5 subsections.

### Round 2 — Technical Interview (TR)
A 30–45 minute interview:
- Discussion on programming fundamentals (OOPs, DBMS basics)
- Simple to intermediate live coding problems
- Questions on your chosen programming language
- Final year project discussion

### Round 3 — HR Interview
- Standard cultural fit and motivation questions
- Relocation willingness (Wipro has offices in Bangalore, Hyderabad, Pune, Chennai, Kolkata, Noida)
- Service Agreement understanding (Wipro has a 15-month bond for freshers)
- Document verification and joining details

---

## 📊 Detailed Section-Wise Exam Pattern

### Section 1 — Quantitative Aptitude (16 Questions | 16 Minutes)
**1 minute per question — speed is everything here**

High-frequency topics:
- **Arithmetic:** Percentages, Profit & Loss, Simple & Compound Interest, Discount
- **Time & Work:** Pipes & Cisterns, Work efficiency problems
- **Time, Speed & Distance:** Relative speed, trains, boats
- **Number Systems:** HCF, LCM, Divisibility, Remainders
- **Data Interpretation:** Bar graphs, pie charts, tables (basic reading)

**Strategy:** Practice mental math shortcuts. Learn percentage shortcuts (e.g., 37.5% = 3/8), multiplication tricks, and approximation methods. Do not spend more than 60 seconds on any single question.

### Section 2 — Logical Ability (14 Questions | 14 Minutes)
**1 minute per question — pattern recognition key**

High-frequency topics:
- **Series:** Number series, letter series, mixed series
- **Analogies:** Word analogies, number analogies
- **Blood Relations:** Family tree problems with 3–4 generation chains
- **Direction Sense:** Multi-step navigation problems
- **Coding-Decoding:** Letter shift, symbol substitution, word coding
- **Syllogisms:** All/Some/No type logical deductions

**Strategy:** Logical ability is generally the easiest section for engineering students. Aim for 12+/14 correct here to compensate for harder aptitude questions.

### Section 3 — Verbal Ability (22 Questions | 18 Minutes)
**~50 seconds per question — vocabulary and grammar focus**

High-frequency topics:
- **Reading Comprehension (6–8 questions):** 2 passages with 3–4 questions each; typically 300–400 word passages
- **Fill in the Blanks (4–5 questions):** Vocabulary-based, prepositions, conjunctions
- **Sentence Correction (4–5 questions):** Identify grammatically incorrect parts
- **Para Jumbles (3–4 questions):** Arrange scrambled sentences into coherent paragraphs
- **Error Identification (3–4 questions):** Find the error in underlined parts of sentences

**Strategy:** Read English news daily for 2–3 weeks before the exam. For RC passages, read the questions first before the passage to identify what to focus on.

### Section 4 — Write-up / Essay (1 Question | 20 Minutes)
**Evaluated by an automated AI system (not human reviewers)**

The essay section tests:
- English writing proficiency (grammar, sentence structure)
- Vocabulary range and coherence
- Logical flow of arguments

**Common Essay Topics:**
- "Should social media be regulated by governments?"
- "Is technology making humans more isolated?"
- "Benefits and drawbacks of work from home culture"
- "Should college education be free in India?"
- "Climate change — who is responsible?"

**Essay Writing Formula for AI Evaluation:**
- **Structure:** Write 4 paragraphs (Introduction, Body Paragraph 1 - Pros, Body Paragraph 2 - Cons, Conclusion).
- **Word count:** Keep it between 250–350 words. The AI penalizes essays that are too short or long.
- **Vocabulary:** Use rich vocabulary words but ensure they are spelled correctly. Typographical errors drastically lower the score.

### Section 5 — Coding (2 Questions | 60 Minutes)
Tests basic algorithmic implementation skills.
* **Question 1 (Easy):** Arrays/Strings. Palindrome, anagram, element count.
* **Question 2 (Easy-Medium):** Matrix logic or sorting applications.

---

## 🎯 Technical Interview Preparation (TR)

### Core Questions
1. "Explain the differences between inheritance and polymorphism in C++/Java."
2. "What are primary keys, foreign keys, and unique keys in SQL?"
3. "Write a function to check if an array contains duplicate elements."
4. "Explain the difference between call by value and call by reference."

---

## 📅 30-Day Plan & Mock Schedule

* **Days 1–10:** Verbal and AMCAT logic practice sets.
* **Days 11–20:** High-frequency aptitude topics.
* **Days 21–25:** Simple array/string coding tasks.
* **Days 26–30:** Essay writing templates and full mocks.
'
),
(
  4,
  'Cognizant (CTS)',
  '/assets/companies/cognizant.png',
  'Easy to Medium',
  '{
    "examName": "Cognizant GenC / GenC Elevate Assessment",
    "durationMinutes": 120,
    "sections": [
      { "name": "Quantitative & Logical", "questions": 25, "time": 35 },
      { "name": "Debugging / Code Snippets", "questions": 7, "time": 20 },
      { "name": "Coding Tasks", "questions": 2, "time": 65 }
    ],
    "negativeMarking": false,
    "passingCriteria": "Debugging round must be cleared to unlock Elevate coding",
    "mode": "Online Proctored via Mettl Platform",
    "tracks": ["GenC (Support/Testing) - ₹4.0 LPA", "GenC Elevate (Developer) - ₹4.5 LPA", "GenC Next (Advanced Dev) - ₹6.75 LPA"]
  }'::jsonb,
  ARRAY['Reasoning', 'Debugging', 'Recursion', 'Hashing', 'Strings'],
  '[
    { "title": "Two Sum", "problemId": 1 },
    { "title": "Valid Parentheses", "problemId": 2 }
  ]'::jsonb,
  '# Cognizant GenC & Elevate Complete Preparation Guide (2024–25)

Cognizant Technology Solutions recruits engineering freshers for three main pathways: **GenC**, **GenC Elevate**, and **GenC Next**. While the GenC assessment focuses heavily on aptitude, clearing the debugging and coding assessments is required to qualify for the higher developer tracks.

---

## 📋 Recruitment Pathway Details

1. **Online Diagnostic Assessment (Mettl Platform):** Sectional tests containing Quantitative Aptitude, Debugging (Code correction), and Coding tasks.
2. **Technical Discussion:** Core project review, SQL queries, OOPs definitions, and live debugging or code adjustments.
3. **HR Discussion:** Documents verification and relocate confirmation.

---

## 📊 Debugging & Coding Sections Breakdown

### Debugging Section (7 Questions | 20 Minutes)
You are given a logical code block in C, C++, or Java that compiles but yields incorrect outputs due to:
- Off-by-one errors in loop boundaries (`i <= length` instead of `i < length`).
- Incorrect operators (`+` instead of `-`, or `&&` instead of `||`).
- Missing termination criteria in recursive functions.

### Coding Section (2 Questions | 65 Minutes)
- **Question 1:** Simple data manipulation (sorting, filtering arrays).
- **Question 2:** Intermediate logic involving string manipulation or hashing dictionary collections.

---

## 🎯 Technical Interview Prep (TR)
1. "Explain normal forms in SQL databases."
2. "What are ACID properties? Detail Atomicity and Consistency."
3. "Explain the differences between method overriding and method overloading."
4. "Debug this live code snippet containing a recursive function call."
'
),
(
  5,
  'Accenture',
  '/assets/companies/accenture.png',
  'Easy to Medium',
  '{
    "examName": "Accenture ASE & FSE Recruitment Test",
    "durationMinutes": 135,
    "sections": [
      { "name": "Cognitive and Technical", "questions": 90, "time": 90 },
      { "name": "Coding (2 Questions)", "questions": 2, "time": 45 },
      { "name": "Communication Assessment", "questions": 6, "time": 20 }
    ],
    "negativeMarking": false,
    "passingCriteria": "Cognitive clearance is mandatory to unlock Coding round",
    "mode": "Online Proctored via CoCubes Platform",
    "tracks": ["Associate Software Engineer (ASE) - ₹4.5 LPA", "Advanced Associate Software Engineer (FSE) - ₹6.5 LPA"]
  }'::jsonb,
  ARRAY['Cognitive Ability', 'MS Office', 'Networking', 'Coding', 'English Communication'],
  '[
    { "title": "Binary Search", "problemId": 4 },
    { "title": "Container With Most Water", "problemId": 5 }
  ]'::jsonb,
  '# Accenture ASE & FSE Complete Preparation Strategy

Accenture hires freshers through a multi-stage placement process managed on the **CoCubes assessment platform**. It is designed to evaluate both cognitive and technical proficiency.

---

## 📋 Recruitment Process Flow

1. **Stage 1 (Cognitive & Technical):** 90 questions on cognitive ability and fundamental IT topics. Clearing the cutoff immediately unlocks the Coding section.
2. **Stage 2 (Coding):** 2 coding questions to be solved in 45 minutes.
3. **Stage 3 (Communication):** Speaking, reading, and listening test.
4. **Stage 4 (Interview):** Technical and behavioral questions combined.

---

## 📊 Cognitive and Technical Syllabus Details

* **MS Office & Outlook:** Focus on MS Excel formulas (VLOOKUP, SUMIF), keyboard shortcuts, and email configurations.
* **Networking & Security:** Basic network components, firewalls, protocols (HTTP, TCP/IP, DNS), and IP addressing schemas.
* **Pseudocode:** Evaluating final values of variables from loop blocks and conditional branches.

---

## 🎯 Technical Interview Prep (TR)
1. "Explain your final year project architecture."
2. "What is the difference between TCP and UDP protocols?"
3. "Write an SQL query to perform a LEFT OUTER JOIN between two tables."
4. "How do you handle a scenario where a client raises an urgent issue close to a release?"
'
)
ON CONFLICT (id) DO UPDATE SET 
  company_name = EXCLUDED.company_name,
  logo_url = EXCLUDED.logo_url,
  difficulty = EXCLUDED.difficulty,
  exam_pattern = EXCLUDED.exam_pattern,
  question_types = EXCLUDED.question_types,
  common_questions = EXCLUDED.common_questions,
  article_content = EXCLUDED.article_content;
