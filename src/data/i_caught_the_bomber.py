N, M = map(int, input().split())
schools = {input()+'.edu' for _ in range(M)}
for email in (input() for _ in range(N)):
    if email.split('@')[1] not in schools:
        print(email)
