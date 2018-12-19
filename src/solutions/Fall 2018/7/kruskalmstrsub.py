#!/bin/python3

import math
import os
import random
import re
import sys
import heapq

#
# Complete the 'kruskals' function below.
#
# The function is expected to return an INTEGER.
# The function accepts WEIGHTED_INTEGER_GRAPH g as parameter.
#

#
# For the weighted graph, <name>:
#
# 1. The number of nodes is <name>_nodes.
# 2. The number of edges is <name>_edges.
# 3. An edge exists between <name>_from[i] and <name>_to[i]. The weight of the edge is <name>_weight[i].
#
#

def kruskals(g_nodes, g_from, g_to, g_weight):
    edges = []
    for i in range(len(g_from)):
        edges.append((g_weight[i],g_from[i],g_to[i]))
    heapq.heapify(edges)
    reached = []
    num_edges = 0
    size = 0
    while num_edges+1 != g_nodes:
        w,t,f = heapq.heappop(edges)
        t_r = -1
        f_r = -1
        for i in range(len(reached)):
            if t in reached[i]:
                t_r = i
            if f in reached[i]:
                f_r = i
        if t_r == -1 and f_r == -1:
            reached.append({t,f})
            size+=w
            num_edges+=1
        elif t_r == f_r:
            continue
        elif t_r == -1:
            reached[f_r].add(t)
            size+=w
            num_edges+=1
        elif f_r == -1:
            reached[t_r].add(f)
            size+=w
            num_edges+=1
        else:
            low = min(t_r,f_r)
            high = max(t_r,f_r)
            reached[low] = reached[low]|reached[high]
            del reached[high]
            size+=w
            num_edges+=1
            
    return size

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    g_nodes, g_edges = map(int, input().rstrip().split())

    g_from = [0] * g_edges
    g_to = [0] * g_edges
    g_weight = [0] * g_edges

    for i in range(g_edges):
        g_from[i], g_to[i], g_weight[i] = map(int, input().rstrip().split())

    res = kruskals(g_nodes, g_from, g_to, g_weight)

    # Write your code here.
    fptr.write("{}".format(res))

    fptr.close()