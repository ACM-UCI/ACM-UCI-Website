import collections

def str_reduction(a):
    count = 0
    map = collections.Counter(a)
    #print([map['a'],map['b'],map['c']])
    ls = sorted([map['a'],map['b'],map['c']])
    count = recursive_reduce(ls)
    return count

def recursive_reduce(list):
    if list[0] <= 0 and list[1] <= 0:
        return list[-1]
    else:
        list[-1]-=1
        list[1]-=1
        list[0]+=1
        return recursive_reduce(sorted(list))

for i in range(int(input())):
    a = input()
    print(str_reduction(a))

