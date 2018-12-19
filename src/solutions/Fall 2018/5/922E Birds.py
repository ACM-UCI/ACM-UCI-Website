'''
    Birds
    Source: http://codeforces.com/problemset/problem/922/E
'''

def solve(tree_num, mana, cap_in, restored, bird_list, cost_list):
    dp = []
    bird_num = sum(bird_list)
    for i in range(tree_num + 1):
        dp.append([])
        for j in range(bird_num + 1):
            dp[i].append(-10000000000)
            
    dp[0][0] = mana #initial all states when going to 0 tree and summon 0 birds
        
    for i in range(1,tree_num + 1): #dp[i][j] show the maximun mana it left going i trees and summoning j birds
        j = bird_num
        while j >= 0:
            k = bird_list[i]
            while k >= 0:
                if dp[i-1][j-k] >= 0:
                    dp[i][j] = max(dp[i][j],min(mana+(j-k)*cap_in,dp[i-1][j-k]+restored)-k*cost_list[i])
                k -= 1
            j -= 1

    j = bird_num
    while j >= 0:
        if dp[tree_num][j] >= 0:
            print(j)
            break
        j -= 1
    #print_dp(dp)

def print_dp(dp):
    for i in dp:
        string =''
        for j in i:
            string += str(j) + ' '
        print(string)
if __name__ == '__main__':
    tree_num, mana, cap_in, restored = [int(i) for i in input().strip().split()]
    bird_list = [0] + [int(i) for i in input().strip().split()]
    cost_list = [0] + [int(i) for i in input().strip().split()]
    solve(tree_num, mana, cap_in, restored, bird_list, cost_list)
