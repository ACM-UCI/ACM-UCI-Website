// Author: btjanaka (Bryon Tjanaka)
// Problem: (Kattis) bing
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;
typedef pair<int, int> ii;

// each node tells whether it has a next element for each letter
struct node {
  int count;
  vector<node*> next;
  node() : count(0), next(26, nullptr) {}
};

// this is a classic trie problem (a trie is a type of data structure somewhat
// similar to a graph)
struct Trie {
  node* head;
  Trie() : head(new node()) {}

  int count(const string& s) {
    node* itr = head;
    for (int i = 0; i < s.size(); ++i) {
      int ni = s[i] - 'a';
      if (itr->next[ni] == nullptr) {
        return 0;
      }
      itr = itr->next[ni];
    }
    return itr->count;
  }

  void insert(const string& s) {
    node* itr = head;
    for (int i = 0; i < s.size(); ++i) {
      int ni = s[i] - 'a';
      if (itr->next[ni] == nullptr) {
        itr->next[ni] = new node();
      }
      ++itr->count;
      itr = itr->next[ni];
    }
    ++itr->count;
  }
};

int main() {
  Trie tr;
  int n;
  GET(n);
  string s;
  while (n--) {
    cin >> s;
    printf("%d\n", tr.count(s));
    tr.insert(s);
  }
  return 0;
}