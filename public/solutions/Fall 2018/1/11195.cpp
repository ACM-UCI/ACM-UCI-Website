// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 11195
// See Competitive Programming 3 Section 8.2.1

#include <bits/stdc++.h>
using namespace std;

int board[20];
int n;
int res;
int OK;

// Each of rw, ld, and rd is a bitset where each bit represents whether a given
// row, left diagonal, or right diagonal is open, respectively.
// - bit i of rw tells whether row i is open
// - bit i of ld tells whether the left diagonal (going from top left to bottom
//   right) intersecting row i is open
// - bit i of rd tells whether the right diagonal (going from top right to
//   bottom left) intersecting row i is open
void backtrack(int rw, int ld, int rd, int c) {
  // Terminating condition: We have found queens that go in all rows
  if (rw == OK) {
    ++res;
    return;
  }

  // Find the available rows, which are represented as one bits in pos
  int pos = OK & (~(rw | ld | rd));

  // Keep taking away on bits from pos until it runs out
  while (pos) {
    // Finds the least significant bit in the number. Remember that two's
    // complement is found by inverting bits and adding 1.
    int p = pos & -pos;

    // Subtract the new-found position from pos
    pos -= p;

    // ReCURSE to the next level if the bit is not bad.
    if (!(board[c] & p))
      // (See figure 8.5 on pg 302 in Competitive Programming 3)
      // rw | p adds the current row onto the bitset of rows
      // (ld | p) << 1 kicks out the left diagonal intersecting the
      // bottommost row
      // (rd | p) >> 1 kicks out the right diagonal intersecting the
      // topmost row
      backtrack(rw | p, (ld | p) << 1, (rd | p) >> 1, c + 1);
  }
}

// Record all cells - simply turn on all bits that are bad.
// Stored as a bunch of columns.
void record_board() {
  for (int i = 0; i < n; ++i) board[i] = 0;
  for (int r = 0; r < n; ++r) {
    for (int c = 0; c < n; ++c) {
      if (getchar() == '*') board[c] |= (1 << r);
    }
    getchar();
  }
}

int main() {
  scanf("%d\n", &n);
  for (int i = 1; n > 0; ++i) {
    OK = (1 << n) - 1;
    res = 0;
    record_board();
    backtrack(0, 0, 0, 0);
    printf("Case %d: %d\n", i, res);
    scanf("%d\n", &n);
  }
  return 0;
}
