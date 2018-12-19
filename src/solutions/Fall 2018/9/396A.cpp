#include<bits/stdc++.h>
using namespace std;

int N;
int A[505];
int MOD = pow(10,9)+7;

const int max_r= 15000;
const int max_c=503;
int pascals[max_r][max_c] = {1};

int main(){
    scanf("%d",&N);
    for(int i=0;i<N;++i)
        scanf("%d",&A[i]);
    
    int p_m_l = int(pow(10,4.5))+10;
    int primes_mask[p_m_l];
    
    
    memset(primes_mask,0,sizeof primes_mask);
    
    for(int i=2;i<p_m_l;++i){
        for(int j=i;j<p_m_l;j+=i){
            ++primes_mask[j];
        }
    }
        
    vector<int> primes;
    for(int i=0;i<p_m_l;++i)
        if(primes_mask[i] == 1)
            primes.push_back(i);
    
    /*for(int p=0;p<10;++p)
        printf("%d ",primes[p]);
    */
    
    map<int,int> prime_factorization;
    for(int i=0;i<N;++i){
        int cur = A[i];
        for(int j=0;j<primes.size();++j){
            if(primes[j]>cur)
                break;
            while(cur%primes[j]==0){
                ++prime_factorization[primes[j]];
                cur/=primes[j];
            }
        }
        if(cur!=1)
            ++prime_factorization[cur];
    }
    
    for(int i=1;i<max_r;++i){
        for(int j=0;j<=min(i,max_c-1);++j){
            int cur = 0;
            if(j!=0)
                cur+=pascals[i-1][j-1];
            if(j!=i)
                cur+=pascals[i-1][j];
            pascals[i][j] = cur%MOD;
        }
    }
    
    long long result = 1;
    for(pair<const int,int>& prime: prime_factorization){
        result*=pascals[prime.second+N-1][N-1];
        result%=MOD;
    }
    
    printf("%d",result);
    return 0;
}
