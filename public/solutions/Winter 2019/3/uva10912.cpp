// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 10912
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;
typedef pair<int, int> ii;

// how many ways to create the given string when you have L length left, S sum
// left, and your last character/value was prev?
// size takes advantage of the fact that you can only have strings of up to
// length 26 because letters are strictly ascending
int dp[27][352][26];
int f(int L, int S, int prev) {
  if (L > 26 || S > 351 || S < 0) return 0;
  if (L == 0) return S == 0;
  if (dp[L][S][prev] != -1) return dp[L][S][prev];

  dp[L][S][prev] = 0;
  for (int i = prev + 1; i <= 26; ++i) {
    dp[L][S][prev] += f(L - 1, S - i, i);
  }

  return dp[L][S][prev];
}

int main() {
  int L, S;
  for (int ca = 1; GET(L) && GET(S) && (L && S); ++ca) {
    memset(dp, -1, sizeof(dp));
    printf("Case %d: %d\n", ca, f(L, S, 0));
  }
  return 0;
}
