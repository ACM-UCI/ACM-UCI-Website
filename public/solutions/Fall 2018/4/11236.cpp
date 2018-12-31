#include <iostream>
#include <vector>
#include <set>
#include <cmath>
using namespace std;

int main () {
    for (int a = 1; a < 2000; ++a) {
        if (pow(a, 4)/pow(10, 6) > 2000) break;
        for (int b = a; b < 2000 - a; ++b) {
            if (a * pow(b, 3)/pow(10, 6) > 2000) break;
            for (int c = b; c < 2000 - a - b; ++c) {
                if (a * b * pow(c, 2)/pow(10, 6) > 2000) break;
                double d = (pow(10, 6) * (a + b + c)/(a * b * c - pow(10, 6)));
                if (ceil(d) == floor(d) && d >= c && a + b + c + d <= 2000) {
                    printf("%.2f %.2f %.2f %.2f\n", a/100.0, b/100.0, c/100.0, d/100.0); 
                }
            }
        }
    } 
    return 0;
}