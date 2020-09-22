#include <iostream>
#include <unordered_set>
#include <vector>
#include <utility>
using namespace std;
typedef long long LL;
LL N, M, clk, acus, ways;
vector<LL> dis, low, cmp;
vector<vector<LL>> adj;
unordered_set<LL> art, vis;

LL cmpdfs(LL u, LL r) {
    LL ct = 1;
    if (art.count(u))
        return 0;
    vis.insert(u);
    for (LL v : adj[u]) {
        if (vis.count(v) || v == r)
            continue;
        LL x = cmpdfs(v, r);
        if (!x)
            ct = 0;
        if (ct)
            ct += x;
    }
    return ct;
}

void pushleaf(LL u, LL r) {
    if (vis.count(u))
        return;
    LL ct = cmpdfs(u, r);
    if (ct)
        cmp.push_back(ct);
}

void artdfs(LL u, LL p) {
    dis[u] = low[u] = ++clk;
    LL children = 0;
    for (LL v : adj[u]) {
        if (!dis[v]) {
            ++children;
            artdfs(v, u);
            if (p && low[v] >= dis[u])
                art.insert(u);
            low[u] = min(low[u], low[v]);
        } else if (v != p)
            low[u] = min(low[u], dis[v]);
    }
    if (!p && children > 1)
        art.insert(u);
}

void solve() {
    dis.assign(N+1, 0), low.assign(N+1, 0);
    clk = 0;
    artdfs(1, 0);
    if (art.empty()) {
        acus = 2, ways = N*(N-1)/2;
        return;
    }
    for (LL r : art)
        for (LL u : adj[r])
            pushleaf(u, r);
    acus = cmp.size(), ways = 1;
    for (LL x : cmp)
        ways *= x;
}

int main() {
    cin >> N >> M;
    adj.assign(N+1, {});
    while (M--) {
        LL u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    solve();
    cout << acus << " " << ways << '\n';
}
