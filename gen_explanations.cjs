const fs = require('fs');
const path = require('path');

const raw = fs.readFileSync('AlgoVisualizer-main/src/components/dsaaltair.json', 'utf8');

// Extract all JSON arrays using a more robust approach
const arrays = [];
let depth = 0;
let start = -1;
let inString = false;
let escape = false;

for (let i = 0; i < raw.length; i++) {
  const c = raw[i];
  if (escape) { escape = false; continue; }
  if (c === '\\' && inString) { escape = true; continue; }
  if (c === '"') { inString = !inString; continue; }
  if (inString) continue;
  
  if (c === '[') {
    if (depth === 0) start = i;
    depth++;
  } else if (c === ']') {
    depth--;
    if (depth === 0 && start !== -1) {
      try {
        const arr = JSON.parse(raw.slice(start, i + 1));
        if (Array.isArray(arr) && arr.length > 0 && arr[0].crux) {
          arrays.push(...arr);
        }
      } catch(e) {}
      start = -1;
    }
  }
}

console.log('Total problems:', arrays.length);

// Map problem names to IDs
const nameToId = {
  'Find the Union of Two Sorted Arrays': 'find-union',
  'Sort Array of 0s, 1s and 2s (DNF)': 'sort-012',
  '3Sum Problem': 'three-sum',
  '4Sum Problem': 'four-sum',
  'Merge Two Sorted Arrays': 'merge-sorted-arrays',
  'Max Consecutive Ones': 'max-consecutive-ones',
  'Longest Subarray with Sum K (Positives)': 'longest-subarray-sum-k-pos',
  'Find Number That Appears Once': 'find-number-once',
  'Longest Subarray with Sum K (+/-)': 'longest-subarray-sum-k-neg',
  'Longest Consecutive Sequence': 'longest-consecutive',
  'Count Subarrays with Given Sum': 'count-subarrays-sum',
  'Largest Subarray with 0 Sum': 'largest-subarray-zero-sum',
  'Count Subarrays with Given XOR K': 'count-subarrays-xor',
  'Repeating and Missing Number': 'repeating-missing',
  'Majority Element (>n/2)': 'majority-element-n2',
  'Majority Element (>n/3)': 'majority-element-n3',
  'Next Permutation': 'next-permutation',
  'Leaders in an Array': 'leaders-array',
  'Count Inversions': 'count-inversions',
  'Reverse Pairs': 'reverse-pairs',
  'Max Product Subarray': 'max-product-subarray',
  'Set Matrix Zeros': 'set-matrix-zeros',
  'Rotate Matrix 90 Degrees': 'rotate-matrix-90',
  'Print Matrix in Spiral Manner': 'spiral-matrix',
  "Pascal's Triangle": 'pascals-triangle',
  'Second Largest Element': 'second-largest',
  'Check if Array is Sorted': 'check-sorted',
  'Left Rotate by One Place': 'left-rotate-one',
  'Linear Search': 'linear-search',
  'Find Missing Number': 'find-missing-number',
  'Largest Odd Number in a String': 'largest-odd-string',
  'Rotate String': 'rotate-string',
  'String to Integer (atoi)': 'atoi',
  'Valid Palindrome II': 'valid-palindrome-ii',
  'Reverse Words in a String': 'reverse-words',
  'Isomorphic Strings': 'isomorphic-strings',
  'Roman to Integer': 'roman-to-integer',
  'Sort Characters by Frequency': 'sort-chars-frequency',
  'Sum of Beauty of All Substrings': 'sum-beauty-substrings',
  'Group Anagrams': 'group-anagrams',
  'Valid Parentheses': 'valid-parentheses',
  'Remove Outermost Parentheses': 'remove-outermost-parens',
  'Maximum Nesting Depth': 'max-nesting-depth',
  'Remove All Adjacent Duplicates': 'remove-adjacent-duplicates',
  'Decode String': 'decode-string',
  'Count Number of Substrings': 'count-substrings-k',
  'Longest Substring W/O Repeating Char': 'longest-substring-no-repeat',
  'Longest Repeating Character Replacement': 'longest-repeating-char-replace',
  'Find All Anagrams in a String': 'find-all-anagrams',
  'Longest Palindromic Substring': 'longest-palindromic-substring',
};

