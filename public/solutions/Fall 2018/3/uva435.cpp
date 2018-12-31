// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 435
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

int v[25];

int main() {
  int n;
  GET(n);
  while (n--) {
    int p;
    int tot = 0;
    GET(p);
    FOR(i, 0, p) {
      GET(v[i]);
      tot += v[i];
    }

    int maj = tot / 2 + 1;
    FOR(i, 0, p) {
      int ind = 0;
      FOR(j, 0, 1 << p) {
        if (j & (1 << i)) continue;
        int m = 0;
        for (int k = 0; k < p; ++k) {
          if (j & (1 << k)) {
            m += v[k];
          }
        }
        if (m < maj && m + v[i] >= maj) ++ind;
      }
      printf("party %d has power index %d\n", i + 1, ind);
    }

    PLN;
  }
  return 0;
}
