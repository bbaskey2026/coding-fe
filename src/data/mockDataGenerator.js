// CodeForge Mock Data Generator
// Programmatically generates rich, connected datasets of 1000 problems, 500 users, 100 companies, and 100 contests

const COMPANIES = [
  "Google", "Meta", "Stripe", "Netflix", "Amazon", "Apple", "Microsoft", "Uber", "Adobe", "Flipkart",
  "Goldman Sachs", "Airbnb", "ByteDance", "Spotify", "Twitter", "Tesla", "Nvidia", "Salesforce", "Atlassian",
  "Zoom", "Coinbase", "Dropbox", "Lyft", "Pinterest", "Robinhood", "Slack", "Snap", "Square", "Twilio",
  "TikTok", "Intuit", "Paypal", "Oracle", "Cisco", "IBM", "Intel", "AMD", "Qualcomm", "Dell", "HP",
  "VMware", "ServiceNow", "Workday", "Splunk", "Palantir", "Datadog", "Snowflake", "Cloudflare", "Fastly",
  "Okta", "Twitch", "Reddit", "LinkedIn", "Github", "Gitlab", "Figma", "Canva", "Notion", "Slack",
  "Zoom", "Shopify", "Hubspot", "DocuSign", "Box", "Asana", "Jira", "Confluence", "Trello", "Bitbucket",
  "Heroku", "Vercel", "Netlify", "DigitalOcean", "AWS", "Azure", "GCP", "Firebase", "Supabase", "MongoDB",
  "Redis", "Elasticsearch", "Postgres", "MySQL", "SQLite", "Docker", "Kubernetes", "RedHat", "Ubuntu",
  "Suse", "Alpine", "Debian", "Fedora", "CentOS", "Arch", "Gentoo", "Slackware", "FreeBSD", "OpenBSD"
];

const TOPICS = [
  "Arrays", "Strings", "DP", "Trees", "Graphs", "Greedy", "Trie", "Heap", "Binary Search", 
  "Math", "Hash Table", "Sliding Window", "Two Pointers", "DFS", "BFS", "Backtracking", "Recursion", "Design"
];

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const USER_ROLES = ["user", "moderator", "admin"];

const BADGES = [
  { id: "streak_7", name: "7 Day Streak", icon: "🔥", color: "from-amber-400 to-orange-500", desc: "Coded for 7 consecutive days" },
  { id: "streak_30", name: "30 Day Streak", icon: "⚡", color: "from-red-500 to-pink-500", desc: "Coded for 30 consecutive days" },
  { id: "contest_winner", name: "Contest Champion", icon: "🏆", color: "from-yellow-400 to-amber-600", desc: "Ranked 1st in a Weekly Contest" },
  { id: "dp_expert", name: "DP Wizard", icon: "🔮", color: "from-purple-500 to-indigo-600", desc: "Solved 50+ Dynamic Programming problems" },
  { id: "bug_hunter", name: "Bug Hunter", icon: "🐞", color: "from-emerald-400 to-teal-500", desc: "Reported an editor bug or solved a Hard problem in 1 attempt" },
  { id: "helper", name: "Community Star", icon: "🌟", color: "from-blue-400 to-indigo-500", desc: "Received 100+ likes on discussion comments" }
];

const ACHIEVEMENTS = [
  { id: "first_solve", name: "Hello World", desc: "Successfully submitted your first correct solution", unlocked: true },
  { id: "medium_50", name: "Rising Star", desc: "Solved 50 Medium problems", unlocked: false },
  { id: "hard_10", name: "Heavy Weight", desc: "Solved 10 Hard problems", unlocked: false },
  { id: "contest_participation", name: "Gladiator", desc: "Participate in your first live coding contest", unlocked: false },
  { id: "streak_100", name: "Unstoppable", desc: "Maintain a 100-day active streak", unlocked: false }
];

