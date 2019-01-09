// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 11407
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;
typedef pair<int, int> ii;

int dp[10010];

int main() {
  memset(dp, -1, sizeof(dp));
  dp[0] = 0;

  for (int i = 0; i <= 10000; ++i) {
    for (int j = 1; j <= 100; ++j) {
      int next = i + j * j;
      if (next > 10000) continue;
      dp[next] = dp[next] == -1 ? dp[i] + 1 : min(dp[next], dp[i] + 1);
    }
  }

  int ca;
  GET(ca);
  int n;
  while (ca--) {
    GET(n);
    printf("%d\n", dp[n]);
  }
  return 0;
}
