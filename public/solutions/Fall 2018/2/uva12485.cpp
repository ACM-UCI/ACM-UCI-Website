// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 12485
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

int note[10010];

// Basically a load balancing problem. Find the average, then find how many
// cycles it takes to get all of the numbers to the average. We know that there
// will be an equal number of "steps" above and below the average among all the
// numbers; i.e. the average difference between each number and the average is
// 0. The only scenario where the algorithm cannot work is if the average is not
// whole, meaning that the notes are impossible.
int main() {
  int n;
  while (GET(n) > 0) {
    int tot = 0;
    FOR(i, 0, n) {
      GET(note[i]);
      tot += note[i];
    }
    int avg = tot / n;

    if (avg * n == tot) {
      int ans = 1;
      // Can find number of cycles by seeing the total amount of "below-ness"
      // compared to the average.
      for (int i = 0; avg - note[i] > 0; ++i) {
        ans += avg - note[i];
      }
      printf("%d\n", ans);
    } else {
      printf("-1\n");
    }
  }
  return 0;
}