// Explicit high-fidelity problems (Showcase problems)
const SHOWCASE_PROBLEMS = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    acceptance: "49.2%",
    solvedCount: 1542030,
    companies: ["Google", "Amazon", "Meta", "Apple", "Microsoft"],
    tags: ["Arrays", "Hash Table"],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have ***exactly* one solution**, and you may not use the *same* element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    templates: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your code here
    
};`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        pass`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        
    }
};`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[0];
    }
}`
    },
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be O(N^2). Is there a way to do it faster?",
      "Try using extra space to store the numbers we've seen so far. A hash map is perfect for lookup in O(1) time."
    ],
    editorial: `### Approach: One-pass Hash Map

We can reduce the lookup time from $O(N)$ to $O(1)$ by trading space for speed. A hash map is the most efficient way to control lookups.

While we are iterating and inserting elements into the table, we also look back to check if the current element's complement already exists in the table. If it exists, we have found a solution and return the indices immediately.

\`\`\`javascript
var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
};
\`\`\`

**Complexity Analysis**
- **Time Complexity:** $O(N)$. We traverse the list containing $N$ elements only once.
- **Space Complexity:** $O(N)$. The extra space required depends on the number of items stored in the hash map.`,
    discussions: [
      { id: 101, username: "algo_champion", avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=champion", text: "Classic question! The hashmap approach is super clean.", likes: 45, date: "2 days ago" },
      { id: 102, username: "newbie_coder", avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=newbie", text: "Can we do this in O(1) space if the array is sorted? Yes, two pointers!", likes: 12, date: "1 day ago" }
    ]
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    acceptance: "33.8%",
    solvedCount: 890452,
    companies: ["Google", "Meta", "Netflix", "Uber", "Amazon"],
    tags: ["Strings", "Sliding Window", "Hash Table"],
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: "1", explanation: 'The answer is "b", with the length of 1.' }
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    templates: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    
};`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        pass`
    },
    hints: [
      "Think about sliding window. Maintain window left and right boundary.",
      "Use hash map or set to check if character exists in the current window."
    ],
    editorial: `### Sliding Window Approach

We use a sliding window defined by \`left\` and \`right\` pointers. We slide \`right\` and if the character is already in the map, we shrink the window from the left.

\`\`\`python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_map = {}
        left = 0
        max_len = 0
        for right, char in enumerate(s):
            if char in char_map and char_map[char] >= left:
                left = char_map[char] + 1
            char_map[char] = right
            max_len = max(max_len, right - left + 1)
        return max_len
\`\`\`

**Complexity**
- **Time Complexity:** $O(N)$
- **Space Complexity:** $O(min(A, N))$ where $A$ is size of charset.`,
    discussions: [
      { id: 103, username: "stripe_architect", avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=stripe", text: "Sliding window is an essential pattern for interviews.", likes: 89, date: "1 week ago" }
    ]
  },
  {
    id: 3,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    acceptance: "35.5%",
    solvedCount: 310243,
    companies: ["Google", "Microsoft", "Goldman Sachs", "Apple"],
    tags: ["Arrays", "Binary Search"],
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return **the median** of the two sorted arrays.

The overall run time complexity should be \`O(log (m+n))\`.`,
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000", explanation: "merged array = [1,2,3] and median is 2." },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.50000", explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5." }
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m, n <= 1000",
      "1 <= m + n <= 2000"
    ],
    templates: {
      javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    
};`
    },
    hints: [
      "To solve in O(log(m+n)), you must use binary search to partition the two arrays simultaneously."
    ],
    editorial: `### Binary Search on Partitioning

We partition the smaller array such that elements on the left side of partition are smaller than elements on the right side.

