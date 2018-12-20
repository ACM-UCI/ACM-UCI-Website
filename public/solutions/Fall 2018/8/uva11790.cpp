// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 11790
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;

int main() {
  int t;
  GET(t);
  for (int ca = 1; ca <= t; ++ca) {
    // input
    int n;
    GET(n);
    vector<int> bldg;
    vector<int> width;
    for (int i = 0; i < n; ++i) {
      int x;
      GET(x);
      bldg.push_back(x);
    }
    for (int i = 0; i < n; ++i) {
      int x;
      GET(x);
      width.push_back(x);
    }

    // find lengths - you HAVE to use the n^2 solution because you need to go
    // back through every previous building
    vector<int> dp(n, 0);
    for (int i = 0; i < n; ++i) {
      int to_add = 0;
      for (int j = 0; j < i; ++j) {
        if (bldg[j] < bldg[i]) to_add = max(to_add, dp[j]);
      }
      dp[i] = width[i] + to_add;
    }
    int a = *max_element(dp.begin(), dp.end());

    for (int i = 0; i < n; ++i) dp[i] = 0;
    for (int i = 0; i < n; ++i) {
      int to_add = 0;
      for (int j = 0; j < i; ++j) {
        if (bldg[j] > bldg[i]) to_add = max(to_add, dp[j]);
      }
      dp[i] = width[i] + to_add;
    }
    int b = *max_element(dp.begin(), dp.end());

    printf("Case %d. ", ca);
    if (a >= b)
      printf("Increasing (%d). Decreasing (%d).\n", a, b);
    else
      printf("Decreasing (%d). Increasing (%d).\n", b, a);
  }
  return 0;
}
