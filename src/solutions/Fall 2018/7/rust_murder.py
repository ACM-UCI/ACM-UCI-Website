#!/bin/python3

import os
import sys
from collections import defaultdict


#
# Complete the rustMurdered function below.
#
def rustMurderer(n, roads, src):
    dists = [1]*n
    edges = defaultdict(set)
    for s,d in roads:
        edges[s].add(d)
        edges[d].add(s)
    to_visit = edges[src]    
    cur_dist = 2
    while len(to_visit) > 0:
        new_reach = set()
        for node in to_visit:
            if len(edges[node]|to_visit) != n:
                dists[node-1] = cur_dist
                new_reach.add(node)
        to_visit = to_visit-new_reach
        cur_dist+=1
        
    del dists[src-1]
    return dists

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    t = int(input())

    for t_itr in range(t):
        nm = input().split()

        n = int(nm[0])

        m = int(nm[1])

        roads = []

        for _ in range(m):
            roads.append(list(map(int, input().rstrip().split())))

        s = int(input())

        result = rustMurderer(n, roads, s)

        fptr.write(' '.join(map(str, result)))
        fptr.write('\n')

    fptr.close()
