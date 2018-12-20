'''
    Peculiar apple-tree
    Source: http://codeforces.com/problemset/problem/931/D
'''
from collections import defaultdict
def solve(tree):
    summation = 1
    to_count = [1]
    while to_count != []:
        temp = []
        for i in to_count:
            temp += tree[i]
        summation += len(temp)%2
        to_count = temp
    return summation

if __name__ == '__main__':
    num = int(input().strip())
    tree = defaultdict(list)
    for index,parent in enumerate(input().strip().split(),2):
        tree[int(parent)].append(index)
    print(solve(tree))
