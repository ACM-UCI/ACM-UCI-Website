def magic(pancakes, k):
    bool_panck = []
    for i in pancakes:
        if i == '+':
            bool_panck.append(1)
        else:
            bool_panck.append(0)
    opt = [1 for i in range(len(bool_panck))]
    ctr = 0
    
    while(bool_panck != opt):
        ctr += 1
        index = 0
        while bool_panck[index] == 1:
            index += 1

        if index + k > len(bool_panck):
            return -1

        else:
            for i in range(k):
                bool_panck[index + i] = 1 -bool_panck[index+i]

    return ctr
        
    
n = int(input())
for i in range(1,n+1):
    a = input().rstrip().split()
    pancakes = a[0]
    k = int(a[1])

    val = magic(pancakes, k)
    if val == -1:
        val = "IMPOSSIBLE"
    else:
        val = str(val)
    print("Case #" + str(i) + ": " + val)
