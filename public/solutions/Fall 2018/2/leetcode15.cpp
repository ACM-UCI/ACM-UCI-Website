// Author: btjanaka (Bryon Tjanaka)
// Problem: (Leetcode) 15

// runtime: O(n^2)
class Solution {
 public:
  vector<vector<int>> threeSum(vector<int>& nums) {
    vector<vector<int>> res;

    int n = nums.size();
    sort(nums.begin(), nums.end());

    // Find the sums
    // Here, instead of trying to find the third number for each i and j,
    // we set the first number and look for the second and third number
    // (left and right). We gradually move the pointers left and right
    // looking for unique solutions until left and right meet.
    for (int i = 0; i < n - 2; ++i) {
      if (i != 0 && nums[i] == nums[i - 1]) continue;
      int left = i + 1;
      int right = n - 1;
      while (left < right) {
        int needed = 0 - nums[left] - nums[right];
        if (nums[i] == needed) {
          // If found a solution, add it on and move left and
          // right to be at different locations.
          // We know we need to move both of the pointers because
          // if one of them changes, the other has to change as well
          // to satisfy the equation.
          res.push_back({nums[i], nums[left], nums[right]});
          ++left;
          while (left < right && nums[left] == nums[left - 1]) ++left;
          --right;
          while (left < right && nums[right] == nums[right + 1]) --right;
        } else if (nums[i] > needed) {
          // If nums[i] is too big, needed has to increase.
          // This means that nums[left] + nums[right] has to decrease,
          // so we move the right pointer.
          //
          // No need to keep checking for repeated here because this will
          // be handled by the outer for loop. Putting another nested loop
          // in here (probably?) slows you down.
          --right;
        } else {
          // Otherwise, we move the left one.
          ++left;
        }
      }
    }
    return res;
  }
};
