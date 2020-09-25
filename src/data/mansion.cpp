#include <iostream>
#include <queue>
#include <cmath>
using namespace std;
typedef long long LL;
int main () {
    priority_queue<LL> src, dst;
    LL N, A, B, C, X, Y, ans = 0;
    cin >> N >> A >> B >> C;
    for (LL i = 0; i < N; ++i) {
        cin >> X >> Y;
        priority_queue<LL> &curr = (X < Y) ? dst : src;
        priority_queue<LL> &prev = (X < Y) ? src : dst;
        for (LL j = 0; j < abs(X-Y); ++j) {
            LL cost = (X < Y) ? A : B;
            if (prev.size() && C * i - prev.top() < cost)
                cost = C * i - prev.top(), prev.pop();
            ans += cost;
            curr.push(C * i + cost);
        }
    }
    cout << ans << '\n';
}
