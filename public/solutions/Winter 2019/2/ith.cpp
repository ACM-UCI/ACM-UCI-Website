// Author: btjanaka (Bryon Tjanaka)
// Problem: (Kattis) ith
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;
typedef pair<int, int> ii;

// type of queen
enum qtype {
  Q,   // full queen
  RO,  // row only
  UD,  // diagonal going up
  DD,  // diagonal going down
};

// idea is to move across the board from left to right while keeping track of
// which squares would be available - but we also have to add extra
// "semi-queens" to the left of the queens so the squares that the queen affects
// on its left before actually getting to them
//
// namely, we have to add 3 extra queens to the left of each queen:
// - a row only queen
// - an "up diagonal" queen
// - a "down diagonal" queen
//
// DD
//   \
//    \
// RO--Q
//    /
//   /
// UD
int main() {
  int rows, cols, n;
  while (scanf("%d %d %d", &rows, &cols, &n) && (rows || cols || n)) {
    // gives row and type of queens that are in each column
    vector<set<pair<int, enum qtype>>> queens(cols);

    // add queens
    int rk, ck;
    for (int i = 0; i < n; ++i) {
      GET(rk);
      GET(ck);
      --rk;
      --ck;
      queens[ck].insert({rk, Q});  // add the actual queen
      queens[0].insert({rk, RO});  // add the queen at the beginning of the row

      // add the queen with diagonal going down
      if (ck > rk)
        queens[ck - rk].insert({0, DD});
      else
        queens[0].insert({rk - ck, DD});

      // add the queen with the diagonal going up
      int rrem = rows - rk - 1;
      if (ck > rrem)
        queens[ck - rrem].insert({rows - 1, UD});
      else
        queens[0].insert({rk + ck, UD});
    }

    // debugging
    // for (int i = 0; i < cols; ++i) {
    //   printf("%d:", i);
    //   for (const pair<int, enum qtype>& p : queens[i]) {
    //     printf(" %d(", p.first);
    //     switch (p.second) {
    //       case Q:
    //         printf("Q");
    //         break;
    //       case RO:
    //         printf("RO");
    //         break;
    //       case UD:
    //         printf("UD");
    //         break;
    //       case DD:
    //         printf("DD");
    //         break;
    //     }
    //     printf(")");
    //   }
    //   printf("\n");
    // }

    // vectors store bitsets (DON'T use bools - it's too slow)
    // 0: full
    // 1: RO
    // 2: UD
    // 3: DD

    // squares that are not affected
    int tot = 0;

    // two vectors for storing the board - we just switch between them between
    // iterations instead of having one vector, creating a new one, and copying
    // the results to it
    vector<int> cur1(rows, 0);
    vector<int> cur2(rows, 0);

    // go across the board column by column
    for (int c = 0; c < cols; ++c) {
      vector<int>& cur = c % 2 == 0 ? cur1 : cur2;
      vector<int>& next = c % 2 == 0 ? cur2 : cur1;

      // add in queens that are in the current col
      bool has_col = false;  // tells if the current column had a full queen
      for (const pair<int, enum qtype>& p : queens[c]) {
        int r = p.first;
        cur[r] |= 1;  // full
        switch (p.second) {
          case Q:
            cur[r] |= (1 << 4) - 1;  // turns on bits 0 to 3
            has_col = true;
            break;
          case RO:
            cur[r] |= (1 << 1);
            break;
          case UD:
            cur[r] |= (1 << 2);
            break;
          case DD:
            cur[r] |= (1 << 3);
            break;
        }
      }

      // count empty spots in cur - no spots if there are queens in this column
      if (!has_col) {
        for (int r = 0; r < rows; ++r) {
          // no bits on if there is truly nothing here
          if (!cur[r]) {
            ++tot;
          }
        }
      }

      // fill next column - each row of the next column is affected by three
      // cells in the current column
      // cur \
      // cur - next
      // cur /
      if (c != cols - 1) {
        for (int r = 0; r < rows; ++r) {
          next[r] = 0;
          next[r] |= cur[r] & (1 << 1);                        // row
          if (r < rows - 1) next[r] |= cur[r + 1] & (1 << 2);  // ud
          if (r > 0) next[r] |= cur[r - 1] & (1 << 3);         // dd
          if (next[r]) next[r] |= 1;
        }
      }
    }

    // print result once everything is summed up
    printf("%d\n", tot);
  }
  return 0;
}
