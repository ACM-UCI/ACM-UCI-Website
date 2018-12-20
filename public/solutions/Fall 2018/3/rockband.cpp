#include<bits/stdc++.h>
using namespace std;

int M;
int S;

int main(){
    scanf("%d %d",&M,&S);
    int pref[M][S];
    int wrst_song_rnk[S];
    int songs_to_play[S];
    memset(songs_to_play,0,sizeof(songs_to_play));
    memset(wrst_song_rnk,-1,sizeof(wrst_song_rnk));
    
    for (int m=0;m<M;++m){
        for (int s=0;s<S;++s){
            scanf("%d",&pref[m][s]);
            wrst_song_rnk[pref[m][s]-1] = max(wrst_song_rnk[pref[m][s]-1],s);
        }
    }
    
    int num_songs = 1;
    
    for(int cur_col=0;cur_col<num_songs;++cur_col){
        for(int m=0;m<M;++m){
            int song = pref[m][cur_col];
            songs_to_play[song-1]=1;
            num_songs = max(num_songs,wrst_song_rnk[song-1]+1);
        }
    }
    
    printf("%d\n",num_songs);
    
    for(int i=0;i<S;++i)
        if (songs_to_play[i])
            printf("%d ",i+1);
    printf("\n");
    
    return 0;
}
