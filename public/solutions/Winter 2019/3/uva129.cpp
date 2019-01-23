// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 129
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;
typedef pair<int, int> ii;

int n, L;
int resi;
string res;

// list of indices of each letter in the string - stack-allocated to cut back on
// time (takes longer to dynamically allocate vectors, and we are doing this
// quite a few times)
// index 0 stores the number of indices for each letter
int indices[26][100];

// reset to 0 indices
void reset_indices() {
  for (int i = 0; i < 26; ++i) {
    indices[i][0] = 0;
  }
}

// is s hard?
bool ok(const string& s) {
  reset_indices();
  if (s == "") return true;

  // count up indices
  for (int i = 0; i < s.size(); ++i) {
    int j = s[i] - 'A';
    ++indices[j][0];
    indices[j][indices[j][0]] = i;
  }

  // debugging
  // for (int i = 0; i < L; ++i) {
  //   printf("%c:", i + 'A');
  //   for (int j = 1; j <= indices[i][0]; ++j) {
  //     printf(" %d", indices[i][j]);
  //   }
  //   printf("\n");
  // }

  // check for repeats - go through each letter, go through all of its positions
  // see if the substrings starting at those positions are identical
  for (int j = 0; j < 26; ++j) {
    for (int i = 1; i < indices[j][0]; ++i) {
      int ind1 = indices[j][i];
      for (int k = i + 1; k <= indices[j][0]; ++k) {
        int ind2 = indices[j][k];

        // too short to support same length
        if (s.size() - ind2 < ind2 - ind1) continue;

        // check substrings
        bool same = true;
        for (int a1 = ind1, a2 = ind2; a1 < ind2; ++a1, ++a2) {
          same &= s[a1] == s[a2];
          if (!same) break;
        }
        if (same) return false;
      }
    }
  }

  return true;
}

// returns bool telling whether this one is ok
bool f(string& cur, bool end) {
  if (resi == n) return false;  // do nothing if reached target
  if (end) {
    if (ok(cur)) {
      ++resi;
      if (resi == n) res = cur;
      return true;
    }
    return false;
  }

  // IMPORTANT - only continue adding characters to this string if it has no
  // repeats
  bool cont = f(cur, true);
  if (!cont) return false;

  for (int i = 0; i < L; ++i) {
    cur.push_back('A' + i);
    f(cur, false);
    cur.pop_back();
  }

  return true;
}

int main() {
  while (GET(n) && GET(L) && (n && L)) {
    // generate the string
    string cur;
    resi = -1;
    f(cur, false);

    // output
    for (int i = 0; i < res.size(); ++i) {
      if (i == 64) {
        putchar('\n');
      } else if (i != 0 && i % 4 == 0) {
        putchar(' ');
      }
      putchar(res[i]);
    }
    printf("\n%lu\n", res.size());
  }
  return 0;
}
