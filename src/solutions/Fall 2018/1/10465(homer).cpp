#include<bits/stdc++.h>
using namespace std;

int M;
int N;
int T;
int dp[10010];

int main(){
    while (scanf("%d %d %d",&M,&N,&T)==3){
        
        memset(dp, -1, sizeof(dp));
        
        dp[M] = 1;
        dp[N] = 1;
        dp[0] = 0;
        
        if (M == 1 || N ==1) {
            printf("%d\n",T);
            continue;
        }
        
        for(int i=0;i<T;++i)
            if (dp[i]>=0){
                if (i+M <= T)
                    dp[i+M] = max(dp[i+M],dp[i]+1);
                if (i+N <= T)
                    dp[i+N] = max(dp[i+N],dp[i]+1);
            }
        
        if(dp[T]>=0)
        {
            printf("%d\n",dp[T]);
            continue;
        }
 
        for(int i=T-1; i>-1; i--)
            if(dp[i]>=0)
            {
                printf("%d %d\n",dp[i],T-i);
                break;
            }
    }
    
    return 0;
}