-- Seed problems data
INSERT INTO problems (id, title, difficulty, acceptance, solved_count, companies, tags, description, examples, constraints, templates)
VALUES 
(
  1,
  'Two Sum',
  'Easy',
  '49.2%',
  1542030,
  ARRAY['Google', 'Amazon', 'Meta', 'Apple', 'Microsoft'],
  ARRAY['Arrays', 'Hash Table'],
  'Given an array of integers `nums` and an integer `target`, return *indices of the two numbers such that they add up to `target`*.

You may assume that each input would have ***exactly* one solution**, and you may not use the *same* element twice.

You can return the answer in any order.',
  '[
    {
      "input": "nums = [2,7,11,15], target = 9",
      "output": "[0,1]",
      "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
    },
    {
      "input": "nums = [3,2,4], target = 6",
      "output": "[1,2]",
      "explanation": "Because nums[1] + nums[2] == 6, we return [1, 2]."
    }
  ]'::jsonb,
  ARRAY[
    '2 <= nums.length <= 10^4',
    '-10^9 <= nums[i] <= 10^9',
    '-10^9 <= target <= 10^9',
    'Only one valid answer exists.'
  ],
  '{
    "javascript": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    // Write your code here\n    \n};",
    "python": "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Write your code here\n        pass",
    "cpp": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your code here\n        \n    }\n};",
    "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[0];\n    }\n}"
  }'::jsonb
),
(
  2,
  'Valid Parentheses',
  'Easy',
  '41.0%',
  987654,
  ARRAY['Microsoft', 'Google', 'Meta', 'Uber'],
  ARRAY['Strings', 'Stack'],
  'Given a string `s` containing just the characters `''('', '')'', ''{'', ''}'', ''[''` and `]'', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.',
  '[
    {
      "input": "s = \"()\"",
      "output": "true"
    },
    {
      "input": "s = \"()[]{}\"",
      "output": "true"
    },
    {
      "input": "s = \"(]\"",
      "output": "false"
    }
  ]'::jsonb,
  ARRAY[
    '1 <= s.length <= 10^4',
    's consists of parentheses only ''()[]{}''.'
  ],
  '{
    "javascript": "/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    // Write your code here\n    \n};",
    "python": "class Solution:\n    def isValid(self, s: str) -> bool:\n        # Write your code here\n        pass",
    "cpp": "class Solution {\npublic:\n    bool isValid(string s) {\n        // Write your code here\n        \n    }\n};",
    "java": "class Solution {\n    public boolean isValid(String s) {\n        // Write your code here\n        return false;\n    }\n}"
  }'::jsonb
),
(
  3,
  'Reverse String',
  'Easy',
  '75.4%',
  654321,
  ARRAY['Apple', 'Amazon', 'Adobe'],
  ARRAY['Strings', 'Two Pointers'],
  'Write a function that reverses a string. The input string is given as an array of characters `s`.

You must do this by modifying the input array in-place with `O(1)` extra memory.',
  '[
    {
      "input": "s = [\"h\",\"e\",\"l\",\"l\",\"o\"]",
      "output": "[\"o\",\"l\",\"l\",\"e\",\"h\"]"
    },
    {
      "input": "s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]",
      "output": "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]"
    }
  ]'::jsonb,
  ARRAY[
    '1 <= s.length <= 10^5',
    's[i] is a printable ascii character.'
  ],
  '{
    "javascript": "/**\n * @param {character[]} s\n * @return {void} Do not return anything, modify s in-place instead.\n */\nvar reverseString = function(s) {\n    // Write your code here\n    \n};",
    "python": "class Solution:\n    def reverseString(self, s: List[str]) -> None:\n        # Do not return anything, modify s in-place instead.\n        pass",
    "cpp": "class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        // Write your code here\n        \n    }\n};",
    "java": "class Solution {\n    public void reverseString(char[] s) {\n        // Write your code here\n    }\n}"
  }'::jsonb
),
(
  4,
  'Binary Search',
  'Easy',
  '56.2%',
  432109,
  ARRAY['Google', 'Microsoft', 'Uber'],
  ARRAY['Arrays', 'Binary Search'],
  'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.

You must write an algorithm with `O(log n)` runtime complexity.',
  '[
    {
      "input": "nums = [-1,0,3,5,9,12], target = 9",
      "output": "4",
      "explanation": "9 exists in nums and its index is 4"
    },
    {
      "input": "nums = [-1,0,3,5,9,12], target = 2",
      "output": "-1",
      "explanation": "2 does not exist in nums so return -1"
    }
  ]'::jsonb,
  ARRAY[
    '1 <= nums.length <= 10^4',
    '-10^4 < nums[i], target < 10^4',
    'All the integers in nums are unique.',
    'nums is sorted in ascending order.'
  ],
  '{
    "javascript": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar search = function(nums, target) {\n    // Write your code here\n    \n};",
    "python": "class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        # Write your code here\n        pass",
    "cpp": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // Write your code here\n        \n    }\n};",
    "java": "class Solution {\n    public int search(int[] nums, int target) {\n        // Write your code here\n        return -1;\n    }\n}"
  }'::jsonb
),
(
  5,
  'Container With Most Water',
  'Medium',
  '54.1%',
  789012,
  ARRAY['Google', 'Meta', 'Amazon', 'Stripe'],
  ARRAY['Arrays', 'Two Pointers'],
  'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `ith` line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return *the maximum amount of water a container can store*.

**Notice** that you may not slant the container.',
  '[
    {
      "input": "height = [1,8,6,2,5,4,8,3,7]",
      "output": "49",
      "explanation": "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49."
    },
    {
      "input": "height = [1,1]",
      "output": "1"
    }
  ]'::jsonb,
  ARRAY[
    'n == height.length',
    '2 <= n <= 10^5',
    '0 <= height[i] <= 10^4'
  ],
  '{
    "javascript": "/**\n * @param {number[]} height\n * @return {number}\n */\nvar maxArea = function(height) {\n    // Write your code here\n    \n};",
    "python": "class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        # Write your code here\n        pass",
    "cpp": "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        // Write your code here\n        \n    }\n};",
    "java": "class Solution {\n    public int maxArea(int[] height) {\n        // Write your code here\n        return 0;\n    }\n}"
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  difficulty = EXCLUDED.difficulty,
  acceptance = EXCLUDED.acceptance,
  solved_count = EXCLUDED.solved_count,
  companies = EXCLUDED.companies,
  tags = EXCLUDED.tags,
  description = EXCLUDED.description,
  examples = EXCLUDED.examples,
  constraints = EXCLUDED.constraints,
  templates = EXCLUDED.templates;
