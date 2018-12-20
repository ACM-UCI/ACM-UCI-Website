#include <iostream>
#include <set>
#include <vector>
#include <cmath>
#include <type_traits>
using namespace std;

int main () {
    double k;
    while (scanf("%lf\n", &k) != EOF) {
        vector<pair<double, pair<double, double> > > sol;
        set<double> included;
        double x = k + 1;
        double end = 1/(1/k - 1/x);
        int counter = 0;
        while (x <= end) {
            double y = (k * x)/(x - k);
            end = y;
            if (y == floor(y)) {
                sol.push_back(make_pair(k, make_pair(x, y)));
                included.insert(y);
                ++counter;
            }
            ++x;
        }

        cout << counter << endl;
        for (auto p: sol) {
            int k = p.first;
            int x = p.second.first;
            int y = p.second.second;
            printf("1/%d = 1/%d + 1/%d\n", k, y, x);
        }
    }
    return 0;
}