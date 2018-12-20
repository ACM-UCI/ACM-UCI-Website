def convert_binary(n):
    a = str(bin(n))
    return a[2:]




def compute_tree(decisions):
    p = 1
    q = 1
    for i in decisions[1:]:
        if i == '1':
            q = p + q
        else:
            p = p+q


    return (p,q)


T = int(input())
for _ in range(T):
    b = [int(i) for i in input().split()]
    decisions = convert_binary(b[1])
    val = compute_tree(decisions)
    print(b[0], str(val[1]) + "/" + str(val[0]))
