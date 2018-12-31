// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 11729
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
typedef long long ll;
using namespace std;

// first: briefing time
// second: job time
pair<int, int> sd[1010];

// Compare by seeing which scenario would take longer - having a or b go first.
// If a has briefing and job time b1 and j1, and b has b2 and j2, then the time
// with a first is b1 + max(j1, b2 + j2). The time if b goes first is b2 +
// max(j2, b1 + j1). If a's time is less than b's time, a goes first and vice
// versa.
bool compare(pair<int, int> a, pair<int, int> b) {
  int t_a = a.first + max(a.second, b.first + b.second);
  int t_b = b.first + max(b.second, a.first + a.second);
  return t_a < t_b;
}

int main() {
  int n;
  for (int ca = 1; GET(n) && n; ++ca) {
    FOR(i, 0, n) {
      GET(sd[i].first);
      GET(sd[i].second);
    }

    // Sort as described above
    sort(sd, sd + n, compare);

    // Calculate total time - tot keeps track of briefing times covered so far,
    // and fin keeps track of last time when job finishes.
    int tot = 0;
    int fin = 0;
    FOR(i, 0, n) {
      tot += sd[i].first;
      fin = max(fin, tot + sd[i].second);
    }
    tot = fin;

    // output
    printf("Case %d: %d\n", ca, tot);
  }
  return 0;
}
