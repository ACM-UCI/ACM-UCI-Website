def egcd(a, b):
    if a == 0:
        return (b, 0, 1)
    else:
        g, y, x = egcd(b % a, a)
        return (g, x - (b // a) * y, y)

def modinv(a, m):
    g, x, y = egcd(a, m)
    if g != 1:
        raise Exception('modular inverse does not exist')
    else:
        return x % m



T = int(input())
for _ in range(T):
    b = [int(i) for i in input().rstrip().split()]
    A = b[0]
    B = b[1]
    X = b[2]
    sol = 0
    if B < 1:
        sol = pow(modinv(A,X),abs(B), X)
    elif B > 1:
        sol = pow(A, B, X)
    else:
        sol = 1

    print(sol)
