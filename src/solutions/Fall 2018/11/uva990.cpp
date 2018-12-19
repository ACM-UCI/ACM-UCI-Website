// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 990
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;

int max_d, w, n;
int d[40];
int v[40];
pair<int, pair<int, int>> dp[40][350];  // {max_value, {next_id, next_d}}

pair<int, pair<int, int>> backtrack(int id, int cur_d) {
  if (dp[id][cur_d].first != -1) return dp[id][cur_d];

  if (cur_d > max_d)
    return {INT_MIN, {-1, -1}};
  else if (id == n)
    dp[id][cur_d] = {0, {-1, -1}};
  else {
    pair<int, pair<int, int>> yes = backtrack(id + 1, cur_d + d[id]);
    yes.first += v[id];
    pair<int, pair<int, int>> no = backtrack(id + 1, cur_d);
    if (yes.first > no.first) {
      dp[id][cur_d] = {yes.first, {id + 1, cur_d + d[id]}};
    } else {
      dp[id][cur_d] = {no.first, {id + 1, cur_d}};
    }
  }

  return dp[id][cur_d];
}

int main() {
  bool first = true;
  while (GET(max_d) > 0) {
    // input
    GET(w);
    GET(n);
    for (int i = 0; i < n; ++i) {
      GET(d[i]);
      GET(v[i]);
    }
    max_d /= (3 * w);  // work in terms of depth instead of time

    // reset
    for (int i = 0; i < 40; ++i) {
      for (int j = 0; j < 350; ++j) {
        dp[i][j].first = -1;
        dp[i][j].second.first = -1;
        dp[i][j].second.second = -1;
      }
    }

    // execute
    backtrack(0, 0);

    // debugging
    // for (int i = 0; i < 5; ++i) {
    //   for (int j = 0; j < 350; ++j) {
    //     if (dp[i][j].first != -1)
    //       printf("(%d,%d):%d|%d,%d ", i, j, dp[i][j].first,
    //              dp[i][j].second.first, dp[i][j].second.second);
    //   }
    //   putchar('\n');
    // }

    // output
    if (first)
      first = false;
    else
      printf("\n");

    // result
    printf("%d\n", dp[0][0].first);

    // count number of treasures
    int num = 0;
    int cur_d = 0;
    pair<int, pair<int, int>> cur = dp[0][0];
    while (cur.second.first != -1) {
      // don't count if the time did not change in the next position
      // if the next one has an increased depth, that means we chose this one
      if (cur.second.second > cur_d) ++num;
      cur_d = cur.second.second;
      cur = dp[cur.second.first][cur.second.second];
    }
    printf("%d\n", num);

    // print treasures
    cur_d = 0;
    cur = dp[0][0];
    while (cur.second.first != -1) {
      if (cur.second.second > cur_d)
        printf("%d %d\n", d[cur.second.first - 1], v[cur.second.first - 1]);
      cur_d = cur.second.second;
      cur = dp[cur.second.first][cur.second.second];
    }
  }
  return 0;
}
