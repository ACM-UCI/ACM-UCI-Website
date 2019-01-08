// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 1261
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;
typedef pair<int, int> ii;

// first dim: length of string, second dim: the string itself
// this table tells if the given string works
vector<vector<char>> dp;

char f(int len, int str) {
  if (dp[len][str] != '?') return dp[len][str];
  if (len == 0 && str == 0) return dp[len][str] = 1;  // empty string works

  // find groups
  vector<int> pos;  // beginnings of each group
  for (int i = 0; i < len; ++i) {
    if (i == 0 || bool(str & (1 << i)) != bool(str & (1 << (i - 1)))) {
      pos.push_back(i);
    }
  }

  // try removing each group
  for (int p = 0; p < pos.size(); ++p) {
    // group is too short
    if ((p == pos.size() - 1 ? len : pos[p + 1]) - pos[p] == 1) continue;

    // make new string by popping out a group
    int new_len = 0;
    int new_str = 0;
    for (int i = 0; i < len; ++i) {
      if (i >= pos[p] && (p == pos.size() - 1 || i < pos[p + 1])) continue;
      if ((1 << i) & str) {
        new_str |= (1 << new_len);
      }
      ++new_len;
    }
    if (f(new_len, new_str)) {
      return dp[len][str] = 1;
    }
  }

  // failed
  return dp[len][str] = 0;
}

int main() {
  // set the table
  for (int i = 0; i <= 26; ++i) dp.push_back(vector<char>(1 << i, '?'));

  int ca;
  GET(ca);
  getchar();
  char ch;
  while (ca--) {
    int str = 0;
    int len;
    for (len = 0; (ch = getchar()) != '\n'; ++len) {
      str |= (ch - 'a') << len;
    }
    printf("%d\n", int(f(len, str)));
  }
  return 0;
}
