### bandit problem solution python


def factorial(n):
    f = 1
    for i in range(1,n+1):
        f*= i

    return f


def combinations(n,k):
    return int(factorial(n)/(factorial(k)*factorial(n-k)))



def magic(n,m):
    return (combinations(n,m-1), int((n-m+1)*combinations(n,m-1)/n))


test = int(input())
for i in range(test):
    a= [int(i) for i in input().split()]
    result = magic(a[0], a[1])

    print(result[0],
          result[1])
