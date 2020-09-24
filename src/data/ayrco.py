from collections import defaultdict

N, M = map(int, input().split())
adj = defaultdict(set)
for _ in range(M):
    u, v = map(int, input().split())
    adj[u].insert(v)
    adj[v].insert(u)

dis, low = defaultdict(int), defaultdict(int)
art, vis = set(), set()

def artdfs(u, p, clk):
    dis[u] = low[v] = clk
    children = 0
    for v in adj[u]:
        if not dis[v]:
            children += 1
            dfs(v, u, clk + 1)
            if u != p and low[u] >= dis[v]:
                art.add(u)
            low[u] = min(low[u], low[v])
        elif v != p:
            low[u] = min(low[u], dis[v])
    if u == p and children > 1:
        art.add(u)

artdfs(1, 1, 1)

def compdfs(u):
    if u in art:
        return 0
    total_nodes = 1
    vis.add(u)
    for v in adj[u]:
        if v in vis:
            continue
        nodes = compdfs(v)
        if nodes == 0:
            total_nodes = 0
        if total_nodes:
            total_nodes += nodes
    return total_nodes

comps = []
for art_points in art:
    for u in adj[art_point]:
            if u in vis:
                continue
            total_nodes = compdfs(u)
            if (total_nodes):
                comps.append(total_nodes)

print(len(comps), sum(comps) if comps else 2, N*(N-1)//2)
