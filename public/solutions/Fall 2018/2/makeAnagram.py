
def makeAnagram(a, b):
    my_dicta = {}
    my_dictb ={}
    for i in a:
        if i not in my_dicta.keys():
            my_dicta[i]=0
        my_dicta[i]+=1
    for j in b:
        if j not in my_dictb.keys():
            my_dictb[j]=0
        my_dictb[j]+=1
    total =0
    for k in my_dicta.keys():
        if k not in my_dictb.keys():
            total+=my_dicta[k]
        else:
            total+=abs(my_dicta[k]-my_dictb[k])
    for c in my_dictb.keys():
        if c not in my_dicta.keys():
            total+= my_dictb[c]
    return total