**Complexity**
- **Time Complexity:** $O(log(min(M, N)))$
- **Space Complexity:** $O(1)$`,
    discussions: []
  }
];

// Helper to generate a random element
const randomEl = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomSubset = (arr, size) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
};

export const generateMockData = () => {
  const data = {
    companies: [],
    problems: [],
    users: [],
    contests: [],
    studyPlans: [],
    forumPosts: [],
    interviewExperiences: [],
    userProfile: {}
  };

  // 1. Generate 100 Companies
  COMPANIES.forEach((name, index) => {
    data.companies.push({
      id: index + 1,
      name,
      logo: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
      activeQuestions: randomRange(5, 120),
      difficultyDistribution: {
        easy: randomRange(10, 40),
        medium: randomRange(20, 60),
        hard: randomRange(5, 20)
      }
    });
  });

  // 2. Generate 500 Users
  const topUsernames = ["tourist", "neal_wu", "ecnerwala", "benq", "kamyu", "gawry", "chokudai", "errichto", "radewoosh", "um_nik"];
  for (let i = 1; i <= 500; i++) {
    const isTop = i <= topUsernames.length;
    const username = isTop ? topUsernames[i - 1] : `coder_${randomRange(1000, 99999)}`;
    const rating = isTop ? randomRange(2800, 3700) : randomRange(1000, 2600);
    const solved = isTop ? randomRange(400, 950) : randomRange(10, 390);
    const streak = isTop ? randomRange(100, 500) : (Math.random() > 0.3 ? randomRange(0, 80) : 0);
    const role = i === 1 ? "admin" : (i <= 5 ? "moderator" : "user");
    const userBadges = randomSubset(BADGES, randomRange(1, 4));

    // Generate contribution calendar heatmap array: 365 values
    const contributionData = [];
    for (let d = 0; d < 365; d++) {
      contributionData.push(Math.random() > 0.4 ? randomRange(1, 8) : 0);
    }

    data.users.push({
      id: i,
      username,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      rating,
      solvedCount: solved,
      streak,
      role,
      badges: userBadges,
      achievements: ACHIEVEMENTS.map(a => ({ ...a, unlocked: Math.random() > 0.4 })),
      rank: 0, // Assigned later by sorting
      heatmap: contributionData,
      solvedProblemsList: [] // list of problem IDs
    });
  }

  // Sort users by rating to assign ranks
  data.users.sort((a, b) => b.rating - a.rating);
  data.users.forEach((u, index) => {
    u.rank = index + 1;
  });

  // Pick User with ID 150 as the current logged in user profile (for editing state)
  const currentMockUser = data.users[149]; // standard user
  currentMockUser.username = "CodeForge_Elite";
  currentMockUser.avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=CodeForge_Elite";
  currentMockUser.rating = 1850;
  currentMockUser.streak = 24;
  currentMockUser.solvedCount = 84;
  currentMockUser.badges = [BADGES[0], BADGES[3]];
  currentMockUser.achievements = ACHIEVEMENTS.map((a, idx) => ({ ...a, unlocked: idx < 3 }));
  
  // Seed custom solved problem list for user (first 2 showcase problems are solved, 3rd is attempted)
  currentMockUser.solvedProblemsList = [1, 2];
  currentMockUser.attemptedProblemsList = [3];
  data.userProfile = currentMockUser;

  // 3. Generate 1000 Problems
  // Seed the showcase problems first
  SHOWCASE_PROBLEMS.forEach(p => {
    data.problems.push(p);
  });

  const problemNouns = ["Matrix", "Graph", "Binary Tree", "List", "Palindromic Path", "Subarray", "K-th Element", "Subsequence", "Anagram", "Stack Cache", "Knapsack", "Shortest Route", "Interval Range", "Binary Search Tree", "Permutations", "Combinations", "IP Address", "Word Search", "LRU Cache", "Edit Distance"];
  const problemVerbs = ["Find", "Search", "Optimize", "Reconstruct", "Sort", "Merge", "Evaluate", "Reverse", "Compute", "Maximize", "Minimize", "Validate", "Count", "Rotate", "Invert", "Flatten", "Clone", "Serialize", "Detect Cycle In"];

  for (let i = data.problems.length + 1; i <= 1000; i++) {
    const topic = randomEl(TOPICS);
    const difficulty = randomEl(DIFFICULTIES);
    const pNoun = randomEl(problemNouns);
    const pVerb = randomEl(problemVerbs);
    const title = `${pVerb} ${pNoun} ${topic === "Math" || topic === "Design" ? "Structure" : "with " + topic}`;
    
    // Acceptance rate
    let acc = 0;
    if (difficulty === "Easy") acc = randomRange(60, 85);
    else if (difficulty === "Medium") acc = randomRange(35, 59);
    else acc = randomRange(10, 34);

    const acceptance = `${acc}.${randomRange(0, 9)}%`;
    const solvedCount = randomRange(100, 250000);
    const companiesAssigned = randomSubset(COMPANIES, randomRange(1, 5));
    const problemTags = Array.from(new Set([topic, randomEl(TOPICS)]));

    data.problems.push({
      id: i,
      title,
      difficulty,
      acceptance,
      solvedCount,
      companies: companiesAssigned,
      tags: problemTags,
      description: `### Problem Description

