// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 111
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;

char buf[100];

bool get_nums(vector<int>& nums) {
  nums.clear();
  if (!fgets(buf, 100, stdin)) return false;
  char* token = strtok(buf, " \n");
  while (token != NULL) {
    nums.push_back(strtol(token, nullptr, 10));
    token = strtok(NULL, " \n");
  }
  return true;
}

// NOTE: differentiate between ordering and ranking - very important since they
// give you rankings which you have to convert to orderings
int main() {
  vector<int> nums;  // the numbers from the input
  int correct[25];   // correct ordering of the string
  int pos[25];       // correct pos
  int ord[25];       // student gives rank, must convert to order
  int n;
  bool get_correct = false;  // whether to get the correct ranking on next round
  while (get_nums(nums)) {
    if (nums.size() == 1) {
      n = nums[0];
      get_correct = true;
    } else if (get_correct && int(nums.size()) == n) {
      for (int i = 0; i < n; ++i) nums[i]--;
      for (int i = 0; i < n; ++i)
        correct[nums[i]] = i;  // convert to order from rank
      get_correct = false;

      // process correct positions
      for (int i = 0; i < n; ++i) pos[correct[i]] = i;
    } else {
      // run LIS
      for (int i = 0; i < n; ++i) nums[i]--;
      for (int i = 0; i < n; ++i)
        ord[nums[i]] = i;  // convert to order from rank
      vector<int> dp(1, ord[0]);
      for_each(ord + 1, ord + n, [&](int num) {
        auto loc = lower_bound(dp.begin(), dp.end(), num,
                               [&](int a, int b) { return pos[a] < pos[b]; });
        if (loc == dp.end()) {
          dp.push_back(num);
        } else {
          *loc = num;
        }
      });
      printf("%lu\n", dp.size());
    }
  }
  return 0;
}