// Build the JS export
let output = '/**\n * altairExplanations.js\n * All problem explanations from dsaaltair.json\n */\nexport const altairExplanations = {\n';

// Use javaSignature to identify problems since names aren't in the JSON
const sigToId = {
  'public ArrayList<Integer> findUnion': 'find-union',
  'public void sortColors': 'sort-012',
  'public List<List<Integer>> threeSum': 'three-sum',
  'public List<List<Integer>> fourSum': 'four-sum',
  'public void merge(int[] nums1': 'merge-sorted-arrays',
  'public int findMaxConsecutiveOnes': 'max-consecutive-ones',
  'public int longestSubarrayWithSumK': 'longest-subarray-sum-k-pos',
  'public int singleNumber': 'find-number-once',
  'public int getLongestSubarray': 'longest-subarray-sum-k-neg',
  'public int longestConsecutive': 'longest-consecutive',
  'public int findAllSubarraysWithGivenSum': 'count-subarrays-sum',
  'public int maxLen': 'largest-subarray-zero-sum',
  'public int solve(int[] A': 'count-subarrays-xor',
  'public int[] findTwoElement': 'repeating-missing',
  'public int majorityElement': 'majority-element-n2',
  'public List<Integer> majorityElement': 'majority-element-n3',
  'public void nextPermutation': 'next-permutation',
  'public ArrayList<Integer> leaders': 'leaders-array',
  'public long inversionCount': 'count-inversions',
  'public int reversePairs': 'reverse-pairs',
  'public int maxProduct': 'max-product-subarray',
  'public void setZeroes': 'set-matrix-zeros',
  'public void rotate(int[][] matrix': 'rotate-matrix-90',
  'public List<Integer> spiralOrder': 'spiral-matrix',
  'public List<List<Integer>> generate': 'pascals-triangle',
  'public int getSecondLargest': 'second-largest',
  'public boolean isSorted': 'check-sorted',
  'public void rotateLeft': 'left-rotate-one',
  'public int search(int[] arr': 'linear-search',
  'public int missingNumber': 'find-missing-number',
  'public String largestOddNumber': 'largest-odd-string',
  'public boolean rotateString': 'rotate-string',
  'public int myAtoi': 'atoi',
  'public boolean validPalindrome': 'valid-palindrome-ii',
  'public String reverseWords': 'reverse-words',
  'public boolean isIsomorphic': 'isomorphic-strings',
  'public int romanToInt': 'roman-to-integer',
  'public String frequencySort': 'sort-chars-frequency',
  'public int beautySum': 'sum-beauty-substrings',
  'public List<List<String>> groupAnagrams': 'group-anagrams',
  'public boolean isValid': 'valid-parentheses',
  'public String removeOuterParentheses': 'remove-outermost-parens',
  'public int maxDepth': 'max-nesting-depth',
  'public String removeDuplicates': 'remove-adjacent-duplicates',
  'public String decodeString': 'decode-string',
  'public long substrCount': 'count-substrings-k',
  'public int lengthOfLongestSubstring': 'longest-substring-no-repeat',
  'public int characterReplacement': 'longest-repeating-char-replace',
  'public List<Integer> findAnagrams': 'find-all-anagrams',
  'public String longestPalindrome': 'longest-palindromic-substring',
  'public String longestCommonPrefix': 'longest-common-prefix',
  'public int compress': 'string-compression',
  'public ListNode reverseList': 'reverse-linked-list',
  'public ListNode middleNode': 'middle-linked-list',
  'public boolean hasCycle': 'linked-list-cycle',
};

arrays.forEach(p => {
  // Find the ID
  let id = null;
  for (const [sig, pid] of Object.entries(sigToId)) {
    if (p.javaSignature && p.javaSignature.startsWith(sig)) {
      id = pid;
      break;
    }
  }
  if (!id) return;
  
  const entry = JSON.stringify(p, null, 2);
  output += `  "${id}": ${entry},\n`;
});

output += '};\n';

fs.writeFileSync('AlgoVisualizer-main/src/data/altairExplanations.js', output, 'utf8');
console.log('Written successfully');
