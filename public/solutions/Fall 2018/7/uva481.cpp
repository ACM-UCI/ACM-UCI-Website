// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 481
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;

// Basic idea is to apply n log n LIS, but along the way, keep track of the
// index of each element's previous LIS element, i.e. the last element that was
// less than it.

int main() {
  // first: number
  // second: previous for its LIS
  vector<pair<int, int>> nums;
  int x;
  while (scanf("%d", &x) > 0) nums.push_back({x, -1});

  // first: number
  // second: its index
  vector<pair<int, int>> dp(1, {nums[0].first, 0});
  for (unsigned int i = 1; i < nums.size(); ++i) {
    auto pos =
        lower_bound(dp.begin(), dp.end(), nums[i].first,
                    [](pair<int, int> a, int val) { return a.first < val; });
    // When pushing, add the index to allow other sequences to reference it
    // Also make the prev part (the second part) in each nums element store
    // the index of the element right before it.
    if (pos == dp.end()) {
      nums[i].second = dp.back().second;
      dp.push_back({nums[i].first, i});
    } else {
      *pos = make_pair(nums[i].first, i);
      if (pos != dp.begin()) {
        // Gets index of element prior to this one
        --pos;
        nums[i].second = (*pos).second;
      }
    }
  }

  // Print output - follow the path set up by the "previous" part of the longest
  // subsequence
  pair<int, int> cur = nums[dp.back().second];
  stack<int> pr;
  printf("%lu\n-\n", dp.size());
  // follow the sequence backwards
  while (cur.second != -1) {
    pr.push(cur.first);
    cur = nums[cur.second];
  }
  pr.push(cur.first);  // extra last element
  // empty out the stack and print
  while (!pr.empty()) {
    printf("%d\n", pr.top());
    pr.pop();
  }

  // O(n^2) solution - too slow
  /*
  // first is length, second is last index
  vector<pair<int, int>> dp(nums.size(), {1, -1});
  dp[0] = {1, -1};
  for (unsigned int i = 1; i < nums.size(); ++i) {
    for (unsigned int j = 0; j < i; ++j) {
      if (nums[i] > nums[j]) {
        if (dp[i].first <= dp[j].first + 1) {
          dp[i] = make_pair(dp[j].first + 1, j);
        }
      }
    }
  }

  // for_each(dp.begin(), dp.end(),
  //          [](pair<int, int> i) { printf("%d -> %d\n", i.first, i.second);
  //          });

  printf("%d\n-\n", dp[nums.size() - 1].first);
  stack<int> pr;
  auto start = max_element(
      dp.begin(), dp.end(),
      [](pair<int, int> a, pair<int, int> b) { return a.first <= b.first; });
  pr.push(nums[start - dp.begin()]);
  pair<int, int> cur = *start;
  while (cur.second != -1) {
    pr.push(nums[cur.second]);
    cur = dp[cur.second];
  }
  while (!pr.empty()) {
    printf("%d\n", pr.top());
    pr.pop();
  }
  */

  return 0;
}
