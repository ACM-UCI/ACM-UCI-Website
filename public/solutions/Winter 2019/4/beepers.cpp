// Author: btjanaka (Bryon Tjanaka)
// Problem: (Kattis) beepers
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;
typedef pair<int, int> ii;

// this solution uses TSP (traveling salesperson) but the input is small enough
// that you can just go through all permutations of the beeper orderings and
// find the one that requires the least traveling

int n;
int dist[15][15];
int dp[15][1 << 15];
int pos[15][2];

// cur is a bitset which tells which pos we have already visited
int tsp(int pos, int cur) {
  // if all nodes are visited the distance is just the distance to pos 0
  if (cur == (1 << n) - 1) return dist[pos][0];
  if (dp[pos][cur] != -1) return dp[pos][cur];  // check dp table

  // find minimum distance when going through rest of positions
  dp[pos][cur] = INT_MAX;
  for (int nxt = 0; nxt < n; ++nxt) {
    if (!(cur & (1 << nxt)))
      dp[pos][cur] =
          min(dp[pos][cur], dist[pos][nxt] + tsp(nxt, cur | (1 << nxt)));
  }
  return dp[pos][cur];
}

int main() {
  int ca;
  GET(ca);
  while (ca--) {
    int x, y;
    GET(x);
    GET(y);
    GET(pos[0][0]);
    GET(pos[0][1]);
    --pos[0][0];
    --pos[0][1];
    GET(n);
    ++n;

    for (int i = 1; i < n; ++i) {
      GET(pos[i][0]);
      GET(pos[i][1]);
      --pos[i][0];
      --pos[i][1];
    }

    for (int i = 0; i < n; ++i)
      for (int j = 0; j < n; ++j)
        dist[i][j] = abs(pos[i][0] - pos[j][0]) + abs(pos[i][1] - pos[j][1]);

    memset(dp, -1, sizeof(dp));
    printf("%d\n", tsp(0, 1));
  }
  return 0;
}