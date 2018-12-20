// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 183
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

int bmp[210][210];  // Regular bit map
char flat[1000];    // Flattened bitmap (i.e. with D's)
int flat_i;

// Check if the area is all equal - if not, divide it and flatten those areas.
void flatten(int r0, int c0, int rows, int cols) {
  bool same = true;
  for (int r = r0; r < r0 + rows; ++r) {
    for (int c = c0; c < c0 + cols; ++c) {
      if (bmp[r][c] != bmp[r0][c0]) {
        same = false;
        break;
      }
    }
    if (!same) break;
  }
  if (same) {
    flat[flat_i++] = bmp[r0][c0] + '0';
  } else {
    flat[flat_i++] = 'D';
    int new_rows = rows / 2 + rows % 2;
    int new_cols = cols / 2 + cols % 2;
    if (rows == 1) {  // 1 row case
      flatten(r0, c0, rows, new_cols);
      flatten(r0, c0 + new_cols, rows, cols / 2);
    } else if (cols == 1) {  // 1 column case
      flatten(r0, c0, new_rows, cols);
      flatten(r0 + new_rows, c0, rows / 2, cols);
    } else {  // Normal case - split into quadrants
      flatten(r0, c0, new_rows, new_cols);
      flatten(r0, c0 + new_cols, new_rows, cols / 2);
      flatten(r0 + new_rows, c0, rows / 2, new_cols);
      flatten(r0 + new_rows, c0 + new_cols, rows / 2, cols / 2);
    }
  }
}

// Expand the bitmap to the original map
void expand(int r0, int c0, int rows, int cols) {
  char curr = flat[flat_i++];
  switch (curr) {
    case '0':
    case '1': {
      int val = curr - '0';
      for (int r = r0; r < r0 + rows; ++r) {
        for (int c = c0; c < c0 + cols; ++c) {
          bmp[r][c] = val;
        }
      }
      break;
    }
    case 'D': {
      int new_rows = rows / 2 + rows % 2;
      int new_cols = cols / 2 + cols % 2;
      if (rows == 1) {  // 1 row case
        expand(r0, c0, rows, new_cols);
        expand(r0, c0 + new_cols, rows, cols / 2);
      } else if (cols == 1) {  // 1 column case
        expand(r0, c0, new_rows, cols);
        expand(r0 + new_rows, c0, rows / 2, cols);
      } else {  // Normal case - split into quadrants
        expand(r0, c0, new_rows, new_cols);
        expand(r0, c0 + new_cols, new_rows, cols / 2);
        expand(r0 + new_rows, c0, rows / 2, new_cols);
        expand(r0 + new_rows, c0 + new_cols, rows / 2, cols / 2);
      }
      break;
    }
  }
}

int main() {
  char ch;
  int rows, cols;
  while (scanf(" %c", &ch) && ch != '#') {
    scanf("%d %d", &rows, &cols);
    printf("%c%4d%4d\n", ch == 'B' ? 'D' : 'B', rows, cols);
    if (ch == 'B') {
      // Generate a flattened bitmap
      for (int i = 0; i < rows; ++i) {
        for (int j = 0; j < cols; ++j) {
          scanf("%1d", &bmp[i][j]);
        }
      }
      memset(flat, 0, sizeof(flat));
      flat_i = 0;
      flatten(0, 0, rows, cols);
      for (int i = 0; i < flat_i; ++i) {
        if (i % 50 == 0 && i != 0) PLN;
        putchar(flat[i]);
      }
      PLN;
    } else if (ch == 'D') {
      // Generate the original bitmap
      scanf("%s", flat);
      flat_i = 0;
      expand(0, 0, rows, cols);
      int tot_chars = 0;
      for (int i = 0; i < rows; ++i) {
        for (int j = 0; j < cols; ++j) {
          if (tot_chars % 50 == 0 && tot_chars != 0) PLN;
          ++tot_chars;
          putchar(bmp[i][j] + '0');
        }
      }
      PLN;
    }
  }
  return 0;
}
