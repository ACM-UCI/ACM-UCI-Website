// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 272
#include <bits/stdc++.h>

using namespace std;

int main() {
  bool side = false;
  char ch;
  while (scanf("%c", &ch) != EOF) {
    if (ch == '"') {
      if (!side) {
        printf("``");
      } else {
        printf("''");
      }
      side = !side;
    } else {
      printf("%c", ch);
    }
  }
  return 0;
}