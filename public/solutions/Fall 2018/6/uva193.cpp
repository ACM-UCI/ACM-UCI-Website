// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 193
#include <bits/stdc++.h>
#define FOR(i, a, b) for (int i = a; i < b; ++i)
#define FORe(i, a, b) for (int i = a; i <= b; ++i)
#define PAI(arr, len) /*Print array of integers*/ \
  {                                               \
    for (int _i = 0; _i < len; ++_i) {            \
      if (_i != len - 1) {                        \
        printf("%d ", arr[_i]);                   \
      } else {                                    \
        printf("%d", arr[_i]);                    \
      }                                           \
    }                                             \
    putchar('\n');                                \
  }
#define PBS(n, len) /*Print a bitset*/ \
  {                                    \
    for (int _i = 0; _i < len; ++_i) { \
      putchar(n % 2 + '0');            \
      n /= 2;                          \
    }                                  \
    putchar('\n');                     \
  }
#define GET(x) scanf("%d", &x)
#define PLN putchar('\n')
#define INF 2147483647
typedef long long ll;
using namespace std;

void backtrack(int cur, int n, vector<int> graph[110], int colored,
               bool tmp[110], int* max_colored, bool res[110]) {
  // End case: we used all nodes
  if (cur == n + 1) {
    if (colored > *max_colored) {
      *max_colored = colored;
      memcpy(res, tmp, sizeof(bool) * 110);
    }
    return;
  }

  // Try non-colored option
  backtrack(cur + 1, n, graph, colored, tmp, max_colored, res);

  // Try colored option only if all neighbors are non-colored
  bool can_color = true;
  for (int neighbor : graph[cur]) {
    if (tmp[neighbor]) {
      can_color = false;
      break;
    }
  }
  if (can_color) {
    tmp[cur] = true;
    backtrack(cur + 1, n, graph, colored + 1, tmp, max_colored, res);

    // We have to set tmp[cur] back to false because the iteration basically
    // goes backwards, i.e. it starts by having just the last node colored, then
    // the second to last, etc. This is because the non-colored variation is
    // covered first, so we first go all the way down to the case where all the
    // nodes are non-colored, then come back and try coloring other nodes.
    // Because of this order, if we do not unset this value, it will remain set.
    // For instance, we might set the last node, and it will remain set.
    tmp[cur] = false;
  }
}

int main() {
  vector<int> graph[110];  // 1-indexed
  int n;
  int k;

  int max_colored;  // Maximum number of colored nodes
  bool tmp[110];    // tmp for building up list of nodes
  bool res[110];    // list telling whether each node is colored

  int m;
  GET(m);

  while (m--) {
    // Resetting
    for (int i = 0; i < 110; ++i) graph[i].clear();
    memset(res, 0, sizeof(res));
    memset(tmp, 0, sizeof(tmp));
    max_colored = 0;

    // Input
    GET(n);
    GET(k);
    while (k--) {
      int n1, n2;
      scanf("%d %d", &n1, &n2);
      graph[n1].push_back(n2);
      graph[n2].push_back(n1);
    }

    // Solution - after this, max_colored should have the number of nodes in the
    // optimal coloring, and res should tell which nodes are colored.
    backtrack(1, n, graph, 0, tmp, &max_colored, res);

    // Output
    printf("%d\n", max_colored);
    bool first = true;
    for (int i = 1; i <= n; ++i) {
      if (res[i]) {
        if (first) {
          first = false;
          printf("%d", i);
        } else {
          printf(" %d", i);
        }
      }
    }
    PLN;
  }
  return 0;
}
