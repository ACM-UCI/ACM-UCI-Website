// Author: btjanaka (Bryon Tjanaka)
// Problem: (Leetcode) 300

// O(n^2) solution
class Solution {
 public:
  int lengthOfLIS(vector<int>& nums) {
    if (nums.size() == 0) return 0;

    vector<int> dp(nums.size(), 0);
    dp[0] = 1;
    for (int i = 1; i < nums.size(); ++i) {
      int max_len = 0;
      for (int j = 0; j < i; ++j) {
        if (nums[j] < nums[i]) max_len = max(dp[j], max_len);
      }
      dp[i] = max_len + 1;
    }
    int res = 0;
    for (int i = 0; i < nums.size(); ++i) {
      res = max(res, dp[i]);
    }
    return res;
  }
};

// O(n log n) solution
class Solution {
 public:
  int lengthOfLIS(vector<int>& nums) {
    if (nums.size() == 0) return 0;

    vector<int> dp(1, nums[0]);
    for (int i = 1; i < nums.size(); ++i) {
      auto loc = lower_bound(dp.begin(), dp.end(), nums[i]);
      if (loc == dp.end()) {
        dp.push_back(nums[i]);
      } else {
        *loc = nums[i];
      }
    }
    return dp.size();
  }
};
