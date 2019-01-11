#!/bin/python3

import os
import sys

from collections import defaultdict

def valueOfFriendsship(n, friendships,m): 
    # 1st get num of connected components, just need to know which sizes occur & number
    ppl = [0]*(n+1)
    grp = 1
    cc = [0]
    for i in range(1,n+1):
        if ppl[i] == 0:
            q = [i]
            while len(q) > 0:
                cur = q.pop()
                if ppl[cur] == 0:
                    ppl[cur] = grp
                    for p in friendships[cur]:
                        if ppl[p] == 0:
                            q.append(p)
                    cc[grp-1]+=1
            grp+=1
            cc.append(0)
    
    # get num of redundant edges (edges which don't contribute to any new connected components)
    grp_sizes = defaultdict(int)
    for size in cc[:-1]:
        grp_sizes[size]+=1
    non_red_edges = sum([(grp_sz-1)*grp_sizes[grp_sz] for grp_sz in grp_sizes])
    tot = (m-non_red_edges)
    
    # imp insight! if there are mult connected components, smallest should be dismantled 1st
    asc_cc = sorted(filter(lambda x: x>1,cc))

    # keep track of how many rounds there are b4 a connected component gets dismantled
    cc_lifes = [tot]*len(asc_cc)
    for i in range(1,len(cc_lifes)):
        cc_lifes[i] = cc_lifes[i-1]+asc_cc[i-1]-1
    
    # now once we know the connected components and how many rounds they last before they get broken up we add up the friendship value of each "clique"
    tot = 0
    for i in range(len(cc_lifes)):
        sz = asc_cc[i]
        tot+=(cc_lifes[i]*sz*(sz-1))
        tot+=((sz**3-sz)//3)
    
    return tot

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    q = int(input())
    for q_itr in range(q):
        n,m = map(int,input().split())

        f = defaultdict(list)


        for _ in range(m):
            f1,f2 = map(int, input().split())
            f[f1].append(f2)
            f[f2].append(f1)

        ans = valueOfFriendsship(n,f,m)

        fptr.write(str(ans) + '\n')

    fptr.close()