Given a configuration of a \`${pNoun}\` system, perform the operation to **${pVerb.toLowerCase()}** it based on the constraints of **${topic}**.

Write an optimized function to return the resulting structure or evaluation output.

### Examples

**Example 1:**
- **Input:** \`data = [${randomSubset([1,2,3,4,5,6], 4).join(', ')}]\`
- **Output:** \`result = true\`

**Example 2:**
- **Input:** \`data = [${randomSubset([10,20,30,40], 3).join(', ')}]\`
- **Output:** \`result = false\``,
      examples: [
        { input: "data = [1, 2, 3]", output: "true", explanation: "Meets topic rules." }
      ],
      constraints: [
        "Size of input sequence is up to 10^5",
        "Values are within [-10^6, 10^6]"
      ],
      templates: {
        javascript: `/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Code here\n}`,
        python: `def solve(input):\n    # Code here\n    pass`
      },
      hints: [
        "Break the problem down into standard operations on this data structure.",
        `Apply ${topic} techniques to solve in optimal time.`
      ],
      editorial: `### Solution Analysis\n\nWe can iterate and check with standard algorithms.\nTime Complexity: $O(N)$\nSpace Complexity: $O(1)$`,
      discussions: [
        { id: i * 10, username: "dev_guy", avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=dev", text: "Nice problem to practice!", likes: randomRange(0, 10), date: "3 days ago" }
      ]
    });
  }

  // 4. Generate 100 Contests
  const contestNames = ["Weekly Contest", "Biweekly Contest", "CodeForge Sprint", "Monthly Marathon"];
  for (let i = 1; i <= 100; i++) {
    const cType = randomEl(contestNames);
    const isLive = i === 100; // Let's make the 100th contest live right now
    const isUpcoming = i >= 95 && i < 100;
    const isPast = i < 95;

    let status = "past";
    let startTime, endTime;
    
    if (isLive) {
      status = "live";
      startTime = new Date(Date.now() - 3600000).toISOString(); // started 1 hour ago
      endTime = new Date(Date.now() + 5400000).toISOString();  // ends in 1.5 hours
    } else if (isUpcoming) {
      status = "upcoming";
      const hoursAhead = (i - 94) * 24; // spread over upcoming days
      startTime = new Date(Date.now() + hoursAhead * 3600000).toISOString();
      endTime = new Date(Date.now() + (hoursAhead + 3) * 3600000).toISOString();
    } else {
      status = "past";
      const daysAgo = (95 - i) * 7;
      startTime = new Date(Date.now() - daysAgo * 24 * 3600000).toISOString();
      endTime = new Date(Date.now() - (daysAgo * 24 - 3) * 3600000).toISOString();
    }

    data.contests.push({
      id: i,
      title: `${cType} ${i}`,
      status,
      startTime,
      endTime,
      participants: isPast ? randomRange(2000, 12000) : randomRange(100, 1500),
      durationMinutes: 180,
      problems: [
        { id: randomRange(10, 50), points: 100 },
        { id: randomRange(51, 100), points: 200 },
        { id: randomRange(101, 150), points: 300 },
        { id: randomRange(151, 200), points: 400 }
      ],
      leaderboard: data.users.slice(0, 20).map((u, rankIdx) => ({
        rank: rankIdx + 1,
        username: u.username,
        avatar: u.avatar,
        score: 1000 - rankIdx * 35,
        timeSolved: `${randomRange(30, 150)}m`
      }))
    });
  }

  // Sort contests so live and upcoming are featured
  data.contests.sort((a, b) => b.id - a.id);

  // 5. Generate Study Plans / Roadmaps
  data.studyPlans = [
    {
      id: "interview_150",
      title: "Top 150 Interview Questions",
      description: "Ace your coding interviews with a curated list of the most frequent coding questions.",
      banner: "from-blue-600 to-indigo-600",
      completed: 12,
      total: 150,
      modules: [
        {
          name: "Array / String Basics",
          problems: [1, 2, 4, 15, 23, 45, 90]
        },
        {
          name: "Two Pointers & Sliding Window",
          problems: [2, 10, 25, 44, 76]
        },
        {
          name: "Dynamic Programming Foundations",
          problems: [8, 12, 19, 33, 56, 88]
        }
      ]
    },
    {
      id: "dp_wizardry",
      title: "Dynamic Programming Decoded",
      description: "From recursion and memoization to bottom-up tabular optimization techniques.",
      banner: "from-purple-600 to-pink-600",
      completed: 0,
      total: 50,
      modules: [
        {
          name: "1D DP Exercises",
          problems: [12, 54, 102, 142]
        },
        {
          name: "Knapsack Variants",
          problems: [65, 87, 192, 234]
        },
        {
          name: "DP on Trees and Graphs",
          problems: [321, 412, 550, 712]
        }
      ]
    },
    {
      id: "graph_hero",
      title: "From Zero to Graph Hero",
      description: "Master DFS, BFS, Dijkstra, Prim, Kruskal, and advanced graph network connectivity algorithms.",
      banner: "from-emerald-600 to-teal-600",
      completed: 2,
      total: 75,
      modules: [
        {
          name: "Graph Traversals (DFS/BFS)",
          problems: [22, 53, 91, 105]
        },
        {
          name: "Shortest Paths & Spanning Trees",
          problems: [145, 203, 310]
        }
      ]
    }
  ];

  // 6. Generate Forum Discussions
  const forumTopics = [
    { title: "Tips to stay motivated for Leetcode?", category: "General", upvotes: 124, replies: 42, author: "tourist" },
    { title: "Meta interview loop experience E5 (Silicon Valley)", category: "Career", upvotes: 98, replies: 19, author: "neal_wu" },
    { title: "Dynamic Programming patterns that you must know", category: "Tutorials", upvotes: 341, replies: 56, author: "ecnerwala" },
    { title: "Google L4 Offer details (G3 vs G4 levels)", category: "Career", upvotes: 62, replies: 11, author: "benq" },
    { title: "Weekly Contest 405 Discussion thread", category: "Feedback", upvotes: 45, replies: 120, author: "admin" }
  ];

  forumTopics.forEach((ft, index) => {
    data.forumPosts.push({
      id: index + 1,
      title: ft.title,
      category: ft.category,
      upvotes: ft.upvotes,
      repliesCount: ft.replies,
      author: ft.author,
      authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${ft.author}`,
      date: "3 days ago",
      comments: [
        {
          id: index * 10 + 1,
          author: "code_wizard",
          avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=code_wizard",
          text: "Excellent writeup! Saved this immediately.",
          upvotes: 24,
          replies: []
        },
        {
          id: index * 10 + 2,
          author: "dev_master",
          avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=dev_master",
          text: "I agree, especially points 3 and 5 are lifesavers.",
          upvotes: 12,
          replies: []
        }
      ]
    });
  });

  // 7. Generate Interview Experiences
  const targetCompanies = ["Google", "Amazon", "Meta", "Netflix", "Microsoft", "Stripe", "Uber", "Apple"];
  targetCompanies.forEach((comp, index) => {
    data.interviewExperiences.push({
      id: index + 1,
      company: comp,
      role: index % 2 === 0 ? "Senior Software Engineer" : "Frontend Engineer",
      difficulty: randomEl(DIFFICULTIES),
      date: "July 2026",
      verdict: index % 3 === 0 ? "Accepted" : (index % 3 === 1 ? "Rejected" : "No Offer"),
      title: `${comp} Interview Experience (${index % 2 === 0 ? "SSE" : "Frontend"})`,
      summary: `Detailed breakdown of the 5 interview rounds at ${comp} including coding, system design, and behavioral.`,
      content: `### Round 1: Coding (45 min)
The question was similar to **Two Sum** but with extra constraints. I solved it using a Map and optimized it to O(N) time and O(N) space.

### Round 2: Architecture / System Design (60 min)
Designed a high-throughput notifications delivery service like WhatsApp. Addressed scalability, latency, database selection, and message brokers (Kafka).

### Round 3: Behavioral (45 min)
Standard questions on resolving team conflicts, project deadlines, and explaining complex architectural changes to non-technical stakeholders.

### Verdict
Highly professional process. Compensation negotiations were smooth.`,
      tags: ["System Design", "Coding", "Behavioral"]
    });
  });

  return data;
};
