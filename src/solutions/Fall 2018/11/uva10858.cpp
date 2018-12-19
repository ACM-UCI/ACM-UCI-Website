// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 10858
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;

// Go through factors of n, and for each factor, push it onto cur and run a new
// instance with a reduced instance of n. Analyze the children before pushing on
// the current result to keep things sorted.
void backtrack(vector<int>& cur, int n, vector<vector<int>>& res) {
  for (int i = 2; i <= n; ++i) {
    if (i >= cur.back() && n % i == 0) {
      cur.push_back(i);
      backtrack(cur, n / i, res);
      cur.pop_back();
    }
  }

  // Only push on if at least two factors (account for dummy value)
  if (n == 1 && cur.size() > 2) {
    res.push_back(cur);
  }
}

int main() {
  int n;
  while (GET(n) && n) {
    vector<vector<int>> res;
    vector<int> cur = {INT_MIN};  // Push a small dummy value so we don't have
                                  // to check size of cur
    backtrack(cur, n, res);

    printf("%d\n", (int)res.size());
    for_each(res.begin(), res.end(), [](const vector<int>& factors) {
      for (int i = 1; i < factors.size(); ++i) {
        printf("%d%c", factors[i], i == factors.size() - 1 ? '\n' : ' ');
      }
    });
  }
  return 0;
}
