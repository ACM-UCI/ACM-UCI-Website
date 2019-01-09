// Author: btjanaka (Bryon Tjanaka)
// Problem: (UVa) 450
#include <bits/stdc++.h>
#define GET(x) scanf("%d", &x)
#define GED(x) scanf("%lf", &x)
typedef long long ll;
using namespace std;
typedef pair<int, int> ii;

struct person {
  string title;
  string first;
  string last;
  string dept;
  string addr;
  string home;
  string work;
  string box;
  person()
      : title(""),
        first(""),
        last(""),
        dept(""),
        addr(""),
        home(""),
        work(""),
        box("") {}
  bool operator<(const person& rhs) { return last < rhs.last; }
};

int main() {
  int d;
  GET(d);
  getchar();
  char buf[10010];
  char dept[10010];
  vector<person> people;

  while (d--) {
    fgets(dept, 10010, stdin);
    *strrchr(dept, '\n') = 0;
    while (fgets(buf, 10010, stdin) && buf[0] != '\n') {
      people.push_back(person());
      char* token = strtok(buf, ",\n");
      people.back().title = token;
      token = strtok(NULL, ",\n");
      people.back().first = token;
      token = strtok(NULL, ",\n");
      people.back().last = token;
      token = strtok(NULL, ",\n");
      people.back().addr = token;
      token = strtok(NULL, ",\n");
      people.back().home = token;
      token = strtok(NULL, ",\n");
      people.back().work = token;
      token = strtok(NULL, ",\n");
      people.back().box = token;

      people.back().dept = dept;
    }
  }

  sort(people.begin(), people.end());

  for (const person& p : people) {
    printf("----------------------------------------\n");
    printf("%s %s %s\n", p.title.c_str(), p.first.c_str(), p.last.c_str());
    printf("%s\n", p.addr.c_str());
    printf("Department: %s\n", p.dept.c_str());
    printf("Home Phone: %s\n", p.home.c_str());
    printf("Work Phone: %s\n", p.work.c_str());
    printf("Campus Box: %s\n", p.box.c_str());
  }

  return 0;
}
