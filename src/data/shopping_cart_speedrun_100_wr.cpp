#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;

int main() {
    int N, M;
    cin >> N >> M;

    vector<int> pods;
    for (int i = 0; i < M; ++i) {
        int X;
        cin >> X;
        pods.push_back(X);
    }

    int ans = 2147483647, ct = 0;
    unordered_map<int, int> cart;
    for (int l = 0, r = 0; r < M; ++r) {
        ct += !(cart[pods[r]]++);
        while (ct == N) {
            ans = min(ans, r-l+1);
            ct -= !(--cart[pods[l++]]);
        }
    }

    cout << ans << "\n";
}
